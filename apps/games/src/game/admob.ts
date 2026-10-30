// AdMob in the Android and iOS apps. Debug builds, missing IDs and the developer's phone get Google's test ads.
import { devAdsShown, isDevDevice, openDevLink } from './dev-device.ts';

const TEST_BANNER = {
  android: 'ca-app-pub-3940256099942544/6300978111',
  ios: 'ca-app-pub-3940256099942544/2934735716',
};

const BANNER = {
  android: import.meta.env.PUBLIC_ADMOB_BANNER_ANDROID as string | undefined,
  ios: import.meta.env.PUBLIC_ADMOB_BANNER_IOS as string | undefined,
};

let ready: Promise<typeof import('@capacitor-community/admob')> | null = null;
let devLinks: Promise<void> | null = null;
let shown = false;
let wanted = false;

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

// The unlock link can open the app or reach it while it runs. A later link drops the banner with the real unit.
function readDevLinks(): Promise<void> {
  devLinks ??= (async () => {
    const { App } = await import('@capacitor/app');
    const launch = await App.getLaunchUrl();
    if (launch) await openDevLink(launch.url);
    await App.addListener('appUrlOpen', ({ url }) => {
      void openDevLink(url).then(async (isDevLink) => {
        if (!isDevLink) return;
        await syncBanner(false);
        await syncBanner(wanted);
      });
    });
  })().catch(() => undefined);
  return devLinks;
}

export async function syncBanner(visible: boolean): Promise<void> {
  wanted = visible;
  try {
    await readDevLinks();
    const dev = isDevDevice();
    const show = visible && (!dev || devAdsShown());
    const mod = await admob();
    const platform = (globalThis as { Capacitor?: { getPlatform(): string } }).Capacitor?.getPlatform() === 'ios' ? 'ios' : 'android';
    if (show && !shown) {
      shown = true;
      const id = (!import.meta.env.DEV && !dev && BANNER[platform]) || TEST_BANNER[platform];
      await mod.AdMob.showBanner({
        adId: id,
        adSize: mod.BannerAdSize.ADAPTIVE_BANNER,
        position: mod.BannerAdPosition.BOTTOM_CENTER,
        margin: 0,
        isTesting: id === TEST_BANNER[platform],
      });
    } else if (!show && shown) {
      shown = false;
      await mod.AdMob.removeBanner();
    }
  } catch {
    // No ad is fine. The game goes on without the banner.
  }
}
