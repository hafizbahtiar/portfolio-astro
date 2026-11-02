import React from "react";
import { ArrowLeft, MessageSquarePlus, Pencil, Trash2 } from "lucide-react";
import type { ChatSession } from "../../../lib/ai-chat";

// D1 times are UTC "YYYY-MM-DD HH:MM:SS"; grouped by the viewer's own day.
const dateOf = (s: string) => new Date(/[zZ]$/.test(s) ? s : `${s.replace(" ", "T")}Z`);
const GROUPS = ["Today", "Yesterday", "Previous 7 days", "Previous 30 days", "Older"] as const;
const groupOf = (s: ChatSession, today: Date) => {
  const day = dateOf(s.updatedAt);
  const days = Math.floor((today.getTime() - new Date(day.getFullYear(), day.getMonth(), day.getDate()).getTime()) / 86_400_000);
  return days <= 0 ? GROUPS[0] : days === 1 ? GROUPS[1] : days <= 7 ? GROUPS[2] : days <= 30 ? GROUPS[3] : GROUPS[4];
};

/** The chats of one module, newest first, under Today / Yesterday / ... - the sidebar of an AI chat. */
export function ChatSessionList(p: {
  sessions: ChatSession[];
  activeId: string | null;
  onOpen: (id: string) => void;
  onNew: () => void;
  onRename: (s: ChatSession) => void;
  onDelete: (s: ChatSession) => void;
  back?: { label: string; href: string };
}) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const groups = GROUPS.map((g) => ({ g, list: p.sessions.filter((s) => groupOf(s, today) === g) })).filter((x) => x.list.length);
  return (
    <div className="flex h-full flex-col">
      <div className="p-3">
        <button type="button" onClick={p.onNew} className="admin-btn admin-btn-secondary w-full justify-start">
          <MessageSquarePlus className="h-4 w-4" /> New chat
        </button>
      </div>
      <nav aria-label="Chats" className="min-h-0 flex-1 space-y-4 overflow-y-auto px-3 pb-3 scrollbar-thin">
        {groups.map(({ g, list }) => (
          <div key={g}>
            <p className="px-2 pb-1 text-xs font-medium text-gray-500 dark:text-gray-400">{g}</p>
            <ul className="space-y-0.5">
              {list.map((s) => (
                <li key={s.id} className={`group relative rounded-lg ${p.activeId === s.id ? "bg-gray-950/5 dark:bg-white/10" : "hover:bg-gray-950/2.5 dark:hover:bg-white/5"}`}>
                  <button
                    type="button"
                    onClick={() => p.onOpen(s.id)}
                    aria-current={p.activeId === s.id ? "page" : undefined}
                    className="block w-full truncate rounded-lg py-2 pr-14 pl-2 text-left text-sm text-gray-800 dark:text-gray-200"
                  >
                    {s.title || "Untitled"}
                  </button>
                  <span className={`absolute inset-y-0 right-1 flex items-center gap-0.5 ${p.activeId === s.id ? "" : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"}`}>
                    <button type="button" onClick={() => p.onRename(s)} aria-label={`Rename ${s.title || "chat"}`} className="rounded-md p-1 text-gray-400 hover:bg-gray-950/5 hover:text-gray-700 dark:hover:bg-white/10 dark:hover:text-gray-200">
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button type="button" onClick={() => p.onDelete(s)} aria-label={`Delete ${s.title || "chat"}`} className="rounded-md p-1 text-gray-400 hover:bg-red-500/10 hover:text-red-600">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {!p.sessions.length && <p className="admin-help px-2">No chats yet - they are saved here until you delete them.</p>}
      </nav>
      {p.back && (
        <a href={p.back.href} className="flex items-center gap-2 border-t border-gray-950/5 px-5 py-3 text-sm text-gray-600 hover:text-gray-950 dark:border-white/10 dark:text-gray-400 dark:hover:text-white">
          <ArrowLeft className="h-4 w-4" /> {p.back.label}
        </a>
      )}
    </div>
  );
}
