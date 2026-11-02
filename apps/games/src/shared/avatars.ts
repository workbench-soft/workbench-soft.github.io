import type { Lang } from './protocol.ts';

/** Animals a player taps to join. The animal stands in for the name of a child who can't type. */
export const AVATARS: readonly { emoji: string; en: string; ru: string }[] = [
  { emoji: '🐱', en: 'Kitty', ru: 'Котик' },
  { emoji: '🐶', en: 'Puppy', ru: 'Щенок' },
  { emoji: '🐰', en: 'Bunny', ru: 'Зайка' },
  { emoji: '🦊', en: 'Fox', ru: 'Лисичка' },
  { emoji: '🐻', en: 'Bear', ru: 'Мишка' },
  { emoji: '🐼', en: 'Panda', ru: 'Панда' },
  { emoji: '🐸', en: 'Froggy', ru: 'Лягушка' },
  { emoji: '🐵', en: 'Monkey', ru: 'Обезьянка' },
  { emoji: '🦁', en: 'Lion', ru: 'Лёва' },
  { emoji: '🐯', en: 'Tiger', ru: 'Тигрёнок' },
  { emoji: '🐧', en: 'Penguin', ru: 'Пингвин' },
  { emoji: '🦄', en: 'Unicorn', ru: 'Единорог' },
];

export function isAvatar(value: unknown): value is string {
  return AVATARS.some((a) => a.emoji === value);
}

export function avatarName(emoji: string, lang: Lang): string {
  return AVATARS.find((a) => a.emoji === emoji)?.[lang] ?? '';
}
