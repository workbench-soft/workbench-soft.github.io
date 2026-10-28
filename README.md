# Workbench Soft

Public files for the Workbench Soft apps. The code sits in private repos in this org.

- **Releases** each app's CI publishes its APKs and installers on the [releases page](https://github.com/workbench-soft/workbench-soft.github.io/releases). The tag starts with the repo name, such as `tickalot-v2026.10.28.3`. Each app keeps its last 3 releases.
- **Updates** the apps installed from an APK read the release list through the GitHub API and pick the newest tag with their own name.
- **Site** https://workbench-soft.github.io, built by [pages.yml](.github/workflows/pages.yml) on each push to main.
- **Memories site** sits in [memories-mobile/](memories-mobile/), a Jekyll site with its own `_config.yml`.
- **app-ads.txt** lists the AdMob publisher for apps whose Play listing points at this site.

## Who writes here

The release jobs push with the `RELEASES_TOKEN` secret of each app repo. It is a fine-grained token with write access to this repo only.

## Media Organizer

The desktop app installs with one command. The scripts sit in [media-organizer/](media-organizer/).

Windows, in PowerShell:

```powershell
irm https://raw.githubusercontent.com/workbench-soft/workbench-soft.github.io/main/media-organizer/install.ps1 | iex
```

- **Version** each script reads `latest.json` from the [media-organizer-latest](https://github.com/workbench-soft/workbench-soft.github.io/releases/tag/media-organizer-latest) release. The desktop app reads the same file for its update.
- **Android** get `MediaOrganizer-<version>-android.apk` from the [releases page](https://github.com/workbench-soft/workbench-soft.github.io/releases?q=media-organizer&expanded=true).
