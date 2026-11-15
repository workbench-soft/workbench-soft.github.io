import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Astro builds static pages, and a Preact app runs the room in the browser. One Cloudflare Worker serves the pages and gives each room its own Durable Object.',
  parts: [
    { name: 'Astro', role: 'the landing, game and info pages as static HTML for search engines.' },
    { name: 'Preact', role: 'the room app with the lobby, the games and the chat.' },
    { name: 'Cloudflare Worker', role: 'serves the pages and opens the WebSocket of each room.' },
    {
      name: 'Durable Objects',
      role: 'one object per room code keeps the state in its SQLite storage and runs the timers.',
    },
    {
      name: 'Game rules in TypeScript',
      role: 'plain classes for the room and the 3 games, tested apart from Cloudflare.',
    },
    { name: 'Shared canvas module', role: 'keeps a drawing as a list of actions on an 800 by 600 grid.' },
    { name: 'Capacitor', role: 'wraps the same pages into the Android and iOS apps with an AdMob banner.' },
  ],
  flow: [
    'The host creates a room and sends the link.',
    "Each player opens a WebSocket to the room's Durable Object.",
    'The room runs the game rules and sends the state to each player.',
    'Drawings travel as small actions every 80 ms.',
    'Alarms end each turn, and the room clears 30 minutes after it empties.',
  ],
  links: [
    { to: 'Cloudflare', text: 'Workers Free hosts the pages and the rooms.' },
    { to: 'Google AdSense', text: 'AdSense shows the banner on the website.' },
    { to: 'Google AdMob', text: 'AdMob shows the banner in the Android and iOS apps.' },
  ],
  design: {
    scale: [
      'A room holds up to 12 players, and the clue duel needs at least 4.',
      'Workers Free gives 100,000 requests a day, about 40 hours of drawing a day.',
      'A message caps at 256 KB, and a drawing at 3000 actions.',
    ],
    data: [
      'Each room is a Durable Object with its own SQLite storage and 3 kinds of key: meta, canvas and chain:N.',
      'meta holds the players, scores, settings, phase, chat and game state after each change. canvas saves at most every 2 seconds.',
      'A drawing is a list of actions on an 800 by 600 grid. The browser keeps a token and settings under keys that start with wg-.',
    ],
    interfaces: [
      'One WebSocket per player at /games/ws/CODE. The Worker maps the code with idFromName to the room object.',
      'The first message, hello, carries the protocol version, the token, the name and the color. After it come state, chat and draw messages.',
      'The Android and iOS apps open the same sockets on the games Worker. An Origin check lets the site and the apps in.',
    ],
    reliability: [
      'The Hibernation API lets an idle room leave memory, and a socket message or an alarm wakes it from storage.',
      'Alarms drive each deadline and clear a room 30 minutes after it empties.',
      'A PROTOCOL number lets the Worker answer an old app in its own format. A player who drops keeps a seat until the room fills at 24 seats.',
    ],
    security: [
      'No account. The browser keeps a random token, and the room stores its hash as the player id.',
      'The room object picks the word and checks each guess, so the answer stays on the server.',
      'Sockets from other sites are turned down. Names cap at 20 characters, chat lines at 100.',
    ],
    performance: [
      'Drawing travels as small action lists every 80 ms, not as pixels.',
      'With hibernation, 20 WebSocket messages count as 1 request.',
      'Static pages are free to serve, since run_worker_first sends only room links and sockets through Worker code.',
    ],
    operations: [
      'One Worker deploys with wrangler: the static dist/ folder plus the room object. The Games workflow deploys on each push to main.',
      'mise run check runs oxlint, the type check and Vitest on the rules of each game.',
      'Worker observability is on. The Android app ships through Google Play closed testing.',
    ],
    tradeoffs: [
      'Durable Objects with hibernation over Supabase Realtime, PartyKit or a VPS, so no server and a free tier. The room code is written for Cloudflare.',
      'Astro static pages with a Preact island over a Preact single page app, so search engines get full HTML.',
      'Drawing actions on a fixed grid over pixels, so messages stay small and undo is one step.',
      'Capacitor over a Trusted Web Activity or React Native, so the same pages run in the apps with a native AdMob banner.',
    ],
  },
  features: {
    'Rooms by link':
      'The Worker maps each room code to its own Durable Object. A random token in the browser stands for the player, and the room keeps only its hash.',
    'Kids mode':
      "The browser's speech engine reads each word aloud. The kids word list pairs 80 words with a picture in each of the 9 languages.",
    'Guess the drawing':
      'The room object picks the word and checks each guess on the server. Alarms end each turn, and the score follows the guess speed.',
    'Drawing telephone':
      'The room passes each phrase and drawing to the next player on a timer. Each story lands in the room storage for the album.',
    'Clue duel':
      'The room deals a shared board of 12 words and 2 secret words per team. The server scores own words and stolen words apart.',
    'Drawing tools':
      'The canvas painter turns each stroke into actions on a fixed grid. The room sends them to the other players every 80 ms, and undo drops the last action.',
    Languages:
      'The room app holds its text in 9 locale files, and the word lists come in 9 languages. Astro builds the pages in English and Russian.',
    Ads: 'AdSense places the banner on the website pages. In the apps the AdMob plugin for Capacitor shows it, after the consent form where the law asks.',
    'Android and iOS apps':
      'Capacitor wraps the built pages into native apps that load them from local files. The apps open their sockets on the games Worker.',
    'Party look':
      'Shared CSS sets the night glow, the light pastels and a colour per game. The motion stops under the reduced motion setting.',
  },
};

export default arch;
