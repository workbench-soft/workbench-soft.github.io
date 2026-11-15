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
