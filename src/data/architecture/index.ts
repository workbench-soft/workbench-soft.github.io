import type { Lang } from '../../i18n/locales';
import type { Arch } from './types';

const files = import.meta.glob<{ default: Arch }>('./*/*.ts', { eager: true });

/** Each project's architecture, by project id, then language. */
export const archs: Record<string, Partial<Record<Lang, Arch>>> = {};
for (const [path, file] of Object.entries(files)) {
  const [, id, lang] = path.match(/^\.\/([^/]+)\/(\w+)\.ts$/)!;
  (archs[id] ??= {})[lang as Lang] = file.default;
}

export const archOf = (id: string, lang: Lang): Arch | undefined => archs[id]?.[lang];
