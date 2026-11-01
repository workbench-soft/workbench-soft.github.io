// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { defaultLang, locales, tags } from './src/i18n/locales.ts';

// The build fills the root of https://workbench-soft.com. The Pages
// workflow adds the Jekyll Memories site and the other folders next to it.
export default defineConfig({
  site: 'https://workbench-soft.com',
  outDir: './dist',
  i18n: {
    locales: [...locales],
    defaultLocale: defaultLang,
    routing: { prefixDefaultLocale: false },
  },
  // Each language version lists the others as alternates in sitemap-index.xml.
  // The Langflip page is a static file Astro doesn't build, so it goes in by hand.
  integrations: [
    sitemap({
      i18n: { defaultLocale: defaultLang, locales: tags },
      customPages: ['https://workbench-soft.com/langflip/'],
    }),
  ],
});
