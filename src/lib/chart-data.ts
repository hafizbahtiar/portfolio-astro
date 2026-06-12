import type { Data } from "family-chart";
import type { PublicFamilyTreeDetail } from "./family-privacy";
import type { FamilyTreeDetail } from "../types/family";

export const mapGender = (gender: string): "M" | "F" =>
  gender === "female" ? "F" : "M";

export const splitDisplayName = (displayName: string) => {
  const parts = displayName.trim().split(/\s+/);
  if (parts.length <= 1) {
    return { firstName: displayName.trim(), lastName: "" };
  }
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
};

export const buildChartData = (
  detail: FamilyTreeDetail | PublicFamilyTreeDetail,
): Data => {
  const personMap = new Map(
    detail.people.map((person) => [
      String(person.id),
      {
        id: String(person.id),
        data: {
          label: person.displayName,
          global_key: person.globalKey || undefined,
          metadata: "metadata" in person ? person.metadata || null : null,
          "first name": (
            ("firstName" in person ? person.firstName : null) ||
            splitDisplayName(person.displayName).firstName ||
            person.displayName
          ).trim(),
          "last name": (
            ("lastName" in person ? person.lastName : null) ||
            splitDisplayName(person.displayName).lastName ||
            ""
          ).trim(),
          name: person.displayName,
          birthday: person.birthDate
            ? new Date(person.birthDate).getFullYear().toString()
            : undefined,
          death: person.deathDate
            ? new Date(person.deathDate).getFullYear().toString()
            : undefined,
          status: person.isLiving ? "Living" : "Deceased",
          living: person.isLiving,
          avatar: person.photoUrl || undefined,
          gender: mapGender(person.gender),
          original_gender: person.gender,
        },
        rels: {
          parents: [] as string[],
          spouses: [] as string[],
          children: [] as string[],
        },
      },
    ]),
  );

  for (const relationship of detail.relationships) {
    const from = personMap.get(String(relationship.personId));
    const to = personMap.get(String(relationship.relatedPersonId));
    if (!from || !to) continue;

    if (relationship.relationshipType === "spouse") {
      from.rels.spouses.push(to.id);
      to.rels.spouses.push(from.id);
      continue;
    }

    if (
      relationship.relationshipType === "parent" ||
      relationship.relationshipType === "adoptive_parent"
    ) {
      from.rels.children.push(to.id);
      to.rels.parents.push(from.id);
      continue;
    }

    if (
      relationship.relationshipType === "child" ||
      relationship.relationshipType === "adopted_child"
    ) {
      from.rels.parents.push(to.id);
      to.rels.children.push(from.id);
    }
  }

  for (const person of personMap.values()) {
    person.rels.parents = [...new Set(person.rels.parents)];
    person.rels.spouses = [...new Set(person.rels.spouses)];
    person.rels.children = [...new Set(person.rels.children)];
  }

  return Array.from(personMap.values());
};
