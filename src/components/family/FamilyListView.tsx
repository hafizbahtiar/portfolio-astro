import React from "react";
import type { PublicFamilyTreeDetail } from "../../lib/family-privacy";
import { displayYear } from "../../lib/family-format";
import { buildRelationCounts } from "../../lib/family-relationships";

const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");

interface Props {
  detail: PublicFamilyTreeDetail;
  selectedId: number | null;
  onSelect: (id: number) => void;
}

export const FamilyListView = ({ detail, selectedId, onSelect }: Props) => {
  const relationshipCount = buildRelationCounts(detail);

  const people = [...detail.people].sort((left, right) =>
    left.displayName.localeCompare(right.displayName),
  );

  return (
    <ul className="grid gap-2 sm:grid-cols-2" aria-label="Family members list">
      {people.map((person) => (
        <li key={person.id}>
          <button
            type="button"
            onClick={() => onSelect(person.id)}
            aria-current={selectedId === person.id ? "true" : undefined}
            className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
              selectedId === person.id
                ? "border-cyan-500/60 bg-cyan-50 dark:bg-cyan-900/15"
                : "border-slate-200 bg-white hover:border-cyan-500/40 dark:border-slate-700 dark:bg-slate-800"
            }`}
          >
            {person.photoUrl ? (
              <img
                src={person.photoUrl}
                alt=""
                width={40}
                height={40}
                loading="lazy"
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-medium text-slate-500 dark:bg-slate-700 dark:text-slate-300"
              >
                {initials(person.displayName)}
              </span>
            )}
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium text-slate-900 dark:text-slate-100">
                {person.displayName}
              </span>
              <span className="block text-xs text-slate-500 dark:text-slate-400">
                {person.birthDate
                  ? `b. ${displayYear(person.birthDate)}`
                  : "Birth year unknown"}
                {!person.isLiving ? " · deceased" : ""}
                {` · ${relationshipCount.get(person.id) ?? 0} relations`}
              </span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
};
