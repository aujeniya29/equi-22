// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://equi-22.fr',
  output: 'static',
  trailingSlash: 'never',
  build: {
    // Génère des fichiers `a-propos.html` (et non `a-propos/index.html`)
    // pour que Cloudflare serve `/a-propos` en 200 direct, sans 308 vers `/a-propos/`.
    // Aligne l'URL servie sur le sitemap, le canonical et les liens internes (tous sans slash).
    format: 'file',
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
