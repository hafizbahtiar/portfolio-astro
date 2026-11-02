// Nubi race calendar (API migration 053, /owner/nubi/races). Shown on nubisport /races.
export interface RaceCategory {
  name: string; // "21KM", "Half Marathon", "Kids Dash"
  distanceKm: number | null;
  startTime: string | null; // this category's flag-off
  fees: { tier: string; amountRm: number }[]; // "Early Bird" RM120 ...
}

export interface NubiRacePayload {
  name: string;
  raceDate: string; // first race day, YYYY-MM-DD, Malaysia time
  endDate: string | null; // multi-day races
  startTime: string; // HH:MM first flag-off
  venue: string;
  state: string;
  categories: RaceCategory[];
  registrationOpens: string | null;
  registrationCloses: string | null;
  organiser: string | null;
  url: string; // the race page - one race per page
  checkedOn: string;
}

export interface NubiRace extends NubiRacePayload {
  id: number;
  slug: string;
}

export type RaceField =
  | "name" | "raceDate" | "endDate" | "startTime" | "venue" | "state" | "registrationOpens" | "registrationCloses" | "organiser";

export interface DraftCategory extends RaceCategory {
  source: string;
  quote: string;
  support?: number | null;
}

export interface RaceDraft {
  /** support = Clef P(the quote states this value); null = not scored. */
  fields: Partial<Record<RaceField, { value: string; source: string; quote: string; support?: number | null }>>;
  categories: DraftCategory[];
  rejected: { field: string; reason: string }[];
  url: string;
  /** Saved races that look like this one (sameEvent 1 = same official page; null = Clef off, same date). */
  duplicates: { id: number; name: string; raceDate: string; url: string; sameEvent: number | null }[];
  sources: { url: string; ok: boolean; title: string | null; error: string | null }[];
  model: string;
}

/** "Up to date": event pages on the default listing sites that are not saved yet (no AI). */
export interface RaceDiscovery {
  sources: { name: string; url: string; ok: boolean; error: string | null; found: number }[];
  candidates: { url: string; title: string; source: string }[];
}
