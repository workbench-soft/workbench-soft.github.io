# The Workbench Soft site, the Memories site and the Media Organizer installer

Done on 2025-10-28, before the history was reset to one commit. The old commits sit under `refs/backup/main` in the local backup mirror of `workbench-soft.github.io`.

## Why

The studio needed one public site for its apps and their installers.

## User flows it touches

- **Visit** the Workbench Soft and Memories pages.
- **Install** Media Organizer from this repo.

## Changes

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

## Steps, in commit order

1. Publish the Workbench Soft site and the Memories site (2d2ec63, 2025-10-28)
2. Install Media Organizer from this repo (5da5f58, 2025-10-28)

## Docs to update

- `README.md`

## 2026-10-30 Langflip page

- **Why** Langflip needs a public page with the download, so people can find it and get `langflip.exe`.
- **Changes**
  - **`langflip/index.html`** new: what Langflip does, the download link, the keys, privacy, the systems it runs on. In Russian, for the people who type in both layouts.
  - **`index.html`** a Langflip line in the app list.
  - **`.github/workflows/pages.yml`** copies `langflip/` into the site.
  - **`README.md`** a Langflip section.
- **Limits** the download link opens the releases filtered to Langflip. It lists nothing until the first Langflip release.
