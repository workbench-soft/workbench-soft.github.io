# The Workbench Soft site, the Memories site and the Media Organizer installer

## What it does for the person

The studio needed one public site for its apps and their installers.

## User flows

- **Visit** the Workbench Soft and Memories pages.
- **Install** Media Organizer from this repo.

## How it works: modules, files, data

Each entry below names the files it changed.

## Limits

None written down yet.

## Changes

### 2025-10-28 The Workbench Soft site, the Memories site and the Media Organizer installer

Done on 2025-10-28, before the history was reset to one commit. The old commits sit under `refs/backup/main` in the local backup mirror of `workbench-soft.github.io`.

#### Why

The studio needed one public site for its apps and their installers.

#### User flows it touches

- **Visit** the Workbench Soft and Memories pages.
- **Install** Media Organizer from this repo.

#### Changes

- **`.github/workflows/pages.yml`** new.
- **`app-ads.txt`** new.
- **`index.html`** new.
- **`memories-mobile/_config.yml`** new.
- **`memories-mobile/_includes/analytics.html`** new.
- **`memories-mobile/_layouts/default.html`** new.
- **`memories-mobile/_layouts/guide.html`** new.
- **`memories-mobile/about.md`** new.
- **`memories-mobile/assets/apple-touch-icon.png`** new.
- **`memories-mobile/assets/archive.jpg`** new.
- **Other files** 22 more.

#### Steps, in commit order

1. Publish the Workbench Soft site and the Memories site (2d2ec63, 2025-10-28)
2. Install Media Organizer from this repo (5da5f58, 2025-10-28)

#### Docs to update

- `README.md`

#### 2026-10-30 Langflip page

- **Why** Langflip needs a public page with the download, so people can find it and get `langflip.exe`.
- **Changes**
  - **`langflip/index.html`** new: what Langflip does, the download link, the keys, privacy, the systems it runs on. In Russian, for the people who type in both layouts.
  - **`index.html`** a Langflip line in the app list.
  - **`.github/workflows/pages.yml`** copies `langflip/` into the site.
  - **`README.md`** a Langflip section.
- **Limits** the download link opens the releases filtered to Langflip. It lists nothing until the first Langflip release.

#### 2026-10-30 Portfolio home page

- **Why** the home page was a plain list of links. Workbench Soft plans to take custom development work, so the home page becomes its business card: each project with each of its features, and what the studio builds for clients. The page shows no ads.
- **What the visitor gets**
  - **Hero** the studio name, what it builds, and counts of projects, features and platforms.
  - **Services** the kinds of work a client can order: mobile, web, desktop, maps and voice, launch, tooling.
  - **Projects** a panel per project: what it does, platforms, stack, links and the full feature list. Chips filter by apps, developer tools and archive.
  - **Process** how a project goes from a spec to a release.
  - **Contact** the email, with a button that starts a letter.
  - **Quick jump** `Ctrl+K` or `/` opens a search over projects and features.
- **Stack** Astro 7 and TypeScript build the page into static HTML with small scripts. Search engines read the text without the scripts.
  - **Hero** a WebGL2 shader draws a glowing grid terrain. Without WebGL2 a CSS gradient stays.
  - **CSS** scroll-driven animations for the reveal and the progress bar, `@starting-style` for the filter, container queries for the project panels, `@property` for the button glow. Browsers without scroll timelines get an observer.
  - **Data** each project, service and step sits in typed modules under `src/data/`. The hero counts come from that data at build time.
- **Changes**
  - **`src/`** new: the Astro page, its components, scripts and data.
  - **`index.html`** removed. Astro writes it into `dist/`.
  - **`mise.toml`**, **`package.json`**, **`astro.config.mjs`**, **`tsconfig.json`** new: node 24, pnpm 12, and the tasks `dev`, `check`, `build` and `preview`.
  - **`.github/workflows/pages.yml`** installs the tools through mise, runs `check` and `build`, then copies `dist/` into the site.
  - **`docs/features.md`**, **`docs/user-flows.md`**, **`docs/architecture.md`** new.
  - **`README.md`** describes the home page and how to run it.
  - **`CHANGELOG.md`** an entry.
- **Content** each project's text comes from its repo: `docs/features.md` and the README. The `project-architecture` repo stays off the page, since it holds work done for an employer. Internal helpers (`memories-demo-webdav`, `speedcameralocationscraper`) stay off too.
- **Limits** English only. Links go to the public sites and the releases page, since the code repos are private. Motion stops under `prefers-reduced-motion`.

