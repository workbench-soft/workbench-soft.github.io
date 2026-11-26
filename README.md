# Workbench Soft

Public files for the Workbench Soft apps. The code sits in private repos in this org.

- **Releases** each app's CI publishes its APKs and installers on the [releases page](https://github.com/workbench-soft/workbench-soft.github.io/releases). The tag starts with the repo name, such as `tickalot-v2025.10.28.3`. Each app keeps its last 3 releases.
- **Shuttrix native libraries** [shuttrix-native.yml](.github/workflows/shuttrix-native.yml) builds a small ONNX Runtime and OpenCV for the Shuttrix APK from [native/shuttrix/](native/shuttrix/), and publishes them as a `shuttrix-native-<n>` prerelease. A person starts it by hand. [specs/shuttrix-native.md](specs/shuttrix-native.md) has the plan.
- **Updates** the apps installed from an APK read the release list through the GitHub API and pick the newest tag with their own name.
- **Site** <https://workbench-soft.com>, built by [pages.yml](.github/workflows/pages.yml) on each push to main. `www` and the old <https://workbench-soft.github.io> send each path there. [docs/architecture.md](docs/architecture.md#domain) has the DNS setup.
- **Memories site** sits in [memories-mobile/](memories-mobile/), a Jekyll site with its own `_config.yml`.
- **Shuttrix privacy policy** sits in [shuttrix/](shuttrix/), a Jekyll folder like the Memories one. It serves <https://workbench-soft.com/shuttrix/privacy-policy>.
- **Sky Altar astrology** articles on the signs, planets, houses, aspects, compatibility, the Chinese zodiac and numerology sit at <https://workbench-soft.com/skyaltar/astrology/>, with a Today page. They are Markdown in [src/content/astrology/](src/content/astrology/), one folder per language, and the only part of the site with ad slots. [specs/skyaltar-astrology.md](specs/skyaltar-astrology.md) has the paths the app links to.
- **Sky Altar privacy policy** sits in [skyaltar/](skyaltar/), a Jekyll folder like the Shuttrix one. It serves <https://workbench-soft.com/skyaltar/privacy-policy>.
- **Tripforge privacy policy** sits in [tripforge/](tripforge/), a Jekyll folder like the Sky Altar one. It serves <https://workbench-soft.com/tripforge/privacy-policy>.
- **Lumiere Player privacy policy** sits in [lumiere/](lumiere/), a Jekyll folder like the Tripforge one. It serves <https://workbench-soft.com/lumiere/privacy-policy>.
- **Memoire privacy policy** sits in [memoire/](memoire/), a Jekyll folder like the Lumiere one. It serves <https://workbench-soft.com/memoire/privacy-policy>.
- **SongCatcher privacy policy** sits in [songcatcher/](songcatcher/), a Jekyll folder like the Memoire one. It serves <https://workbench-soft.com/songcatcher/privacy-policy>.
- **Property Trends** its web build and data sit at <https://workbench-soft.com/property-trends/>. The private repo publishes them as a `property-trends-web-v*` release here. That release starts `pages.yml`, which unpacks the newest one.
- **Testers page** <https://workbench-soft.com/testers> tells testers how to join the closed tests of the Android apps. The app list and its text sit in [src/testers/](src/testers/). [specs/testers-page.md](specs/testers-page.md) has the details.
- **app-ads.txt** lists the AdMob publisher for apps whose Play listing points at this site.

## Home page

The home page is the studio's business card: what it builds for clients, and each project with each of its features. It shows no ads.

`mise run deploy` starts Pages on the current `origin/main` and waits for a successful publication step. A skipped deploy fails the command.

Baristep has a project page in all 9 languages, with the coffee guide, cup angle and jug height, the circle and heart videos, and Android APK updates. The other 33 scenes use painted pictures.

- **Stack** Astro 7 and TypeScript build it into static HTML in `dist/`. A WebGL2 shader draws the hero.
- **Content** the projects sit in [src/data/projects.ts](src/data/projects.ts), the services and the process in [src/data/studio.ts](src/data/studio.ts). A new project or feature is one entry there, plus its translation in each catalog. Its icon goes in `src/assets/icons/<id>.png` or `.svg`, its screenshots in `src/assets/shots/<id>/`, and Astro resizes both at build time. Each project names its `repo`, and each heading of that repo's `docs/features.md` is a feature name or a group title. `mise run feature-check` in the workspace folder lists the gaps.
- **Search** `src/layouts/Base.astro` writes the title, description, canonical, hreflang, share picture and JSON-LD of each page. `src/pages/` also builds `404.html` and `/llms.txt`. [specs/seo.md](specs/seo.md) has the audit and its fixes.
- **Languages** English at `/`, and Russian, German, French, Spanish, Chinese, Japanese, Korean and Norwegian Bokmål under `/<code>/`. The text of each language sits in [src/i18n/](src/i18n/), one catalog per language.
- **Docs** [features](docs/features.md), [user flows](docs/user-flows.md) and [architecture](docs/architecture.md).

Run it with [mise](https://mise.jdx.dev):

```sh
mise install
mise x -- pnpm install
git config core.hooksPath .githooks   # once per clone: lint runs before each push
mise run dev
```

- **Check** `mise run check` type checks the pages and scripts.
- **Test** `mise run test` checks that each language catalog holds the same keys, projects and features as English. It also checks that each project has its architecture in [src/data/architecture/](src/data/architecture/) in every language, with a line for each feature.
- **Build** `mise run build` writes `dist/`. `mise run preview` serves it.
- **Deploy** a push to `main` runs [pages.yml](.github/workflows/pages.yml). It builds the site and publishes it. A pull request runs the same build and skips the publish.
- **Deploy from the PC** `CI=1 mise run deploy` starts `pages.yml` on `main` and waits for the run. The task stops when `HEAD` isn't `origin/main`, so run it after `git checkout --detach origin/main`.

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

## Insiders page

Apps kept off the public site sit at <https://insiders.workbench-soft.com/private/>. Only the emails on the Cloudflare Access list can open it. [apps/private/](apps/private/) holds the Worker, and [the spec](specs/private-apps.md) holds the design.

- **Sign in** the visitor types an invited email, gets a 6-digit PIN by mail and types it. The session lasts 24 hours.
- **Apps** Suno Download, MP3 Upscaler, Site Sources, Reddit Desk, Songfactory and Disk Reorg.
- **Download** each app has a Download button. The Worker streams the newest release file from GitHub with a read-only token, so a friend needs no GitHub account.
- **New app** add one file to [apps/private/src/apps/](apps/private/src/apps/) and a line to [apps.ts](apps/private/src/apps.ts), with its line and install steps in the 9 languages.
- **Checks and deploy** the [Private workflow](.github/workflows/private.yml) checks the app on pull requests and deploys it from main.

### Invite someone

1. Open the [Invited insiders policy](https://dash.cloudflare.com/021a5552010625b00e5e81cfd41e9437/one/access-controls/policies) and press **Edit**.
2. Under **Include**, **Emails**, type the person's email and press Enter. To take someone off, press the cross on their email.
3. Press **Save policy**, then send them <https://insiders.workbench-soft.com/private/>.

With the Access permission on the deploy token, `mise run invite friend@example.com` in `apps/private` does the same through `bws run`. The emails live only in Cloudflare, so none lands in this public repo.

## Builds side by side

- **No cancel** each push runs its checks and build to the end, also when a newer push starts.
- **Deploy queue** the Pages and Games deploys wait for each other. A Pages run of an older commit skips its deploy, since the newer run publishes the site.
