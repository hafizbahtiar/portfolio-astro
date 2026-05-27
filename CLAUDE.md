# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (localhost:4321)
npm run build     # Production build — always run after changes to verify no errors
npm run preview   # Preview the production build locally
```

There are no test or lint scripts. Use `npm run build` as the verification step — it runs TypeScript checks and Vite bundling. Build errors from ECONNREFUSED are expected (local API not running) and do not block deployment.

## Architecture

**Stack:** Astro 6 (static output) + React 19 (islands) + Tailwind CSS v4 + Cloudflare Workers deploy.

**Backend:** Separate repo at `/Users/hafiz/Developments/hono-workers` — a Hono API on Cloudflare Workers with D1 (SQLite) and KV. The portfolio fetches from it at `PUBLIC_API_URL` (`.env`: `http://localhost:8787/api/v1`; production: `https://hono-workers.hafizbahtiar98.workers.dev/api/v1`).

### Rendering model

All public pages are fully static (`output: "static"`). Pages that fetch from the API at build time use `export const prerender = true` and call the API server-side during `npm run build`. Admin pages (`src/pages/admin/**`) have no `prerender` export — they are also static HTML but fetch data client-side after load (no server-side auth middleware).

### Data flow

`src/lib/*.ts` — service classes that extend `ApiClient` (in `src/lib/api-client.ts`). Each service maps to an API resource (family, projects, blog, experiences, etc.). The `ApiClient` handles token refresh (httpOnly `refresh_token` cookie + in-memory `_accessToken`). Public endpoints need no auth; admin endpoints require a Bearer token obtained via `AuthService`.

### Layouts

- `CoreLayout.astro` — root HTML shell, injects theme-init script (reads `localStorage("theme")`, adds `.dark` to `<html>`), uses Astro `<ClientRouter>` for SPA transitions.
- `PublicLayout.astro` — wraps CoreLayout with `Navbar`, `Footer`, `Background`.
- `PrivateLayout.astro` — wraps CoreLayout with `AdminSidebar`, `AdminNavbar`. Forces always-dark via `class="... bg-[#0f172a] dark"` on the flex container — never remove this or the admin UI breaks.
- `ProjectLayout.astro` — thin wrapper for the projects listing page.

### Dark mode

Tailwind v4 with `@custom-variant dark (&:where(.dark, .dark *))` in `src/styles/index.css`. The `.dark` class is toggled on `<html>` by the inline script in `CoreLayout`. Admin is always dark (locked via PrivateLayout). Use the established slate palette:

```
text-slate-900 dark:text-slate-100       (headings)
text-slate-500 dark:text-slate-400       (body / labels)
bg-white dark:bg-slate-800               (card backgrounds)
border-slate-200 dark:border-slate-700   (card borders)
border-slate-300 dark:border-slate-600   (input borders)
```

Accent color is **cyan** (`cyan-400/500`) for interactive elements, **blue** for buttons/CTAs.

### UI components (`src/components/ui/`)

Custom Astro components with their own inline `<script>` blocks that set up event listeners. Key pattern: each component calls a `setup*()` function on load and re-registers on `astro:page-load`. Components expose `window.setup*()` globals so pages can trigger re-init after dynamic content.

- `Dropdown.astro` — single-select. Hidden `<input type="hidden">` stores value. Items must have a `<span>` wrapping the label text (required by the change-listener that reads `querySelector("span")?.textContent`).
- `MultiDropdown.astro` — multi-select, stores JSON array in hidden input.
- `Checkbox.astro` — styled toggle button over a hidden `<input type="checkbox">`.
- `DateInput.astro` — styled date input.
- `Select.tsx` — React equivalent of Dropdown for use inside React components.

### Family tree (`src/components/family/`)

Uses the `family-chart` library (always renders dark, `bg-[#212121]` wrapper). `FamilyTreeChart.tsx` is the main chart component — it uses `h-full w-full` and must sit inside a parent with a fixed height. It communicates via `window.dispatchEvent` custom events:

- `family:set-main` → moves chart focus to a person
- `family:on-main-changed` → fired by chart when main person changes (guard against infinite loop: check `if (mainInput.value === String(id)) return` before re-dispatching)
- `family:zoom-in/out`, `family:fit`, `family:center-main`, `family:set-orientation`

`PersonInfoPanel.tsx` listens to `family:on-main-changed` and displays the selected person's details from the pre-loaded `detail` prop.

### Public family pages (`src/pages/family/`)

`family/index.astro` and `family/[slug]/index.astro` both use `prerender = true` and fetch all family data at **build time** — data is embedded in HTML, no client-side API calls, no CORS issues. The `CombinedFamilyExplorer` component exists but is NOT used on public pages for this reason.

### `container-main`

Defined in `src/styles/index.css` as `max-w-[794px] mx-auto px-6 md:px-10`. All public page content should use this class.
