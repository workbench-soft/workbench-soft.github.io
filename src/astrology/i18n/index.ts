import type { Lang } from '../../i18n/locales';
import type { en } from './en';

// A language joins the section once its catalog sits beside this file and its articles sit in
// src/content/astrology/<lang>/. Each file exports its catalog as `ui`, so a new language touches no shared file.
const files = import.meta.glob<{ ui: typeof en }>('./*.ts', { eager: true });

export const catalogs: Partial<Record<Lang, typeof en>> = Object.fromEntries(
  Object.entries(files)
    .filter(([path]) => !path.endsWith('index.ts'))
    .map(([path, mod]) => [path.slice(2, -3), mod.ui]),
);
