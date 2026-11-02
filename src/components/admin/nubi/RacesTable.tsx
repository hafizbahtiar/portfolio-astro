import React, { useEffect, useMemo, useState } from "react";
import { LoaderCircle, RefreshCw, Sparkles } from "lucide-react";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../../ui/DataTable";
import { AdminBadge, CellPrimary, CellSecondary, CellText, RowActions, EditAction, DeleteAction } from "../../ui/admin/primitives";
import { nubiRacesService } from "../../../lib/nubi-races";
import { showToast, confirmDialog } from "../../../lib/admin-ui";
import type { NubiRace, RaceDiscovery } from "../../../types/nubi-races";

/** Today in Malaysia (race dates are Malaysia time). */
const todayMY = () => new Date(Date.now() + 8 * 3600_000).toISOString().slice(0, 10);
/** Checked over 90 days ago and still upcoming = re-check the official page. */
const stale = (r: NubiRace) => Date.now() - new Date(r.checkedOn).getTime() > 90 * 86400_000;

export const RacesTable = () => {
  const [data, setData] = useState<NubiRace[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [found, setFound] = useState<RaceDiscovery | null>(null);
  const [checking, setChecking] = useState(false);

  const checkNew = async () => {
    setChecking(true);
    try {
      setFound(await nubiRacesService.discover());
    } catch {
      showToast({ type: "error", title: "Check failed", message: "Could not read the race listing sites." });
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    nubiRacesService
      .list()
      .then(setData)
      .catch((error) => console.error("Failed to load races:", error))
      .finally(() => setIsLoading(false));
  }, []);

  const handleDelete = async (row: NubiRace) => {
    const ok = await confirmDialog({
      title: "Delete race",
      message: `Delete ${row.name}? It disappears from Nubi /races.`,
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "danger",
    });
    if (!ok) return;
    try {
      await nubiRacesService.remove(row.id);
      setData((prev) => prev.filter((item) => item.id !== row.id));
    } catch {
      showToast({ type: "error", title: "Delete failed", message: "Failed to delete the race." });
    }
  };

  const columns: ColumnDef<NubiRace>[] = useMemo(() => {
    const today = todayMY();
    return [
      {
        accessorKey: "name",
        header: "Race",
        cell: ({ row }) => (
          <div className="min-w-0">
            <CellPrimary>{row.original.name}</CellPrimary>
            <CellSecondary>{`${row.original.venue}, ${row.original.state}`}</CellSecondary>
          </div>
        ),
      },
      {
        accessorKey: "raceDate",
        header: "Date",
        cell: ({ row }) => <CellText>{`${row.original.raceDate} · ${row.original.startTime}`}</CellText>,
      },
      {
        id: "distances",
        header: "Distances",
        enableSorting: false,
        cell: ({ row }) => <CellText>{row.original.distances.join(", ")}</CellText>,
      },
      {
        id: "status",
        header: "Status",
        accessorFn: (r) => r.raceDate,
        cell: ({ row }) => {
          const r = row.original;
          if (r.raceDate < today) return <AdminBadge variant="neutral" dot>Past</AdminBadge>;
          if (stale(r)) return <AdminBadge variant="warning" dot>Re-check</AdminBadge>;
          return <AdminBadge variant="success" dot>Listed</AdminBadge>;
        },
      },
      {
        id: "actions",
        header: "Actions",
        size: 110,
        enableSorting: false,
        cell: ({ row }) => (
          <RowActions>
            <EditAction href={`/admin/nubi/races/edit?id=${row.original.id}`} label={`Edit ${row.original.name}`} />
            <DeleteAction onClick={() => handleDelete(row.original)} label={`Delete ${row.original.name}`} />
          </RowActions>
        ),
      },
    ];
  }, []);

  return (
    <div className="space-y-4">
      <section className="admin-card space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <h3 className="admin-card-title mb-0">Up to date</h3>
            <p className="admin-help">Reads the default listing sites for races not saved yet. Drafting one is a single AI call.</p>
          </div>
          <button type="button" onClick={() => void checkNew()} disabled={checking} className="admin-btn admin-btn-secondary">
            {checking ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            Check for new races
          </button>
        </div>
        {found && (
          <>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {found.sources.map((s) => (s.ok ? `${s.name}: ${s.found} listed` : `${s.name}: ${s.error}`)).join(" · ")}
            </p>
            {found.candidates.length ? (
              <ul className="divide-y divide-gray-950/5 dark:divide-white/10">
                {found.candidates.map((c) => (
                  <li key={c.url} className="flex flex-wrap items-center gap-3 py-2">
                    <div className="min-w-0 flex-1">
                      <CellPrimary>{c.title}</CellPrimary>
                      <a href={c.url} target="_blank" rel="noopener" className="block truncate text-xs text-sky-600 hover:underline">{c.url}</a>
                    </div>
                    <a href={`/admin/nubi/races/edit?url=${encodeURIComponent(c.url)}`} className="admin-btn admin-btn-secondary">
                      <Sparkles className="h-4 w-4" />
                      Draft
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-700 dark:text-gray-300">No new races - everything listed is already saved.</p>
            )}
          </>
        )}
      </section>
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        emptyTitle="No races yet"
        emptyDescription="Check for new races above, or add one from its official page - the AI fills the form."
      />
    </div>
  );
};
