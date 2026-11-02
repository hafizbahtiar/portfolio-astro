import React, { useEffect, useRef, type ReactNode } from "react";
import { ArrowUp } from "lucide-react";

/**
 * The message box of an AI chat: grows with the text (up to ~8 lines), Enter sends, Shift+Enter is a new line.
 * `tools` sits bottom-left inside the box (the model menu), `note` under it.
 */
export function ChatComposer(p: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  placeholder?: string;
  tools?: ReactNode;
  note?: ReactNode;
  autoFocus?: boolean;
}) {
  const box = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 208)}px`;
  }, [p.value]);
  const canSend = !p.disabled && !!p.value.trim();
  return (
    <div className="space-y-2">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (canSend) p.onSubmit();
        }}
        className="rounded-3xl bg-white p-2 ring-1 ring-gray-950/10 transition-shadow focus-within:ring-2 focus-within:ring-sky-500/50 dark:bg-white/5 dark:ring-white/10"
      >
        <textarea
          ref={box}
          value={p.value}
          onChange={(e) => p.onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
              e.preventDefault();
              if (canSend) p.onSubmit();
            }
          }}
          rows={1}
          maxLength={8000}
          autoFocus={p.autoFocus}
          placeholder={p.placeholder}
          aria-label="Message"
          className="block max-h-52 w-full resize-none bg-transparent px-3 pt-2 pb-1 text-sm/6 text-gray-950 outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-gray-500"
        />
        <div className="flex items-center justify-between gap-2 pl-1">
          <div className="min-w-0">{p.tools}</div>
          <button
            type="submit"
            disabled={!canSend}
            aria-label="Send"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gray-950 text-white transition-colors hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 disabled:cursor-not-allowed disabled:bg-gray-950/10 disabled:text-gray-400 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200 dark:disabled:bg-white/10 dark:disabled:text-gray-500"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </form>
      {p.note && <p className="text-center text-xs text-gray-500 dark:text-gray-400">{p.note}</p>}
    </div>
  );
}
