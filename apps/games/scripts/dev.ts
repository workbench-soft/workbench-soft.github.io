// Runs the site and the Worker together. The site proxies /ws to the Worker, so rooms work on port 4321.
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';

// wrangler wants the assets folder to exist, even when the dev site serves the pages.
mkdirSync('dist', { recursive: true });

const run = (args: string[]) => spawn('pnpm', ['exec', ...args], { stdio: 'inherit', shell: true });
const children = [run(['wrangler', 'dev', '--port', '8787']), run(['astro', 'dev', '--port', '4321'])];

const stop = () => {
  for (const child of children) child.kill();
  process.exit();
};
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
for (const child of children) child.on('exit', stop);
