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
