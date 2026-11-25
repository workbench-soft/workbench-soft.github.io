import { locales, names, tags, type Lang } from '../../../src/i18n/locales.ts';
import { apps } from './apps.ts';
import { catalogs } from './i18n/index.ts';

const escape = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

const STYLE = `
body{font:16px/1.5 system-ui,'Segoe UI',sans-serif;max-width:44rem;margin:2rem auto;padding:0 1rem;color:#1d1d1f;background:#fafafa}
@media (prefers-color-scheme:dark){body{color:#eee;background:#151515}a{color:#8ab4ff}}
header{display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;align-items:baseline}
nav a{margin-right:.5rem}nav a[aria-current]{font-weight:700}
article{border:1px solid #8884;border-radius:12px;padding:1rem 1.25rem;margin:1.25rem 0}
.who{opacity:.7;font-size:.9rem}`;

/** The whole page in one language, for the signed-in email. */
export function page(lang: Lang, email: string): string {
  const t = catalogs[lang];
  const picker = locales
    .map((l) => `<a href="?lang=${l}" hreflang="${tags[l]}"${l === lang ? ' aria-current="true"' : ''}>${names[l]}</a>`)
    .join('');
  const list = apps
    .map(
      (app) => `<article>
<h2>${escape(app.name)}</h2>
<p>${escape(app.about[lang])}</p>
<p><a href="https://github.com/${app.repo}/releases/latest" rel="noreferrer">${escape(t.release)}</a></p>
<h3>${escape(t.install)}</h3>
<ol>${app.steps[lang].map((s) => `<li>${escape(s)}</li>`).join('')}</ol>
</article>`,
    )
    .join('\n');
  return `<!doctype html>
<html lang="${tags[lang]}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>${escape(t.title)}</title>
<style>${STYLE}</style>
</head>
<body>
<header><h1>${escape(t.title)}</h1><p class="who">${escape(t.signedIn.replace('{email}', email))}</p></header>
<nav aria-label="${escape(t.language)}">${picker}</nav>
<p>${escape(t.intro)}</p>
${list}
</body>
</html>`;
}
