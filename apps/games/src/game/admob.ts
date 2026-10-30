// AdMob in the Android and iOS apps. Debug builds and missing IDs get Google's test ads.

const TEST_BANNER = {
  android: 'ca-app-pub-3940256099942544/6300978111',
  ios: 'ca-app-pub-3940256099942544/2934735716',
};

const BANNER = {
  android: import.meta.env.PUBLIC_ADMOB_BANNER_ANDROID as string | undefined,
  ios: import.meta.env.PUBLIC_ADMOB_BANNER_IOS as string | undefined,
};

let ready: Promise<typeof import('@capacitor-community/admob')> | null = null;
let shown = false;

async function admob() {
  ready ??= (async () => {
    const mod = await import('@capacitor-community/admob');
    await mod.AdMob.initialize();
    // The consent form shows once in the regions that need it, such as the EU and the UK.
    const consent = await mod.AdMob.requestConsentInfo();
    if (consent.isConsentFormAvailable && consent.status === mod.AdmobConsentStatus.REQUIRED) await mod.AdMob.showConsentForm();
    return mod;
  })();
  return ready;
}

export async function syncBanner(visible: boolean): Promise<void> {
  try {
    const mod = await admob();
    const platform = (globalThis as { Capacitor?: { getPlatform(): string } }).Capacitor?.getPlatform() === 'ios' ? 'ios' : 'android';
    if (visible && !shown) {
      shown = true;
      const id = (!import.meta.env.DEV && BANNER[platform]) || TEST_BANNER[platform];
      await mod.AdMob.showBanner({
        adId: id,
        adSize: mod.BannerAdSize.ADAPTIVE_BANNER,
        position: mod.BannerAdPosition.BOTTOM_CENTER,
        margin: 0,
        isTesting: id === TEST_BANNER[platform],
      });
    } else if (!visible && shown) {
      shown = false;
      await mod.AdMob.removeBanner();
    }
  } catch {
    // No ad is fine. The game goes on without the banner.
  }
}
