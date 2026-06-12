import React from "react";
import type { PublicFamilyPerson } from "../../lib/family-privacy";
import { PersonSearch } from "./PersonSearch";

export type ExplorerView = "tree" | "list";

interface Props {
  people: PublicFamilyPerson[];
  view: ExplorerView;
  vertical: boolean;
  onSelectPerson: (person: PublicFamilyPerson) => void;
  onViewChange: (view: ExplorerView) => void;
  onOrientationChange: (vertical: boolean) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFit: () => void;
  onResetView: () => void;
  onCenterMain: () => void;
}

const iconButtonClass =
  "inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 text-slate-600 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 disabled:opacity-40 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700";

const segmentedButtonClass = (active: boolean) =>
  `rounded-md px-3 py-1.5 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
    active
      ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-slate-100"
      : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
  }`;

export const FamilyToolbar = ({
  people,
  view,
  vertical,
  onSelectPerson,
  onViewChange,
  onOrientationChange,
  onZoomIn,
  onZoomOut,
  onFit,
  onResetView,
  onCenterMain,
}: Props) => {
  const treeMode = view === "tree";

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800">
      <PersonSearch people={people} onSelect={onSelectPerson} />

      <div
        role="group"
        aria-label="View mode"
        className="flex rounded-lg bg-slate-100 p-1 dark:bg-slate-900/60"
      >
        <button
          type="button"
          className={segmentedButtonClass(treeMode)}
          aria-pressed={treeMode}
          onClick={() => onViewChange("tree")}
        >
          Tree
        </button>
        <button
          type="button"
          className={segmentedButtonClass(!treeMode)}
          aria-pressed={!treeMode}
          onClick={() => onViewChange("list")}
        >
          List
        </button>
      </div>

      <div
        role="group"
        aria-label="Tree controls"
        className="ml-auto flex items-center gap-1.5"
      >
        <button
          type="button"
          className={iconButtonClass}
          aria-label="Toggle tree orientation"
          disabled={!treeMode}
          onClick={() => onOrientationChange(!vertical)}
          title={vertical ? "Switch to horizontal" : "Switch to vertical"}
        >
          <svg
            aria-hidden="true"
            className={`h-4 w-4 transition-transform ${vertical ? "" : "rotate-90"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m-6-6l6 6 6-6"
            />
          </svg>
        </button>
        <button
          type="button"
          className={iconButtonClass}
          aria-label="Zoom out"
          disabled={!treeMode}
          onClick={onZoomOut}
        >
          <svg
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeWidth="2" d="M5 12h14" />
          </svg>
        </button>
        <button
          type="button"
          className={iconButtonClass}
          aria-label="Zoom in"
          disabled={!treeMode}
          onClick={onZoomIn}
        >
          <svg
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeWidth="2"
              d="M12 5v14M5 12h14"
            />
          </svg>
        </button>
        <button
          type="button"
          className={iconButtonClass}
          aria-label="Fit tree to view"
          disabled={!treeMode}
          onClick={onFit}
        >
          <svg
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 8V5a1 1 0 011-1h3m8 0h3a1 1 0 011 1v3m0 8v3a1 1 0 01-1 1h-3m-8 0H5a1 1 0 01-1-1v-3"
            />
          </svg>
        </button>
        <button
          type="button"
          className={iconButtonClass}
          aria-label="Reset tree view"
          disabled={!treeMode}
          onClick={onResetView}
        >
          <svg
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 4v6h6M20 20v-6h-6M5 19A9 9 0 0019 5"
            />
          </svg>
        </button>
        <button
          type="button"
          className={iconButtonClass}
          aria-label="Center on selected person"
          disabled={!treeMode}
          onClick={onCenterMain}
        >
          <svg
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="3" strokeWidth="2" />
            <path
              strokeLinecap="round"
              strokeWidth="2"
              d="M12 2v4m0 12v4M2 12h4m12 0h4"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
