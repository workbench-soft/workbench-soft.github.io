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
- [ ] Merge with `feat/portfolio-site`, which edits the same `README.md` and `CHANGELOG.md`.
