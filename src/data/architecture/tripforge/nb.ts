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
  design: {
    scale: [
      'En person planlegger noen få reiser i året, så belastningen er liten. Den gratis Cloudflare Workers-planen tillater 100 000 forespørsler i døgnet.',
      'Alle deler ett Travelpayouts-token med en grense per minutt, så en gratis telefon gjør 10 søk i døgnet. Pro løfter den.',
    ],
    data: [
      'Worker har ingen database. Hvert svar utenfra ligger i Workers-bufferen i sin levetid.',
      'Telefonen holder språkvalget, søketelleren, lagrede reiser og kjøpsflaggene i localStorage, via expo-sqlite på Android.',
      'En reise når Tick-a-Lot i lenken som JSON med v, place, start, nights og opptil 60 steder. Ingen server lagrer den.',
    ],
    interfaces: [
      'Worker har 4 GET-ruter: /places, /flights, /sights og /spots. Hver tar spørreparametere og svarer med JSON.',
      'trip-core tar de rå prisene og gir tilbud regnet ut for gruppen, priskalenderen og lenkene.',
      'En reise går til Tick-a-Lot som en base64url-hash, og kommer tilbake til Ask-skjermen som en spørrestreng med steder og netter.',
    ],
    reliability: [
      'Bufferlevetidene er 6 timer for flypriser, 7 dager for steder og severdigheter og 30 dager for Wikivoyage-sider.',
      'En feil sendt med 200, som en maxlag fra MediaWiki eller success:false fra Travelpayouts, og en avkuttet JSON-kropp går tilbake uten å bufres.',
      '/spots gjør høyst 6 kall, og faller tilbake til engelsk Wikivoyage når den lokale utgaven har under 3 oppføringer.',
    ],
    security: [
      'Worker eier hver hemmelighet og hvert kall utenfra. Appen importerer ingen crate og holder ingen nøkkel.',
      'Det finnes ingen kontoer. Pro- og annonseflaggene ligger på telefonen og kjøpes gjennom Google Play, så sletting av appdata nullstiller søketelleren.',
      'Wikidata-kallet navngir appen i User-Agent, slik Wikimedia ber om.',
    ],
    performance: [
      'Hvert kall utenfra ligger bak Workers-bufferen. Leste Wikivoyage-oppføringer ligger der i 30 dager, siden å lese London koster omtrent 20 ms CPU mot 1 ms fra bufferen.',
      'Én Wikidata-spørring gir språktall og klasser for en hel side med oppføringer, i stedet for ett kall per sted.',
      'Lange lister tegnes gjennom FlashList, så bare radene på skjermen tegnes.',
    ],
    operations: [
      'En push til main starter Checks: lint, test og bygg. Release og Deploy starter via workflow_run når Checks består.',
      'Release står i kø, så hver velger sin versjon etter taggen før, og en nyere Deploy avbryter en eldre.',
      'Deploy sender ut nett-eksporten og Worker, og feiler så hvis en av vertene ikke svarer. Rust-versjonen er festet, og Worker bygges for wasm.',
    ],
    tradeoffs: [
      'Planleggeren kjører i Worker framfor i wasm i appen, siden Hermes ikke kjører wasm. Prisen er ingen planlegging uten nett.',
      'Bufrede Travelpayouts-priser framfor Duffel eller skraping: gratis, og ett kall sier hvilken dato som er billigst. Prisen er priser som er 2 til 7 dager gamle.',
      'Wikidata og Wikivoyage framfor en leverandør av severdigheter: gratis, og antallet Wikipedia-språk gir et signal om hvor kjent stedet er, som markerer hemmelige steder.',
      'Ingen annonse på flyskjermen framfor mer annonseplass, siden feilklikk ved siden av provisjonslenker risikerer utestengelse.',
    ],
  },
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
    'Dark mode':
      'Hver farge er et token med en lys og en mørk verdi. Telefonen velger settet etter systemtemaet, og nettsiden bruker CSS-variabler med prefers-color-scheme.',
  },
};

export default arch;
