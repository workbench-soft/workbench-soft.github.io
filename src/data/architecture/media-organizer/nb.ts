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
  design: {
    scale: [
      'Én person på én PC. Designstørrelsen er en mappe med 100 000 filer, så Rust holder postene og nettvisningen får bare ider.',
      'Stedsdataene ligger i installasjonsprogrammet, som et GeoNames-utdrag og parkomriss. Å bygge dem på nytt laster ned omtrent 640 MB.',
    ],
    data: [
      'Innstillinger ligger i én JSON-fil i appens datamappe. Historikken er én JSONL-fil per kjøring, pluss en index.json.',
      'Postene, datoene og planene fra en skanning blir i skanneøkten i backend, så kommandoene tar fil-ider og planer.',
      'Stedsdata er geodata.tsv.gz (byer med 1000 innbyggere eller flere og severdigheter) og parks.tsv.gz. Begge lastes inn i et rutenett på 1 grad.',
    ],
    interfaces: [
      'Nettvisningen sender Tauri-kommandoer som start_scan og start_moves. Backend svarer med hendelser: scan:files, metadata:results, plan:files og move:file.',
      'ts-rs skriver TypeScript-typene for nyttelastene fra Rust-modellene, så begge sider av en kommando stemmer overens.',
      'ExifTool får én linje per forespørsel, med json-utdata, taggliste og absolutte stier. Oppdatereren leser latest.json fra en utgivelse.',
    ],
    reliability: [
      'En flytting bruker en omdøping uten erstatning. En kopi mellom volumer sjekkes på størrelse og byte før kilden forsvinner.',
      'Et krasj lar filen ligge ved kilden, ved målet eller under begge navnene til én hardlenke, og ingen fil går tapt.',
      'En kjøring skriver én loggrad når hvert trinn er ferdig, og en logg som ikke lar seg skrive stopper kjøringen. En sen hendelse fra en erstattet skanning forkastes med scan_id.',
    ],
    security: [
      'Nettvisningen har bare core:default-tillatelser, uten fs- eller shell-plugin. Rust gjør hver filendring.',
      'En flytting starter bare fra en mappe valgt i den innebygde velgeren i denne økten. Et mål må ligge innenfor den valgte roten, og sjekkes på nytt før hver flytting.',
      'Ingen GPS-punkter forlater PC-en, siden steder løses offline. ExifTool-stier sjekkes så et filnavn ikke kan sette inn en kommando.',
    ],
    performance: [
      'Skanningen går utenfor UI-tråden og sender filer i bunker. Tabellen bufrer dem, så en stor mappe koster noen få omtegninger i sekundet.',
      'ExifTool-arbeiderne blir åpne og kjører med lav prioritet, så det unngås å starte en prosess per fil.',
      'Et stedsoppslag leser bare de nære cellene i rutenettet, og parkomriss testes gjennom bokser på 64 kanter.',
    ],
    operations: [
      'Backend ligger i en egen crate ved siden av app-craten, så en utgivelse kompilerer en liten crate i stedet for 18 000 linjer.',
      'CI kjører på en Windows-PC, så utgivelsene har et Windows-installasjonsprogram og ingen macOS-bygg. En Mac bygger det med pnpm tauri build.',
      'Oppdatereren leser latest.json ved start, når vinduet kommer tilbake og på forespørsel. Den laster ned etter Update og installerer ved Restart now.',
    ],
    tradeoffs: [
      'Tauri 2 framfor Electron: et mindre installasjonsprogram på systemets nettvisning og Rust som eier fillogikken, til prisen av at WebView2 og WebKit er ulike.',
      'Planlegging i Rust framfor nettvisningen, den første versjonen, som ble treg på store mapper.',
      'Bare disk/safe_fs endrer filer, håndhevet av clippy.toml, framfor std::fs-kall i hver modul som kunne overskrive en fil.',
      'GeoNames i installasjonsprogrammet framfor en nettbasert geokoder, så ingen GPS-punkter forlater PC-en og ingen forespørselsgrense gjelder.',
    ],
  },
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
