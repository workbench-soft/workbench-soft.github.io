import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'An Expo app for Android and the web calls one Rust Worker on Cloudflare. The Worker makes each outside call and keeps the keys, and a Rust crate holds the trip logic.',
  parts: [
    { name: 'Expo and React Native', role: 'one code base for the Android app and the website, through react-native-web.' },
    { name: 'Rust Worker', role: 'the routes for places, flights, sights and spots, each behind the Workers cache.' },
    { name: 'trip-core', role: 'the Rust crate with the date windows, the fares for the group, the fare calendar and the spot tags.' },
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
    { to: 'tickalot', text: 'A link carries the trip both ways, with no shared account. Tick-a-Lot reads its sights from the same Worker.' },
  ],
  features: {
    Ask: 'The form looks up each place through the Worker. A link from Tick-a-Lot fills the form from its address.',
    Flights:
      'The Worker asks Travelpayouts for each day of the window and keeps the fares for 6 hours. trip-core prices them for the group and adds the links.',
    Places:
      'The Worker joins the Wikidata sights near the city with the Wikivoyage listings. Wikidata classes tag each spot, and the chips filter on those tags.',
    'To Tickalot':
      'The app packs the places, the start and the nights into the Tick-a-Lot link itself. No server keeps the trip.',
    Settings: 'i18next holds the 9 catalogs. The pick stays on the phone, in SQLite through Expo.',
    Ads: 'AdMob shows the banner and the full screen ad on Android. One check decides each ad from the consent answer and the Remove ads purchase.',
    'Tripforge Pro':
      'Google Play Billing sells the product, and the app keeps the flag on the phone. One module decides each lock, and the limits sit in one file.',
    'Website pages for search':
      'Expo writes an HTML page per route and language at build time. A script then sets the page language, writes the 404 page and builds the sitemap.',
  },
};

export default arch;
