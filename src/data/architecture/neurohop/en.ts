import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'One Expo app is the site, the Android app and the iOS app. A Rust Cloudflare Worker serves the site, the game content from R2 and the admin API on one domain.',
  parts: [
    { name: 'Expo and React Native', role: 'the catalog, the game page, settings and the admin, in 9 languages.' },
    {
      name: 'Rust Worker',
      role: 'serves the web export, /content/* from R2 and /api/* for the admin and premium games.',
    },
    { name: 'Cloudflare R2', role: 'holds index.json, a JSON file per game and the pictures as WebP.' },
    { name: 'Workbench account', role: 'checks the shared subscription that opens premium games and hides ads.' },
    { name: 'AdMob and AdSense', role: 'banners in the app and on the site.' },
  ],
  flow: [
    'The app loads /content/index.json with the lists and the cards.',
    'Search and filters run on the device and make no request.',
    'A card opens /content/games/<id>.json, or /api/premium/<id> with the Google ID token for a premium game.',
    'An admin write rebuilds index.json and purges it from the edge cache.',
  ],
  links: [
    { to: 'Cloudflare', text: 'Workers, R2 and the edge cache.' },
    { to: 'account.workbench-soft.com', text: 'Answers whether the Google account holds the Workbench subscription.' },
    { to: 'Google Play', text: 'Sells the Workbench plan in the Android app.' },
    { to: 'GitHub', text: 'Holds the signed APK releases on workbench-soft.github.io.' },
  ],
  design: {
    scale: [
      'Parents and specialists, mostly Russian speaking, reading a few games at a time.',
      'A catalog of hundreds of games fits in one index file the device filters.',
    ],
    data: [
      'Each game is a JSON file with the age, the blocks, the targets and its sections. The lists sit in index.json.',
      'A premium game sits under premium/ in R2, out of the public paths.',
    ],
    interfaces: [
      'GET /content/* serves the R2 files. /api/premium/<id> takes a Google ID token.',
      '/api/admin/* takes a token from the admin password and writes games, pictures and lists.',
    ],
    reliability: [
      'The app keeps a copy of the index and of each game it opened, and shows them offline.',
      'A request that waits over 15 seconds counts as failed, so the screen shows the error in place of a loading line.',
    ],
    security: [
      'The admin password and the session secret are Worker secrets, kept in Bitwarden.',
      'The Worker reads a premium game only after account.workbench-soft.com confirms the plan.',
    ],
    performance: [
      'index.json caches for 60 seconds in the browser and 300 on the edge. Pictures cache for a year.',
      'Pictures are WebP with a hash in the name, so a new picture needs no purge.',
    ],
    operations: [
      'Checks run lint and tests on the PC runners on each push to main.',
      'Release builds the signed APK, opens it on an emulator, and publishes it as neurohop-v<version>. Deploy ships the Worker.',
    ],
    tradeoffs: [
      'One Expo app for the site and the phones over a native app, so each feature ships once.',
      'Filters on the device over a search API, since the whole catalog fits in one small file.',
    ],
  },
  features: {
    'Catalog with filters and search':
      'catalog/ filters index.json on the device: ticks in one group widen the list, and groups narrow it. A card without a picture gets the colour of its first block.',
    'Game page':
      'game/ loads the game file by its id and draws each section. Each game has its own route, so a shared link opens it.',
    'Premium games':
      'The Worker asks account.workbench-soft.com with the Google ID token, then reads premium/<id>.json from R2.',
    Ads: 'ads/ shows AdMob banners in the app and AdSense on the site, and hides them while the plan is active.',
    'Settings and the Workbench plan':
      'pro/ holds the paywall, the Google Play purchase and useEntitled(). The site and iOS sign in to open a plan bought on the phone.',
    Admin:
      'admin/ signs in with the password, then edits games, uploads pictures and imports a CSV through /api/admin/*. Each write rebuilds index.json.',
    'App icon and store listing':
      'The icon comes from one SVG in design/icons/. store/listing.md holds the Play text and the console answers.',
  },
};

export default arch;
