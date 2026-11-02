import { useState } from 'preact/hooks';
import type { Mode } from '../shared/protocol.ts';
import { pictureOf } from '../words/kids.ts';
import { lang, t } from './i18n.ts';
import { room } from './store.ts';
import { canListen, listen, speak } from './voice.ts';

/** The words read aloud follow the room's word language, the rest of the page the player's own. */
const wordLang = () => room.value?.settings.wordLang ?? 'en';

/** `page` reads in the page language, as for the rules. Words read in the room's word language. */
export function SpeakButton({ text, page = false }: { text: string; page?: boolean }) {
  return (
    <button
      type="button"
      class="icon-btn speak"
      title={t('listen')}
      aria-label={t('listen')}
      onClick={(e) => {
        e.stopPropagation();
        speak(text, page ? lang.value : wordLang());
      }}
    >
      🔊
    </button>
  );
}

/** A microphone for a text field. It shows only where the browser hears speech. */
export function MicButton({ onText }: { onText: (text: string) => void }) {
  const [on, setOn] = useState(false);
  if (!canListen()) return null;
  return (
    <button
      type="button"
      class={`icon-btn mic${on ? ' on' : ''}`}
      title={t('speakIt')}
      aria-label={t('speakIt')}
      aria-pressed={on}
      onClick={() => {
        setOn(true);
        listen(wordLang(), onText, () => setOn(false));
      }}
    >
      🎤
    </button>
  );
}

/** A word with its picture, when the word has one. */
export function PictureWord({ word }: { word: string }) {
  const picture = pictureOf(word);
  return (
    <span class="picture-word">
      {picture && (
        <span class="picture" aria-hidden="true">
          {picture}
        </span>
      )}
      <span>{word}</span>
    </span>
  );
}

const STEPS: Record<Mode, [string, Parameters<typeof t>[0]][]> = {
  guess: [
    ['✏️', 'guessStep1'],
    ['👀', 'guessStep2'],
    ['👆', 'guessStep3Kids'],
  ],
  telephone: [
    ['💬', 'telephoneStep1'],
    ['🎨', 'telephoneStep2'],
    ['😂', 'telephoneStep3'],
  ],
  duel: [
    ['👥', 'duelStep1'],
    ['💡', 'duelStep2'],
    ['⭐', 'duelStep3'],
  ],
};

/** Three pictures that explain the game, with a button that reads them aloud. */
export function HowTo({ mode, kids }: { mode: Mode; kids: boolean }) {
  const steps = STEPS[mode].map(([emoji, key]) => [emoji, t(key === 'guessStep3Kids' && !kids ? 'guessStep3' : key)]);
  return (
    <section class="howto" aria-label={t('howTo')}>
      <ol>
        {steps.map(([emoji, text]) => (
          <li>
            <span class="howto-pic" aria-hidden="true">
              {emoji}
            </span>
            <span>{text}</span>
          </li>
        ))}
      </ol>
      <SpeakButton text={steps.map((s) => s[1]).join('. ')} page />
    </section>
  );
}
