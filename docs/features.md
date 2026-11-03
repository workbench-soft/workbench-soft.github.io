# Features

The features of <https://workbench-soft.com>. The Memories site and the Langflip page have their own folders.

## Hero

- **What it does** names the studio and what it builds, with a button that starts an email and counts of projects, features and platforms.
- **Where** the top of the home page. A WebGL2 shader draws a moving grid terrain behind the text, and the pointer tilts it.
- **Limits** a browser without WebGL2 shows a still gradient. The terrain stops while the hero is off screen and under reduced motion.

Spec: [workbench-soft-site](../specs/workbench-soft-site.md).

## Services

- **What it does** lists the kinds of work a client can order. Each card links to the projects that show that work.
- **Where** the Services link in the header.
- **Limits** the cards hold no prices.

Spec: [workbench-soft-site](../specs/workbench-soft-site.md).

## Projects

- **What it does** gives each project a panel: its icon, what it does, its screenshots, the platforms, the stack, links and each of its features.
- **Where** the Projects link in the header. The index above the panels jumps to a project and shows its feature count.
- **Groups** the panels sit in 4 groups: apps for people, tools for developers, internal studio tools such as Archon, and the archive. Chips show one group or all.
- **Screenshots** a strip under the text scrolls sideways. A click opens the full image.
- **Features** one line each, the name then the text, in two columns. The first 6 show, and Show all opens the rest.
- **Source** each project lists the headings of its repo's `docs/features.md`, as a feature or a group title.
- **Limits** links go to the public sites, the install pages and the releases page. The code repos are private. A project with no icon shows its code on a tile, and one with no screenshots shows none.

Spec: [workbench-soft-site](../specs/workbench-soft-site.md).

## Games menu

- **What it does** takes the visitor to the party games from any part of the page.
- **Where** Games in the header, on a phone too. It lists all games, Guess the drawing, Drawing telephone, Clue duel and the Workbench Games panel.
- **Limits** the games open on games.workbench-soft.com. The list comes from the links of the games project in `src/data/projects.ts`.

Spec: [workbench-soft-site](../specs/workbench-soft-site.md).

## Sites menu

- **What it does** opens any site the studio hosts, ours and our clients'.
- **Where** Sites in the header, beside Games. It lists each project site by the project name, then Our clients with Aspiration Style, the site of Maria Shilova, and Alina Photography.
- **Limits** a project shows when its first link is a page we host. Client sites sit in `clientSites` of `src/data/studio.ts`.

Spec: [workbench-soft-site](../specs/workbench-soft-site.md).

## Search

- **What it does** finds a project or a feature by any word of its name or text, then scrolls to it and lights it up.
- **Where** `Ctrl+K`, `Cmd+K` or `/`, and the Search buttons. The arrow keys move through the results, and Enter opens one. A feature behind Show all opens its list first.
- **Limits** words in the language of the page, up to 40 results.

Spec: [workbench-soft-site](../specs/workbench-soft-site.md).

## Languages

- **What it does** shows the whole page in English, Russian, German, French, Spanish, Chinese (Simplified), Japanese, Korean or Norwegian Bokmål.
- **Where** the globe button in the header opens a menu with each language in its own name. English sits at `/`, the others at `/ru/`, `/de/`, `/fr/`, `/es/`, `/zh/`, `/ja/`, `/ko/` and `/nb/`.
- **Search engines** each page names the other 8 as `hreflang` alternates, and `sitemap-index.xml` lists all 9.
- **Limits** app, stack and platform names stay in English. The page doesn't follow the browser language on its own. The Memories site, the Langflip page and the games keep their own languages.

Spec: [workbench-soft-site](../specs/workbench-soft-site.md).

## Process and contact

- **What it does** shows the 4 steps a project goes through, then the order form.
- **Where** the Process and Contact links in the header.
- **Limits** see Order form.

Spec: [workbench-soft-site](../specs/workbench-soft-site.md).

## Order form

- **What it does** the Contact section is a form: what to build, an email for the reply and an optional name. Send posts it from the site to the studio inbox. The studio address with a Copy button sits under it as a backup.
- **Where** the Order an app button in the bottom right corner, Start a project in the hero, Contact in the header, and any `#order` or `#feedback` link.
- **Limits** the main site only. FormSubmit carries the order, and the first post from a new address waits for its activation mail.

Spec: [feedback](../specs/feedback.md).

## Motion and access

- **Scroll** blocks rise in as they enter the screen, and a bar at the top shows how far the page has scrolled.
- **Reduced motion** the system setting turns off the shader motion, the headline decode, the counters and the reveals.
- **Keyboard** a skip link jumps to the projects. Each button and link shows a focus ring.

Spec: [workbench-soft-site](../specs/workbench-soft-site.md).

## Langflip page

- **What it does** names what people search for, переключатель раскладки and аналог Punto Switcher, says how the fix works, and answers 5 questions in a FAQ that search engines read as `FAQPage` data.
- **Where** `/langflip/`, in Russian, from the Download link of the Langflip panel on the home page. `sitemap-index.xml` lists it.
- **Limits** no 1200×630 image yet, so a shared link shows text alone. The page is a static file in `langflip/`, outside the Astro build.

Spec: [workbench-soft-site](../specs/workbench-soft-site.md).

## Sky Altar astrology

- **What it does** articles on the 12 zodiac signs, the Sun, Moon and rising signs, the planets, the 12 houses, the major aspects, the elements and modalities, compatibility for each sign, the Chinese zodiac and numerology. Each one links to the Sky Altar app and to related articles.
- **Today** `/skyaltar/astrology/today/` works out the Sun's and the Moon's signs in the browser, highlights the Sun's sign in ice blue and the Moon's in silver, keeps the reader's own sign in rose at the top, the same colours the Sky Altar sky uses, and gives each sign a tip that changes each day.
- **Where** `/skyaltar/astrology/` in English and `/<code>/skyaltar/astrology/` in the other languages.
- **Ads** marked AdSense slots before the 3rd section and after the article. They stay empty until `PUBLIC_ADSENSE_CLIENT` and `PUBLIC_ADSENSE_SLOT_ARTICLE` are set.
- **Limits** each page says astrology is a cultural tradition, not a science, and gives no medical, money or life advice.

Spec: [skyaltar-astrology](../specs/skyaltar-astrology.md).
