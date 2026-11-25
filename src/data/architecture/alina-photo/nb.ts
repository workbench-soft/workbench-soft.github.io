import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Én Cloudflare Worker i Rust leverer de statiske Astro-sidene og API-et. D1 holder bookinger og innstillinger, og R2 holder bildene.',
  parts: [
    { name: 'Astro', role: 'bygger de statiske sidene, head-taggene og nettstedskartet.' },
    { name: 'Rust Worker', role: 'svarer på API-et for bilder, bookinger, innlogging, gallerier og kalenderfeeden.' },
    { name: 'booking-core', role: 'Rust-craten som regner ut ledige tider, solnedgang og iCal-teksten.' },
    { name: 'D1', role: 'holder bildelisten, bookingene, galleriene, innstillingene og innloggingsøktene.' },
    { name: 'R2', role: 'holder de nedskalerte bildene, gallerifilene og en opplastet font.' },
    { name: 'Email Routing', role: 'sender Alina bookinger og spørsmål, og sender adminene innloggingslenkene.' },
    {
      name: 'Nettleserskript',
      role: 'skalerer ned, redigerer og vannmerker bilder og bygger zip-filen på personens egen enhet.',
    },
    {
      name: 'Google Kalender',
      role: 'den private iCal-adressen viser opptatte tider, og kalenderen leser bookingfeeden tilbake.',
    },
  ],
  flow: [
    'En kunde åpner en side, levert som statisk HTML av Workeren.',
    'Siden spør Worker-API-et om bilder eller ledige tider.',
    'Workeren leser D1 og Alinas kalender, og booking-core finner ledige tider.',
    'En ny booking går til D1 og til Alina på e-post med en kalenderfil.',
    'Bildene lastes fra R2 i 2 størrelser.',
  ],
  links: [
    {
      to: 'Google Calendar',
      text: 'Opptatte tider kommer inn som iCal, bufret i 5 minutter. En privat feed sender hver booking tilbake.',
    },
    { to: 'Cloudflare', text: 'Kjører Workeren, D1, R2, Email Routing og grensen for skjemaene.' },
    { to: 'GitHub', text: 'En utgivelse kjører D1-migreringene og publiserer når sjekkene består på main.' },
  ],
  design: {
    scale: [
      'Studionettstedet til én fotograf: kunder bestiller og åpner gallerier, og Alina bruker et adminområde. Trafikken er liten.',
      'Hvert bilde lagres i 2 størrelser, 2400 px og 800 px, og en kamerafil på 25 MB lastes opp som under 1 MB.',
      'En Worker-forespørsel har noen få millisekunder CPU, og wasm-bygget er omtrent 2,5 MB, noe som flyttet tungt arbeid til nettleseren.',
    ],
    data: [
      'D1 holder photos, bookings, settings, sessions, login_links, galleries og gallery_files. Tider ligger som UTC-tekst, så tekstrekkefølgen er tidsrekkefølgen.',
      'Rader i settings er JSON uten versjon. En rad som ikke lenger kan tolkes faller tilbake på standardverdien og logger en feil.',
      'R2 holder bildene som p/<id>/l.webp og s.webp, en opplastet skrift og galleri-filer under g/<gallery>/: prøvebilde, miniatyr på 160 px og original.',
    ],
    interfaces: [
      'Worker serverer JSON under /api for dager, tidsrom, bestillinger, bilder, gallerier og pålogging, og en kalendermating på /calendar/<token>.ics.',
      'Kalender inn er Alinas hemmelige iCal-adresse, bufret i 5 minutter. Kalender ut er bestillingsmatingen, og hver bestillings-e-post bærer booking.ics.',
      'E-post går ut gjennom send_email-bindingen i Email Routing, bare til Alinas verifiserte adresse.',
      'booking-core er en Rust-crate for tidsrom, ny sjekk av bestillingen, soloppgang og iCal, med crate-en rrule for gjentatte hendelser.',
    ],
    reliability: [
      'En POST for bestilling sjekker på nytt at tidsrommet fortsatt er ledig, så et tidsrom som ble tatt etter at listen lastet, avvises.',
      'En abonnert kalendermating henger timer etter, så hver bestillings-e-post bærer også iCal-filen.',
      'Utløpte økter og påloggingslenker slettes fra D1, og en lagret test holder dagens settings-rader tolkbare.',
      'Utgivelsen migrerer D1 og ruller ut, og ved Cloudflare-tidsavbrudd får migreringene og utrullingen 3 forsøk hver.',
    ],
    security: [
      'Pålogging er en lenke på e-post som gjelder i 15 minutter. Den åpner en side som sender tokenet med POST, siden e-postskannere åpner GET-lenker.',
      'En økt varer i 30 dager i en informasjonskapsel med HttpOnly og SameSite Lax, og D1 lagrer bare hashen av tokenet.',
      'En rate limit-binding i Workers tillater 5 kall i minuttet per IP på skjemaene for bestilling og e-post.',
      'Galleri-ID-en ligger i lenkens hash, så den holdes ute av serverlogger og referrere. Alle med lenken ser galleriet.',
    ],
    performance: [
      'Nettleseren krymper hvert bilde til 2 størrelser før opplasting, så en fil på 25 MB lastes opp som under 1 MB uten GPS-data.',
      'client-zip bygger galleriets zip i nettleseren, siden Worker ikke kan lese gigabyte innenfor CPU-grensen sin.',
      'Sidene er statisk Astro-HTML servert av Worker, og kalenderteksten er bufret i 5 minutter.',
    ],
    operations: [
      'Én Worker serverer sidene og API-et. worker-build gjør Rust om til wasm, og mise fester Rust, Node og pnpm.',
      'Utgivelsen starter på workflow_run når Checks består på main, én kjøring om gangen: bygg, D1-migreringer, utrulling, merke.',
      'Migreringer er nummererte SQL-filer i migrations/. Lint dekker oxlint, oxfmt, tsc, knip, rustfmt, clippy for PC-en og for wasm, og cargo shear.',
    ],
    tradeoffs: [
      'Én Worker for sider og API i stedet for GitHub Pages pluss en Worker, så admin-informasjonskapselen virker på én opprinnelse uten CORS.',
      'Pålogging med e-postlenke i stedet for passord eller Cloudflare Access, så Alina har intet passord å glemme og trenger ikke Zero Trust-oppsett.',
      'iCal inn og ut i stedet for Google Kalender-API-et, så ingen OAuth-app, gjennomgang eller token-fornyelse trengs, men en mating henger timer etter.',
      'Krymping, vannmerke og zip i nettleseren i stedet for i Worker, som har for lite CPU, til en pris av at et prøvebilde ikke kan merkes på nytt uten originalfilen.',
    ],
  },
  features: {
    Portfolio:
      'Siden henter bildelisten fra Workeren, som leser den fra D1. Hvert bilde kommer fra R2 i 2 WebP-størrelser, 800 og 2400 px.',
    Booking:
      'booking-core i Rust regner ut ledige tider fra Alinas timer, bookingene i D1 og de opptatte tidene i kalenderen hennes. Den merker gyllen time ut fra solnedgangen.',
    Questions:
      'Skjemaet går til Workeren, som skriver til Alina gjennom Cloudflare Email Routing. Hun svarer kunden rett fra den e-posten.',
    Admin:
      'Workeren sender en innloggingslenke på e-post og holder økten i D1. Bildene krymper til 2400 px og mister GPS-data i nettleseren før de går til R2.',
    'Calendar sync':
      'Workeren leser den private iCal-adressen til Alinas Google Kalender og bufrer den i 5 minutter. En privat feed og en fil i hver bookingmail sender bookingene tilbake.',
    Fonts:
      'De 10 fontene følger med nettstedet, og en opplastet font går til R2. Workeren leverer et temastilark fra valget i D1, bufret i 1 minutt.',
    'Client galleries':
      'Nettleseren tegner vannmerket på hvert prøvebilde før opplasting, og R2 holder prøvebilder og originaler. Kundens nettleser bygger zip-filen med originalene med client-zip.',
    Reviews:
      'Workeren lagrer hver omtale i D1 som ventende, bak en honningkrukke og en grense for innsendinger, og sender Alina e-post. Bare godkjente rader går ut gjennom API-et, og siden legger til Review- og AggregateRating-data.',
    Search:
      'Astro skriver tittel, beskrivelse, bildekort og strukturerte data inn i hver side ved bygging. Nettstedskartet kommer fra de bygde sidene.',
  },
};

export default arch;
