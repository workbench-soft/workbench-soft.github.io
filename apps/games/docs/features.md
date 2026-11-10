# Features

## Party look

- **For the person** the site and the room glow like a party at night, or in candy pastels in light mode, with frosted cards, round Fredoka type and a colour per game: pink to orange, teal to blue, violet to red.
- **Where** every page and each game screen.
- **Limits** the glows and the bobbing pictures stop under reduced motion.

## Rooms by link

- **For the person** one link brings friends into the same room, with no account.
- **Where** "Create a room" on `/games/` and on each game page. The lobby has Copy and Share, and the room code in the header copies the link in every phase.
- **Join** everyone who opens a room in a new tab, the host too, picks an animal, types a name if they like and picks the language. Change in the lobby opens it again.
- **Limits** 2 to 12 players. A room forgets everything 30 minutes after the last player leaves.

Spec: [party-games](../../../specs/party-games.md).

## Kids mode

- **For the person** a child who can't read or type still plays. A tap on an animal joins, words come with a picture and a speaker button, guessers tap 1 of 4 pictures, timers are rings that empty, and a right guess plays a chime with confetti and stars.
- **Where** "For little ones" in the lobby, on by default. The microphone beside the text fields and the "How to play" pictures show in both modes.
- **Limits** picture words exist for guess the drawing only, 80 in each of the 9 languages. Kids mode guess skips the host's own words. Speech and the microphone need the browser's support, and the microphone hides where it is missing.

Spec: [party-games](../../../specs/party-games.md).

## Guess the drawing

- **For the person** draw a word, guess the others' drawings, race for points. A guess earns 50 to 300 by speed, a little more for a longer word. The artist earns the guessers' points split over all guessers, so a fast guess by everyone pays most.
- **Where** the first game in the lobby.
- **Limits** word lists in English, Russian, German, French, Spanish, Chinese, Japanese, Korean and Norwegian. The host can add words, and with 12 or more use only those.

Spec: [party-games](../../../specs/party-games.md).

## Drawing telephone

- **For the person** a phrase turns into drawings and back, and the album shows how it changed.
- **Where** the second game in the lobby.
- **Limits** no score. A player who joins mid game watches until the next one.

Spec: [party-games](../../../specs/party-games.md).

## Clue duel

- **For the person** a team word game where every clue is public and stealing pays.
- **Where** the third game in the lobby.
- **Limits** 4 players or more, in two teams.

Spec: [party-games](../../../specs/party-games.md).

## Drawing tools

- **For the person** pen, eraser, fill, 20 colors and 4 sizes, or 12 big colors and 3 sizes in kids mode, undo with Ctrl+Z, clear on a second tap.
- **Where** under the canvas when it is your turn to draw.
- **Limits** a drawing holds up to 40,000 points.

Spec: [party-games](../../../specs/party-games.md).

## Languages

- **For the person** the room, the words and the voice work in English, Russian, German, French, Spanish, Chinese, Japanese, Korean and Norwegian. The pages read in English and Russian, and a browser in another of the 9 starts the room in its own language.
- **Where** the language link in the header, and the language picker in the room, on the join screen and in the lobby.

Spec: [party-games](../../../specs/party-games.md).

## Ads

- **For the person** the games stay free. A banner sits on the content pages, in the lobby and on the results.
- **Where** AdSense on the site, AdMob in the apps.
- **Units** a release build of the Android app shows the banner "Games lobby banner" of the AdMob app "Workbench Games". Debug builds and the iOS app show Google's test banner.
- **Limits** no ad shows while someone draws or guesses.
- **Developer's phone** the apps hide the banner on a phone that got the developer key from `mise run dev-phone` in the `workspace` repo. There the lobby shows "Show test ads (developer phone)": ticked, Google's test banner comes back, cleared, it hides again. `--ads on` and `--ads off` set the same box.

Spec: [party-games](../../../specs/party-games.md).

## Android and iOS apps

- **For the person** the same games as an installed app.
- **Where** Google Play and the App Store, once published.
- **Limits** the apps need the network to reach the rooms.

Spec: [party-games](../../../specs/party-games.md).
