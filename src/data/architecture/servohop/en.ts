import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'A poller on GitHub Actions writes the state fuel feeds into Cloudflare D1. Pages Functions read D1 for the app and the search pages, and one Expo app draws the map on Android, the iPhone and the web.',
  parts: [
    {
      name: 'Poller on GitHub Actions',
      role: 'fetches each feed on a schedule and writes the changed prices to D1.',
    },
    {
      name: 'State fuel feeds',
      role: 'NSW FuelCheck, Servo Saver in VIC, Fuel Prices QLD and FuelWatch WA give the prices.',
    },
    {
      name: 'Charger sources',
      role: 'Open Charge Map, Transport for NSW and OpenStreetMap, merged so each charger shows once.',
    },
    { name: 'Cloudflare D1', role: 'the current prices, and a trigger that keeps the daily history.' },
    {
      name: 'Cloudflare Pages Functions',
      role: 'answer the app through the API and render the search pages and sitemaps.',
    },
    { name: 'Expo and React Native', role: 'one code base for Android, the iPhone and the website.' },
    { name: 'MapLibre and OpenFreeMap', role: 'the map in the browser and on the phones, on tiles that need no key.' },
    {
      name: 'Hey Servo module',
      role: 'a Kotlin Expo module with an offline wake word model and the speech service of Android.',
    },
  ],
  flow: [
    'The poller reads the state feeds, hourly for NSW, VIC and QLD.',
    'Only changed prices reach D1, and a trigger adds them to the daily history.',
    'The app asks a Pages Function for the servos in the map box.',
    'The edge cache answers repeats for 5 minutes, and D1 answers the rest.',
    'The app colours each pin by price and lists the servos.',
  ],
  links: [
    {
      to: 'spotthecam',
      text: 'Hey Servo follows the design of Hey Spot. One app holds the microphone for every wake phrase.',
    },
    {
      to: 'keeppad',
      text: 'keepPad and Lumiere share the same microphone through the wakeshare library.',
    },
    { to: 'Google Maps', text: 'A tap on directions or a Hey Servo command opens the navigation in Google Maps.' },
    { to: 'Google Play', text: 'Remove ads and ServoHop Pro sell as one time purchases. AdMob shows the banner.' },
    { to: 'GitHub Releases', text: 'Each release puts the APK there, and the GitHub build updates itself from it.' },
  ],
  design: {
    scale: [
      'One install per phone with no account, so the load is public price reads from drivers and search engines.',
      'Free tiers shaped it: 100k Pages requests, 100k D1 rows written and 10 ms of CPU per request a day.',
      'A map answer holds up to 400 servos for the box on screen.',
    ],
    data: [
      'D1 holds station, price_now, price_daily, price_report, ev_site and ev_price. Station ids carry the feed, such as nsw-1234.',
      'price_now has one row per station and fuel. A trigger rolls each change into price_daily with the low, high and count of the day.',
      'The phone keeps only the fuel pick and settings. Prices live in D1.',
    ],
    interfaces: [
      "The app calls JSON routes under /api for the stations in a map box, one station's history, reports and EV chargers.",
      'The same Functions render plain HTML under /fuel and the sitemaps for search engines.',
      'The poller reads WA RSS, the NSW, VIC and QLD APIs, Open Charge Map and OpenStreetMap, and writes through wrangler d1 execute.',
    ],
    reliability: [
      'A feed without its key is skipped, so the job stays green and the other states still update.',
      'Each upsert ends with WHERE price_now.cents <> excluded.cents, so a rerun writes no row twice.',
      'Polls stop while the self-hosted runner is down. A price shows up to 5 minutes late, and VIC prices arrive 24 hours late.',
    ],
    security: [
      'No sign in and no account. A report sender is a salted hash of the address, not the address.',
      'A report passes a price range check and a limit of 10 an hour per sender.',
      'Feed keys sit in GitHub Actions secrets that only the poller reads. The app holds none.',
    ],
    performance: [
      'API answers carry s-maxage=300, and the app rounds the box to 2 decimals, so nearby pans share one cached answer.',
      'Search pages cache for 30 minutes, the history for an hour and the sitemaps for 6 hours.',
      'The multi MB NSW list parses on the runner, since a free Worker gets 10 ms of CPU.',
    ],
    operations: [
      'Checks run on each push. Release builds the APK and the Play bundle at once, and a failed Checks run cancels them.',
      'Deploy web applies db/schema.sql to the live D1, then publishes Pages. Each schema statement is IF NOT EXISTS.',
      'Polls run on cron: hourly for NSW, VIC and QLD, every 6 hours for Tasmania, daily for WA and chargers.',
    ],
    tradeoffs: [
      'Pages Functions and D1 over Firebase or a paid server, so a map box is one SQL query inside the free tier.',
      'A daily roll up over a row per poll, so hourly polls stay under the write limit. A day with no change has no row.',
      'A poller on GitHub Actions over a Worker cron, because the NSW list needs more than 10 ms to parse.',
      'MapLibre on OpenFreeMap tiles over Google Maps, so no key and no bill, at the cost of two map builds.',
    ],
  },
  features: {
    'Fuel prices on a map':
      'A Pages Function returns up to 400 servos in the map box from D1. The app splits the prices on screen into thirds and colours the pins.',
    'Your place on the map':
      "expo-location gives the position and the compass heading on the phones. On the web the browser's location and orientation events do the same.",
    'Station list':
      'The list shows the same servos as the map from the same answer. The distance is a straight line from the phone.',
    'Price history chart':
      'A Pages Function reads the daily rows from D1, and shared chart code carries a price over the days with no change. react-native-svg draws the line and band.',
    'Price alert':
      'An hourly expo-background-task check reads /api/station and /api/history, a pure rule compares the price, and expo-notifications posts the alert.',
    'Driver price reports':
      'The app posts a report to a Pages Function, which checks the range and the hourly limit per sender. The price goes into D1.',
    'EV chargers':
      'The poller merges the chargers of 3 open sources each day. Driver reports keep the price per kWh of each network in D1.',
    'Search pages':
      'Pages Functions render plain HTML for each state, suburb and servo, with the chart as SVG. The edge caches each page for 30 minutes.',
    'Site text and guides':
      'A build step writes the home text into the exported HTML. Pages Functions serve the guides from texts kept in the repo.',
    'Self-update from GitHub':
      'The app asks GitHub Releases for a newer APK and hands it to the Android installer. The Google Play build swaps the update code for empty stubs.',
    'Remove ads':
      'expo-iap sells the product through Google Play. The purchase follows the Google account, so Restore brings it back on a new phone.',
    'ServoHop Pro':
      'expo-iap checks the Pro purchase on each start. One check in the app opens the 365 day chart, Hey Servo and more than one price alert, and hides the ads. The shared taste package counts the free uses on the phone.',
    'Area search':
      'A Pages Function finds the suburb or postcode in the station table through 2 indexes. It needs no outside geocoder and no key.',
    'Hey Servo':
      'sherpa-onnx hears the wake phrase on the phone, and the speech service of Android hears the command. The answer comes from the ServoHop API.',
    'Fuel panel':
      'The pick sets the fuel in each call to the API, and the app keeps it for the next start. A charger counts by its strongest plug.',
    Ads: 'react-native-google-mobile-ads shows the banner in the app after the consent form. AdSense fills it on the site and the search pages.',
    Languages: 'i18next holds the 9 catalogs, and expo-localization reads the language of the phone or browser.',
    'Links open the app':
      'intentFilters with autoVerify in app.config.ts claim servohop.com, servohop.com/.well-known/assetlinks.json proves it, and src/links/site-link.ts maps each address to a route.',
    'Open source licences':
      'At build time scripts/licences.ts reads package.json and writes src/licences/licences.json, which Settings lists.',
  },
};

export default arch;
