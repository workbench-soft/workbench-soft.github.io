// Counts the non-blank lines of source code that git tracks in each repo clone beside this one.
// Run it with `mise run code-lines` from a clone that sits in the workspace folder, then commit the JSON.
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const site = join(import.meta.dirname, '..');
const workspace = join(
  execFileSync('git', ['-C', site, 'rev-parse', '--path-format=absolute', '--git-common-dir']).toString().trim(),
  '../..',
);
const repos = Object.keys(JSON.parse(readFileSync(join(workspace, 'repos.json'), 'utf8')));

// Built copies of other repos and code that moved to another repo.
const skip = new Set(['aspirationstyle-site', 'farnear-site', 'media-organizer', 'shuttrix', 'workbench-soft']);
const extensions =
  'ts tsx js jsx mjs cjs astro vue svelte rs kt kts java swift cs py sh ps1 css scss html sql go c cpp h glsl wgsl';
const paths = [
  ...extensions.split(' ').map((e) => `*.${e}`),
  ...['*.min.*', '**/vendor/**', '**/binaries/**', '**/dist/**', '**/generated/**', '**/worker-configuration.d.ts'].map(
    (p) => `:!${p}`,
  ),
];

const count = (repo: string) => {
  try {
    const out = execFileSync(
      'git',
      ['-C', join(workspace, repo), 'grep', '-cI', '-e', '[^[:space:]]', 'HEAD', '--', ...paths],
      { maxBuffer: 1e9 },
    );
    return out
      .toString()
      .trim()
      .split('\n')
      .reduce((n, line) => n + Number(line.slice(line.lastIndexOf(':') + 1)), 0);
  } catch {
    return 0; // git grep exits 1 when no file matches, and a missing clone counts as none.
  }
};

const perRepo = Object.fromEntries(repos.filter((r) => !skip.has(r)).map((r) => [r, count(r)]));
const total = Object.values(perRepo).reduce((a, b) => a + b, 0);
const file = join(site, 'src/data/code-lines.json');
writeFileSync(file, `${JSON.stringify({ total, repos: perRepo }, null, 2)}\n`);
console.log(`${total} lines in ${Object.keys(perRepo).length} repos, written to ${file}`);
