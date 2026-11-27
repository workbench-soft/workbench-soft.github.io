import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Én Expo-app er nettstedet, Android-appen og iOS-appen. En Cloudflare Worker i Rust leverer nettstedet, lekene fra R2 og admin-API-et på ett domene.',
  parts: [
    { name: 'Expo og React Native', role: 'katalogen, lekesiden, innstillingene og admin, på 9 språk.' },
    { name: 'Rust Worker', role: 'leverer webeksporten, /content/* fra R2 og /api/* for admin og premium-leker.' },
    { name: 'Cloudflare R2', role: 'holder index.json, én JSON-fil per lek og bildene som WebP.' },
    { name: 'Workbench-konto', role: 'sjekker det felles abonnementet som åpner premium-leker og skjuler annonser.' },
    { name: 'AdMob og AdSense', role: 'bannere i appen og på nettstedet.' },
  ],
  flow: [
    'Appen laster /content/index.json med listene og kortene.',
    'Søk og filtre kjører på enheten og sender ingen forespørsel.',
    'Et kort åpner /content/games/<id>.json, en premium-lek /api/premium/<id> med Google ID-token.',
    'En skriving i admin bygger index.json på nytt og tømmer den fra kantbufferen.',
  ],
  links: [
    { to: 'Cloudflare', text: 'Workers, R2 og kantbufferen.' },
    { to: 'account.workbench-soft.com', text: 'Svarer om Google-kontoen har Workbench-abonnementet.' },
    { to: 'Google Play', text: 'Selger Workbench-planen i Android-appen.' },
    { to: 'GitHub', text: 'Holder de signerte APK-utgivelsene på workbench-soft.github.io.' },
  ],
  design: {
    scale: [
      'Foreldre og fagfolk, mest russisktalende, som leser noen få leker om gangen.',
      'En katalog med hundrevis av leker får plass i én indeksfil som enheten filtrerer.',
    ],
    data: [
      'Hver lek er en JSON-fil med alder, blokker, mål og deler. Listene ligger i index.json.',
      'En premium-lek ligger under premium/ i R2, utenfor de offentlige stiene.',
    ],
    interfaces: [
      'GET /content/* leverer R2-filene. /api/premium/<id> tar et Google ID-token.',
      '/api/admin/* tar et token fra admin-passordet og skriver leker, bilder og lister.',
    ],
    reliability: [
      'Appen beholder en kopi av indeksen og av hver lek den åpnet, og viser dem uten nett.',
      'En forespørsel som venter over 15 sekunder regnes som feilet, og skjermen viser feilen i stedet for en lastelinje.',
    ],
    security: [
      'Admin-passordet og sesjonshemmeligheten er Worker-hemmeligheter, lagret i Bitwarden.',
      'Workeren leser en premium-lek først når account.workbench-soft.com bekrefter planen.',
    ],
    performance: [
      'index.json bufres i 60 sekunder i nettleseren og 300 på kanten. Bilder bufres i et år.',
      'Bildene er WebP med en hash i navnet, så et nytt bilde trenger ingen tømming.',
    ],
    operations: [
      'Checks kjører lint og tester på PC-runnerne ved hver push til main.',
      'Release bygger den signerte APK-en, åpner den i en emulator og publiserer den som neurohop-v<version>. Deploy sender ut workeren.',
    ],
    tradeoffs: [
      'Én Expo-app for nettstedet og telefonene i stedet for en native app, så hver funksjon kommer ut én gang.',
      'Filtre på enheten i stedet for et søke-API, siden hele katalogen får plass i én liten fil.',
    ],
  },
  features: {
    'Catalog with filters and search':
      'catalog/ filtrerer index.json på enheten: haker i én gruppe utvider listen, og gruppene snevrer den inn. Et kort uten bilde får fargen til sin første blokk.',
    'Game page':
      'game/ laster lekefilen etter id og tegner hver del. Hver lek har sin egen rute, så en delt lenke åpner den.',
    'Premium games':
      'Workeren spør account.workbench-soft.com med Google ID-tokenet og leser så premium/<id>.json fra R2.',
    'Free game of the week':
      'pro/free-game.ts velger leken med freePick fra @workbench-soft/taste, etter uken på enheten. Workeren har samme regel i Rust og leverer den leken uten token.',
    Ads: 'ads/ viser AdMob-bannere i appen og AdSense på nettstedet, og skjuler dem når planen er aktiv.',
    'Settings and the Workbench plan':
      'pro/ holder betalingsmuren, kjøpet i Google Play og useEntitled(). Nettstedet og iOS logger inn for å åpne en plan kjøpt på telefonen.',
    Admin:
      'admin/ logger inn med passordet, redigerer så leker, laster opp bilder og importerer en CSV via /api/admin/*. Hver skriving bygger index.json på nytt.',
    'App icon and store listing':
      'Ikonet kommer fra én SVG i design/icons/. store/listing.md holder Play-teksten og svarene i konsollen.',
  },
};

export default arch;
