import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Sky Altar er én Expo-app for Android og nettet uten egen server. Astronomy Engine og stjernedata i appen gir himmelen, og Skia tegner den.',
  parts: [
    {
      name: 'Expo og React Native',
      role: 'én kodebase for Android-appen og nettstedet, med navnene i telefonens skrifter.',
    },
    { name: 'Skia', role: 'tegner hele himmelen som ett bilde per ramme på GPU-en.' },
    { name: 'Astronomy Engine', role: 'plasserer solen, månen og planetene og regner ut fødselshoroskopene.' },
    { name: 'Data fra d3-celestial', role: 'de 2851 stjernene ned til størrelse 5,5 og IAU-figurene med navn.' },
    { name: 'expo-camera', role: 'tar et lydløst bilde hvert 1,5 sekund for stjernesammenligningen.' },
    { name: 'Media3 ExoPlayer', role: 'en Kotlin-modul som spiller musikken i løkke på høyttaleren med fast volum.' },
    { name: 'Cloudflare R2', role: 'leverer bildene og sporene til de betalte temaene.' },
    { name: 'Google Play Billing og AdMob', role: 'selger Fjern reklame og Pro og viser reklamen etter samtykke.' },
  ],
  flow: [
    'Rotasjonssensoren eller en finger snur visningen av himmelen.',
    'Hvert sekund gjør Astronomy Engine hver stjerne om til en posisjon over horisonten.',
    'Hver ramme projiserer stjernene og figurene på skjermen.',
    'Skia tar opp tegningene, linjene og stjernene som ett bilde.',
    'React Native skriver navnene over, og kamerastjernene lyser øverst.',
  ],
  links: [
    { to: 'songfactory', text: 'Temasporene kommer fra Suno gjennom Songfactory, med én stillinje per tema.' },
    { to: 'tickalot', text: 'Oppdateringssjekken er en kopi av den i Tick-a-Lot.' },
    { to: 'app-updater', text: 'WBS Updater installerer samme APK fra de felles utgivelsene.' },
    { to: 'Google Play', text: 'Google Play Billing selger Fjern reklame og Pro.' },
    { to: 'Open-Meteo', text: 'Søket etter fødebyen sender bare navnet du skrev og får tilbake stedet og tidssonen.' },
  ],
  design: {
    scale: [
      'En person per installasjon, uten konto og uten egen server.',
      'Himmelen har 2851 stjerner, 89 figurer og 19 kulturtemaer, tegnet som rundt 3000 punkter per bilde.',
      'Bare de 2 gratis temaene følger med i appen, og hvert betalbilde er rundt 30 KB fra et CDN.',
    ],
    data: [
      'Stjerner, figurer og navn er JSON i appen. Fortellingene ligger i én .lore-fil per språk.',
      'Innstillinger og lagrede fødselsdata ligger i localStorage, eller i expo-sqlite på telefonen.',
      'Telefonen lagrer nedlastede bilder og spor i appens dokumentmappe.',
    ],
    interfaces: [
      'En manifest.json på CDN-et knytter hvert temabilde til en fil som er oppkalt etter innholds-hashen.',
      'expo-iap leser to Google Play-produkter. Oppdateringssjekken leser den delte GitHub-utgivelseslisten.',
      'Open-Meteo-geokodingen får et skrevet bynavn og gir tilbake stedet og tidssonen.',
    ],
    reliability: [
      'Et tema som er lastet ned én gang, virker uten nett, og gratistemaene virker uten nett fra første start.',
      'Et bilde som ikke lastes ned, prøves på nytt etter ett minutt.',
      'Gyroskopet flytter visningen, og kompasset retter den bare under en dreining, så himmelen ikke sakte vandrer.',
    ],
    security: [
      'Ingen innlogging og ingen server. Lagrede fødselsdata blir på telefonen.',
      'Open-Meteo får bare det skrevne bynavnet. Kamerabildene leses på telefonen.',
      'Googles samtykkeskjema vises i EØS, Storbritannia og Sveits før en annonse. Signeringsnøkkelen ligger utenfor repoet.',
    ],
    performance: [
      'En horisontbuffer i typede arrayer fylles på én gang i sekundet, så et bilde ikke lager noe objekt per stjerne.',
      'Skia tar opp ett bilde per ramme til visningen, uten React-rendering. En stille visning tegnes om rundt 8 ganger i sekundet.',
      'Bildeuskarpheten lages én gang ved lasting, og filnavn med hash lar CDN-et og telefonen bufre i ett år.',
    ],
    operations: [
      'Checks kjører lint, tester og Android- og web-bunter ved hver push til main, og Release bygger den signerte APK-en ved siden av.',
      'Publish legger APK-en i den delte utgivelseslisten, som beholder de 3 siste byggene per app.',
      'mise run deploy laster opp nye bilder, spor og manifestet, så et omtegnet bilde trenger ingen appversjon.',
    ],
    tradeoffs: [
      'Skia i stedet for react-native-svg, som er for tregt for 3000 punkter per bilde. Prisen er en CanvasKit-fil på 7 MB på nettet.',
      'Navn i React Native i stedet for Skia-avsnitt, så kinesisk, japansk og koreansk bruker telefonens skrifter.',
      'd3-celestial-data i stedet for Stellarium-stjernehimmelkulturer, som blander lisenser og delvis er GPL.',
      'Astronomy Engine i stedet for Swiss Ephemeris, som er AGPL eller betalt og trenger et nativt bygg per plattform.',
    ],
  },
  features: {
    'Sky view':
      'Rotasjonssensoren flytter visningen, og gyroen holder den rolig mellom kompassrettingene. Skia tegner stjernene, himmellegemene og 88 figurer fra data i appen.',
    Clock:
      'Et lag i React Native tegner klokkeslett og dato i temaets skrift. En tidtaker går hvert minutt, og klokken dempes sammen med knappene.',
    'Camera stars':
      'Appen tar et lydløst bilde hvert 1,5 sekund og finner lyspunktene i JavaScript. Punkter som passer med stjernekatalogen blinker gull over himmelen.',
    'Culture themes':
      'En post per kultur setter farger, linjestil og skrift. Hvert bilde festes til 3 stjerner i figuren, og de betalte temaene lastes ned én gang fra Cloudflare R2.',
    'Ambient music':
      'En Kotlin-modul på Media3 ExoPlayer spiller sporet i løkke med overtoning, innebygd eller fra CDN-et. En filvelger kopierer dine egne filer eller en mappe inn i appen.',
    'Ads and Remove ads':
      'AdMob viser bannere på temaarket og i innstillingene, pluss én fullskjermsannonse høyst hvert 30. minutt. Google Play Billing selger Fjern reklame.',
    'Sky Altar Pro':
      'Google Play Billing selger Pro-produktet, og én sjekk avgjør hver lås. Nettversjonen har ingen butikk og åpner Pro-delene.',
    'App languages': 'i18next holder 9 kataloger for skjermene. Figurnavnene og sagnfilene finnes også på hvert språk.',
    'Updates from GitHub':
      'Oppdateringssjekken leser de felles GitHub-utgivelsene, laster ned APK-en og gir den til installasjonsprogrammet. Google Play-bygget bytter sjekken mot tomme erstatninger.',
    Astrology:
      'Astronomy Engine plasserer planetene i fødselshoroskopet, med hele tegn som hus. Open-Meteo finner fødebyen, og de lagrede fødselsdataene blir på telefonen.',
    'Constellation navigation':
      'En virtualisert liste filtrerer katalogen og regner om etikettpunktet til hvert stjernebilde til himmelen nå. Et trykk fører visningen dit på 450 ms.',
    'Constellation lore':
      'Hvert kort leser fortellingen til temaets kultur fra en sagnfil per språk. Stjernefaktaene kommer fra Hipparcos-dataene i ESA Gaia-arkivet.',
    'Long lists':
      'Studioets fast-scroll-pakke pakker inn begge listene, og hver liste tegner bare radene på skjermen. Knotten får en dempet arkfarge eller temaets etikettfarge.',
  },
};

export default arch;
