import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Un poller en GitHub Actions escribe los datos de precios de cada estado en Cloudflare D1. Las Pages Functions leen D1 para la app y las páginas de búsqueda, y una sola app de Expo dibuja el mapa en Android, iPhone y la web.',
  parts: [
    {
      name: 'Poller en GitHub Actions',
      role: 'descarga cada fuente según un horario y escribe en D1 los precios que cambian.',
    },
    {
      name: 'Fuentes de precios de los estados',
      role: 'NSW FuelCheck, Servo Saver en VIC, Fuel Prices QLD y FuelWatch WA dan los precios.',
    },
    {
      name: 'Fuentes de cargadores',
      role: 'Open Charge Map, Transport for NSW y OpenStreetMap, unidas para que cada cargador salga una vez.',
    },
    { name: 'Cloudflare D1', role: 'los precios actuales, y un disparador que lleva el historial diario.' },
    {
      name: 'Cloudflare Pages Functions',
      role: 'responden a la app por la API y generan las páginas de búsqueda y los sitemaps.',
    },
    { name: 'Expo y React Native', role: 'un solo código para Android, iPhone y el sitio web.' },
    { name: 'MapLibre y OpenFreeMap', role: 'el mapa en el navegador y en los teléfonos, con mosaicos sin clave.' },
    {
      name: 'Módulo Hey Servo',
      role: 'un módulo de Expo en Kotlin con un modelo de activación sin conexión y el servicio de voz de Android.',
    },
  ],
  flow: [
    'El poller lee las fuentes de los estados, cada hora para NSW, VIC y QLD.',
    'Solo los precios que cambian llegan a D1, y un disparador los suma al historial.',
    'La app pide a una Pages Function las gasolineras del recuadro del mapa.',
    'La caché del borde responde a las repeticiones 5 minutos, y D1 al resto.',
    'La app colorea cada marcador por precio y lista las gasolineras.',
  ],
  links: [
    {
      to: 'spotthecam',
      text: 'Hey Servo sigue el diseño de Hey Spot. Una sola app tiene el micrófono para cada frase de activación.',
    },
    {
      to: 'keeppad',
      text: 'keepPad y Lumiere comparten el mismo micrófono mediante la biblioteca wakeshare.',
    },
    {
      to: 'Google Maps',
      text: 'Un toque en la ruta o una orden de Hey Servo abre la navegación en Google Maps.',
    },
    {
      to: 'Google Play',
      text: 'Quitar anuncios y ServoHop Pro se venden como compras únicas. AdMob muestra el banner.',
    },
    {
      to: 'GitHub Releases',
      text: 'Cada versión deja allí el APK, y el build de GitHub se actualiza solo desde allí.',
    },
  ],
  features: {
    'Fuel prices on a map':
      'Una Pages Function devuelve desde D1 hasta 400 gasolineras del recuadro. La app reparte los precios en pantalla en tercios y colorea los marcadores.',
    'Your place on the map':
      'En los teléfonos expo-location da la posición y el rumbo de la brújula. En la web lo hacen los eventos de ubicación y orientación del navegador.',
    'Station list':
      'La lista muestra las mismas gasolineras que el mapa, de la misma respuesta. La distancia es una línea recta desde el teléfono.',
    'Price history chart':
      'Una Pages Function lee de D1 las filas diarias, y un código de gráfico compartido arrastra el precio a los días sin cambio. react-native-svg dibuja la línea y la banda.',
    'Driver price reports':
      'La app envía el aviso a una Pages Function, que comprueba el rango y el límite por hora de cada remitente. El precio entra en D1.',
    'EV chargers':
      'El poller une cada día los cargadores de 3 fuentes abiertas. Los avisos de los conductores guardan en D1 el precio por kWh de cada red.',
    'Search pages':
      'Las Pages Functions generan HTML sencillo para cada estado, barrio y gasolinera, con el gráfico en SVG. El borde guarda cada página 30 minutos.',
    'Site text and guides':
      'Un paso del build escribe el texto de inicio en el HTML exportado. Las Pages Functions sirven las guías desde textos del repositorio.',
    'Self-update from GitHub':
      'La app pregunta a GitHub Releases por un APK más nuevo y lo pasa al instalador de Android. El build de Google Play cambia el código de actualización por módulos vacíos.',
    'Remove ads':
      'expo-iap vende el producto por Google Play. La compra sigue a la cuenta de Google, y Restaurar la recupera en un teléfono nuevo.',
    'ServoHop Pro':
      'expo-iap comprueba la compra de Pro en cada inicio. Una sola comprobación en la app abre el gráfico de 365 días y oculta los anuncios.',
    'Area search':
      'Una Pages Function busca el barrio o el código postal en la tabla de gasolineras con 2 índices. No necesita geocodificador externo ni clave.',
    'Hey Servo':
      'sherpa-onnx oye la frase de activación en el teléfono, y el servicio de voz de Android oye la orden. La respuesta llega de la API de ServoHop.',
    'Fuel panel':
      'La elección fija el combustible en cada llamada a la API, y la app la guarda para el próximo inicio. Un cargador cuenta por su conector más potente.',
    Ads: 'react-native-google-mobile-ads muestra el banner en la app tras el formulario de consentimiento. AdSense lo llena en el sitio y en las páginas de búsqueda.',
    Languages: 'i18next tiene los 9 catálogos, y expo-localization lee el idioma del teléfono o del navegador.',
  },
};

export default arch;
