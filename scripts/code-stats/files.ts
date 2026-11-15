// Counts the lines, files, modules, specs and docs in one checkout.
import { readFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import { extOf, languages } from './languages.ts';

export interface FileCounts {
  /** Non-blank lines per language. */
  lines: Record<string, number>;
  /** Non-blank lines of each source file. */
  sizes: number[];
  modules: number;
  specs: number;
  docs: number;
}

const nonBlank = (text: string) => text.split('\n').filter((l) => l.trim()).length;

const isModule = (path: string, text: string) => {
  const name = basename(path);
  if (name === 'Cargo.toml') return /^\[package\]/m.test(text);
  return name === 'package.json' || name === 'build.gradle' || name === 'build.gradle.kts';
};

export function countFiles(dir: string, paths: string[]): FileCounts {
  const counts: FileCounts = { lines: {}, sizes: [], modules: 0, specs: 0, docs: 0 };
  for (const path of paths) {
    const text = readFileSync(join(dir, path), 'utf8');
    if (text.includes('\0')) continue;
    if (path.endsWith('.md')) {
      if (path.startsWith('specs/')) counts.specs++;
      else counts.docs++;
      continue;
    }
    if (isModule(path, text)) counts.modules++;
    const lang = languages[extOf(path)];
    if (!lang || basename(path) === 'build.gradle.kts') continue;
    const n = nonBlank(text);
    counts.lines[lang] = (counts.lines[lang] ?? 0) + n;
    counts.sizes.push(n);
  }
  return counts;
}
