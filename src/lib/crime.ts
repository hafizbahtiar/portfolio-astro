import type { DrunkDriver, DrunkDriverDraft, DrunkDriverPayload, DrunkDriverPhoto, PublicDrunkDriver, SourceImages } from "../types/crime";
import { ApiClient, ApiError } from "./api-client";
import { authService } from "./auth";
import { API_BASE_URL } from "./config";

const OWNER = "owner/crime/drunk-drivers";

/** Mirror of the API's addMonths (services/crime-drunk-drivers.ts): day clamped to the month's end. */
export const addMonths = (from: string, months: number): string => {
  const [y, m, d] = from.split("-").map(Number);
  const end = new Date(Date.UTC(y, m - 1 + months + 1, 0)).getUTCDate();
  return new Date(Date.UTC(y, m - 1 + months, Math.min(d, end))).toISOString().slice(0, 10);
};

/** Mirror of the API's isSafeSourceUrl (validators/crime.ts): https, a named host, no login in the link. */
export const isSafeSourceUrl = (v: string) => {
  if (!/^https:\/\/\S+$/i.test(v)) return false;
  try {
    const u = new URL(v);
    return (
      u.protocol === "https:" && !u.username && !u.password &&
      /^[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(u.hostname) && !/^[\d.]+$/.test(u.hostname)
    );
  } catch {
    return false;
  }
};

export class DrunkDriversService extends ApiClient {
  constructor() {
    super(API_BASE_URL);
  }

  /** Null while the owner switch is off (the API answers 404). */
  getPublic(): Promise<PublicDrunkDriver[] | null> {
    return this.get<PublicDrunkDriver[]>("crime/drunk-drivers");
  }

  async list(): Promise<DrunkDriver[]> {
    return (await this.get<DrunkDriver[]>(OWNER)) ?? [];
  }

  getById(id: number): Promise<DrunkDriver | null> {
    return this.get<DrunkDriver>(`${OWNER}/${id}`);
  }

  create(data: DrunkDriverPayload): Promise<DrunkDriver | null> {
    return this.post<DrunkDriver>(OWNER, data);
  }

  update(id: number, data: DrunkDriverPayload): Promise<DrunkDriver | null> {
    return this.put<DrunkDriver>(`${OWNER}/${id}`, data);
  }

  /** AI draft from up to 5 links (owner reviews; nothing saved). Throws ApiError with `code` on failure. */
  /** `search` = also read the top web results for this query (the API's web search provider). */
  async extract(urls: string[], search?: string): Promise<DrunkDriverDraft> {
    const draft = await this.post<DrunkDriverDraft>(`${OWNER}/extract`, search ? { urls, search } : { urls });
    if (!draft) throw new Error("Empty AI draft");
    return draft;
  }

  /** Up to 5 photos from the source pages, as files ready for the normal photo upload. */
  async sourceImages(urls: string[]): Promise<{ files: File[]; failed: SourceImages["sources"] }> {
    const r = await this.post<SourceImages>(`${OWNER}/source-images`, { urls });
    const files = (r?.images ?? []).map((img, i) => {
      const bytes = Uint8Array.from(atob(img.data), (ch) => ch.charCodeAt(0));
      const name = decodeURIComponent(new URL(img.url).pathname.split("/").pop() || `source-${i + 1}`);
      return new File([bytes], name, { type: img.contentType });
    });
    return { files, failed: (r?.sources ?? []).filter((x) => !x.ok) };
  }

  async remove(id: number): Promise<void> {
    await this.delete(`${OWNER}/${id}`);
  }

  async removePhoto(id: number, photoId: number): Promise<void> {
    await this.delete(`${OWNER}/${id}/photos/${photoId}`);
  }

  /** Owner-only image URL - the auth cookie goes with the <img> request (same site). */
  photoUrl(id: number, photoId: number): string {
    return `${this.baseUrl}/${OWNER}/${id}/photos/${photoId}`;
  }

  /** Multipart upload, all files in one request (all-or-nothing on the API). */
  async uploadPhotos(id: number, files: File[]): Promise<DrunkDriverPhoto[]> {
    const form = new FormData();
    files.forEach((f) => form.append("file", f));
    const send = () =>
      fetch(`${this.baseUrl}/${OWNER}/${id}/photos`, { method: "POST", credentials: "include", body: form });
    // Same one-shot refresh as uploadImage (lib/upload.ts).
    let response = await send();
    if (response.status === 401 && (await authService.tryRefresh())) response = await send();
    const json = await response.json().catch(() => ({}));
    if (!response.ok || !json?.success) {
      throw new ApiError(json?.error || `Upload failed: ${response.status}`, response.status, json);
    }
    return json.data as DrunkDriverPhoto[];
  }
}

export const drunkDriversService = new DrunkDriversService();
