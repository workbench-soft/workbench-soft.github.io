import { describe, expect, it } from 'vitest';
import { GET } from '../pages/apps/catalog.json';

describe('public app catalog', () => {
  it('includes Archon and standalone APKs nested inside other repositories', async () => {
    const response = GET();
    const apps = (await response.json()) as { id: string; name: string; platforms: string[]; url: string | null }[];
    const names = new Set(apps.map((app) => app.id));
    expect(names).toContain('archon');
    expect(names).toContain('guitarup-tuner');
    expect(names).toContain('shuttrix');
    expect(names).toContain('memories');
    expect(names.size).toBe(apps.length);
    expect(apps.find((app) => app.id === 'archon')).toMatchObject({
      name: 'Archon',
      platforms: ['Windows', 'Web'],
      url: 'https://github.com/workbench-soft/workspace',
    });
  });
});
