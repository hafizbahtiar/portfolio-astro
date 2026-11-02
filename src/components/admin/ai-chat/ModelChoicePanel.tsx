import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Select } from "../../ui/Select";
import { REASONING_LABEL } from "../../../lib/ai-settings";
import { levelText, shortModel, type ChatChoice, type ChatOptions } from "../../../lib/ai-chat";

// Provider / model / reasoning picker for an AI chat - any page that lets the user pick what a chat runs on.
const DEFAULT_LEVEL = "default"; // Select value for "the model's own default" (reasoning null)

/** Provider, model and reasoning for this chat - like any AI chat's model menu. Switching applies to the next reply. */
export function ModelChoicePanel({ options, choice, onChange }: { options: ChatOptions; choice: ChatChoice; onChange: (c: Partial<ChatChoice>) => void }) {
  const provider = options.providers.find((p) => p.id === choice.provider);
  const models = provider?.models ?? [];
  const known = models.some((m) => m.id === choice.model);
  const modelOptions = [
    ...(known ? [] : [{ value: choice.model, label: choice.model, hint: provider?.models ? "not in the list" : "list unavailable" }]),
    ...models.map((m) => ({
      value: m.id,
      label: m.name,
      hint: m.usable ? [m.id, m.contextLength ? `${Math.round(m.contextLength / 1000)}k context` : ""].filter(Boolean).join(" · ") : "/messages only - not usable here",
      disabled: !m.usable,
    })),
  ];
  return (
    <div className="space-y-3">
      <Select
        label="Provider"
        value={choice.provider}
        onChange={(v) => {
          const next = options.providers.find((p) => p.id === v);
          const first = next?.models?.find((m) => m.usable)?.id;
          if (next && next.id !== choice.provider) onChange({ provider: next.id, ...(first ? { model: first } : {}) });
        }}
        options={options.providers.map((p) => ({
          value: p.id,
          label: p.label,
          hint: !p.configured ? "no key" : p.keySource === "own" ? "your key" : "platform key",
          disabled: !p.configured,
        }))}
      />
      <Select label="Model" searchable searchPlaceholder="Search models…" value={choice.model} onChange={(v) => onChange({ model: String(v) })} options={modelOptions} />
      <Select
        label="Reasoning"
        value={choice.reasoning ?? DEFAULT_LEVEL}
        onChange={(v) => onChange({ reasoning: v === DEFAULT_LEVEL ? null : (v as ChatChoice["reasoning"]) })}
        options={[{ value: DEFAULT_LEVEL, label: "Model default" }, ...options.reasoning.map((r) => ({ value: r, label: REASONING_LABEL[r] }))]}
      />
      <p className="admin-help">
        Applies to the next reply; earlier replies keep the model that wrote them. Higher reasoning costs more tokens and time - low is usually enough for a chat. New chats start on the "Admin AI chat" setting in <a className="admin-link" href="/admin/ai">AI Models</a>.
      </p>
    </div>
  );
}

/**
 * The model chip of an AI chat ("deepseek-v4.1-flash · Low"), opening the panel above it - the composer's model menu,
 * like ChatGPT / Claude. Closes on a click outside or Escape.
 */
export function ModelMenu(p: { options: ChatOptions | null; choice: ChatChoice | null; onChange: (c: Partial<ChatChoice>) => void }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const away = (e: MouseEvent) => !root.current?.contains(e.target as Node) && setOpen(false);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", away);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", away);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);
  if (!p.choice) return null;
  return (
    <div ref={root} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        title="Provider, model and reasoning"
        className="inline-flex max-w-full items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-950/5 hover:text-gray-950 aria-expanded:bg-gray-950/5 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white dark:aria-expanded:bg-white/10"
      >
        <span className="truncate">{shortModel(p.choice.model)}</span>
        <span className="text-gray-400">·</span>
        <span className="shrink-0">{levelText(p.choice.reasoning)}</span>
        <ChevronDown className="h-3.5 w-3.5 shrink-0" />
      </button>
      {open && p.options && (
        <div role="dialog" aria-label="Model" className="absolute bottom-full left-0 z-40 mb-2 w-[min(88vw,24rem)] rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-950/10 dark:bg-gray-900 dark:ring-white/10">
          <ModelChoicePanel options={p.options} choice={p.choice} onChange={p.onChange} />
        </div>
      )}
    </div>
  );
}
