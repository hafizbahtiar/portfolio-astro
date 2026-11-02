import React, { useEffect, useRef, useState } from "react";
import { PanelLeft, RotateCcw, Sparkles, SquarePen } from "lucide-react";
import { ApiError } from "../../../lib/api-client";
import { confirmDialog, showToast } from "../../../lib/admin-ui";
import {
  RESULT_MAX, aiChatService, formatTokens, parseArgs,
  type ChatChoice, type ChatMessage, type ChatOptions, type ChatSession, type ChatToolCall, type ToolAnswer,
} from "../../../lib/ai-chat";
import { chatModuleBySlug } from "../../../lib/ai-chat-modules";
import { ChatComposer } from "./ChatComposer";
import { ChatMessageRow, ThinkingRow } from "./ChatMessageRow";
import { ChatSessionList } from "./ChatSessionList";
import { ModelMenu } from "./ModelChoicePanel";
import { ToolCallCard, type Preview } from "./ToolCallCard";

// The owner's admin AI chat - one component for every module (hono-workers docs/plans/ai/admin-chat.md). Chats are
// saved on the server. After each reply: read tools run on their own, write tools show a card (old -> new) and wait
// for Apply / Reject; once every open call has an answer they go back to the model together.

type Chat = ChatSession & { module: string; messages: ChatMessage[] };
interface Problem { text: string; resume: boolean }

const errorText = (e: unknown) => (e instanceof Error ? e.message : String(e));
const codeOf = (e: unknown) => (e instanceof ApiError ? (e.data?.code as string | undefined) : undefined);
const chatParam = () => new URLSearchParams(location.search).get("chat");
const setChatParam = (id: string | null) => {
  const url = new URL(location.href);
  if (id) url.searchParams.set("chat", id);
  else url.searchParams.delete("chat");
  history.replaceState(null, "", url);
};

