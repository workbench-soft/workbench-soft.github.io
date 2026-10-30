// The developer's phone shows no banner until the dev-phone script turns test ads on.
import { load, save } from './storage.ts';

// SHA-256 of WORKBENCH_DEV_KEY. The key stays on the developer's PC, see docs/features.md.
const DEV_KEY_SHA256 = 'f1409a2e54292e9bc0fd291ae65d31fe329fa4dac945a7f168610cf82b03328d';

/** Set once the developer's phone sends the key. */
export const isDevDevice = (): boolean => load('devDevice') === '1';

/** Test ads on the developer's phone. Off by default. */
export const devAdsShown = (): boolean => load('devAdsShown') === '1';

async function sha256(text: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Reads workbenchsoft-dev://unlock?key=…&ads=1, which scripts/dev-phone.ts in the docs repo sends over adb.
 * Returns false for any other link.
 */
export async function openDevLink(url: string): Promise<boolean> {
  if (!url.startsWith('workbenchsoft-dev:')) return false;
  const params = new URL(url).searchParams;
  const key = params.get('key');
  if (key === null || (await sha256(key)) !== DEV_KEY_SHA256) return true;
  save('devDevice', '1');
  const ads = params.get('ads');
  if (ads === '1' || ads === '0') save('devAdsShown', ads);
  return true;
}
