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
    Search:
      'Astro skriver tittel, beskrivelse, bildekort og strukturerte data inn i hver side ved bygging. Nettstedskartet kommer fra de bygde sidene.',
  },
};

export default arch;
