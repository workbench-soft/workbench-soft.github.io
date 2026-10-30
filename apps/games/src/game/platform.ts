// The Android and iOS apps load the same pages from a local origin. They reach the rooms on the site.
import { BASE, DEFAULT_SITE } from '../shared/paths.ts';
import { CODE_RE } from '../shared/protocol.ts';

type Capacitor = { isNativePlatform(): boolean; getPlatform(): string };

export const SITE_URL: string = import.meta.env.PUBLIC_SITE_URL ?? DEFAULT_SITE;

export function isNative(): boolean {
  const cap = (globalThis as { Capacitor?: Capacitor }).Capacitor;
  return Boolean(cap?.isNativePlatform());
}

export function socketUrl(code: string): string {
  if (isNative()) return `${SITE_URL.replace(/^http/, 'ws')}${BASE}/ws/${code}`;
  const { protocol, host } = location;
  return `${protocol === 'https:' ? 'wss' : 'ws'}://${host}${BASE}/ws/${code}`;
}

/** The link friends open. It points at the site from the apps too, so it works for anyone. */
export function roomLink(code: string): string {
  return `${isNative() ? SITE_URL : location.origin}${BASE}/r/${code}`;
}

/**
 * The room code from `/games/r/CODE`, or from `?code=` in the apps, which load the room page from local files.
 * A code the Worker would turn down gives null, so the page says the link is broken.
 */
export function codeFromLocation(): string | null {
  const path = location.pathname.match(/\/r\/([A-Za-z0-9]{6})\/?$/)?.[1];
  const query = new URLSearchParams(location.search).get('code');
  const code = (path ?? query)?.toUpperCase() ?? null;
  return code && CODE_RE.test(code) ? code : null;
}
