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
