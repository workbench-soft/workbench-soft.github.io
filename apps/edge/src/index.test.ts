import { describe, expect, it } from 'vitest';
import { appFor, siteUrl } from './index.ts';

describe('edge routes', () => {
  it('sends the games paths to the games app', () => {
    expect(appFor('/games')?.name).toBe('games');
    expect(appFor('/games/r/ABC123')?.name).toBe('games');
    expect(appFor('/games/ws/ABC123')?.name).toBe('games');
  });

  it('sends every other path to the public site', () => {
    expect(appFor('/')).toBeNull();
    expect(appFor('/langflip/')).toBeNull();
    expect(appFor('/gamesroom')).toBeNull();
  });
});

describe('public site', () => {
  it('keeps a path that looks like a host on the site', () => {
    expect(siteUrl(new URL('https://workbenchsoft.com//evil.example/x?a=1')).href).toBe(
      'https://workbench-soft.com//evil.example/x?a=1',
    );
  });

  it('serves /ads.txt from /app-ads.txt', () => {
    expect(siteUrl(new URL('https://workbenchsoft.com/ads.txt')).href).toBe('https://workbench-soft.com/app-ads.txt');
  });
});
