import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Farnear er én React-nettapp, pakket inn i Kotlin for Android og i Capacitor for iPhone. En Rust-Worker hos Cloudflare sender de forseglede romsmeldingene videre, og selve samtalen går rett mellom enhetene.',
  parts: [
    { name: 'React og Vite', role: 'skjermene, romsiden og forsiden, ferdig gjengitt på 9 språk.' },
    { name: 'WebRTC', role: 'lyd, video og datakanalene til tavlen, rett mellom opptil 4 enheter.' },
    {
      name: 'Rust-Worker og Durable Object',
      role: 'ett objekt per rom sender de forseglede meldingene videre og deler ut reléinnstillinger.',
    },
    { name: 'TURN-reléer', role: 'bærer de krypterte mediene når en direkte vei mellom 2 nett feiler.' },
    {
      name: 'Tavlemoduler',
      role: 'ren TypeScript holder strekene, de slettede strekene og filoverføringen utenfor React.',
    },
    { name: 'Whisper og MediaPipe', role: 'tale til tekst og videobakgrunnen, begge på enheten.' },
    { name: 'Kotlin-skall', role: 'Android-appen rundt det levende nettstedet, med AdMob, Play Billing og ringingen.' },
    { name: 'Capacitor og Swift', role: 'iPhone-appen rundt det samme nettstedet, med StoreKit og delingsarket.' },
  ],
  flow: [
    'En romlenke bærer nøkkelen sin, og siden åpner med den.',
    'Siden går inn i rommet på Workeren over en WebSocket.',
    'Enhetene bytter forseglede tilbud og nettveier gjennom Workeren.',
    'WebRTC kobler enhetene direkte eller gjennom et relé.',
    'Video, lyd, tavlestreker og filer går mellom enhetene.',
  ],
  links: [
    { to: 'Cloudflare', text: 'Workeren, Durable Object og et TURN-relé kjører i gratisnivået.' },
    { to: 'consdr', text: 'Android-skallet flytter AdMob- og Play Billing-koden fra Consdr over til Kotlin.' },
    { to: 'Google Play', text: 'Play Billing selger Fjern annonser og Farnear Pro, og AdMob viser Android-annonsene.' },
    {
      to: 'app-updater',
      text: 'WBS Updater sammenligner den installerte versjonen med den nyeste utgivelsen på GitHub.',
    },
    { to: 'Hugging Face', text: 'Skriveren laster ned Whisper-vektene derfra én gang.' },
  ],
  design: {
    scale: [
      'Én samtale kobler opptil 4 enheter i et mesh, og hver enhet sender videoen sin til de 3 andre.',
      'Et romobjekt rommer høyst 6 sockets, 64 KB per melding og 20 meldinger i sekundet, så en flom blir i ett rom.',
      'Worker, Durable Object og relé kjører på gratisnivå, siden bare små forseglede meldinger går gjennom dem.',
    ],
    data: [
      'Ingen kontodatabase. Navn, språk, lagrede rom og push-nøkler ligger i localStorage under ett versjonert prefiks.',
      'Transkripsjonen og tekstmeldingene i hvert rom ligger i IndexedDB på hver enhet.',
      'Durable Object holder bare relékvoten og et bufret relésvar i 90 minutter. KV lagrer tilkoblingsrapporter i 14 dager.',
    ],
    interfaces: [
      'Signaleringen går over en WebSocket til romobjektet. Hver melding er en AES-GCM-konvolutt med versjon, id og løpenummer.',
      'Hvert par av enheter åpner 3 forhandlede datakanaler: levende punkter, kontrollmeldinger og filbiter.',
    ],
    reliability: [
      'Etter 3 sekunders brudd sender den laveste peer-id-en et ICE-restart-tilbud, med ventetid på 12, 18 og 25 sekunder.',
      'En helsesjekk leser hvert spor hvert 3. sekund. Stans i 15 sekunder starter en ICE-reparasjon, så en ombygging av paret.',
      'Konvolutt-id-en kaster en kopi, løpenummeret en gjentakelse og tilbuds-id-en et foreldet svar.',
    ],
    security: [
      'Romnøkkelen står etter # i lenken, så Worker ser chiffertekst uten navn, titler eller tilbud.',
      'Media går over DTLS-SRTP mellom enhetene, og et TURN-relé bærer bare krypterte pakker.',
      'Romsiden laster ikke noe annonseskript og har noindex, så ingen tredjepartskode kjører ved siden av nøkkelen.',
    ],
    performance: [
      'Lerretet og WebRTC-kallene kjører i vanlige moduler, og React leser små lagre gjennom useSyncExternalStore.',
      'Worker bufrer relé-innstillingene i 90 minutter per rom og henter høyst 20 per rom og dag hos leverandøren.',
      'Whisper kjører på WebGPU der det finnes, ellers den lille modellen på WebAssembly. Store filer venter til kanalen er tom.',
    ],
    operations: [
      'Checks kjører lint, tester og bygg ved hver push til main, så går siden til GitHub Pages og Worker ut med wrangler.',
      'APK-en bygges bare når android/ er endret, siden appen laster den levende siden. En webendring får en tagg uten tung runner.',
      'En nattkjøring kl. 19:00 Sydney bygger Play-pakken når android/ er endret. En mislykket Checks avbryter byggingen.',
    ],
    tradeoffs: [
      'Et mesh av direkte lenker i stedet for en medieserver: ingen video lagres hos oss, og det koster ingenting. Opplastingen vokser med hver person, så samtaler stopper på 4.',
      'Et skall rundt den levende siden i stedet for native skjermer: en nettrettelse går ut uten butikkgjennomgang. Appen trenger nett.',
      'Whisper i nettleseren i stedet for skybasert talegjenkjenning, så lyden blir på enhetene. Første bruk laster ned modellvektene.',
    ],
  },
  features: {
    'Calls through a link':
      'Slutten av lenken bærer romnøkkelen, så Workeren ser bare forseglede meldinger. WebRTC kobler så opptil 4 enheter i et nett.',
    'Recover a dropped call':
      'Etter et brudd sender én side et tilbud om ICE-omstart, opptil 3 ganger. En kø per motpart hindrer at et gammelt svar vinner.',
    'Return to a call':
      'Nettleseren husker den åpne samtalen i 30 minutter, så lenken går inn igjen av seg selv. En Web Lock per rom lar en nyere fane ta over samtalen.',
    'Relay for blocked networks':
      'Workeren gir hver nettleser kortvarige TURN-innstillinger over sin socket. ICE prøver direkte veier først og går så over til et relé.',
    'Share the call link':
      'Invitasjonspanelet lager et utkast for Gmail, WhatsApp eller Telegram på appspråket. Andre apper åpner delingsarket i systemet.',
    'Saved rooms':
      'En romlenke ligger i nettleserlageret under et navn, og ingen server har listen. Den samme nøkkelen åpner det samme rommet hver gang.',
    Board:
      'Rene moduler holder strekene og de slettede strekene som 2 mengder og sender dem over WebRTC-datakanaler. Et lerret tegner dem utenfor React.',
    'Share an image or video':
      'Filen går i biter over sin egen datakanal til hver person. Avspilling, pause og hopp fra den som deler går over kontrollkanalen.',
    Lessons:
      'Eierens enhet sender låsen, tiden som er igjen og zoomen over kontrollkanalen. Tavlen holder strekene for hver side, og lysbildene venter i IndexedDB.',
    'Contacts and ringing':
      'Ringingen er et web-push forseglet for den andre enheten og sendt gjennom Workeren. Android-appen tar imot det gjennom Google Play-tjenester, uten Firebase.',
    'Ads and remove ads':
      'AdMob viser Android-banneret og annonsen etter en samtale. Play Billing selger fjerningen, og romsiden laster ikke noe annonseskript.',
    'Farnear Pro':
      'Play Billing selger Pro i Android-appen, og nettlesere får verktøyene gratis. En enhet med Pro sier fra i sin forseglede hilsen, og rommet åpner tavlen.',
    'Android app':
      'Et Kotlin-skall med WebView laster det levende nettstedet og gir det kamera og mikrofon. CI signerer hver APK og legger den i en offentlig GitHub-utgivelse.',
    'iPhone app':
      'Capacitor laster det levende nettstedet, og Swift-tvillinger av Kotlin-delene legger til StoreKit, AdMob og delingsarket. Koden venter på sitt første bygg.',
    Languages: 'i18next holder de 9 katalogene, og et valg bytter hver skjerm med en gang. Valget blir på enheten.',
    'App icon':
      'Én SVG er kilden til favikonet, nettikonene og størrelsene for Android-oppstarteren. Android får i tillegg et adaptivt ikon og et temaikon.',
    'Call stage':
      'En scenemodul velger den store flisen og stripen ut fra festing og delt skjerm. Hver enhet måler stemmene selv for taleringen.',
    'Share a screen':
      'Hver tilkobling holder av en ledig videoplass fra start, så en delt skjerm trenger ikke et nytt tilbud. Tavlen tegner oppå.',
    'Take a photo':
      'modern-screenshot fanger den synlige samtalen som PNG, med video og tavle. Android-appen lagrer den i Nedlastinger, og bildet holdes unna serverne.',
    'Your name':
      'Navnet blir i nettleserlageret og går til de andre i den forseglede hilsenen. En endring vises fra neste samtale.',
    'Video background':
      'MediaPipe finner personen på enheten, og et lerret tegner personen over en uskarphet eller et bilde. Lerretssporet erstatter kameraet før det sendes.',
    'Call transcript and summary':
      'Én enhet kjører Whisper i nettleseren, på WebGPU der det går. Linjene går til de andre over en datakanal og blir i IndexedDB. Den innebygde oppsummereren i Chrome skriver sammendraget.',
    'Recover stalled media':
      'En helsesjekk leser innkommende byte og bilder for hvert spor hvert 3. sekund. Et stopp på 15 sekunder starter en ICE-reparasjon og så en ny oppbygging av paret.',
    'Shared call titles':
      'Tittelen går i den forseglede signaleringen med en versjonsteller. Den nyeste versjonen vinner på hver enhet, og Workeren kan ikke lese den.',
    'Shared documents on the board':
      'PDF.js maler en PDF-side og en PowerPoint-gjengiver maler et lysbilde på enheten. Sidebytter og fjerning går over kontrollkanalen.',
    'Board text':
      'En tekst er en tavlelinje med ord og ett punkt, så den synkroniseres, viskes ut og angres som blekk. Skrifthøyden er en andel av tavlehøyden, så den holder plassen ved all zoom.',
    'Board stamps':
      'Et stempel er en tavlestrek med ett punkt og en type, så det synkroniseres, viskes ut og angres som blekk. Størrelsen er en andel av tavlehøyden.',
    'Contacts and rooms':
      'Kontakter og rom deler én lagret liste i nettleseren, hver oppføring med sin type. Et kontaktnavn blir på enheten, og en romtittel synkroniseres.',
    'Search and share preview':
      'Et Vite-tillegg gjengir forsiden på hvert av de 9 språkene ved bygging. Et annet skriver nettstedskartet, og hver side har sine forhåndsvisningstagger.',
    'Messages in a call':
      'En linje går forseglet over romsignaleringen, atskilt fra videoveien. Hver enhet holder den i IndexedDB og bytter manglende linjer ved neste samtale.',
    'Reactions and raised hands':
      'Hver reaksjon går som en forseglet melding over rommets signalering, høyst 3 i sekundet. En hånd i været følger deltakerstatusen som listen gjentar hvert 5. sekund, så de som kommer sent ser den. CSS-keyframes tegner stigningen og glimtene.',
    'Button hints':
      'Én felles modul viser boblen etter en hover eller et langt trykk. Et langt trykk viser navnet og trykker ikke på knappen.',
    'Close Farnear and take back its permissions':
      'Siden avslutter samtalen og ringingen og ber Android-skallet gi fra seg tillatelsene og lukke seg. En nettleser får stegene for å nullstille dem for hånd.',
  },
};

export default arch;
