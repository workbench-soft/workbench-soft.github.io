// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
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
  // The build downloads the fonts and serves them from this site, so the first paint waits on no other host.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Space Grotesk',
      cssVariable: '--font-sans',
      weights: ['400 700'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext', 'vietnamese'],
      fallbacks: ['system-ui', 'Segoe UI', 'sans-serif'],
      // The metric fallback is Arial, which would also draw the Cyrillic and CJK letters Space Grotesk lacks.
      optimizedFallbacks: false,
    },
    {
      provider: fontProviders.google(),
      name: 'JetBrains Mono',
      cssVariable: '--font-mono',
      weights: ['400 700'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext', 'greek', 'vietnamese'],
      fallbacks: ['ui-monospace', 'Consolas', 'monospace'],
      optimizedFallbacks: false,
    },
  ],
  // Each language version lists the others as alternates in sitemap-index.xml.
  // The Langflip page is a static file Astro doesn't build, so it goes in by hand.
  integrations: [
    sitemap({
      i18n: { defaultLocale: defaultLang, locales: tags },
      customPages: ['https://workbench-soft.com/langflip/'],
    }),
  ],
});
