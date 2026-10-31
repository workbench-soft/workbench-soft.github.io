// The 9 languages each Workbench Soft app ships. English sits at /, the rest under /<code>/.
export const locales = ['en', 'ru', 'de', 'fr', 'es', 'zh', 'ja', 'ko', 'nb'] as const;
export type Lang = (typeof locales)[number];
export const defaultLang: Lang = 'en';

/** Each language in its own name, for the picker. */
export const names: Record<Lang, string> = {
  en: 'English',
  ru: 'Русский',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
  zh: '简体中文',
  ja: '日本語',
  ko: '한국어',
  nb: 'Norsk bokmål',
};

/** BCP 47 tags for `<html lang>` and `hreflang`. The Chinese text is Simplified. */
export const tags: Record<Lang, string> = {
  en: 'en',
  ru: 'ru',
  de: 'de',
  fr: 'fr',
  es: 'es',
  zh: 'zh-Hans',
  ja: 'ja',
  ko: 'ko',
  nb: 'nb',
};

export const ogLocales: Record<Lang, string> = {
  en: 'en_US',
  ru: 'ru_RU',
  de: 'de_DE',
  fr: 'fr_FR',
  es: 'es_ES',
  zh: 'zh_CN',
  ja: 'ja_JP',
  ko: 'ko_KR',
  nb: 'nb_NO',
};

export const isLang = (value: string | undefined): value is Lang => locales.includes(value as Lang);
export const langOf = (value: string | undefined): Lang => (isLang(value) ? value : defaultLang);
export const pathOf = (lang: Lang) => (lang === defaultLang ? '/' : `/${lang}/`);
