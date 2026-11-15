import type { Lang } from '../../i18n/locales';
import type { Engineering } from './types';

const files = import.meta.glob<{ default: Engineering }>('./[a-z][a-z].ts', { eager: true });

/** The Engineering section text, by language. */
export const engineering = Object.fromEntries(
  Object.entries(files).map(([path, file]) => [path.slice(2, 4), file.default]),
) as Partial<Record<Lang, Engineering>>;

export const engineeringIn = (lang: Lang): Engineering => engineering[lang] ?? engineering.en!;
