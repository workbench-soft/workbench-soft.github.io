import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Én Kotlin-app for Android leser studioets offentlige GitHub-utgivelser og installerer hver APK gjennom Shizuku. Den har ingen egen server.',
  parts: [
    { name: 'Kotlin og Android Views', role: 'én skjerm av enkle Views med et kort per app og dra for å oppdatere.' },
    { name: 'GitHub Releases API', role: 'kilden til den nyeste APK-en for hver app, med notater og commits.' },
    { name: 'Shizuku', role: 'kjører hver installasjon som shell-brukeren, så Android viser ingen spørsmål.' },
    { name: 'Android-pakkebehandleren', role: 'gir navn, pakkenavn og versjon for hver installerte app.' },
    { name: 'Oppdateringsrunde', role: 'holder køen utenfor skjermen og laster ned hver APK i biter.' },
    { name: 'Shared preferences', role: 'lagrer den siste utgivelseslisten og pakkenavnene en runde fant.' },
    { name: 'Studiokatalogen', role: 'en JSON-fil fra studioets nettsted med navn og plattformer for hvert prosjekt.' },
  ],
  flow: [
    'Personen åpner appen, kommer tilbake eller drar listen ned.',
    'Appen leser hver utgivelsesside fra GitHub, eller en liste under 10 minutter.',
    'Den kobler hver APK til en installert app etter navn eller pakkenavn.',
    'Studiokatalogen navngir hvert kort og legger til prosjekter uten APK.',
    'Et trykk laster ned APK-en, og Shizuku installerer den uten spørsmål.',
    'Oppdatereren installerer seg selv sist, og telefonen åpner den igjen.',
  ],
  links: [
    {
      to: 'GitHub',
      text: 'Det felles offentlige utgivelsesrepoet holder APK-en for hver app, så telefonen trenger ingen token.',
    },
    { to: 'Shizuku', text: 'Shizuku-appen gir tilgang til shell-brukeren som installerer og fjerner appene.' },
    { to: 'Workbench Soft site', text: 'Nettstedet bygger appkatalogen fra sin egen prosjektliste.' },
    { to: 'archon', text: 'Archon har ingen APK, så kortet har en Åpne-lenke.' },
  ],
  features: {
    'Update all':
      'Oppdateringsrunden setter hver app som henger etter i kø og laster den ned i biter på 64 KB. Shizuku installerer hver som shell-brukeren, og Avbryt stopper før neste bit.',
    'Self update':
      'Oppdatereren kommer i de samme utgivelsene under sin egen tagg og installerer seg selv sist. Én shell-kommando gjennom Shizuku installerer den og åpner appen når den gamle prosessen er ferdig.',
    'Update one app':
      'Oppdater-knappen på et kort kjører samme nedlasting og Shizuku-installasjon for én APK. Etter en feil står knappen igjen for et nytt forsøk.',
    'Install a missing app':
      'En APK uten treff blant de installerte appene får en Installer-knapp. Shizuku installerer den på samme måte som en oppdatering.',
    'App list':
      'Hver utgitt APK får et kort, koblet til de installerte appene etter navn eller pakkenavn. Studiokatalogen legger til et kort med lenke for hvert prosjekt uten APK.',
    'Saved list offline':
      'Shared preferences holder den siste utgivelseslisten med notater og navn. Feiler GitHub, viser appen den listen, og en åpning innen 10 minutter hopper over API-et.',
    'Shizuku setup':
      'En oppsettmodul finner Shizuku-steget som gjenstår og åpner Google Play eller Shizuku-appen for det. Oppdateringen personen trykket på starter når tilgangen er gitt.',
    'Release notes':
      'Appen rydder notatene til hver GitHub-utgivelse. Er de tomme, leser den commitene fra sammenligningslenken i bakgrunnen.',
  },
};

export default arch;
