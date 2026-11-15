import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Una extensión de Chrome con Manifest V3 y sin servidor. La ventana emergente inicia el guardado, el service worker lo lleva, y una página offscreen oculta descarga los archivos y arma el zip.',
  parts: [
    {
      name: 'Ventana emergente',
      role: 'muestra el host, el botón Descargar y la barra, y se redibuja desde el estado guardado.',
    },
    {
      name: 'Service worker',
      role: 'lleva un guardado por pestaña, inyecta el script de página y pasa el zip a las descargas de Chrome.',
    },
    { name: 'Script de página', role: 'corre en cada marco y devuelve el HTML y cada URL que cargó la página.' },
    {
      name: 'Documento offscreen',
      role: 'encuentra, descarga y comprime los archivos, ya que solo una página crea una URL blob.',
    },
    { name: 'fflate', role: 'arma el zip y guarda imágenes y fuentes tal cual.' },
    { name: 'chrome.storage.session', role: 'guarda el estado de cada guardado, así una ventana reabierta lo ve.' },
    { name: 'chrome.i18n', role: 'sirve el texto de la ventana y el nombre de la extensión en 9 idiomas.' },
    { name: 'Vite', role: 'empaqueta el service worker, la ventana y la página offscreen.' },
  ],
  flow: [
    'La persona pulsa Descargar en la ventana emergente.',
    'El service worker inyecta un script en cada marco de la pestaña.',
    'El script devuelve el HTML y las URL que cargó la página.',
    'La página offscreen encuentra más archivos por source maps y hojas de estilo, luego los descarga.',
    'Los contadores llegan a la ventana por el almacenamiento de sesión cada 100 ms.',
    'Las descargas de Chrome guardan el zip en Descargas.',
  ],
  links: [],
  design: {
    scale: [
      'Una persona guarda una página abierta a la vez, y dos pestañas pueden guardar al mismo tiempo.',
      'Los archivos quedan en memoria hasta que se escribe el zip, así que un sitio de varios cientos de megabytes puede fallar.',
    ],
    data: [
      'Un guardado es un zip con el nombre del host y la hora, con index.html, una carpeta por host, _sources y _frames.',
      'El estado de cada guardado está en chrome.storage.session: los contadores, los archivos fallidos y la etapa.',
      'No se guarda nada cuando el zip llega a Descargas. La extensión no tiene historial ni ajustes.',
    ],
    interfaces: [
      'El popup, el service worker y la página offscreen hablan con mensajes de chrome.runtime y el estado del session storage.',
      'Un script de página inyectado con chrome.scripting devuelve el HTML y las URL de las entradas performance, src y link href.',
      'El zip sale como una URL blob que chrome.downloads guarda en Descargas.',
    ],
    reliability: [
      'Un archivo que el servidor rechaza cuenta como fallido y queda fuera del zip, sin segundo intento. Una petición se corta a los 2 minutos.',
      'El popup puede cerrarse a mitad del guardado y redibujarse desde el session storage al abrirse otra vez, y el guardado sigue.',
      'Una promesa compartida crea la página offscreen, así que una segunda pestaña reutiliza la única que Chrome permite.',
    ],
    security: [
      'La extensión pide activeTab, scripting, downloads, storage, offscreen y todas las URL, porque trae archivos de cualquier sitio que cargue la página.',
      'No envía nada a un servidor propio. Las únicas peticiones van a los sitios que la página ya usa.',
      'Un archivo tras un inicio de sesión que la extensión no puede enviar cuenta como fallido. Las páginas de Chrome y Chrome Web Store rechazan las extensiones.',
    ],
    performance: [
      'El descubrimiento trae a la vez los scripts y hojas de estilo de cada ronda y guarda sus bytes, así que el empaquetado no los pide de nuevo.',
      'Los contadores de progreso se fusionan y salen como mucho cada 100 ms, y un estado nuevo sale al instante.',
      'Imágenes, fuentes, vídeo y otros formatos comprimidos entran en el zip tal cual, sin segunda compresión.',
    ],
    operations: [
      'Vite empaqueta el service worker, el popup y la página offscreen. fflate también comprime la extensión en cada versión.',
      'Cada push a main construye el zip junto a las comprobaciones. Un script de compuerta lo publica cuando pasan y lo cancela si fallan.',
      'Las versiones llevan una etiqueta de fecha como v2026.11.02.1, y el manifiesto lleva la misma versión. Chrome la carga sin empaquetar.',
    ],
    tradeoffs: [
      'Una página offscreen en vez de una URL de datos desde el worker, porque solo una página puede crear una URL blob y una URL de datos es un tercio mayor.',
      'zipSync en vez del zip asíncrono, porque la política de la extensión bloquea los workers blob del zip asíncrono de fflate, a costa de una pausa en zips grandes.',
      'Encontrar los archivos primero y luego traerlos, para que el total quede fijo mientras se llena la barra, a costa de una espera antes del primer archivo en páginas grandes.',
      'chrome.i18n en vez de i18next, porque el nombre del manifiesto solo puede venir de _locales y un segundo catálogo no aporta nada.',
    ],
  },
  features: {
    'Download from the popup':
      'La ventana pasa la pestaña al service worker, que lleva el guardado por su cuenta. El estado vive en el almacenamiento de sesión, así sigue tras cerrar la ventana.',
    'Progress bar':
      'La página offscreen encuentra primero los archivos, así el total no cambia. Envía cada 100 ms los archivos hechos y fallidos, y la ventana se redibuja con ellos.',
    'One zip':
      'fflate mete el HTML en vivo y cada archivo en una carpeta por host, con las rutas del servidor. Las descargas de Chrome lo guardan con el host y la hora en el nombre.',
    'Original sources':
      'La página offscreen lee el source map de cada script y hoja de estilo. Cada archivo original del mapa va a su propia carpeta dentro del zip.',
    Languages:
      'chrome.i18n elige el catálogo según el idioma de Chrome. 9 catálogos guardan el texto de la ventana, el nombre y la descripción.',
  },
};

export default arch;
