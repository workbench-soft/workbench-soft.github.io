// Counts the code of every org repo on GitHub into src/data/code-stats.json, which the Engineering section and the hero read.
// `mise run code-stats` runs it. CI passes CODE_STATS_TOKEN, and the PC uses the gh login.
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { cloneRepo } from './clone.ts';
import { countFiles, type FileCounts } from './files.ts';
import { listRepos, mergedPrs } from './github.ts';
import { structureCounter, type Kind } from './rules.ts';

const since = new Date(Date.now() - 30 * 864e5);
const tmp = mkdtempSync(join(tmpdir(), 'code-stats-'));
const countStructure = structureCounter(tmp);

async function countRepo(name: string) {
  const dir = join(tmp, name);
  const files = countFiles(dir, await cloneRepo(name, dir));
  const structure = await countStructure(dir);
  rmSync(dir, { recursive: true, force: true });
  return { files, structure };
}

/** Runs `job` on each item, `width` at a time. */
async function pool<T, R>(items: T[], width: number, job: (item: T) => Promise<R>) {
  const out: R[] = [];
  let next = 0;
  const worker = async () => {
    while (next < items.length) {
      const i = next++;
      out[i] = await job(items[i]);
    }
  };
  await Promise.all(Array.from({ length: width }, worker));
  return out;
}

try {
  const repos = await listRepos(since.toISOString());
  const counted = await pool(repos, 6, (r) => countRepo(r.name));
  const lines: FileCounts['lines'] = {};
  const sizes: number[] = [];
  const total = { modules: 0, specs: 0, docs: 0, functions: 0, types: 0, tests: 0 };
  for (const { files, structure } of counted) {
    for (const [lang, n] of Object.entries(files.lines)) lines[lang] = (lines[lang] ?? 0) + n;
    sizes.push(...files.sizes);
    for (const k of ['modules', 'specs', 'docs'] as const) total[k] += files[k];
    for (const k of Object.keys(structure) as Kind[]) total[k] += structure[k];
  }
  sizes.sort((a, b) => a - b);
  const stats = {
    updated: new Date().toISOString(),
    repos: repos.length,
    lines: Object.values(lines).reduce((a, b) => a + b, 0),
    files: sizes.length,
    ...total,
    smallFiles: Math.round((sizes.filter((n) => n <= 100).length / sizes.length) * 100),
    medianLines: sizes[Math.floor(sizes.length / 2)],
    commits: repos.reduce((n, r) => n + r.commits, 0),
    prs: await mergedPrs(since.toISOString().slice(0, 10)),
    languages: Object.entries(lines)
      .sort((a, b) => b[1] - a[1])
      .map(([name, n]) => ({ name, lines: n })),
  };
  const out = join(import.meta.dirname, '../../src/data/code-stats.json');
  writeFileSync(out, `${JSON.stringify(stats, null, 2)}\n`);
  console.log(`${stats.lines} lines in ${stats.repos} repos, written to ${out}`);
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
