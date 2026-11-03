import { getCollection, type CollectionEntry } from 'astro:content';
import { locales, type Lang } from '../i18n/locales';
import { en } from './i18n/en';
import { catalogs } from './i18n';

export type Article = CollectionEntry<'astrology'>;
export type AstroUi = typeof en;

export const root = '/skyaltar/astrology/';
export const appUrl = 'https://play.google.com/store/apps/details?id=com.workbenchsoft.skyaltar';
export const apkUrl = 'https://github.com/workbench-soft/workbench-soft.github.io/releases?q=skyaltar&expanded=true';

/** The labels in a language that has them. */
export const text = (lang: Lang): AstroUi => catalogs[lang] ?? en;

/** A path under the section, `id` such as signs/aries, with the language prefix. */
export const href = (lang: Lang, id = '') => `${lang === 'en' ? '' : `/${lang}`}${root}${id ? `${id}/` : ''}`;

/** Each article of a language, by its id such as signs/aries. */
export async function articles(lang: Lang): Promise<Map<string, Article>> {
  const all = await getCollection('astrology', (e) => e.id.startsWith(`${lang}/`));
  return new Map(all.map((e) => [e.id.slice(lang.length + 1), e]));
}

/** The languages that hold an article, or that have a section at all when `id` is empty. */
export async function langsOf(id = ''): Promise<Lang[]> {
  const all = await getCollection('astrology');
  return locales.filter((l) => catalogs[l] && all.some((e) => (id ? e.id === `${l}/${id}` : e.id.startsWith(`${l}/`))));
}
