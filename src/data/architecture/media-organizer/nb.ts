import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'En skrivebordsapp på Tauri 2 for Windows og macOS. En Rust-backend skanner, leser datoer, planlegger og flytter filene, og en React-webview viser hendelsene den sender.',
  parts: [
    { name: 'Tauri 2', role: 'skrivebordsskallet, med systemets webview og et lite installasjonsprogram.' },
    { name: 'Rust-backend', role: 'tar hver avgjørelse om filer, fra skanningen til flyttingene og historikken.' },
    { name: 'React og Vite', role: 'filtabellen, verktøylinjen og innstillingene, tegnet fra backend-hendelser.' },
    { name: 'ExifTool', role: 'et medfølgende hjelpeprogram som leser dato, kamera og GPS for hver fil.' },
    { name: 'Crate folder-rules', role: 'reglene for mapper etter år, sted og dag, delt med Memories.' },
    { name: 'GeoNames og OpenStreetMap', role: 'stedsnavn og parkomriss i installasjonen for oppslag uten nett.' },
    {
      name: 'tauri-plugin-updater',
      role: 'ser etter en ny versjon i GitHub-utgivelsen og installerer den ved omstart.',
    },
  ],
  flow: [
    'Personen velger en mappe, og Rust-gjennomgangen sender filene.',
    'ExifTool-prosesser leser dato og GPS for hver bunke.',
    'Geokoderen uten nett gir hvert GPS-punkt et stedsnavn.',
    'Mapperegler planlegger ny mappe og nytt navn for hver fil.',
    'Personen bekrefter, og backenden flytter hver fil og logger steget.',
  ],
  links: [
    { to: 'memories', text: 'Telefonappen og denne sortereren deler crate for mapperegler og bilderedigereren.' },
    {
      to: 'GitHub Releases',
      text: 'Installasjonen og oppdateringsfilen ligger i en utgivelse i det offentlige nettstedrepoet.',
    },
  ],
  features: {
    Scan: 'En Rust-gjennomgang går utenfor UI-tråden og sender filene i bunker. Tabellen samler dem, så en stor mappe koster bare noen få nytegninger i sekundet.',
    'Capture dates':
      'En gruppe ExifTool-prosesser står åpne og leser hver bunke så snart skanningen finner den. De går med lav prioritet på halvparten av kjernene.',
    'Places offline':
      'Et GeoNames-utdrag og parkomriss lastes én gang inn i et rutenett på 1 grad. Et oppslag leser bare rutene i nærheten, og GPS-punktene blir på PC-en.',
    'Plan first':
      'Den delte crate for mapperegler gir hver fil mappe og navn som en prøvekjøring. Tabellen viser hver plan før personen bekrefter.',
    Moves:
      'Én Rust-modul gjør hver endring av filer, med omdøping uten erstatning eller en kontrollert kopi. Pause stopper etter filen som flyttes nå.',
    'History, undo and redo':
      'Hver kjøring skriver en JSONL-logg i appens datamappe, én linje per fil. Angre og gjør om spiller av loggen med de samme sjekkene.',
    Settings:
      'Backenden lagrer målmappen, modusene og hjemstedet i en JSON-fil. Språkvalget blir liggende i lagringen til webviewen.',
    'File table':
      'React tegner én rad per fil fra backend-hendelsene. Et dobbeltklikk på et sted åpner Leaflet over OpenStreetMap-fliser.',
    'Self-update':
      'tauri-plugin-updater leser filen for siste utgivelse ved oppstart og når vinduet kommer fram igjen. Nedlastingen starter etter Oppdater og installasjonen etter Start på nytt nå.',
    'One command install':
      'Et PowerShell-skript leser nyeste versjon fra utgivelsesfilen. Det laster ned installasjonen og kjører den stille for gjeldende bruker.',
  },
};

export default arch;
