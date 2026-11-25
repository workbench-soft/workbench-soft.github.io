import { defaultLang, isLang, type Lang } from '../../../../src/i18n/locales.ts';

// The page text, typed by English. private.test.ts checks each catalog against it.
export const en = {
  title: 'Workbench Soft insiders',
  intro: 'Apps that stay off the public site. Please keep this page and its links to yourself.',
  signedIn: 'Signed in as {email}',
  download: 'Download',
  noRelease: 'No release to download yet. Try again later.',
  install: 'How to install',
  language: 'Language',
};
export type Text = typeof en;

export const catalogs: Record<Lang, Text> = {
  en,
  ru: {
    title: 'Workbench Soft для своих',
    intro: 'Приложения, которых нет на открытом сайте. Пожалуйста, не передавайте эту страницу и её ссылки дальше.',
    signedIn: 'Вы вошли как {email}',
    download: 'Скачать',
    noRelease: 'Пока нет релиза для скачивания. Попробуйте позже.',
    install: 'Как установить',
    language: 'Язык',
  },
  de: {
    title: 'Workbench Soft für Insider',
    intro:
      'Apps, die nicht auf der öffentlichen Website stehen. Bitte behalten Sie diese Seite und ihre Links für sich.',
    signedIn: 'Angemeldet als {email}',
    download: 'Herunterladen',
    noRelease: 'Noch keine Version zum Herunterladen. Bitte später erneut versuchen.',
    install: 'So installieren Sie es',
    language: 'Sprache',
  },
  fr: {
    title: 'Workbench Soft pour les initiés',
    intro: 'Des applis absentes du site public. Merci de garder cette page et ses liens pour vous.',
    signedIn: 'Connecté en tant que {email}',
    download: 'Télécharger',
    noRelease: 'Aucune version à télécharger pour l’instant. Réessayez plus tard.',
    install: 'Comment l’installer',
    language: 'Langue',
  },
  es: {
    title: 'Workbench Soft para allegados',
    intro: 'Apps que no están en el sitio público. Por favor, guarda esta página y sus enlaces para ti.',
    signedIn: 'Sesión iniciada como {email}',
    download: 'Descargar',
    noRelease: 'Todavía no hay una versión para descargar. Inténtalo más tarde.',
    install: 'Cómo instalarla',
    language: 'Idioma',
  },
  zh: {
    title: 'Workbench Soft 内部页面',
    intro: '这些应用不在公开网站上。请不要转发本页面及其链接。',
    signedIn: '已登录：{email}',
    download: '下载',
    noRelease: '暂时还没有可下载的版本，请稍后再试。',
    install: '安装方法',
    language: '语言',
  },
  ja: {
    title: 'Workbench Soft 関係者向け',
    intro: '公開サイトに載せていないアプリです。このページとリンクは他の人に共有しないでください。',
    signedIn: '{email} でログイン中',
    download: 'ダウンロード',
    noRelease: 'ダウンロードできるリリースはまだありません。後でもう一度お試しください。',
    install: 'インストール方法',
    language: '言語',
  },
  ko: {
    title: 'Workbench Soft 내부 페이지',
    intro: '공개 사이트에 없는 앱입니다. 이 페이지와 링크는 다른 사람과 공유하지 말아 주세요.',
    signedIn: '{email}(으)로 로그인됨',
    download: '다운로드',
    noRelease: '아직 내려받을 릴리스가 없습니다. 나중에 다시 시도해 주세요.',
    install: '설치 방법',
    language: '언어',
  },
  nb: {
    title: 'Workbench Soft for innsidere',
    intro: 'Apper som ikke ligger på det åpne nettstedet. Hold denne siden og lenkene for deg selv.',
    signedIn: 'Logget inn som {email}',
    download: 'Last ned',
    noRelease: 'Ingen utgivelse å laste ned ennå. Prøv igjen senere.',
    install: 'Slik installerer du',
    language: 'Språk',
  },
};

/** The language from ?lang=, else the first one Accept-Language names that the page ships. */
export function pickLang(query: string | null, accept: string | null): Lang {
  if (query && isLang(query)) return query;
  const asked = (accept ?? '')
    .split(',')
    .map((part) => part.split(';')[0].trim().toLowerCase().split('-')[0])
    .map((code) => (code === 'no' || code === 'nn' ? 'nb' : code));
  return asked.find(isLang) ?? defaultLang;
}
