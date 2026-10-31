import { describe, expect, it } from 'vitest';
import { projects } from '../data/projects';
import { services, steps } from '../data/studio';
import { en } from './en';
import { catalogs } from './index';

// Each string becomes its path plus the {placeholders} it holds, so a missing key, an extra key,
// a lost placeholder or a list of another length shows up as a diff against English.
function shape(value: unknown, path = ''): string[] {
  if (typeof value === 'string') return [`${path} ${(value.match(/\{\w+\}/g) ?? []).toSorted().join(' ')}`];
  if (Array.isArray(value)) return [`${path}[${value.length}]`, ...value.flatMap((v, i) => shape(v, `${path}.${i}`))];
  if (value && typeof value === 'object')
    return Object.entries(value)
      .toSorted(([a], [b]) => a.localeCompare(b))
      .flatMap(([k, v]) => shape(v, `${path}.${k}`));
  return [`${path} ${typeof value}`];
}

const strings = (value: unknown): string[] =>
  typeof value === 'string' ? [value] : value && typeof value === 'object' ? Object.values(value).flatMap(strings) : [];

const english = {
  ui: en,
  services: services.map(({ title, text }) => ({ title, text })),
  steps,
  projects: Object.fromEntries(
    projects.map((p) => [
      p.id,
      {
        tagline: p.tagline,
        lede: p.lede,
        links: p.links.map((l) => l.label),
        groups: p.groups.map((g) => ({
          ...(g.title && { title: g.title }),
          features: g.features.map((f) => [f.name, f.text]),
        })),
      },
    ]),
  ),
};

describe.each(Object.entries(catalogs))('%s catalog', (_, catalog) => {
  it('has the keys, lists and placeholders of English', () => {
    expect(shape(catalog)).toEqual(shape(english));
  });

  it('has no empty string', () => {
    expect(strings(catalog).filter((s) => !s.trim())).toEqual([]);
  });
});
