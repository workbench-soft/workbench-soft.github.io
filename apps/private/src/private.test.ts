import { describe, expect, it } from 'vitest';
import { locales } from '../../../src/i18n/locales.ts';
import { shape, strings } from '../../../src/i18n/shape.ts';
import { apps } from './apps.ts';
import { catalogs, en, pickLang } from './i18n/index.ts';
import worker from './index.ts';
import { page } from './page.ts';

const env = { ACCESS_TEAM: 'example.cloudflareaccess.com', ACCESS_AUD: 'aud' };
const call = (path: string, headers: Record<string, string> = {}) =>
  worker.fetch(new Request(`https://insiders.example${path}`, { headers }), env);

describe.each(Object.entries(catalogs))('%s private catalog', (_, catalog) => {
  it('has the keys and placeholders of English', () => expect(shape(catalog)).toEqual(shape(en)));
  it('has no empty string', () => expect(strings(catalog).filter((s) => !s.trim())).toEqual([]));
});

describe.each(apps)('$name', (app) => {
  it('has a line and the steps in each language', () => {
    for (const lang of locales) {
      expect(app.about[lang]?.trim()).toBeTruthy();
      expect(app.steps[lang]).toHaveLength(app.steps.en.length);
    }
  });
});

describe('access', () => {
  it('refuses a request without the Access token', async () => {
    expect((await call('/private/')).status).toBe(403);
  });

  it('refuses a forged token', async () => {
    const response = await call('/private/', { 'Cf-Access-Jwt-Assertion': 'a.b.c' });
    expect(response.status).toBe(403);
    expect(response.headers.get('X-Robots-Tag')).toContain('noindex');
  });
});

describe('page', () => {
  it('picks the language from the query, then the browser', () => {
    expect(pickLang('ru', 'de')).toBe('ru');
    expect(pickLang(null, 'fr-CA,fr;q=0.9')).toBe('fr');
    expect(pickLang(null, 'no')).toBe('nb');
    expect(pickLang('xx', 'pt')).toBe('en');
  });

  it('keeps out of search and escapes the email', () => {
    const html = page('en', '<b>@x');
    expect(html).toContain('name="robots" content="noindex,nofollow"');
    expect(html).toContain('&lt;b&gt;@x');
    expect(html).toContain('https://github.com/workbench-soft/suno-download/releases/latest');
  });
});
