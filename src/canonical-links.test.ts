import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { expect, it } from 'vitest';

// Jekyll names each page's .html address as canonical, so the links point there too.
const jekyll = ['memories-mobile', 'shuttrix', 'skyaltar', 'tripforge', 'lumiere', 'memoire'];
const guides = readdirSync('memories-mobile/guides').flatMap((f) => (f === 'index.md' ? [] : [f.replace(/\.md$/, '')]));
const pages = ['about', 'privacy-policy', ...guides].join('|');
const files = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? files(join(dir, e.name)) : /\.(astro|md|html)$/.test(e.name) ? [join(dir, e.name)] : [],
  );
// A relative Markdown link, a Liquid path or a root path into a Jekyll folder, with no .html.
const from = String.raw`\]\((\.\./|guides/)?|\{\{ "/|href="/(${jekyll.join('|')})/`;
const bare = new RegExp(String.raw`(${from})(${pages})[")]`, 'g');

it('links each Jekyll page by its .html address', () => {
  const hits = ['src', ...jekyll]
    .flatMap(files)
    .flatMap((f) => [...readFileSync(f, 'utf8').matchAll(bare)].map((m) => `${f}: ${m[0]}`));
  expect(hits).toEqual([]);
});
