import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'En Expo-app for Android, iPhone og nettet holder hvert kort i SQLite på enheten. Ordbasen følger med i appen, og Firestore synkroniserer en kortstokk når personen kobler sammen enheter.',
  parts: [
    { name: 'Expo and React Native', role: 'én kodebase for Android, iPhone og nettet.' },
    { name: 'SQLite', role: 'kortene, svarene, de kjente ordene og bildene på hver enhet.' },
    { name: 'ts-fsrs', role: 'FSRS-planen som avgjør når hvert kort kommer tilbake.' },
    { name: 'Ordbase', role: 'engelske og russiske ord som JSON i appen, bygd fra åpne ordlister og Wiktionary.' },
    { name: 'Firestore', role: 'en kopi av hver synkronisert kortstokk, nådd med en koblingskode.' },
    {
      name: 'Samtalemotorer',
      role: 'Gemini med personens egen nøkkel, Qwen 3 på telefonen eller den innebygde modellen i Chrome.',
    },
    { name: 'Høyttalermodul', role: 'en lokal Kotlin-modul som spiller ordene fra høyttaleren på full styrke.' },
    { name: 'Google Play', role: 'AdMob-reklame og kjøpene Fjern reklame og Pro gjennom expo-iap.' },
  ],
  flow: [
    'Personen skriver et ord eller starter en runde.',
    'Oppslaget sjekker ordbasen, så Wiktionary og MyMemory.',
    'Appen lagrer kortene i SQLite på enheten.',
    'FSRS velger kortene som skal repeteres, og nye ord fyller runden.',
    'Kortet viser ordet, bildet og lyden.',
  ],
  links: [
    { to: 'Firebase', text: 'Firestore holder en kopi av hver koblet kortstokk, bak en anonym innlogging.' },
    {
      to: 'Wiktionary and MyMemory',
      text: 'Et skrevet ord som mangler i basen får oversettelsene sine her, uten nøkkel.',
    },
    { to: 'Wikipedia', text: 'Hovedbildet i artikkelen om ordet, med kreditering fra Commons.' },
    { to: 'Google Gemini', text: 'Samtaletrening og forslag til emner kaller den med personens egen nøkkel.' },
    { to: 'Google Play', text: 'AdMob viser reklamen, og Play Billing selger Fjern reklame og Pro.' },
  ],
  design: {
    scale: [
      'Én elev per installasjon, med alle kortene i SQLite på enheten. Ingen egen server hos studioet kjører.',
      'Ordbasen følger med i appen som assets/words/en.json og ru.json, bygget fra CEFR-J, Octanove, Wiktionary og OpenRussian.',
      'Gratis tjenester setter grensene: MyMemory gir omtrent 5000 ord om dagen per enhet, og GitHub-listen over utgivelser tillater 60 kall i timen per adresse.',
      'Samtalemodellen på telefonen bruker omtrent 1,2 GB lagring og 2 GB ledig minne.',
    ],
    data: [
      'Kort, repetisjoner, kjente ord og bilder ligger i SQLite gjennom expo-sqlite, også på nett.',
      'Et kort har FSRS-tilstanden som JSON i memory, og due kopieres til en egen kolonne for indeksen. (lang, term_key) er unik.',
      'Et slettet kort blir igjen som et flagg, og updated_at lar den seneste endringen vinne ved synkronisering.',
      'Innstillinger ligger i localStorage. Bilder blir på hver enhet og står utenfor synkroniseringen.',
    ],
    interfaces: [
      'Synkroniseringen skriver hvert kort til Firestore under decks/{code}/cards/{lang}_{termKey}, og firestore.rules sjekker kodelengden og hvert felt.',
      'Et skrevet ord går til basen, så til Wiktionary gjennom kaikki.org, så til MyMemory-API-et. Wikipedia gir hovedbildet.',
      'Gemini kalles fra enheten med personens egen nøkkel, og Qwen 3 kjører på telefonen gjennom react-native-executorch.',
      'En Kotlin-modul i modules/speaker/ lager tale til en fil, og en bakgrunnsbehandler tegner startskjermmodulen på Android.',
    ],
    reliability: [
      'Hver enhet jobber alene med sin SQLite-fil, så appen kjører uten nett, og synkroniseringen er et valgfritt lag oppå.',
      'Ved synkronisering vinner den seneste endringen av et ord, og et slettet kort blir igjen som et flagg, så slettingen synkroniseres også.',
      'Et oppslag faller fra basen til Wiktionary og videre til MyMemory. kaikki.org sender ingen CORS-hoder, så nettbygget hopper over det.',
      'En ren, testet funksjon planlegger en uke med lokale varsler, så den som hopper over appen får ett om dagen i 7 dager.',
    ],
    security: [
      'Anonym pålogging i Firebase gir én bruker per enhet, og en paringskode på 80 tilfeldige biter deler en kortstokk uten konto.',
      'Alle med koden kan lese og endre den kortstokken. Repetisjoner, innstillinger og kjente ord blir på hver enhet.',
      'Gemini kjører på personens egen nøkkel, og ingen melding forlater enheten utenom kallet til den valgte motoren.',
      'Android-nøkkellageret og passordet er CI-hemmeligheter, med en kopi lagret utenfor repoet.',
    ],
    performance: [
      'Batch-spørringen leser forfalte kort gjennom indeksen cards_due og fyller så på med nye ord opp til dagskvoten.',
      'words/complete foreslår basiord etter de første bokstavene uten nett, og basen lastes ved første bruk.',
      'expo-image holder bilder på disk, og et tomt bilderesultat spørres om igjen etter 30 dager.',
      'Utgivelsesbygget gjenbruker den beholdte android/-mappen når @expo/fingerprint stemmer, og bygger bare JS på nytt.',
    ],
    operations: [
      'Sjekkene kjører lint, format, typer, knip og Vitest to ganger: som Android og nett, så med Platform.OS satt til ios.',
      'En push til main bygger APK-en på en tung runner, og release-gate.sh publiserer når sjekkene består. Mislykkede sjekker avbryter bygget.',
      'Med PLAY_TRACK satt laster en nattlig kjøring klokken 19:00 Sydney-tid opp en pakke til Google Play, og bare når appen er endret.',
      'GitHub-APK-en ser i utgivelseslisten etter et nyere memoire-v*-merke. Play- og iOS-byggene utelater den koden.',
    ],
    tradeoffs: [
      'Expo med React Native i stedet for en native Kotlin-app, så én kodebase bygger Android, iOS og nett, til en pris av noen deler bare for telefon.',
      'SQLite på enheten i stedet for Firestore som eneste lager, så appen virker uten nett og åpner med en gang, og synkroniseringen er valgfri.',
      'En paringskode i stedet for Google-pålogging, så enheter kobles uten konto, til en pris av at alle med koden kan endre kortstokken.',
      'FSRS-tilstand i én JSON-kolonne i stedet for en kolonne per felt, så en endring i ts-fsrs ikke trenger nytt skjema, men JSON-en kan ikke spørres i.',
    ],
  },
  features: {
    'Word batches':
      'En rundemodul tar kortene som skal repeteres fra SQLite, så nye ord fra basen opp til dagskvoten. ts-fsrs avgjør når hvert kort kommer tilbake.',
    'Ways to ask':
      'Hvert kort tar en spørremåte fra ferdighetene valgt under Mål. Lytting leser ordet med telefonens egen stemme.',
    'Add a word':
      'Oppslaget prøver den innebygde basen, så Wiktionary, så MyMemory. Forslagene kommer fra basen uten nett.',
    Pictures:
      'Appen spør Wikipedia-API-et for språket som læres etter bildet i artikkelen, bare med fri lisens. expo-image holder det på enheten, utenfor synkroniseringen.',
    'Built in words':
      'Et byggeskript slår sammen CEFR-J, Octanove, Wiktionary og OpenRussian til 2 JSON-filer. Appen laster dem første gang.',
    'Level test':
      'Testen blander basisord fra hvert nivå med oppdiktede ord. En poengsum per nivå, minus gjetting, avgjør hvor nye ord kommer fra.',
    Topics: 'Hvert basisord har sine emner. Et skrevet ord får dem fra Wiktionary, Gemini eller modellen i Chrome.',
    Reminders:
      'En planlegger på telefonen legger inn en uke med lokale varsler gjennom expo-notifications. Den planlegger på nytt hver gang appen åpnes eller lukkes.',
    'My words':
      'Listen leser kortene fra SQLite på enheten. Sletting merker kortet, så synkroniseringen kan ta det med.',
    'Look and language':
      'i18next holder de 9 katalogene, og temaet følger telefonen eller Innstillinger. Begge valgene blir på enheten.',
    'Talk practice':
      'Scenen går til Gemini med personens nøkkel, til Qwen 3 på telefonen eller til modellen i Chrome. Et trykk på et ord i svaret lagrer et kort.',
    'Sync between devices':
      'Hver enhet logger anonymt inn i Firebase og sender endrede kort til kortstokken for koden sin. Den seneste endringen av et ord vinner.',
    'Home screen widget':
      'react-native-android-widget tegner den fra SQLite i bakgrunnen. Den oppdateres hvert 30. minutt og når appen går i bakgrunnen.',
    'Ads and Remove ads':
      'AdMob viser banneret og fullskjermreklamen etter samtykkeskjemaet. Google Play Billing selger Fjern reklame gjennom expo-iap.',
    Sound:
      'En lokal Kotlin-modul gjør hvert ord om til en fil og spiller den fra høyttaleren på full styrke. iOS og nettet bruker systemets utgang.',
    'Memoire Pro': 'Google Play Billing selger Pro gjennom expo-iap. Én sjekk leser kjøpet og åpner hvert låst punkt.',
    Updates:
      'GitHub-APK-en leser den offentlige listen over releases og åpner Android-installasjonen. Byggene for Play og iPhone har ikke denne modulen.',
  },
};

export default arch;
