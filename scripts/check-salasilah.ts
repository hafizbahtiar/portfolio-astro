// bun scripts/check-salasilah.ts - the salasilah data is a well-formed tree:
// unique ids/keys, every link resolves, no parent cycles, every person connected
// to the main person, 11 wives + 7 children, and the paternal chain reaches Adnan.
import { expect } from "bun:test";
import { SALASILAH_NABI } from "../src/data/salasilah";

const { people, relationships, tree } = SALASILAH_NABI;
const errors: string[] = [];
const byId = new Map(people.map((p) => [p.id, p]));
const push = (map: Map<number, number[]>, key: number, value: number) => {
  const list = map.get(key);
  if (list) list.push(value);
  else map.set(key, [value]);
};

const ids = new Set<number>();
const keys = new Set<string>();
for (const p of people) {
  if (ids.has(p.id)) errors.push(`duplicate id ${p.id}`);
  ids.add(p.id);
  if (!p.globalKey) errors.push(`${p.displayName}: no globalKey`);
  else if (keys.has(p.globalKey)) errors.push(`duplicate globalKey ${p.globalKey}`);
  else keys.add(p.globalKey);
  if (!p.displayName.trim()) errors.push(`person ${p.id}: empty name`);
  if (p.gender !== "male" && p.gender !== "female")
    errors.push(`${p.displayName}: gender "${p.gender}"`);
}

const linked = new Set<number>();
const tuples = new Set<string>();
const childrenOf = new Map<number, number[]>();
for (const r of relationships) {
  const from = byId.get(r.personId);
  const to = byId.get(r.relatedPersonId);
  if (!from || !to) {
    errors.push(`link to missing person: ${r.personId}->${r.relatedPersonId}`);
    continue;
  }
  if (r.personId === r.relatedPersonId)
    errors.push(`self link on ${from.displayName}`);
  const key = `${r.relationshipType}:${r.personId}->${r.relatedPersonId}`;
  if (tuples.has(key)) errors.push(`duplicate link ${key}`);
  tuples.add(key);
  linked.add(r.personId);
  linked.add(r.relatedPersonId);
  if (r.relationshipType === "parent") push(childrenOf, r.personId, r.relatedPersonId);
}

for (const p of people)
  if (!linked.has(p.id)) errors.push(`${p.displayName}: not linked to anyone`);

const mainId = tree.defaultMainPersonId;
if (mainId == null || !byId.has(mainId))
  errors.push(`defaultMainPersonId ${mainId} is not a person`);

// No parent cycles.
const state = new Map<number, 1 | 2>();
const visit = (id: number) => {
  state.set(id, 1);
  for (const child of childrenOf.get(id) ?? []) {
    if (state.get(child) === 1) errors.push(`parent cycle ${id}->${child}`);
    else if (!state.has(child)) visit(child);
  }
  state.set(id, 2);
};
for (const p of people) if (!state.has(p.id)) visit(p.id);

// Every person reachable from the main person (undirected) - catches a floating
// branch (e.g. a mother added without a child link).
if (mainId != null && byId.has(mainId)) {
  const graph = new Map<number, number[]>();
  for (const r of relationships) {
    if (!byId.has(r.personId) || !byId.has(r.relatedPersonId)) continue;
    push(graph, r.personId, r.relatedPersonId);
    push(graph, r.relatedPersonId, r.personId);
  }
  const seen = new Set([mainId]);
  const queue = [mainId];
  while (queue.length > 0) {
    for (const next of graph.get(queue.pop()!) ?? [])
      if (!seen.has(next)) {
        seen.add(next);
        queue.push(next);
      }
  }
  if (seen.size !== people.length)
    errors.push(`${people.length - seen.size} people not connected to the main person`);
}

const parentsOf = (id: number) =>
  relationships
    .filter((r) => r.relationshipType === "parent" && r.relatedPersonId === id)
    .map((r) => r.personId);
const spousesOf = (id: number) =>
  relationships.filter(
    (r) => r.relationshipType === "spouse" && (r.personId === id || r.relatedPersonId === id),
  );
const childrenOfMain = relationships.filter(
  (r) => r.relationshipType === "parent" && r.personId === mainId,
);

const mainParents = mainId == null ? [] : parentsOf(mainId);
const fathers = mainParents.filter((id) => byId.get(id)?.gender === "male");
const mothers = mainParents.filter((id) => byId.get(id)?.gender === "female");
if (fathers.length !== 1) errors.push(`main person has ${fathers.length} fathers`);
if (mothers.length !== 1) errors.push(`main person has ${mothers.length} mothers`);
if (mainId != null && spousesOf(mainId).length !== 11)
  errors.push(`main person has ${spousesOf(mainId).length} spouses, expected 11`);
if (childrenOfMain.length !== 7)
  errors.push(`main person has ${childrenOfMain.length} children, expected 7`);

// The paternal chain: Muhammad -> Abdullah -> ... -> Adnan (22 people).
const chain: string[] = [];
let at = mainId;
while (at != null && chain.length <= people.length) {
  chain.push(byId.get(at)?.globalKey ?? String(at));
  at = parentsOf(at).find((id) => byId.get(id)?.gender === "male");
}
if (chain.at(-1) !== "adnan") errors.push(`paternal chain ends at ${chain.at(-1)}, not adnan`);

expect(errors, "salasilah data").toEqual([]);
expect(chain.length, "Muhammad to Adnan").toBe(22);
console.log(`salasilah: ok (${people.length} people, ${relationships.length} links)`);
