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
  design: {
    scale: [
      'Una sala admite hasta 12 jugadores, y el duelo de pistas necesita al menos 4.',
      'Workers Free da 100 000 peticiones al día, unas 40 horas de dibujo al día.',
      'Un mensaje se limita a 256 KB, y un dibujo a 3000 acciones.',
    ],
    data: [
      'Cada sala es un Durable Object con su propio almacenamiento SQLite y 3 tipos de clave: meta, canvas y chain:N.',
      'meta guarda los jugadores, las puntuaciones, los ajustes, la fase, el chat y el estado del juego tras cada cambio. canvas se guarda como mucho cada 2 segundos.',
      'Un dibujo es una lista de acciones sobre una cuadrícula de 800 por 600. El navegador guarda un token y ajustes bajo claves que empiezan por wg-.',
    ],
    interfaces: [
      'Un WebSocket por jugador en /games/ws/CODE. El Worker enlaza el código con el objeto de la sala mediante idFromName.',
      'El primer mensaje, hello, lleva la versión del protocolo, el token, el nombre y el color. Después vienen state, chat y draw.',
      'Las apps de Android e iOS abren los mismos sockets en el Worker de los juegos. Una comprobación de Origin deja pasar el sitio y las apps.',
    ],
    reliability: [
      'La API de hibernación deja que una sala inactiva salga de la memoria, y un mensaje de socket o una alarma la despierta desde el almacenamiento.',
      'Las alarmas llevan cada plazo y limpian una sala 30 minutos después de quedar vacía.',
      'Un número PROTOCOL deja que el Worker responda a una app antigua en su formato. Un jugador desconectado conserva su plaza hasta que la sala llega a 24 plazas.',
    ],
    security: [
      'Sin cuenta. El navegador guarda un token aleatorio, y la sala guarda su hash como id del jugador.',
      'El objeto de la sala elige la palabra y comprueba cada intento, así que la respuesta se queda en el servidor.',
      'Se rechazan los sockets de otros sitios. Los nombres se limitan a 20 caracteres, las líneas de chat a 100.',
    ],
    performance: [
      'El dibujo viaja en listas pequeñas de acciones cada 80 ms, no en píxeles.',
      'Con hibernación, 20 mensajes de WebSocket cuentan como 1 petición.',
      'Las páginas estáticas no cuestan nada, porque run_worker_first solo manda por el código del Worker los enlaces de sala y los sockets.',
    ],
    operations: [
      'Un Worker se despliega con wrangler: la carpeta estática dist/ y el objeto de sala. El workflow Games despliega en cada push a main.',
      'mise run check ejecuta oxlint, la comprobación de tipos y Vitest sobre las reglas de cada juego.',
      'La observabilidad del Worker está activa. La app de Android sale por la prueba cerrada de Google Play.',
    ],
    tradeoffs: [
      'Durable Objects con hibernación en lugar de Supabase Realtime, PartyKit o un VPS, sin servidor y con plan gratuito. El código de la sala está escrito para Cloudflare.',
      'Páginas estáticas de Astro con una isla de Preact en lugar de una aplicación de una página con Preact, para que los buscadores reciban HTML completo.',
      'Acciones de dibujo sobre una cuadrícula fija en lugar de píxeles, para que los mensajes sean pequeños y deshacer sea un paso.',
      'Capacitor en lugar de una Trusted Web Activity o React Native, para que las mismas páginas corran en las apps con un banner nativo de AdMob.',
    ],
  },
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
