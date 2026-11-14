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
