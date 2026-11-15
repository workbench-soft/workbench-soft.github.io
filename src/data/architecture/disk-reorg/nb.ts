import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Et kommandolinjeverktøy i TypeScript som Node kjører på Windows uten bunting. Hver kommando bygger en plan med flyttinger fra et privat oppsett, og én modul utfører hver plan.',
  parts: [
    { name: 'Node', role: 'kjører TypeScript-filene som de er.' },
    { name: 'zod', role: 'sjekker oppsettfilen med mapper og regler før en kjøring.' },
    { name: 'Filgjennomgang', role: 'lister filer med størrelse og dato, 64 om gangen, og teller hver sti én gang.' },
    {
      name: 'Regelmoduler',
      role: 'gjør oppsettet om til flyttinger for kopier, filer som kan slettes, emnesortering og månedsinnboksen.',
    },
    {
      name: 'Plansjekker',
      role: 'stopper en plan med en kollisjon, en gjentatt sti eller en beholdt kopi før første flytting.',
    },
    { name: 'Flytter', role: 'lager mapper, gir nytt navn ved kollisjon og logger hver flytting før den neste.' },
    { name: 'CSV-filer', role: 'planen og flytteloggen, med BOM så Excel leser kyrilliske navn.' },
  ],
  flow: [
    'Personen kjører en kommando gjennom mise, ofte som prøvekjøring først.',
    'Verktøyet leser og sjekker det private oppsettet.',
    'Det går gjennom mappene og bygger en liste med flyttinger.',
    'Planen havner i en CSV personen kan redigere.',
    'Flytteren utfører planen og logger hver flytting for angring.',
  ],
  links: [{ to: 'GitHub', text: 'Kjører sjekkene ved hver push til main og publiserer en utgivelse med notater.' }],
  design: {
    scale: [
      'PC-en til én utvikler og nettverksressursene dens, og hver kjøring dekker mappene i ett oppsett.',
      'En stor ressurs formet designet. Hashingen går i trinn, og en fremdriftslinje med gjenstående tid skrives hvert 5. sekund.',
    ],
    data: [
      'Et JSON-oppsett utenfor git har mappene og reglene. Repoet leverer config.example.json med oppdiktede stier.',
      'Hver kjøring skriver en plan-CSV med From, To og en valgfri Keep-kolonne, og en flyttelogg med From, To og Time.',
      'Kommandoen inventory skriver en Markdown-rapport med antall, størrelser, år, filtyper og sannsynlige kopier.',
    ],
    interfaces: [
      'En kommandolinje med inventory, move, undo, dupes, candidates, sort og inbox, lest med node:util parseArgs.',
      'Plan-CSV-en er kontrakten mellom kommandoene og flytteren, så et menneske kan redigere den og bruke den med move.',
      'Hver CSV starter med en UTF-8 byterekkefølgemerke, så Excel og PowerShell 5.1 leser kyrilliske navn riktig.',
    ],
    reliability: [
      'En kjøring stopper når loggen ikke kan skrives, så hver flytting kan angres. Raden havner i loggen før neste flytting.',
      'Mellom stasjoner kopierer en flytting først og fjerner etterpå, så en mislykket kopi lar kilden stå hel.',
      'En duplikat der den beholdte kopien er borte, blir liggende, og en kjøring avsluttes med 1 når en beholdt kopi mangler etterpå.',
    ],
    security: [
      'Verktøyet sletter ingen filer. En fjerning flytter filen under karantene med stasjon og sti bevart.',
      'inventory, candidates, sort og inbox leser bare navn, størrelser og datoer. dupes leser innhold bare for å hashe det.',
      'Det leser det lokale oppsettet og filer, kaller ikke noe nett og lagrer ingen token. Ekte stier holdes utenfor git.',
    ],
    performance: [
      'dupes grupperer etter størrelse, hasher de første 1 MB og leser bare filer som fortsatt stemmer, i sin helhet.',
      'Gjennomgangen leser filinfo 64 om gangen og teller hver sti én gang, så overlappende røtter blir billige.',
      'Hashingen leser 4 filer om gangen og melder filer, gigabyte, prosent og gjenstående tid.',
    ],
    operations: [
      'Node 24 kjører TypeScript-filene som de er, uten bunt, og mise kjører hver kommando og oppgave.',
      'Sjekker kjører ved hver push til main, og Release utgir en GitHub-utgivelse når sjekkene består. Kjøringer for pull requests er av.',
      'En husky-hook før push kjører lint og tester. Testene bygger midlertidige mapper og lar ekte mapper være.',
    ],
    tradeoffs: [
      'Karantene framfor sletting eller papirkurv, så en feil regel bare koster en flytting tilbake, på bekostning av at plass frigjøres først når personen tømmer karantenen.',
      'Én planmodul for alle kommandoer framfor sjekker i hver, så en beholdt kopi eller en flytting i konflikt stopper kjøringen ett sted.',
      'Et privat oppsett utenfor git framfor regler i repoet, så mappenavn blir på PC-en, på bekostning av manuell kopiering til en ny PC.',
      'TypeScript på Node framfor de første PowerShell-skriptene, for tester og stier i oppsettet.',
    ],
  },
  features: {
    'Folder report':
      'Gjennomgangen leser navn, størrelser og datoer i de oppførte mappene. Verktøyet skriver antall, år, typer og sannsynlige kopier til en Markdown-fil.',
    'Duplicates to quarantine':
      'Filer med samme størrelse får en hash av første 1 MB, så en full SHA-256. Stiregler rangerer hver kopi, og den best rangerte blir.',
    'Files safe to drop':
      'Hver regel sjekker et navn, en sti eller en alder og gir en karantenekategori. Et beskyttelsesmønster går foran hver regel.',
    'Sort into topic folders':
      'En sorteringsjobb har regler for mapper og filer med et mål for hver. Oppføringer uten treff går til en reservemappe, som én per år.',
    'Monthly inbox':
      'Verktøyet leser datoene til oppføringene i innboksmappen. Oppføringer eldre enn 30 dager flyttes til en mappe oppkalt etter måneden.',
    'Plans, moves and undo':
      'Hver kjøring skriver en plan-CSV og en flyttelogg. Flytteren sjekker planen før første steg, og angring leser loggen og flytter filene tilbake fra siste til første.',
  },
};

export default arch;
