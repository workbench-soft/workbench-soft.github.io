import { describe, expect, it } from 'vitest';
import { catalogs } from './i18n';

const shape = (v: unknown): unknown =>
  Array.isArray(v)
    ? v.map(shape)
    : v && typeof v === 'object'
      ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, shape(x)]))
      : typeof v;
const holes = (v: unknown): string[] => (JSON.stringify(v).match(/\{\w+\}/g) ?? []).sort();

describe('About and Privacy pages', () => {
  it('has the same sections and links in every language', () => {
    for (const [lang, text] of Object.entries(catalogs)) {
      expect(shape(text), lang).toEqual(shape(catalogs.en));
      expect(holes(text), lang).toEqual(holes(catalogs.en));
    }
  });
});
