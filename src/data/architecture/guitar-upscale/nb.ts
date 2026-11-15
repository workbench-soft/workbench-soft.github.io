import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'En Next.js-app kjører i nettleseren og på Cloudflare Workers. Capacitor pakker det samme bygget inn i appene for Android og iPhone, og lydmotoren kjører på enheten.',
  parts: [
    {
      name: 'Next.js og React',
      role: 'den ene siden med hver funksjon, gjengitt én gang av serveren og så kjørt i nettleseren.',
    },
    { name: 'Lydmotor', role: 'spillerne og opptakerne utenfor React, koblet sammen med en hendelsesbuss i RxJS.' },
    { name: 'Web Workers', role: 'taktklokken, søket etter grep og akkordgjenkjenningen utenfor hovedtråden.' },
    { name: 'smplr og Web Audio', role: 'samplede General MIDI-instrumenter med en buss for romklang og delay.' },
    { name: 'Redux Toolkit', role: 'innstillingene og skjermtilstanden, lagret i nettleseren.' },
    { name: 'Konva', role: 'lerretene for gripebrettet, piano roll og tabulaturen.' },
    { name: 'Capacitor', role: 'pakker det statiske bygget inn i appene for Android og iPhone med native tillegg.' },
    {
      name: 'Cloudflare Workers og KV',
      role: 'kjører serverbygget med OpenNext, videresender til sangsidene og lagrer de innebygde sangene.',
    },
  ],
  flow: [
    'Et trykk, en akkord eller en lastet sang legger toner på bussen.',
    'En klokke i en Web Worker holder avspilling, anslag og looper i takt.',
    'Biblioteket smplr spiller hver tone gjennom romklang og delay.',
    'Opptakerne lagrer hver tone etter tick for piano roll og MIDI.',
    'Sanger og tekster fra andre sider kommer via Worker på Cloudflare.',
  ],
  links: [
    { to: 'lumiere-player', text: 'Lumiere Player åpner sangen som spilles i Guitar Upscale via en lenke.' },
    { to: 'keeppad', text: 'Frasen Hey Guitar bruker den samme nøkkelordmodellen fra sherpa-onnx som KeepPad.' },
    { to: 'Songsterr', text: 'Tabulaturer fra Songsterr kommer via proxyen i Worker og blir Guitar Pro-filer.' },
    { to: 'Google Play', text: 'Google Play selger Pro og Remove ads, og AdMob viser annonsene.' },
    { to: 'Cloudflare', text: 'Cloudflare Workers kjører nettstedet, og KV lagrer de innebygde sangene.' },
  ],
  design: {
    scale: [
      'Én spiller per enhet, og lyd, klokke og opptakere kjører alle på enheten.',
      'Rundt 100 innebygde sanger kommer som Guitar Pro-filer, og brukerens egne sanger blir i nettleseren.',
      'Tungt arbeid har harde grenser. Én akkordgjenkjenning kan øke wasm-minnet til rundt 600 MB, og en Worker-opplasting holdes under 3 MiB.',
    ],
    data: [
      'Redux-slicer for innstillinger, skjermtilstand og pianorull lagres i localStorage, én nøkkel per slice.',
      'Sanger, opptak, loops og pianorull-endringer deler én TickTimeline med noter og akkorder lagt etter klokketikk.',
      'Innebygde sanger ligger i Cloudflare KV etter filnavn, med én song-settings.json for akkordvalget til hver sang.',
    ],
    interfaces: [
      'Sangsider går gjennom Worker-ruter: Songsterr-søk og meta, søk og nedlasting av sangfiler og sangtekster.',
      'Noter og akkorder går over to RxJS-subjects, så avsenderen vet ikke hvem som spiller, tar opp eller animerer dem.',
      'Sanger lastes som .gp- eller MIDI-filer og eksporteres likt. Den innebygde listen er songs/index.json, og hver sang er songs-json/<name>.json med en innholdshash i adressen.',
    ],
    reliability: [
      'Hver side-proxy har en tidsgrense. Et tekstoppslag som feiler fordi en side var nede, havner ikke i bufferen.',
      'Et versjonshopp i redux-persist sletter en slice lagret under gammel versjon, og looperen lagrer loopene før et bytte av skala, stemming eller capo sletter dem.',
      'En melodi hopper over en tikk som ventet over 10 ms, opptil 8 på rad, så tregt gjenopptegning etter Play ikke forsinker første tone.',
    ],
    security: [
      'Eier-ruten sjekker SHA-256 av utviklernøkkelen og svarer 404 ved bom. GitHub-tokenet for utrullingen ligger i en Worker-hemmelighet.',
      'CORS slipper bare Capacitor-opphavene og siden til proxyene, og serverbygget sender HSTS, nosniff og frame-ancestors none.',
      'Akkorder fra en lydfil gjenkjennes på enheten med ONNX. Bare GitHub-APK-en sender en kort prøve til Shazam for å navngi en sang.',
    ],
    performance: [
      'Taktklokken kjører i en Web Worker med tidsavbrudd rettet mot eksakt tid siden start, så en travel hovedtråd ikke bremser takten.',
      'En pool med opptil 4 workere finner akkordgrep én akkordtype om gangen, og hver funksjon i appen lastes som en lat komponent.',
      'Akkordmodellene lastes ved første bruk og blir i Cache Storage. Lydkonteksten på telefonen ber om en buffer på 12 ms, siden etterklangen knitret med 4 til 8 ms.',
    ],
    operations: [
      'Hver push til main starter sjekker og Android-bygget side om side, og en mislykket sjekk avbryter kjøringen. Utgivelsen kommer når begge består.',
      'En nattjobb klokken 19.00 Sydney-tid bygger Google Play-pakken bare når appen er endret. En pakke tok 40 til 46 minutter på den tunge runneren.',
      'OpenNext bygger serveren for Cloudflare Workers med observerbarhet på. Utgivelser får en tag med dato og teller, og GitHub-bygget oppdaterer seg etter dem.',
    ],
    tradeoffs: [
      'Ett statisk bygg for siden, Android og iPhone framfor native apper, så hver funksjon skrives én gang, på bekostning av Capacitor-plugins for lyd og kjøp på telefonen.',
      'Motoren kjører utenfor React med en enkel kopi av innstillingene framfor å lese storen overalt, så lydkode slipper hooks, på bekostning av et speil som må holdes i takt.',
      'Akkordmodeller kjører på enheten framfor et server-API, så en fil aldri forlater telefonen, på bekostning av 14 MB modeller ved første kjøring.',
      'Samplede General MIDI-instrumenter framfor en synth, for ekte gitar- og pianolyd, på bekostning av å laste samples ved første trykk.',
    ],
  },
  features: {
    Fretboard:
      'Konva tegner gripebrettet på et lerret ut fra skalaen og stemmingen i innstillingene. Et trykk sender tonen på bussen, og smplr spiller den.',
    'Scale, tuning and capo':
      'Skalaene og stemmingene er faste data i appen. Et valg går til Redux, og gripebrettet og grepene bygges på nytt.',
    Tuner:
      'Biblioteket pitchy leser tonehøyden fra mikrofonen rett i nettleseren. Appen gjetter stemmingen ut fra løse strenger, og Konva tegner skiven.',
    Chords:
      'En gruppe på opptil 4 Web Workers finner grepene for gripebrettet og kapoen. Panelet fylles én akkordtype om gangen.',
    Strumming:
      'Hver akkordknapp som holdes inne spiller det valgte mønsteret på klokken i Worker. Egne mønstre blir lagret i nettleseren.',
    'Song list':
      'Innebygde sanger er Guitar Pro-filer i Cloudflare KV og blir JSON ved bygging. Dine sanger blir i nettleseren, og listen viser skalaen til hver sang.',
    'Voice search':
      'I nettleseren hører Speech API ordene, og Android-appen bruker talefunksjonen på telefonen. Deretter spiller appen sangen fra listen eller søker på sangsidene.',
    'Hey Guitar':
      'På Android hører en nøkkelordmodell fra sherpa-onnx hentet fra KeepPad frasen uten nett. I nettleseren lytter talefunksjonen mens siden er åpen.',
    'MIDI recording':
      'En opptaker lytter på bussen og lagrer hver tone etter klokkens tick. Toner appen spiller selv har et merke, så opptaket hopper over dem.',
    Looper:
      'Hver av opptil 8 kanaler tar opp fra bussen på klokken i Worker. Loopene rundes av til hele takter og spiller i takt.',
    Quantize:
      'Én lengde i innstillingene setter rutenettet i piano roll. Opptakerne flytter hver tone til rutenettet med en gang den kommer inn.',
    'Piano roll':
      'Piano roll redigerer den delte tonelinjen på stedet, med angre per spor. Konva tegner tonene, og en worker gjetter sangdelene når filen mangler dem.',
    'Tab view':
      'En layoutmodul gjør tonene i ett spor om til bånd på strenger. Konva tegner taktene og følger den delte spilleposisjonen.',
    'Chord sheet':
      'Worker henter tekstene fra sider for akkorder og tekster fordi de stenger kall fra nettleseren. Appen flytter akkordene til sangens toneart og legger hver linje på riktig tid.',
    'Song upload':
      'Lesere gjør Guitar Pro-filer og MIDI-filer om til toner i nettleseren. En lydfil søker etter sangen sin på navnet, eller ONNX-modeller hører akkordene på enheten.',
    'Find a song online':
      'Worker på Cloudflare sender hvert søk videre til de 4 sangsidene som stenger kall fra nettleseren. Appen gjør en sang fra Songsterr om til en Guitar Pro-fil.',
    'Chord and scale detection':
      'En akkorddetektor i en Web Worker sammenligner de trykte tonene med grepene. Skaladetektoren kjører på hovedtråden og foreslår skalaer.',
    'Instruments and sound':
      'Biblioteket smplr spiller General MIDI-lyder fra frie samplesett og laster dem ved første trykk. Melodien og akkordene får hvert sitt instrument.',
    Effects:
      'Hvert instrument går inn i en Web Audio-buss med konvolusjonsklang og delay med tilbakekobling. En glidebryter endrer bussen direkte uten å laste instrumentet på nytt.',
    'MIDI export':
      'Biblioteket midi-writer-js skriver de lastede tonene til en MIDI-fil. En Guitar Pro-skriver lagrer de samme tonene som en Guitar Pro-fil.',
    'Guitar Upscale Pro':
      'Hvert bygg har hver funksjon med. Android-appen skjuler Pro-funksjonene til Google Play Billing på telefonen melder kjøpet.',
    'Install and offline':
      'En service worker mellomlagrer sidene, koden og sangene for bruk uten nett. Android-appen har det statiske bygget og lydene inne i APK-en.',
    'iPhone app':
      'Capacitor pakker det samme statiske bygget inn i et iOS-prosjekt med tillegg i Swift. StoreKit selger kjøpene, og AdMob viser annonser etter spørsmålet om sporing.',
    'Screen layout':
      'React-komponenter svever over lerretet med gripebrettet i fullskjerm. En innstilling legger akkordene til venstre eller høyre.',
    'Play panel':
      'En spiller går gjennom tonelinjen på klokken i Worker og sender hver tone til bussen. Akkordpanelet henter grepene sine fra workerne som søker etter grep.',
    'Easy and Pro mode':
      'Et filter i spilleren beholder bare akkordene mens Easy er på. En sang uten akkorder spilles hel.',
    'Song links':
      'Menyen lager en søkeadresse på hver side ut fra sangnavnet. Siden åpnes i en ny fane eller i nettleseren på Android.',
    'Built-in songs admin':
      'Adminsiden og eierens telefon skriver sanger til Cloudflare KV. Ruten for telefonen sjekker en utviklernøkkel og starter en utrulling via GitHub Actions.',
    Settings:
      'Redux Toolkit holder hver innstilling, og redux-persist lagrer den i nettleseren. Motoren leser en enkel kopi utenfor React.',
    'Android updates':
      'Bygget fra GitHub spør GitHub Releases etter en nyere APK ved oppstart og ved retur. Et native tillegg laster den ned og åpner installasjonen.',
    Ads: 'AdMob viser banneret og fullskjermannonsen i appene. Et kjøp av Remove ads i Google Play eller utviklernøkkelen på telefonen slår dem av.',
    Languages:
      'i18next holder apptekstene i 10 kataloger og følger språket på telefonen eller i nettleseren. Leksjonssidene bygges per språk under sin egen sti.',
  },
};

export default arch;
