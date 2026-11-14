# TODO

## feat/games: party games at games.workbench-soft.com/games

The games run at <https://games.workbench-soft.com/games/>.

- [ ] **Apple account** join the Apple Developer Program (99 USD a year). Without a Mac, the iOS app builds on Codemagic, free for 500 macOS minutes a month.
  1. Open <https://developer.apple.com/programs/enroll/> and enroll as Workbench Soft.
  2. Open <https://codemagic.io/signup> and sign up with GitHub.
  3. Tell an agent "set up the iOS build of the games".
- [ ] **iOS AdMob app** add the iOS app at AdMob once the Apple account exists.
  1. Open <https://apps.admob.com>, Apps, Add app, iOS, "Workbench Games".
  2. Add a banner ad unit.
  3. Tell an agent both IDs. It puts the app ID into `GADApplicationIdentifier` in `apps/games/ios/App/App/Info.plist` and the unit into `REAL_BANNER.ios` in `apps/games/src/game/ad-unit.ts`.
- [ ] **Phone test** install the closed testing build of Workbench Games from Google Play, check each step, then tell an agent what failed:
  1. The lobby opens and shows a banner.
  2. A room with a friend connects.
  3. A mistyped room code shows "This room link is broken".
  4. Lock the phone for a minute: the room comes back.
  5. Play a telephone round with a big drawing and switch from wifi to mobile data: the drawing arrives and the room is back within about 75 seconds.
- [ ] **Room links in the apps** Android App Links with `/.well-known/assetlinks.json` and iOS Universal Links with `apple-app-site-association`. Android can start now that the upload key sits in `%USERPROFILE%\.android-keys\games`; iOS waits for the Apple account. Agent work.

## play-release

"Workbench Games" (`com.workbenchsoft.games`, app 4975626241785530007) went to Google review for closed testing on 2026-11-13: build 1 (1.0), 178 countries, the "Workbench Soft testers" list, all App content, target age 13 and up, website `https://workbench-soft.com` for `app-ads.txt`. The upload key sits in `%USERPROFILE%\.android-keys\games`, and Bitwarden holds `GAMES_ANDROID_KEYSTORE_BASE64` and `GAMES_ANDROID_KEYSTORE_PASSWORD`.

- [ ] **Play API access** auto mode denied the agent this click.
  1. Open <https://play.google.com/console>, Users and permissions.
  2. Pick `mcp-play@workbench-soft-play.iam.gserviceaccount.com`, App permissions, Add app, Workbench Games.
  3. Pick Admin, press Apply, then Save changes.
- [ ] **Testers** production waits for 12 testers over 14 days of closed testing. Add 12 people to the "Workbench Soft testers" list in Play Console, Testing, Closed testing.

## ads-setup

Workbench Games, `com.workbenchsoft.games`. Release builds of the Android app use the real AdMob app `ca-app-pub-8598703460892343~1509665312` and its banner since 2026-11-03. The "Workbench Games GDPR" message went live on 2026-11-14.

- [ ] **Remove ads** agent work, the plan sits in `specs/party-games.md`, 2026-11-13. Play Console takes no product until a build with the BILLING permission is uploaded, so the order is:
  1. An agent builds Remove ads in the games and uploads that build to closed testing.
  2. An agent creates `remove_ads` in Play Console, Monetize with Play, One-time products, at A$2.99 like Tickalot, and activates it.

## app-audit

- [ ] **Kids mode, ads and privacy** decide 3 linked questions, then tell an agent the answers:
  1. Kids mode is for children under 13, while the Play target audience is 13 and up. Listing under 13 means the Families policy: child-safe AdMob requests, no personal ads, a stricter review. Keep 13 and up, or list under 13?
  2. AdMob starts with no child-directed tag or content rating cap, and the policy says "general audience". Tag the kids mode requests as child-directed?
  3. Kids mode uses the browser's speech recognition, which Google processes in Chrome. Add a line on it to the policy in `apps/games/src/site/info.ts`?
