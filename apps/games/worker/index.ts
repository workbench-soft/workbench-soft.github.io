import { BASE } from '../src/shared/paths.ts';
import { CODE_RE } from '../src/shared/protocol.ts';

export { RoomObject } from './room-object.ts';

const ROOM_PATH = new RegExp(`^${BASE}/(ws|r)/([A-Za-z0-9]+)/?$`);

function sameSite(request: Request, url: URL): boolean {
  const origin = request.headers.get('Origin');
  if (!origin) return true;
  const host = new URL(origin).hostname;
  // The Android and iOS apps load the pages from their own local origin.
  return host === url.hostname || host === 'localhost' || host === '127.0.0.1';
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    // The domain has no other site yet, so its root leads to the games.
    if (url.pathname === '/') return Response.redirect(`${url.origin}${BASE}/`, 302);

    const [, kind, raw] = url.pathname.match(ROOM_PATH) ?? [];
    const code = raw?.toUpperCase();

    if (kind === 'ws' && code && CODE_RE.test(code)) {
      if (request.headers.get('Upgrade') !== 'websocket') return new Response('Expected a WebSocket', { status: 426 });
      if (!sameSite(request, url)) return new Response('Forbidden', { status: 403 });
      const stub = env.ROOMS.get(env.ROOMS.idFromName(code));
      return stub.fetch(new Request(`https://room/${code}`, request));
    }

    if (kind === 'r' && code && CODE_RE.test(code)) {
      if (raw !== code || url.pathname.endsWith('/'))
        return Response.redirect(`${url.origin}${BASE}/r/${code}${url.search}`, 301);
      const page = await env.ASSETS.fetch(new Request(new URL(`${BASE}/room/`, url), request));
      return new Response(page.body, page);
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
