// Picks the AdMob banner unit. AdMob bans taps on real ads from debug builds and the developer's phone.
type AdPlatform = 'android' | 'ios';

export const TEST_BANNER: Record<AdPlatform, string> = {
  android: 'ca-app-pub-3940256099942544/6300978111',
  ios: 'ca-app-pub-3940256099942544/2934735716',
};

// The banner of the AdMob app "Workbench Games". iOS has no AdMob app yet, so it keeps the test unit.
const REAL_BANNER: Record<AdPlatform, string | undefined> = {
  android: import.meta.env.PUBLIC_ADMOB_BANNER_ANDROID || 'ca-app-pub-8598703460892343/4481644716',
  ios: import.meta.env.PUBLIC_ADMOB_BANNER_IOS || undefined,
};

/** Capacitor sets window.Capacitor.DEBUG in a debuggable build. */
export const isDebugBuild = (): boolean =>
  (globalThis as { Capacitor?: { DEBUG?: boolean } }).Capacitor?.DEBUG === true;

export function bannerUnit(platform: AdPlatform, test: boolean): string {
  return (!test && REAL_BANNER[platform]) || TEST_BANNER[platform];
}
