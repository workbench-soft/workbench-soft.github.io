import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'En Expo-app for Android og nettet kaller én Rust Worker på Cloudflare. Workeren gjør hvert kall ut og holder nøklene, og et Rust crate har reiselogikken.',
  parts: [
    { name: 'Expo and React Native', role: 'én kodebase for Android-appen og nettstedet, gjennom react-native-web.' },
    { name: 'Rust Worker', role: 'rutene for steder, fly, severdigheter og skjulte perler, hver bak Workers-cachen.' },
    {
      name: 'trip-core',
      role: 'Rust-craten med datovinduene, prisene for gruppen, priskalenderen og taggene for stedene.',
    },
    { name: 'Travelpayouts', role: 'flyprisene og partnerlenkene til Aviasales.' },
    { name: 'Wikivoyage and Wikidata', role: 'severdighetene, de skjulte perlene og klassene som tagger dem.' },
    { name: 'Google Play', role: 'AdMob-reklame og kjøpene Fjern reklame og Pro.' },
  ],
  flow: [
    'Personen skriver stedene, en omtrentlig dato, nettene og gruppen.',
    'Appen spør Workeren om stedene, så om flyene.',
    'Workeren gir svar fra cachen og henter resten fra Travelpayouts, Wikivoyage og Wikidata.',
    'trip-core regner ut prisen for gruppen og lager priskalenderen.',
    'Appen viser tilbudene, kalenderen og lenkene. Lagrede reiser blir på telefonen.',
  ],
  links: [
    {
      to: 'tickalot',
      text: 'En lenke bærer reisen begge veier, uten felles konto. Tick-a-Lot henter severdighetene sine fra den samme Workeren.',
    },
  ],
  features: {
    Ask: 'Skjemaet slår opp hvert sted gjennom Workeren. En lenke fra Tick-a-Lot fyller skjemaet fra adressen sin.',
    Flights:
      'Workeren spør Travelpayouts for hver måned i vinduet og holder prisene i 6 timer. trip-core regner dem om for gruppen og legger til lenkene.',
    Places:
      'Workeren slår sammen Wikidata-severdighetene nær byen med oppføringene fra Wikivoyage. Wikidata-klasser tagger hvert sted, og brikkene filtrerer på de taggene.',
    'To Tickalot': 'Appen legger stedene, starten og nettene rett inn i Tick-a-Lot-lenken. Ingen server lagrer reisen.',
    Settings: 'i18next holder de 9 katalogene. Valget blir på telefonen, i SQLite gjennom Expo.',
    Ads: 'AdMob viser banneret og fullskjermreklamen på Android. Én sjekk avgjør hver annonse ut fra samtykket og de 2 kjøpene.',
    'Tripforge Pro':
      'Google Play Billing selger produktet, og appen lagrer merket på telefonen. Én modul avgjør hver lås, og grensene står i én fil.',
    'Website pages for search':
      'Expo skriver en HTML-side per rute og språk når appen bygges. Et skript setter så sidespråket, skriver 404-siden og lager sitemapen.',
  },
};

export default arch;
