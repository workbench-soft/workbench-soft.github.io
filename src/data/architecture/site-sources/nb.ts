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
  design: {
    scale: [
      'Én person lagrer én åpen side om gangen, og to faner kan lagre samtidig.',
      'Filene ligger i minnet til zip-filen er skrevet, så et nettsted på flere hundre megabyte kan svikte.',
    ],
    data: [
      'En lagring er en zip oppkalt etter verten og tiden, med index.html, en mappe per vert, _sources og _frames.',
      'Tilstanden til hver lagring ligger i chrome.storage.session: tellerne, filene som feilet og trinnet.',
      'Ingenting lagres etter at zip-filen har havnet i Nedlastinger. Utvidelsen har ingen historikk og ingen innstillinger.',
    ],
    interfaces: [
      'Popupen, service workeren og offscreen-siden snakker gjennom chrome.runtime-meldinger og tilstanden i session storage.',
      'Et sideskript injisert med chrome.scripting returnerer HTML og nettadressene fra performance-oppføringer, src og link href.',
      'Zip-filen går ut som en blob-URL som chrome.downloads lagrer i Nedlastinger.',
    ],
    reliability: [
      'En fil serveren avviser, teller som mislykket og blir utenfor zip-filen, uten nytt forsøk. Et kall stopper etter 2 minutter.',
      'Popupen kan lukkes midt i lagringen og tegnes på nytt fra session storage når den åpnes igjen, så lagringen går videre.',
      'Ett delt løfte oppretter offscreen-siden, så en andre fane bruker den ene Chrome tillater.',
    ],
    security: [
      'Utvidelsen ber om activeTab, scripting, downloads, storage, offscreen og alle nettadresser, siden den henter filer fra hvert nettsted siden laster fra.',
      'Den sender ingenting til en egen server. De eneste forespørslene går til nettstedene siden allerede bruker.',
      'En fil bak en innlogging utvidelsen ikke kan sende, teller som mislykket. Chrome-sider og Chrome Nettmarked avviser utvidelser.',
    ],
    performance: [
      'Oppdagelsen henter skript og stilark i hver runde side om side og beholder bytene, så pakkingen ikke henter dem på nytt.',
      'Fremdriftstellere slås sammen og går ut høyst hvert 100. ms, og en ny tilstand går ut med en gang.',
      'Bilder, skrifter, video og andre komprimerte formater legges i zip-filen som de er, uten ny komprimering.',
    ],
    operations: [
      'Vite bunter service workeren, popupen og offscreen-siden. fflate pakker også utvidelsen for hver utgivelse.',
      'Hver push til main bygger zip-filen ved siden av sjekkene. Et portskript utgir den når sjekkene består og avbryter den når de feiler.',
      'Utgivelser får en datotag som v2026.11.02.1, og manifestet har samme versjon. Chrome laster den upakket.',
    ],
    tradeoffs: [
      'En offscreen-side framfor en data-URL fra workeren, siden bare en side kan lage en blob-URL og en data-URL er en tredjedel større.',
      'zipSync framfor asynkron zip, siden utvidelsens policy blokkerer blob-workerne i fflates asynkrone zip, på bekostning av en pause på store zip-filer.',
      'Finne filene først og så hente, så totalen står fast mens linjen fylles, på bekostning av ventetid før første fil på store sider.',
      'chrome.i18n framfor i18next, siden manifestnavnet bare kan komme fra _locales og en andre katalog ikke gir noe.',
    ],
  },
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
