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
  },
};

export default arch;
