import { expect, it } from 'vitest';
import { locales } from '../../i18n/locales';
import { shape, strings } from '../../i18n/shape';
import { engineering } from './index';

const en = engineering.en!;

it('has a file in each language', () => {
  expect(Object.keys(engineering).toSorted()).toEqual([...locales].toSorted());
});

it.each(locales.filter((l) => l !== 'en'))('%s has the keys, lists and topics of English', (lang) => {
  const t = engineering[lang]!;
  expect(shape(t)).toEqual(shape(en));
  expect(t.topics.map((x) => x.id)).toEqual(en.topics.map((x) => x.id));
});

it('has no empty string and no dash between words', () => {
  const all = Object.values(engineering).flatMap(strings);
  expect(all.filter((s) => !s.trim() || /[—–]| - /.test(s))).toEqual([]);
});
