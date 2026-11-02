import React, { useEffect, useRef } from "react";
import { renderMarkdown } from "../../../lib/chat-markdown";

/** One AI reply, rendered by lib/chat-markdown.ts (DOM nodes only - the model's text never reaches innerHTML). */
export function ChatMarkdown({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) renderMarkdown(ref.current, text);
  }, [text]);
  return (
    <div
      ref={ref}
      className="space-y-2 text-sm/6 wrap-anywhere [&_a]:text-sky-600 [&_a]:underline [&_code]:rounded [&_code]:bg-gray-950/5 [&_code]:px-1 dark:[&_code]:bg-white/10 [&_h3]:font-semibold [&_h4]:font-semibold [&_ol]:list-decimal [&_ol]:pl-5 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-gray-950/5 [&_pre]:p-2 dark:[&_pre]:bg-white/5 [&_ul]:list-disc [&_ul]:pl-5 [&>div]:overflow-x-auto [&>div]:rounded-lg [&>div]:ring-1 [&>div]:ring-gray-950/10 dark:[&>div]:ring-white/10 [&_table]:w-full [&_table]:text-left [&_th]:bg-gray-950/3 [&_th]:font-semibold dark:[&_th]:bg-white/5 [&_td]:border-t [&_td]:border-gray-950/5 dark:[&_td]:border-white/10 [&_td]:px-3 [&_td]:py-1.5 [&_th]:px-3 [&_th]:py-1.5 [&_td]:align-top [&_th]:whitespace-nowrap [&_table]:wrap-normal"
    />
  );
}