#### 2026-10-31 A site icon from the icons skill

- **Why** the favicon was the letters `WS` in a font the browser may lack,
  and each tool with a UI now gets its icon from the `icon-styles` skill.
- **Pick** `08-gradient-mesh`: a white wrench and hammer crossed on a violet
  to pink tile. It was drawn for the launcher, which kept its own arch icon,
  so the brand site takes it. All 10 drafts sit in `design/icons/2026-10-31`.
- **Changes** `public/favicon.svg`, `public/favicon.ico` and
  `public/apple-touch-icon.png`, linked from `src/layouts/Base.astro`.
- **Docs** `CHANGELOG.md`.

#### 2026-10-31 The home page in 9 languages

- **Why** each Workbench Soft app ships in 9 languages, and the studio page
  should reach the same people: English, Russian, German, French, Spanish,
  Chinese (Simplified), Japanese, Korean and Norwegian Bokmål.
- **What the visitor gets**
  - **Own language** `/` stays English. The other languages sit under
    `/<code>/`: `/ru/`, `/de/`, `/fr/`, `/es/`, `/zh/`, `/ja/`, `/ko/`, `/nb/`.
  - **Picker** a language menu in the header lists each language in its own
    name, such as Deutsch or 日本語. It is a list of plain links, so it works
    without scripts.
  - **Everything translated** headings, buttons, the footer, the search
    palette, page titles, meta descriptions, and each project's tagline,
    lede, link labels and features.
- **How it works**
  - **Routing** Astro's built-in i18n routing, `prefixDefaultLocale: false`.
    One page file `src/pages/[...lang].astro` builds all 9.
  - **Catalogs** `src/i18n/<code>.ts`, one typed catalog per language. The
    English text stays in `src/data/projects.ts` and `src/data/studio.ts`, and
    the other catalogs follow it by project id and feature order.
  - **Check** a Vitest test compares each catalog with English: the same UI
    keys, the same projects, the same count of groups, features, links,
    services and steps, the same placeholders, and no empty string.
  - **SEO** each page sets `<html lang>`, a canonical link, `og:locale` and an
    `hreflang` alternate for each language plus `x-default`.
    `@astrojs/sitemap` writes `sitemap-index.xml` with the alternates, and
    `robots.txt` points to it.
- **Tools added** `@astrojs/sitemap`, Astro's own sitemap integration, and
  Vitest with a `test` task in `mise.toml`.
- **Limits**
  - **Product names** app names, stack names and platform names stay as they
    are.
  - **Other pages** the Memories site, the Langflip page and the games keep
    their own languages.
  - **Fonts** Space Grotesk has no Cyrillic or CJK letters, so those fall back
    to the system font.
- **Docs** `README.md`, `docs/features.md`, `docs/user-flows.md`,
  `docs/architecture.md`, `CHANGELOG.md`.

#### 2026-10-31 Search words and a FAQ on the Langflip page, and a marketing plan

- **Why** the weekly marketing job picks the app page pushed least and makes
  it easier to find. The Langflip page was in no sitemap, its heading held
  only the name, and its text lagged behind the app: fixes now happen while
  the word is typed, and the tray shows the layout.
- **Changes**
  - **`langflip/index.html`** the title, the heading and the first lines name
    what people search for: переключатель раскладки, аналог Punto Switcher.
    A FAQ with 5 questions and the matching `FAQPage` data. The
    `SoftwareApplication` data gets a description, the download link and the
    author. `og:locale`, `og:site_name` and `twitter:card`. A link to the
    Russian home page.
  - **`astro.config.mjs`** `sitemap-index.xml` lists `/langflip/` as a custom
    page, since Astro doesn't build it.
  - **`memories-mobile/index.md`** `SoftwareApplication` data for Memories,
    the one app page that lacked it.
  - **`docs/marketing.md`** new: the plan file the marketing job reads on each
    run. Budget, message, channels, calendar, routine, and the table of app
    pages with the date each was last pushed.
- **Limits** the Langflip page has no 1200×630 image yet, so a shared link
  shows text alone. The home page holds the other apps as sections, so their
  search data stays at the `Organization` level.
- **Docs** `README.md`, `docs/features.md`, `CHANGELOG.md`, `TODO.md`.
