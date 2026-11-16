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
  design: {
    scale: [
      'Én installasjon per telefon og ingen konto, så lasten er lesing av åpne priser fra sjåfører og søkemotorer.',
      'Gratisnivåene la rammene: 100k Pages-forespørsler, 100k skrevne D1-rader og 10 ms CPU per forespørsel i døgnet.',
      'Et kartsvar rommer opptil 400 stasjoner for utsnittet på skjermen.',
    ],
    data: [
      'D1 holder station, price_now, price_daily, price_report, ev_site og ev_price. Stasjons-id-en bærer kilden, som nsw-1234.',
      'price_now har én rad per stasjon og drivstoff. En trigger legger hver endring inn i price_daily med døgnets laveste, høyeste og antall.',
      'Telefonen beholder bare drivstoffvalget og innstillingene. Prisene bor i D1.',
    ],
    interfaces: [
      'Appen kaller JSON-ruter under /api: stasjonene i et kartutsnitt, historikken til én stasjon, meldinger og ladere.',
      'De samme Functions gir ren HTML under /fuel og sitemaps til søkemotorene.',
      'Polleren leser WA RSS, API-ene til NSW, VIC og QLD, Open Charge Map og OpenStreetMap, og skriver med wrangler d1 execute.',
    ],
    reliability: [
      'En kilde uten nøkkel hoppes over, så jobben holder seg grønn og de andre delstatene oppdateres.',
      'Hver upsert ender med WHERE price_now.cents <> excluded.cents, så en ny kjøring skriver ingen rad to ganger.',
      'Pollingen stopper mens den egne runneren er nede. En pris vises opptil 5 minutter for sent, og VIC-priser kommer 24 timer etter.',
    ],
    security: [
      'Ingen innlogging og ingen konto. Avsenderen av en melding er en saltet hash av adressen, ikke adressen.',
      'En melding må bestå en kontroll av prisområdet og en grense på 10 i timen per avsender.',
      'Kildenøklene ligger i GitHub Actions-secrets som bare polleren leser. Appen har ingen.',
    ],
    performance: [
      'API-svar har s-maxage=300, og appen runder utsnittet til 2 desimaler, så nære kartforflytninger deler ett bufret svar.',
      'Søkesider bufres i 30 minutter, historikken i en time og sitemaps i 6 timer.',
      'NSW-lista på flere MB tolkes på runneren, siden en gratis Worker bare får 10 ms CPU.',
    ],
    operations: [
      'Kontrollene kjører ved hver push. Release bygger APK og Play-pakken samtidig, og mislykkede kontroller avbryter dem.',
      'Deploy web bruker db/schema.sql på den levende D1-en og publiserer så Pages. Hver setning i skjemaet er IF NOT EXISTS.',
      'Pollingen går på cron: hver time for NSW, VIC og QLD, hver 6. time for Tasmania, daglig for WA og ladere.',
    ],
    tradeoffs: [
      'Pages Functions og D1 i stedet for Firebase eller en betalt server, så et kartutsnitt er én SQL-spørring innenfor gratisnivået.',
      'En daglig oppsummering i stedet for en rad per polling, så timespollingen holder seg under skrivegrensen. En dag uten endring har ingen rad.',
      'En poller på GitHub Actions i stedet for en Worker-cron, fordi tolkingen av NSW-lista tar mer enn 10 ms.',
      'MapLibre med OpenFreeMap-fliser i stedet for Google Maps, så ingen nøkkel og ingen regning, mot to kartbygg.',
    ],
  },
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
    'Links open the app':
      'intentFilters med autoVerify i app.config.ts gjør krav på servohop.com, servohop.com/.well-known/assetlinks.json bekrefter det, og src/links/site-link.ts gjør hver adresse om til en rute.',
    'Open source licences':
      'Ved bygging leser scripts/licences.ts package.json og skriver src/licences/licences.json, som Innstillinger viser.',
  },
};

export default arch;
