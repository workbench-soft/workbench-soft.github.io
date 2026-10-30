// Astro writes the pages to dist/games/. This adds the files that sit above them in dist/.
import { writeFileSync } from 'node:fs';

// Cache rules for the Worker's static files. Built assets carry a hash in the name, so they never go stale.
writeFileSync(
  'dist/_headers',
  `/games/_astro/*
  Cache-Control: public, max-age=31536000, immutable

/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
`,
);

// The Android and iOS apps start at dist/index.html. On the web the Worker sends / to /games/ first.
writeFileSync(
  'dist/index.html',
  '<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=games/index.html"><title>Workbench Games</title>\n',
);
