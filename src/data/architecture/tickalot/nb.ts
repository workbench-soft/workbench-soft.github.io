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
  },
};

export default arch;
