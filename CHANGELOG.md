# Changelog

## Unreleased

- **Shuttrix Auto tune** the page says a tap on the preview sets Light, Warmth and Color too.
- **SpotTheCam** the Trip log says each trip gives the km driven and the km walked apart.
- **Suno Download** a tool card for the Chrome extension that saves a Suno song with one click on the ⬇ beside its title.
- **Shuttrix Portrait** the page says the blur keeps what you tap sharp, near or far, a person or a thing.
- **Shuttrix, Sky Altar** each lists its new Clock: the time on the camera and over the sky.
- **SpotTheCam** Camera warnings say on the lock screen when the camera stands on the other side of the road.
- **Shuttrix** Lenses says a selfie zooms to fit the people in the frame.
- **Sky Altar** Ambient music names the violin song, the off switch and the own audio file.
- **Games apps** the developer's phone gets a Show test ads box in the lobby, to show or hide the test banner right in the app.
- **App icons** Tripforge shows its badge of peaks on an anvil, and Lumiere Player gets its stained glass play mark in place of the letter tile.

- **Sky Altar** lists Camera stars: a dim camera, stars on it that twinkle with sparks, and a gold flash when they match the sky.
- **Songfactory** lists Cleanup of AI artifacts: the build cleans each song and keeps the original.
- **Order form** the Contact section takes orders right on the page, and the corner button turned from Feedback into Order an app, which scrolls to it. Email stays as a backup line.
- **Reddit Desk and Tripforge** Reddit Desk lists Steps on top, and the Tripforge feature is named To Tickalot, as in the apps' docs.

- **Site Sources** the card shows the popup with its progress bar and the one zip it saves.
- **Shuttrix Auto tune** the Shuttrix page lists the Auto button that sets Light, Warmth and Color for the scene.
- **Feedback** a Feedback button in the corner of every page opens a short form that mails the studio. The footer and `#feedback` links open it too.
- **Site Sources** joins the tools: a Chrome extension that saves a page, its files and the original sources from its source maps with one click.
- **Games menu** Games in the header lists each party game and the Workbench Games panel, which now links to each game.
- **Features** one line each in two columns, the first 6 shown and the rest behind Show all.
- **Property Trends** the Rents feature covers NSW, QLD, SA and TAS.
- **SpotTheCam** the Trip log feature says the speeds stay on your phone.
- **Memories** Memories in the browser joins the features, and the platforms list Web.
- **Shuttrix** Slow motion and Time lapse join the features.
- **Agent Skills, private** a Feature queue feature: sessions on one app take turns on shared files, and one release follows.

- **Shuttrix** a Portrait feature: people sharp and the background soft, with a slider for the blur.
- **Shuttrix** the Exposure feature names the FIT button that sets ISO and shutter for the scene.
- **Sky Altar** a new app entry: the night sky through the phone in the style of 13 old cultures, with ambient music.

- **Names** the Tick-a-Lot entry and the Tripforge link to it spell the app Tick-a-Lot.

- **Screenshots** Memoire, Tripforge, Lumiere Player, Langflip, Media Organizer, Archon, Reddit Desk, Songfactory and local-ci show a strip of screenshots in their panels.
- **Shuttrix** its entry points at `memories/apps/shuttrix`, where the camera now lives.

- **SpotTheCam** the Android app lists Loud warnings: full volume from the phone speaker, also in silent mode or with Bluetooth on.
- **Groups** projects sit under apps for people, tools for developers, internal studio tools and the archive. Archon, Agent Skills private and the Memories demo NAS join the internal tools.
- **Icons and screenshots** each project panel shows the app icon and a strip of screenshots.
- **Email** the site, the Memories pages, the Langflip page and the games name `hello@workbench-soft.com`.
- **Projects** each heading of each repo's `docs/features.md` shows on the site, in all 9 languages. Shuttrix, Farnear, Memoire, Lumiere Player, Property Trends, Tripforge, Reddit Desk, Songfactory and Speed Camera Scraper get their own entries.
- **Docs** each heading of `docs/features.md` links its spec.
- **Property Trends** the suburb price map opens at <https://workbench-soft.com/property-trends/>, unpacked from its newest release.

- **Games domain** the games move to <https://games.workbench-soft.com/games/>, and the home page lists them as Workbench Games in all 9 languages. The deploy waits for the Cloudflare token.
- **Names** the project pages call the apps KeepPad and ServoHop.
- **Markdown** markdownlint-cli2 lints the docs in `mise run lint` and CI.

- **Domain** the site opens at <https://workbench-soft.com>. `www` and <https://workbench-soft.github.io> send each path there.
- Specs: one file per feature under `specs/`, with each dated spec moved in as an entry under `## Changes`.
- **Memories policy** the Memories privacy policy says Google Play handles the Remove ads payment, and the app only learns whether you own it.
- **Langflip page** the title and the heading name the search words, a FAQ answers 5 questions, and `sitemap-index.xml` lists the page. The Memories page gets `SoftwareApplication` data. `docs/marketing.md` holds the marketing plan.
- **Docs** `docs/architecture.md` and the games architecture doc get a Decisions section: why each part won, what it costs and which rivals lost.

- **9 languages** the home page reads in English, Russian, German, French, Spanish, Chinese, Japanese, Korean and Norwegian Bokmål. English stays at `/`, the others sit under `/ru/`, `/de/` and so on, and a menu in the header switches between them. Each page lists the others for search engines, and `sitemap-index.xml` lists them all.
- **Lint and format** oxfmt formats the whole repo. oxlint lints the home page and the edge Worker, as it already did the games. CI runs both.

- **Icon** the browser tab and the home screen show a white wrench and hammer on a violet to pink tile, in place of the `WS` letters. The 10 drafts sit in `design/icons/2026-10-31`.

- **Games apps** a phone that got the developer key over adb shows no banner. `--ads on` on the dev-phone script brings Google's test banner.
- **Games rooms** a malformed message no longer stops a room, a kick in drawing telephone moves the step on, and a room keeps 24 seats at most.
- **Room codes** the join form takes only the letters codes use, and a broken room link says so in the apps too.
- **Games protocol** each socket hello carries a version, for the apps that ship their own client.
- **Search palette** screen readers hear the result the arrow keys select.
- **CI** the site builds on pull requests, and the Pages actions are pinned to commits.
- **Games** guess the drawing, drawing telephone and clue duel at /games/, with rooms by link, English and Russian pages, and Android and iOS apps.
- **Edge** a Worker for workbenchsoft.com that sends each path to the app that owns it in registry.json.
- **Home page** a portfolio of each project with each of its features, the services the studio offers, its process and a contact block. Built with Astro, with a WebGL2 hero and a search on `Ctrl+K`.
- **Langflip** a page at /langflip/ with the Windows download, and a link from the home page.
