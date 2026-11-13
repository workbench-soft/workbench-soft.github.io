# Search for workbench-soft.com and the games

## One-pager

- **Goal** search engines and AI search read each page of workbench-soft.com and games.workbench-soft.com/games/ right, and a shared link shows a picture.
- **Home site** short meta descriptions in all 9 languages, a share image, a Twitter card, `WebSite` and `Organization` JSON-LD with a logo, a 404 page that leads home, and `/llms.txt`.
- **Games** titles under 60 characters, a `robots.txt` with the sitemap, and sitemap links between the English and Russian game pages.
- **Left to the person** Search Console, Bing, Cloudflare settings and the trust pages sit in `TODO.md` under `## seo`.

## What it does for the person

- **Search results** each page shows a full title and a description that fits, in the reader's language.
- **Shared links** a link to the home site shows the Workbench Soft picture.
- **Lost readers** a mistyped address on workbench-soft.com shows a page in 9 languages with a link home.

## User flows

- **Find** a person searches for an app or a game and lands on its page.
- **Share** a person pastes a link in a chat and sees the title, the text and the picture.
- **Miss** a person opens a dead link and goes home from the 404 page.

## How it works: modules, files, data

- **`src/layouts/Base.astro`** writes the title, description, canonical, hreflang, Open Graph, Twitter card and JSON-LD of each home site page.
- **`src/i18n/*.ts`** hold `meta.description` and the 404 text in each language.
- **`src/pages/404.astro`** builds `404.html`. GitHub Pages serves it for each missing path.
- **`src/pages/llms.txt.ts`** builds `/llms.txt` from the project list.
- **`public/og.png`** is the 1200x630 share image.
- **`apps/games/src/site/text.ts`** holds the titles and descriptions of the games pages.
- **`apps/games/astro.config.mjs`** links each game page to its twin in the other language in the sitemap.
- **`apps/games/scripts/finish-build.ts`** writes `robots.txt` at the root of the games domain.

## Limits

- **GitHub Pages** sets the headers of the home site. Security headers and the HTTPS redirect stay as GitHub serves them.
- **Jekyll folders** the privacy pages under `shuttrix/` and the others name their `.html` address as canonical. Both addresses serve the same page.
- **Property Trends** its page comes from a release of a private repo, so its heading and text change there.

## Changes

### 2026-11-13 SEO audit fixes

- **Why** an audit of both sites found long descriptions, no share image on the home site, the GitHub 404 page, and a games `robots.txt` with no sitemap.
- **Changes** `Base.astro`, the 9 catalogs in `src/i18n/`, the astrology catalogs, `src/pages/404.astro`, `src/pages/llms.txt.ts`, `public/og.png`, `langflip/index.html`, `apps/games/src/site/text.ts`, `apps/games/astro.config.mjs`, `apps/games/scripts/finish-build.ts`.
- **Steps** this spec, then the home site fixes, then the games fixes, then `TODO.md`.
- **Docs** `README.md` gets a Search section, `CHANGELOG.md` an entry.
