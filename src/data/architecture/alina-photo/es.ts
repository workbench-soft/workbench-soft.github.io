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
  design: {
    scale: [
      'El sitio de estudio de una fotógrafa: los clientes reservan y abren galerías, y Alina lleva una zona de administración. El tráfico es pequeño.',
      'Cada foto se guarda en 2 tamaños, 2400 px y 800 px, y un archivo de cámara de 25 MB se sube como menos de 1 MB.',
      'Una petición del Worker tiene unos milisegundos de CPU y la compilación wasm pesa unos 2,5 MB, lo que llevó el trabajo pesado al navegador.',
    ],
    data: [
      'D1 guarda photos, bookings, settings, sessions, login_links, galleries y gallery_files. Las horas van en texto UTC, así que el orden del texto es el orden del tiempo.',
      'Las filas de settings son JSON sin versión. Una fila que ya no se analiza vuelve al valor por defecto y registra un error.',
      'R2 guarda las fotos como p/<id>/l.webp y s.webp, una fuente subida y los archivos de galería bajo g/<gallery>/: prueba, miniatura de 160 px y original.',
    ],
    interfaces: [
      'El Worker sirve JSON bajo /api para días, franjas, reservas, fotos, galerías e inicio de sesión, y un feed de calendario en /calendar/<token>.ics.',
      'El calendario de entrada es la dirección iCal secreta de Alina, en caché 5 minutos. El de salida es el feed de reservas, y cada correo de reserva lleva booking.ics.',
      'El correo sale por el enlace send_email de Email Routing, solo a la dirección verificada de Alina.',
      'booking-core es un crate de Rust para franjas, la revisión de la reserva, la hora del atardecer e iCal, con el crate rrule para eventos repetidos.',
    ],
    reliability: [
      'Un POST de reserva vuelve a comprobar que la franja sigue libre, así que una franja ocupada tras cargar la lista se rechaza.',
      'Un feed de calendario suscrito se retrasa horas, así que cada correo de reserva también lleva el archivo iCal.',
      'Las sesiones y los enlaces de acceso caducados se borran de D1, y una prueba guardada mantiene legibles las filas de settings de hoy.',
      'La release migra D1 y despliega, y los tiempos de espera de Cloudflare dan 3 intentos a las migraciones y al despliegue.',
    ],
    security: [
      'El inicio de sesión es un enlace por correo válido 15 minutos. Abre una página que envía el token por POST, porque los escáneres de correo abren los enlaces GET.',
      'Una sesión dura 30 días en una cookie HttpOnly y SameSite Lax, y D1 guarda solo el hash del token.',
      'Un enlace de límite de tasa de Workers permite 5 llamadas por minuto y por IP en los formularios de reserva y de envío de correo.',
      'El id de la galería va en el hash del enlace, así que queda fuera de los registros del servidor y de los referrers. Quien tenga el enlace ve la galería.',
    ],
    performance: [
      'El navegador reduce cada foto a 2 tamaños antes de subirla, así que un archivo de 25 MB sube como menos de 1 MB y sin datos GPS.',
      'client-zip construye el zip de la galería en el navegador, porque el Worker no puede leer gigabytes dentro de su límite de CPU.',
      'Las páginas son HTML estático de Astro servido por el Worker, y el texto del calendario se guarda en caché 5 minutos.',
    ],
    operations: [
      'Un solo Worker sirve las páginas y la API. worker-build convierte el Rust en wasm, y mise fija Rust, Node y pnpm.',
      'La release arranca con workflow_run cuando Checks pasa en main, una ejecución a la vez: compilación, migraciones de D1, despliegue, etiqueta.',
      'Las migraciones son archivos SQL numerados en migrations/. El lint cubre oxlint, oxfmt, tsc, knip, rustfmt, clippy para el PC y para wasm, y cargo shear.',
    ],
    tradeoffs: [
      'Un solo Worker para páginas y API en lugar de GitHub Pages más un Worker, para que la cookie de administración funcione en un solo origen sin CORS.',
      'Inicio de sesión con enlace por correo en lugar de contraseña o Cloudflare Access, para que Alina no tenga contraseña que olvidar ni necesite configurar Zero Trust.',
      'iCal de entrada y salida en lugar de la API de Google Calendar, para evitar app OAuth, revisión y renovación de token, pero un feed se retrasa horas.',
      'Reducir, poner marca de agua y comprimir en el navegador en lugar de en el Worker, que va corto de CPU, a costa de que una prueba no se pueda remarcar sin su archivo original.',
    ],
  },
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
      'El navegador dibuja la marca de agua en una vista previa pequeña de cada foto antes de subirla, y R2 guarda vistas previas, originales y copias editadas. El Worker entrega un original o una copia editada solo después de la marca de Pagado y solo si el archivo está comprado. El navegador del cliente arma el zip de los archivos comprados con client-zip.',
    Reviews:
      'El Worker guarda cada reseña en D1 como pendiente, tras un honeypot y un límite de envíos, y avisa a Alina por correo. Solo las filas aprobadas salen por la API, y la página añade datos Review y AggregateRating.',
    Search:
      'Astro escribe el título, la descripción, la tarjeta con foto y los datos estructurados en cada página al compilar. El mapa del sitio sale de las páginas generadas.',
  },
};

export default arch;
