import { projects, type Project } from '../data/projects';
import { services, steps } from '../data/studio';
import { en } from './en';
import type { Lang } from './locales';
import type { Catalog, Ui } from './types';
import de from './de';
import es from './es';
import fr from './fr';
import ja from './ja';
import ko from './ko';
import nb from './nb';
import ru from './ru';
import zh from './zh';

export const catalogs: Record<Exclude<Lang, 'en'>, Catalog> = { ru, de, fr, es, zh, ja, ko, nb };

export const ui = (lang: Lang): Ui => (lang === 'en' ? en : catalogs[lang].ui);

export function projectsIn(lang: Lang): Project[] {
  if (lang === 'en') return projects;
  const texts = catalogs[lang].projects;
  return projects.map((p) => {
    const t = texts[p.id];
    return {
      ...p,
      tagline: t.tagline,
      lede: t.lede,
      links: p.links.map((l, i) => ({ ...l, label: t.links[i] })),
      groups: t.groups.map((g) => ({ title: g.title, features: g.features.map(([name, text]) => ({ name, text })) })),
    };
  });
}

export const servicesIn = (lang: Lang) =>
  lang === 'en' ? services : services.map((s, i) => ({ ...s, ...catalogs[lang].services[i] }));

export const stepsIn = (lang: Lang) => (lang === 'en' ? steps : catalogs[lang].steps);
