import { describe, expect, it } from 'vitest';
import { sameSite } from './origin.ts';

const url = new URL('https://games.workbench-soft.com/games/ws/ABCDEF');
const from = (origin?: string) =>
  sameSite(new Request(url, { headers: origin ? { Origin: origin } : {} }), url);

describe('socket origin', () => {
  it('lets in the site, the apps and clients that send no origin', () => {
    expect(from('https://games.workbench-soft.com')).toBe(true);
    expect(from('https://localhost')).toBe(true);
    expect(from('capacitor://localhost')).toBe(true);
    expect(from()).toBe(true);
  });

  it('turns down another site and an origin that is no URL', () => {
    expect(from('https://evil.example')).toBe(false);
    expect(from('null')).toBe(false);
  });
});
