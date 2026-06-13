# Family Page Codex Handoff

Branch: `codex/family-page-phase-0-4`

## Summary

Implemented a safe Phase 0-4 pass for the public family pages. `/family` and `/family/[slug]` now fetch data in Astro frontmatter at request time, pass it into a single `FamilyExplorer` React island, and no longer perform public browser-side family API waterfalls. Public merge logic is keyed and pure, chart data transformation is shared, and public chart controls use real `family-chart` zoom.

## Files Changed

- `CLAUDE.md`
- `docs/plans/family-page-diagnosis-and-redesign-plan.md`
- `docs/reports/family-page-codex-handoff.md`
- `docs/reports/family-page-phase-0-d1-verification.sql`
- `src/data/family.ts`
- `src/hooks/useFamilyChart.ts`
- `src/lib/chart-data.ts`
- `src/lib/family-merge.ts`
- `src/lib/family-privacy.ts`
- `src/lib/family.ts`
- `src/components/family/FamilyExplorer.tsx`
- `src/components/family/FamilyListView.tsx`
- `src/components/family/FamilyToolbar.tsx`
- `src/components/family/FamilyTreeCanvas.tsx`
- `src/components/family/FamilyTreeChart.tsx`
- `src/components/family/PersonDetailPanel.tsx`
- `src/components/family/PersonSearch.tsx`
- `src/components/family/CombinedFamilyExplorer.tsx` deleted
- `src/components/family/PublicFamilyExplorer.tsx` deleted
- `src/components/family/PersonInfoPanel.tsx` deleted
- `src/pages/family/index.astro`
- `src/pages/family/[slug]/index.astro`
- `src/styles/family-chart-theme.css`
- `src/styles/index.css`

## Data And Migration Changes

No D1 mutation was applied by Codex.

I inspected the backend family migration/seed files in `/Users/hafiz/Developments/hono-workers`. The seed already has `global_key` values for the known cross-tree people, and the two parent relationships exist in `bahtiar-family`. `hafiz-family` does not contain the parent people in the seed, so adding those rows there would not be valid without adding people.

Added `docs/reports/family-page-phase-0-d1-verification.sql` as an idempotent verification/remediation note to run from the backend repo local first, then remote after review.

## Admin Builder Compatibility

Admin still uses `FamilyTreeChart.tsx`. Its window-event contract remains:

- `family:set-main`
- `family:on-main-changed`
- `family:on-spouses`
- `family:zoom-in`
- `family:zoom-out`
- `family:fit`
- `family:center-main`
- `family:set-orientation`

Inline add/edit flow was left in the legacy chart. The cross-tree public fetch/navigation block was removed. `enableCrossTreeNavigation?: boolean` remains accepted as a deprecated no-op so the current admin builder prop does not break.

Smoke checklist for Claude Fable 5:

- Open `/admin/family`.
- Open a tree in the builder.
- Click cards and confirm selected-person state updates.
- Use inline add father/mother/spouse/son/daughter.
- Use fit, center, and orientation controls.
- Confirm no public `/family` API storm happens on card click.

## Privacy Behavior

- `/family` is still not added to the public navbar.
- Living relatives show year-only birth dates in the public details panel, search results, list view, and chart cards.
- Public SSR props are sanitized through a strict whitelist DTO in `src/lib/family-privacy.ts`, so full living-person birth dates, notes, metadata/raw JSON blobs, timestamps, tree IDs, relationship IDs, relationship dates, and backend/admin fields are not serialized to the browser.
- Allowed public person fields are now: `id`, `displayName`, `globalKey`, `gender`, sanitized `birthDate`, `deathDate` for deceased people only, `isLiving`, and `photoUrl`.
- Allowed public tree fields are now: `slug`, `name`, `description`, and `defaultMainPersonId`.
- Allowed public relationship fields are now: `personId`, `relatedPersonId`, and `relationshipType`.
- Full death dates are still shown for deceased people when available.
- No Phase 5 visibility schema was added.

## Intentionally Skipped

- No remote or local D1 writes.
- No Phase 5 backend schema changes.
- No navbar link for `/family`.
- No per-branch expand/collapse UI; the library does not expose a clean per-branch collapse API.
- No full migration of admin `FamilyTreeChart` onto the public hook, to avoid inline-builder regression risk.
- No browser/VoiceOver/Lighthouse audit in this pass.

## Known Limitations

- Public combined tree IDs are synthetic and can change when data ordering changes; share links prefer `globalKey`, with numeric ID only as fallback.
- People without `globalKey` are no longer merged by display name. They remain distinct by `treeId/id` to avoid same-name corruption.
- `family-chart` DOM/CSS class names should be visually checked in devtools; theme selectors are conservative and may need tuning.
- `ApiClient` still uses `cache: "no-store"` for other resources and admin calls. Public family reads avoid it with a scoped helper.

## Commands Run

- `git switch -c codex/family-page-phase-0-4`: passed after escalation because `.git` is read-only in the sandbox.
- `npm run`: passed; available scripts are `dev`, `build`, `preview`, `astro`.
- `npm run build`: passed.
- Follow-up `npm run build` after final local patches: passed.
- Privacy DTO follow-up `npm run build`: passed.
- Privacy DTO follow-up `git diff --check`: passed.
- Multiple `rg`, `sed`, `find`, and `git diff/status` inspections.

No `npm run lint`, `npm run typecheck`, or test command exists in `package.json`.

## Review Checklist For Claude Fable 5

- Review `src/lib/family.ts` public fetch behavior against the backend cache expectations.
- Review `src/lib/family-merge.ts` keyed merge behavior with current production data.
- Run the Phase 0 SQL verification locally and decide whether to apply any remediation remotely.
- Manually test `/family` and `/family/[slug]` with the backend running.
- Test `?p=<globalKey>` reload behavior on combined and single-tree pages.
- Confirm living-person full birth dates are absent from rendered page source/island payload.
- Verify mobile at 375 px: toolbar wrap, list fallback, bottom sheet, pinch/pan.
- Verify light/dark chart styling and adjust `src/styles/family-chart-theme.css` selectors if needed.
- Complete admin builder smoke testing.
- Run Lighthouse/accessibility and VoiceOver spot checks.
