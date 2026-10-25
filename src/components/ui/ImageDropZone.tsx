import React, { useState } from "react";
import { ImageUp, Loader2 } from "lucide-react";
import { UPLOAD_TYPES } from "../../lib/upload";

/**
 * Drag-and-drop / tap-to-choose image picker (multiple). Only picks files - the caller filters types,
 * compresses, uploads and shows progress. `busy` = a status line; the zone is disabled while set.
 */
export function ImageDropZone({
  onFiles,
  busy = null,
  hint = "JPG, PNG, WebP or GIF · resized and compressed automatically",
  disabled = false,
}: {
  onFiles: (files: File[]) => void;
  busy?: string | null;
  hint?: string;
  disabled?: boolean;
}) {
  const [dragging, setDragging] = useState(false);
  const off = !!busy || disabled;
  return (
    <label
      onDragOver={(e) => { e.preventDefault(); if (!off) setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        if (!off) onFiles([...e.dataTransfer.files]); // the caller filters types (it reports what it skipped)
      }}
      aria-busy={!!busy}
      aria-disabled={disabled || undefined}
      className={`flex flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed px-4 py-8 text-center transition-colors has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-sky-500 ${off ? "cursor-not-allowed border-gray-950/10 opacity-70 dark:border-white/15" : dragging ? "cursor-copy border-sky-500 bg-sky-500/5" : "cursor-pointer border-gray-950/10 hover:border-sky-500/50 hover:bg-gray-950/2 dark:border-white/15 dark:hover:bg-white/3"}`}
    >
      <input type="file" accept={UPLOAD_TYPES.join(",")} multiple className="sr-only" disabled={off}
        onChange={(e) => { onFiles([...(e.target.files ?? [])]); e.target.value = ""; }} />
      {busy
        ? <Loader2 className="h-6 w-6 animate-spin text-sky-500" aria-hidden="true" />
        : <ImageUp className={`h-6 w-6 ${dragging ? "text-sky-500" : "text-gray-400"}`} aria-hidden="true" />}
      <span className="text-sm/6 font-medium text-gray-950 dark:text-white" aria-live="polite">
        {busy ?? (dragging ? "Drop to add" : <>
          <span className="sm:hidden">Tap to choose images</span>
          <span className="hidden sm:inline">Drop images here or <span className="text-sky-600 dark:text-sky-400">browse</span></span>
        </>)}
      </span>
      <span className="admin-help">{hint}</span>
    </label>
  );
}
