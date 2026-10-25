// Drunk-driver list (backend migration 045, services/crime-drunk-drivers.ts).

export interface DrunkDriverPhoto {
  id: number;
  contentType: string;
  createdAt: string;
}

/** Owner view - full record. Never rendered on a public page. */
export interface DrunkDriver {
  id: number;
  fullName: string;
  icNumber: string | null;
  incidentDate: string | null;
  location: string | null;
  details: string | null;
  convictedOn: string | null;
  caseReference: string | null;
  sourceUrl: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  photos: DrunkDriverPhoto[];
}

export type DrunkDriverPayload = Omit<DrunkDriver, "id" | "createdAt" | "updatedAt" | "photos">;

/** Public view - all the API ever sends to visitors. `ic` is a mask, never digits. */
export interface PublicDrunkDriver {
  id: number;
  name: string;
  ic: string | null;
  convictedOn: string;
  sourceUrl: string;
}
