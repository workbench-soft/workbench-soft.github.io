import de from '../words/de.ts';
import en from '../words/en.ts';
import es from '../words/es.ts';
import fr from '../words/fr.ts';
import ja from '../words/ja.ts';
import ko from '../words/ko.ts';
import nb from '../words/nb.ts';
import ru from '../words/ru.ts';
import zh from '../words/zh.ts';
import { KIDS_WORDS } from '../words/kids.ts';
import { LANGS, type Lang, type Settings } from '../shared/protocol.ts';
import { parseCustomWords } from '../shared/words.ts';

const raw: Record<Lang, string[]> = { en, ru, de, fr, es, zh, ja, ko, nb };
export const WORD_LISTS = Object.fromEntries(LANGS.map((l) => [l, [...new Set(raw[l])]])) as Record<Lang, string[]>;

/**
 * The words a game draws from: the host's list, plus the built in list unless the host turned it off.
 * Kids mode guess takes only the picture words, since each guess there is a tap on a picture.
 */
export function wordsFor(settings: Settings, kidsPictures = false): string[] {
  if (kidsPictures) return KIDS_WORDS[settings.wordLang];
  const custom = parseCustomWords(settings.customWords);
  if (settings.customOnly && custom.length >= 12) return custom;
  return [...new Set([...custom, ...WORD_LISTS[settings.wordLang]])];
}
