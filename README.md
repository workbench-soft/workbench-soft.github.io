# Workbench Soft

Public files for the Workbench Soft apps. The code sits in private repos in this org.

- **Releases** each app's CI publishes its APKs and installers on the [releases page](https://github.com/workbench-soft/workbench-soft.github.io/releases). The tag starts with the repo name, such as `tickalot-v2025.10.28.3`. Each app keeps its last 3 releases.
- **Updates** the apps installed from an APK read the release list through the GitHub API and pick the newest tag with their own name.
- **Site** https://workbench-soft.github.io, built by [pages.yml](.github/workflows/pages.yml) on each push to main.
- **Memories site** sits in [memories-mobile/](memories-mobile/), a Jekyll site with its own `_config.yml`.
- **app-ads.txt** lists the AdMob publisher for apps whose Play listing points at this site.

## Home page

The home page is the studio's business card: what it builds for clients, and each project with each of its features. It shows no ads.

- **Stack** Astro 7 and TypeScript build it into static HTML in `dist/`. A WebGL2 shader draws the hero.
- **Content** the projects sit in [src/data/projects.ts](src/data/projects.ts), the services and the process in [src/data/studio.ts](src/data/studio.ts). A new project or feature is one entry there.
- **Docs** [features](docs/features.md), [user flows](docs/user-flows.md) and [architecture](docs/architecture.md).

Run it with [mise](https://mise.jdx.dev):

```sh
mise install
mise x -- pnpm install
mise run dev
```

- **Check** `mise run check` type checks the pages and scripts.
- **Build** `mise run build` writes `dist/`. `mise run preview` serves it.
- **Deploy** a push to `main` runs [pages.yml](.github/workflows/pages.yml). It builds the home page and the Memories site, then publishes both.

## Who writes here

The release jobs push with the `RELEASES_TOKEN` secret of each app repo. It is a fine-grained token with write access to this repo only.

## Langflip

The page sits in [langflip/](langflip/) and is served at https://workbench-soft.github.io/langflip/. Its download link opens the [Langflip releases](https://github.com/workbench-soft/workbench-soft.github.io/releases?q=langflip&expanded=true), where the Langflip CI publishes `Langflip-<version>-windows-x64.exe`.

## Media Organizer

The desktop app installs with one command. The scripts sit in [media-organizer/](media-organizer/).

Windows, in PowerShell:

```powershell
irm https://raw.githubusercontent.com/workbench-soft/workbench-soft.github.io/main/media-organizer/install.ps1 | iex
```

- **Version** each script reads `latest.json` from the [media-organizer-latest](https://github.com/workbench-soft/workbench-soft.github.io/releases/tag/media-organizer-latest) release. The desktop app reads the same file for its update.
- **Android** get `MediaOrganizer-<version>-android.apk` from the [releases page](https://github.com/workbench-soft/workbench-soft.github.io/releases?q=media-organizer&expanded=true).
