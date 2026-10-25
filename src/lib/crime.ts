import type { DrunkDriver, DrunkDriverDraft, DrunkDriverPayload, DrunkDriverPhoto, PublicDrunkDriver } from "../types/crime";
import { ApiClient, ApiError } from "./api-client";
import { authService } from "./auth";
import { API_BASE_URL } from "./config";

const OWNER = "owner/crime/drunk-drivers";

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
  async extract(urls: string[]): Promise<DrunkDriverDraft> {
    const draft = await this.post<DrunkDriverDraft>(`${OWNER}/extract`, { urls });
    if (!draft) throw new Error("Empty AI draft");
    return draft;
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
