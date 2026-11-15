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
  design: {
    scale: [
      'Én skjerm på utviklerens egen telefon, med ett kort per utgitte studioapp.',
      'GitHub-API-et tillater 60 kall i timen uten token, og det formet listebufferen på 10 minutter.',
    ],
    data: [
      'Ingen database. Shared preferences holder siste utgivelsesliste, med notater og navn, og pakkenavnene som er lært i en kjøring.',
      'En ressursnøkkel er tagg-prefikset pluss APK-navnet uten versjon og plattformendelse, for eksempel farnear/farnear.',
      'De installerte appene kommer fra Androids pakkebehandler ved hver sjekk.',
    ],
    interfaces: [
      'GitHub Releases-API-et til det delte offentlige utgivelsesrepoet lister hver APK side for side, og compare-API-et gir commit-notater.',
      'Studionettstedet leverer en katalog som JSON med navn, plattformer og lenke for hvert prosjekt.',
      'Shizuku kjører sh -c som shell-bruker, med pm install -r -d -S og pm uninstall.',
    ],
    reliability: [
      'Feiler GitHub-sjekken, vises den lagrede listen, og en åpning venter ett minutt før den spør igjen.',
      'Oppdateringskjøringen lever utenfor activity, så en skjermdreining tar den ikke, og Avbryt stopper før neste bit.',
      'Et bygg i veien fjernes bare ved en signatur- eller versjonskonflikt, og exit-status avslører en mislykket ominstallering.',
    ],
    security: [
      'Den leser bare offentlige utgivelser og har verken token eller konto.',
      'Installasjonsretten kommer fra Shizuku-tillatelsen personen gir, og appen kjører ingen root-kommando.',
      'Den egne installasjonen sjekker APK-filens størrelse før den installerer.',
    ],
    performance: [
      'APK-er lastes ned i biter på 64 KB med tidsavbrudd og en stoppsjekk.',
      'Utgivelseslisten er fersk i 10 minutter, så de fleste åpninger hopper over API-et.',
      'Notater til kort uten notater lastes i bakgrunnen fra compare-API-et etter at kortene vises.',
    ],
    operations: [
      'Checks kjører ktlint, shellcheck, shfmt, actionlint, markdownlint, enhetstestene og feilsøkingsbygget på en egen runner.',
      'Release bygger en signert APK ved siden av Checks, og release-gate.sh publiserer den når sjekkene består.',
      'Jobben setter en datoversjon som tagg og lager en oppdatereutgivelse i det offentlige utgivelsesrepoet, med de siste 3 beholdt.',
    ],
    tradeoffs: [
      'Shizuku framfor systeminstallatøren, så installasjoner går uten spørsmål, til pris av en start etter hver omstart.',
      'Vanlige Views framfor Compose, for én skjerm og Shizukus Java-API, til pris av håndbygd layout.',
      'Et offentlig utgivelsesrepo framfor private apprepoer, så telefonen slipper token, til pris av grensen på 60 kall i timen.',
      'Selve APK-en installeres sist, med én shell-kommando, siden en installasjon kan drepe den kjørende prosessen.',
    ],
  },
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
