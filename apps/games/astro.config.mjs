import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import { ROUTES } from './src/site/routes.ts';

// Keep in step with src/shared/paths.ts.
const BASE = '/games';
const site = process.env.PUBLIC_SITE_URL ?? 'https://games.workbench-soft.com';

// `astro dev` has no Worker. This sends room links to the room page, as the Worker does.
const roomLinks = {
  name: 'room-links',
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      const path = req.url?.split('?')[0] ?? '';
      if (/^\/games\/r\/[A-Za-z0-9]{6}\/?$/.test(path)) req.url = `${BASE}/room/${req.url.slice(path.length)}`;
      next();
    });
  },
};

export default defineConfig({
  site,
  base: BASE,
  // The pages land in dist/games/. scripts/finish-build.ts adds the files the domain root needs.
  outDir: './dist/games',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  integrations: [
    preact(),
    sitemap({
      filter: (page) => !page.includes('/room/'),
      // The game pages have their own slug in each language, so the alternates come from ROUTES.
      serialize: (item) => {
        const path = new URL(item.url).pathname;
        const pair = Object.values(ROUTES).find((p) => p.en === path || p.ru === path);
        if (pair) item.links = Object.entries(pair).map(([lang, url]) => ({ lang, url: new URL(url, site).href }));
        return item;
      },
    }),
  ],
  vite: {
    plugins: [roomLinks],
    // The rooms run in `wrangler dev` on port 8787.
    server: { proxy: { [`${BASE}/ws`]: { target: 'ws://localhost:8787', ws: true } } },
  },
});
