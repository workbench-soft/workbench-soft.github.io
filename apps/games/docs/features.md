# Features

## Rooms by link

- **For the person** one link brings friends into the same room, with no account.
- **Where** "Create a room" on `/games/` and on each game page. The lobby has Copy and Share.
- **Limits** 2 to 12 players. A room forgets everything 30 minutes after the last player leaves.

Spec: [party-games](../../../specs/party-games.md).

## Guess the drawing

- **For the person** draw a word, guess the others' drawings, race for points.
- **Where** the first game in the lobby.
- **Limits** English and Russian word lists. The host can add words, and with 12 or more use only those.

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

- **For the person** pen, eraser, fill, 20 colors, 4 sizes, undo with Ctrl+Z, clear.
- **Where** under the canvas when it is your turn to draw.
- **Limits** a drawing holds up to 40,000 points.

Spec: [party-games](../../../specs/party-games.md).

## Languages

- **For the person** every page and the room work in English and Russian.
- **Where** the language link in the header, and the EN/RU button in the room.

Spec: [party-games](../../../specs/party-games.md).

## Ads

- **For the person** the games stay free. A banner sits on the content pages, in the lobby and on the results.
- **Where** AdSense on the site, AdMob in the apps.
- **Limits** no ad shows while someone draws or guesses.
- **Developer's phone** the apps hide the banner on a phone that got the developer key from `mise run dev-phone` in the `workspace` repo. `--ads on` brings Google's test banner, `--ads off` hides it again.

Spec: [party-games](../../../specs/party-games.md).

## Android and iOS apps

- **For the person** the same games as an installed app.
- **Where** Google Play and the App Store, once published.
- **Limits** the apps need the network to reach the rooms.

Spec: [party-games](../../../specs/party-games.md).
