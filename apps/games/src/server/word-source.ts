import en from '../words/en.ts';
import ru from '../words/ru.ts';
import { KIDS_WORDS } from '../words/kids.ts';
import type { Settings } from '../shared/protocol.ts';
import { parseCustomWords } from '../shared/words.ts';

const lists = { en: [...new Set(en)], ru: [...new Set(ru)] };

/**
 * The words a game draws from: the host's list, plus the built in list unless the host turned it off.
 * Kids mode guess takes only the picture words, since each guess there is a tap on a picture.
 */
export function wordsFor(settings: Settings, kidsPictures = false): string[] {
  if (kidsPictures) return KIDS_WORDS[settings.wordLang];
  const custom = parseCustomWords(settings.customWords);
  if (settings.customOnly && custom.length >= 12) return custom;
  return [...new Set([...custom, ...lists[settings.wordLang]])];
}
