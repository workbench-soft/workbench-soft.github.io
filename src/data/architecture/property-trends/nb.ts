import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'En Rust-pipeline gjør åpne offentlige data om til statiske JSON- og PMTiles-filer. De følger med nettbygget til GitHub Pages, og én Expo-app leser dem på nettet, Android og iPhone.',
  parts: [
    {
      name: 'Rust-pipeline',
      role: 'laster ned kildene, kobler hver rad til en ABS-kode for forstaden og regner ut medianene med polars.',
    },
    { name: 'PMTiles', role: 'grensene for forsteder og postnumre i én statisk flisfil, kuttet av pipelinen.' },
    { name: 'GitHub Pages', role: 'leverer nettbygget og datafilene gratis.' },
    { name: 'Expo og React Native', role: 'kartet, filtrene, kortet og grafen på nettet og telefonene.' },
    {
      name: 'MapLibre og OpenFreeMap',
      role: 'tegner forstadsgrensene over grunnkartet og farger hver forstad etter medianen.',
    },
    { name: 'TanStack Query', role: 'henter kart- og forstadsfilene filtrene ber om.' },
    { name: 'ts-rs', role: 'skriver TypeScript-typene for datafilene ut fra Rust-structene.' },
    { name: 'expo-iap og AdMob', role: 'banneret, Fjern reklame og Pro på telefonene.' },
  ],
  flow: [
    'En CI-kjøring hver mandag laster ned delstatenes salgs- og leiefiler.',
    'Rust-pipelinen kobler hver rad til en forstad og regner ut medianene.',
    'JSON-filene og flisene følger med nettbygget til GitHub Pages.',
    'Appen henter én kartfil for de valgte filtrene.',
    'MapLibre farger hver forstad, og et trykk åpner kortet og grafen.',
  ],
  links: [
    { to: 'realestate.com.au', text: 'Kortene lenker til det samme søket der. Appen leser ingen side på nettstedet.' },
    {
      to: 'Australian Bureau of Statistics',
      text: 'Grensene for forsteder og postnumre, og tallene fra folketellingen 2021 på hvert kort.',
    },
    { to: 'Google Play', text: 'Fjern reklame og Property Trends Pro selges som engangskjøp på Android.' },
    { to: 'App Store', text: 'De samme kjøpene på iPhone, når utviklerkontoen åpner.' },
  ],
  design: {
    scale: [
      'Ett statisk nettsted betjener alle besøkende, så flere lesere koster ikke studioet noe.',
      'Salgene kommer fra VIC, NSW og SA, og formfilen kutter 15 358 ABS-forsteder til én PMTiles-fil på 53 MB.',
      'Andre delstater vises grå, siden de ikke publiserer gratis salgsdata.',
    ],
    data: [
      'Hvert filtersett har sin egen JSON-fil, siden medianer ikke kan legges sammen på tvers av grupper. En celle med under 5 salg får ingen median.',
      'Formene ligger i boundaries.pmtiles, med forstadskoden som objekt-id og uten tagger.',
      'En forstadsfil holder hver type og tomtegruppe som en liste med periode, median og salg. Folketellingsfilene legger til tall fra Census 2021 og SEIFA.',
    ],
    interfaces: [
      'Appen leser statisk JSON og PMTiles med HTTP range-forespørsler, uten eget API.',
      'Rust-pipelinen leser VIC- og SA-listene fra CKAN-API-er, NSW-.DAT-zip-ene og ABS-formene.',
      'ts-rs skriver TypeScript-typene til hver datafil fra Rust-structene.',
    ],
    reliability: [
      'Et lisensskifte i en kilde stopper pipeline-kjøringen, så ingen data uten lisens blir publisert.',
      'Pages bytter hele nettstedet på en gang, så en besøkende leser én hel versjon.',
      'Ingen service worker ennå, så den installerte web-appen trenger nett.',
    ],
    security: [
      'Ingen innlogging og ingen server. Google Play sjekker kjøp på telefonen, så en rootet telefon kan forfalske et kjøp.',
      'Bare åpne data med oppgitt lisens brukes. NSW-salg vises på nettstedet uten reklame, fordi lisensen deres er ikke-kommersiell.',
      'En planlagt Rust-Worker ville holdt en API-nøkkel i en Worker-secret, utenfor bunten. Den er ikke bygget.',
    ],
    performance: [
      'Forhåndsberegnede filer gjør at et filterbytte henter én JSON-fil, og webkartet bytter farger med feature-state.',
      'På telefoner bygger MapLibre ett match-uttrykk fra filen, siden 15 000 feature-state-kall ellers ville krysset broen ett og ett.',
      'PMTiles lagrer like fliser én gang, og en utrulling hopper over pipelinen når inndataene er like som forrige kjøring.',
    ],
    operations: [
      'Checks kjører TypeScript- og Rust-jobbene side om side på PC-runneren: lint, typer, tester og web- og iOS-eksportene.',
      'Deploy web kjører etter hver grønne Release og hver mandag. Den publiserer en release av nettstedets repo, og Pages pakker ut den nyeste.',
      'Vertskapet koster 0 $: GitHub Pages, et OpenFreeMap-basiskart uten nøkkel og en egen runner.',
    ],
    tradeoffs: [
      'Statiske filer på GitHub Pages i stedet for en serverdatabase, så vertskapet koster 0 $. Filtrene blir faste valg.',
      'Åpne offentlige data i stedet for å skrape en portal, som vilkårene forbyr. Prisen er ingen soverom og grå delstater.',
      'En Rust-pipeline i stedet for et Node-skript, siden NSW har hvert salg siden 1990 og formene krever tungt arbeid.',
      'Én Expo-kodebase i stedet for et rent nettsted, så butikkbyggene ikke blir en andre app. Kartet trenger 2 biblioteker.',
    ],
  },
  features: {
    'Price map':
      'Rust-pipelinen regner ut en median per forstad og type for hver periode. MapLibre farger hver ABS-forstad i 7 trinn kuttet ved kvantilene.',
    Filters:
      'Hver blanding av filtre har sin egen JSON-fil, bygget på forhånd. Et filterbytte henter én fil, og URL-en holder valget.',
    'Listings on realestate.com.au':
      'Appen bygger en søkelenke til realestate.com.au fra forstaden, postnummeret og typen. Den leser ingen side på nettstedet.',
    'Suburb card and history chart':
      'Et trykk henter én fil per forstad med medianen og salgene for hver periode. react-native-svg og d3 tegner grafen på hver plattform.',
    Search:
      'Søket leser en indeksfil med navn, postnummer og ramme for hver forstad. Et valg flyr kartet til den rammen.',
    Languages:
      'i18next holder de 9 katalogene, og Intl formaterer priser og datoer for hvert språk. Nettleseren husker valget.',
    Rents:
      'Pipelinen regner ut en median ukeleie per postnummer fra delstatenes depositumsdata og VIC Rental Report. MapLibre farger en egen flisfil for postnumrene.',
    'Install from the browser':
      'Et nettappmanifest gir navnet, ikonene og fargen på tittellinjen. Den har ingen service worker ennå, så den trenger nett.',
    'Ads and Remove ads':
      'react-native-google-mobile-ads viser banneret etter samtykkeskjemaet fra Google. expo-iap sjekker kjøpet av Fjern reklame ved hver start, og nettbygget slår av reklamen.',
    'Property Trends Pro':
      'expo-iap sjekker Pro-kjøpet hos Google Play eller App Store ved hver start. Én sjekk i appen åpner leie og hele historikken.',
    'iPhone app':
      'Den samme Expo-koden bygges for iOS og stiller sporingsspørsmålet før AdMob starter. Foreløpig bygger en macOS-runner eller EAS appen for simulatoren.',
  },
};

export default arch;
