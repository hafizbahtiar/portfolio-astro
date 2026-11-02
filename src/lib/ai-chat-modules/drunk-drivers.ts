// Drunk-driver tools for the admin AI chat - the browser half of hono-workers services/ai/chat-modules.ts
// ('portfolio.crime_drunk_drivers'). Every write is the form's own save (drunkDriversService.create / update), so the
// API's validators apply; `published` and photos are never touched from here.
import { drunkDriversService, isSafeSourceUrl } from "../crime";
import type { ChatModuleClient, PreviewRow, WritePreview } from "../ai-chat";
import type { DrunkDriver, DrunkDriverPayload } from "../../types/crime";

/** The fields a chat may set - the backend tool schema's list. Anything else the model sends is dropped here. */
const FIELDS = [
  "fullName", "nameDisclosed", "icNumber", "dateOfBirth", "age", "incidentDate", "location", "details", "charges",
  "caseStatus", "appealStatus", "appealDecidedOn", "appealNotes", "alcoholTest", "alcoholReading",
  "licenceDisqualifiedMonths", "licenceDisqualifiedFrom", "victims", "lawyers", "sources",
] as const;
type Field = (typeof FIELDS)[number];

const LABELS: Record<Field, string> = {
  fullName: "Name", nameDisclosed: "Name disclosed", icNumber: "IC number", dateOfBirth: "Date of birth", age: "Age",
  incidentDate: "Incident date", location: "Location", details: "Details", charges: "Charges", caseStatus: "Case status",
  appealStatus: "Appeal", appealDecidedOn: "Appeal decided on", appealNotes: "Appeal notes", alcoholTest: "Alcohol test",
  alcoholReading: "Alcohol reading", licenceDisqualifiedMonths: "Licence disqualified (months)",
  licenceDisqualifiedFrom: "Licence disqualified from", victims: "Victims", lawyers: "Lawyers", sources: "Sources",
};

const EMPTY: DrunkDriverPayload = {
  fullName: "", nameDisclosed: true, icNumber: null, dateOfBirth: null, age: null, incidentDate: null, location: null,
  details: null, charges: [], caseStatus: null, appealStatus: null, appealDecidedOn: null, appealNotes: null,
  courtDocuments: [], alcoholTest: null, alcoholReading: null, licenceDisqualifiedMonths: null,
  licenceDisqualifiedFrom: null, lawyers: [], lastCheckedOn: null, sources: [], published: false, victims: [],
};

/** The form's payload from a loaded record - only the payload's own keys (the API's schema is strict). */
const payloadOf = (r: DrunkDriver): DrunkDriverPayload =>
  Object.fromEntries(Object.keys(EMPTY).map((k) => [k, r[k as keyof DrunkDriverPayload] ?? EMPTY[k as keyof DrunkDriverPayload]])) as unknown as DrunkDriverPayload;

/** Only the known fields, never `published`. */
const pick = (changes: unknown): Partial<Record<Field, unknown>> => {
  if (!changes || typeof changes !== "object" || Array.isArray(changes)) throw new Error("No changes given");
  const out: Partial<Record<Field, unknown>> = {};
  for (const k of FIELDS) if (k in changes) out[k] = (changes as Record<string, unknown>)[k];
  if (!Object.keys(out).length) throw new Error("None of the changes is a field the chat may set");
  return out;
};

const idOf = (args: Record<string, unknown>) => {
  const id = Number(args.id);
  if (!Number.isInteger(id) || id < 1) throw new Error("A record id is needed");
  return id;
};

const load = async (id: number) => {
  const r = await drunkDriversService.getById(id);
  if (!r) throw new Error(`Record ${id} does not exist`);
  return r;
};

// One readable line per value for the cards: lists one item per line, objects as their filled values.
const show = (v: unknown): string => {
  if (v == null || v === "") return "-";
  if (typeof v === "boolean") return v ? "Yes" : "No";
  if (Array.isArray(v)) return v.length ? v.map(show).join("\n") : "(none)";
  if (typeof v === "object") return Object.values(v).filter((x) => x != null && x !== "").map(String).join(" · ");
  return String(v);
};

const editHref = (id: number) => `/admin/crime/drunk-drivers/edit?id=${id}`;
const nameOf = (r: DrunkDriver) => (r.nameDisclosed ? r.fullName : `${r.fullName} (not named yet)`);

/** The draft, short: values with their quotes - enough for the model to propose a save, small enough to send back. */
const compactDraft = async (urls: string[], search?: string) => {
  const d = await drunkDriversService.extract(urls, search);
  const page = (url: string) => urls.indexOf(url) + 1 || url;
  return {
    fields: Object.fromEntries(Object.entries(d.fields).map(([k, f]) => [k, { value: f.value, quote: f.quote, page: page(f.source) }])),
    charges: d.charges.map((c) => ({ charge: c.charge, status: c.status, decidedOn: c.decidedOn, caseNumber: c.caseNumber, sentence: c.sentence, quote: c.quote })),
    victims: d.victims.map(({ source: _s, ...v }) => v),
    lawyers: d.lawyers.map(({ source: _s, ...l }) => l),
    rejected: d.rejected,
    conflicts: d.conflicts,
    pages: d.sources.map((s) => ({ url: s.url, read: s.ok, foundBySearch: !!s.found, skipped: s.dropped ?? null })),
  };
};

