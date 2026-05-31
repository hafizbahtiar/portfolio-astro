import React, { useEffect, useMemo, useState } from "react";
import type { FamilyPerson, FamilyTreeDetail } from "../../types/family";

interface Props {
  detail?: FamilyTreeDetail;
}

const REL_LABEL: Record<string, string> = {
  parent: "Parent",
  adoptive_parent: "Adoptive Parent",
  child: "Child",
  adopted_child: "Adopted Child",
  spouse: "Spouse",
  sibling: "Sibling",
};

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return isNaN(d.getTime()) ? iso : d.toLocaleDateString("en-MY", { year: "numeric", month: "short", day: "numeric" });
}

export const PersonInfoPanel = ({ detail }: Props) => {
  const [personId, setPersonId] = useState<string | null>(null);

  const resolvedDetail = useMemo<FamilyTreeDetail | null>(() => {
    if (detail && detail.people.length > 0) return detail;
    const win = typeof window !== "undefined" ? (window as any) : null;
    return win?.__familyDetail || detail || null;
  }, [detail]);

  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<{ id: string }>).detail?.id;
      if (id) setPersonId(String(id));
    };
    window.addEventListener("family:on-main-changed", handler);
    return () => window.removeEventListener("family:on-main-changed", handler);
  }, []);

  const person: FamilyPerson | undefined = personId && resolvedDetail
    ? resolvedDetail.people.find((p) => String(p.id) === personId)
    : undefined;

  const nameMap = resolvedDetail
    ? new Map(resolvedDetail.people.map((p) => [p.id, p.displayName]))
    : new Map();

  const relationships: Array<{ label: string; name: string; id: number }> = person && resolvedDetail
    ? resolvedDetail.relationships
      .filter((r) => r.personId === person.id || r.relatedPersonId === person.id)
      .map((r) => {
        const isLeft = r.personId === person.id;
        const otherId = isLeft ? r.relatedPersonId : r.personId;
        return {
          label: REL_LABEL[r.relationshipType] ?? r.relationshipType,
          name: nameMap.get(otherId) ?? String(otherId),
          id: otherId,
        };
      })
    : [];

  if (!person) {
    return (
      <div className="h-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 flex items-center justify-center text-sm text-slate-400 dark:text-slate-500">
        Click a person to see details
      </div>
    );
  }

  return (
    <div className="h-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 overflow-y-auto space-y-4">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 leading-tight">
          {person.displayName}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">
          {person.gender} · {person.isLiving ? "Living" : "Deceased"}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Born</p>
          <p className="text-slate-800 dark:text-slate-200">{formatDate(person.birthDate)}</p>
        </div>
        {!person.isLiving && (
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Died</p>
            <p className="text-slate-800 dark:text-slate-200">{formatDate(person.deathDate)}</p>
          </div>
        )}
      </div>

      {person.notes && (
        <p className="text-sm text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-700 pt-3">
          {person.notes}
        </p>
      )}

      {relationships.length > 0 && (
        <div className="border-t border-slate-100 dark:border-slate-700 pt-3 space-y-2">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Relationships
          </p>
          <div className="space-y-1.5">
            {relationships.map((r, i) => (
              <div key={i} className="flex items-baseline gap-2 text-sm">
                <span className="shrink-0 text-xs text-slate-400 dark:text-slate-500 w-24">{r.label}</span>
                <span className="text-slate-800 dark:text-slate-200">{r.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
