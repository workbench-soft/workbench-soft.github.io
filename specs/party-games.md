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
- **Kids mode** on by default, so a child who can't read or type still
  plays. A tap on an animal joins the room. Each word has a picture and a
  speaker button that reads it aloud. Guessers tap one of 4 pictures in place
  of typing. Timers show as a shrinking circle, and a right guess plays a
  sound with confetti. The host turns it off under "For little ones" in the
  lobby.
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
3. The room page shows a row of animals. A tap on one joins, and the browser
   keeps the pick. A name is optional.
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
- **How** `apps/games/src/game/dev-device.ts` holds the SHA-256 of `WORKBENCH_DEV_KEY`, a key that stays on the developer's PC. `scripts/dev-phone.ts` in the `workspace` repo sends `workbenchsoft-dev://unlock?key=…` to the app over adb, and `@capacitor/app` hands it to the page. A matching key hides the banner. `&ads=1` brings Google's test banner, since AdMob bans taps on real ads from the publisher, and `&ads=0` hides it again.
- **Changes**
  - `apps/games/src/game/dev-device.ts` new, with a test.
  - `apps/games/src/game/admob.ts` reads the link, skips the banner on the developer's phone, and picks the test unit there.
  - `apps/games/package.json` gets `@capacitor/app`, and the Android and iOS projects list it.
- **Steps** this entry, then the code with its test, then the docs.
- **Docs** `apps/games/docs/features.md`, `CHANGELOG.md`.

### 2026-11-02 Move the games to games.workbench-soft.com

- **Why** the games never deployed: the repo has no Cloudflare token, and
  workbenchsoft.com sits on Bluehost with no site. The studio domain
  `workbench-soft.com` already sits on Cloudflare, so the games move there.
- **How** the games Worker gets its own custom domain,
  `games.workbench-soft.com`. Cloudflare makes that record and its
  certificate on deploy. The apex keeps its grey cloud records to GitHub
  Pages, so GitHub still issues the site certificate. The root of the
  subdomain already redirects to `/games/`.
- **Edge** `apps/edge` stays in the repo, undeployed. It would need the
  Cloudflare proxy on the apex, which `docs/architecture.md` rejects.
- **Changes**
  - `apps/games/wrangler.jsonc` the custom domain route.
  - `apps/games/src/shared/paths.ts`, `astro.config.mjs` the default site
    `https://games.workbench-soft.com`. The tests follow.
  - `apps/games/src/site/info.ts` the contact address is the studio's.
  - `.github/workflows/games.yml` deploys the games once the token exists.
    The edge step waits for `EDGE_ENABLED`, as before.
  - `robots.txt` names the games sitemap on the new host.
  - The home page links the games from its projects.
- **Steps** this entry, then the domain, then the link, then the docs.
- **Docs** `README.md`, `apps/games/README.md`, `apps/games/docs/`,
  `apps/edge/README.md`, `docs/architecture.md`, `CHANGELOG.md`, `TODO.md`.

### 2026-11-02 Show test ads switch on the developer's phone

- **Why** the developer wants to hide and show the ads right in the app, as
  the other Workbench Soft apps do. Until now only `mise run dev-phone --
  --ads on` could bring the test banner back.
- **How** the lobby gets a "Show test ads" box, only in the app and only on a
  phone that got the developer key. The same rules as before decide who sees
  it: the key link of `dev-phone` marks the phone. Ticking the box shows
  Google's test banner, clearing it hides the banner. The link's `&ads=1` and
  `&ads=0` still set it.
- **Changes**
  - `apps/games/src/game/dev-device.ts` keeps both flags in signals, so the
    box and the banner follow a link that lands while the app runs.
  - `apps/games/src/game/admob.ts` gets `setDevAdsShown`, which saves the
    choice and brings the banner back or drops it.
  - `apps/games/src/game/Lobby.tsx` shows the box under the settings.
  - `apps/games/src/game/i18n.ts` the label in English and Russian.
- **Steps** this entry, then the code with its test, then the docs.
- **Docs** `apps/games/docs/features.md`, `CHANGELOG.md`.

### 2026-11-02 Kids mode: simple enough for a toddler

- **Why** the owner wants every game simple and clear even for a small child.
  A UX audit on a 390 px phone found that all three games need reading and
  typing: the name to join, guesses in the chat, phrases and clues. The lobby
  puts Start below 9 settings, the timers are bare numbers, the colors are
  26 px, the trash wipes the drawing in one tap, and the logo, the language
  button and Remove leave or kick in one tap.
- **How** a room setting `kids`, on by default and shown at the top of the
  lobby as "For little ones".
  - **Join** a grid of 12 animals. A tap joins at once. The name field is
    optional, and an empty name takes the animal's name. The animal shows as
    the avatar.
  - **Words** kids mode draws from a list of words that each have an emoji,
    in English and Russian, without the host's own words. The artist sees the emoji next to each choice and
    a speaker button that reads the word with the browser's speech.
  - **Guessing** in kids mode each guesser gets 4 picture cards, the word and
    3 others. A tap guesses. A wrong card greys out and costs 100 points of
    that guess. Typing in the chat still works.
  - **Time** kids mode gives 30 s to pick and 120 s to draw, with no letter
    hints. Every timer becomes a circle that empties, with the number inside
    only outside kids mode.
  - **Joy** a right guess plays a short chime and confetti for the guesser.
    The turn end shows stars in kids mode in place of points, and the
    results give the top three a cup and two medals.
    The turn end panel sits low and see through, so the drawing stays in
    sight.
  - **Lobby** one big Play button at the top of the game card. Each game card
    gets a picture and a three-step "How to play" row with a speaker button.
    The other settings fold under "Settings". Guests see a large waiting
    message.
  - **Drawing** 12 colors at 40 px, 3 sizes, 48 px tool buttons. The trash
    asks for a second tap within 3 seconds.
  - **Voice** chat, telephone and duel text fields get a microphone button
    where the browser has speech recognition.
  - **Safety** the logo asks before it leaves a running room, the language
    button shows only in the lobby, and Remove asks before it kicks.
  - **Telephone** the album says "wrote", "drew", "described" in the past
    tense, and the step counter stays on one line.
  - **Clue duel** the card says "8+", and secret words get a thick border and
    a star, so color alone doesn't carry them.
  - **Home** each game card shows a big picture.
- **Protocol** `kids` joins the settings, `avatar` joins `hello` and the
  player view, `options` and `wrong` join the guess view, and `tap` is a
  new client message. All are optional, so old app installs keep working and
  type their guesses. `PROTOCOL` stays 1.
- **Changes**
  - `apps/games/src/words/kids.ts` the picture words.
  - `apps/games/src/shared/` the protocol fields, the avatar list.
  - `apps/games/src/server/guess.ts`, `room.ts` kids words, times, tap
    guesses, avatars, with tests.
  - `apps/games/src/game/` join grid, lobby, timer, guess cards, confetti,
    speech, microphone, confirmations, telephone and duel fixes.
  - `apps/games/src/drawing/Board.tsx` the toolbar.
  - `apps/games/src/styles/global.css` sizes and the new parts.
  - `apps/games/src/components/Home.astro` game pictures.
- **Steps** this entry, then the server with tests, then the room app, then
  the docs.
- **Docs** `apps/games/docs/features.md`, `apps/games/docs/user-flows.md`,
  `CHANGELOG.md`.
