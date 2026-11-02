# Workbench Soft

Public files for the Workbench Soft apps. The code sits in private repos in this org.

- **Releases** each app's CI publishes its APKs and installers on the [releases page](https://github.com/workbench-soft/workbench-soft.github.io/releases). The tag starts with the repo name, such as `tickalot-v2025.10.28.3`. Each app keeps its last 3 releases.
- **Updates** the apps installed from an APK read the release list through the GitHub API and pick the newest tag with their own name.
- **Site** <https://workbench-soft.com>, built by [pages.yml](.github/workflows/pages.yml) on each push to main. `www` and the old <https://workbench-soft.github.io> send each path there. [docs/architecture.md](docs/architecture.md#domain) has the DNS setup.
- **Memories site** sits in [memories-mobile/](memories-mobile/), a Jekyll site with its own `_config.yml`.
- **Property Trends** its web build and data sit at <https://workbench-soft.com/property-trends/>. The private repo publishes them as a `property-trends-web-v*` release here, and `pages.yml` unpacks the newest one.
- **app-ads.txt** lists the AdMob publisher for apps whose Play listing points at this site.

## Home page

The home page is the studio's business card: what it builds for clients, and each project with each of its features. It shows no ads.

- **Stack** Astro 7 and TypeScript build it into static HTML in `dist/`. A WebGL2 shader draws the hero.
- **Content** the projects sit in [src/data/projects.ts](src/data/projects.ts), the services and the process in [src/data/studio.ts](src/data/studio.ts). A new project or feature is one entry there, plus its translation in each catalog. Each project names its `repo`, and each heading of that repo's `docs/features.md` is a feature name or a group title. `mise run feature-check` in the workspace folder lists the gaps.
- **Languages** English at `/`, and Russian, German, French, Spanish, Chinese, Japanese, Korean and Norwegian Bokmål under `/<code>/`. The text of each language sits in [src/i18n/](src/i18n/), one catalog per language.
- **Docs** [features](docs/features.md), [user flows](docs/user-flows.md) and [architecture](docs/architecture.md).

Run it with [mise](https://mise.jdx.dev):

```sh
mise install
mise x -- pnpm install
mise run dev
```

- **Check** `mise run check` type checks the pages and scripts.
- **Test** `mise run test` checks that each language catalog holds the same keys, projects and features as English.
- **Build** `mise run build` writes `dist/`. `mise run preview` serves it.
- **Deploy** a push to `main` runs [pages.yml](.github/workflows/pages.yml). It builds the home page and the Memories site, then publishes both. A pull request runs the same build and skips the publish.

## Who writes here

The release jobs push with the `RELEASES_TOKEN` secret of each app repo. It is a fine-grained token with write access to this repo only.

## Marketing

[docs/marketing.md](docs/marketing.md) holds the plan the weekly marketing job reads: the budget, the message, the channels, the calendar and the date each app page was last pushed. The job posts nothing. It leaves Reddit drafts in Reddit Desk and the person posts them.

## Langflip

The page sits in [langflip/](langflip/) and is served at <https://workbench-soft.com/langflip/>. Its download link opens the [Langflip releases](https://github.com/workbench-soft/workbench-soft.github.io/releases?q=langflip&expanded=true), where the Langflip CI publishes `Langflip-<version>-windows-x64.exe`.

## Media Organizer

The desktop app installs with one command. The scripts sit in [media-organizer/](media-organizer/).

Windows, in PowerShell:

```powershell
irm https://raw.githubusercontent.com/workbench-soft/workbench-soft.github.io/main/media-organizer/install.ps1 | iex
```

- **Version** each script reads `latest.json` from the [media-organizer-latest](https://github.com/workbench-soft/workbench-soft.github.io/releases/tag/media-organizer-latest) release. The desktop app reads the same file for its update.
- **Android** get `MediaOrganizer-<version>-android.apk` from the [releases page](https://github.com/workbench-soft/workbench-soft.github.io/releases?q=media-organizer&expanded=true).

## Games

Free party games live in [apps/games/](apps/games/) and run at <https://games.workbench-soft.com/games/>: guess the drawing, drawing telephone and clue duel, with Android and iOS apps.

- **Micro frontends** each folder in `apps/` builds and deploys on its own. [registry.json](registry.json) says which app owns each path.
- **Domain** the games Worker owns `games.workbench-soft.com`. The apex stays on GitHub Pages.
- **Edge** [apps/edge/](apps/edge/) sends each path of one domain to the app that owns it. It stays undeployed, since it needs the Cloudflare proxy on the apex.
- **Checks and deploy** the [Games workflow](.github/workflows/games.yml) checks both apps on pull requests and deploys the games from main.
- **Docs** [architecture](apps/games/docs/architecture.md), [user flows](apps/games/docs/user-flows.md), [features](apps/games/docs/features.md).
