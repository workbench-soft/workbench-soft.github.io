import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Én Kotlin-app for Android-telefoner og Google TV spiller filer fra telefonen, en USB-pinne eller en SMB-deling med libVLC. Bibliotekene og stedene blir liggende på enheten i SQLite, og APK-en fra GitHub legger til musikk fra nettet.',
  parts: [
    {
      name: 'Kotlin og Android Views',
      role: 'skjermene for fjernkontrollen og for berøring, i én app for telefon og TV.',
    },
    { name: 'libVLC', role: 'spiller video og musikk, leser taggene og blar i SMB-delingene.' },
    { name: 'SQLite', role: 'posisjonene, bibliotekene for musikk, bøker og video og stedet i hver bok.' },
    { name: 'Media3', role: 'musikkøkten med varselet, låseskjermen og Bluetooth-knappene.' },
    { name: 'WorkManager', role: 'skanner mappene for musikk, bøker og video i bakgrunnen.' },
    { name: 'sherpa-onnx', role: 'nøkkelordgjenkjenneren som hører Hey Lumi på telefonen.' },
    {
      name: 'Chaquopy og yt-dlp',
      role: 'nettmodulen med navn fra MusicBrainz og lyd fra YouTube, bare i APK-en fra GitHub.',
    },
    { name: 'Google Play Billing og AdMob', role: 'kjøpene Pro og Fjern reklame, og banneret på telefonen.' },
  ],
  flow: [
    'Personen legger til en telefonmappe, en USB-pinne eller en SMB-deling.',
    'En skanning i bakgrunnen skriver navn og tagger til SQLite på enheten.',
    'Hjemskjermen viser filene, sangene, bøkene og videoene.',
    'Et trykk, en knapp på fjernkontrollen eller en talekommando velger hva som spilles.',
    'libVLC spiller det, og appen lagrer stedet underveis.',
  ],
  links: [
    { to: 'guitar-upscale', text: 'Finn tabs åpner Guitar Upscale på sangen som spilles, gjennom en Android-lenke.' },
    { to: 'spotthecam', text: 'Hey Lumi deler mikrofonen med Hey Spot, så begge frasene virker samtidig.' },
    { to: 'keeppad', text: 'Hey Lumi bruker samme nøkkelordmodell som Hey Keep og deler mikrofonen med den.' },
    { to: 'GitHub', text: 'APK-en og oppdateringene kommer fra utgivelsene på GitHub.' },
    { to: 'Google Play', text: 'Play-versjonen, oppdateringene og kjøpene Pro og Fjern reklame.' },
  ],
  design: {
    scale: [
      'Én APK for Android-telefoner og Google TV, én person per installasjon. Bibliotekene indekseres på enheten.',
      'Videoskanningen leser bare navn, uten å lese tagger, så en stor deling indekseres uten å åpne hver fil.',
      'To ABI-er leveres, armeabi-v7a og arm64-v8a, for å holde APK-en med libVLC liten.',
    ],
    data: [
      'SQLite på enheten: positions.db, library.db, books.db, book-places.db og videos.db.',
      'positions.db nøkler en rad på URI-en uten NAS-innloggingen, og en USB-fil også på navn og størrelse.',
      'Android-sikkerhetskopien tar med posisjoner og bokplasser, men ikke nas.xml og databasene med NAS-innlogging.',
    ],
    interfaces: [
      'libVLC leser file://, content:// og smb://. En Media3 MediaSessionService gir varselet, låseskjermen og Bluetooth-knappene.',
      'Tale bruker SpeechRecognizer på enheten, og sherpa-onnx fanger vekkefrasen Hey Lumi. Guitar Upscale åpnes med en Android VIEW-lenke.',
      'Nettmodulen kaller MusicBrainz og Wikidata, og YouTube via yt-dlp, bare i GitHub-APK-en.',
    ],
    reliability: [
      'Spilleren lagrer posisjonen hvert 5. sekund, ved pause, stopp og avslutning, så et krasj koster sekunder.',
      'ScanWorker kjører på WorkManager for en ny mappe, ved oppstart og daglig på Wi-Fi, og oppslagene går sakte på én arbeidstråd.',
      'En Bluetooth-enhet som ikke spiller noe, sender lyden tilbake til høyttaleren.',
    ],
    security: [
      'Ingen konto og ingen egen server. Navn og tagger blir på enheten.',
      'NAS-lista med passord ligger i nas.xml, som Android-sikkerhetskopien utelater.',
      'SponsorBlock får bare et hash-prefiks av YouTube-id-en. Vekkemikrofonen kjører som en forgrunnstjeneste.',
    ],
    performance: [
      'libVLC spiller hver fil direkte, og en Media3-spiller pakker den inn for lyd, så én motor tjener video og musikk.',
      'LoudnessGate gir nøkkelordmodellen bare høye rammer og halve sekundet før dem, så et stille rom hopper over den.',
      'Omslag dekodes i sin egen størrelse med hurtigbuffer, og ordindeksen lister hvert ord én gang med bøkene sine.',
    ],
    operations: [
      'Et push til main starter Checks og Release side om side. Release signerer APK-en og publiserer den når Checks består.',
      'Hver bygge-runner beholder sin Gradle-tilstand, så Gradle bygger bare det som er endret. Utgivelseslista beholder de 3 nyeste.',
      'APK-en oppdaterer seg fra GitHub Releases ved oppstart. Play-pakken utelater oppdateringsmodulen og nettmodulen.',
    ],
    tradeoffs: [
      'Native Kotlin med vanlige Views i stedet for Expo, fordi spilleren er en libVLC-visning styrt av fjernkontrolltaster og fokus.',
      'libVLC uendret i stedet for Media3 ExoPlayer, for MKV-spor, SMB-bla og Windows-1251-undertekster, mot en LGPL-merknad og en stor APK.',
      'SMB via libVLC i stedet for et eget bibliotek, uten ekstra avhengighet, men en NAS-liste gir ingen filstørrelse.',
      'Ett Pro-kjøp i stedet for et abonnement per app, så én sjekk, Entitled.pro(), styrer hver skjerm.',
    ],
  },
  features: {
    Sources:
      'USB-mapper åpnes gjennom filsystemet i Android, og libVLC blar i SMB-delingene. Den lagrede NAS-listen blir på enheten, utenfor Android-sikkerhetskopien.',
    Resume:
      'Spilleren lagrer hver posisjon i SQLite hvert 5. sekund og ved avslutning. Fillisten leser samme tabell for linjen under hver fil.',
    'Subtitles and audio':
      'libVLC viser de innebygde sporene og undertekstfilene i mappen. Tekstundertekster leses som UTF-8, ellers som Windows-1251.',
    Controls:
      'Spilleren styrer hoppene og farten i libVLC. En kømodul holder rekkefølgen, tilfeldig avspilling og gjentakelse.',
    Updates:
      'Ved oppstart leser APK-en den nyeste utgivelsen på GitHub og laster ned en nyere APK. Android-installasjonen ber så om bekreftelse.',
    Ads: 'AdMob viser banneret på telefonen etter samtykkeskjemaet fra Google. Én sjekk skjuler det etter kjøp av Fjern reklame eller Pro, og TV-en viser ikke reklame.',
    Languages:
      'Tekstressursene i Android holder de 9 språkene. Språk-API-et i AppCompat bruker valget fra innstillingene eller språket på enheten.',
    'Touch on a phone':
      'Et lag for bevegelser over videoen gjør trykk og dra til hopp, søk, lysstyrke og volum. Fjernkontrollen på TV-en går forbi dette laget.',
    'Panel buttons':
      'Det valgte settet ligger i spillerinnstillingene på enheten. Spilleren bygger knapperaden fra det, og libVLC skalerer bildet.',
    'Sponsor skip':
      'Spilleren leser SponsorBlock-kapitlene i filen, eller spør SponsorBlock-API-et med en hash av video-ID-en. libVLC hopper så over hvert segment.',
    'Phone speaker':
      'Et stille lydspor som foretrekker den innebygde høyttaleren drar lyden fra libVLC med seg. En sjekk hvert sekund sender stum Bluetooth tilbake til høyttaleren.',
    Look: 'Enkle Android Views bygget i kode deler ett sett med farger, skrift og fokuspillen. Ordmerket bruker Instrument Serif.',
    'Music library':
      'En WorkManager-jobb går gjennom hver mappe og leser taggene med libVLC. Sangene havner i SQLite på enheten, utenfor Android-sikkerhetskopien.',
    'Music player':
      'En Media3-økt spiller sangene med libVLC uten video. Den tegner varselet og låseskjermen, og spillerlinjen følger den på hver skjerm.',
    'MusicBrainz and YouTube':
      'MusicBrainz navngir sangene, artistene og albumene. yt-dlp kjører i Python gjennom Chaquopy og henter lyden fra YouTube, i APK-en fra GitHub.',
    Audiobooks:
      'En skanning samler lydfilene i bøker etter OPF-filen, taggene og mappenavnene. Wikidata navngir forfatteren, og SQLite holder stedet i hver bok.',
    'Video library':
      'Skanningen lagrer bare stien til hver video i SQLite. En tolker leser serie, sesong og episode fra navnene, og Wikidata legger til andre navn. Telefonen leser og skriver filmdataene til LG-TV-en i en fil ved siden av filmene på NAS-en, over SMB med smbj.',
    'Find tabs':
      'Spillerlinjen sender en Android-lenke med artist og tittel til Guitar Upscale. Knappen vises bare når Android finner den appen.',
    'Google Play build':
      'En annen byggtype tar bort selvoppdateringen, full filtilgang og nettmodulen. Google Play oppdaterer den.',
    'Voice commands':
      'sherpa-onnx hører Hey Lumi på telefonen, og talegjenkjenningen i Android tar kommandoen. Et søk finner sangen, boken eller videoen, og talesyntese svarer.',
    'Online music':
      'Nettmodulen kjører yt-dlp i Python gjennom Chaquopy. MusicBrainz navngir sangene og YouTube gir lyden, i APK-en fra GitHub på en 64-bits telefon.',
    'Lumiere Pro':
      'Google Play Billing selger ett Pro-produkt, og appen spør Google Play ved hver oppstart. Én sjekk i appen åpner talefunksjonene og skjuler banneret.',
    'LG webOS app':
      'En nettside i TypeScript spiller av med TV-ens egen spiller. En Node-tjeneste i den samme webOS-pakken leser USB-pinner og NAS-en over WebDAV og strømmer filene til siden.',
    'Library setup and NAS finder':
      'NasFind banker på port 445 over hele TV-ens /24-nett og spør NetBIOS om hvert navn. Etter innloggingen lister libVLC de delte mappene, og biblioteksmappene lagrer typen til hver mappe i SharedPreferences.',
  },
};

export default arch;
