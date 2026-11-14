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
