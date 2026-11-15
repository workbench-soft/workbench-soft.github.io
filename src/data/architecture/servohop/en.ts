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
  features: {
    'Fuel prices on a map':
      'A Pages Function returns up to 400 servos in the map box from D1. The app splits the prices on screen into thirds and colours the pins.',
    'Your place on the map':
      "expo-location gives the position and the compass heading on the phones. On the web the browser's location and orientation events do the same.",
    'Station list':
      'The list shows the same servos as the map from the same answer. The distance is a straight line from the phone.',
    'Price history chart':
      'A Pages Function reads the daily rows from D1, and shared chart code carries a price over the days with no change. react-native-svg draws the line and band.',
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
      'expo-iap checks the Pro purchase on each start. One check in the app opens the 365 day chart and hides the ads.',
    'Area search':
      'A Pages Function finds the suburb or postcode in the station table through 2 indexes. It needs no outside geocoder and no key.',
    'Hey Servo':
      'sherpa-onnx hears the wake phrase on the phone, and the speech service of Android hears the command. The answer comes from the ServoHop API.',
    'Fuel panel':
      'The pick sets the fuel in each call to the API, and the app keeps it for the next start. A charger counts by its strongest plug.',
    Ads: 'react-native-google-mobile-ads shows the banner in the app after the consent form. AdSense fills it on the site and the search pages.',
    Languages: 'i18next holds the 9 catalogs, and expo-localization reads the language of the phone or browser.',
  },
};

export default arch;
