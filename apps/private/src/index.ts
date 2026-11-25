import { accessEmail, type AccessConfig } from './access.ts';
import { apps } from './apps.ts';
import { download, type DownloadEnv } from './download.ts';
import { catalogs, pickLang } from './i18n/index.ts';
import { page } from './page.ts';

export const BASE = '/private';
const DOWNLOAD = `${BASE}/download/`;

// Search engines and caches keep out, even if a page leaks past Access.
const PRIVATE_HEADERS = {
  'X-Robots-Tag': 'noindex, nofollow',
  'Cache-Control': 'private, no-store',
  'Referrer-Policy': 'no-referrer',
};

const text = (body: string, status: number, type = 'text/plain; charset=utf-8') =>
  new Response(body, { status, headers: { ...PRIVATE_HEADERS, 'Content-Type': type } });

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/robots.txt') return text('User-agent: *\nDisallow: /\n', 200);
    const email = await accessEmail(request, env);
    if (!email) return text('Forbidden', 403);
    const lang = pickLang(url.searchParams.get('lang'), request.headers.get('Accept-Language'));
    if (url.pathname.startsWith(DOWNLOAD)) {
      const app = apps.find((a) => a.id === url.pathname.slice(DOWNLOAD.length));
      if (!app) return text('Not found', 404);
      return (await download(app, env)) ?? text(catalogs[lang].noRelease, 404);
    }
    if (url.pathname !== `${BASE}/`) return Response.redirect(`${url.origin}${BASE}/${url.search}`, 302);
    return text(page(lang, email), 200, 'text/html; charset=utf-8');
  },
} satisfies ExportedHandler<AccessConfig & DownloadEnv>;
