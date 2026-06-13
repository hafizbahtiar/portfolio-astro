import type {
  FamilyPerson,
  FamilyRelationship,
  FamilyTreeDetail,
} from "../types/family";

export interface CombinedFamilyConfig {
  slug: string;
  name: string;
  description: string;
  mainPersonGlobalKey: string;
}

const personKey = (person: FamilyPerson) => {
  const globalKey = (person.globalKey || "").trim().toLowerCase();
  if (globalKey.length > 0) return globalKey;
  return `tree:${person.treeId}:person:${person.id}`;
};

/** Merge multiple public tree details into one synthetic combined detail. */
export function mergeFamilyTrees(
  details: FamilyTreeDetail[],
  config: CombinedFamilyConfig,
): FamilyTreeDetail {
  const personByKey = new Map<string, FamilyPerson>();
  const keyToNewId = new Map<string, number>();
  let nextId = 1;

  for (const detail of details) {
    for (const person of detail.people) {
      const key = personKey(person);
      const existing = personByKey.get(key);
      if (!existing) {
        personByKey.set(key, { ...person, id: nextId, treeId: 0 });
        keyToNewId.set(key, nextId);
        nextId += 1;
        continue;
      }

      existing.firstName = existing.firstName ?? person.firstName ?? null;
      existing.lastName = existing.lastName ?? person.lastName ?? null;
      existing.photoUrl = existing.photoUrl ?? person.photoUrl ?? null;
      existing.notes = existing.notes ?? person.notes ?? null;
      existing.gender =
        existing.gender === "unknown" ? person.gender : existing.gender;
      existing.birthDate = existing.birthDate ?? person.birthDate ?? null;
      existing.deathDate = existing.deathDate ?? person.deathDate ?? null;
      existing.isLiving = existing.isLiving || person.isLiving;
      existing.metadata = existing.metadata ?? person.metadata ?? null;
    }
  }

  const combinedPeople = Array.from(personByKey.values());
  const relationshipKey = (
    relationship: Pick<
      FamilyRelationship,
      "relationshipType" | "personId" | "relatedPersonId"
    >,
  ) =>
    `${relationship.relationshipType}:${relationship.personId}->${relationship.relatedPersonId}`;
  const relationshipSet = new Set<string>();
  const combinedRelationships: FamilyRelationship[] = [];

  for (const detail of details) {
    const peopleById = new Map(detail.people.map((person) => [person.id, person]));
    for (const relationship of detail.relationships) {
      const left = peopleById.get(relationship.personId);
      const right = peopleById.get(relationship.relatedPersonId);
      if (!left || !right) continue;

      const newLeftId = keyToNewId.get(personKey(left));
      const newRightId = keyToNewId.get(personKey(right));
      if (!newLeftId || !newRightId) continue;

      const nextRelationship: FamilyRelationship = {
        ...relationship,
        id: combinedRelationships.length + 1,
        treeId: 0,
        personId: newLeftId,
        relatedPersonId: newRightId,
      };
      const key = relationshipKey(nextRelationship);
      if (relationshipSet.has(key)) continue;

      relationshipSet.add(key);
      combinedRelationships.push(nextRelationship);
    }
  }

  const mainKey = config.mainPersonGlobalKey.trim().toLowerCase();
  const main =
    combinedPeople.find((person) => (person.globalKey || "").toLowerCase() === mainKey) ||
    combinedPeople[0] ||
    null;
  const now = new Date().toISOString();

  return {
    tree: {
      id: 0,
      slug: config.slug,
      name: config.name,
      description: config.description,
      isPublic: true,
      createdByUserId: null,
      defaultMainPersonId: main ? main.id : null,
      createdAt: now,
      updatedAt: now,
    },
    people: combinedPeople,
    relationships: combinedRelationships,
  };
}
