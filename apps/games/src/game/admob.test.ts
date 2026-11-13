import { describe, expect, it, vi } from 'vitest';

const plugin = vi.hoisted(() => ({
  initialize: vi.fn<() => Promise<void>>(async () => {}),
  requestConsentInfo: vi.fn<() => Promise<{ isConsentFormAvailable: boolean; status: string }>>(async () => ({
    isConsentFormAvailable: false,
    status: 'OBTAINED',
  })),
  showConsentForm: vi.fn<() => Promise<void>>(async () => {}),
  showBanner: vi.fn<(options: unknown) => Promise<void>>(async () => {}),
  removeBanner: vi.fn<() => Promise<void>>(async () => {}),
}));
vi.mock('@capacitor-community/admob', () => ({
  AdMob: plugin,
  AdmobConsentStatus: { REQUIRED: 'REQUIRED' },
  BannerAdSize: { ADAPTIVE_BANNER: 'ADAPTIVE_BANNER' },
  BannerAdPosition: { BOTTOM_CENTER: 'BOTTOM_CENTER' },
}));
vi.mock('@capacitor/app', () => ({
  App: { getLaunchUrl: async () => undefined, addListener: async () => ({ remove: async () => {} }) },
}));

const { syncBanner } = await import('./admob.ts');

describe('AdMob banner', () => {
  it('tries again after a launch with no network', async () => {
    plugin.requestConsentInfo.mockRejectedValueOnce(new Error('offline'));
    await syncBanner(true);
    expect(plugin.showBanner).not.toHaveBeenCalled();
    await syncBanner(true);
    expect(plugin.showBanner).toHaveBeenCalledTimes(1);
  });

  it('shows the banner on the next try after showBanner failed', async () => {
    await syncBanner(false);
    plugin.showBanner.mockClear();
    plugin.showBanner.mockRejectedValueOnce(new Error('no fill'));
    await syncBanner(true);
    await syncBanner(true);
    expect(plugin.showBanner).toHaveBeenCalledTimes(2);
  });
});
