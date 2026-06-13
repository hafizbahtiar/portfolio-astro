# Family Person-Info — Relationship De-dupe Fix

> Fixes duplicated spouse entries (and mis-labeled parent/child) in the public selected-person
> detail panel by replacing raw-row rendering with a derived, de-duplicated relationship table.
> Date: 2026-06-13 · Branch: `main` · Scope: Family module only. No push/deploy/remote-D1.

---

## Root cause

**Category: UI derivation (not data corruption, not merge, not chart transform).**

Relationship rows in D1 are stored **directionally and reciprocally**. Verified against real
production data (`GET /api/v1/family/hafiz-family`):

- Spouse stored both ways: `spouse (1→2)` **and** `spouse (2→1)`.
- Parent/child stored both ways: `parent (parent→child)` **and** `child (child→parent)`.

`PersonDetailPanel.tsx` previously listed **every raw relationship row** touching the selected
person and labeled each by its raw `relationshipType`. Consequences:

1. **Spouse doubled** — for person `1`, both `spouse(1→2)` and `spouse(2→1)` resolve to the same
   other person (`2`), rendering "Spouse: Nurul Amani" **twice**.
2. **Parent/child mis-labeled by direction** — a `parent` row was always labeled "Parent" even when
   the selected person was the *parent* (so a father saw his daughter listed as "Parent"), and the
   reciprocal `child` row added a second "Child" entry for the same person.

This is **not** a merge bug: the single-tree page `/family/hafiz-family` (no merge) reproduces it,
and `buildChartData` already de-dupes chart `rels` via `Set` (the chart was never doubled). The merge
intentionally retains reciprocal rows (the chart tolerates them); the fix belongs in the UI derivation.

## What was fixed

New pure helper **`src/lib/family-relationships.ts`** (framework-independent, easily testable):

- `getRelationKey(person)` — dedupe identity key: **globalKey → id → normalized displayName**
  (name is a last resort and, because an id is always present, is effectively never used — so two
  distinct same-named people are never merged).
- `dedupeRelatedPeople(people)` — removes duplicates by the key above, order-preserving.
- `buildRelationCounts(detail)` — distinct related-person count per id (collapses reciprocal rows).
- `getPersonRelationshipGroups(detail, person)` — derives ordered, de-duplicated, gender-aware groups.

`PersonDetailPanel.tsx` now renders a **clean relationship table** (`<table>` with `<th scope="row">`
labels), one row per non-empty group, each related person shown **once** and clickable.
`FamilyListView.tsx` now uses `buildRelationCounts` so its "· N relations" count reflects distinct
related people instead of inflated reciprocal rows. `PersonSearch.tsx` shows no relationships — unchanged.

## Relationship table / groups implemented

Order (empty groups hidden):

| Group | Derived from |
|---|---|
| **Father** | parents of selected with `gender = male` |
| **Mother** | parents of selected with `gender = female` |
| **Spouse** | `spouse` rows touching selected (directionless, de-duped) |
| **Son** | children of selected with `gender = male` |
| **Daughter** | children of selected with `gender = female` |
| **Brother** | siblings of selected with `gender = male` |
| **Sister** | siblings of selected with `gender = female` |
| _Parent / Child / Sibling_ | fallback groups for `other`/`unknown`-gender relatives only |

Relationship-type semantics used (matches D1 schema + `chart-data.ts`):
- `parent` / `adoptive_parent`: `personId` is the **parent** of `relatedPersonId`.
- `child` / `adopted_child`: `personId` is the **child** of `relatedPersonId`.
- `spouse` / `sibling`: bidirectional.

**Parents** = rows where selected is the child (from either `parent` rows with selected as
`relatedPersonId`, or `child` rows with selected as `personId`). **Children** = the mirror.
**Spouse** = either endpoint of a `spouse` row → the *other* person.

## How spouse de-dupe works (directionless)

`spouse(A→B)` and `spouse(B→A)` both contribute the *other* person id into a single `Set<number>`,
so person B is collected once. The set is then resolved to people and de-duped again by
`getRelationKey` (globalKey/id), guaranteeing one "Spouse" entry per partner.

## How siblings are derived

- **Explicit**: `sibling` relationship rows touching the selected person.
- **Derived**: people who share **at least one parent** with the selected person (computed from a
  `childId → parentIds` map built from all parent/child rows), excluding the selected person.
- Anyone already classified as the selected person's spouse/parent/child is removed from siblings.

Verified on real data (`hamid-family`): e.g. *Ariffin* correctly shows Father (Abd Hamid), Mother
(Arbaiah), Spouse (Noor Siah), Sons, Daughter, Brothers (Amrani, Kamaruddin), and Sisters — all
de-duped, correct gender, correct direction.

## Privacy

The helper reads only `id`, `displayName`, `globalKey`, `gender` — all whitelist-safe public fields.
No birth/death dates, notes, metadata, or other private fields are read or rendered. SSR island-payload
re-audit after the change: person fields remain exactly the public whitelist; **no full living
birthdates** present. `/family` remains unlisted from the navbar. Admin builder untouched.

## Remaining limitations

- **Half-siblings vs full-siblings** are not distinguished — anyone sharing ≥1 parent is a sibling.
- **In-laws / step relations** beyond the seven groups are not modeled.
- Unknown/other-gender relatives fall into generic **Parent / Child / Sibling** fallback rows.
- Grouping reflects current relationship rows; it does not fix any underlying D1 data issues
  (e.g. missing reciprocal rows would simply yield a smaller group). No D1 changes were made.

## Commands run (all safe/local)

- `curl` (read-only) of prod API `family/hafiz-family`, `family/bahtiar-family`, `family/hamid-family`
  to confirm reciprocal rows and validate the derivation logic.
- `npm run build` → exit 0 (no errors).
- `git diff --check` → clean.
- Dev server against the prod read-only API → SSR render of `/family/hafiz-family` confirmed:
  default person shows **Spouse** + **Daughter** groups, "Nurul Amani" rendered **once**, privacy intact.

No push, no deploy, no remote D1 migration, no remote/production data mutation.
