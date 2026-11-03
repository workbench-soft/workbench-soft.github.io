# TODO

## site-groups-icons-shots: studio email, groups, icons, screenshots

- [ ] **Shuttrix shots** the app crashes at start on an emulator (`CameraSession` reads a null ML Kit barcode scanner, seen 2026-11-02 on an x86_64 build), so it has no shots. Fix the crash in `memories/apps/shuttrix`, run the `demo-media` skill there, then copy 2 to 4 shots to `src/assets/shots/shuttrix/`.
- [ ] **Farnear shots** Farnear has no code yet. Run the `demo-media` skill once its web app runs, then copy the shots to `src/assets/shots/farnear/`.

## feat/games: party games at games.workbench-soft.com/games

The games run at <https://games.workbench-soft.com/games/>. Accounts and purchases, in this order:

- [ ] Add the iOS app "Workbench Games" at <https://apps.admob.com> with a banner unit. Put its app id into `GADApplicationIdentifier` in `apps/games/ios/App/App/Info.plist` and its unit into `REAL_BANNER.ios` in `apps/games/src/game/ad-unit.ts`. The Android app is done, see `## ads-setup`.
- [ ] Open a Google Play developer account at <https://play.google.com/console/signup> (25 USD once), then run the `play-release` skill for `com.workbenchsoft.games`.
- [ ] Join the Apple Developer Program at <https://developer.apple.com/programs/enroll/> (99 USD a year). Without a Mac, build the iOS app on Codemagic, whose free plan gives 500 macOS minutes a month: <https://codemagic.io/signup>.
- [ ] Add games.workbench-soft.com to Google Search Console at <https://search.google.com/search-console> and to Bing at <https://www.bing.com/webmasters>, then submit `https://games.workbench-soft.com/games/sitemap-index.xml`. The `seo-setup` skill walks through it.

Work left in the code:

- [ ] Test the Android app on a phone: the pages under `/games/` load from local files, the room connects to games.workbench-soft.com, the banner shows in the lobby.
- [ ] Open room links in the apps: Android App Links with `/.well-known/assetlinks.json` and iOS Universal Links with `apple-app-site-association`, once the signing keys exist.

## ads-setup

Workbench Games, `com.workbenchsoft.games`. Release builds of the Android app use the real AdMob app `ca-app-pub-8598703460892343~1509665312` and its banner since 2026-11-03.

- [ ] **Play app** finish creating "Workbench Games" in <https://play.google.com/console>. Set its website to `https://workbench-soft.com`, which serves `app-ads.txt` (`games.workbench-soft.com/app-ads.txt` gives 404).
- [ ] **First AAB** build a signed release AAB of `apps/games/android` and upload it to internal testing through the `play-release` skill.
- [ ] **GDPR message** publish the consent message for "Workbench Games" at <https://apps.admob.com>, Privacy and messaging, European regulations.
- [ ] **Play declarations** in Play Console, App content: Ads "Yes", then Data safety with the AdMob answers (device or other IDs, collected and shared for advertising). The `ads-setup` skill has them in `references/play-declarations.md`.
- [ ] **Remove ads** the app has no `remove_ads` purchase yet, unlike `tickalot/src/ads/remove-ads-purchase.ts`. Plan it in `specs/party-games.md` and build it once the Play app exists.
- [ ] **AdSense** apply with workbench-soft.com at <https://adsense.google.com> (not a site there yet). After approval make 2 display units for games.workbench-soft.com and set the repo variables `ADSENSE_CLIENT`, `ADSENSE_SLOT_PAGE`, `ADSENSE_SLOT_ROOM`.

## app-audit

- [ ] Try a room in the Android and iOS apps once they build: a mistyped code shows "This room link is broken", and the room reconnects after the phone sleeps.
- Left: self-host the Google Fonts of the home page. It saves a third-party request and an IP sent to Google, and adds font files plus a design check.
- Left: one pnpm version and one workspace for the root, apps/games and apps/edge. It is a tooling migration across 3 lockfiles.
- Left: memories-mobile/assets/social.png (192 KB) has no link in the repo. It is a served file another site or store listing may use.
- Left: media-organizer/install.ps1 builds the installer URL itself in place of the `url` in latest.json. Both give the same URL today.

## marketing

- [ ] Post the Reddit drafts you like from Reddit Desk, Posts tab: r/selfhosted for Memories, and the 2 test-for-test posts. On r/selfhosted a bot asks how AI was involved; reply to it and the post goes live.
- [ ] Open <https://search.google.com/search-console> for workbench-soft.github.io and request indexing of <https://workbench-soft.github.io/langflip/> and <https://workbench-soft.github.io/sitemap-index.xml>.
- [ ] Give the Langflip page a 1200×630 image at `langflip/og.png` and link it as `og:image`, so a shared link shows a picture.

## header-sites: Sites menu in the header

- [ ] **Alina Photography** once Alina has her own domain, swap the Worker address in `clientSites` of `src/data/studio.ts` for it.
