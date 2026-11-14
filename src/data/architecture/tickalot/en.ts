import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'One Expo app runs on Android and the web and keeps each list in SQLite on the device. A shared list also goes to Firestore, and the app has no server of its own.',
  parts: [
    {
      name: 'Expo and React Native',
      role: 'one code base for the Android app and the website, which Firebase Hosting serves.',
    },
    { name: 'SQLite', role: 'each list and item on the device through expo-sqlite, on wasm in the browser.' },
    { name: 'Firestore', role: 'the shared lists, the shop aisles and the shop walks, behind an anonymous sign in.' },
    {
      name: 'Phrase parser and emoji dictionary',
      role: 'rules on the phone that split a phrase into items and pick each emoji and section.',
    },
    { name: 'OpenStreetMap', role: 'the shop search, and the shop the phone stands in.' },
    {
      name: 'Wikipedia and Wikidata',
      role: 'the town and its sights, read through the Tripforge Worker when it answers.',
    },
    { name: 'Coles and Woolworths', role: "the unit prices, read from the search behind each shop's site." },
    { name: 'Google Play', role: 'AdMob ads, and the Remove ads and Pro purchases through expo-iap.' },
  ],
  flow: [
    'The person types or says the items, and the parser splits them.',
    'The phone saves each item in SQLite at once.',
    'Share sends the list to Firestore and opens a link.',
    'The other phone opens the link and follows the list in Firestore.',
    'A tick on one phone shows on the other within a second or two.',
  ],
  links: [
    {
      to: 'tripforge',
      text: 'A trip link from Tripforge makes a sights list and a packing list. A sights list links back to plan the flights.',
    },
    { to: 'guitar-upscale', text: 'A song in Songs to learn opens in Guitar Upscale to play along.' },
    { to: 'Firebase', text: 'Firestore syncs the shared lists, and Hosting serves the website.' },
    { to: 'OpenStreetMap', text: 'Nominatim finds a shop by name, and Overpass finds the shop nearby.' },
    { to: 'Google Play', text: 'AdMob shows the ads, and Play Billing sells Remove ads and Pro.' },
  ],
  features: {
    'Share by link':
      'Firestore holds a copy of each shared list, and the link carries its random id. Each phone saves a change in SQLite first and pushes it when the network is back.',
    'Base list':
      'A list made from a base copies each base item and remembers which one it follows. A change to the base reaches the copies the person left as they were.',
    'Typing and dictating':
      "A rule based parser on the phone splits the phrase by the emoji dictionary and the numbers. expo-speech-recognition turns speech into text through the phone's speech service.",
    Pictures:
      'A dictionary inside the app maps the name to an emoji and a section, in English and Russian. A photo shrinks to a small JPEG that travels inside the item.',
    'The store and the walk through it':
      'Overpass and Nominatim from OpenStreetMap find the shop. The app learns the order of the sections from the ticks and keeps it in SQLite.',
    'Shared aisles':
      "Aisles and walks sit in Firestore under the shop's OpenStreetMap id. Each phone that picks the shop reads them, and a typed aisle goes up at once.",
    'Prices at Coles and Woolworths':
      "The phone reads the search behind each shop's site and keeps the first product for a day in SQLite. The cheaper unit price shows in green.",
    'Packing for a trip':
      'A packing list is a copy of a base packing list in SQLite. Sharing it goes through Firestore like any list.',
    'Things to see':
      'The town comes from Wikipedia and its places from the Tripforge Worker or Wikidata. A k-means step on the phone spreads them over the days.',
    'Lists that are done':
      'A timer on the phone moves a list to the archive 3 hours after the last tick, or after 2 weeks with no change.',
    'Light and dark':
      'The theme follows the phone through React Native, or a pick in Settings that stays on the device.',
    Updates:
      'The GitHub build asks GitHub releases for a newer APK and opens the Android installer. The Google Play build leaves this module out.',
    Ads: "AdMob shows the banners and the full screen ad after Google's consent form. Google Play Billing sells the Remove ads purchase.",
    'Tick-a-Lot Pro':
      'Google Play Billing sells Pro through expo-iap, and the app asks Play again on each start. One module decides each lock.',
    'The weekly shop for two':
      'One phone builds the list from a base and shares it through Firestore. The other ticks it, and each tick syncs back within seconds.',
    'Songs to learn':
      'A song parser splits the text at commas only. Each song gets search links to Guitar Upscale and to chord, tab and video sites.',
    'Changing and deleting':
      'Each field writes to SQLite when the person leaves it. A delete only marks the row, so Undo and the other phone both work.',
    Languages:
      'i18next holds the 9 catalogs, and expo-localization reads the phone language. The list text itself stays as typed.',
    'Finding Tick-a-Lot in search':
      "A build script writes the guides, About and the sitemap as plain HTML after the Expo export. The app pages carry noindex, since they show a person's lists.",
    'Open source licences':
      'A build task collects the licence text of each package into a file inside the app. The Settings screen lists them from that file.',
    'Long lists':
      'The studio’s fast-scroll package wraps each long list. The list follows the dragged thumb once per frame, and a hidden thumb lets taps through.',
  },
};

export default arch;
