import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'En Expo-app uten server. Skjulte WebView-er på telefonen laster søkesiden til hver kilde, og appen leser prisene fra HTML-en de sender tilbake.',
  parts: [
    {
      name: 'Expo og React Native',
      role: 'appen og skjermene gjennom expo-router, på 9 språk gjennom i18next.',
    },
    {
      name: 'react-native-webview',
      role: 'laster hver søkeside i skjul og sender HTML-en tilbake til appen.',
    },
    {
      name: 'node-html-parser',
      role: 'leser prisene fra den HTML-en, med den samme tolkekoden som testene kjører på lagrede sider.',
    },
    {
      name: 'metro.json',
      role: 'knytter hver T-bane-, МЦК- og МЦД-stasjon i Moskva til bydelen sin.',
    },
    {
      name: 'expo-sqlite',
      role: 'lagrer handlelisten på telefonen.',
    },
    {
      name: 'GitHub Actions',
      role: 'sjekker hver push, bygger den signerte APK-en, åpner den på en emulator og publiserer utgivelsen.',
    },
  ],
  flow: [
    'Innkjøperen skriver en vare og trykker Søk.',
    'En skjult WebView per kilde åpner søkesiden over telefonens egen forbindelse.',
    'HTML-en kommer tilbake, og en tolkefunksjon per kilde gjør den om til tilbud.',
    'Bydelsfilteret og en sortering etter pris lager én liste på skjermen.',
  ],
  links: [
    {
      to: 'АптекаМос',
      text: 'Produkt- og apoteksider med pris, adresse og T-banestasjon for hvert apotek.',
    },
    {
      to: 'Мегаптека',
      text: 'Et JSON-søke-API, spurt om Moskva med sortering etter pris.',
    },
    {
      to: 'Wildberries',
      text: 'Produktkort, lest etter nettstedets egen skriptsjekk.',
    },
    {
      to: 'Ozon',
      text: 'Søkeresultater så godt det går, siden robotsjekken der er strengest.',
    },
    {
      to: 'GitHub',
      text: 'Har APK-utgivelsene appen ser etter oppdateringer i.',
    },
  ],
  design: {
    scale: [
      'Én innkjøper med én Android-telefon i Moskva, som søker etter noen få varer om gangen.',
      'Gratis i drift: ingen server, intet betalt API og ingen reklame, så hvert søk kjører på telefonen.',
    ],
    data: [
      'Tilbudene ligger i minnet for søket som pågår: produkt, pakning, pris, selger, adresse og T-banestasjon.',
      'Handlelisten ligger i SQLite. Valget av bydeler og språket ligger i lokal lagring.',
    ],
    interfaces: [
      'Hver kildemodul gir en søke-URL og en tolkefunksjon. Det innsatte skriptet sender den rensede HTML-en gjennom window.ReactNativeWebView.postMessage.',
      'Мегаптека svarer på en vanlig fetch til api.megapteka.ru med city_id 6565 for Moskva.',
    ],
    reliability: [
      'Hver kilde feiler for seg etter høyst 60 sekunder, og linjen dens sier hvorfor. De andre kildene fortsetter.',
      'En test per kilde kjører tolkeren på en lagret side, så en endret side viser seg i CI.',
    ],
    security: [
      'Appen har ingen konto og sender ikke data til en egen server.',
      'Innlogginger hos grossister blir i WebView-ens informasjonskapsellager på telefonen. Signeringsnøkkelen ligger i Bitwarden og i repoets hemmeligheter.',
    ],
    performance: [
      'Kildene laster parallelt, og АптекаМос leser bare de 3 produktene flest apotek fører.',
      'Det innsatte skriptet fjerner skript og stiler før det sender HTML-en tilbake.',
    ],
    operations: [
      'Checks kjører lint, typer, knip, testene og en Android-pakke ved hver push til main.',
      'Release bygger den signerte APK-en, åpner den på en emulator for å fange en krasj og publiserer den som medpoisk-v<date>.<n>.',
    ],
    tradeoffs: [
      'Lesing av sidene på telefonen i stedet for en server, siden de russiske kildene stenger utenlandske IP-er og IP-er fra datasentre. En endret side stopper kilden sin til tolkeren er rettet.',
      'Et panel for robotsjekken i stedet for en løser i koden, så innkjøperen består den for hånd én gang.',
      'Grossistportaler med innkjøperens egen innlogging i stedet for grossistpriser i listen, siden de prisene krever kontoen hans.',
    ],
  },
  features: {
    'Price search':
      'run-search.ts starter hver kilde samtidig. HiddenPages.tsx laster hver side i en usynlig WebView, og hver kildemodul gjør HTML-en om til tilbud sortert etter pris.',
    'Moscow okrugs':
      'okrug-of.ts slår opp apotekets T-banestasjon i metro.json. En adresse uten stasjon plasseres etter stedet: Moskva forblir ukjent, et annet sted er Подмосковье.',
    'Site checks':
      'Hver kilde har en test som skiller sjekksiden fra en resultatside. CheckSheet.tsx viser sjekken, informasjonskapslene blir i det delte WebView-lageret, og kilden kjører igjen i skjul.',
    'Shopping list':
      'items.ts lagrer de skrevne ordene i SQLite. check-all.ts søker etter hver vare etter tur og beholder det billigste tilbudet i de valgte bydelene.',
    Distributors:
      'distributors.ts lister startsiden til hvert firma. browser.tsx åpner den i en WebView som beholder informasjonskapslene.',
    'Languages and updates':
      'i18n.ts bytter i18next med en gang og husker valget. newer-release.ts spør GitHub etter en nyere medpoisk-APK ved start og når appen åpnes igjen.',
  },
};

export default arch;
