import type { NubiRace, NubiRacePayload, RaceDiscovery, RaceDraft } from "../types/nubi-races";
import { ApiClient } from "./api-client";
import { API_BASE_URL } from "./config";

const OWNER = "owner/nubi/races";

export class NubiRacesService extends ApiClient {
  constructor() {
    super(API_BASE_URL);
  }

  async list(): Promise<NubiRace[]> {
    return (await this.get<NubiRace[]>(OWNER)) ?? [];
  }

  getById(id: number): Promise<NubiRace | null> {
    return this.get<NubiRace>(`${OWNER}/${id}`);
  }

  create(data: NubiRacePayload): Promise<NubiRace | null> {
    return this.post<NubiRace>(OWNER, data);
  }

  update(id: number, data: NubiRacePayload): Promise<NubiRace | null> {
    return this.put<NubiRace>(`${OWNER}/${id}`, data);
  }

  async remove(id: number): Promise<void> {
    await this.delete(`${OWNER}/${id}`);
  }

  /** New event pages on the default listing sites + the owner's extra listing pages (not saved yet). No AI. */
  async discover(urls: string[] = []): Promise<RaceDiscovery> {
    return (await this.post<RaceDiscovery>(`${OWNER}/discover`, { urls })) ?? { sources: [], candidates: [] };
  }

  /** AI draft from the organiser's page + Clef duplicate check. excludeId = the race being edited. */
  async extract(urls: string[], excludeId?: number, search = false): Promise<RaceDraft> {
    const draft = await this.post<RaceDraft>(`${OWNER}/extract`, { urls, ...(excludeId ? { excludeId } : {}), ...(search ? { search } : {}) });
    if (!draft) throw new Error("Empty AI draft");
    return draft;
  }
}

export const nubiRacesService = new NubiRacesService();
