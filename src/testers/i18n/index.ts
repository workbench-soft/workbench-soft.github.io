import type { Lang } from '../../i18n/locales';
import { de } from './de';
import { en, type Text } from './en';
import { es } from './es';
import { fr } from './fr';
import { ja } from './ja';
import { ko } from './ko';
import { nb } from './nb';
import { ru } from './ru';
import { zh } from './zh';

export const catalogs: Record<Lang, Text> = { en, ru, de, fr, es, zh, ja, ko, nb };

/** Splits a text at its {placeholders}: even items are text, odd items are placeholder names. */
export const parts = (text: string) => text.split(/\{(\w+)\}/);
