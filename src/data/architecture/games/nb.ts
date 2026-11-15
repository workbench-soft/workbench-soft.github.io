import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Astro bygger statiske sider, og en Preact-app driver rommet i nettleseren. Én Cloudflare Worker leverer sidene og gir hvert rom sitt eget Durable Object.',
  parts: [
    { name: 'Astro', role: 'start, spill og infosider som statisk HTML for søkemotorer.' },
    { name: 'Preact', role: 'romappen med lobbyen, spillene og chatten.' },
    { name: 'Cloudflare Worker', role: 'leverer sidene og åpner WebSocket for hvert rom.' },
    {
      name: 'Durable Objects',
      role: 'ett objekt per romkode holder tilstanden i sin SQLite-lagring og styrer tidtakerne.',
    },
    { name: 'Spillregler i TypeScript', role: 'enkle klasser for rommet og de 3 spillene, testet uten Cloudflare.' },
    {
      name: 'Delt lerretsmodul',
      role: 'holder en tegning som en liste med handlinger på et rutenett på 800 ganger 600.',
    },
    { name: 'Capacitor', role: 'pakker de samme sidene inn i appene for Android og iOS med et AdMob-banner.' },
  ],
  flow: [
    'Verten lager et rom og sender lenken.',
    'Hver spiller åpner en WebSocket til rommets Durable Object.',
    'Rommet kjører spillreglene og sender tilstanden til hver spiller.',
    'Tegninger reiser som små handlinger hvert 80. ms.',
    'Alarmer avslutter hver runde, og et tomt rom slettes etter 30 minutter.',
  ],
  links: [
    { to: 'Cloudflare', text: 'Workers Free kjører sidene og rommene.' },
    { to: 'Google AdSense', text: 'AdSense viser banneret på nettstedet.' },
    { to: 'Google AdMob', text: 'AdMob viser banneret i appene for Android og iOS.' },
  ],
  design: {
    scale: [
      'Et rom rommer opptil 12 spillere, og hintduellen trenger minst 4.',
      'Workers Free gir 100 000 forespørsler i døgnet, rundt 40 timer tegning i døgnet.',
      'En melding er begrenset til 256 KB, og en tegning til 3000 handlinger.',
    ],
    data: [
      'Hvert rom er et Durable Object med eget SQLite-lager og 3 slags nøkler: meta, canvas og chain:N.',
      'meta holder spillerne, poengene, innstillingene, fasen, chatten og spilltilstanden etter hver endring. canvas lagres høyst hvert 2. sekund.',
      'En tegning er en liste med handlinger på et rutenett på 800 ganger 600. Nettleseren holder en token og innstillinger under nøkler som starter med wg-.',
    ],
    interfaces: [
      'Én WebSocket per spiller på /games/ws/CODE. Worker kobler koden til romobjektet med idFromName.',
      'Den første meldingen, hello, bærer protokollversjonen, token, navn og farge. Etter den kommer state, chat og draw.',
      'Android- og iOS-appene åpner de samme socketene mot spill-Workeren. En Origin-sjekk slipper inn nettstedet og appene.',
    ],
    reliability: [
      'Hibernation API lar et rom i ro forlate minnet, og en socketmelding eller en alarm vekker det fra lageret.',
      'Alarmer driver hver frist og rydder et rom 30 minutter etter at det er tomt.',
      'Et PROTOCOL-nummer lar Worker svare en gammel app i dens eget format. En spiller som faller ut, beholder plassen til rommet fylles på 24 plasser.',
    ],
    security: [
      'Ingen konto. Nettleseren holder en tilfeldig token, og rommet lagrer hashen som spiller-id.',
      'Romobjektet velger ordet og sjekker hvert gjett, så svaret blir på serveren.',
      'Socketer fra andre nettsteder avvises. Navn er begrenset til 20 tegn, chatlinjer til 100.',
    ],
    performance: [
      'Tegningen går som små handlingslister hvert 80. ms, ikke som piksler.',
      'Med hibernation teller 20 WebSocket-meldinger som 1 forespørsel.',
      'Statiske sider koster ingenting, siden run_worker_first bare sender romlenker og socketer gjennom Worker-koden.',
    ],
    operations: [
      'Én Worker rulles ut med wrangler: den statiske mappa dist/ pluss romobjektet. Games-arbeidsflyten ruller ut ved hvert push til main.',
      'mise run check kjører oxlint, typesjekken og Vitest på reglene i hvert spill.',
      'Observerbarhet for Worker er på. Android-appen går ut gjennom lukket testing hos Google Play.',
    ],
    tradeoffs: [
      'Durable Objects med hibernation i stedet for Supabase Realtime, PartyKit eller en VPS, så ingen server og et gratisnivå. Romkoden er skrevet for Cloudflare.',
      'Statiske Astro-sider med en Preact-øy i stedet for en Preact-enkeltsideapp, så søkemotorene får full HTML.',
      'Tegnehandlinger på et fast rutenett i stedet for piksler, så meldingene blir små og angre er ett steg.',
      'Capacitor i stedet for en Trusted Web Activity eller React Native, så de samme sidene kjører i appene med et eget AdMob-banner.',
    ],
  },
  features: {
    'Rooms by link':
      'Worker kobler hver romkode til sitt eget Durable Object. Et tilfeldig token i nettleseren står for spilleren, og rommet lagrer bare hashen.',
    'Kids mode':
      'Nettleserens talestemme leser hvert ord høyt. Barneordlisten knytter 80 ord til et bilde på hvert av de 9 språkene.',
    'Guess the drawing':
      'Romobjektet velger ordet og sjekker hvert gjett på serveren. Alarmer avslutter hver runde, og poengene følger farten på gjettet.',
    'Drawing telephone':
      'Rommet gir hver setning og hver tegning videre til neste spiller etter en tidtaker. Hver historie havner i rommets lagring til albumet.',
    'Clue duel':
      'Rommet deler ut et felles brett med 12 ord og 2 hemmelige ord per lag. Serveren teller egne ord og stjålne ord hver for seg.',
    'Drawing tools':
      'Lerretsmaleren gjør hvert strøk om til handlinger på et fast rutenett. Rommet sender dem til de andre spillerne hvert 80. ms, og angre fjerner den siste handlingen.',
    Languages:
      'Romappen har tekstene i 9 språkfiler, og ordlistene finnes på 9 språk. Astro bygger sidene på engelsk og russisk.',
    Ads: 'AdSense setter banneret på sidene på nettstedet. I appene viser AdMob-tillegget for Capacitor det etter samtykkeskjemaet der loven krever det.',
    'Android and iOS apps':
      'Capacitor pakker de bygde sidene inn i native apper som laster dem fra lokale filer. Appene åpner forbindelsene sine mot spillenes Worker.',
    'Party look':
      'Felles CSS setter nattlig glød, lyse pasteller og en farge per spill. Bevegelsen stopper med innstillingen for redusert bevegelse.',
  },
};

export default arch;
