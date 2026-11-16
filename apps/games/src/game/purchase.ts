// The one-time Remove ads purchase in the Android app. The key matches tickalot/src/ads/play-purchase.ts.
import { signal } from '@preact/signals';
import { isNative } from './platform.ts';
import { load, save } from './storage.ts';

export const REMOVE_ADS = 'remove_ads';

type Bought = { productIdentifier: string; purchaseState?: string };

/** True once the app saw a bought or restored remove_ads. The flag survives offline starts. */
export const adsRemoved = signal(load('adsRemoved') === '1');

/** Play reports a paid purchase with state "1"; StoreKit leaves the state out. */
export const owns = (purchases: Bought[]): boolean =>
  purchases.some((p) => p.productIdentifier === REMOVE_ADS && (p.purchaseState ?? '1') === '1');

function keep(on: boolean): void {
  adsRemoved.value = on;
  save('adsRemoved', on ? '1' : '0');
}

const plugin = async () => (await import('@capgo/native-purchases')).NativePurchases;

/** Reads the purchases at launch, so a reinstall or a second phone drops the ads too. */
export async function restoreRemoveAds(): Promise<void> {
  if (!isNative()) return;
  try {
    const { purchases } = await (await plugin()).getPurchases();
    if (owns(purchases)) keep(true);
  } catch {
    // Offline or no Play: the saved flag stands.
  }
}

/** Opens the Play purchase sheet. A cancel or an error keeps the ads. */
export async function buyRemoveAds(): Promise<void> {
  try {
    const { PURCHASE_TYPE } = await import('@capgo/native-purchases');
    const bought = await (
      await plugin()
    ).purchaseProduct({
      productIdentifier: REMOVE_ADS,
      productType: PURCHASE_TYPE.INAPP,
    });
    if (owns([bought])) keep(true);
  } catch {
    // The person closed the sheet, or Play is out of reach.
  }
}
