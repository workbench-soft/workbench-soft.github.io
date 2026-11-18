import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'En statisk Next.js-side på Cloudflare viser kamerakartet, og Capacitor pakker de samme filene inn i appene for Android og iPhone. Nativ kode i Kotlin og Swift styrer kjørefunksjonene, og en liten Worker lagrer delte turer.',
  parts: [
    {
      name: 'Bygg av kameradata',
      role: 'et TypeScript-skript i CI som hver natt slår sammen listene fra delstatene og New Zealand til én JSON-fil.',
    },
    { name: 'OpenStreetMap', role: 'punktet for hvert kamera, fartsgrensene og de tidsstyrte grensene i skolesoner.' },
    { name: 'Next.js', role: 'en statisk eksport med kartet, sidene og en side per kamera.' },
    {
      name: 'Leaflet og MapLibre',
      role: 'Leaflet tegner kameraer og turer, og MapLibre maler OpenFreeMap-flisene under dem.',
    },
    { name: 'Cloudflare Worker og KV', role: 'leverer siden og lagrer turene folk deler.' },
    {
      name: 'Capacitor og Kotlin',
      role: 'Android-skallet, med native tjenester for fart, varsler, turer, ruter og Hey Spot.',
    },
    { name: 'Photon, Valhalla og TomTom', role: 'stedsøk, ruter med svinger og dagens trafikk.' },
    { name: 'Swift og StoreKit 2', role: 'iPhone-versjonen av kjøre- og rutekoden, og kjøpene i App Store.' },
  ],
  flow: [
    'Hver natt henter en CI-jobb kameralistene fra delstatene og New Zealand.',
    'OpenStreetMap legger til punktet og fartsgrensen for hvert kamera.',
    'Next.js bygger siden, og Cloudflare leverer den med kamerafilen.',
    'Nettleseren velger grensen for minuttet nå og tegner kartet.',
    'På telefonen leser en nativ tjeneste samme fil og varsler om kameraer foran.',
    'Turene blir på telefonen til personen deler en.',
  ],
  links: [
    {
      to: 'keeppad',
      text: 'Hey Spot bruker samme vekkeordmodell som keepPad. Én app holder mikrofonen for begge frasene.',
    },
    { to: 'lumiere-player', text: 'Hey Lumi deler mikrofonen med Hey Spot gjennom det samme vekkeordbiblioteket.' },
    {
      to: 'Google Maps',
      text: 'Start åpner Google Maps med stoppene i beste rekkefølge, og appen fortsetter å varsle.',
    },
    { to: 'Google Play', text: 'Play Billing selger Fjern reklame og SpotTheCam Pro. AdMob viser banneret i appen.' },
    { to: 'GitHub Releases', text: 'Hver utgivelse legger APK-en der, og GitHub-bygget oppdaterer seg selv derfra.' },
  ],
  design: {
    scale: [
      'Én sjåfør per installasjon. Kamerafilen har rundt 13 700 kameraer, ett per linje.',
      'Siden er statiske filer, så bare deling av turer trenger en server. Én liten Worker holder seg i Cloudflares gratisnivå.',
      'En delt tur er begrenset til 1 MB og 100 000 punkter, og én adresse kan dele 10 turer i minuttet.',
    ],
    data: [
      'data/cameras.json har ett kamera per linje: type, delstat, punkt, vei, forstad, kilde, fartsgrense og retning.',
      'Turer ligger i appens private lagring i 400 dager. Fartsgrenser for veiene blir på telefonen i 60 dager.',
      'En delt tur ligger i Cloudflare KV under en id på 10 tegn, som tynnede rutelinjer og summer uten tider.',
    ],
    interfaces: [
      'Workeren svarer på POST /api/trips og på GET og DELETE på /api/trips/<id>. Alt annet er statiske filer.',
      'Capacitor-plugins knytter nettsiden til Kotlin-kjøretjenestene og Swift-portene deres.',
      'Overpass-fliser gir veier, jernbaner og rullebaner. Photon, Valhalla og TomTom svarer på steder, ruter og trafikk.',
    ],
    reliability: [
      'Service workeren prøver nettet først og faller tilbake på kopien etter 4 sekunder, med opptil 500 kartfliser lagret for bruk uten nett.',
      'En lagringsfeil i Workeren går ut som 503 med CORS-headere, så appen leser den som en feil og ikke som manglende signal.',
      'Når en offentlig ruteserver ikke svarer, sier stemmen fra. Over TomTom-grensen får rutene ingen trafikk.',
    ],
    security: [
      'Deling krever ingen innlogging. KV lagrer bare en SHA-256-hash av slettenøkkelen, så lesing av lageret gir ikke tilgang til å slette turer.',
      'Workeren sjekker hver kropp med en streng parser og sender nosniff og en policy med default-src none.',
      'Turer blir på telefonen til de deles. En delt tur har ingen tider, og fart ved kameraer holdes utenfor uten samtykke.',
    ],
    performance: [
      'Kotlin-tjenester matcher GPS mot veier i hurtigbufferen på telefonen og varsler rundt 20 sekunder før et kamera, uten nett.',
      'Nattbygget gjør tidsstyrte grenser om til vinduer for de neste 35 dagene, så nettleseren bare velger det gjeldende.',
      'KV hurtigbufrer en delt tur i ett minutt nær leseren, og fliser lagres uten OpenFreeMaps ukentlige mappenavn.',
    ],
    operations: [
      'En CI-jobb oppdaterer kameraene klokken 03 Sydney-tid og committer filen med ett kamera per linje, så diffene blir små.',
      'Hver push til main ruller siden ut til Cloudflare. En nattjobb sender Android-pakken til Google Play når appen er endret.',
      'APK-bygget fra GitHub oppdaterer seg selv fra GitHub Releases. Google Play-bygget har ikke den koden.',
    ],
    tradeoffs: [
      'En statisk Next.js-side i et Capacitor-skall framfor Expo, så kartet og sidene deler én kodebase, på bekostning av en Worker for turer.',
      'En daglig JSON-fil framfor en database bak et API, så det virker uten nett og uten server, på bekostning av en liste som kan være en dag gammel.',
      'Native Kotlin-kjøretjenester framfor JavaScript i WebView, siden Android pauser WebView når skjermen er av.',
      'Leaflet med OpenFreeMap-fliser framfor Google Maps eller Mapbox, siden det ikke trenger nøkkel og ikke har kvote.',
    ],
  },
  features: {
    'Camera map':
      'Nattbygget gjør de tidsstyrte grensene for hvert kamera om til vinduer for de neste 35 dagene. Nettleseren velger vinduet for minuttet nå.',
    'Search and filter':
      'Siden bygger en indeks over forsteder fra kamerafilen og søker i den i nettleseren. Ingen server er med.',
    'Camera types':
      'Hvert kamera har typen sin fra kildelisten. Nettleseren husker valget, og Android-appen varsler bare om typene på kartet.',
    'Follow me':
      'Siden dreier kartet etter GPS-kursen mens personen beveger seg. MapLibre dreier gateflisene med sin egen vinkel, så navnene står rett.',
    'Camera details':
      'Vinduet leser kamerafilen som følger med siden. Hver kilde i typelisten har lenken til sin offisielle side.',
    'Offline map':
      'En service worker holder siden, kamerafilen og opptil 500 kartfliser på enheten. Et nettmanifest lar nettleseren installere den som en app.',
    'Light and dark theme': 'Temaet virker før siden tegnes. En vektorstil gir det mørke kartet lyse veier i koden.',
    Languages:
      'i18next holder 9 kataloger for kartet og appskjermene. Android-varsler henter teksten fra Android-strengfilene.',
    'Site pages and ads':
      'Next.js skriver en statisk side per delstat, forstad og kamera ved bygging. AdSense fyller banneret på nettsiden.',
    'Speed badge':
      'Kotlin-kode kobler GPS-posisjonen til veiene i OpenStreetMap og grensene deres. Aktivitetsmeldingene fra Android og formen på jernbane og rullebaner skiller bil fra tog eller fly.',
    'Camera warnings':
      'En Kotlin-tjeneste ser etter kameraer foran på kursen og snakker omtrent 20 sekunder før. Veiformene ved kameraet viser hvilken side det står på.',
    'Camera alerts stay ready':
      'Aktivitetsmeldingene fra Android og et gjerde på 300 m rundt siste parkering starter kjøretjenesten. En gjennomsiktig skjerm starter den igjen etter omstart eller oppdatering.',
    'Over the limit':
      'Fartsgrensene kommer fra OpenStreetMap via Overpass og blir på telefonen i 60 dager. En Kotlin-sjekk snakker etter 5 sekunder over grensen.',
    'School zones':
      'De tidsstyrte grensene i OpenStreetMap gir tidene for sonen. En liste over de publiserte skoleterminene i NSW inne i appen gir skoledagene.',
    'Loud warnings':
      'Hver lyd spilles som alarm i den innebygde høyttaleren, og appen skrur opp volumet til ordene er ferdige. Bryterne i Innstillinger gir utgangen tilbake.',
    "Streets in Maisie's voice":
      'PC-en leser hver navngitte vei i Australia og New Zealand med edge-tts og legger opptakene i Cloudflare R2. Telefonen henter opptakene av gatene rundt seg og holder dem i hurtigbufferen.',
    "Author's voice":
      'En åpen talemodell på en PC laget varselordene av utviklerens egen stemme. Opptakene ligger i appen, og Pro låser dem opp.',
    'Trip log':
      'Kotlin-tjenester tar opp hver kjøretur og gåtur med farten ved hvert kamera. Turene blir i appens private lagring i 400 dager.',
    'Trip line by limit':
      'Hvert lagret punkt holder farten og OpenStreetMap-grensen for veien. Kartet farger hver del av linjen ut fra de to.',
    'Trip stats':
      'Appen regner ut tallene på telefonen fra punktene i turen. En strekning under 20 km/t i 3 minutter eller mer teller som kø.',
    'Share a trip':
      'Appen sender en tynnet rute til en Cloudflare Worker, som lagrer den i KV under sin egen id. Slutt å dele sletter den der.',
    Distance: 'Sifrene leser totalene kjøretjenesten lagrer på telefonen. Ingen server er med.',
    'Turn by turn routes':
      'Valhalla tar tiden mellom hvert par av stopp, og appen prøver hver rekkefølge. TomTom velger veier rundt trafikken, og et navigasjonsbibliotek fra MapLibre følger bilen.',
    'Route options':
      'Avkrysningene sender gange eller unngå bomvei til rutetjenestene. Favoritter blir på telefonen, og Hey Spot kjenner dem igjen på navnet.',
    'Hey Spot':
      'sherpa-onnx hører vekkeordene på telefonen uten nett. Talegjenkjenningen i Android hører resten, og Photon finner stedene.',
    'Hey Spot, what street am I on?':
      'Appen leser navnet og grensen til OpenStreetMap-veien under bilen. Talesyntesen på telefonen sier dem.',
    'Screen stays on':
      'Android-vinduet til appen ber systemet holde skjermen på. Det slutter når appen går i bakgrunnen.',
    'Self-update':
      'GitHub-bygget spør GitHub Releases etter en nyere APK og gir den til Android-installasjonen. Google Play-bygget har ikke oppdateringskoden.',
    'Same app on the iPhone':
      'Capacitor pakker den samme siden for iOS. Swift-versjoner av Kotlin-koden for kjøring og ruter gjør det native arbeidet, og StoreKit 2 selger Pro.',
  },
};

export default arch;
