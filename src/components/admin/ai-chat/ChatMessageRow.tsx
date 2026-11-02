import React, { useState, type ReactNode } from "react";
import { Check, Copy, Sparkles } from "lucide-react";
import { copyText } from "../../../lib/clipboard";
import { formatTokens, shortModel, type ChatMessage } from "../../../lib/ai-chat";
import { ChatMarkdown } from "./ChatMarkdown";

/** The assistant's mark, beside each reply and the "thinking" line. */
export function AssistantAvatar() {
  return (
    <span aria-hidden="true" className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sky-500/10 text-sky-600 ring-1 ring-sky-500/20 dark:text-sky-400">
      <Sparkles className="h-3.5 w-3.5" />
    </span>
  );
}

/**
 * One message, Claude / ChatGPT style: the user's in a soft bubble on the right, the assistant's as plain text beside
 * its mark, with its tool calls (`children`) under it and a copy button + model line on hover.
 */
export function ChatMessageRow({ message, children }: { message: ChatMessage; children?: ReactNode }) {
  const [copied, setCopied] = useState(false);
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <p className="max-w-[85%] rounded-3xl bg-gray-950/5 px-4 py-2.5 text-sm/6 whitespace-pre-wrap text-gray-950 wrap-anywhere sm:max-w-[75%] dark:bg-white/10 dark:text-white">
          {message.content}
        </p>
      </div>
    );
  }
  return (
    <div className="group flex gap-3">
      <AssistantAvatar />
      <div className="min-w-0 flex-1 space-y-3 pt-0.5">
        {message.content && <div className="text-gray-800 dark:text-gray-200"><ChatMarkdown text={message.content} /></div>}
        {children}
        <div className="flex h-6 items-center gap-2 text-[11px] text-gray-400 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 tabular-nums">
          {message.content && (
            <button
              type="button"
              onClick={async () => {
                setCopied(await copyText(message.content));
                window.setTimeout(() => setCopied(false), 1500);
              }}
              aria-label="Copy reply"
              className="rounded-md p-1 hover:bg-gray-950/5 hover:text-gray-700 dark:hover:bg-white/10 dark:hover:text-gray-200"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          )}
          {message.model && <span>{shortModel(message.model)} · {formatTokens(message.inputTokens ?? 0)} in · {formatTokens(message.outputTokens ?? 0)} out</span>}
        </div>
      </div>
    </div>
  );
}

/** The waiting line: the mark, three dots and the seconds so far (the API answers once - no streaming). */
export function ThinkingRow({ seconds }: { seconds: number }) {
  return (
    <div className="flex items-center gap-3" aria-live="polite">
      <AssistantAvatar />
      <span className="flex items-center gap-1" aria-label="Thinking">
        {[0, 150, 300].map((d) => (
          <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: `${d}ms` }} />
        ))}
      </span>
      <span className="text-xs text-gray-400 tabular-nums">{seconds}s</span>
    </div>
  );
}
