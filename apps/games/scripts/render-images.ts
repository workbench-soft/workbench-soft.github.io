// Draws the PNG icons and the share image from SVG. Run it after a change to the logo: pnpm icons
import { writeFileSync } from 'node:fs';
import { Resvg } from '@resvg/resvg-js';

const logo = (size: number) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#5b3df5"/>
  <path d="M14 44c6-14 12-22 18-22s6 10 12 10 6-8 8-12" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>
  <circle cx="48" cy="46" r="6" fill="#ffd166"/>
</svg>`;

const share = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f6f4ff"/>
  <rect x="80" y="80" width="200" height="200" rx="44" fill="#5b3df5"/>
  <path d="M124 236c19-44 38-70 57-70s19 32 38 32 19-26 25-38" fill="none" stroke="#fff" stroke-width="19" stroke-linecap="round" transform="translate(0 -8)"/>
  <circle cx="232" cy="226" r="19" fill="#ffd166"/>
  <text x="80" y="390" font-family="Segoe UI, Arial, sans-serif" font-size="84" font-weight="700" fill="#1d1b2c">Workbench Games</text>
  <text x="80" y="470" font-family="Segoe UI, Arial, sans-serif" font-size="40" fill="#65627a">Guess the drawing · Drawing telephone · Clue duel</text>
  <text x="80" y="540" font-family="Segoe UI, Arial, sans-serif" font-size="36" fill="#5b3df5">Free party games in the browser</text>
</svg>`;

const render = (svg: string, file: string) =>
  writeFileSync(file, new Resvg(svg, { font: { loadSystemFonts: true } }).render().asPng());

render(logo(192), 'public/icon-192.png');
render(logo(512), 'public/icon-512.png');
render(logo(1024), 'resources/icon.png');
render(share, 'public/og.png');
