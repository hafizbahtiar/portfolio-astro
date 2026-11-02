// Nubi race tools for the admin AI chat - the browser half of hono-workers services/ai/chat-modules.ts ('nubi.races').
// Every write is the form's own save (nubiRacesService.create / update), so the API's validators apply.
import { nubiRacesService } from "../nubi-races";
import { isSafeSourceUrl } from "../crime";
import type { ChatModuleClient, PreviewRow, WritePreview } from "../ai-chat";
import type { NubiRace, NubiRacePayload } from "../../types/nubi-races";

const FIELDS = ["name", "raceDate", "startTime", "venue", "state", "distances", "fee", "registrationCloses", "url"] as const;
type Field = (typeof FIELDS)[number];

const LABELS: Record<Field, string> = {
  name: "Name", raceDate: "Race day", startTime: "First flag-off", venue: "Venue", state: "State",
  distances: "Distances", fee: "Fee", registrationCloses: "Registration closes", url: "Official page",
};

const todayMY = () => new Date(Date.now() + 8 * 3600_000).toISOString().slice(0, 10);

const payloadOf = (r: NubiRace): NubiRacePayload => ({
  name: r.name, raceDate: r.raceDate, startTime: r.startTime, venue: r.venue, state: r.state, distances: r.distances,
  fee: r.fee, registrationCloses: r.registrationCloses, url: r.url, checkedOn: r.checkedOn,
});

/** Only the known fields; anything else the model sends is dropped. */
const pick = (changes: unknown): Partial<Record<Field, unknown>> => {
  if (!changes || typeof changes !== "object" || Array.isArray(changes)) throw new Error("No changes given");
  const out: Partial<Record<Field, unknown>> = {};
  for (const k of FIELDS) if (k in changes) out[k] = (changes as Record<string, unknown>)[k];
  if (!Object.keys(out).length) throw new Error("None of the changes is a field the chat may set");
  return out;
};

const idOf = (args: Record<string, unknown>) => {
  const id = Number(args.id);
  if (!Number.isInteger(id) || id < 1) throw new Error("A race id is needed");
  return id;
};

const load = async (id: number) => {
  const r = await nubiRacesService.getById(id);
  if (!r) throw new Error(`Race ${id} does not exist`);
  return r;
};

const show = (v: unknown): string =>
  v == null || v === "" ? "-" : Array.isArray(v) ? v.join(", ") || "(none)" : String(v);
const editHref = (id: number) => `/admin/nubi/races/edit?id=${id}`;

export const nubiRacesChat: ChatModuleClient = {
  id: "nubi.races",
  slug: "nubi-races",
  label: "Nubi races",
  home: "/admin/nubi/races",
  examples: [
    "Ada lumba baru? Kemas kini kalendar",
    "Tambah lumba daripada pautan ini: https://racexasia.com/event/...",
    "Senaraikan lumba bulan depan",
  ],
  tools: {
    list_races: {
      kind: "read",
      label: (a) => (a.query ? `Searched races: "${String(a.query)}"` : "Listed the races"),
      run: async (a) => {
        const q = String(a.query ?? "").trim().toLowerCase();
        const rows = (await nubiRacesService.list())
          .filter((r) => !q || [r.name, r.venue, r.state, r.url].some((v) => v.toLowerCase().includes(q)))
          .slice(0, 30)
          .map((r) => ({ id: r.id, name: r.name, raceDate: r.raceDate, state: r.state, distances: r.distances, url: r.url, checkedOn: r.checkedOn }));
        return { content: JSON.stringify(rows) };
      },
    },
    get_race: {
      kind: "read",
      label: (a) => `Read race #${String(a.id)}`,
      run: async (a) => ({ content: JSON.stringify(await load(idOf(a))) }),
    },
    open_race: {
      kind: "read",
      label: (a) => `Open button for race #${String(a.id)}`,
      run: async (a) => {
        const r = await load(idOf(a));
        return { content: `Shown: an "Open in form" button for race ${r.id}.`, link: { label: `Open ${r.name} in the form`, href: editHref(r.id) } };
      },
    },
    find_new_races: {
      kind: "read",
      label: () => "Checked the race listing sites",
      run: async () => ({ content: JSON.stringify(await nubiRacesService.discover()) }),
    },
    draft_from_link: {
      kind: "read",
      label: () => "Read the race page",
      run: async (a) => {
        const url = String(a.url ?? "");
        if (!isSafeSourceUrl(url)) throw new Error("Not an https link the form accepts");
        const excludeId = a.excludeId ? idOf({ id: a.excludeId }) : undefined;
        const d = await nubiRacesService.extract([url], excludeId);
        return {
          content: JSON.stringify({
            url: d.url,
            fields: Object.fromEntries(Object.entries(d.fields).map(([k, f]) => [k, { value: f.value, quote: f.quote, clef: f.support ?? null }])),
            rejected: d.rejected,
            duplicates: d.duplicates,
            pageRead: d.sources.some((s) => s.ok),
          }),
        };
      },
    },
    create_race: {
      kind: "write",
      label: () => "New race",
      preview: async (a) => {
        const race = pick(a.race);
        return {
          title: "New race (public on Nubi /races)",
          rows: (Object.entries(race) as [Field, unknown][]).map(([k, v]) => ({ label: LABELS[k], to: show(v) })),
        };
      },
      run: async (a) => {
        const race = pick(a.race);
        const saved = await nubiRacesService.create({ fee: null, registrationCloses: null, ...race, checkedOn: todayMY() } as NubiRacePayload);
        if (!saved) throw new Error("Not saved");
        return { content: `applied: saved as race ${saved.id}.`, target: `nubi_race:${saved.id}`, link: { label: `Open ${saved.name} in the form`, href: editHref(saved.id) } };
      },
    },
    update_race: {
      kind: "write",
      label: (a) => `Change race #${String(a.id)}`,
      preview: async (a): Promise<WritePreview> => {
        const r = await load(idOf(a));
        const now = payloadOf(r);
        const rows: PreviewRow[] = (Object.entries(pick(a.changes)) as [Field, unknown][])
          .filter(([k, v]) => JSON.stringify(now[k] ?? null) !== JSON.stringify(v ?? null))
          .map(([k, v]) => ({ label: LABELS[k], from: show(now[k]), to: show(v) }));
        if (!rows.length) throw new Error("Nothing changes - the race already has these values");
        return { title: `Change ${r.name} (#${r.id})`, rows };
      },
      run: async (a) => {
        const id = idOf(a);
        // Read again at Apply time: the form may have saved in between. A chat update = the page was just checked.
        const saved = await nubiRacesService.update(id, { ...payloadOf(await load(id)), ...pick(a.changes), checkedOn: todayMY() } as NubiRacePayload);
        if (!saved) throw new Error("Not saved");
        return { content: `applied: race ${id} saved.`, target: `nubi_race:${id}`, link: { label: "Open in the form", href: editHref(id) } };
      },
    },
  },
};
