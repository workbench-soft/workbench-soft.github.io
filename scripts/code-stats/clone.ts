// Clones a repo with only its source, manifests, specs and docs, and lists the files it got.
import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { promisify } from 'node:util';
import { org, token } from './github.ts';
import { sparse } from './languages.ts';

const run = promisify(execFile);

/** The token goes in through the environment, so it stays out of the command line and the clone's config. */
const auth = () => ({
  ...process.env,
  GIT_TERMINAL_PROMPT: '0',
  GIT_CONFIG_COUNT: '1',
  GIT_CONFIG_KEY_0: 'http.https://github.com/.extraheader',
  GIT_CONFIG_VALUE_0: `AUTHORIZATION: basic ${Buffer.from(`x-access-token:${token()}`).toString('base64')}`,
});

const git = (args: string[], cwd?: string) => run('git', args, { cwd, env: auth(), maxBuffer: 1e9 });

/** Clones `repo` into `dir` and returns the paths of the files on disk. */
export async function cloneRepo(repo: string, dir: string) {
  const url = `https://github.com/${org}/${repo}.git`;
  await git(['clone', '-q', '--depth', '1', '--filter=blob:none', '--sparse', '--no-checkout', url, dir]);
  await git(['sparse-checkout', 'set', '--no-cone', ...sparse], dir);
  await git(['checkout', '-q'], dir);
  const { stdout } = await git(['ls-files', '-z'], dir);
  // ls-files also lists the files the sparse patterns left off the disk.
  return stdout.split('\0').filter((p) => p && existsSync(join(dir, p)));
}
