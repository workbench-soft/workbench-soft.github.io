import type { Arch } from '../types';

const arch: Arch = {
  summary:
    "An Expo app with no server. Hidden WebViews on the phone load each source's own search page, and the app reads the prices off the HTML they send back.",
  parts: [
    {
      name: 'Expo and React Native',
      role: 'the app and its screens through expo-router, in 9 languages through i18next.',
    },
    {
      name: 'react-native-webview',
      role: 'loads each search page out of sight and posts the page HTML back to the app.',
    },
    {
      name: 'node-html-parser',
      role: 'reads the prices from that HTML, with the same parse code the tests run on saved pages.',
    },
    {
      name: 'metro.json',
      role: 'maps each Moscow metro, МЦК and МЦД station to its okrug.',
    },
    {
      name: 'expo-sqlite',
      role: 'keeps the shopping list on the phone.',
    },
    {
      name: 'GitHub Actions',
      role: 'checks each push, builds the signed APK, opens it on an emulator and publishes the release.',
    },
  ],
  flow: [
    'The buyer types an item and presses Search.',
    "A hidden WebView per source opens its search page on the phone's own connection.",
    'The page HTML comes back, and a parse function per source turns it into offers.',
    'The okrug filter and a price sort build one list on screen.',
  ],
  links: [
    {
      to: 'АптекаМос',
      text: 'Product and pharmacy pages with the price, address and metro of each pharmacy.',
    },
    {
      to: 'Мегаптека',
      text: 'A JSON search API, asked for Moscow with a price sort.',
    },
    {
      to: 'Wildberries',
      text: "Product cards, read after the site's own script check.",
    },
    {
      to: 'Ozon',
      text: 'Search results on a best effort basis, since its bot check is the strictest.',
    },
    {
      to: 'GitHub',
      text: 'Holds the APK releases the app checks for updates.',
    },
  ],
  design: {
    scale: [
      'One buyer on one Android phone in Moscow, searching a few items at a time.',
      'Free to run: no server, no paid API and no ads, so each search runs on the phone.',
    ],
    data: [
      'Offers live in memory for the current search: product, pack, price, seller, address and metro.',
      'The shopping list sits in SQLite. The okrug pick and the language sit in local storage.',
    ],
    interfaces: [
      'Each source module gives a search URL and a parse function. The injected script posts the cleaned page HTML through window.ReactNativeWebView.postMessage.',
      'Мегаптека answers a plain fetch to api.megapteka.ru with city_id 6565 for Moscow.',
    ],
    reliability: [
      'Each source fails on its own after at most 60 seconds, and its row says why. The other sources go on.',
      'A test per source runs its parser on a saved page, so a markup change shows up in CI.',
    ],
    security: [
      'The app keeps no account and sends no data to a server of its own.',
      'Distributor logins stay in the WebView cookie store on the phone. The signing key sits in Bitwarden and the repo secrets.',
    ],
    performance: [
      'The sources load in parallel, and АптекаМос reads only the 3 products most pharmacies stock.',
      'The injected script strips scripts and styles before it sends the HTML back.',
    ],
    operations: [
      'Checks run lint, types, knip, the tests and an Android bundle on each push to main.',
      'Release builds the signed APK, opens it on an emulator to catch a crash, then publishes it as medpoisk-v<date>.<n>.',
    ],
    tradeoffs: [
      'Scraping on the phone over a server, since the Russian sources block foreign and datacenter IPs. A site change breaks its source until the parser is fixed.',
      'A sheet for a robot check over a solver in code, so the buyer passes it by hand once.',
      "Distributor portals with the buyer's own login over wholesale prices in the list, since those prices need the buyer's account.",
    ],
  },
  features: {
    'Price search':
      'run-search.ts starts each source at once. HiddenPages.tsx loads each page in an invisible WebView, and each source module parses the HTML into offers sorted by price.',
    'Moscow okrugs':
      "okrug-of.ts looks up the pharmacy's metro station in metro.json. An address with no station maps by its town: Moscow stays unknown, another town is Подмосковье.",
    'Site checks':
      'Each source has a test that tells its check page from a results page. CheckSheet.tsx shows the check, the cookies stay in the shared WebView store, and the source runs again hidden.',
    'Shopping list':
      'items.ts saves the typed words in SQLite. check-all.ts runs the search for each item in turn and keeps its cheapest offer in the chosen okrugs.',
    Distributors:
      'distributors.ts lists the home page of each company. browser.tsx opens it in a WebView that keeps its cookies.',
    'Languages and updates':
      'i18n.ts switches i18next at once and keeps the pick. newer-release.ts asks GitHub for a newer medpoisk APK at start and on return.',
  },
};

export default arch;
