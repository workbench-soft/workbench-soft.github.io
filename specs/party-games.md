# Party games at workbenchsoft.com/games

## What it does for the person

- **One link** a person opens `/games/`, presses "Create a room" and sends the
  room link. Friends open the link, type a name and land in the same lobby.
- **Guess the drawing** players take turns. The artist picks one of 3 words
  and draws it. The others type guesses in the chat, and a faster right guess
  earns more points.
- **Drawing telephone** each player writes a phrase. The next player draws it,
  the one after describes the drawing, and so on round the group. At the end
  the host shows each story step by step.
- **Clue duel** two teams share a board of 12 words. Each team's clue giver
  sees 2 secret words and gives a one word clue. Both clues are public, so a
  team may pick the other team's words for a point each.
- **Free** no account, no install, no payment. A banner sits on the content
  pages, in the lobby and on the results screen. The game screens stay clear
  while someone plays.
- **Languages** English and Russian pages and word lists.
- **Apps** one Android app and one iOS app hold all three games, with an
  AdMob banner in the lobby and on the results.

The games take the party game genres, with their own names, rules and look.
They copy no existing product.

## User flows

1. A person opens `/games/` or `/games/ru/` and presses "Create a room".
2. The page makes a 6 letter code and opens `/games/r/<code>`.
3. The room page asks for a name once and keeps it in the browser.
4. The first person in the room is the host. The host picks the game and its
   settings, then presses Start.
5. A game ends on the results screen. The host goes back to the lobby, and the
   same room plays again.

A player who reloads or loses the network comes back to the same seat and
score, since the browser keeps a secret token.

## How it works: modules, files, data

- **Micro frontends at the edge** `apps/edge` is the Worker on
  workbenchsoft.com. `registry.json` maps each top path to the app that owns
  it. `/games` goes to the games Worker through a service binding, and every
  other path goes to the public site on GitHub Pages.
- **Public site** the root files and `memories-mobile/` keep their own build
  in `pages.yml`, as before.
- **Games site** `apps/games` builds static pages with Astro into
  `dist/games/`. The pages ship no JS except the "Create a room" button.
  Preact runs the room app on `/games/room/`.
- **Games Worker** `apps/games/worker/index.ts` serves `dist/`, rewrites
  `/games/r/<code>` to the room page, and passes `/games/ws/<code>` to the
  room's Durable Object.
- **Room object** one Durable Object per room code, with the Hibernation API,
  so an idle room costs no run time. Alarms drive the timers.
- **Game logic** `apps/games/src/server/` holds the rules as plain classes.
  Vitest runs them with a fake clock.
- **Drawing engine** `apps/games/src/shared/canvas.ts` keeps a drawing as a
  list of actions on an 800 by 600 grid. The server and every browser apply
  the same actions, and `src/drawing/` paints them.
- **Storage** the room object writes the room after each change, the drawing
  at most every 2 seconds, and each telephone entry once. 30 minutes after the
  last player leaves, the room deletes its storage.
- **Apps** Capacitor wraps `dist/` for Android and iOS. The apps load the
  pages from local files and open the sockets on workbenchsoft.com.

## Limits

- **Players** 2 to 12 in a room, 4 or more for the clue duel. A player who
  joins mid game waits for the next turn, or the next game in telephone. A
  room keeps 24 seats at most, offline players included.
- **Free plan** Workers Free gives 100,000 requests a day. With hibernation 20
  WebSocket messages count as 1 request. The artist sends points 12 times a
  second, about 40 hours of drawing a day before the limit.
- **Ads** AdSense needs the domain on Google's approval list. Until then the
  slots stay empty and take no space. AdSense stays off inside the apps.
- **iOS** a build needs a Mac or a cloud Mac and the paid Apple developer
  account.

## Launch plan

- **Search** static pages per game and per language, `hreflang` pairs, a
  sitemap, JSON-LD, `noindex` on room pages, a share image. Then Search
  Console and Bing Webmaster Tools through the `seo-setup` skill.
