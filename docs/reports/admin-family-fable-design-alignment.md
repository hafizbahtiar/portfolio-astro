# Admin Family Fable Design Alignment

Date: 2026-06-14

## Summary

The Admin Family Builder was functionally improved, but it still felt visually separate from the public Fable 5 Family module. The biggest mismatch was the admin chart canvas and chart cards: the public module uses quiet white/slate surfaces, a `bg-family-canvas` chart frame, soft borders, compact controls, and restrained cyan accents, while admin still forced a dark chart canvas and dark card variables in light mode.

This pass adapts the public Family visual language for the admin/editor workflow without changing the backend, privacy DTOs, public `/family` components, or the `family-chart` inline add/edit contract.

## What Makes The Public Family Design Better

- Light mode uses slate/white surface layering instead of dark blocks.
- The chart canvas uses the shared `bg-family-canvas` token with a subtle framed boundary.
- Toolbar controls are compact, bordered, and readable in both themes.
- The person detail panel has a clear identity row with avatar/initials, then compact metadata and relationship content.
- Accents are cyan-led and restrained, with hover/focus states that do not overpower the content.

## What Admin Was Missing

- `.family-chart--admin` forced a navy chart canvas in all themes.
- Admin chart card variables were dark even in light mode, so the tree did not feel related to public `/family`.
- The builder used patchy admin labels and heavier card styling instead of the public module's calmer hierarchy.
- The inspector lacked the public detail panel's person identity treatment.
- Add-relative cards were styled, but only for the dark-canvas look.

## Files Changed

- `src/components/admin/family/FamilyTreeBuilder.tsx`
- `src/components/admin/family/FamilyTreeChart.tsx`
- `src/styles/family-chart-theme.css`
- `docs/reports/admin-family-fable-design-alignment.md`

## Public Patterns Reused Or Adapted

- Reused `bg-family-canvas` for the admin chart frame.
- Adapted public detail panel identity styling for the admin inspector.
- Matched the public slate/cyan light/dark color strategy in admin panels, controls, focus states, and chart CSS variables.
- Kept rounded-xl bordered surfaces and compact toolbar-style buttons rather than adding a new design system.

## Chart Canvas Changes

- Light mode `.family-chart--admin` now uses a soft slate canvas with subtle cyan dot/grid texture.
- Dark mode keeps a deeper canvas with muted grid/gradient treatment.
- `FamilyTreeChart` now uses `bg-family-canvas`, a soft border, and a small shadow in light mode.
- The outer builder canvas frame also uses `bg-family-canvas` instead of ad hoc gray.

## Person Card Changes

- Admin chart card variables are now theme-aware:
  - Light: white cards, slate text, soft blue/cyan border.
  - Dark: prior dark card treatment preserved.
- Avatar circle labels are light surfaces in light mode and dark overlays in dark mode.
- Selected/main card ring remains cyan and is softer in light mode.
- Gender accent remains limited to rect fallback cards through the existing scoped selectors.

## Add-Relative Preservation Notes

Package source verification:

- `imageCircleRect` renders avatar cards as `.card-image-circle` and no-avatar/add-relative cards through the rect path.
- `editTree().addRelative()` creates `_new_rel_data` placeholder nodes.
- New relative nodes receive `.card-new-rel`; single-parent add placeholders receive `.card-to-add`.
- Clicking `_new_rel_data` nodes still opens the package-generated `.f3-form-cont` form.

Preserved behavior:

- `editTree()` remains in `FamilyTreeChart.tsx`.
- `_new_rel_data` handling remains in the card click path.
- `setOnSubmit` still bridges package form data to `onInlineCreateRelative`.
- Father/Mother/Spouse/Son/Daughter labels and actions are unchanged.

Styling changes for preservation:

- Add-relative cards are still dashed/action-like.
- Light mode add-relative cards now use pale cyan/blue/rose surfaces with readable labels.
- Dark mode add-relative colors are explicitly preserved under `.dark .family-chart--admin`.
- Pointer/click behavior, opacity, z-index, and package class names were not changed.

## Generated Form Theme Changes

The existing scoped `.family-chart--admin .f3-form-*` theme remains. It is still controlled by package-generated selectors and uses light-mode form variables with dark-mode overrides.

## Inspector, Action, And Relationship Polish

- Builder root now has an admin-family shell with soft border and translucent surface.
- Section cards were tightened to public-style `rounded-xl` surfaces.
- Labels moved away from terminal-path copy toward practical editor labels.
- Controls use the same cyan focus/accent direction as public Family controls.
- Inspector now includes a selected-person identity row with avatar/initials and status badges.
- Relationship and action areas keep their admin purpose while sitting in the same slate/cyan surface system.

## Light/Dark Strategy

- React-rendered admin UI uses paired Tailwind light/dark classes.
- Package-generated chart/form UI is handled with `.family-chart--admin` scoped CSS variables.
- Public `.f3` base styles remain untouched except for existing shared chart theme selectors.
- Admin-specific overrides stay under `.family-chart--admin`.

## Manual Verification Checklist

Requires authenticated browser access:

- Public `/family` light mode still renders and uses the public chart frame.
- Public `/family` dark mode still renders.
- `/admin/family/new` light and dark mode surfaces look intentional.
- `/admin/family/edit` light mode chart canvas no longer appears as a pasted dark block.
- `/admin/family/edit` dark mode remains readable.
- Select a person in the chart; inspector identity row appears.
- Package add-relative cards appear around selected person.
- Add Father, Add Mother, Add Spouse, Add Son, Add Daughter cards remain visible and clickable.
- Clicking a package add-relative card opens the generated form.
- Generated form remains themed in light and dark mode.
- Fit, Center Main, Vertical, and Horizontal still work.

## Remaining Risks

- Authenticated visual QA was not completed in this environment.
- `FamilyManager.tsx` still contains older dark-only admin styles, but the current `/admin/family/new` and `/admin/family/edit` routes use `FamilyTreeBuilder.tsx`.
- Exact color contrast should be visually confirmed with real data and actual admin theme state.
