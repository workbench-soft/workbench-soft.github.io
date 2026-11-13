# TODO

## Playback chord fingering site cleanup (2026-11-05)

- [ ] Delete the merged branch `codex/playback-grips-site`, local and on GitHub. Its worktree is gone. Run in PowerShell: `git -C "$env:WBS_ROOT\workbench-soft.github.io" branch -D codex/playback-grips-site; git -C "$env:WBS_ROOT\workbench-soft.github.io" push origin --delete codex/playback-grips-site`.

## site-groups-icons-shots: studio email, groups, icons, screenshots

- [ ] **Shuttrix shots** the app crashes at start on an emulator (`CameraSession` reads a null ML Kit barcode scanner, seen 2026-11-02 on an x86_64 build), so it has no shots. Fix the crash in `memories/apps/shuttrix`, run the `demo-media` skill there, then copy 2 to 4 shots to `src/assets/shots/shuttrix/`.
- [ ] **Farnear shots** Farnear has no code yet. Run the `demo-media` skill once its web app runs, then copy the shots to `src/assets/shots/farnear/`.

## feat/games: party games at games.workbench-soft.com/games

The games run at <https://games.workbench-soft.com/games/>. Accounts and purchases, in this order:

- [ ] Add the iOS app "Workbench Games" at <https://apps.admob.com> with a banner unit. Put its app id into `GADApplicationIdentifier` in `apps/games/ios/App/App/Info.plist` and its unit into `REAL_BANNER.ios` in `apps/games/src/game/ad-unit.ts`. The Android app is done, see `## ads-setup`.
- [ ] Join the Apple Developer Program at <https://developer.apple.com/programs/enroll/> (99 USD a year). Without a Mac, build the iOS app on Codemagic, whose free plan gives 500 macOS minutes a month: <https://codemagic.io/signup>.
- [ ] Add games.workbench-soft.com to Google Search Console at <https://search.google.com/search-console> and to Bing at <https://www.bing.com/webmasters>, then submit `https://games.workbench-soft.com/games/sitemap-index.xml`. The `seo-setup` skill walks through it.

Work left in the code:

- [ ] Test the Android app on a phone: the pages under `/games/` load from local files, the room connects to games.workbench-soft.com, the banner shows in the lobby.
- [ ] Open room links in the apps: Android App Links with `/.well-known/assetlinks.json` and iOS Universal Links with `apple-app-site-association`, once the signing keys exist.

## play-release

"Workbench Games" (`com.workbenchsoft.games`, app 4975626241785530007) went to Google review for closed testing on 2026-11-13: build 1 (1.0), 178 countries, the "Workbench Soft testers" list, all App content, target age 13 and up, website `https://workbench-soft.com` for `app-ads.txt`. The upload key sits in `%USERPROFILE%\.android-keys\games`, and Bitwarden holds `GAMES_ANDROID_KEYSTORE_BASE64` and `GAMES_ANDROID_KEYSTORE_PASSWORD`.

- [ ] Give the Play API account access to the app: Play Console, Users and permissions, `mcp-play@workbench-soft-play.iam.gserviceaccount.com`, App permissions, Add app, Workbench Games, Admin, Apply, Save changes. Auto mode denied the agent this click.
- [ ] Kids mode is for children under 13, while the Play target audience is 13 and up. Listing under 13 means the Families policy: child-safe AdMob requests, no personal ads, a stricter review.
- [ ] Production waits for 12 testers over 14 days of closed testing.

## ads-setup

Workbench Games, `com.workbenchsoft.games`. Release builds of the Android app use the real AdMob app `ca-app-pub-8598703460892343~1509665312` and its banner since 2026-11-03.

- [ ] **GDPR message** publish the consent message for "Workbench Games" at <https://apps.admob.com>, Privacy and messaging, European regulations.
- [ ] **Remove ads** the app has no `remove_ads` purchase yet, unlike `tickalot/src/ads/remove-ads-purchase.ts`. Plan it in `specs/party-games.md` and build it once the Play app exists.
- [ ] **AdSense** apply with workbench-soft.com at <https://adsense.google.com> (not a site there yet). After approval make 2 display units for games.workbench-soft.com and set the repo variables `ADSENSE_CLIENT`, `ADSENSE_SLOT_PAGE`, `ADSENSE_SLOT_ROOM`.

## app-audit

