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
