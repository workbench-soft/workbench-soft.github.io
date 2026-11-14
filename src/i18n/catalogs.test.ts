import { describe, expect, it } from 'vitest';
import { projects } from '../data/projects';
import { services, steps } from '../data/studio';
import { en } from './en';
import { catalogs } from './index';
import { shape, strings } from './shape';

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
