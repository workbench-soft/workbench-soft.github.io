# TODO

## feat/games: party games at games.workbench-soft.com/games

The games run at <https://games.workbench-soft.com/games/>. Android App Links work since 2026-11-17: `/.well-known/assetlinks.json` holds the Play app signing certificate.

- [ ] **Apple account** join the Apple Developer Program, 99 USD a year (payment).
  1. Open <https://developer.apple.com/programs/enroll/> and enroll as Workbench Soft.
  2. Open <https://codemagic.io/signup> and sign up with GitHub.
  3. Tell an agent "set up the iOS build of the games". It adds the iOS AdMob app, Universal Links, the tracking prompt and `PrivacyInfo.xcprivacy`.

## play-release

"Workbench Games" (`com.workbenchsoft.games`, app 4975626241785530007) is on closed testing: build 1 since 2026-11-13, build 2 with Remove ads and App Links since 2026-11-17. The Play API reads the app, and the alpha track uses the testers groups of the other apps.

- [ ] **Testers** production waits for 12 testers over 14 days of closed testing (wait).

## ads-setup

Workbench Games, `com.workbenchsoft.games`. Release builds use the real AdMob app `ca-app-pub-8598703460892343~1509665312`. The "Workbench Games GDPR" message went live on 2026-11-14. Remove ads is built (PR #175), and the `remove_ads` product is active at A$2.99 since 2026-11-17.

## app-audit

- Left: one pnpm version and one workspace for the root, apps/games and apps/edge. It is a tooling migration across 3 lockfiles.
- Left: root astro 7.4.4 has 2 advisories that a static build can't reach. 7.4.7 and up pulls a beta `@emnapi/runtime` that crashes `astro check`, so it waits on a newer `@astrojs/check`.
- Left: TypeScript 7 in apps/games and apps/edge while the stack table pins 6. An org version call.
- Left: memories-mobile/assets/social.png (192 KB) has no link in the repo. It is a served file another site or store listing may use.
- Left: media-organizer/install.ps1 builds the installer URL itself in place of the `url` in latest.json. Both give the same URL today.
- Left: a 12-player telephone chain of full drawings can pass the 2 MB storage value limit. It needs one storage key per entry, a format change.
- Left: telephone fills a reloading player's entry as skipped when everyone online is done. Waiting for them slows the rest, a product call.
- Left: the artist's strokes drawn while the socket is down are lost on reconnect. Replaying them needs a merge with the snapshot.
- Left: the empty-room alarm can delete a room between a socket's accept and its hello, a window of milliseconds. The fix needs the room code inside the Durable Object.
- Left: the games deploy has no smoke check and the browser reports no errors. A monitoring choice.
- Left: the games apps ship Preact, Capacitor, canvas-confetti and Fredoka with no licence notices. A notices page or a file is a choice.
- Left: the hero shader in src/scripts/field.ts ignores WebGL context loss, and runs at full frame rate. Both change the look and need a GPU to check.
- Left: the games Worker sends no CSP. A CSP that lets AdSense in is an ads choice.
- Left: 2 moderate advisories in glob and minimatch via `@capacitor/cli`, dev only, waiting on an upstream release.
- Left: the Today page loads 12 zodiac images at 512 px for 120 px slots (233 KB). Smaller assets change how sharp the "yours" card looks.
- Left: astrology titles past 60 characters, 138 meta descriptions past 160 characters, and square share images under `summary_large_image`. Copy and share look.
- Left: the stack strip in src/components/Marquee.astro pauses only on hover, with no keyboard or touch pause (WCAG 2.2.2). It needs a new control.
- Left: memoire/privacy-policy.md says answers stay on each device, while Sync sends card progress to Firestore. Sync is disclosed, so the wording is a product call.
- Left: tripforge/privacy-policy.md doesn't name the iOS tracking prompt. Waits on the iOS release.
- Left: the Property Trends release tarball is served on the main site origin. The design needs it.
- Left: apps/edge and the unused registry.json fields wait on whether the edge domain stays.
- Left: src/pages/apps/catalog.json.ts still hand-codes the GuitarUp Tuner entry, which belongs in src/data/projects.ts.
- Left: room.ts (482 lines), text.ts and Board.tsx are far past 100 lines, and the root oxlint runs only correctness rules. Tidy only.
- Left: IndexNow needs a key file and calls to an outside service. The games root 302 is on purpose.

## marketing

- [ ] **Reddit posts** both test-for-test posts went out on 2026-11-17 from u/workbench_soft. r/TestersCommunity is live: <https://old.reddit.com/r/TestersCommunity/comments/1xyi3kf/>. The r/AndroidClosedTesting post sits on the account's submitted list but not in the sub, so its spam filter holds it. A modmail asking the moderators to review it went out on 2026-11-18. Check the sub on 2026-11-19 and remove this line once it shows. The r/selfhosted post for Memories stays unposted (wait).
- [ ] **Test back on Reddit** the r/TestersCommunity post promised a same-day swap. u/NumisScanDev-Stathis asked on 2026-11-18: join <https://groups.google.com/g/numisscan-testers> on the phone's Gmail, open <https://play.google.com/apps/testing/com.numisscan.collectorapp>, install NumisScan Collector, keep it 14 days, and reply under the post with a screenshot. Reddit is blocked for the agent (denied).

## header-sites: Sites menu in the header

- [ ] **Alina Photography** once Alina has her own domain, tell an agent the domain. It swaps the Worker address in `clientSites` of `src/data/studio.ts` (wait).

## AdSense for workbench-soft.com

The site has About and Privacy pages in 9 languages. On 2026-11-17 `workbench-soft.com` was added and verified through ads.txt, review was requested, and the "workbench-soft.com GDPR" consent message was published.

- [ ] **Ad units** once AdSense approves the site (wait):
  1. Make 3 display ad units: the article, a games page and a games room.
  2. Open <https://github.com/workbench-soft/workbench-soft.github.io/settings/variables/actions>.
  3. Set `ADSENSE_CLIENT` to `ca-pub-8598703460892343`, then `ADSENSE_SLOT_ARTICLE`, `ADSENSE_SLOT_PAGE` and `ADSENSE_SLOT_ROOM` to the unit IDs.
