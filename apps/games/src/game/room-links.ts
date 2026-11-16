// Android App Links: a tap on https://games.workbench-soft.com/games/r/CODE opens the app on that room.
import { BASE } from '../shared/paths.ts';
import { CODE_RE } from '../shared/protocol.ts';

/** The room code of a shared room link, or null for any other address. */
export function roomFromLink(url: string): string | null {
  const code = url.match(/^https:\/\/games\.workbench-soft\.com\/games\/r\/([A-Za-z0-9]{6})\/?(?:[?#].*)?$/)?.[1];
  return code && CODE_RE.test(code.toUpperCase()) ? code.toUpperCase() : null;
}

const go = (url: string) => {
  const code = roomFromLink(url);
  if (code) location.href = `${BASE}/room/?code=${code}`;
};

/** Opens the room of the link that started the app, and of each link that reaches it while it runs. */
export async function followRoomLinks(): Promise<void> {
  if (!(globalThis as { Capacitor?: { isNativePlatform(): boolean } }).Capacitor?.isNativePlatform()) return;
  const { App } = await import('@capacitor/app');
  const launch = await App.getLaunchUrl();
  // The room page itself reads ?code=, so only a start on another page needs the jump.
  if (launch && !location.search.includes('code=')) go(launch.url);
  await App.addListener('appUrlOpen', ({ url }) => go(url));
}
