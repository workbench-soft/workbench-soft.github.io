import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'En Chrome-utvidelse med Manifest V3 og uten server. Popupen starter lagringen, service workeren kjører den, og en skjult offscreen-side henter filene og bygger zip-filen.',
  parts: [
    {
      name: 'Popup',
      role: 'viser verten, Last ned-knappen og linjen, og tegner seg på nytt fra den lagrede tilstanden.',
    },
    {
      name: 'Service worker',
      role: 'kjører én lagring per fane, setter inn sideskriptet og gir zip-filen til Chrome-nedlastingene.',
    },
    { name: 'Sideskript', role: 'kjører i hver ramme og returnerer HTML og hver URL siden lastet.' },
    { name: 'Offscreen-dokument', role: 'finner, henter og pakker filene, siden bare en side kan lage en blob-URL.' },
    { name: 'fflate', role: 'pakker zip-filen og lagrer bilder og fonter som de er.' },
    { name: 'chrome.storage.session', role: 'holder tilstanden for hver lagring, så en gjenåpnet popup ser den.' },
    { name: 'chrome.i18n', role: 'gir popupteksten og navnet på utvidelsen på 9 språk.' },
    { name: 'Vite', role: 'bunter service workeren, popupen og offscreen-siden.' },
  ],
  flow: [
    'Personen trykker Last ned i popupen.',
    'Service workeren setter inn et skript i hver ramme i fanen.',
    'Skriptet returnerer HTML og URL-ene siden lastet.',
    'Offscreen-siden finner flere filer gjennom source maps og stilark, og henter dem.',
    'Tellerne når popupen gjennom øktlageret hvert 100. ms.',
    'Chrome-nedlastingene lagrer zip-filen under Nedlastinger.',
  ],
  links: [],
  features: {
    'Download from the popup':
      'Popupen gir fanen til service workeren, som kjører lagringen på egen hånd. Tilstanden ligger i øktlageret, så jobben fortsetter når popupen lukkes.',
    'Progress bar':
      'Offscreen-siden finner filene først, så totalen står fast. Den sender antall ferdige og mislykkede filer hvert 100. ms, og popupen tegner seg på nytt.',
    'One zip':
      'fflate pakker levende HTML og hver fil i en mappe per vert, med serverens stier. Chrome-nedlastingene lagrer den med vert og tid i navnet.',
    'Original sources':
      'Offscreen-siden leser source map for hvert skript og stilark. Hver originalfil i en map havner i sin egen mappe i zip-filen.',
    Languages:
      'chrome.i18n velger katalogen etter Chrome-språket. 9 kataloger holder popupteksten, navnet og beskrivelsen.',
  },
};

export default arch;
