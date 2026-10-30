import en from '../words/en.ts';
import ru from '../words/ru.ts';
import type { Settings } from '../shared/protocol.ts';
import { parseCustomWords } from '../shared/words.ts';

const lists = { en: [...new Set(en)], ru: [...new Set(ru)] };

/** The words a game draws from: the host's list, plus the built in list unless the host turned it off. */
export function wordsFor(settings: Settings): string[] {
  const custom = parseCustomWords(settings.customWords);
  if (settings.customOnly && custom.length >= 12) return custom;
  return [...new Set([...custom, ...lists[settings.wordLang]])];
}