- [ ] Try a room in the Android and iOS apps once they build: a mistyped code shows "This room link is broken", and the room reconnects after the phone sleeps.
- Left: self-host the Google Fonts of the home page. It saves a third-party request and an IP sent to Google, and adds font files plus a design check.
- Left: one pnpm version and one workspace for the root, apps/games and apps/edge. It is a tooling migration across 3 lockfiles.
- Left: memories-mobile/assets/social.png (192 KB) has no link in the repo. It is a served file another site or store listing may use.
- Left: media-organizer/install.ps1 builds the installer URL itself in place of the `url` in latest.json. Both give the same URL today.
- [ ] Play a telephone round on a phone with a big drawing, and switch from wifi to mobile data mid-room: the drawing arrives, and the room comes back within about 75 seconds (audit 2026-11-13).
- [ ] Decide the games privacy text: kids mode uses the browser's speech recognition, which Google processes in Chrome, and the policy in `apps/games/src/site/info.ts` doesn't say so.
- [ ] Decide on kids mode and ads: AdMob starts with no child-directed tag or content rating cap, and the policy says "general audience". Settle it before the Play Families answers.
- [ ] Before the iOS release, show the App Tracking Transparency prompt or drop `NSUserTrackingUsageDescription` from `apps/games/ios/App/App/Info.plist`.
- [ ] Decide the phone nav: at 320 to 414 px the search and language buttons sit past the right edge of `src/components/Nav.astro`, so phones can't switch language there.
- [ ] Decide on the `--dim` text colour in `src/styles/global.css`: 3.56:1 contrast, under the 4.5:1 of WCAG AA.
- [ ] Add the changelog line for the audit fixes to `CHANGELOG.md` once the other session frees it: the room fixes, the edge proxy fix and the lighter home page.
- Left: a 12-player telephone chain of full drawings can pass the 2 MB storage value limit. It needs one storage key per entry, a format change.
- Left: scripts/code-lines.ts writes 0 for a clone on any git error. No clone is missing today and scripts/ has no tests.
- Left: the hero shader in src/scripts/field.ts ignores WebGL context loss, and runs at full frame rate. Both change the look and need a GPU to check.
- Left: the home page "Privacy policy" link opens the Memories policy. A site policy needs a page in 9 languages.
- Left: the games Worker sends no CSP. A CSP that lets AdSense in is an ads choice.
- Left: 2 moderate advisories in glob and minimatch via `@capacitor/cli`, dev only, waiting on an upstream release.
- Left: the Today page loads 12 zodiac images at 512 px for 120 px slots (233 KB). Smaller assets change how sharp the "yours" card looks.
- Left: astrology titles past 60 characters and square share images under `summary_large_image`. Copy and share look, and the catalogs were busy.
- Left: apps/edge and the unused registry.json fields wait on whether the edge domain stays.
- Left: src/pages/apps/catalog.json.ts hand-codes project data that belongs in src/data/projects.ts.

## marketing

- [ ] Post the Reddit drafts you like from Reddit Desk, Posts tab: r/selfhosted for Memories, and the 2 test-for-test posts. On r/selfhosted a bot asks how AI was involved; reply to it and the post goes live.
- [ ] Open <https://search.google.com/search-console> for workbench-soft.github.io and request indexing of <https://workbench-soft.github.io/langflip/> and <https://workbench-soft.github.io/sitemap-index.xml>.
- [ ] Give the Langflip page a 1200×630 image at `langflip/og.png` and link it as `og:image`, so a shared link shows a picture.

## header-sites: Sites menu in the header

- [ ] **Alina Photography** once Alina has her own domain, swap the Worker address in `clientSites` of `src/data/studio.ts` for it.

## skyaltar-astrology: astrology articles for AdSense

- [ ] **Add the site** in AdSense at <https://adsense.google.com>, Sites, add `workbench-soft.com`. The pages already carry the `google-adsense-account` meta tag and `/ads.txt`, so pick the meta tag or ads.txt check, then press Request review.
- [ ] **Consent message** publish a GDPR message for `workbench-soft.com` in AdSense, Privacy and messaging, European regulations.
- [ ] **Ad unit** once AdSense approves the site, make a display ad unit and set the repo variables `ADSENSE_CLIENT` (`ca-pub-8598703460892343`, shared with the games) and `ADSENSE_SLOT_ARTICLE` at <https://github.com/workbench-soft/workbench-soft.github.io/settings/variables/actions>. The Pages build reads them.
- [ ] **Search Console** submit `https://workbench-soft.com/sitemap-index.xml` again at <https://search.google.com/search-console> so the new pages get crawled.

## Week review 2026-11

- [ ] **Games languages** `apps/games` ships only English and Russian, against the 9 languages rule. Add de, fr, es, zh, ja, ko and nb to `apps/games/src/game/i18n.ts`, the word lists and `shared/avatars.ts` through the `translations` skill, in its own PR.
- [ ] **Archon in the catalog** `src/pages/apps/catalog.json.ts` names the `workspace` repo for Archon by hand, since Archon has no `repo` in `src/data/projects.ts`. Give the project a field for its GitHub repo once `mise run feature-check` accepts a repo that is the workspace root.

## seo

Found by the SEO audit of 2026-11-13. [specs/seo.md](specs/seo.md) has the fixes made in code.

- [ ] **Search Console** add the Domain property `workbench-soft.com` at <https://search.google.com/search-console>, so it covers `games.workbench-soft.com` too. Verify it with the TXT record in Cloudflare DNS, then submit `https://workbench-soft.com/sitemap-index.xml`, `https://workbench-soft.com/memories-mobile/sitemap.xml` and `https://games.workbench-soft.com/games/sitemap-index.xml`.
- [ ] **Bing** import the sites from Search Console at <https://www.bing.com/webmasters> and check that the 3 sitemaps read without errors.
- [ ] **HTTPS on the games** `http://games.workbench-soft.com/games/` answers 200 with no redirect. In Cloudflare, workbench-soft.com, SSL/TLS, Edge Certificates, turn on Always Use HTTPS, then check that the address sends a 301 to https.
- [ ] **Cloudflare** add Web Analytics for `workbench-soft.com` and `games.workbench-soft.com`, and turn on Crawler Hints (Caching, Configuration) so IndexNow tells Bing about changes.
- [ ] **Trust pages** decide whether workbench-soft.com gets its own About page and privacy policy. The footer links the Memories privacy policy today, and AdSense review looks for both pages.
- [ ] **Property Trends** <https://workbench-soft.com/property-trends/> has no `h1` and 25 words of text. Add a heading and a paragraph on what the data shows in the private property-trends repo, whose release the Pages build unpacks.
- [ ] **Rich Results Test** run <https://search.google.com/test/rich-results> on `https://workbench-soft.com/` and `https://workbench-soft.com/skyaltar/astrology/signs/aries/`, and fix any error it names.