export const drunkDriversChat: ChatModuleClient = {
  id: "portfolio.crime_drunk_drivers",
  slug: "drunk-drivers",
  label: "Pemandu mabuk",
  home: "/admin/crime/drunk-drivers",
  examples: [
    "Senaraikan kes yang belum diterbitkan",
    "Ada perkembangan terbaru kes Low Kean Peng?",
    "Buat rekod baru daripada pautan ini: https://...",
  ],
  tools: {
    list_cases: {
      kind: "read",
      label: (a) => (a.query ? `Searched cases: "${String(a.query)}"` : "Listed the newest cases"),
      run: async (a) => {
        const q = String(a.query ?? "").trim().toLowerCase();
        const rows = (await drunkDriversService.list())
          .filter((r) => !q || [r.fullName, r.location, ...r.charges.map((c) => c.caseNumber), ...r.sources]
            .some((v) => v?.toLowerCase().includes(q)))
          .sort((x, y) => y.updatedAt.localeCompare(x.updatedAt))
          .slice(0, 20)
          .map((r) => ({ id: r.id, name: nameOf(r), convictedOn: r.convictedOn, caseStatus: r.caseStatus, published: r.published }));
        return { content: JSON.stringify(rows) };
      },
    },
    get_case: {
      kind: "read",
      label: (a) => `Read case #${String(a.id)}`,
      run: async (a) => {
        const { photos: _p, ...r } = await load(idOf(a));
        return { content: JSON.stringify(r) };
      },
    },
    open_case: {
      kind: "read",
      label: (a) => `Open button for case #${String(a.id)}`,
      run: async (a) => {
        const r = await load(idOf(a));
        return { content: `Shown: an "Open in form" button for record ${r.id}.`, link: { label: `Open ${nameOf(r)} in the form`, href: editHref(r.id) } };
      },
    },
    draft_from_links: {
      kind: "read",
      label: (a) => `Read ${Array.isArray(a.urls) ? a.urls.length : 0} link(s)${a.search ? ` + web search "${String(a.search)}"` : ""}`,
      run: async (a) => {
        const urls = (Array.isArray(a.urls) ? a.urls : []).map(String).filter(isSafeSourceUrl).slice(0, 5);
        if (!urls.length) throw new Error("No https link to read");
        return { content: JSON.stringify(await compactDraft(urls, a.search ? String(a.search).slice(0, 200) : undefined)) };
      },
    },
    create_case: {
      kind: "write",
      label: () => "New record",
      preview: async (a) => {
        const rec = pick(a.record);
        return {
          title: "New record (saved unpublished)",
          rows: (Object.entries(rec) as [Field, unknown][]).map(([k, v]) => ({ label: LABELS[k], to: show(v) })),
          note: "Publish it yourself in the form after checking it.",
        };
      },
      run: async (a) => {
        const saved = await drunkDriversService.create({ ...EMPTY, ...pick(a.record), published: false } as DrunkDriverPayload);
        if (!saved) throw new Error("Not saved");
        return {
          content: `applied: saved as record ${saved.id} (unpublished).`,
          target: `crime_case:${saved.id}`,
          link: { label: `Open ${nameOf(saved)} in the form`, href: editHref(saved.id) },
        };
      },
    },
    update_case: {
      kind: "write",
      label: (a) => `Change case #${String(a.id)}`,
      preview: async (a): Promise<WritePreview> => {
        const r = await load(idOf(a));
        const now = payloadOf(r);
        const rows: PreviewRow[] = (Object.entries(pick(a.changes)) as [Field, unknown][])
          .filter(([k, v]) => JSON.stringify(now[k] ?? null) !== JSON.stringify(v ?? null))
          .map(([k, v]) => ({ label: LABELS[k], from: show(now[k]), to: show(v) }));
        if (!rows.length) throw new Error("Nothing changes - the record already has these values");
        return { title: `Change ${nameOf(r)} (#${r.id})`, rows };
      },
      run: async (a) => {
        const id = idOf(a);
        // Read again at Apply time: the form may have saved in between.
        const saved = await drunkDriversService.update(id, { ...payloadOf(await load(id)), ...pick(a.changes) } as DrunkDriverPayload);
        if (!saved) throw new Error("Not saved");
        return { content: `applied: record ${id} saved.`, target: `crime_case:${id}`, link: { label: "Open in the form", href: editHref(id) } };
      },
    },
    add_source: {
      kind: "write",
      label: (a) => `Add a source to case #${String(a.id)}`,
      preview: async (a) => {
        const r = await load(idOf(a));
        const url = String(a.url ?? "");
        if (!isSafeSourceUrl(url)) throw new Error("Not an https link the form accepts");
        if (r.sources.includes(url)) throw new Error("The record already has this link");
        if (r.sources.length >= 10) throw new Error("The record already has 10 sources");
        return { title: `Add a source to ${nameOf(r)} (#${r.id})`, rows: [{ label: "New source", to: url }] };
      },
      run: async (a) => {
        const id = idOf(a);
        const r = await load(id);
        const url = String(a.url);
        const saved = await drunkDriversService.update(id, { ...payloadOf(r), sources: [...r.sources.filter((s) => s !== url), url].slice(0, 10) });
        if (!saved) throw new Error("Not saved");
        return { content: `applied: source added to record ${id}.`, target: `crime_case:${id}` };
      },
    },
  },
};
