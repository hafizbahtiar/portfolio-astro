// Drunk-driver list (backend migration 045, services/crime-drunk-drivers.ts).

export interface DrunkDriverPhoto {
  id: number;
  contentType: string;
  createdAt: string;
}

export type CaseStatus = "charged" | "on_trial" | "convicted" | "under_appeal" | "closed";
/** filed = pending; allowed = conviction quashed (the API refuses to publish it). */
export type AppealStatus = "none" | "filed" | "dismissed" | "allowed" | "partly_allowed";

export type AlcoholTest = "breath" | "blood" | "urine";

export interface DrunkDriverLawyer {
  name: string;
  role: "defence" | "prosecution" | null;
  firm: string | null;
}

export type VictimOutcome = "killed" | "seriously_injured" | "injured" | "unhurt";

/** Owner-only, never public. dateOfBirth comes from the IC when empty; age = at the incident. */
export interface DrunkDriverVictim {
  fullName: string | null;
  icNumber: string | null;
  dateOfBirth: string | null;
  age: number | null;
  outcome: VictimOutcome | null;
  notes: string | null;
}

/** Owner view - full record. Never rendered on a public page. */
export interface DrunkDriver {
  id: number;
  fullName: string;
  /** false = the accused is not named yet; fullName is a working label. Never public. */
  nameDisclosed: boolean;
  icNumber: string | null;
  dateOfBirth: string | null;
  age: number | null;
  incidentDate: string | null;
  location: string | null;
  details: string | null;
  convictedOn: string | null;
  caseReference: string | null;
  charge: string | null;
  sentence: string | null;
  caseStatus: CaseStatus | null;
  appealStatus: AppealStatus | null;
  appealDecidedOn: string | null;
  appealNotes: string | null;
  courtDocuments: string[];
  alcoholTest: AlcoholTest | null;
  /** breath = micrograms/100 ml, blood/urine = mg/100 ml. */
  alcoholReading: number | null;
  licenceDisqualifiedMonths: number | null;
  licenceDisqualifiedFrom: string | null;
  /** Worked out by the API (from + months); not sent back. */
  licenceDisqualifiedUntil: string | null;
  lawyers: DrunkDriverLawyer[];
  lastCheckedOn: string | null;
  /** First = main source. */
  sources: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
  photos: DrunkDriverPhoto[];
  victims: DrunkDriverVictim[];
}

export type DrunkDriverPayload = Omit<DrunkDriver, "id" | "createdAt" | "updatedAt" | "photos" | "licenceDisqualifiedUntil">;

/** Public view - all the API ever sends to visitors. `ic` is a mask, never digits. */
export interface PublicDrunkDriver {
  id: number;
  name: string;
  ic: string | null;
  convictedOn: string;
  sources: string[];
}

export type ExtractField =
  | "fullName" | "age" | "incidentDate" | "location" | "convictedOn" | "caseReference" | "details"
  | "charge" | "sentence" | "caseStatus" | "appealStatus" | "appealDecidedOn" | "appealNotes"
  | "alcoholTest" | "alcoholReading" | "licenceDisqualifiedMonths";

/** AI draft from source links - every field's quote was found on its page by the API. Nothing is saved. */
export interface DrunkDriverDraft {
  fields: Partial<Record<ExtractField, { value: string; source: string; quote: string }>>;
  victims: { fullName: string | null; age: number | null; outcome: VictimOutcome | null; source: string; quote: string }[];
  lawyers: (DrunkDriverLawyer & { source: string; quote: string })[];
  rejected: { field: string; reason: string }[];
  conflicts: { field: string; note: string }[];
  sources: { url: string; ok: boolean; title: string | null; error: string | null }[];
  model: string;
}
