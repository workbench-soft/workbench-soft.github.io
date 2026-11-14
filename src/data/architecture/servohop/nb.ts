import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'En poller på GitHub Actions skriver delstatenes drivstoffpriser inn i Cloudflare D1. Pages Functions leser D1 for appen og søkesidene, og én Expo-app tegner kartet på Android, iPhone og nettet.',
  parts: [
    {
      name: 'Poller på GitHub Actions',
      role: 'henter hver kilde etter en plan og skriver de endrede prisene til D1.',
    },
    {
      name: 'Delstatenes priskilder',
      role: 'NSW FuelCheck, Servo Saver i VIC, Fuel Prices QLD og FuelWatch WA gir prisene.',
    },
    {
      name: 'Kilder for ladere',
      role: 'Open Charge Map, Transport for NSW og OpenStreetMap, slått sammen så hver lader vises én gang.',
    },
    { name: 'Cloudflare D1', role: 'prisene nå, og en trigger som fører den daglige historikken.' },
    {
      name: 'Cloudflare Pages Functions',
      role: 'svarer appen gjennom API-et og lager søkesidene og nettstedskartene.',
    },
    { name: 'Expo og React Native', role: 'én kodebase for Android, iPhone og nettsiden.' },
    { name: 'MapLibre og OpenFreeMap', role: 'kartet i nettleseren og på telefonene, med fliser uten nøkkel.' },
    {
      name: 'Hey Servo-modul',
      role: 'en Expo-modul i Kotlin med en vekkeordmodell uten nett og talegjenkjenningen i Android.',
    },
  ],
  flow: [
    'Polleren leser delstatenes kilder, hver time for NSW, VIC og QLD.',
    'Bare endrede priser kommer i D1, og en trigger legger dem til historikken.',
    'Appen spør en Pages Function om stasjonene i kartutsnittet.',
    'Kantbufferen svarer på gjentak i 5 minutter, og D1 svarer på resten.',
    'Appen farger hver nål etter pris og lister stasjonene.',
  ],
  links: [
    {
      to: 'spotthecam',
      text: 'Hey Servo følger oppbyggingen til Hey Spot. Én app holder mikrofonen for hver vekkefrase.',
    },
    {
      to: 'keeppad',
      text: 'keepPad og Lumiere deler samme mikrofon gjennom biblioteket wakeshare.',
    },
    {
      to: 'Google Maps',
      text: 'Et trykk på veibeskrivelsen eller en Hey Servo-kommando åpner navigasjonen i Google Maps.',
    },
    { to: 'Google Play', text: 'Fjern reklame og ServoHop Pro selges som engangskjøp. AdMob viser banneret.' },
    { to: 'GitHub Releases', text: 'Hver utgivelse legger APK-en der, og GitHub-bygget oppdaterer seg selv derfra.' },
  ],
  features: {
    'Fuel prices on a map':
      'En Pages Function gir opptil 400 stasjoner i utsnittet fra D1. Appen deler prisene på skjermen i tredjedeler og farger nålene.',
    'Your place on the map':
      'På telefonene gir expo-location posisjonen og kompassretningen. På nettet gjør nettleserens posisjons- og retningshendelser det samme.',
    'Station list':
      'Listen viser de samme stasjonene som kartet fra samme svar. Avstanden er en rett linje fra telefonen.',
    'Price history chart':
      'En Pages Function leser dagsradene fra D1, og felles grafkode fører prisen videre over dager uten endring. react-native-svg tegner linjen og båndet.',
    'Driver price reports':
      'Appen sender meldingen til en Pages Function, som sjekker spennet og timegrensen per avsender. Prisen havner i D1.',
    'EV chargers':
      'Polleren slår sammen laderne fra 3 åpne kilder hver dag. Meldinger fra sjåfører holder prisen per kWh for hvert nett i D1.',
    'Search pages':
      'Pages Functions lager enkel HTML for hver delstat, forstad og stasjon, med grafen som SVG. Kanten holder hver side i 30 minutter.',
    'Site text and guides':
      'Et byggesteg skriver forsideteksten inn i den eksporterte HTML-en. Pages Functions leverer guidene fra tekster i repoet.',
    'Self-update from GitHub':
      'Appen spør GitHub Releases etter en nyere APK og gir den til Android-installasjonen. Google Play-bygget bytter oppdateringskoden mot tomme erstatninger.',
    'Remove ads':
      'expo-iap selger produktet gjennom Google Play. Kjøpet følger Google-kontoen, og Gjenopprett henter det tilbake på en ny telefon.',
    'ServoHop Pro':
      'expo-iap sjekker Pro-kjøpet ved hver start. Én sjekk i appen åpner grafen for 365 dager og skjuler reklamen.',
    'Area search':
      'En Pages Function finner forstaden eller postnummeret i stasjonstabellen gjennom 2 indekser. Den trenger ingen ekstern geokoder og ingen nøkkel.',
    'Hey Servo':
      'sherpa-onnx hører vekkefrasen på telefonen, og talegjenkjenningen i Android hører kommandoen. Svaret kommer fra ServoHop-API-et.',
    'Fuel panel':
      'Valget setter drivstoffet i hvert kall til API-et, og appen husker det til neste start. En lader telles etter sin sterkeste kontakt.',
    Ads: 'react-native-google-mobile-ads viser banneret i appen etter samtykkeskjemaet. På nettsiden og søkesidene fyller AdSense det.',
    Languages: 'i18next holder de 9 katalogene, og expo-localization leser språket på telefonen eller i nettleseren.',
  },
};

export default arch;
