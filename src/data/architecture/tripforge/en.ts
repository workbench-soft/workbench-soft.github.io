import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'An Expo app for Android and the web calls one Rust Worker on Cloudflare. The Worker makes each outside call and keeps the keys, and a Rust crate holds the trip logic.',
  parts: [
    {
      name: 'Expo and React Native',
      role: 'one code base for the Android app and the website, through react-native-web.',
    },
    { name: 'Rust Worker', role: 'the routes for places, flights, sights and spots, each behind the Workers cache.' },
    {
      name: 'trip-core',
      role: 'the Rust crate with the date windows, the fares for the group, the fare calendar and the spot tags.',
    },
    { name: 'Travelpayouts', role: 'the fares, and the partner links to Aviasales.' },
    { name: 'Wikivoyage and Wikidata', role: 'the sights, the secret spots and the classes that tag them.' },
    { name: 'Google Play', role: 'AdMob ads, and the Remove ads and Pro purchases.' },
  ],
  flow: [
    'The person types the places, a rough date, the nights and the group.',
    'The app asks the Worker for the places, then for the flights.',
    'The Worker serves cached answers and fetches the misses from Travelpayouts, Wikivoyage and Wikidata.',
    'trip-core prices the trip for the group and builds the fare calendar.',
    'The app shows the offers, the calendar and the links. Saved trips stay on the phone.',
  ],
  links: [
    {
      to: 'tickalot',
      text: 'A link carries the trip both ways, with no shared account. Tick-a-Lot reads its sights from the same Worker.',
    },
  ],
  design: {
    scale: [
      'A person plans a few trips a year, so the load is small. The free Cloudflare Workers plan allows 100,000 requests a day.',
      'All people share one Travelpayouts token with a per minute limit, so a free phone runs 10 searches a day. Pro lifts it.',
    ],
    data: [
      'The Worker keeps no database. Each outside answer sits in the Workers cache for its time to live.',
      'The phone keeps the language pick, the search count, saved trips and the purchase flags in localStorage, through expo-sqlite on Android.',
      'A trip reaches Tick-a-Lot inside the link as JSON with v, place, start, nights and up to 60 places. No server keeps it.',
    ],
    interfaces: [
      'The Worker has 4 GET routes: /places, /flights, /sights and /spots. Each takes query parameters and answers JSON.',
      'trip-core takes the raw fares and returns offers priced for the group, the fare calendar and the links.',
      'A trip passes to Tick-a-Lot as a base64url hash, and the trip returns to the Ask screen as a query string of places and nights.',
    ],
    reliability: [
      'Cache lifetimes are 6 hours for fares, 7 days for places and sights and 30 days for Wikivoyage pages.',
      'An error sent with a 200, such as a MediaWiki maxlag or a Travelpayouts success:false, and a cut off JSON body go back uncached.',
      '/spots makes 6 calls at most, and falls back to English Wikivoyage when the local edition has under 3 listings.',
    ],
    security: [
      'The Worker owns every secret and every outside call. The app imports no crate and holds no key.',
      'There are no accounts. Pro and ad flags sit on the phone, bought through Google Play, so clearing the app data resets the search count.',
      'The Wikidata call names the app in its User-Agent, as Wikimedia asks.',
    ],
    performance: [
      'Each outside call sits behind the Workers cache. Parsed Wikivoyage listings sit there for 30 days, since reading London takes about 20 ms of CPU against 1 ms cached.',
      'One Wikidata query gives the language counts and classes of a whole page of listings, in place of a call per place.',
      'Long lists render through FlashList, so only the rows on screen draw.',
    ],
    operations: [
      'A push to main starts Checks: lint, test and build. Release and Deploy start on workflow_run once Checks pass.',
      'Release queues so each picks its version after the tag before it, and a newer Deploy cancels an older one.',
      "Deploy ships the web export and the Worker, then fails when either host doesn't answer. The Rust version is pinned, and the Worker builds for wasm.",
    ],
    tradeoffs: [
      'The planner runs in the Worker over wasm in the app, since Hermes runs no wasm. The cost is no offline planning.',
      'Travelpayouts cached fares over Duffel or scraping: free, and one call answers which date is cheapest. The cost is fares 2 to 7 days old.',
      'Wikidata and Wikivoyage over a points of interest vendor: free, and the count of Wikipedia languages gives a fame signal that marks secret spots.',
      'No ad on the flights screen over more ad space, since misclicks beside commission links risk a ban.',
    ],
  },
  features: {
    Ask: 'The form looks up each place through the Worker. A link from Tick-a-Lot fills the form from its address.',
    Flights:
      'The Worker asks Travelpayouts for each month of the window and keeps the fares for 6 hours. trip-core prices them for the group and adds the links.',
    Places:
      'The Worker joins the Wikidata sights near the city with the Wikivoyage listings. Wikidata classes tag each spot, and the chips filter on those tags.',
    'To Tickalot':
      'The app packs the places, the start and the nights into the Tick-a-Lot link itself. No server keeps the trip.',
    Settings: 'i18next holds the 9 catalogs. The pick stays on the phone, in SQLite through Expo.',
    Ads: 'AdMob shows the banner and the full screen ad on Android. One check decides each ad from the consent answer and the 2 purchases.',
    'Tripforge Pro':
      'Google Play Billing sells the product, and the app keeps the flag on the phone. One module decides each lock, and the limits sit in one file.',
    'Website pages for search':
      'Expo writes an HTML page per route and language at build time. A script then sets the page language, writes the 404 page and builds the sitemap.',
    'Dark mode':
      'Each colour is a token with a light and a dark value. The phone picks the set from the system theme, and the website uses CSS variables with prefers-color-scheme.',
  },
};

export default arch;
