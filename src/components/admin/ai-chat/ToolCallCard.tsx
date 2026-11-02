import React from "react";
import { Check, ExternalLink, LoaderCircle, PencilLine, X } from "lucide-react";
import type { ChatToolCall, WritePreview } from "../../../lib/ai-chat";

/** A write card before the owner answers; error = the change could not be shown (and was refused to the model). */
export type Preview = WritePreview | { error: string };

const STATUS: Record<string, { text: string; className: string }> = {
  pending: { text: "Waiting for you", className: "bg-amber-500/10 text-amber-700 dark:text-amber-300" },
  applied: { text: "Applied", className: "admin-pill-ok" },
  rejected: { text: "Rejected", className: "admin-pill-muted" },
  expired: { text: "Not applied", className: "admin-pill-muted" },
  failed: { text: "Failed", className: "bg-red-500/10 text-red-700 dark:text-red-300" },
};

const LinkButton = ({ link }: { link: { label: string; href: string } }) => (
  <a href={link.href} className="admin-btn admin-btn-secondary min-h-8 px-3 py-1 text-xs">
    <ExternalLink className="h-3.5 w-3.5" /> {link.label}
  </a>
);

/** One tool call under a reply: a status chip for a read, a card with Apply / Reject for a write. */
export function ToolCallCard(p: {
  call: ChatToolCall;
  label: string;
  preview?: Preview;
  link?: { label: string; href: string };
  applying: boolean;
  onApply: () => void;
  onReject: () => void;
}) {
  const { call, label, preview, link } = p;
  if (call.kind === "read") {
    const failed = call.status === "failed" || call.status === "expired";
    return (
      <div className="space-y-2">
        <span
          title={failed && call.result ? call.result : undefined}
          className={`inline-flex max-w-full items-center gap-1.5 rounded-full px-2.5 py-1 text-xs ring-1 ${failed ? "text-red-700 ring-red-500/20 dark:text-red-300" : "text-gray-600 ring-gray-950/10 dark:text-gray-300 dark:ring-white/10"}`}
        >
          {call.status === "pending" ? <LoaderCircle className="h-3.5 w-3.5 shrink-0 animate-spin" /> : failed ? <X className="h-3.5 w-3.5 shrink-0" /> : <Check className="h-3.5 w-3.5 shrink-0 text-sky-600" />}
          <span className="truncate">{label}{failed && call.result ? ` - ${call.result}` : ""}</span>
        </span>
        {link && <div><LinkButton link={link} /></div>}
      </div>
    );
  }
  const open = call.status === "pending";
  const card = preview && !("error" in preview) ? preview : null;
  const status = STATUS[call.status] ?? STATUS.failed;
  return (
    <div className={`max-w-2xl overflow-hidden rounded-xl ring-1 ${open && card ? "ring-amber-500/40" : "ring-gray-950/10 dark:ring-white/10"}`}>
      <div className="flex items-center gap-2 border-b border-gray-950/5 bg-gray-950/2 px-4 py-2.5 dark:border-white/10 dark:bg-white/3">
        <PencilLine className="h-4 w-4 shrink-0 text-gray-500" />
        <p className="min-w-0 flex-1 truncate text-sm font-semibold text-gray-950 dark:text-white">{card?.title ?? label}</p>
        <span className={`admin-pill shrink-0 ${status.className}`}>{status.text}</span>
      </div>
      <div className="space-y-3 px-4 py-3">
        {card && (
          <dl className="space-y-2 text-sm">
            {card.rows.map((r) => (
              <div key={r.label} className="grid gap-0.5 sm:grid-cols-[10rem_1fr] sm:gap-3">
                <dt className="text-xs/6 text-gray-500 dark:text-gray-400">{r.label}</dt>
                <dd className="whitespace-pre-wrap wrap-anywhere">
                  {r.from !== undefined && (
                    <span className="block text-gray-500 line-through decoration-gray-400/70 dark:text-gray-400">{r.from}</span>
                  )}
                  <span className="block font-medium text-gray-950 dark:text-white">{r.to}</span>
                </dd>
              </div>
            ))}
          </dl>
        )}
        {card?.note && <p className="text-xs text-amber-700 dark:text-amber-300">{card.note}</p>}
        {preview && "error" in preview && <p className="text-xs text-red-600 dark:text-red-400">Not proposed: {preview.error}</p>}
        {!open && call.status === "failed" && call.result && !(preview && "error" in preview) && (
          <p className="text-xs text-red-600 wrap-anywhere dark:text-red-400">{call.result}</p>
        )}
        {open && !preview && (
          <p className="flex items-center gap-1.5 text-xs text-gray-500"><LoaderCircle className="h-3.5 w-3.5 animate-spin" /> Preparing the change...</p>
        )}
        {(open && card) || link ? (
          <div className="flex flex-wrap items-center justify-end gap-2">
            {link && <LinkButton link={link} />}
            {open && card && (
              <>
                <button type="button" onClick={p.onReject} disabled={p.applying} className="admin-btn admin-btn-secondary min-h-8 px-3 py-1 text-xs">
                  Reject
                </button>
                <button type="button" onClick={p.onApply} disabled={p.applying} className="admin-btn admin-btn-primary min-h-8 px-3 py-1 text-xs">
                  {p.applying ? <LoaderCircle className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />} Apply
                </button>
              </>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
