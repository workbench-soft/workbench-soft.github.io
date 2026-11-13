// AdMob in the Android and iOS apps. Debug builds and the developer's phone get Google's test ads.
import { bannerUnit, isDebugBuild, TEST_BANNER } from './ad-unit.ts';
import { devAdsShown, isDevDevice, openDevLink, saveDevAdsShown } from './dev-device.ts';

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
    if (consent.isConsentFormAvailable && consent.status === mod.AdmobConsentStatus.REQUIRED)
      await mod.AdMob.showConsentForm();
    return mod;
  })().catch((error: unknown) => {
    // Offline at launch, the consent check fails. The next banner tries again in place of giving up for the session.
    ready = null;
    throw error;
  });
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
        if (isDevLink) await resyncBanner();
      });
    });
  })().catch(() => undefined);
  return devLinks;
}

// Drops the banner, so the next one picks the unit for the developer's phone.
async function resyncBanner(): Promise<void> {
  await syncBanner(false);
  await syncBanner(wanted);
}

/** The Show test ads box on the developer's phone. */
export function setDevAdsShown(on: boolean): void {
  saveDevAdsShown(on);
  void resyncBanner();
}

export async function syncBanner(visible: boolean): Promise<void> {
  wanted = visible;
  try {
    await readDevLinks();
    const dev = isDevDevice();
    const show = visible && (!dev || devAdsShown());
    const mod = await admob();
    const platform =
      (globalThis as { Capacitor?: { getPlatform(): string } }).Capacitor?.getPlatform() === 'ios' ? 'ios' : 'android';
    if (show && !shown) {
      shown = true;
      const id = bannerUnit(platform, import.meta.env.DEV || isDebugBuild() || dev);
      await mod.AdMob.showBanner({
        adId: id,
        adSize: mod.BannerAdSize.ADAPTIVE_BANNER,
        position: mod.BannerAdPosition.BOTTOM_CENTER,
        margin: 0,
        isTesting: id === TEST_BANNER[platform],
      }).catch((error: unknown) => {
        shown = false;
        throw error;
      });
    } else if (!show && shown) {
      shown = false;
      await mod.AdMob.removeBanner();
    }
  } catch {
    // No ad is fine. The game goes on without the banner.
  }
}
