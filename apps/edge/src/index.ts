import registry from '../../../registry.json';

export type App = (typeof registry.apps)[number];
type Env = Record<App['binding'], Fetcher>;

/** The app that owns a path, or null for the public site. */
export function appFor(pathname: string): App | null {
  return registry.apps.find((app) => pathname === app.path || pathname.startsWith(`${app.path}/`)) ?? null;
}

const ORIGIN = registry.fallback.origin;

/** Asks GitHub Pages for the page, and keeps its redirects on this domain. */
async function publicSite(request: Request, url: URL): Promise<Response> {
  // AdSense reads /ads.txt and AdMob reads /app-ads.txt. Both hold the same publisher line.
  const path = url.pathname === '/ads.txt' ? '/app-ads.txt' : url.pathname;
  const response = await fetch(new Request(new URL(path + url.search, ORIGIN), request), { redirect: 'manual' });
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
