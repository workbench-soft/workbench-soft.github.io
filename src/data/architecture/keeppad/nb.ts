import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'KeepPad er én Expo-app som gir Android-appen, iPhone-appen og nettstedet. Notatene blir i SQLite på telefonen, og bare delte notater går til Firebase.',
  parts: [
    {
      name: 'Expo og React Native',
      role: 'én kodebase for Android, iPhone og nettstedet, med skjermer fra expo-router.',
    },
    {
      name: 'Lyttetjeneste i Kotlin',
      role: 'Android-tjenesten i forgrunnen hører Hey Keep, tar opp notatet og spiller svarene.',
    },
    { name: 'sherpa-onnx', role: 'den lille nøkkelordmodellen på telefonen fanger vekkefrasene.' },
    {
      name: 'Talegjenkjenning på telefonen',
      role: 'taletjenesten i Android og gjenkjenneren fra Apple gjør tale om til tekst.',
    },
    { name: 'SQLite', role: 'notatene, loggen over sendte notater og listen over behandlede innganger, på telefonen.' },
    {
      name: 'Gemini Nano og Apple Foundation Models',
      role: 'modellen på telefonen velger en bedre gruppe mens appen er åpen.',
    },
    { name: 'Firebase', role: 'Firestore holder de delte notatene, og Hosting leverer nettstedet.' },
    { name: 'Google Play', role: 'AdMob-annonser, og kjøpene Fjern annonser og KeepPad Pro.' },
  ],
  flow: [
    'Lyttetjenesten hører «Hey Keep» også når appen er lukket.',
    'Den tar opp notatet og gjør talen om til tekst på telefonen.',
    'Tjenesten skriver notatet til en liten innboksfil.',
    'Appen lagrer det i SQLite og velger en gruppe etter ordene.',
    'Modellen på telefonen kan flytte notatet, og listen lastes på nytt.',
  ],
  links: [
    {
      to: 'memories',
      text: 'Et notat som starter med navnet på en person, går til dagboken deres på NAS-en hjemme via WebDAV.',
    },
    {
      to: 'lumiere-player',
      text: 'Med Wake Share hører KeepPad-tjenesten også «Hey Lumi» og sender den videre til Lumiere.',
    },
    { to: 'spotthecam', text: 'Den samme delte mikrofonen sender «Hey Spot» videre til SpotTheCam.' },
    { to: 'Firebase', text: 'Firestore holder delte notater oppdatert live, og Hosting leverer nettstedet.' },
    { to: 'Google Play', text: 'AdMob viser banneret, og Play Billing selger Fjern annonser og KeepPad Pro.' },
  ],
  design: {
    scale: [
      'Én person per installasjon. Notater blir på telefonen, og bare et delt notat når Firestore, som tekst på opptil 20 000 tegn.',
      'Hey Keep går hele dagen som en forgrunnstjeneste i Android, så batteriet formet designet: en lydterskel hopper over stille rammer.',
    ],
    data: [
      'SQLite keeppad.db holder notater, exports (hvilken app som fikk hvilket notat) og applied_inbox. PRAGMA user_version teller migreringstrinnene en telefon har kjørt.',
      'Opptak er WAV-filer i files/audio. Notater Hey Keep tar opp mens appen er lukket, er JSON-filer i files/keep-inbox.',
      'Innstillinger ligger i localStorage. Tokener til tilknyttede apper ligger i Android keystore eller iOS keychain via expo-secure-store.',
      'Et delt notat i Firestore holder bare text, group og updated.',
    ],
    interfaces: [
      'Kotlin-tjenesten og appen sender notater gjennom JSON-innboksen og en watch-hendelse, siden tjenesten ikke når SQLite.',
      'Tilknyttede apper får hvert nye notat gjennom sitt eget web-API. Obsidian får en fil i en valgt mappe, og en Memories-dagbok får det over WebDAV.',
      'expo-speech-recognition gjør tale om til tekst gjennom Androids taletjeneste eller Apples gjenkjenner.',
    ],
    reliability: [
      'Et langt opptak skriver en PCM-fil og en JSON-fil underveis, og etter et krasj gjør appen dem om til et notat.',
      'applied_inbox lagrer innboks-iden i samme transaksjon som notatet, så et krasj importerer ikke et fortsettelsesnotat to ganger.',
      'Hver lokale endring lagrer updated = MAX(now, updated + 1), så en telefon med treg klokke vinner likevel i Firestore.',
    ],
    security: [
      'Ingen kontoer og ingen taleforståelse i skyen. Vekkeordmodellen kjører på telefonen, så ingen lyd forlater den.',
      'Firestore-reglene krever en notat-id på 32 hex-sifre, nekter listing og tar bare imot text, group og updated. Ingen kan bla etter ider.',
      'Tokener til tilknyttede apper ligger utenfor notatfilen, i det sikre lageret.',
    ],
    performance: [
      'I et stille rom koster hver ramme på 100 ms én sum. sherpa-onnx-modellen på 3,3 millioner parametere kjører bare på høye rammer.',
      'Hver skriving øker notesVersion, og skjermene laster på nytt. Notatlisten med FlashList tegner bare radene på skjermen.',
      'Et ordtreff velger gruppen med en gang, og Gemini Nano eller Apple Foundation Models kjører bare mens appen er åpen.',
    ],
    operations: [
      'Checks og Release starter sammen ved hver push til main. Utgivelsen publiserer APK-en når Checks består, og beholder de 3 siste.',
      'En Play-bundle bygges med PLAY=1 én gang i døgnet klokken 19:00 Sydney-tid, når appen er endret. APK-en fra GitHub oppdaterer seg selv.',
      'Firebase Hosting leverer nettstedet, og det rulles ut med Firestore-reglene etter bestått Checks. iPhone-bygget kjører bare for hånd på macOS.',
    ],
    tradeoffs: [
      'Expo med Kotlin- og Swift-moduler framfor en innebygd Android-app, for iPhone og nettet, til prisen av native kode ved siden av TypeScript.',
      'En forgrunnstjeneste med sherpa-onnx framfor et vekkeord i JavaScript, så den hører med skjermen av. Modellen kan bare engelsk.',
      'Telefonens egen talegjenkjenner framfor en modell i APK-en. Telefonen har allerede engelsk og russisk, så appen leverer ingen modell.',
      'En GitHub-APK som oppdaterer seg selv og et Play-bygg med stubber framfor ett bygg, siden Play avviser apper som installerer oppdateringer selv.',
    ],
  },
  features: {
    'Hey Keep':
      'En Kotlin-tjeneste i forgrunnen hopper over stillhet og kjører en sherpa-onnx-modell på høye lyder. Svarene spilles fra klipp tatt opp per stemme, og tilpasningen setter en terskel per frase.',
    'Long recording':
      'Tjenesten skriver lyden til en midlertidig fil mens den tar opp. Etter et krasj gjør appen filen om til et notat og henter teksten fra lyden.',
    'Stop and continue':
      'Nøkkelordmodellen og gjenkjenneren lytter begge etter «Stop». Etter «continue» legger tjenesten de nye ordene og lyden til det nyeste notatet.',
    'Record by button':
      'expo-speech-recognition viser ordene på skjermen mens personen snakker. Notatet går til SQLite med lyden der telefonen tillater det.',
    Recordings:
      'Appen tar opp lyden selv og gir den til gjenkjenneren. WAV-filen blir liggende på telefonen ved siden av notatet.',
    Groups:
      'Et søk på engelske og russiske ordstammer velger en gruppe med en gang. Gemini Nano eller Apple Foundation Models kan velge en bedre mens appen er åpen.',
    Languages:
      'Gjenkjenneren på telefonen forstår engelsk og russisk, uten nett med språkpakkene. i18next holder skjermene i 9 kataloger.',
    'Share by link':
      'Notatet går til Firestore, og lenken åpner det i appen eller en nettleser. En lytter holder begge kopiene oppdatert, og den nyeste endringen vinner.',
    'Send to other apps':
      'Hver tilkoblet app får det nye notatet gjennom sitt eget nett-API. Obsidian får en fil i en valgt mappe, og påloggingstokener ligger i det sikre lageret.',
    Website:
      'Expo eksporterer hver rute som en statisk side, og Firebase Hosting leverer den. Et delt notat lastes fra Firestore i nettleseren.',
    'In-app update':
      'GitHub-bygget leser listen over utgivelser ved start og ved retur. Det laster ned APK-en og åpner Android-installasjonen. Play-bygget har ikke denne koden.',
    'Light and dark theme':
      'Temamodulen følger fargeoppsettet på telefonen eller et fast valg. Valget blir på telefonen sammen med de andre innstillingene.',
    Ads: 'Google Mobile Ads-biblioteket viser AdMob-banneret på startskjermen. I Europa spør samtykkeskjemaet fra Google først.',
    'Remove ads':
      'expo-iap selger produktet gjennom Google Play Billing. Gjenopprett kjøp henter det tilbake på en ny telefon med samme konto.',
    'Loud sound from the phone speaker':
      'Den native modulen sender hver lyd til den innebygde høyttaleren med full styrke. En forsterker legger til 6 dB, og volumet går tilbake etter lyden.',
    'Notes about a person go to Memories':
      'Appen sammenligner det første ordet i notatet med navnene i Memories. Det ryddede og daterte notatet går til den dagboken via WebDAV.',
    'KeepPad Pro':
      'expo-iap selger Pro gjennom Google Play, og én Pro-modul sjekker det før hver låst handling. En refusjon slår av Pro ved neste start.',
    'Fast scroll':
      'Studioets fast-scroll-pakke pakker inn notatlisten. Listen følger knotten hvert bilde. iOS og nettet beholder sitt eget rullefelt.',
  },
};

export default arch;
