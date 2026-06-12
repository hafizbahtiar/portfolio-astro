import React, { useEffect, useMemo, useRef } from "react";
import type {
  PublicFamilyPerson,
  PublicFamilyTreeDetail,
} from "../../lib/family-privacy";

const REL_LABEL: Record<string, string> = {
  parent: "Parent",
  adoptive_parent: "Adoptive parent",
  child: "Child",
  adopted_child: "Adopted child",
  spouse: "Spouse",
  sibling: "Sibling",
};

const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");

const formatDate = (iso: string | null, yearOnly: boolean) => {
  if (!iso) return "-";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  if (yearOnly) return String(date.getFullYear());
  return date.toLocaleDateString("en-MY", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

interface Props {
  detail: PublicFamilyTreeDetail;
  person: PublicFamilyPerson | null;
  onSelectPerson: (id: number) => void;
  onClose?: () => void;
  asSheet?: boolean;
}

export const PersonDetailPanel = ({
  detail,
  person,
  onSelectPerson,
  onClose,
  asSheet,
}: Props) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (asSheet && person) closeRef.current?.focus();
  }, [asSheet, person]);

  useEffect(() => {
    if (!asSheet || !person) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [asSheet, person, onClose]);

  const nameById = useMemo(
    () => new Map(detail.people.map((familyPerson) => [familyPerson.id, familyPerson.displayName])),
    [detail],
  );

  const relationships = useMemo(() => {
    if (!person) return [];
    return detail.relationships
      .filter(
        (relationship) =>
          relationship.personId === person.id ||
          relationship.relatedPersonId === person.id,
      )
      .map((relationship) => {
        const otherId =
          relationship.personId === person.id
            ? relationship.relatedPersonId
            : relationship.personId;
        return {
          label: REL_LABEL[relationship.relationshipType] ?? relationship.relationshipType,
          name: nameById.get(otherId) ?? `#${otherId}`,
          id: otherId,
        };
      });
  }, [detail, person, nameById]);

  if (!person) {
    return (
      <div className="flex h-full items-center justify-center rounded-xl border border-slate-200 bg-white p-5 text-center text-sm text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500">
        Select a person in the tree to see their details
      </div>
    );
  }

  const body = (
    <>
      <div className="flex items-center gap-3">
        {person.photoUrl ? (
          <img
            src={person.photoUrl}
            alt={person.displayName}
            width={56}
            height={56}
            loading="lazy"
            className="h-14 w-14 rounded-full border border-slate-200 object-cover dark:border-slate-600"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-100 font-semibold text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300"
          >
            {initials(person.displayName)}
          </div>
        )}
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-slate-900 dark:text-slate-100">
            {person.displayName}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {person.isLiving ? "Living" : "Deceased"}
          </p>
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
        <div>
          <dt className="text-xs text-slate-500 dark:text-slate-400">Born</dt>
          <dd className="text-slate-800 dark:text-slate-200">
            {formatDate(person.birthDate, person.isLiving)}
          </dd>
        </div>
        {!person.isLiving && (
          <div>
            <dt className="text-xs text-slate-500 dark:text-slate-400">Died</dt>
            <dd className="text-slate-800 dark:text-slate-200">
              {formatDate(person.deathDate, false)}
            </dd>
          </div>
        )}
      </dl>

      {relationships.length > 0 && (
        <div className="space-y-1.5 border-t border-slate-100 pt-3 dark:border-slate-700">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Relationships
          </p>
          {relationships.map((relationship, index) => (
            <button
              key={`${relationship.id}-${relationship.label}-${index}`}
              type="button"
              onClick={() => onSelectPerson(relationship.id)}
              className="-mx-1 flex w-full items-baseline gap-2 rounded px-1 text-left text-sm hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 dark:hover:bg-slate-700/50"
            >
              <span className="w-24 shrink-0 text-xs text-slate-400 dark:text-slate-500">
                {relationship.label}
              </span>
              <span className="text-cyan-700 dark:text-cyan-400">
                {relationship.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </>
  );

  if (asSheet) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Details for ${person.displayName}`}
        className="fixed inset-0 z-40 lg:hidden"
      >
        <button
          aria-label="Close details"
          className="absolute inset-0 bg-black/40"
          onClick={onClose}
        />
        <div className="absolute inset-x-0 bottom-0 max-h-[70vh] space-y-4 overflow-y-auto rounded-t-2xl bg-white p-5 motion-safe:transition-transform dark:bg-slate-800">
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="absolute right-4 top-4 rounded-md p-1 text-slate-400 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 dark:hover:text-slate-200"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {body}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full space-y-4 overflow-y-auto rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
      {body}
    </div>
  );
};
