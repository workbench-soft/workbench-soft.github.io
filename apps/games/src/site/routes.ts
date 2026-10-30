import { BASE } from '../shared/paths.ts';
import type { Lang, Mode } from '../shared/protocol.ts';

export type PageKey = 'home' | Mode | 'privacy' | 'about';

const pair = (en: string, ru: string): Record<Lang, string> => ({ en: `${BASE}${en}`, ru: `${BASE}/ru${ru}` });

/** Each page in both languages. The pairs give the hreflang links and the language switch. */
export const ROUTES: Record<PageKey, Record<Lang, string>> = {
  home: pair('/', '/'),
  guess: pair('/guess-the-drawing/', '/ugaday-risunok/'),
  telephone: pair('/drawing-telephone/', '/isporchennyy-telefon/'),
  duel: pair('/clue-duel/', '/duel-podskazok/'),
  privacy: pair('/privacy/', '/privacy/'),
  about: pair('/about/', '/about/'),
};

export const GAMES: Mode[] = ['guess', 'telephone', 'duel'];

/** A file in public/, under the base path. */
export const asset = (path: string) => `${BASE}${path}`;
