// Admin AI chat modules, by URL slug (/admin/ai/chat/<slug>). New module = its runners file + one line here + its
// backend entry (hono-workers services/ai/chat-modules.ts, same id).
import type { ChatModuleClient } from "../ai-chat";
import { drunkDriversChat } from "./drunk-drivers";

export const CHAT_MODULES: ChatModuleClient[] = [drunkDriversChat];

export const chatModuleBySlug = (slug: string) => CHAT_MODULES.find((m) => m.slug === slug) ?? null;
