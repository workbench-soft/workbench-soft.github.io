import type { Lang } from '../shared/protocol.ts';

const VOICE_LANG: Record<Lang, string> = { en: 'en-US', ru: 'ru-RU' };

/** Reads the text aloud with the browser's own voice, for a child who can't read yet. */
export function speak(text: string, lang: Lang): void {
  if (typeof speechSynthesis === 'undefined' || !text) return;
  speechSynthesis.cancel();
  const line = new SpeechSynthesisUtterance(text);
  line.lang = VOICE_LANG[lang];
  line.rate = 0.9;
  speechSynthesis.speak(line);
}

type Recognition = {
  lang: string;
  interimResults: boolean;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null;
  start(): void;
};
type RecognitionClass = new () => Recognition;

function recognitionClass(): RecognitionClass | null {
  const w = globalThis as { SpeechRecognition?: RecognitionClass; webkitSpeechRecognition?: RecognitionClass };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export const canListen = (): boolean => recognitionClass() !== null;

/** Hears one phrase and hands over the text. Browsers without speech recognition do nothing. */
export function listen(lang: Lang, onText: (text: string) => void, onEnd: () => void): void {
  const Class = recognitionClass();
  if (!Class) return onEnd();
  const rec = new Class();
  rec.lang = VOICE_LANG[lang];
  rec.interimResults = false;
  rec.onresult = (e) => onText(e.results[0]?.[0]?.transcript ?? '');
  rec.onend = onEnd;
  rec.start();
}
