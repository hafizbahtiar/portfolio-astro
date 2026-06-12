import type {
  FamilyGender,
  FamilyRelationshipType,
  FamilyTreeDetail,
} from "../types/family";

export interface PublicFamilyTree {
  slug: string;
  name: string;
  description: string | null;
  defaultMainPersonId?: number | null;
}

export interface PublicFamilyPerson {
  id: number;
  displayName: string;
  globalKey?: string | null;
  gender: FamilyGender;
  birthDate: string | null;
  deathDate: string | null;
  isLiving: boolean;
  photoUrl: string | null;
}

export interface PublicFamilyRelationship {
  personId: number;
  relatedPersonId: number;
  relationshipType: FamilyRelationshipType;
}

export interface PublicFamilyTreeDetail {
  tree: PublicFamilyTree;
  people: PublicFamilyPerson[];
  relationships: PublicFamilyRelationship[];
}

const yearOnly = (value: string | null) => {
  if (!value) return null;
  const date = new Date(value);
  if (!Number.isNaN(date.getTime())) return String(date.getFullYear());
  const match = value.match(/\b(\d{4})\b/);
  return match ? match[1] : null;
};

export function sanitizeFamilyDetailForPublic(
  detail: FamilyTreeDetail,
): PublicFamilyTreeDetail {
  return {
    tree: {
      slug: detail.tree.slug,
      name: detail.tree.name,
      description: detail.tree.description,
      defaultMainPersonId: detail.tree.defaultMainPersonId ?? null,
    },
    people: detail.people.map((person) => ({
      id: person.id,
      displayName: person.displayName,
      globalKey: person.globalKey ?? null,
      gender: person.gender,
      birthDate: person.isLiving ? yearOnly(person.birthDate) : person.birthDate,
      deathDate: person.isLiving ? null : person.deathDate,
      isLiving: person.isLiving,
      photoUrl: person.photoUrl,
    })),
    relationships: detail.relationships.map((relationship) => ({
      personId: relationship.personId,
      relatedPersonId: relationship.relatedPersonId,
      relationshipType: relationship.relationshipType,
    })),
  };
}
