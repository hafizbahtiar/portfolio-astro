import { API_BASE_URL } from "./config";
import { ApiClient } from "./api-client";
import { REASONING_LABEL, type AiModel, type Reasoning } from "./ai-settings";

// The owner's admin AI chat (backend /owner/ai-chat/*, hono-workers docs/plans/ai/admin-chat.md). Chats are saved on
// the server; this page sends only a new message or the results of the open tool calls - the tools run here, on the
// normal admin API, so every write passes the same validators as the form.

export type ToolKind = "read" | "write";
export type CallStatus = "pending" | "done" | "applied" | "rejected" | "failed" | "expired";

export interface ChatToolCall {
  id: string;
  name: string;
  /** JSON text from the model - each runner checks it before use. */
  arguments: string;
  kind: ToolKind;
  status: CallStatus;
  result: string | null;
  target: string | null;
}

export interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
  /** Replies only: the model that answered and what it cost. */
  model?: string | null;
  inputTokens?: number | null;
  outputTokens?: number | null;
  toolCalls: ChatToolCall[];
}

/** What a chat runs on. reasoning null = the model's own default. */
export interface ChatChoice {
  provider: string;
  model: string;
  reasoning: Reasoning | null;
}

export interface ChatSession extends ChatChoice {
  id: string;
  title: string;
  subject: string | null;
  inputTokens: number;
  outputTokens: number;
  createdAt: string;
  updatedAt: string;
}

export interface ToolAnswer {
  toolCallId: string;
  status: Exclude<CallStatus, "pending" | "expired">;
  content: string;
  target?: string | null;
}

/** One line of a write card: what changes. */
export interface PreviewRow {
  label: string;
  from?: string;
  to: string;
}

/** What a write card shows before the owner taps Apply. */
export interface WritePreview {
  title: string;
  rows: PreviewRow[];
  /** Shown in amber - e.g. "this is saved unpublished". */
  note?: string;
}

export interface ToolOutcome {
  /** Text for the model (JSON or a sentence), cut to 32,000 chars by the runner host. */
  content: string;
  /** The record a write changed ("crime_case:12"). */
  target?: string;
  /** A real button to show under the message (open tools). */
  link?: { label: string; href: string };
}

/** A module's browser half: one runner per tool name the backend module defines. */
export interface ChatToolRunner {
  kind: ToolKind;
  /** Short line for the thread: "Read case #12". */
  label: (args: Record<string, unknown>) => string;
  /** Writes only: build the card (may read the record first). Throws = the call fails with that message. */
  preview?: (args: Record<string, unknown>) => Promise<WritePreview>;
  /** Reads run on their own; writes only after Apply. Throws = "failed" with the message. */
  run: (args: Record<string, unknown>) => Promise<ToolOutcome>;
}

export interface ChatModuleClient {
  /** Backend module id ("portfolio.crime_drunk_drivers"). */
  id: string;
  /** URL part: /admin/ai/chat/<slug>. */
  slug: string;
  label: string;
  /** Where "back to the module" goes. */
  home: string;
  /** Examples on an empty chat. */
  examples: string[];
  tools: Record<string, ChatToolRunner>;
}

export interface ChatProviderOption {
  id: string;
  label: string;
  configured: boolean;
  /** Whose key pays: "platform" today; "own" once bring-your-own-key lands. */
  keySource: "platform" | "own";
  /** null = the list could not be fetched. */
  models: AiModel[] | null;
}

export interface ChatOptions {
  providers: ChatProviderOption[];
  reasoning: Reasoning[];
  /** What a new chat starts on (the admin_chat setting in /admin/ai). */
  default: ChatChoice;
}

const BASE = "owner/ai-chat";

class AiChatService extends ApiClient {
  constructor() {
    super(API_BASE_URL);
  }

  async sessions(moduleId: string): Promise<ChatSession[]> {
    return (await this.get<ChatSession[]>(`${BASE}/sessions?module=${encodeURIComponent(moduleId)}`)) ?? [];
  }

  async options(): Promise<ChatOptions> {
    return (await this.get<ChatOptions>(`${BASE}/options`))!;
  }

  async create(moduleId: string, choice: ChatChoice, subject?: string | null): Promise<ChatSession> {
    return (await this.post<ChatSession>(`${BASE}/sessions`, { module: moduleId, subject: subject ?? null, ...choice }))!;
  }

  getSession(id: string): Promise<(ChatSession & { module: string; messages: ChatMessage[] }) | null> {
    return this.get(`${BASE}/sessions/${id}`);
  }

  /** Rename and / or switch provider, model or reasoning - the next reply uses it. Throws ApiError (unknown_model ...). */
  async update(id: string, set: Partial<ChatChoice> & { title?: string }): Promise<ChatSession> {
    return (await this.patch<ChatSession>(`${BASE}/sessions/${id}`, set))!;
  }

  async remove(id: string): Promise<void> {
    await this.delete(`${BASE}/sessions/${id}`);
  }

  /** Throws ApiError with `data.code`: ai_busy / ai_failed (resume), ai_turn_over, tool_results_mismatch ... */
  async turn(
    id: string,
    body: { message: string } | { toolResults: ToolAnswer[] } | { resume: true },
  ): Promise<ChatMessage> {
    return (await this.post<{ message: ChatMessage }>(`${BASE}/sessions/${id}/turn`, body))!.message;
  }
}

export const aiChatService = new AiChatService();

/** Tool arguments as an object - the model's JSON can be anything. */
export const parseArgs = (json: string): Record<string, unknown> => {
  try {
    const v: unknown = JSON.parse(json);
    return v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : {};
  } catch {
    return {};
  }
};

export const RESULT_MAX = 32_000;

/** "deepseek/deepseek-v4.1-flash" -> "deepseek-v4.1-flash". */
export const shortModel = (id: string) => id.split("/").pop() ?? id;
/** 12345 -> "12.3k". */
export const formatTokens = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n));
export const levelText = (r: Reasoning | null) => (r ? REASONING_LABEL[r] : "model default");
