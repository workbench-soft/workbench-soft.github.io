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
  design: {
    scale: [
      'Una persona planifica unos pocos viajes al año, así que la carga es pequeña. El plan gratuito de Cloudflare Workers permite 100 000 peticiones al día.',
      'Todos comparten un token de Travelpayouts con un límite por minuto, así que un teléfono gratuito hace 10 búsquedas al día. Pro lo levanta.',
    ],
    data: [
      'El Worker no tiene base de datos. Cada respuesta externa queda en la caché de Workers durante su tiempo de vida.',
      'El teléfono guarda el idioma elegido, el contador de búsquedas, los viajes guardados y las marcas de compra en localStorage, mediante expo-sqlite en Android.',
      'Un viaje llega a Tick-a-Lot dentro del enlace como JSON con v, place, start, nights y hasta 60 lugares. Ningún servidor lo guarda.',
    ],
    interfaces: [
      'El Worker tiene 4 rutas GET: /places, /flights, /sights y /spots. Cada una recibe parámetros de consulta y responde JSON.',
      'trip-core recibe las tarifas en bruto y devuelve ofertas calculadas para el grupo, el calendario de precios y los enlaces.',
      'Un viaje pasa a Tick-a-Lot como un hash base64url, y vuelve a la pantalla Ask como una cadena de consulta con lugares y noches.',
    ],
    reliability: [
      'La caché dura 6 horas para las tarifas, 7 días para lugares y sitios, y 30 días para las páginas de Wikivoyage.',
      'Un error enviado con un 200, como un maxlag de MediaWiki o un success:false de Travelpayouts, y un cuerpo JSON cortado vuelven sin cachear.',
      '/spots hace 6 llamadas como mucho, y recurre a Wikivoyage en inglés cuando la edición local tiene menos de 3 fichas.',
    ],
    security: [
      'El Worker guarda cada secreto y hace cada llamada externa. La app no importa ningún crate y no tiene ninguna clave.',
      'No hay cuentas. Las marcas de Pro y de anuncios están en el teléfono y se compran por Google Play, así que borrar los datos de la app reinicia el contador de búsquedas.',
      'La llamada a Wikidata nombra la app en su User-Agent, como pide Wikimedia.',
    ],
    performance: [
      'Cada llamada externa pasa por la caché de Workers. Las fichas de Wikivoyage ya leídas quedan allí 30 días, porque leer Londres cuesta unos 20 ms de CPU frente a 1 ms desde la caché.',
      'Una consulta a Wikidata da los recuentos de idiomas y las clases de una página entera de fichas, en lugar de una llamada por lugar.',
      'Las listas largas se dibujan con FlashList, así que solo se pintan las filas en pantalla.',
    ],
    operations: [
      'Un push a main inicia Checks: lint, pruebas y build. Release y Deploy empiezan con workflow_run cuando Checks pasan.',
      'Release hace cola para que cada uno elija su versión tras la etiqueta anterior, y un Deploy más nuevo cancela uno más viejo.',
      'Deploy publica la exportación web y el Worker, y luego falla si alguno de los hosts no responde. La versión de Rust está fijada, y el Worker se compila para wasm.',
    ],
    tradeoffs: [
      'El planificador corre en el Worker en lugar de en wasm dentro de la app, porque Hermes no ejecuta wasm. El coste es no planificar sin conexión.',
      'Tarifas en caché de Travelpayouts en lugar de Duffel o el scraping: gratis, y una llamada dice qué fecha es la más barata. El coste son tarifas de 2 a 7 días de antigüedad.',
      'Wikidata y Wikivoyage en lugar de un proveedor de puntos de interés: gratis, y el número de idiomas de Wikipedia da una señal de fama que marca los lugares secretos.',
      'Sin anuncios en la pantalla de vuelos en lugar de más espacio publicitario, porque los clics por error junto a los enlaces de comisión arriesgan un bloqueo.',
    ],
  },
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
