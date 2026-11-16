import { describe, expect, it } from 'vitest';
import { owns, REMOVE_ADS } from './purchase.ts';

describe('Remove ads purchase', () => {
  it('counts a paid Play purchase', () => {
    expect(owns([{ productIdentifier: REMOVE_ADS, purchaseState: '1' }])).toBe(true);
  });

  it('skips a pending purchase and other products', () => {
    expect(owns([{ productIdentifier: REMOVE_ADS, purchaseState: '2' }])).toBe(false);
    expect(owns([{ productIdentifier: 'pro', purchaseState: '1' }])).toBe(false);
  });

  it('counts a StoreKit purchase, which has no state', () => {
    expect(owns([{ productIdentifier: REMOVE_ADS }])).toBe(true);
  });
});