- **Ads** AdSense for the site, AdMob for the apps, both on publisher
  `pub-8598703460892343`, with `ads.txt` and `app-ads.txt` at the domain root.
  The `ads-setup` skill does the dashboards and the consent message.
- **Google Play** package `com.workbenchsoft.games`, through the
  `play-release` skill.
- **App Store** the same bundle id, built on a cloud Mac.
- **Marketing** groups of friends, streamers and teachers who play party games
  online. First channels: Reddit game threads, VK and Telegram groups, a
  Product Hunt launch, through the `marketing` skill.
- **Domain** workbenchsoft.com moves its DNS to Cloudflare, so the edge Worker
  can take the whole domain.

## Changes

### 2026-10-30 First version: three games, edge, apps

- **Why** the owner wants free drawing and word party games on
  workbenchsoft.com/games: a room by link, a guessing game, a telephone game
  on the same drawing engine, a team word game, fast pages that rank, light
  ads, apps on both stores, and no hosting bill.
- **Changes**
  - `apps/games/src/shared/` message types, drawing actions, word helpers.
  - `apps/games/src/server/` the room and the three games, with tests.
  - `apps/games/worker/` the Worker and the room Durable Object.
  - `apps/games/src/drawing/` the canvas painter, flood fill, the board.
  - `apps/games/src/game/` the Preact room app.
  - `apps/games/src/pages/` the landing, game, privacy and about pages.
  - `apps/games/android`, `apps/games/ios` the Capacitor apps with AdMob.
  - `apps/edge/` and `registry.json` the edge Worker for workbenchsoft.com.
  - `.github/workflows/games.yml` checks on pull requests, deploys on main.
- **Steps**
  1. This spec.
  2. The games app with its tests.
  3. The edge Worker and the route registry.
  4. The Android and iOS apps.
  5. Docs, CI, changelog, TODO.
- **Docs** `README.md`, `docs/architecture.md`, `docs/user-flows.md`,
  `docs/features.md`, `CHANGELOG.md`.

### 2026-10-30 Audit fixes: protocol version, seat cap, safer rooms

- **Why** the app audit found rooms a bad message can break, and a socket
  format with no version. The apps ship their own copy of the client, so old
  installs keep talking to each new Worker.
- **Changes**
  - `apps/games/src/shared/protocol.ts` `PROTOCOL` version 1. The client
    sends it in `hello`, and the room object keeps it with the socket. A
    `hello` without it counts as version 1.
  - `apps/games/src/server/room.ts` a room keeps at most 24 seats. A new
    player past that takes the seat of the newest offline player, so the
    players of a running game keep their seats and scores.
  - `apps/games/src/server/` a kick in telephone moves the step on, and a
    pick with a bad index is ignored.
  - `apps/games/worker/room-object.ts` drops a message that isn't an object.
  - The join form and the room page accept only the letters a room code uses.
- **Steps** one commit per fix, each with its test where the code has tests.
- **Docs** `apps/games/docs/architecture.md`, `CHANGELOG.md`.

### 2026-10-31 No ads on the developer's phone

- **Why** the developer wants each Workbench Soft app on their phone without ads, and a way to see the ads too.
- **How** `apps/games/src/game/dev-device.ts` holds the SHA-256 of `WORKBENCH_DEV_KEY`, a key that stays on the developer's PC. `scripts/dev-phone.ts` in the `docs` repo sends `workbenchsoft-dev://unlock?key=…` to the app over adb, and `@capacitor/app` hands it to the page. A matching key hides the banner. `&ads=1` brings Google's test banner, since AdMob bans taps on real ads from the publisher, and `&ads=0` hides it again.
- **Changes**
  - `apps/games/src/game/dev-device.ts` new, with a test.
  - `apps/games/src/game/admob.ts` reads the link, skips the banner on the developer's phone, and picks the test unit there.
  - `apps/games/package.json` gets `@capacitor/app`, and the Android and iOS projects list it.
- **Steps** this entry, then the code with its test, then the docs.
- **Docs** `apps/games/docs/features.md`, `CHANGELOG.md`.
