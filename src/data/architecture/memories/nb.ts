import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'En Expo-app for Android, iPhone og nettleseren leser bilder fra en NAS hjemme over WebDAV og har sin egen SQLite-indeks. Valgfrie containere på NAS-en indekserer bildene, grupperer ansikter og leverer albumlenker.',
  parts: [
    { name: 'Expo og React Native', role: 'én kodebase for Android-appen, iPhone-appen og nettleserversjonen.' },
    { name: 'expo-sqlite', role: 'indeksen på telefonen, med dato, sted og enhet for hver fil.' },
    { name: 'WebDAV', role: 'den eneste forbindelsen til NAS-en for lister, filhoder, opplastinger og flyttinger.' },
    { name: 'Crate folder-rules', role: 'Rust-reglene for mapper etter år, sted og dag, delt med sortereren for PC.' },
    { name: 'places.db', role: 'et utdrag fra GeoNames og OpenStreetMap i appen som gir steder navn uten nett.' },
    { name: 'NAS-containere i Node', role: 'den raske indekseren, albumsidene og nettleserappen på NAS-en.' },
    {
      name: 'Ansiktsmotor i Rust',
      role: 'kjører YuNet og SFace gjennom tract på NAS-en og grupperer ansikter per person.',
    },
    { name: 'Bilderedigerer i Konva', role: 'én redigerer i en Expo DOM-komponent, delt med Shuttrix og PC-appen.' },
  ],
  flow: [
    'En bakgrunnsjobb lister mappene på NAS-en med noen timers mellomrom.',
    'Den leser bare filhodet i hver ny fil for dato og GPS.',
    'Stedsdatabasen uten nett gir stedet navn, og SQLite lagrer raden.',
    'Jobben planlegger påminnelsene for de neste 7 dagene.',
    'Skjermene spør indeksen og strømmer de fulle bildene fra NAS-en.',
  ],
  links: [
    {
      to: 'media-organizer',
      text: 'Sortereren for PC bruker de samme mappereglene i Rust og viser den samme redigereren.',
    },
    { to: 'shuttrix', text: 'Kameraet deler bilderedigereren, stedsoppslaget og kartet over steder.' },
    { to: 'keeppad', text: 'Keeppad legger notater i dagboken til en person på NAS-en gjennom en Android-leverandør.' },
    { to: 'memories-demo-webdav', text: 'Gjennomgangen hos Google Play logger inn på denne eksempel-NAS-en.' },
    { to: 'Tailscale', text: 'En andre adresse når NAS-en borte fra hjemmet. Funnel leverer albumlenkene.' },
  ],
  design: {
    scale: [
      'En person per installasjon med en NAS hjemme, opptil omtrent en million bilder og videoer.',
      'Første synk av en halv million bilder tar nesten en dag, siden NAS-en svarer på rundt 10 filhoder i sekundet.',
      'Albumlenker når noen få personer gjennom Tailscale Funnel, så NAS-en er den eneste serveren.',
    ],
    data: [
      'Bildene blir på NAS-en. Telefonen har en SQLite-indeks med mapper, medier og en days-tabell som triggere teller opp.',
      'En filrad har bare mappe-id og filnavn, så en million filer får plass i omtrent 200 MB.',
      'Opptakstid lagres som veggklokke i sekunder, så På denne dagen er en enkel områdespørring.',
      'NAS-en har en .memories-mappe ved siden av bildene med index.db, status.json, faces.db og albumfilene.',
    ],
    interfaces: [
      'Telefonen snakker WebDAV med NAS-en: PROPFIND per mappe, GET med område for filhoder, PUT, MKCOL og MOVE.',
      'Containerne på NAS-en legger index.db og status.json i .memories, og telefonen slår dem sammen over samme WebDAV-lenke.',
      'Rust-mapperegelene når appen som et uniffi-bibliotek på Android og som wasm på nettet.',
    ],
    reliability: [
      'Synken lagrer 50 filer om gangen i én transaksjon, og en avbrutt runde fortsetter i neste kjøring.',
      'Bakgrunnsjobben har 8 minutters budsjett og planlegger påminnelsene først, så de kommer selv om NAS-en svikter.',
      'En tom galleri-rot stopper runden, så en ikke-montert deling sletter ikke indeksen.',
    ],
    security: [
      'NAS-påloggingen ligger i Android-nøkkellageret via expo-secure-store, og appen sender den som Basic-header.',
      'En albumlenke har et tilfeldig token på 16 byte. Albumserveren monterer galleriet skrivebeskyttet og svarer 404 på alle andre stier.',
      'Stedsnavn kommer fra en frakoblet database i appen, så ingen GPS-punkter forlater telefonen.',
      'Vanlig http er tillatt, siden en NAS hjemme sjelden har sertifikat.',
    ],
    performance: [
      'FlashList tegner de synlige rutene og én skjerm foran. Hver rute viser det lille EXIF-miniatyrbildet, lest fra de første 66 KB.',
      'Lesingene går 8 om gangen i en kø, nyeste først, og en innebygd modul løfter OkHttp fra 5 til 32 forespørsler per vert.',
      'Tabellene days og geo_cells holder månedslisten, turene og kartet unna millionen filrader.',
      'Indekseren på NAS-en leser et filhode fra egen disk på millisekunder, mens WebDAV bruker sekunder.',
    ],
    operations: [
      'Ett pnpm-monorepo med node, pnpm, java og rust låst i mise.toml og én låsefil.',
      'Hvert push til main der sjekkene består, gir en signert APK med datoversjon, og release-gate.sh avbryter bygget når sjekkene feiler.',
      'Den installerte appen leser siste utgivelse fra GitHub-API-et. Google Play-bygget bytter oppdatereren mot stubber og bygges én gang om dagen.',
      'Containerne på NAS-en rulles ut over ssh med et deploy-skript.',
    ],
    tradeoffs: [
      'Vanlig WebDAV framfor en egen server, så hvilken som helst NAS duger, til pris av en treg første synk.',
      'SQLite på telefonen framfor en serverdatabase, så appen virker frakoblet og koster ingenting å drifte.',
      'Opptakstid som veggklokke framfor UTC, så På denne dagen blir et enkelt område, men bilder fra to tidssoner kan ikke ordnes helt nøyaktig.',
      'Én Rust-crate for mapperegler framfor en kopi per app, så telefon og skrivebord sorterer likt, til 1 til 2 MB per ABI.',
    ],
  },
  features: {
    'Daily reminder':
      'expo-notifications holder enkeltpåminnelser for de neste 7 dagene, planlagt fra indeksen av bakgrunnsjobben. En utenlandstur den dagen velger året.',
    Today:
      'En spørring mot en tabell med antall bilder per dag finner hvert år med bilder på denne datoen. Utløsere holder tabellen oppdatert, så filradene blir ikke lest.',
    Trips:
      'Appen skjærer ut rekker av dager i utlandet fra tallene per dag. Turlenken åpner bildene fra første til siste dag.',
    Photos:
      'FlashList tegner rutene på skjermen og én skjerm fram. Hver rute viser det lille EXIF-miniatyrbildet fra hurtiglageret på telefonen.',
    'Filter by place':
      'Stedssøket leser land og steder fra tallene per dag. Valgene blir én betingelse til i hver galleri-spørring.',
    'Camera and drone shots':
      'EXIF-modellen eller filnavnet avgjør under synkroniseringen om det er telefon, kamera eller drone. Indeksen lagrer svaret per fil.',
    'Tile size': 'En håndterer for knipegesten setter 1 til 6 ruter per rad. Én lagret verdi styrer hvert rutenett.',
    'Send many photos at once':
      'Appen kopierer valgene til hurtiglageret sitt, 3 om gangen. En liten innebygd modul gir dem til delingsarket i systemet på én gang.',
    'Share an album by link':
      'Appen skriver en albumfil til NAS-en over WebDAV. En Node-server på NAS-en viser den gjennom Tailscale Funnel, med forhåndsvisninger laget av sharp.',
    'Memories in the browser':
      'En Node-server på NAS-en leverer nettversjonen og sender WebDAV videre på samme adresse. Tailscale Serve holder den inne i tailnettet.',
    Organize:
      'Hvert kort kjører én jobb: kamerasorteringen, opplastingen eller frigjøringen. Mappereglene i Rust planlegger mappe og navn før en fil flyttes.',
    'Import from Google Photos':
      'Picker API i Google Foto viser bare det personen velger. Appen laster dem ned til kameramappen, og opplastingen tar dem videre.',
    'Sort picked photos on the NAS':
      'Mappereglene i Rust planlegger ny mappe og nytt navn per fil. En WebDAV MOVE legger den dit, og indeksen på telefonen følger straks etter.',
    Viewer:
      'expo-image viser det fulle bildet over miniatyren i hurtiglageret. expo-video strømmer videoer fra NAS-en med områdeforespørsler.',
    'Connect to the NAS':
      'Et mDNS-søk lister enhetene på Wi-Fi, og en sonde finner WebDAV-porten. Innloggingen blir liggende i den sikre lagringen på telefonen.',
    'Photos away from home':
      'En sonde mot hjemmeadressen går ved oppstart og ved hvert nettbytte. Uten svar går appen over til Tailscale-adressen.',
    'Sync progress':
      'Banneret leser synkroniseringen slik den står på telefonen nå. NAS-delen kommer fra en statusfil som indekseren skriver hvert minutt.',
    'Mobile data':
      'Én sjekk vokter hver NAS-jobb på mobildata. Det lagrede svaret lar jobben gå eller får den til å vente på Wi-Fi.',
    'Index from the NAS':
      'En Node-container på NAS-en leser filhodene fra sin egen disk og skriver en indeksfil ved siden av bildene. Telefonen laster den ned og fletter inn radene den mangler.',
    'Move the index to a new phone':
      'SQLite kopierer NAS-delen av indeksen til én fil for delingsarket. Den nye telefonen kobler til filen og kopierer radene inn.',
    Language:
      'i18next holder de 9 katalogene, og expo-localization leser telefonspråket. Et valg i Innstillinger går foran og planlegger påminnelsene på nytt.',
    Theme:
      'Én palett holder et lyst og et mørkt sett farger. Skjermene leser den gjennom en hook som følger telefonen eller det lagrede valget.',
    'Ads and remove ads':
      'Google Mobile Ads viser AdMob-bannerne og fullskjermannonsen etter samtykke. expo-iap selger Fjern annonser gjennom Google Play.',
    'Memories Pro':
      'expo-iap selger produktet gjennom Google Play og App Store. Én modul sjekker kjøpet før hver låst funksjon åpner. En teller på telefonen lagrer de 5 gratis søkene i kalendermåneden, og personlisten merker de 3 personene med flest bilder som gratis.',
    'Desktop sorter':
      'En Tauri-app med Rust-backend sorterer en mappe på datamaskinen. Den bruker samme crate for mapperegler som telefonen.',
    Archive:
      'Månedslisten leser antall bilder per dag, som utløsere holder oppdatert. Et trykk henter filene i måneden etter opptakstid.',
    'Trip list and places map':
      'Turlisten slår sammen utenlandsturer og bilturer i landet fra tallene per dag. Leaflet i en WebView tegner kartet fra antall bilder per liten rute.',
    People:
      'En Rust-motor på NAS-en grupperer ansikter med YuNet og SFace. Telefonen laster ned resultatet og skriver navn og sammenslåinger tilbake til NAS-en.',
    'Journal about a person':
      'Hver person har en JSON-fil på NAS-en, skrevet med If-Match så to apper kan legge til notater. Valgte medier lastes opp ved siden av, dagens bilder kommer fra ansiktsgruppene, og en Cloudflare Worker skriver om notater fra Google-dokumentet og sender endringer fra appen tilbake.',
    'Search by what a photo shows':
      'Ansiktsmotoren på NAS-en kjører hvert bilde gjennom CLIP og beholder de beste av 362 merkelapper. Telefonen laster dem ned og kobler dem med ansikter og steder.',
    'Event folders in any file browser':
      'En Node-container på NAS-en leser hver natt taggene i mappenavnene og lager symbolske lenker til dem. Samba følger lenkene, så en SMB-klient ser vanlige mapper.',
    'Indexing progress page':
      'Ansiktsmotoren og indekseren skriver statusfiler på NAS-en. En Node-server gjør dem til en levende side med hendelser fra serveren.',
    'Albums about a person':
      'Albumfilen holder personen, fødselsdatoen og notatene. Albumserveren på NAS-en ordner bildene etter leveår.',
    'Turn a photo':
      'Ansiktsmotoren prøver hvert bilde dreid 90, 180 og 270 grader. Telefonen setter EXIF-retningen og bytter filen på NAS-en etter en sjekk.',
    'Edit a photo':
      'Konva kjører redigereren inne i en Expo DOM-komponent. Lagre kopi skriver en JPEG til telefonen og NAS-en, og Lagre erstatter filen etter en bytesammenligning.',
    'Draw a new picture':
      'Den samme Konva-redigereren åpner på et blankt ark. Lagre skriver tegningen til telefonen og NAS-en etter opplastingsreglene.',
    'Photos on the phone':
      'En lokal Expo-modul i Kotlin leser kameramappen gjennom en engangstillatelse. Filene havner i samme indeks som NAS-filene.',
    Settings:
      'Små verdier ligger i nøkkel og verdi-lageret til expo-sqlite og lastes ved oppstart. NAS-passordet ligger i den sikre lagringen.',
    'Duplicates on the NAS':
      'En spørring mot indeksen grupperer NAS-filer etter opptakstid og størrelse. En bytesammenligning over WebDAV bekrefter hvert par før kopien går til papirkurven på NAS-en.',
    Updates:
      'En delt oppdateringspakke leser siste GitHub-utgivelse og åpner Android-installasjonen. Google Play-versjonen bytter den ut med tomme erstatninger.',
    'Light, blur and fonts':
      'Konva-filtre bruker fargeglidebryterne og deretter en uskarphet rundt en ellipse eller en stripe. Hver bildetekst beholder sin skriftfamilie.',
    'On the iPhone':
      'Filer for iOS bytter Android-modulene mot versjoner for bildebiblioteket, URLSession og App Store. Mappereglene kjører som et Rust-XCFramework gjennom Swift.',
  },
};

export default arch;
