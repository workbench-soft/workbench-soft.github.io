# Workbench Games

Free party games at [games.workbench-soft.com/games](https://games.workbench-soft.com/games/): guess the drawing, drawing telephone and clue duel. A person makes a room, sends the link, and friends play in the browser or in the Android and iOS apps.

## Run it

```bash
mise run dev
```

- **Site** <http://localhost:4321/games/> with hot reload. It sends `/games/ws` to the Worker.
- **Worker** <http://localhost:8787/games/> serves the last build with the rooms. `mise run preview` builds first.

## Check and build

```bash
mise run check
```

- **Lint** oxlint. **Types** the pages and the Worker. **Tests** Vitest on the rules of each game.
- **Build** `mise run build` writes `dist/`. The pages sit in `dist/games/`.

## Deploy

```bash
mise run deploy
```

The `Games` workflow deploys on each push to main once the repo has `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. The build reads these variables:

| Variable                                                 | What it sets                                                                          |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `PUBLIC_SITE_URL`                                        | The site the pages and the apps point at. Default `https://games.workbench-soft.com`  |
| `PUBLIC_ADSENSE_CLIENT`                                  | `ca-pub-…` for the site banners                                                       |
| `PUBLIC_ADSENSE_SLOT_PAGE`, `PUBLIC_ADSENSE_SLOT_ROOM`   | The banner units on the pages and in the room                                         |
| `PUBLIC_ADMOB_BANNER_ANDROID`, `PUBLIC_ADMOB_BANNER_IOS` | Override the AdMob banner units. Android defaults to the real unit, iOS to a test one |

## Android and iOS

```bash
mise run app:android
```

- **Android** builds the web files, copies them into `android/`, then opens Android Studio.
- **iOS** `mise run app:ios` does the same for `ios/`. Building it needs Xcode on a Mac or a cloud Mac.
- **Icons** `pnpm icons` draws the PNG icons and the share image from SVG.
- **Ads** a release build of the Android app uses the AdMob app `ca-app-pub-8598703460892343~1509665312` and the banner `ca-app-pub-8598703460892343/4481644716`. Debug builds, iOS and the developer's phone use Google's test IDs.
- **Google Play** the app is `com.workbenchsoft.games` on closed testing. The upload key sits in `%USERPROFILE%\.android-keys\games`, and Bitwarden holds `GAMES_ANDROID_KEYSTORE_BASE64` and `GAMES_ANDROID_KEYSTORE_PASSWORD`. Each upload takes a higher code: `./gradlew bundleRelease -PversionCode=2` with the `android.injected.signing.*` flags.
- **Consent** the AdMob message "Workbench Games GDPR" asks for consent in the EEA, the UK and Switzerland, in 8 languages.
- **Before production** a Remove ads purchase is still open. The `## ads-setup` and `## play-release` sections of the root `TODO.md` list it.
