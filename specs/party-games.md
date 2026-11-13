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
- **Languages** English and Russian pages. The room, word lists and voice in 9 languages.
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

### 2026-11-03 Real AdMob IDs in the Android app

- **Why** the AdMob app "Workbench Games" and its banner "Games lobby banner"
  now exist on publisher `pub-8598703460892343`. Store builds still showed
  Google's test ads.
- **How** the IDs are public, so they sit in the code as defaults. A release
  build of the Android app gets the real App ID
  `ca-app-pub-8598703460892343~1509665312` and the real banner
  `ca-app-pub-8598703460892343/4481644716`. A debug build gets Google's test
  App ID and test banner. The page reads the build type from
  `window.Capacitor.DEBUG`, which Capacitor sets for a debuggable build. The
  developer's phone keeps the test banner in every build. iOS stays on
  Google's test IDs until it has its own AdMob app.
- **Override** `-PadmobAppId` and `PUBLIC_ADMOB_BANNER_ANDROID` still win
  over the defaults.
- **Changes**
  - `apps/games/android/app/build.gradle` the real App ID for release, the
    test one for debug.
  - `apps/games/src/game/ad-unit.ts` new, picks the banner unit, with a test.
  - `apps/games/src/game/admob.ts` uses it.
  - `apps/games/android/app/src/main/AndroidManifest.xml` the comment.
- **Left** a `remove_ads` purchase like the other studio apps, the GDPR
  message, the Play declarations and AdSense for the site, in `TODO.md`.
- **Steps** this entry, then the code with its test, then the docs.
- **Docs** `apps/games/README.md`, `apps/games/docs/features.md`,
  `CHANGELOG.md`, `TODO.md`.

### 2026-11-10 Join screen for all, language, room link, clearer points

- **Why** the owner found that the host skips the animal and the name: a
  browser that joined once goes straight into the lobby. The language sits as
  a bare EN/RU button, the room link shows only in the lobby, and the points
  of guess the drawing read as random.
- **Join** each person who opens a room in a new tab sees the join screen,
  the host too. It shows the saved animal picked and the saved name filled
  in, a language picker, and a Join button. A tap on an animal still joins
  at once. A reload in the same tab goes straight back in.
- **Change** the own row in the lobby gets a Change button. It opens the
  join screen again, and Join sends a new `profile` message with the name and
  the animal. The message is optional, so old app installs keep working.
- **Language** a picker with English and Русский on the join screen and in
  the header. A new room takes the host's language for its words, as before.
  The other 7 languages of the studio need word lists and stay a follow-up.
- **Link** the header shows a copy link button in every phase, so the host
  alone in a room, and every player in a game, can send it at once.
- **Points** a right guess earns 50 to 300 by speed, times a length factor:
  0.9 for 3 letters, 1.0 for 5, up 0.05 a letter to 1.3 at 11 or more. The
  artist earns the average of the guessers' points times the share of
  players who guessed, so a fast guess by everyone pays the artist the most.
  A wrong picture in kids mode still costs 100. The lobby shows these rules
  in one line under "How to play".
- **Changes**
  - `apps/games/src/server/guess.ts` the new points, with tests.
  - `apps/games/src/server/room.ts`, `shared/protocol.ts` the `profile`
    message.
  - `apps/games/src/game/` the join screen, the language picker, the header
    link, the Change button, the points line, in English and Russian.
- **Steps** this entry, then the server with tests, then the room app, then
  the docs.
- **Docs** `apps/games/docs/features.md`, `apps/games/docs/user-flows.md`,
  `CHANGELOG.md`.

### 2026-11-10 A party look for all three games

- **Why** the owner wants the games to look as if a top designer drew them,
  catchy enough to take the breath away, in all three games.
- **How** a "party night" look over the same markup:
  - **Scene** a deep night background with slow colored glows in dark mode,
    a candy pastel one in light mode. Cards float as frosted glass with a
    thin gradient rim.
  - **Type** Fredoka, a round display face, for headings, buttons and the
    word, from `@fontsource-variable/fredoka` in the bundle, so the apps
    work offline. The body keeps the system face for speed.
  - **Colour per game** guess the drawing glows pink to orange, drawing
    telephone teal to blue, clue duel violet to red. The home cards, the
    lobby game buttons and the play bar take the game's colors.
  - **Buttons** chunky with a pressed edge that sinks on tap, a shine that
    sweeps the Play button, and a soft glow on focus.
  - **Motion** the game pictures bob, cards rise on hover, the right guess
    pops. Everything stops under reduced motion.
