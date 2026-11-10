import { describe, expect, it } from 'vitest';
import { WORD_LISTS } from '../server/word-source.ts';
import { makeRoom } from '../server/test-helpers.ts';
import { AVATARS, avatarName } from '../shared/avatars.ts';
import { LANGS } from '../shared/protocol.ts';
import { normalize } from '../shared/words.ts';
import { KIDS_WORDS, pictureOf } from './kids.ts';
import { randomPrompt } from './prompts.ts';

describe('words in each language', () => {
  it.each(LANGS)('%s has words, phrases, kids pictures and animal names', (lang) => {
    expect(WORD_LISTS[lang].length).toBeGreaterThanOrEqual(300);
    expect(WORD_LISTS[lang].every((w) => normalize(w).length > 0)).toBe(true);
    expect(randomPrompt(lang)).toBeTruthy();
    expect(new Set(KIDS_WORDS[lang]).size).toBe(KIDS_WORDS.en.length);
    expect(KIDS_WORDS[lang].every((w) => pictureOf(w))).toBe(true);
    expect(AVATARS.every((a) => avatarName(a.emoji, lang))).toBe(true);
  });

  it('deals German words once the host picks German', () => {
    const { room, join } = makeRoom();
    join(['a', 'b']);
    room.message('a', { t: 'settings', settings: { wordLang: 'de', kids: false, rounds: 1 } }, 0);
    room.message('a', { t: 'start' }, 0);
    expect(room.settings.wordLang).toBe('de');
    expect(room.guess!.choices!.every((w) => WORD_LISTS.de.includes(w))).toBe(true);
  });

  it('turns down a language the games lack', () => {
    const { room, join } = makeRoom();
    join(['a']);
    room.message('a', { t: 'settings', settings: { wordLang: 'xx' as never } }, 0);
    expect(room.settings.wordLang).toBe('en');
  });
});
