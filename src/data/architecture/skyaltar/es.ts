import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Sky Altar es una sola app Expo para Android y la web, sin servidor propio. Astronomy Engine y los datos de estrellas de la app dan el cielo, y Skia lo dibuja.',
  parts: [
    {
      name: 'Expo y React Native',
      role: 'una sola base de código para la app Android y el sitio, con los nombres en las fuentes del teléfono.',
    },
    { name: 'Skia', role: 'dibuja el cielo entero como una imagen por fotograma en la GPU.' },
    { name: 'Astronomy Engine', role: 'sitúa el Sol, la Luna y los planetas y calcula las cartas natales.' },
    {
      name: 'Datos de d3-celestial',
      role: 'las 2851 estrellas hasta la magnitud 5,5 y las figuras de la UAI con sus nombres.',
    },
    { name: 'expo-camera', role: 'toma una foto silenciosa cada 1,5 segundos para cotejar las estrellas.' },
    { name: 'Media3 ExoPlayer', role: 'un módulo Kotlin que repite la música por el altavoz a un volumen fijo.' },
    { name: 'Cloudflare R2', role: 'sirve las imágenes y las pistas de los temas de pago.' },
    {
      name: 'Google Play Billing y AdMob',
      role: 'venden Quitar anuncios y Pro y muestran los anuncios tras el consentimiento.',
    },
  ],
  flow: [
    'El sensor de giro o un dedo gira la vista del cielo.',
    'Cada segundo Astronomy Engine pasa cada estrella a una posición sobre el horizonte.',
    'Cada fotograma proyecta las estrellas y las figuras en la pantalla.',
    'Skia graba los dibujos, las líneas y las estrellas en una sola imagen.',
    'React Native escribe los nombres encima, y las estrellas de la cámara brillan sobre ella.',
  ],
  links: [
    {
      to: 'songfactory',
      text: 'Las pistas de los temas vienen de Suno a través de Songfactory, con una línea de estilo por tema.',
    },
    { to: 'tickalot', text: 'La comprobación de actualizaciones es una copia de la de Tick-a-Lot.' },
    { to: 'app-updater', text: 'WBS Updater instala el mismo APK desde las versiones compartidas.' },
    { to: 'Google Play', text: 'Google Play Billing vende Quitar anuncios y Pro.' },
    {
      to: 'Open-Meteo',
      text: 'La búsqueda de la ciudad natal envía solo el nombre escrito y recibe el lugar y su zona horaria.',
    },
  ],
  design: {
    scale: [
      'Una persona por instalación, sin cuenta y sin servidor propio.',
      'El cielo tiene 2851 estrellas, 89 figuras y 19 temas de culturas, dibujados como unos 3000 puntos por fotograma.',
      'Solo los 2 temas gratis van en la app, y cada imagen de pago pesa unos 30 KB desde un CDN.',
    ],
    data: [
      'Las estrellas, las figuras y los nombres son JSON en la app. Los relatos están en un archivo .lore por idioma.',
      'Los ajustes y los datos de nacimiento guardados están en localStorage, o en expo-sqlite en el móvil.',
      'El móvil guarda las imágenes y las pistas descargadas en la carpeta de documentos de la app.',
    ],
    interfaces: [
      'Un manifest.json en el CDN asigna a cada imagen de tema un archivo con el nombre del hash de su contenido.',
      'expo-iap lee dos productos de Google Play. La comprobación de actualizaciones lee la lista compartida de releases de GitHub.',
      'La geocodificación de Open-Meteo recibe el nombre de ciudad escrito y devuelve el lugar y su zona horaria.',
    ],
    reliability: [
      'Un tema descargado una vez funciona sin conexión, y los temas gratis funcionan sin conexión desde el primer inicio.',
      'Una imagen cuya descarga falla se reintenta al cabo de un minuto.',
      'El giroscopio mueve la vista y la brújula solo la corrige durante un giro, así que el cielo no se desliza.',
    ],
    security: [
      'Sin inicio de sesión y sin servidor. Los datos de nacimiento guardados se quedan en el móvil.',
      'Open-Meteo recibe solo el nombre de ciudad escrito. Las fotos de la cámara se leen en el móvil.',
      'El formulario de consentimiento de Google sale en el EEE, el Reino Unido y Suiza antes de cualquier anuncio. La clave de firma queda fuera del repositorio.',
    ],
    performance: [
      'Una caché del horizonte en arrays tipados se rellena una vez por segundo, así que un fotograma no crea un objeto por estrella.',
      'Skia graba una imagen por fotograma para la vista, sin render de React. Una vista quieta se redibuja unas 8 veces por segundo.',
      'El desenfoque de las imágenes se hace una vez al cargar, y los nombres con hash dejan al CDN y al móvil cachearlas un año.',
    ],
    operations: [
      'Checks ejecuta lint, pruebas y los bundles de Android y web en cada push a main, y Release compila el APK firmado a su lado.',
      'Publish pone el APK en la lista compartida de releases, que guarda las últimas 3 compilaciones de cada app.',
      'mise run deploy sube las imágenes, las pistas y el manifiesto nuevos, así que una imagen redibujada no necesita un release.',
    ],
    tradeoffs: [
      'Skia en vez de react-native-svg, demasiado lento para 3000 puntos por fotograma. El coste es un archivo CanvasKit de 7 MB en la web.',
      'Los nombres en React Native en vez de párrafos de Skia, para que el chino, el japonés y el coreano usen las fuentes del móvil.',
      'Los datos de d3-celestial en vez de las culturas del cielo de Stellarium, que mezclan licencias y algunas son GPL.',
      'Astronomy Engine en vez de Swiss Ephemeris, que es AGPL o de pago y pide una compilación nativa por plataforma.',
    ],
  },
  features: {
    'Sky view':
      'El sensor de giro mueve la vista, y el giroscopio la mantiene firme entre correcciones de la brújula. Skia dibuja las estrellas, los astros y 88 figuras con datos de la app.',
    Clock:
      'Una capa de React Native dibuja la hora y la fecha con la fuente del tema. Un temporizador salta cada minuto, y el reloj se atenúa con los botones.',
    'Camera stars':
      'La app toma una foto silenciosa cada 1,5 segundos y busca los puntos de luz en JavaScript. Los puntos que coinciden con el catálogo de estrellas destellan en oro sobre el cielo.',
    'Culture themes':
      'Un registro por cultura fija sus colores, su estilo de línea y su fuente. Cada imagen se ancla a 3 estrellas de su figura, y los temas de pago bajan una vez de Cloudflare R2.',
    'Ambient music':
      'Un módulo Kotlin sobre Media3 ExoPlayer repite la pista con fundidos, incluida en la app o desde el CDN. Un selector de documentos copia tus archivos o una carpeta a la app.',
    'Ads and Remove ads':
      'AdMob muestra banners en la hoja de temas y en Ajustes, más un anuncio a pantalla completa cada 30 minutos como máximo. Google Play Billing vende Quitar anuncios.',
    'Sky Altar Pro':
      'Google Play Billing vende el producto Pro, y una sola comprobación decide cada bloqueo. La versión web no tiene tienda y abre las partes Pro.',
    'App languages':
      'i18next guarda 9 catálogos para las pantallas. Los nombres de las figuras y los archivos de leyendas también vienen en cada idioma.',
    'Updates from GitHub':
      'La comprobación lee las versiones compartidas de GitHub, descarga el APK y lo pasa al instalador. La versión de Google Play cambia la comprobación por sustitutos vacíos.',
    Astrology:
      'Astronomy Engine sitúa los planetas de la carta natal, con casas de signo entero. Open-Meteo busca la ciudad natal, y los datos guardados se quedan en el teléfono.',
    'Constellation navigation':
      'Una lista virtualizada filtra el catálogo y lleva el punto de la etiqueta de cada constelación al cielo actual. Un toque desliza la vista hasta allí en 450 ms.',
    'Constellation lore':
      'Cada tarjeta lee el relato de la cultura del tema en un archivo de leyendas por idioma. Los datos de las estrellas vienen de Hipparcos en el archivo ESA Gaia.',
    'Long lists':
      'El paquete fast-scroll del estudio envuelve las dos listas, y cada una dibuja solo las filas visibles. El control toma un color suave del panel o el de las etiquetas del tema.',
  },
};

export default arch;
