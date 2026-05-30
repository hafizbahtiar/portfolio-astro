// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  // Canonical origin — powers Astro.site for <link rel="canonical"> and OG URLs.
  site: 'https://hafizbahtiar.com',
  output: 'server',
  // imageService: 'cloudflare' routes <Image>/getImage through Cloudflare Image
  // Transformations (/cdn-cgi/image/...), emitting AVIF/WebP + responsive sizes
  // at the edge for both local and remote (allowlisted) images.
  // PREREQUISITE: enable Transformations on the zone (Cloudflare dash →
  // Images → Transformations → enable for hafizbahtiar.com). Without it,
  // transformed URLs 404. Roll back to `cloudflare()` to restore passthrough.
  adapter: cloudflare({ imageService: 'cloudflare' }),
  integrations: [react()],
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
