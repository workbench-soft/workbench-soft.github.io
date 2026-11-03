# Sky Altar astrology articles

## What it does for the person

A reader finds plain, friendly articles on the zodiac signs, planets, houses, aspects, sign compatibility, the Chinese zodiac and numerology, in 9 languages. Each article links to the Sky Altar app and to related articles. A Today page shows the Sun's sign and the Moon's sign for today, highlights the reader's own sign in another colour, and gives a tip for today for each sign.

The site gets enough original content for AdSense review, with ad slots between sections below the first screen.

Each article says once that astrology is a cultural tradition and entertainment, not science. No article makes a medical, money or fate claim.

## User flows

- **Browse** the reader opens `/skyaltar/astrology/`, picks a group and reads an article.
- **Follow** the reader moves to a related article, or opens Sky Altar on Google Play.
- **Today** the reader opens `/skyaltar/astrology/today/`, picks their sign once, and sees today's tip with today's signs highlighted.
- **App link** the Sky Altar app opens an article by its path, such as `/skyaltar/astrology/signs/aries/`.

## How it works: modules, files, data

- **URL scheme** English sits under `/skyaltar/astrology/`, each other language under `/<lang>/skyaltar/astrology/`. The paths below stay the same in each language:

| Group          | Path                                           | Slugs                                                     |
| -------------- | ---------------------------------------------- | --------------------------------------------------------- |
| Index          | `/skyaltar/astrology/`                         |                                                           |
| Today          | `/skyaltar/astrology/today/`                   |                                                           |
| Signs          | `/skyaltar/astrology/signs/<sign>/`            | `aries` to `pisces`                                       |
| Basics         | `/skyaltar/astrology/basics/<slug>/`           | `sun-sign`, `moon-sign`, `rising-sign`, `natal-chart`     |
| Planets        | `/skyaltar/astrology/planets/<planet>/`        | `sun`, `moon`, `mercury` to `pluto`                       |
| Houses         | `/skyaltar/astrology/houses/<n>/`              | `1` to `12`, Placidus                                     |
| Aspects        | `/skyaltar/astrology/aspects/<aspect>/`        | `conjunction`, `sextile`, `square`, `trine`, `opposition` |
| Elements       | `/skyaltar/astrology/elements/<element>/`      | `fire`, `earth`, `air`, `water`                           |
| Modalities     | `/skyaltar/astrology/modalities/<mode>/`       | `cardinal`, `fixed`, `mutable`                            |
| Compatibility  | `/skyaltar/astrology/compatibility/<sign>/`    | one hub per sign, each pair at `#<other sign>`            |
| Chinese zodiac | `/skyaltar/astrology/chinese-zodiac/<animal>/` | `overview`, `rat` to `pig`                                |
| Numerology     | `/skyaltar/astrology/numerology/<n>/`          | `overview`, `1` to `9`, `11`, `22`, `33`                  |

- **Articles** Markdown files in an Astro content collection, `src/content/astrology/<lang>/<group>/<slug>.md`, with `title` and `description` in the front matter.
- **Topics** `src/astrology/topics.ts` lists each article and its links: a sign names its element, modality, ruling planet and compatibility hub. The related links come from there, in the reader's language.
- **UI text** `src/astrology/i18n.ts` holds the labels in 9 languages, typed by English.
- **Today** `src/astrology/sky.ts` works out the Sun's and the Moon's tropical longitude for a date with low precision formulas, accurate to about a degree. The page runs it in the browser. The tip for a sign comes from a pool picked by the date, so it changes each day and stays the same for each reader on that day. The reader's sign sits in `localStorage`.
- **Pages** `src/pages/skyaltar/astrology/` builds English, `src/pages/[lang]/skyaltar/astrology/` the other 8 languages, both through `src/astrology/ArticlePage.astro`.
- **SEO** each page sets its canonical URL, `hreflang` alternates for the languages it has, Open Graph `article`, and `Article` plus `BreadcrumbList` structured data. The sitemap pairs the language versions by path.
- **Ads** `src/astrology/AdSlot.astro` marks a slot after the 2nd section and before the related links. It stays empty until `PUBLIC_ADSENSE_CLIENT` and `PUBLIC_ADSENSE_SLOT_ARTICLE` are set. The Pages build copies `app-ads.txt` to `/ads.txt`, since both hold the same publisher line.
- **Tests** each language holds each article, each English article has 500 words or more, and each catalog has the keys of English.

## Limits

- **Tradition** the articles follow tropical Western astrology with Placidus houses and the 5 major aspects, as the Sky Altar app does. Sidereal and Vedic systems get a mention only.
- **Today page** shows the Sun and Moon signs only. A full sky for today stays in the app.
- **Ads** the slots stay empty until AdSense approves the site and an ad unit exists.

## Changes

### 2026-11-03 Astrology articles for Sky Altar

- **Why** the Sky Altar app gains a natal chart, horoscopes, compatibility, the Chinese zodiac and numerology. The site needs many original articles to pass AdSense review, and the app needs pages to link to. The person also asked for tips for today and a highlight of today's sign and the reader's own sign.
- **Changes**
  - `specs/skyaltar-astrology.md` this spec.
  - `src/content.config.ts`, `src/content/astrology/` the collection and the articles.
  - `src/astrology/` topics, UI text, sky math, the page parts and tests.
  - `src/pages/skyaltar/astrology/`, `src/pages/[lang]/skyaltar/astrology/` the routes.
  - `src/layouts/Base.astro` takes a page path, its languages and extra structured data.
  - `.github/workflows/pages.yml` copies `ads.txt`.
- **Steps**
  1. This spec.
  2. The routes, layout, topics, Today page and English articles.
  3. The articles in the other 8 languages.
  4. Docs: `README.md`, `docs/features.md`, `docs/user-flows.md`, `docs/architecture.md`.
- **Docs** `README.md`, `docs/features.md`, `docs/user-flows.md`, `docs/architecture.md`, `CHANGELOG.md`, `TODO.md`.