- [ ] **iOS tracking prompt** before the iOS release, an agent shows the App Tracking Transparency prompt or drops `NSUserTrackingUsageDescription` from `apps/games/ios/App/App/Info.plist`. Waits for the Apple account.
- Left: one pnpm version and one workspace for the root, apps/games and apps/edge. It is a tooling migration across 3 lockfiles.
- Left: memories-mobile/assets/social.png (192 KB) has no link in the repo. It is a served file another site or store listing may use.
- Left: media-organizer/install.ps1 builds the installer URL itself in place of the `url` in latest.json. Both give the same URL today.
- Left: a 12-player telephone chain of full drawings can pass the 2 MB storage value limit. It needs one storage key per entry, a format change.
- Left: scripts/code-lines.ts writes 0 for a clone on any git error. No clone is missing today and scripts/ has no tests.
- Left: the hero shader in src/scripts/field.ts ignores WebGL context loss, and runs at full frame rate. Both change the look and need a GPU to check.
- Left: the games Worker sends no CSP. A CSP that lets AdSense in is an ads choice.
- Left: 2 moderate advisories in glob and minimatch via `@capacitor/cli`, dev only, waiting on an upstream release.
- Left: the Today page loads 12 zodiac images at 512 px for 120 px slots (233 KB). Smaller assets change how sharp the "yours" card looks.
- Left: astrology titles past 60 characters and square share images under `summary_large_image`. Copy and share look.
- Left: apps/edge and the unused registry.json fields wait on whether the edge domain stays.
- Left: src/pages/apps/catalog.json.ts still hand-codes the GuitarUp Tuner entry, which belongs in src/data/projects.ts.

## marketing

- [ ] **Reddit posts** post the drafts you like.
  1. Open Reddit Desk, Posts tab.
  2. Post r/selfhosted for Memories and the 2 test-for-test posts.
  3. On r/selfhosted a bot asks how AI was involved. Reply to it, and the post goes live.

## header-sites: Sites menu in the header

- [ ] **Alina Photography** once Alina has her own domain, tell an agent the domain. It swaps the Worker address in `clientSites` of `src/data/studio.ts`.

## AdSense for workbench-soft.com

The pages carry the `google-adsense-account` meta tag and `/ads.txt` serves the publisher line. The games and the astrology articles share the publisher `ca-pub-8598703460892343`.

- [ ] **Trust pages** decide whether workbench-soft.com gets its own About page and privacy policy. The footer links the Memories policy today, and AdSense review looks for both. Tell an agent yes or no; a yes means a page in 9 languages.
- [ ] **Add the site**
  1. Open <https://adsense.google.com>, Sites, Add site, `workbench-soft.com`.
  2. Pick the ads.txt check and press Request review.
- [ ] **Consent message** in AdSense, Privacy and messaging, European regulations, create a message for `workbench-soft.com` and press Publish.
- [ ] **Ad units** once AdSense approves the site:
  1. Make 3 display ad units: the article, a games page and a games room.
  2. Open <https://github.com/workbench-soft/workbench-soft.github.io/settings/variables/actions>.
  3. Set `ADSENSE_CLIENT` to `ca-pub-8598703460892343`, then `ADSENSE_SLOT_ARTICLE`, `ADSENSE_SLOT_PAGE` and `ADSENSE_SLOT_ROOM` to the unit IDs.

## seo

Found by the SEO audit of 2026-11-13. [specs/seo.md](specs/seo.md) has the fixes made in code.

- [ ] **Property Trends** <https://workbench-soft.com/property-trends/> has no `h1` and 25 words of text. Agent work in the private `property-trends` repo, whose release the Pages build unpacks: add a heading and a paragraph on what the data shows.
- [ ] **Rich Results Test** agent work: run <https://search.google.com/test/rich-results> on `https://workbench-soft.com/` and `https://workbench-soft.com/skyaltar/astrology/signs/aries/` in Chrome, and fix any error it names.
