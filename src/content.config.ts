import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// The Sky Altar astrology articles, one folder per language: <lang>/<group>/<slug>.md.
const astrology = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/astrology' }),
  schema: z.object({ title: z.string(), description: z.string() }),
});

export const collections = { astrology };
