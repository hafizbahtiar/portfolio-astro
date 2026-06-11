// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  // Canonical origin — powers Astro.site for <link rel="canonical"> and OG URLs.
  site: 'https://hafizbahtiar.com',
  output: 'server',
  // Image passthrough. `imageService: 'cloudflare'` (edge AVIF/WebP via
  // /cdn-cgi/image/...) caused production 404s on every remote project image
  // because Transformations is NOT enabled on the zone. Re-enable ONLY after
  // turning it on (Cloudflare dash → Images → Transformations →
  // hafizbahtiar.com) and verifying /cdn-cgi/image/ URLs return 200.
  adapter: cloudflare(),
  integrations: [
    react(),
    sitemap({
      filter: (page) =>
        !page.includes('/admin') &&
        !page.includes('/login'),
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
    ]
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ["@tanstack/react-table", "@tanstack/react-virtual"],
    },
    build: {
      chunkSizeWarningLimit: 1200,
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
