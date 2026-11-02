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
/** "2026-10-24" -> "Sat, 24 Oct 2026" (the date is Malaysia time, shown as written). */
const fmtDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
/** Checked over 90 days ago and still upcoming = re-check the official page. */
const stale = (r: NubiRace) => Date.now() - new Date(r.checkedOn).getTime() > 90 * 86400_000;

export const RacesTable = () => {
  const [data, setData] = useState<NubiRace[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [found, setFound] = useState<RaceDiscovery | null>(null);
  const [checking, setChecking] = useState(false);
  const [extra, setExtra] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);

  /** The listing pages typed in the dialog (one per line, max 3), else the default sites. */
  const checkNew = async () => {
    const urls = [...new Set(extra.split(/\s+/).filter(Boolean))];
    if (urls.length > 3 || urls.some((u) => !/^https:\/\/[^/]+\.[^/]+/i.test(u))) {
      showToast({ type: "error", title: "Check the links", message: "Up to 3 https links, one per line." });
      return;
    }
    setChecking(true);
    try {
      setFound(await nubiRacesService.discover(urls));
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
              Reads the listing pages you add here - or, with none, the default sites (RaceXAsia ...) - and shows the races not saved yet.
              No AI here - drafting one race is a single AI call.
            </p>
            <form
              className="flex flex-col gap-3 sm:flex-row sm:items-end"
              onSubmit={(e) => {
                e.preventDefault();
                void checkNew();
              }}
            >
              <div className="min-w-0 flex-1 space-y-2">
                <label className="admin-label" htmlFor="races-extra">Listing pages (optional)</label>
                <textarea
                  id="races-extra"
                  rows={3}
                  value={extra}
                  onChange={(e) => setExtra(e.target.value)}
                  placeholder={"https://... a page that lists many races\nOne per line, up to 3. Empty = default sites."}
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
                <ul className="space-y-1 text-xs">
                  {found.sources.map((s) => (
                    <li key={s.url} className={s.ok ? "text-gray-500 dark:text-gray-400" : "text-amber-700 dark:text-amber-300"}>
                      {s.ok ? `${s.name}: ${s.found} listed` : `${s.name}: ${s.error}`}
                    </li>
                  ))}
                </ul>
                {found.candidates.length ? (
                  <ul className="divide-y divide-gray-950/5 dark:divide-white/10">
                    {found.candidates.map((c) => (
                      <li key={c.url} className="flex flex-wrap items-center gap-3 py-2">
                        <div className="min-w-0 flex-1">
                          <CellPrimary>{c.title}</CellPrimary>
                          <p className="flex flex-wrap items-center gap-2 text-xs text-gray-500 tabular-nums dark:text-gray-400">
                            {c.date ? fmtDate(c.date) : "Date not on the listing"}
                            {c.date && c.date < todayMY() && <AdminBadge variant="neutral">Past</AdminBadge>}
                          </p>
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
