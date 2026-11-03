// Each article of the astrology section, by group, in the order the index shows them.
// The id `<group>/<slug>` is also the path under /skyaltar/astrology/, so the app can link to it.
export const signs = [
  'aries',
  'taurus',
  'gemini',
  'cancer',
  'leo',
  'virgo',
  'libra',
  'scorpio',
  'sagittarius',
  'capricorn',
  'aquarius',
  'pisces',
] as const;
export type Sign = (typeof signs)[number];

const planets = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];
const animals = ['rat', 'ox', 'tiger', 'rabbit', 'dragon', 'snake', 'horse', 'goat', 'monkey', 'rooster', 'dog', 'pig'];
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '11', '22', '33'];

export const groups = {
  basics: ['natal-chart', 'sun-sign', 'moon-sign', 'rising-sign'],
  signs: [...signs],
  planets,
  houses: Array.from({ length: 12 }, (_, i) => String(i + 1)),
  aspects: ['conjunction', 'sextile', 'square', 'trine', 'opposition'],
  elements: ['fire', 'earth', 'air', 'water'],
  modalities: ['cardinal', 'fixed', 'mutable'],
  compatibility: [...signs],
  'chinese-zodiac': ['overview', ...animals],
  numerology: ['overview', ...numbers],
};
export type Group = keyof typeof groups;

export const ids = Object.entries(groups).flatMap(([g, slugs]) => slugs.map((s) => `${g}/${s}`));

const elements = ['fire', 'earth', 'air', 'water'];
const modalities = ['cardinal', 'fixed', 'mutable'];
// Traditional and modern rulers, as most Western books list them.
const rulers: Record<Sign, string[]> = {
  aries: ['mars'],
  taurus: ['venus'],
  gemini: ['mercury'],
  cancer: ['moon'],
  leo: ['sun'],
  virgo: ['mercury'],
  libra: ['venus'],
  scorpio: ['pluto', 'mars'],
  sagittarius: ['jupiter'],
  capricorn: ['saturn'],
  aquarius: ['uranus', 'saturn'],
  pisces: ['neptune', 'jupiter'],
};

export const elementOf = (i: number) => elements[i % 4];
export const modalityOf = (i: number) => modalities[i % 3];

const around = (group: Group, slug: string) => {
  const list: string[] = groups[group];
  const i = list.indexOf(slug);
  return [list[(i + list.length - 1) % list.length], list[(i + 1) % list.length]].map((s) => `${group}/${s}`);
};

/** The articles an article links to, in the order the page shows them. */
export function related(id: string): string[] {
  const [group, slug] = id.split('/') as [Group, string];
  const si = signs.indexOf(slug as Sign);
  const ruled = (p: string) => signs.filter((s) => rulers[s].includes(p)).map((s) => `signs/${s}`);
  const list: string[] = (() => {
    switch (group) {
      case 'signs':
        return [
          `compatibility/${slug}`,
          `elements/${elementOf(si)}`,
          `modalities/${modalityOf(si)}`,
          ...rulers[slug as Sign].map((p) => `planets/${p}`),
          `houses/${si + 1}`,
          ...around(group, slug),
        ];
      case 'compatibility':
        return [
          `signs/${slug}`,
          `elements/${elementOf(si)}`,
          'aspects/trine',
          'aspects/opposition',
          ...around(group, slug),
        ];
      case 'planets':
        return [...ruled(slug), 'basics/natal-chart', 'aspects/conjunction', ...around(group, slug)];
      case 'houses':
        return [`signs/${signs[Number(slug) - 1]}`, 'basics/rising-sign', 'basics/natal-chart', ...around(group, slug)];
      case 'aspects':
        return [...groups.aspects.filter((a) => a !== slug).map((a) => `aspects/${a}`), 'basics/natal-chart'];
      case 'elements':
        return [
          ...signs.filter((_, i) => elementOf(i) === slug).map((s) => `signs/${s}`),
          ...elements.filter((e) => e !== slug).map((e) => `elements/${e}`),
        ];
      case 'modalities':
        return [
          ...signs.filter((_, i) => modalityOf(i) === slug).map((s) => `signs/${s}`),
          ...modalities.filter((m) => m !== slug).map((m) => `modalities/${m}`),
        ];
      case 'basics':
        return [
          ...groups.basics.filter((b) => b !== slug).map((b) => `basics/${b}`),
          'planets/sun',
          'planets/moon',
          'houses/1',
          'aspects/conjunction',
        ];
      case 'chinese-zodiac':
      case 'numerology':
        return slug === 'overview'
          ? groups[group].slice(1).map((s) => `${group}/${s}`)
          : [`${group}/overview`, ...around(group, slug).filter((r) => !r.endsWith('/overview'))];
    }
  })();
  return [...new Set(list)].filter((r) => r !== id);
}
