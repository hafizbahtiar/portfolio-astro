import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';

// Project and blog pages render on request, so the sitemap plugin never sees
// them - list them from the production API at build time. Unreachable API
// (e.g. offline local build) just means a shorter sitemap, never a failed build.
const SITE = 'https://hafizbahtiar.com';
const API = 'https://api.hafizbahtiar.com/api/v1';
const slugsFrom = async (path: string, prefix: string): Promise<string[]> => {
  try {
    const res = await fetch(`${API}/${path}`, { signal: AbortSignal.timeout(8000) });
    const { data } = await res.json();
    return (Array.isArray(data) ? data : []).map((item: { slug: string }) => `${SITE}${prefix}${item.slug}`);
  } catch {
    return [];
  }
};
const dynamicPages = [
  ...(await slugsFrom('projects', '/projects/')),
  ...(await slugsFrom('blog', '/blog/')),
];

// Kept out of the sitemap: private/utility pages, /family (unlisted by design -
// see CLAUDE.md), and per-project legal pages (thin; empty ones are noindex).
const SITEMAP_EXCLUDE = [/\/admin/, /\/login/, /\/account(\/|$)/, /\/register/, /\/family(\/|$)/, /\/verify-email/, /\/(privacy|terms)\/?$/];

// CSP (pentest 2026-10-22 F-04): no 'unsafe-inline' / blob: in script-src. Astro hashes its own
// inline scripts (hydration, small bundled <script>s) build-wide, so every page's policy allows every
// page's scripts - needed because <ClientRouter> runs the next page's scripts under the first page's
// policy. Hand-written inline scripts live in src/scripts/inline/ (rendered with set:html) and are
// hashed here. SSR pages get the policy as a header from Astro (middleware adds frame-ancestors);
// prerendered pages get a <meta> plus the same policy copied into dist/client/_headers below.
// A new external script/connect/frame origin = add it here. No inline on*= handlers or javascript: URLs.
const INLINE_DIR = new URL('./src/scripts/inline/', import.meta.url);
const inlineHashes = readdirSync(INLINE_DIR).map(
  (f) => `sha256-${createHash('sha256').update(readFileSync(new URL(f, INLINE_DIR))).digest('base64')}` as const,
);
const CSP_DIRECTIVES = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
  // https: is intentionally broad: remote images from many hosts (github, licdn, dbkl, qiubbx, R2).
  "img-src 'self' data: blob: https:",
  "font-src 'self' https://fonts.gstatic.com data:",
  // challenges.cloudflare.com: Turnstile widget iframe. youtube-nocookie.com: blog video embeds
  // (the only iframe host sanitizeRichHtml allows).
  "frame-src 'self' https://challenges.cloudflare.com https://www.youtube-nocookie.com",
  // blob: MapLibre creates its web worker from a blob URL.
  "worker-src 'self' blob:",
  // cloudflareinsights.com: Web Analytics beacon POST. basemaps.cartocdn.com: map tiles.
  // api.waktusolat.app: /waktu-solat GPS -> zone. jogruber.de: contact-section GitHub card.
  "connect-src 'self' https://api.hafizbahtiar.com https://api.waktusolat.app https://cloudflareinsights.com https://basemaps.cartocdn.com https://*.basemaps.cartocdn.com https://github-contributions-api.jogruber.de",
] as const;
// Prerendered responses are static assets, so their header comes from _headers: copy the policy
// Astro wrote into the page's <meta> (frame-ancestors only works as a header).
const cspStaticHeaders = {
  name: 'csp-static-headers',
  hooks: {
    'astro:build:done': ({ dir }: { dir: URL }) => {
      // One _headers rule covers every page, so every prerendered page must carry the same policy.
      const policies = new Set(
        readdirSync(dir, { recursive: true, encoding: 'utf8' })
          .filter((f) => f.endsWith('.html'))
          .map((f) => readFileSync(new URL(f, dir), 'utf8').match(/<meta http-equiv="content-security-policy" content="([^"]+)"/)?.[1]),
      );
      const [policy] = policies;
      const file = new URL('_headers', dir);
      const headers = readFileSync(file, 'utf8');
      const marker = 'Content-Security-Policy: GENERATED';
      if (policies.size !== 1 || !policy || !headers.includes(marker)) {
        throw new Error(`csp-static-headers: expected one CSP across prerendered pages (got ${policies.size}) and the _headers marker`);
      }
      writeFileSync(file, headers.replace(marker, `Content-Security-Policy: ${policy.replaceAll('&#39;', "'")} frame-ancestors 'none';`));
    },
  },
};

