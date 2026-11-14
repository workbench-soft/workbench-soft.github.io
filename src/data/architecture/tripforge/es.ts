import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Una app de Expo para Android y la web llama a un solo Worker en Rust sobre Cloudflare. El Worker hace cada llamada externa y guarda las claves, y un crate de Rust tiene la lógica del viaje.',
  parts: [
    {
      name: 'Expo and React Native',
      role: 'una sola base de código para la app de Android y la web, con react-native-web.',
    },
    {
      name: 'Rust Worker',
      role: 'las rutas de lugares, vuelos, sitios y rincones secretos, cada una tras la caché de Workers.',
    },
    {
      name: 'trip-core',
      role: 'el crate de Rust con las ventanas de fechas, los precios para el grupo, el calendario de precios y las etiquetas.',
    },
    { name: 'Travelpayouts', role: 'los precios de los vuelos y los enlaces de socio a Aviasales.' },
    { name: 'Wikivoyage and Wikidata', role: 'los sitios, los rincones secretos y las clases que los etiquetan.' },
    { name: 'Google Play', role: 'los anuncios de AdMob y las compras Quitar anuncios y Pro.' },
  ],
  flow: [
    'La persona escribe los lugares, una fecha aproximada, las noches y el grupo.',
    'La app pide al Worker los lugares y luego los vuelos.',
    'El Worker sirve las respuestas en caché y trae el resto de Travelpayouts, Wikivoyage y Wikidata.',
    'trip-core calcula el precio del viaje para el grupo y arma el calendario.',
    'La app muestra las ofertas, el calendario y los enlaces. Los viajes guardados se quedan en el teléfono.',
  ],
  links: [
    {
      to: 'tickalot',
      text: 'Un enlace lleva el viaje en los dos sentidos, sin cuenta compartida. Tick-a-Lot lee sus sitios del mismo Worker.',
    },
  ],
  features: {
    Ask: 'El formulario busca cada lugar a través del Worker. Un enlace de Tick-a-Lot rellena el formulario desde su dirección.',
    Flights:
      'El Worker pregunta a Travelpayouts por cada mes de la ventana y guarda los precios 6 horas. trip-core los calcula para el grupo y añade los enlaces.',
    Places:
      'El Worker une los sitios de Wikidata cerca de la ciudad con las fichas de Wikivoyage. Las clases de Wikidata etiquetan cada lugar, y los chips filtran por esas etiquetas.',
    'To Tickalot':
      'La app mete los lugares, el inicio y las noches en el propio enlace de Tick-a-Lot. Ningún servidor guarda el viaje.',
    Settings: 'i18next tiene los 9 catálogos. La elección se queda en el teléfono, en SQLite a través de Expo.',
    Ads: 'AdMob muestra el banner y el anuncio a pantalla completa en Android. Una sola comprobación decide cada anuncio según el consentimiento y las 2 compras.',
    'Tripforge Pro':
      'Google Play Billing vende el producto, y la app guarda la marca en el teléfono. Un módulo decide cada bloqueo, y los límites están en un archivo.',
    'Website pages for search':
      'Al compilar, Expo escribe una página HTML por ruta e idioma. Luego un script fija el idioma de la página, escribe la página 404 y arma el sitemap.',
  },
};

export default arch;
