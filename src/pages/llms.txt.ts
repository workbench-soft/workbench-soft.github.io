import { projects } from '../data/projects';
import { email } from '../data/studio';
import { en } from '../i18n/en';

export const prerender = true;

const site = 'https://workbench-soft.com';
const line = (p: (typeof projects)[number]) => {
  const href = new URL(p.links[0]?.href ?? `/#${p.id}`, site).href;
  return `- [${p.name}](${href}): ${p.tagline} ${p.platforms.join(', ')}.`;
};

// A map of the site for AI assistants, built from the same project list as the home page.
export function GET(): Response {
  const list = (kind: string) => projects.filter((p) => p.kind === kind).map(line);
  const text = [
    '# Workbench Soft',
    '',
    `> ${en.meta.org}`,
    '',
    `The home page lists each project with its features, in English at ${site}/ and in 8 more languages under /<code>/: ru, de, fr, es, zh, ja, ko, nb. Contact: ${email}.`,
    '',
    '## Apps',
    '',
    ...list('app'),
    '',
    '## Tools',
    '',
    ...list('tool'),
    '',
    '## Guides',
    '',
    `- [Astrology guide](${site}/skyaltar/astrology/): articles on the signs, planets, houses, aspects, compatibility, the Chinese zodiac and numerology, from the makers of Sky Altar.`,
    `- [Memories guides](${site}/memories-mobile/guides/): photos from a QNAP or Synology NAS on the phone.`,
    `- [Workbench Games](https://games.workbench-soft.com/games/): free drawing and word party games in the browser.`,
    '',
  ].join('\n');
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
