import React, { useEffect, useMemo, useRef, useState } from "react";
import { LoaderCircle, RefreshCw, Sparkles, X } from "lucide-react";
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
  const [extra, setExtra] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);

  /** Default sites + the optional listing page typed in the dialog. */
  const checkNew = async () => {
    const url = extra.trim();
    if (url && !/^https:\/\//i.test(url)) {
      showToast({ type: "error", title: "Link needed", message: "The listing page must be an https link." });
      return;
    }
    setChecking(true);
    try {
      setFound(await nubiRacesService.discover(url ? [url] : []));
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
        cell: ({ row }) => (
          <CellText>{`${row.original.raceDate}${row.original.endDate ? ` - ${row.original.endDate}` : ""} · ${row.original.startTime}`}</CellText>
        ),
      },
      {
        id: "categories",
        header: "Categories",
        enableSorting: false,
        cell: ({ row }) => <CellText>{row.original.categories.map((c) => c.name).join(", ")}</CellText>,
      },
      {
        id: "status",
        header: "Status",
        accessorFn: (r) => r.raceDate,
        cell: ({ row }) => {
          const r = row.original;
          if ((r.endDate ?? r.raceDate) < today) return <AdminBadge variant="neutral" dot>Past</AdminBadge>;
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
      <div className="flex justify-end">
        <button type="button" onClick={() => dialog.current?.showModal()} className="admin-btn admin-btn-secondary">
          <RefreshCw className="h-4 w-4" />
          Check for new races
        </button>
      </div>
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        emptyTitle="No races yet"
        emptyDescription="Check for new races, or add one from its race page - the AI fills the form."
      />

      <dialog
        ref={dialog}
        aria-labelledby="races-check-title"
        onClick={(e) => e.target === dialog.current && dialog.current.close()}
        className="m-auto w-[calc(100%-2rem)] max-w-2xl rounded-xl bg-white p-0 text-gray-950 shadow-xl ring-1 ring-gray-950/10 backdrop:bg-gray-950/80 backdrop:backdrop-blur-sm dark:bg-gray-900 dark:text-white dark:ring-white/10"
      >
        <div className="flex max-h-[85dvh] flex-col">
          <header className="flex items-center justify-between gap-3 border-b border-gray-950/5 px-5 py-4 dark:border-white/10">
            <h2 id="races-check-title" className="text-base font-semibold">Check for new races</h2>
            <button type="button" onClick={() => dialog.current?.close()} aria-label="Close" className="admin-btn admin-btn-secondary px-2!">
              <X className="h-4 w-4" />
            </button>
          </header>
          <div className="space-y-4 overflow-y-auto px-5 py-4">
            <p className="admin-help">
              Reads the default listing sites (RaceXAsia ...) and any listing page you add, and shows the races not saved yet. No AI here -
              drafting one race is a single AI call.
            </p>
            <form
              className="flex flex-col gap-3 sm:flex-row sm:items-end"
              onSubmit={(e) => {
                e.preventDefault();
                void checkNew();
              }}
            >
              <div className="min-w-0 flex-1 space-y-2">
                <label className="admin-label" htmlFor="races-extra">Other listing page (optional)</label>
                <input
                  id="races-extra"
                  type="url"
                  value={extra}
                  onChange={(e) => setExtra(e.target.value)}
                  placeholder="https://... a page that lists many races"
                  className="admin-input"
                />
              </div>
              <button type="submit" disabled={checking} className="admin-btn admin-btn-primary">
                {checking ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                Check
              </button>
            </form>
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
                          <a href={c.url} target="_blank" rel="noopener" className="block truncate text-xs text-sky-600 hover:underline">
                            {c.url}
                          </a>
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
          </div>
        </div>
      </dialog>
    </div>
  );
};
