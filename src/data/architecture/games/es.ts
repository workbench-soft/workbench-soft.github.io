import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Astro construye páginas estáticas, y una app de Preact lleva la sala en el navegador. Un solo Worker de Cloudflare sirve las páginas y da a cada sala su propio Durable Object.',
  parts: [
    { name: 'Astro', role: 'las páginas de inicio, de juego y de información en HTML estático para los buscadores.' },
    { name: 'Preact', role: 'la app de la sala con el lobby, los juegos y el chat.' },
    { name: 'Cloudflare Worker', role: 'sirve las páginas y abre el WebSocket de cada sala.' },
    {
      name: 'Durable Objects',
      role: 'un objeto por código de sala guarda el estado en su almacén SQLite y lleva los temporizadores.',
    },
    {
      name: 'Reglas de juego en TypeScript',
      role: 'clases simples para la sala y los 3 juegos, probadas fuera de Cloudflare.',
    },
    {
      name: 'Módulo de lienzo compartido',
      role: 'guarda un dibujo como una lista de acciones sobre una rejilla de 800 por 600.',
    },
    { name: 'Capacitor', role: 'empaqueta las mismas páginas en las apps de Android e iOS con un banner de AdMob.' },
  ],
  flow: [
    'El anfitrión crea una sala y manda el enlace.',
    'Cada jugador abre un WebSocket al Durable Object de la sala.',
    'La sala aplica las reglas del juego y manda el estado a cada jugador.',
    'Los dibujos viajan como acciones pequeñas cada 80 ms.',
    'Las alarmas cierran los turnos, y una sala vacía se borra tras 30 minutos.',
  ],
  links: [
    { to: 'Cloudflare', text: 'Workers Free aloja las páginas y las salas.' },
    { to: 'Google AdSense', text: 'AdSense muestra el banner en el sitio web.' },
    { to: 'Google AdMob', text: 'AdMob muestra el banner en las apps de Android e iOS.' },
  ],
  features: {
    'Rooms by link':
      'El Worker asigna a cada código de sala su propio Durable Object. Un token aleatorio en el navegador representa al jugador, y la sala guarda solo su hash.',
    'Kids mode':
      'La voz del navegador lee cada palabra en alto. La lista infantil une 80 palabras con un dibujo en cada uno de los 9 idiomas.',
    'Guess the drawing':
      'El objeto de la sala elige la palabra y comprueba cada intento en el servidor. Las alarmas cierran cada turno, y los puntos siguen la rapidez del acierto.',
    'Drawing telephone':
      'La sala pasa cada frase y cada dibujo al siguiente jugador con un temporizador. Cada historia queda en el almacén de la sala para el álbum.',
    'Clue duel':
      'La sala reparte un tablero común de 12 palabras y 2 palabras secretas por equipo. El servidor cuenta aparte las palabras propias y las robadas.',
    'Drawing tools':
      'El pintor del lienzo convierte cada trazo en acciones sobre una rejilla fija. La sala las manda a los demás jugadores cada 80 ms, y deshacer quita la última acción.',
    Languages:
      'La app de la sala guarda sus textos en 9 archivos, y las listas de palabras vienen en 9 idiomas. Astro construye las páginas en inglés y en ruso.',
    Ads: 'AdSense pone el banner en las páginas del sitio. En las apps lo muestra el plugin de AdMob tras el formulario de consentimiento que pide la ley.',
    'Android and iOS apps':
      'Capacitor empaqueta las páginas construidas en apps nativas que las cargan desde archivos locales. Las apps abren sus sockets en el Worker de los juegos.',
    'Party look':
      'Un CSS común pone el brillo nocturno, los pasteles claros y un color por juego. El movimiento se detiene con el ajuste de reducir movimiento.',
  },
};

export default arch;
