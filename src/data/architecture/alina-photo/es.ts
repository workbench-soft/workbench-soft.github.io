import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Un solo Cloudflare Worker en Rust sirve las páginas estáticas de Astro y la API. D1 guarda las reservas y los ajustes, y R2 guarda las fotos.',
  parts: [
    { name: 'Astro', role: 'genera las páginas estáticas, las etiquetas de cabecera y el mapa del sitio.' },
    { name: 'Rust Worker', role: 'responde la API de fotos, reservas, acceso, galerías y el feed del calendario.' },
    { name: 'booking-core', role: 'el crate de Rust que calcula las horas libres, la puesta de sol y el texto iCal.' },
    { name: 'D1', role: 'guarda la lista de fotos, las reservas, las galerías, los ajustes y las sesiones.' },
    { name: 'R2', role: 'guarda las fotos reducidas, los archivos de galería y una fuente subida.' },
    { name: 'Email Routing', role: 'envía a Alina las reservas y preguntas, y a los admins sus enlaces de acceso.' },
    {
      name: 'Scripts del navegador',
      role: 'reducen, editan y marcan las fotos y arman el zip en el propio dispositivo.',
    },
    {
      name: 'Google Calendar',
      role: 'su dirección iCal privada marca las horas ocupadas, y él lee de vuelta el feed de reservas.',
    },
  ],
  flow: [
    'Un cliente abre una página, que el Worker sirve como HTML estático.',
    'La página pide a la API del Worker fotos u horas libres.',
    'El Worker lee D1 y el calendario de Alina, y booking-core halla las horas libres.',
    'Una reserva nueva va a D1 y a Alina por email con un archivo de calendario.',
    'Las fotos cargan desde R2 en 2 tamaños.',
  ],
  links: [
    {
      to: 'Google Calendar',
      text: 'Las horas ocupadas llegan como iCal, en caché 5 minutos. Un feed privado devuelve cada reserva.',
    },
    { to: 'Cloudflare', text: 'Ejecuta el Worker, D1, R2, Email Routing y el límite de envíos de los formularios.' },
    {
      to: 'GitHub',
      text: 'Una versión aplica las migraciones de D1 y despliega cuando pasan las comprobaciones en main.',
    },
  ],
  features: {
    Portfolio:
      'La página carga la lista de fotos desde el Worker, que la lee de D1. Cada foto viene de R2 en 2 tamaños WebP, 800 y 2400 px.',
    Booking:
      'booking-core en Rust calcula las horas libres con el horario de Alina, las reservas en D1 y las horas ocupadas de su calendario. Marca la hora dorada según la puesta de sol.',
    Questions:
      'El formulario va al Worker, que escribe a Alina con Cloudflare Email Routing. Ella responde al cliente desde ese mismo email.',
    Admin:
      'El Worker envía un enlace de acceso por email y guarda la sesión en D1. Las fotos bajan a 2400 px y pierden el GPS en el navegador antes de ir a R2.',
    'Calendar sync':
      'El Worker lee la dirección iCal privada del Google Calendar de Alina y la guarda 5 minutos en caché. Un feed privado y un archivo en cada email de reserva devuelven las reservas.',
    Fonts:
      'Las 10 fuentes vienen con el sitio, y una fuente subida va a R2. El Worker sirve una hoja de tema según la elección en D1, en caché 1 minuto.',
    'Client galleries':
      'El navegador dibuja la marca de agua en cada prueba antes de subirla, y R2 guarda pruebas y originales. El navegador del cliente arma el zip de originales con client-zip.',
    Search:
      'Astro escribe el título, la descripción, la tarjeta con foto y los datos estructurados en cada página al compilar. El mapa del sitio sale de las páginas generadas.',
  },
};

export default arch;
