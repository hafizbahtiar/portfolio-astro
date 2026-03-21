// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
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
      force: true,
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
