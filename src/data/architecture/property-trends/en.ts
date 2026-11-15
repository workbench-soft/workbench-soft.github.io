import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'A Rust pipeline turns open government data into static JSON and PMTiles files. They ship with the web build to GitHub Pages, and one Expo app reads them on the web, Android and the iPhone.',
  parts: [
    {
      name: 'Rust pipeline',
      role: 'downloads the sources, matches each row to an ABS suburb code and computes the medians with polars.',
    },
    { name: 'PMTiles', role: 'the suburb and postcode shapes in one static tile file, cut by the pipeline.' },
    { name: 'GitHub Pages', role: 'serves the web build and the data files at no cost.' },
    { name: 'Expo and React Native', role: 'the map, the filters, the card and the chart on the web and the phones.' },
    {
      name: 'MapLibre and OpenFreeMap',
      role: 'draws the suburb shapes over the base map and colours each one by its median.',
    },
    { name: 'TanStack Query', role: 'fetches the map and suburb files the filters ask for.' },
    { name: 'ts-rs', role: 'writes the TypeScript types of the data files from the Rust structs.' },
    { name: 'expo-iap and AdMob', role: 'the banner, Remove ads and Pro on the phones.' },
  ],
  flow: [
    'A CI run each Monday downloads the state sales and rent files.',
    'The Rust pipeline matches each row to a suburb and computes the medians.',
    'The JSON files and the tiles ship with the web build to GitHub Pages.',
    'The app fetches one map file for the chosen filters.',
    'MapLibre colours each suburb, and a tap opens its card and chart.',
  ],
  links: [
    { to: 'realestate.com.au', text: 'The cards link to the same search there. The app reads no page of the site.' },
    {
      to: 'Australian Bureau of Statistics',
      text: 'The suburb and postcode shapes, and the Census 2021 figures on each card.',
    },
    { to: 'Google Play', text: 'Remove ads and Property Trends Pro sell as one time purchases on Android.' },
    { to: 'App Store', text: 'The same purchases on the iPhone, once the developer account opens.' },
  ],
  features: {
    'Price map':
      'The Rust pipeline computes a median per suburb and type for each period. MapLibre colours each ABS suburb shape in 7 steps cut at the quantiles.',
    Filters:
      'Each mix of filters has its own JSON file, built ahead of time. A filter change fetches one file, and the URL keeps the pick.',
    'Listings on realestate.com.au':
      'The app builds a realestate.com.au search link from the suburb, the postcode and the type. It reads no page of the site.',
    'Suburb card and history chart':
      'A tap fetches one file per suburb with the median and sales of each period. react-native-svg and d3 draw the chart on every platform.',
    Search:
      'The search reads an index file with the name, postcode and box of each suburb. A pick flies the map to that box.',
    Languages:
      'i18next holds the 9 catalogs, and Intl formats the prices and dates for each language. The browser keeps the pick.',
    Rents:
      'The pipeline computes a median weekly rent per postcode from the state bond data and the VIC Rental Report. MapLibre colours a separate postcode tile file.',
    'Install from the browser':
      'A web app manifest gives the name, the icons and the colour of the title bar. It has no service worker yet, so it needs the network.',
    'Ads and Remove ads':
      "react-native-google-mobile-ads shows the banner after Google's consent form. expo-iap checks the Remove ads purchase on each start, and the web build turns ads off.",
    'Property Trends Pro':
      'expo-iap checks the Pro purchase with Google Play or the App Store on each start. One check in the app opens Rents and the full history.',
    'iPhone app':
      'The same Expo code builds for iOS and asks the tracking question before AdMob starts. A macOS runner or EAS builds the simulator app for now.',
  },
};

export default arch;
