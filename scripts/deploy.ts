// Puts the site live: starts the Pages workflow on main and, on the PC, waits for it to finish.
// Run it with `CI=1 mise run deploy` from a checkout whose HEAD is the fresh origin/main.
// GitHub Pages takes a deploy only with an Actions OIDC token, so the build and upload stay in pages.yml.
import { execFileSync } from 'node:child_process';

const repo = process.env.GITHUB_REPOSITORY ?? 'workbench-soft/workbench-soft.github.io';
const run = (cmd: string, args: string[]) => execFileSync(cmd, args, { encoding: 'utf8' }).trim();

run('git', ['fetch', '-q', 'origin', 'main']);
const head = run('git', ['rev-parse', 'HEAD']);
const main = run('git', ['rev-parse', 'origin/main']);
// An older commit would put an old build back, and a local commit isn't on GitHub yet.
if (head !== main) {
  console.error(
    `HEAD ${head.slice(0, 7)} isn't origin/main ${main.slice(0, 7)}. Run git checkout --detach origin/main first.`,
  );
  process.exit(1);
}

const out = run('gh', ['workflow', 'run', 'pages.yml', '--repo', repo, '--ref', 'main']);
console.log(out);
const id = out.match(/actions\/runs\/(\d+)/)?.[1];
if (!id) {
  console.error('gh printed no run URL, so the deploy can not be watched.');
  process.exit(1);
}

// In Actions the started run reports for itself, so the job ends here.
if (!process.env.GITHUB_ACTIONS) {
  execFileSync('gh', ['run', 'watch', id, '--repo', repo, '--exit-status', '--compact'], { stdio: 'inherit' });
}
