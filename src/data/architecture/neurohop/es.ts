import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Una sola app de Expo es el sitio, la app de Android y la de iOS. Un Worker de Cloudflare en Rust sirve el sitio, los juegos desde R2 y la API de administración en un solo dominio.',
  parts: [
    {
      name: 'Expo y React Native',
      role: 'el catálogo, la página del juego, los ajustes y la administración, en 9 idiomas.',
    },
    {
      name: 'Worker en Rust',
      role: 'sirve la exportación web, /content/* desde R2 y /api/* para la administración y los juegos premium.',
    },
    { name: 'Cloudflare R2', role: 'guarda index.json, un archivo JSON por juego y las imágenes en WebP.' },
    {
      name: 'Cuenta Workbench',
      role: 'comprueba la suscripción común que abre los juegos premium y oculta los anuncios.',
    },
    { name: 'AdMob y AdSense', role: 'los banners en la app y en el sitio.' },
  ],
  flow: [
    'La app carga /content/index.json con las listas y las tarjetas.',
    'La búsqueda y los filtros corren en el dispositivo y no hacen peticiones.',
    'Una tarjeta abre /content/games/<id>.json, y un juego premium /api/premium/<id> con el token de ID de Google.',
    'Una escritura de la administración reconstruye index.json y lo purga de la caché en el borde.',
  ],
  links: [
    { to: 'Cloudflare', text: 'Workers, R2 y la caché en el borde.' },
    { to: 'account.workbench-soft.com', text: 'Responde si la cuenta de Google tiene la suscripción Workbench.' },
    { to: 'Google Play', text: 'Vende el plan Workbench en la app de Android.' },
    { to: 'GitHub', text: 'Guarda los APK firmados en las releases de workbench-soft.github.io.' },
  ],
  design: {
    scale: [
      'Padres y especialistas, sobre todo de habla rusa, que leen unos pocos juegos a la vez.',
      'Un catálogo de cientos de juegos cabe en un solo archivo de índice que filtra el dispositivo.',
    ],
    data: [
      'Cada juego es un archivo JSON con la edad, los bloques, los objetivos y sus secciones. Las listas están en index.json.',
      'Un juego premium está en premium/ dentro de R2, fuera de las rutas públicas.',
    ],
    interfaces: [
      'GET /content/* sirve los archivos de R2. /api/premium/<id> recibe un token de ID de Google.',
      '/api/admin/* recibe un token de la contraseña de administración y escribe juegos, imágenes y listas.',
    ],
    reliability: [
      'La app guarda una copia del índice y de cada juego abierto, y los muestra sin conexión.',
      'Una petición que espera más de 15 segundos cuenta como fallida, y la pantalla muestra el error en lugar de una línea de carga.',
    ],
    security: [
      'La contraseña de administración y el secreto de sesión son secretos del Worker, guardados en Bitwarden.',
      'El Worker lee un juego premium solo cuando account.workbench-soft.com confirma el plan.',
    ],
    performance: [
      'index.json queda 60 segundos en la caché del navegador y 300 en el borde. Las imágenes quedan un año.',
      'Las imágenes son WebP con un hash en el nombre, así que una imagen nueva no necesita purga.',
    ],
    operations: [
      'Checks ejecuta el lint y las pruebas en los runners del PC en cada push a main.',
      'Release construye el APK firmado, lo abre en un emulador y lo publica como neuroigry-v<version>. Deploy pone el Worker en línea.',
    ],
    tradeoffs: [
      'Una app de Expo para el sitio y los teléfonos en vez de una app nativa, para que cada función salga una vez.',
      'Filtros en el dispositivo en vez de una API de búsqueda, porque todo el catálogo cabe en un archivo pequeño.',
    ],
  },
  features: {
    'Catalog with filters and search':
      'catalog/ filtra index.json en el dispositivo: las marcas de un grupo amplían la lista y los grupos la estrechan. Una tarjeta sin imagen toma el color de su primer bloque.',
    'Game page':
      'game/ carga el archivo del juego por su id y dibuja cada sección. Cada juego tiene su ruta, así que un enlace compartido lo abre.',
    'Premium games':
      'El Worker consulta account.workbench-soft.com con el token de ID de Google y luego lee premium/<id>.json de R2.',
    Ads: 'ads/ muestra banners de AdMob en la app y AdSense en el sitio, y los oculta con el plan activo.',
    'Settings and the Workbench plan':
      'pro/ contiene el paywall, la compra en Google Play y useEntitled(). El sitio e iOS inician sesión para abrir un plan comprado en el teléfono.',
    Admin:
      'admin/ entra con la contraseña y luego edita juegos, sube imágenes e importa un CSV por /api/admin/*. Cada escritura reconstruye index.json.',
    'App icon and store listing':
      'El icono sale de un solo SVG en design/icons/. store/listing.md guarda el texto de Play y las respuestas de la consola.',
  },
};

export default arch;