export function AiChat({ slug }: { slug: string }) {
  const module = chatModuleBySlug(slug);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [chat, setChat] = useState<Chat | null>(null);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [started, setStarted] = useState(0);
  const [now, setNow] = useState(0);
  const [problem, setProblem] = useState<Problem | null>(null);
  const [previews, setPreviews] = useState<Record<string, Preview>>({});
  const [links, setLinks] = useState<Record<string, { label: string; href: string }>>({});
  const [applying, setApplying] = useState<string | null>(null);
  const [showList, setShowList] = useState(false);
  const [denied, setDenied] = useState(false);
  const [options, setOptions] = useState<ChatOptions | null>(null);
  const [draftChoice, setDraftChoice] = useState<ChatChoice | null>(null); // a new chat's pick, sent when it is created
  // The open calls of the last reply and the answers so far (a ref: answers arrive from async runs).
  const round = useRef<{ chatId: string; ids: string[]; answers: Map<string, ToolAnswer> } | null>(null);
  const bottom = useRef<HTMLDivElement>(null);

  const refreshList = async () => {
    if (!module) return;
    try {
      setSessions(await aiChatService.sessions(module.id));
    } catch (e) {
      if (e instanceof ApiError && e.status === 403) setDenied(true);
    }
  };

  useEffect(() => {
    if (!module) return;
    void refreshList();
    aiChatService.options().then((o) => {
      setOptions(o);
      setDraftChoice((d) => d ?? o.default);
    }).catch(() => null);
    const id = chatParam();
    if (id) void open(id);
  }, []);

  useEffect(() => {
    if (!busy) return;
    const t = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, [busy]);

  useEffect(() => {
    bottom.current?.scrollIntoView({ block: "end" });
  }, [chat?.messages.length, busy, Object.keys(previews).length]);

  if (!module) return <p className="admin-help">Unknown chat module.</p>;
  if (denied) return <p className="admin-help">The AI chat is for the owner only.</p>;

  const load = async (id: string): Promise<Chat | null> => {
    const c = await aiChatService.getSession(id);
    if (!c) return null;
    setChat(c);
    return c;
  };

  /** Run the open calls of the newest reply: reads now, writes as cards. */
  const settle = async (c: Chat) => {
    const last = c.messages.at(-1);
    const open = last?.role === "assistant" ? last.toolCalls.filter((t) => t.status === "pending") : [];
    round.current = open.length ? { chatId: c.id, ids: open.map((t) => t.id), answers: new Map() } : null;
    await Promise.all(open.map(async (call) => {
      const runner = module.tools[call.name];
      const args = parseArgs(call.arguments);
      if (!runner || runner.kind !== call.kind) return answer(call, "failed", `Unknown tool "${call.name}" - not run.`);
      if (runner.kind === "read") {
        try {
          const out = await runner.run(args);
          if (out.link) setLinks((l) => ({ ...l, [call.id]: out.link! }));
          return answer(call, "done", out.content);
        } catch (e) {
          return answer(call, "failed", errorText(e));
        }
      }
      try {
        const p = await runner.preview!(args);
        setPreviews((x) => ({ ...x, [call.id]: p }));
      } catch (e) {
        // Nothing to show (bad id, no change, a link the form refuses): the model hears why.
        setPreviews((x) => ({ ...x, [call.id]: { error: errorText(e) } }));
        answer(call, "failed", `Not proposed: ${errorText(e)}`);
      }
    }));
  };

  const answer = (call: ChatToolCall, status: ToolAnswer["status"], content: string, target?: string) => {
    const r = round.current;
    if (!r || !r.ids.includes(call.id) || r.answers.has(call.id)) return;
    r.answers.set(call.id, { toolCallId: call.id, status, content: content.slice(0, RESULT_MAX), target: target ?? null });
    if (r.answers.size === r.ids.length) {
      round.current = null;
      void send(r.chatId, { toolResults: [...r.answers.values()] });
    }
  };

  const send = async (chatId: string, body: Parameters<typeof aiChatService.turn>[1]) => {
    setBusy(true);
    setStarted(Date.now());
    setNow(Date.now());
    setProblem(null);
    try {
      await aiChatService.turn(chatId, body);
    } catch (e) {
      const code = codeOf(e);
      if (code === "ai_busy" || code === "ai_failed" || code === "ai_unavailable")
        setProblem({ text: code === "ai_unavailable" ? "AI is not configured." : "The AI did not answer.", resume: code !== "ai_unavailable" });
      else if (code === "ai_turn_over") setProblem({ text: "Too many steps for one message - send a new message to go on.", resume: false });
      else setProblem({ text: errorText(e), resume: false });
    }
    const c = await load(chatId).catch(() => null);
    setBusy(false);
    void refreshList();
    if (c) await settle(c);
  };

  const open = async (id: string) => {
    setPreviews({});
    setLinks({});
    setProblem(null);
    setShowList(false);
    const c = await load(id).catch(() => null);
    if (!c) {
      setChat(null);
      setChatParam(null);
      showToast({ type: "error", title: "Chat not found" });
      return;
    }
    setChatParam(id);
    await settle(c);
  };

  const submit = async () => {
    const text = input.trim();
    if (!text || busy) return;
    let id = chat?.id;
    if (!id) {
      // A chat is created on its first message - no empty chats in the list.
      const pick = draftChoice ?? options?.default;
      if (!pick) return showToast({ type: "error", title: "AI options are still loading" });
      const c = await aiChatService.create(module.id, pick).catch((e) => {
        showToast({ type: "error", title: "Could not start a chat", message: errorText(e) });
        return null;
      });
      if (!c) return;
      id = c.id;
      setChat({ ...c, module: module.id, messages: [] });
      setChatParam(id);
    }
    round.current = null; // the API closes open calls (writes = not applied)
    setInput("");
    setChat((c) => (c ? { ...c, messages: [...c.messages, { id: -1, role: "user", content: text, createdAt: "", toolCalls: [] }] } : c));
    await send(id, { message: text });
  };

  const apply = async (call: ChatToolCall) => {
    const runner = module.tools[call.name];
    setApplying(call.id);
    try {
      const out = await runner.run(parseArgs(call.arguments));
      if (out.link) setLinks((l) => ({ ...l, [call.id]: out.link! }));
      answer(call, "applied", out.content, out.target);
    } catch (e) {
      showToast({ type: "error", title: "Not saved", message: errorText(e) });
      answer(call, "failed", `Save refused: ${errorText(e)}`);
    }
    setApplying(null);
  };

  const remove = async (s: ChatSession) => {
    if (!(await confirmDialog({ title: "Delete this chat?", message: `"${s.title || "Untitled"}" and everything in it is deleted for good.`, confirmText: "Delete", variant: "danger" }))) return;
    await aiChatService.remove(s.id);
    if (chat?.id === s.id) {
      setChat(null);
      setChatParam(null);
    }
    void refreshList();
  };

  const rename = async (s: ChatSession) => {
    const title = window.prompt("Chat name", s.title)?.trim();
    if (!title) return;
    await aiChatService.update(s.id, { title: title.slice(0, 120) });
    if (chat?.id === s.id) setChat({ ...chat, title });
    void refreshList();
  };

  // An open chat saves the switch now; a new one keeps it until its first message creates it.
  const choose = async (set: Partial<ChatChoice>) => {
    if (!chat) return setDraftChoice((d) => (d ? { ...d, ...set } : d));
    try {
      const saved = await aiChatService.update(chat.id, set);
      setChat((c) => (c ? { ...c, provider: saved.provider, model: saved.model, reasoning: saved.reasoning } : c));
    } catch (e) {
      showToast({ type: "error", title: "Model not changed", message: errorText(e) });
    }
  };
  const choice: ChatChoice | null = chat ? { provider: chat.provider, model: chat.model, reasoning: chat.reasoning } : draftChoice;

  const newChat = () => {
    round.current = null;
    setDraftChoice(options?.default ?? null);
    setChat(null);
    setChatParam(null);
    setPreviews({});
    setLinks({});
    setProblem(null);
    setShowList(false);
  };

  const pendingWrites = (chat?.messages.at(-1)?.toolCalls ?? []).filter((t) => t.kind === "write" && t.status === "pending").length;
  const empty = !chat?.messages.length && !busy;
  const composer = (
    <ChatComposer
      value={input}
      onChange={setInput}
      onSubmit={() => void submit()}
      disabled={busy}
      autoFocus
      placeholder={`Tanya tentang ${module.label}, atau minta ubah rekod...`}
      tools={<ModelMenu options={options} choice={choice} onChange={(set) => void choose(set)} />}
      note="AI boleh silap. Setiap perubahan menunggu Apply anda - terbit dan padam kekal dalam borang."
    />
  );

  return (
    <div className="relative flex h-[calc(100dvh-11rem)] min-h-120 overflow-hidden rounded-xl bg-white ring-1 ring-gray-950/5 dark:bg-white/3 dark:ring-white/10">
      {/* Sidebar: always on md+, a drawer over the chat on phones. */}
      {showList && <button type="button" aria-label="Close chats" onClick={() => setShowList(false)} className="absolute inset-0 z-20 bg-gray-950/20 md:hidden" />}
      <aside className={`${showList ? "flex" : "hidden"} absolute inset-y-0 left-0 z-30 w-72 max-w-[85%] flex-col border-r border-gray-950/5 bg-white md:static md:flex md:w-64 dark:border-white/10 dark:bg-gray-950 md:dark:bg-transparent`}>
        <ChatSessionList
          sessions={sessions}
          activeId={chat?.id ?? null}
          onOpen={(id) => void open(id)}
          onNew={newChat}
          onRename={(s) => void rename(s)}
          onDelete={(s) => void remove(s)}
          back={{ label: "Back to records", href: module.home }}
        />
      </aside>

      <section className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-12 shrink-0 items-center gap-2 border-b border-gray-950/5 px-3 dark:border-white/10">
          <button type="button" onClick={() => setShowList(true)} className="rounded-lg p-2 text-gray-500 hover:bg-gray-950/5 md:hidden dark:hover:bg-white/10" aria-label="Chats">
            <PanelLeft className="h-4 w-4" />
          </button>
          <h2 className="min-w-0 flex-1 truncate px-1 text-sm font-medium text-gray-950 dark:text-white">{chat?.title || module.label}</h2>
          {chat && (
            <span className="hidden text-xs text-gray-400 tabular-nums sm:inline" title="Tokens used by this chat">
              {formatTokens(chat.inputTokens)} in · {formatTokens(chat.outputTokens)} out
            </span>
          )}
          <button type="button" onClick={newChat} className="rounded-lg p-2 text-gray-500 hover:bg-gray-950/5 hover:text-gray-950 dark:hover:bg-white/10 dark:hover:text-white" aria-label="New chat" title="New chat">
            <SquarePen className="h-4 w-4" />
          </button>
        </header>

        {empty ? (
          // Empty chat: greeting, composer and suggestions in the middle - like a fresh ChatGPT / Claude chat.
          <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto px-4 py-8">
            <div className="w-full max-w-2xl space-y-6">
              <div className="space-y-2 text-center">
                <span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-sky-500/10 text-sky-600 ring-1 ring-sky-500/20 dark:text-sky-400">
                  <Sparkles className="h-5 w-5" />
                </span>
                <h3 className="text-xl font-semibold tracking-tight text-gray-950 dark:text-white">Apa yang boleh saya bantu?</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{module.label} · cari, buat dan kemas kini rekod. Saya baca sendiri; setiap perubahan tunggu Apply anda.</p>
              </div>
              {composer}
              <div className="flex flex-wrap justify-center gap-2">
                {module.examples.map((x) => (
                  <button key={x} type="button" onClick={() => setInput(x)} className="rounded-full px-3 py-1.5 text-xs text-gray-600 ring-1 ring-gray-950/10 transition-colors hover:bg-gray-950/2.5 hover:text-gray-950 dark:text-gray-300 dark:ring-white/10 dark:hover:bg-white/5 dark:hover:text-white">
                    {x}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="min-h-0 flex-1 overflow-y-auto scrollbar-thin">
              <div className="mx-auto w-full max-w-3xl space-y-6 px-4 py-6">
                {chat?.messages.map((m) => (
                  <ChatMessageRow key={`${m.id}-${m.createdAt}`} message={m}>
                    {m.toolCalls.length > 0 && (
                      <div className="space-y-2">
                        {m.toolCalls.map((t) => (
                          <ToolCallCard
                            key={t.id}
                            call={t}
                            label={module.tools[t.name]?.label(parseArgs(t.arguments)) ?? t.name}
                            preview={previews[t.id]}
                            link={links[t.id]}
                            applying={applying === t.id}
                            onApply={() => void apply(t)}
                            onReject={() => answer(t, "rejected", "The owner rejected this change - not applied.")}
                          />
                        ))}
                      </div>
                    )}
                  </ChatMessageRow>
                ))}
                {busy && <ThinkingRow seconds={Math.max(0, Math.round((now - started) / 1000))} />}
                {problem && (
                  <div role="alert" className="ml-10 flex flex-wrap items-center gap-3 rounded-xl bg-red-500/5 px-4 py-3 text-sm text-red-700 ring-1 ring-red-500/20 dark:text-red-300">
                    <span className="flex-1">{problem.text}</span>
                    {problem.resume && chat && (
                      <button type="button" onClick={() => void send(chat.id, { resume: true })} className="admin-btn admin-btn-secondary">
                        <RotateCcw className="h-3.5 w-3.5" /> Try again
                      </button>
                    )}
                  </div>
                )}
                <div ref={bottom} />
              </div>
            </div>
            <div className="shrink-0 px-4 pt-2 pb-3">
              <div className="mx-auto w-full max-w-3xl space-y-2">
                {pendingWrites > 0 && (
                  <p className="text-center text-xs text-amber-700 dark:text-amber-300">Apply or reject the change above - a new message leaves it unapplied.</p>
                )}
                {composer}
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
