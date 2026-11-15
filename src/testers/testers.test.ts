import { describe, expect, it } from 'vitest';
import { shape, strings } from '../i18n/shape';
import { apps } from './apps';
import { catalogs } from './i18n';
import { en } from './i18n/en';

describe.each(Object.entries(catalogs))('%s testers catalog', (_, catalog) => {
  it('has the keys, lists and placeholders of English', () => {
    expect(shape(catalog)).toEqual(shape(en));
  });

  it('has no empty string', () => {
    expect(strings(catalog).filter((s) => !s.trim())).toEqual([]);
  });
});

it('describes each app of the list', () => {
  expect(Object.keys(en.apps).toSorted()).toEqual(apps.map((a) => a.id).toSorted());
});
