import { describe, expect, it } from 'vitest';
import { locales } from '../../i18n/locales';
import { shape, strings } from '../../i18n/shape';
import { projects } from '../projects';
import { archs } from './index';

describe.each(projects.map((p) => [p.id, p] as const))('%s architecture', (id, project) => {
  const en = archs[id]?.en;

  it('has a file in each language', () => {
    expect(Object.keys(archs[id] ?? {}).toSorted()).toEqual([...locales].toSorted());
  });

  it('has a line for each feature, keyed by its English name', () => {
    const names = project.groups.flatMap((g) => g.features.map((f) => f.name));
    expect(Object.keys(en?.features ?? {}).toSorted()).toEqual(names.toSorted());
  });

  it.each(locales.filter((l) => l !== 'en'))('%s has the keys and lists of English', (lang) => {
    expect(shape(archs[id]?.[lang])).toEqual(shape(en));
  });

  it('links to projects that exist', () => {
    const ids = new Set(projects.map((p) => p.id));
    for (const l of en?.links ?? []) if (/^[a-z0-9-]+$/.test(l.to)) expect(ids).toContain(l.to);
  });

  it('has no empty string and no dash between words', () => {
    const all = Object.values(archs[id] ?? {}).flatMap(strings);
    expect(all.filter((s) => !s.trim() || /[—–]| - /.test(s))).toEqual([]);
  });
});
