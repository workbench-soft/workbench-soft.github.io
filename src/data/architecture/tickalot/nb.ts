import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Én Expo-app kjører på Android og på nettet og holder hver liste i SQLite på enheten. En delt liste går også til Firestore, og appen har ingen egen server.',
  parts: [
    {
      name: 'Expo and React Native',
      role: 'én kodebase for Android-appen og nettstedet, som Firebase Hosting leverer.',
    },
    { name: 'SQLite', role: 'hver liste og vare på enheten gjennom expo-sqlite, på wasm i nettleseren.' },
    { name: 'Firestore', role: 'de delte listene, hyllene og rutene gjennom butikkene, bak en anonym innlogging.' },
    {
      name: 'Setningsparser og emojiordbok',
      role: 'regler på telefonen som deler en setning i varer og velger emoji og avdeling.',
    },
    { name: 'OpenStreetMap', role: 'butikksøket, og butikken telefonen står i.' },
    { name: 'Wikipedia and Wikidata', role: 'byen og severdighetene, lest gjennom Tripforge-Workeren når den svarer.' },
    { name: 'Coles and Woolworths', role: 'enhetsprisene, lest fra søket bak nettstedet til hver butikk.' },
    { name: 'Google Play', role: 'AdMob-reklame og kjøpene Fjern reklame og Pro gjennom expo-iap.' },
  ],
  flow: [
    'Personen skriver eller dikterer varene, og parseren deler dem.',
    'Telefonen lagrer hver vare i SQLite med en gang.',
    'Del sender listen til Firestore og åpner en lenke.',
    'Den andre telefonen åpner lenken og følger listen i Firestore.',
    'En hake på én telefon vises på den andre i løpet av 1 til 2 sekunder.',
  ],
  links: [
    {
      to: 'tripforge',
      text: 'En reiselenke fra Tripforge lager en liste med severdigheter og en pakkeliste. Severdighetslisten lenker tilbake for å planlegge flyene.',
    },
    { to: 'guitar-upscale', text: 'En sang i Sanger å lære åpnes i Guitar Upscale for å spille med.' },
    { to: 'Firebase', text: 'Firestore synkroniserer de delte listene, og Hosting leverer nettstedet.' },
    { to: 'OpenStreetMap', text: 'Nominatim finner en butikk etter navn, og Overpass finner butikken i nærheten.' },
    { to: 'Google Play', text: 'AdMob viser reklamen, og Play Billing selger Fjern reklame og Pro.' },
  ],
  design: {
    scale: [
      'En privat liste blir på én telefon, og en delt liste når en husstand eller noen få venner med én lenke.',
      'Appen har ingen server, så den gratis Firestore-planen på 50 000 lesinger og 20 000 skrivinger i døgnet setter budsjettet for delte lister.',
    ],
    data: [
      'SQLite på telefonen holder lister, varer, butikker, ganger, ruter, kjente navn og priser. Nettversjonen kjører den samme SQLite på wasm.',
      'Bare delte lister går til Firestore, som lists/{id}/items/{itemId}, og gangene og rutene i en butikk som stores/{osmId}.',
      'En sletting setter deleted = 1 og beholder raden. dirty = 1 markerer en endring Firestore ikke har mottatt ennå.',
      'Et bilde er en JPEG på 360 piksler, omtrent 30 KB, lagt inni varen.',
    ],
    interfaces: [
      'En delelenke har en tilfeldig liste-id på 32 heksadesimale sifre, og et intent filter i Android åpner den i appen.',
      'En reiselenke fra Tripforge har base64url-JSON med v, place, start, nights og opptil 60 steder.',
      'Prisene kommer fra JSON-en bak søket på nettsidene til Woolworths og Coles, butikkene fra Nominatim og Overpass, severdighetene fra Tripforge-Worker eller Wikidata.',
    ],
    reliability: [
      'Hver endring lagres først i SQLite, og skjermen tegnes fra den, så en avhuking virker uten dekning. Sendingen prøves på nytt hvert 30. sekund mens appen er åpen.',
      'Den nyeste updated-tiden vinner per vare, på telefonen og i Firestore-reglene. To offline-endringer av samme vare kan ikke slås sammen, og den siste tar hele varen.',
      'Lytteren går i ett minutt etter at appen er gått i bakgrunnen. En lukket app får ingen varsler, siden det krever en push-server.',
    ],
    security: [
      'Hver installasjon logger anonymt inn i Firebase, og den tilfeldige liste-iden i lenken er hemmeligheten. Firestore nekter å liste lister.',
      'Reglene sjekker 32-sifret hex-id, kjente felt, størrelsene og en tid som er høyst ett døgn fram. Et bilde må være JPEG-data eller et bilde fra Wikimedia Commons.',
      'Alle som har lenken kan lese, endre og slette listen, og Firebase App Check er foreløpig av.',
    ],
    performance: [
      'Sendingen venter et halvt sekund, så en rekke avhukinger går ut i én skriving.',
      'Priser lastes fra Woolworths 3 navn om gangen og fra Coles ett om gangen. De blir i SQLite i ett døgn, og bare prisene tegnes på nytt.',
      'Telefonen leser gangene i en butikk fra Firestore høyst én gang per 10 minutter.',
    ],
    operations: [
      'Checks og Release starter sammen ved hver push til main. Utgivelsen publiserer den signerte APK-en når Checks består, og en mislykket Checks avbryter bygget.',
      'En Google Play-bundle bygges én gang i døgnet klokken 19:00 Sydney-tid, og bare når appen er endret.',
      'Firebase Hosting leverer nettversjonen, og den rulles ut med Firestore-reglene etter bestått Checks. APK-en fra GitHub oppdaterer seg selv, og Play-bygget har ikke den koden.',
    ],
    tradeoffs: [
      'Expo framfor en innebygd Kotlin-app, så én kodebase også gir siden en delt lenke åpnes på.',
      'Firestore-rader framfor en egen server eller WebRTC: ingen server å drive, og en avhuking venter ikke på en sovende telefon.',
      'Den nyeste endringen vinner per vare framfor en sammenslåing av felt: mindre kode, men en eldre offline-endring går tapt.',
      'Firebase Hosting framfor GitHub Pages, fordi wasm-SQLite trenger COOP- og COEP-headere som Pages ikke kan sette.',
    ],
  },
  features: {
    'Share by link':
      'Firestore holder en kopi av hver delt liste, og lenken bærer den tilfeldige id-en. Hver telefon lagrer en endring i SQLite først og sender den når nettet er tilbake.',
    'Base list':
      'En liste laget fra en basis kopierer hver basisvare og husker hvilken den følger. En endring i basisen når kopiene personen lot være.',
    'Typing and dictating':
      'En regelbasert parser på telefonen deler setningen etter emojiordboken og tallene. expo-speech-recognition gjør tale til tekst gjennom talegjenkjenningen på telefonen.',
    Pictures:
      'En ordbok i appen gir navnet en emoji og en avdeling, på engelsk og russisk. Et bilde krympes til en liten JPEG som følger med varen.',
    'The store and the walk through it':
      'Overpass og Nominatim fra OpenStreetMap finner butikken. Appen lærer rekkefølgen på avdelingene fra hakene og lagrer den i SQLite.',
    'Shared aisles':
      'Hyller og ruter ligger i Firestore under butikkens OpenStreetMap-id. Hver telefon som velger butikken leser dem, og en skrevet hylle går opp med en gang.',
    'Prices at Coles and Woolworths':
      'Telefonen leser søket bak nettstedet til hver butikk og holder det første produktet i SQLite i et døgn. Den billigste enhetsprisen vises i grønt.',
    'Packing for a trip':
      'En pakkeliste er en kopi av en basis-pakkeliste i SQLite. Den deles gjennom Firestore som en hvilken som helst liste.',
    'Things to see':
      'Byen kommer fra Wikipedia og stedene fra Tripforge-Workeren eller Wikidata. Et k-means-steg på telefonen fordeler dem over dagene.',
    'Lists that are done':
      'En tidtaker på telefonen flytter en liste til arkivet 3 timer etter siste hake, eller etter 2 uker uten endring.',
    'Light and dark':
      'Temaet følger telefonen gjennom React Native, eller et valg i Innstillinger som blir på enheten.',
    Updates:
      'GitHub-bygget spør GitHub-releases etter en nyere APK og åpner Android-installasjonen. Google Play-bygget har ikke denne modulen.',
    Ads: 'AdMob viser bannerne og fullskjermreklamen etter Googles samtykkeskjema. Google Play Billing selger kjøpet Fjern reklame.',
    'Tick-a-Lot Pro':
      'Google Play Billing selger Pro gjennom expo-iap, og appen spør Play på nytt ved hver oppstart. Én modul avgjør hver lås.',
    'The weekly shop for two':
      'Én telefon lager listen fra en basis og deler den gjennom Firestore. Den andre huker av, og hver hake kommer tilbake på sekunder.',
    'Songs to learn':
      'En sangparser deler teksten bare ved komma. Hver sang får søkelenker til Guitar Upscale og til nettsteder med akkorder, tabber og video.',
    'Changing and deleting':
      'Hvert felt skrives til SQLite når personen forlater det. Sletting merker bare raden, så Angre og den andre telefonen virker.',
    Languages:
      'i18next holder de 9 katalogene, og expo-localization leser språket på telefonen. Teksten i listen blir som den ble skrevet.',
    'Finding Tick-a-Lot in search':
      'Etter Expo-eksporten skriver et byggeskript guidene, Om og sitemapen som enkel HTML. Appsidene har noindex, siden de viser lister til en person.',
    'Open source licences':
      'En byggeoppgave samler lisensteksten til hver pakke i en fil i appen. Innstillinger lister dem fra den filen.',
    'Long lists':
      'Studioets fast-scroll-pakke pakker inn hver lange liste. Listen følger knotten hvert bilde, og en skjult knott slipper trykk gjennom.',
  },
};

export default arch;
