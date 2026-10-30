import { beforeEach, describe, expect, it, vi } from 'vitest';
import { devAdsShown, isDevDevice, openDevLink } from './dev-device.ts';

const HASH = 'f1409a2e54292e9bc0fd291ae65d31fe329fa4dac945a7f168610cf82b03328d';
const store = new Map<string, string>();
vi.stubGlobal('localStorage', {
  getItem: (key: string) => store.get(key) ?? null,
  setItem: (key: string, value: string) => store.set(key, value),
});
// The key stays on the developer's PC, so "right" stands in for it here.
vi.stubGlobal('crypto', {
  subtle: {
    digest: async (_algorithm: string, data: Uint8Array) =>
      new TextDecoder().decode(data) === 'right'
        ? Uint8Array.from(HASH.match(/../g)!, (hex) => parseInt(hex, 16)).buffer
        : new ArrayBuffer(32),
  },
});

describe('developer phone link', () => {
  beforeEach(() => store.clear());

  it('leaves other links alone', async () => {
    expect(await openDevLink('https://workbenchsoft.com/games/r/abc234')).toBe(false);
    expect(isDevDevice()).toBe(false);
  });

  it('marks the phone and sets test ads on the right key', async () => {
    expect(await openDevLink('workbenchsoft-dev://unlock?key=right&ads=1')).toBe(true);
    expect(isDevDevice()).toBe(true);
    expect(devAdsShown()).toBe(true);
  });

  it('ignores a wrong key', async () => {
    expect(await openDevLink('workbenchsoft-dev://unlock?key=wrong&ads=1')).toBe(true);
    expect(isDevDevice()).toBe(false);
  });
});