// https://astro.build/config
export default defineConfig({
  // Canonical origin - powers Astro.site for <link rel="canonical"> and OG URLs.
  site: SITE,
  output: 'server',
  // Image passthrough - MUST be set explicitly. @astrojs/cloudflare v13's
  // default (when `imageService` is unset) is 'cloudflare-binding', which sends
  // every runtime /_image request through the Cloudflare Images binding
  // (env.IMAGES). That binding is not configured here, AND remote <Image> URLs
  // omit the `f` (format) param, so the transform endpoint returns 400
  // "Unsupported format" on every remote image. 'passthrough' streams the
  // original bytes and needs no binding/Transformations.
  // `imageService: 'cloudflare'` (edge AVIF/WebP via /cdn-cgi/image/...) caused
  // production 404s because Transformations is NOT enabled on the zone. Re-enable
  // ONLY after turning it on (Cloudflare dash → Images → Transformations →
  // hafizbahtiar.com) and verifying /cdn-cgi/image/ URLs return 200.
  adapter: cloudflare({ imageService: 'passthrough' }),
  security: {
    csp: {
      directives: [...CSP_DIRECTIVES],
      scriptDirective: {
        resources: ["'self'", 'https://static.cloudflareinsights.com', 'https://challenges.cloudflare.com'],
        hashes: inlineHashes,
      },
      // Inline style attributes (React islands, MapLibre, ClientRouter) - out of scope for F-04.
      styleDirective: { resources: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'] },
    },
  },
  integrations: [
    cspStaticHeaders,
    react(),
    // `astro check` / `astro sync` / `astro build` start a type-gen Vite server that
    // re-bundles node_modules/.vite/deps_ssr with a different include list, deleting
    // files the running dev server's workerd still imports -> 500 "The file does not
    // exist at .../deps_ssr/<x>.js which is in the optimize deps directory". The dev
    // server gets its own cache dir so those commands can run alongside it.
    {
      name: 'dev-vite-cache',
      hooks: {
        'astro:config:setup': ({ command, updateConfig }) => {
          if (command === 'dev') updateConfig({ vite: { cacheDir: 'node_modules/.vite-dev' } });
        },
      },
    },
    sitemap({
      customPages: dynamicPages,
      filter: (page) => !SITEMAP_EXCLUDE.some((re) => re.test(page)),
      // Same URL form as the canonical tag (CoreLayout): no trailing slash except "/".
      serialize: (item) => {
        const url = new URL(item.url);
        if (url.pathname !== "/") url.pathname = url.pathname.replace(/\/+$/, "");
        return { ...item, url: url.href };
      },
    }),
  ],
  image: {
    domains: [
      "www.qiubbx.com",
      "qiubbx.com",
      "cit.securiforce.net",
      "eperolehan.dbkl.gov.my",
      "github.com",
      "avatars.githubusercontent.com",
      "media.licdn.com"
      // ghchart.rshah.org is deliberately NOT listed: it serves SVG, and the
      // passthrough /_image endpoint returns it as "image/undefined", which
      // browsers refuse to render. Unlisted remotes keep their original URL.
    ]
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        "@tanstack/react-table",
        "motion/react",
        "lucide-react",
        // ClientRouter's modules: otherwise found on the first page load, which
        // re-optimizes and reloads the page.
        "astro/virtual-modules/transitions-events.js",
        "astro/virtual-modules/transitions-router.js",
        "astro/virtual-modules/transitions-swap-functions.js",
        "astro/virtual-modules/transitions-types.js",
      ],
    },
    // Pre-bundle SSR-side React deps at startup. Discovered lazily, Vite re-optimizes
    // mid-request ("optimized dependencies changed. reloading") and the SSR runner
    // ends up with two React copies -> "Invalid hook call" in islands (dev only).
    ssr: {
      optimizeDeps: {
        include: ["motion/react", "lucide-react", "clsx", "tailwind-merge", "htmlparser2", "domhandler", "entities"],
      },
    },
    build: {
      chunkSizeWarningLimit: 1200,
      // Never inline bundled <script>s: each inlined one is a CSP hash, and Cloudflare's _headers
      // drops lines over 2000 chars (the CSP line). Other assets keep Vite's 4 KB default.
      assetsInlineLimit: (file: string) => (file.endsWith('.js') ? false : undefined),
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules/maplibre-gl")) {
              return "maplibre";
            }
            if (id.includes("node_modules/@tiptap")) {
              return "tiptap";
            }
            if (
              id.includes("node_modules/react") ||
              id.includes("node_modules/react-dom") ||
              id.includes("node_modules/scheduler")
            ) {
              return "react-vendor";
            }
            if (id.includes("node_modules/@tanstack")) {
              return "tanstack";
            }
            if (id.includes("node_modules/lucide-react")) {
              return "icons";
            }
          },
        },
      },
    },
  },
});
