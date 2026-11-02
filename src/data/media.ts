// The icon and screenshots of each project, by its id. Astro resizes them at build time.
// src/assets/icons/<id>.<ext> holds the icon, src/assets/shots/<id>/ the screenshots in name order.
import type { ImageMetadata } from 'astro';

const load = (glob: Record<string, ImageMetadata>) => Object.entries(glob).toSorted(([a], [b]) => a.localeCompare(b));
const icons = load(import.meta.glob('../assets/icons/*.{png,svg}', { eager: true, import: 'default' }));
const shots = load(import.meta.glob('../assets/shots/*/*.{png,jpg,webp}', { eager: true, import: 'default' }));

/** A project that shares another one's icon. */
const sameIcon: Record<string, string> = { 'memories-windows': 'memories' };

const parts = (path: string) => path.split('/').slice(-2);

export const iconOf = (id: string) =>
  icons.find(([path]) => parts(path)[1].replace(/\.\w+$/, '') === (sameIcon[id] ?? id))?.[1];

export const shotsOf = (id: string) => shots.filter(([path]) => parts(path)[0] === id).map(([, image]) => image);
