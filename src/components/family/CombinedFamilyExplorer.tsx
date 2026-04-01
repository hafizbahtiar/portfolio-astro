import React, { useEffect, useMemo, useState } from "react";
import { FamilyTreeChart } from "./FamilyTreeChart";
import { getPublicFamilyTreeBySlug, getPublicFamilyTrees } from "../../lib/family";
import type { FamilyPerson, FamilyRelationship, FamilyTreeDetail } from "../../types/family";

const peopleKey = (p: FamilyPerson) => {
  const gk = (p.globalKey || "").trim().toLowerCase();
  if (gk.length > 0) return gk;
  return p.displayName.trim().toLowerCase();
};

export const CombinedFamilyExplorer = () => {
  const [detail, setDetail] = useState<FamilyTreeDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const trees = await getPublicFamilyTrees();
        const slugs = trees.map((t) => t.slug);
        const details = (await Promise.all(slugs.map((slug) => getPublicFamilyTreeBySlug(slug)))).filter(Boolean) as FamilyTreeDetail[];

        const personByKey = new Map<string, FamilyPerson>();
        const keyToNewId = new Map<string, number>();
        let nextId = 1;

        for (const d of details) {
          for (const p of d.people) {
            const key = peopleKey(p);
            const existing = personByKey.get(key);
            if (!existing) {
              const merged: FamilyPerson = {
                id: nextId,
                treeId: 0,
                firstName: p.firstName,
                lastName: p.lastName,
                displayName: p.displayName,
                globalKey: p.globalKey ?? null,
                gender: p.gender,
                birthDate: p.birthDate,
                deathDate: p.deathDate,
                isLiving: p.isLiving,
                photoUrl: p.photoUrl,
                notes: p.notes,
                metadata: p.metadata,
                createdAt: p.createdAt,
                updatedAt: p.updatedAt,
              };
              personByKey.set(key, merged);
              keyToNewId.set(key, nextId);
              nextId += 1;
            } else {
              existing.firstName = existing.firstName ?? p.firstName ?? null;
              existing.lastName = existing.lastName ?? p.lastName ?? null;
              existing.photoUrl = existing.photoUrl ?? p.photoUrl ?? null;
              existing.notes = existing.notes ?? p.notes ?? null;
              existing.gender = existing.gender === "unknown" ? p.gender : existing.gender;
              existing.birthDate = existing.birthDate ?? p.birthDate ?? null;
              existing.deathDate = existing.deathDate ?? p.deathDate ?? null;
              existing.isLiving = existing.isLiving || p.isLiving;
            }
          }
        }

        const combinedPeople = Array.from(personByKey.values());

        const relKey = (r: FamilyRelationship) => `${r.relationshipType}:${r.personId}->${r.relatedPersonId}`;
        const relSet = new Set<string>();
        const combinedRelationships: FamilyRelationship[] = [];
        for (const d of details) {
          for (const r of d.relationships) {
            const left = d.people.find((p) => p.id === r.personId);
            const right = d.people.find((p) => p.id === r.relatedPersonId);
            if (!left || !right) continue;
            const leftKey = peopleKey(left);
            const rightKey = peopleKey(right);
            const newLeftId = keyToNewId.get(leftKey);
            const newRightId = keyToNewId.get(rightKey);
            if (!newLeftId || !newRightId) continue;
            const newRel: FamilyRelationship = {
              id: combinedRelationships.length + 1,
              treeId: 0,
              personId: newLeftId,
              relatedPersonId: newRightId,
              relationshipType: r.relationshipType,
              isPrimary: r.isPrimary,
              startDate: r.startDate,
              endDate: r.endDate,
              notes: r.notes,
              createdAt: r.createdAt,
              updatedAt: r.updatedAt,
            };
            const k = relKey(newRel);
            if (!relSet.has(k)) {
              relSet.add(k);
              combinedRelationships.push(newRel);
            }
          }
        }

        const addParentRelIfMissing = (parentName: string, childName: string) => {
          const parent = combinedPeople.find((p) => p.displayName.trim().toLowerCase() === parentName.trim().toLowerCase());
          const child = combinedPeople.find((p) => p.displayName.trim().toLowerCase() === childName.trim().toLowerCase());
          if (!parent || !child) return;
          const candidate: FamilyRelationship = {
            id: combinedRelationships.length + 1,
            treeId: 0,
            personId: parent.id,
            relatedPersonId: child.id,
            relationshipType: "parent",
            isPrimary: true,
            startDate: null,
            endDate: null,
            notes: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          const k = relKey(candidate);
          if (!relSet.has(k)) {
            relSet.add(k);
            combinedRelationships.push(candidate);
          }
        };

        addParentRelIfMissing("Mohd Bahtiar", "Muhamad Nurhafiz");
        addParentRelIfMissing("Zarina", "Muhamad Nurhafiz");

        const meIndex = combinedPeople.findIndex((p) => p.displayName.trim().toLowerCase() === "muhamad nurhafiz");
        if (meIndex > 0) {
          const me = combinedPeople.splice(meIndex, 1)[0];
          combinedPeople.unshift(me);
        }

        const me = combinedPeople.find((p) => p.displayName.trim().toLowerCase() === "muhamad nurhafiz") || combinedPeople[0] || null;
        const combinedDetail: FamilyTreeDetail = {
          tree: {
            id: 0,
            slug: "combined-family",
            name: "Combined Family",
            description: "Combined view of all related families centered on Muhamad Nurhafiz.",
            isPublic: true,
            createdByUserId: null,
            defaultMainPersonId: me ? me.id : null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          people: combinedPeople,
          relationships: combinedRelationships,
        };

        setDetail(combinedDetail);
      } catch (e) {
        setError("Failed to load combined family data.");
      } finally {
        setIsLoading(false);
      }
    };
    run();
  }, []);

  const hasPeople = useMemo(() => (detail?.people?.length || 0) > 0, [detail]);

  if (isLoading) {
    return <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-6 text-gray-400">Loading combined family data...</div>;
  }
  if (error) {
    return <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-6 text-red-300">{error}</div>;
  }
  if (!detail || !hasPeople) {
    return <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-6 text-gray-400">Combined family data unavailable.</div>;
  }

  return (
    <FamilyTreeChart
      detail={detail}
      currentSlug="combined-family"
      useLabelOnly={true}
      ancestryDepth={6}
      progenyDepth={3}
      showSiblings={true}
      sortChildrenBy="metadata.birth_order"
      sortAscending={true}
    />
  );
}
