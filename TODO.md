# TODO

## feat/games: party games at workbenchsoft.com/games

Accounts and purchases, in this order:

- [ ] Find out who holds workbenchsoft.com. Its DNS sits on Bluehost (ns1.bluehost.com) and it serves no site. If it is yours, log in at https://my.bluehost.com. If not, pick a free domain and buy it at https://dash.cloudflare.com/?to=/:account/domains/register (about 10 USD a year).
- [ ] Make a free Cloudflare account at https://dash.cloudflare.com/sign-up, add the site workbenchsoft.com on the Free plan, and put the 2 Cloudflare nameservers into the domain at Bluehost.
- [ ] Make a Cloudflare API token with the "Edit Cloudflare Workers" template at https://dash.cloudflare.com/profile/api-tokens. Add it as the repo secret `CLOUDFLARE_API_TOKEN`, and the account id as the repo variable `CLOUDFLARE_ACCOUNT_ID`, at https://github.com/workbench-soft/workbench-soft.github.io/settings/secrets/actions.
- [ ] Once the DNS sits on Cloudflare, set the repo variable `EDGE_ENABLED` to `true` and run the Games workflow by hand.
- [ ] Forward hello@workbenchsoft.com to your inbox with Cloudflare Email Routing (free). The privacy and about pages name that address.
- [ ] Apply for AdSense at https://adsense.google.com with workbenchsoft.com. After approval make 2 display units and set the repo variables `ADSENSE_CLIENT`, `ADSENSE_SLOT_PAGE`, `ADSENSE_SLOT_ROOM`. Publish the consent message under Privacy and messaging.
- [ ] Add the Android and the iOS app "Workbench Games" at https://apps.admob.com with a banner unit each. Put the Android app id into the Gradle property `admobAppId`, the iOS app id into `GADApplicationIdentifier` in `apps/games/ios/App/App/Info.plist`, and the units into `PUBLIC_ADMOB_BANNER_ANDROID` and `PUBLIC_ADMOB_BANNER_IOS`.
- [ ] Open a Google Play developer account at https://play.google.com/console/signup (25 USD once), then run the `play-release` skill for `com.workbenchsoft.games`.
- [ ] Join the Apple Developer Program at https://developer.apple.com/programs/enroll/ (99 USD a year). Without a Mac, build the iOS app on Codemagic, whose free plan gives 500 macOS minutes a month: https://codemagic.io/signup.
- [ ] Add workbenchsoft.com to Google Search Console at https://search.google.com/search-console and to Bing at https://www.bing.com/webmasters, then submit `https://workbenchsoft.com/games/sitemap-index.xml`. The `seo-setup` skill walks through it.

Work left in the code:

- [ ] Test the Android app on a phone: the pages under `/games/` load from local files, the room connects to workbenchsoft.com, the banner shows in the lobby.
- [ ] Open room links in the apps: Android App Links with `/.well-known/assetlinks.json` and iOS Universal Links with `apple-app-site-association`, once the signing keys exist.

## app-audit

- [ ] Check that the first Pages run on main after the audit PR deploys https://workbench-soft.github.io (pages.yml now pins actions and splits permissions per job).
- [ ] Try a room in the Android and iOS apps once they build: a mistyped code shows "This room link is broken", and the room reconnects after the phone sleeps.
- Left: self-host the Google Fonts of the home page. It saves a third-party request and an IP sent to Google, and adds font files plus a design check.
- Left: one pnpm version and one workspace for the root, apps/games and apps/edge. It is a tooling migration across 3 lockfiles.
- Left: memories-mobile/assets/social.png (192 KB) has no link in the repo. It is a served file another site or store listing may use.
- Left: media-organizer/install.ps1 builds the installer URL itself in place of the `url` in latest.json. Both give the same URL today.

## marketing

- [ ] Post the Reddit drafts you like from Reddit Desk, Posts tab: r/selfhosted for Memories, and the 2 test-for-test posts. On r/selfhosted a bot asks how AI was involved; reply to it and the post goes live.
- [ ] Open https://search.google.com/search-console for workbench-soft.github.io and request indexing of https://workbench-soft.github.io/langflip/ and https://workbench-soft.github.io/sitemap-index.xml.
- [ ] Give the Langflip page a 1200×630 image at `langflip/og.png` and link it as `og:image`, so a shared link shows a picture.

## custom-domain: the site at workbench-soft.com

- [ ] In Google Play Console, set the developer website of each app with ads to `https://workbench-soft.com` (Store presence, Store settings, Contact details). AdMob reads `app-ads.txt` there, and its crawler may refuse the redirect from workbench-soft.github.io.
- [ ] Add `https://workbench-soft.com` as a property in Google Search Console at https://search.google.com/search-console and submit `https://workbench-soft.com/sitemap-index.xml`. Keep the old property, so Google sees the move.
- [ ] Verify workbench-soft.com for the org at https://github.com/organizations/workbench-soft/settings/pages: GitHub shows a TXT record to add in Cloudflare DNS. It stops other accounts from taking the domain on Pages.
