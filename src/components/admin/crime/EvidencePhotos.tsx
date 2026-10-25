import React, { useEffect, useRef, useState } from "react";
import { Loader2, RotateCcw, Trash2 } from "lucide-react";
import { ImageDropZone } from "../../ui/ImageDropZone";
import { drunkDriversService } from "../../../lib/crime";
import { compressImage, UPLOAD_TYPES } from "../../../lib/upload";
import { confirmDialog, formatErrorMessage, showToast } from "../../../lib/admin-ui";
import type { DrunkDriverPhoto } from "../../../types/crime";

const MAX_PHOTOS = 10; // API limit (services/crime-drunk-drivers.ts)

type Pending = { key: string; file: File; preview: string; state: "queued" | "uploading" | "failed"; error?: string };

/**
 * Evidence photos for /admin/crime/drunk-drivers/edit (top of the page). Private: owner-only API route, never public.
 * A new record has no id yet - picked photos wait here (with previews) and upload when the page saves the record
 * (`dd:saved` event from the page script). One request per photo, so each tile shows its own state.
 */
export function EvidencePhotos() {
  const [id, setId] = useState<number | null>(() => Number(new URLSearchParams(location.search).get("id")) || null);
  const [photos, setPhotos] = useState<DrunkDriverPhoto[]>([]);
  const [pending, setPending] = useState<Pending[]>([]);
  const running = useRef(false);

  useEffect(() => {
    const onSaved = (e: Event) => setId((e as CustomEvent<{ id: number }>).detail.id);
    window.addEventListener("dd:saved", onSaved);
    return () => window.removeEventListener("dd:saved", onSaved);
  }, []);

  useEffect(() => {
    if (!id) return;
    void drunkDriversService.getById(id).then((r) => r && setPhotos(r.photos)).catch(() => { });
  }, [id]);

  // Free the previews when the island goes away.
  const previews = useRef(new Set<string>());
  useEffect(() => () => previews.current.forEach((u) => URL.revokeObjectURL(u)), []);

  const drop = (p: Pending) => {
    URL.revokeObjectURL(p.preview);
    previews.current.delete(p.preview);
    setPending((list) => list.filter((x) => x.key !== p.key));
  };

  // Upload the queue one by one once the record exists.
  useEffect(() => {
    const next = pending.find((p) => p.state === "queued");
    if (!id || !next || running.current) return;
    running.current = true;
    setPending((list) => list.map((p) => (p.key === next.key ? { ...p, state: "uploading" } : p)));
    void (async () => {
      try {
        // Quality 95% (owner choice, evidence detail); re-encoding also drops EXIF (GPS, device).
        const { file } = await compressImage(next.file, 2560, 0.95);
        const added = await drunkDriversService.uploadPhotos(id, [file]);
        setPhotos((list) => [...list, ...added]);
        drop(next);
      } catch (error) {
        const error_ = formatErrorMessage(error, "Upload failed.", {}).message;
        setPending((list) => list.map((p) => (p.key === next.key ? { ...p, state: "failed", error: error_ } : p)));
      } finally {
        running.current = false;
        setPending((list) => [...list]); // re-run for the next queued photo
      }
    })();
  }, [id, pending]);

  const add = (files: File[]) => {
    const images = files.filter((f) => UPLOAD_TYPES.includes(f.type));
    const room = MAX_PHOTOS - photos.length - pending.length;
    const take = images.slice(0, Math.max(0, room));
    const skipped = files.length - take.length;
    if (skipped) {
      showToast({
        type: "warning",
        title: `${skipped} file(s) skipped`,
        message: images.length < files.length ? "Only JPG, PNG, WebP or GIF images." : `Up to ${MAX_PHOTOS} photos per record.`,
      });
    }
    setPending((list) => [
      ...list,
      ...take.map((file) => {
        const preview = URL.createObjectURL(file);
        previews.current.add(preview);
        return { key: preview, file, preview, state: "queued" as const };
      }),
    ]);
  };

  const remove = async (p: DrunkDriverPhoto) => {
    if (!id || !(await confirmDialog({ title: "Delete photo", message: "Delete this photo? This cannot be undone.", confirmText: "Delete", variant: "danger" }))) return;
    try {
      await drunkDriversService.removePhoto(id, p.id);
      setPhotos((list) => list.filter((x) => x.id !== p.id));
    } catch {
      showToast({ type: "error", title: "Delete failed", message: "Failed to delete the photo." });
    }
  };

  const full = photos.length + pending.length >= MAX_PHOTOS;
  const uploading = pending.filter((p) => p.state !== "failed").length;
  const tile = "relative aspect-square overflow-hidden rounded-lg ring-1 ring-gray-950/10 dark:ring-white/10";
  return (
    <section className="admin-card space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="admin-card-title mb-0!">Evidence photos</h3>
        <span className="admin-help">{photos.length + pending.length} / {MAX_PHOTOS} · private, never on the public page</span>
      </div>
      <ImageDropZone
        onFiles={add}
        disabled={full}
        busy={id && uploading ? `Uploading ${uploading} photo(s)…` : null}
        hint={full ? `Limit reached (${MAX_PHOTOS}).` : id ? "JPG, PNG, WebP or GIF · resized, 95% quality, location data removed" : "Pick them now - they upload when you save the record."}
      />
      {(photos.length > 0 || pending.length > 0) && (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {photos.map((p) => (
            <li key={p.id} className={tile}>
              <a href={drunkDriversService.photoUrl(id!, p.id)} target="_blank" rel="noopener">
                <img src={drunkDriversService.photoUrl(id!, p.id)} alt={`Evidence photo ${p.id}`} loading="lazy" className="h-full w-full object-cover" />
              </a>
              <button type="button" onClick={() => void remove(p)} aria-label={`Delete photo ${p.id}`}
                className="admin-btn admin-btn-secondary absolute right-1 top-1 px-2! py-1!">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
          {pending.map((p) => (
            <li key={p.key} className={tile}>
              <img src={p.preview} alt={p.file.name} className={`h-full w-full object-cover ${p.state === "failed" ? "opacity-40" : "opacity-60"}`} />
              <div className="absolute inset-x-0 bottom-0 flex items-center gap-1.5 bg-gray-950/70 px-2 py-1 text-xs text-white">
                {p.state === "uploading" && <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />}
                <span className="truncate" title={p.error}>
                  {p.state === "uploading" ? "Uploading…" : p.state === "failed" ? `Failed: ${p.error}` : id ? "Queued" : "Uploads on save"}
                </span>
              </div>
              <div className="absolute right-1 top-1 flex gap-1">
                {p.state === "failed" && (
                  <button type="button" aria-label={`Retry ${p.file.name}`} className="admin-btn admin-btn-secondary px-2! py-1!"
                    onClick={() => setPending((list) => list.map((x) => (x.key === p.key ? { ...x, state: "queued", error: undefined } : x)))}>
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                )}
                {p.state !== "uploading" && (
                  <button type="button" aria-label={`Remove ${p.file.name}`} className="admin-btn admin-btn-secondary px-2! py-1!" onClick={() => drop(p)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
