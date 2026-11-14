import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { shape, strings } from '../i18n/shape';
import { catalogs } from './i18n';
import { en } from './i18n/en';
import { dayNumber, moonLongitude, pick, signAt, sunLongitude } from './sky';
import { ids, related } from './topics';

const file = (lang: string, id: string) => `src/content/astrology/${lang}/${id}.md`;
const body = (path: string) => readFileSync(path, 'utf8').replace(/^---[\s\S]*?---/, '');

describe('sky', () => {
  it('puts the Sun at the start of Aries on the March equinox', () => {
    const lon = sunLongitude(new Date('2026-03-20T14:46Z'));
    expect(Math.min(lon, 360 - lon)).toBeLessThan(0.5);
  });

  it('puts the Moon on the Sun at the 2024 April eclipse', () => {
    const at = new Date('2024-04-08T18:18Z');
    expect(Math.abs(moonLongitude(at) - sunLongitude(at))).toBeLessThan(1.5);
    expect(signAt(sunLongitude(at))).toBe(0);
  });

  it('gives each sign another tip each day', () => {
    const day = dayNumber(new Date(2026, 10, 3));
    expect(pick(day, 0, 28, 4)).not.toEqual(pick(day + 1, 0, 28, 4));
  });
});

describe('topics', () => {
  it('links only to articles that exist', () => {
    for (const id of ids)
      expect(
        related(id).filter((r) => !ids.includes(r)),
        id,
      ).toEqual([]);
  });
});

describe.each(Object.keys(catalogs))('%s articles', (lang) => {
  it('has each article', () => {
    expect(ids.filter((id) => !existsSync(file(lang, id)))).toEqual([]);
  });

  it('has the labels, lists and placeholders of English', () => {
    expect(shape(catalogs[lang as keyof typeof catalogs])).toEqual(shape(en));
  });

  it('has no empty label', () => {
    expect(strings(catalogs[lang as keyof typeof catalogs]).filter((s) => !s.trim())).toEqual([]);
  });
});

it('gives each English article 500 words or more', () => {
  const short = ids.filter((id) => body(file('en', id)).split(/\s+/).filter(Boolean).length < 500);
  expect(short).toEqual([]);
});