- **Library** `@fontsource-variable/fredoka`, since the `stack` skill names
  no font package. It is free under the OFL.
- **Changes**
  - `apps/games/src/styles/look.css` new, loaded after `global.css`.
  - `apps/games/src/layouts/Page.astro`, `src/pages/room.astro` load it.
  - `apps/games/src/game/` a `data-game` mark on the room for the colors.
  - `apps/games/package.json` the font.
- **Steps** this entry, then the look, checked on the home page, the join
  screen, the lobby and each game at 390 px and on desktop, then the docs.
- **Docs** `apps/games/docs/features.md`, `CHANGELOG.md`.

### 2026-11-11 Seven more languages in the games

- **Why** the studio ships every app in 9 languages. The games had only
  English and Russian, so a German or Japanese family read and drew in a
  language they don't speak.
- **How** the games screens, the word lists, the kids picture words, the
  telephone starting phrases, the animal names and the voice now come in
  `en`, `ru`, `de`, `fr`, `es`, `zh`, `ja`, `ko` and `nb`. The join screen
  picker and the lobby word language list show all 9. A browser in one of
  them starts in it. The static pages stay in English and Russian, so a new
  language links to the English home.
- **Changes**
  - `apps/games/src/shared/protocol.ts` `LANGS`, `Lang` with 9 codes,
    `isLang`, `LANG_NAMES` and `SiteLang` for the 2 page languages.
  - `apps/games/src/site/` takes `SiteLang`.
  - `apps/games/src/game/locales/` one catalog per new language.
  - `apps/games/src/words/` a word list and starting phrases per language,
    the kids words and animal names in each.
  - `apps/games/src/server/room.ts`, `worker/room-object.ts` accept each code.
  - A test checks each language has its words, phrases and kids words.
- **Steps** this entry, then the code, then `mise run check`, then the docs.
- **Docs** `apps/games/docs/features.md`, `CHANGELOG.md`.

### 2026-11-11 Shape tools: line, rectangle, circle

- **Why** the owner asked for shape tools in the drawing games. A straight
  line or a round sun is hard to draw by hand, most of all for a child.
- **How** the artist picks Line, Rectangle or Circle next to the pen and drags
  from one corner to the other. A preview follows the finger. On release
  the shape lands as one ordinary stroke in the pen colour and size, so fill,
  undo and the server work on it as on any line. A circle or a rectangle is
  closed, so the fill paints its inside. The others see the shape when the
  finger lifts.
- **Changes**
  - `apps/games/src/drawing/shapes.ts` turns a drag into the grid points of
    each shape, with a test.
  - `apps/games/src/drawing/Board.tsx` the 3 shape buttons, the drag and a
    preview canvas over the board.
  - `apps/games/src/styles/global.css` the preview canvas sits over the board.
  - `apps/games/src/game/i18n.ts`, `locales/` the 3 button names in 9
    languages.
- **Limits** no protocol change, so an old app sees each shape as a stroke.
- **Steps** this entry, then the code, then `mise run check`, then the docs.
- **Docs** `apps/games/docs/features.md`, `apps/games/docs/user-flows.md`,
  `CHANGELOG.md`.

### 2026-11-13 Plan: a Remove ads purchase

- **Why** the other studio apps sell `remove_ads` once, and the games show a
  banner with no way to drop it. The Play app now exists on closed testing.
- **Product** a one-time in-app product `remove_ads` in Play Console,
  Monetize, In-app products, at the price of the Tickalot one. The key
  matches `tickalot/src/ads/play-purchase.ts`.
- **Plugin** `@capgo/native-purchases`, a maintained Capacitor plugin for
  Play Billing and StoreKit, in place of the `expo-iap` Tickalot uses.
- **Flow** the lobby shows a "Remove ads" chip beside the banner. A tap
  starts the Play purchase. A bought or restored `remove_ads` saves a flag in
  `storage.ts`, hides the banner and skips the AdMob start in `admob.ts`. The
  app restores purchases at launch. The web build shows no chip.
- **Changes** `apps/games/src/game/purchase.ts` new, with a test,
  `apps/games/src/game/admob.ts`, `Lobby.tsx`, the 9 catalogs in
  `apps/games/src/game/locales/` and `i18n.ts`.
- **Left** the product in Play Console needs the person, and the build waits
  for it. `TODO.md` holds both steps.
