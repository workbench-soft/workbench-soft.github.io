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
