import type { Lang } from '../../i18n/locales';
import { en } from './en';

// A language joins the section once its catalog sits here and its articles sit in src/content/astrology/<lang>/.
export const catalogs: Partial<Record<Lang, typeof en>> = { en };
