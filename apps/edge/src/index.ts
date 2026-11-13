import registry from '../../../registry.json';

export type App = (typeof registry.apps)[number];
type Env = Record<App['binding'], Fetcher>;

/** The app that owns a path, or null for the public site. */
export function appFor(pathname: string): App | null {
  return registry.apps.find((app) => pathname === app.path || pathname.startsWith(`${app.path}/`)) ?? null;
}

const ORIGIN = registry.fallback.origin;

/** The page on the public site for a path. A path like //host stays on the site host. */
export function siteUrl(url: URL): URL {
  const target = new URL(ORIGIN);
  // AdSense reads /ads.txt and AdMob reads /app-ads.txt. Both hold the same publisher line.
  target.pathname = url.pathname === '/ads.txt' ? '/app-ads.txt' : url.pathname;
  target.search = url.search;
  return target;
}

/** Asks GitHub Pages for the page, and keeps its redirects on this domain. */
async function publicSite(request: Request, url: URL): Promise<Response> {
  const response = await fetch(new Request(siteUrl(url), request), { redirect: 'manual' });
  const location = response.headers.get('Location');
  if (!location?.startsWith(ORIGIN)) return response;
  const headers = new Headers(response.headers);
  headers.set('Location', url.origin + location.slice(ORIGIN.length));
  return new Response(response.body, { status: response.status, headers });
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    if (url.hostname.startsWith('www.')) {
      url.hostname = url.hostname.slice(4);
      return Response.redirect(url.href, 301);
    }
    const app = appFor(url.pathname);
    if (app) return env[app.binding].fetch(request);
    return publicSite(request, url);
  },
} satisfies ExportedHandler<Env>;
