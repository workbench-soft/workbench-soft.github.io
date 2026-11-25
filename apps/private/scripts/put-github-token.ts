// Copies the read-only GitHub token from Bitwarden into the Worker secret GITHUB_TOKEN, as plain ASCII.
// A PowerShell pipe sends UTF-16 to wrangler, which breaks the header the Worker builds from it.
// Run: mise x -- bws run --project-id <id> -- node scripts/put-github-token.ts
import { spawnSync } from 'node:child_process';

const token = process.env.WORKBENCH_SOFT_GITHUB_IO_PRIVATE_GITHUB_TOKEN?.trim();
if (!token) throw new Error('WORKBENCH_SOFT_GITHUB_IO_PRIVATE_GITHUB_TOKEN is not in Bitwarden yet');
const result = spawnSync('pnpm', ['exec', 'wrangler', 'secret', 'put', 'GITHUB_TOKEN'], {
  input: token,
  stdio: ['pipe', 'ignore', 'inherit'],
  shell: process.platform === 'win32',
});
if (result.status !== 0) throw new Error(`wrangler secret put exited with ${result.status}`);
console.log('The Worker has GITHUB_TOKEN');
