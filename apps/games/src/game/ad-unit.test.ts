import { afterEach, describe, expect, it, vi } from 'vitest';
import { bannerUnit, isDebugBuild, TEST_BANNER } from './ad-unit.ts';

describe('AdMob banner unit', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('gives a release Android build the real banner', () => {
    expect(bannerUnit('android', false)).toBe('ca-app-pub-8598703460892343/4481644716');
  });

  it('gives test builds and the developer phone the test banner', () => {
    expect(bannerUnit('android', true)).toBe(TEST_BANNER.android);
  });

  it('keeps iOS on the test banner until it has an AdMob app', () => {
    expect(bannerUnit('ios', false)).toBe(TEST_BANNER.ios);
  });

  it('reads a debug build from Capacitor', () => {
    expect(isDebugBuild()).toBe(false);
    vi.stubGlobal('Capacitor', { DEBUG: true });
    expect(isDebugBuild()).toBe(true);
    vi.stubGlobal('Capacitor', { DEBUG: false });
    expect(isDebugBuild()).toBe(false);
  });
});
