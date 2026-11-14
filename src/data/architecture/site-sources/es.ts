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
