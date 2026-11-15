import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Un pipeline en Rust convierte datos públicos abiertos en archivos estáticos JSON y PMTiles. Viajan con el build web a GitHub Pages, y una sola app de Expo los lee en la web, Android y iPhone.',
  parts: [
    {
      name: 'Pipeline en Rust',
      role: 'descarga las fuentes, une cada fila con un código de barrio de la ABS y calcula las medianas con polars.',
    },
    {
      name: 'PMTiles',
      role: 'los contornos de barrios y códigos postales en un solo archivo de mosaicos estático, cortado por el pipeline.',
    },
    { name: 'GitHub Pages', role: 'sirve gratis el build web y los archivos de datos.' },
    { name: 'Expo y React Native', role: 'el mapa, los filtros, la ficha y el gráfico en la web y los teléfonos.' },
    {
      name: 'MapLibre y OpenFreeMap',
      role: 'dibuja los contornos de los barrios sobre el mapa base y colorea cada uno según su mediana.',
    },
    { name: 'TanStack Query', role: 'carga los archivos de mapa y de barrio que piden los filtros.' },
    {
      name: 'ts-rs',
      role: 'escribe los tipos de TypeScript de los archivos de datos a partir de los structs de Rust.',
    },
    { name: 'expo-iap y AdMob', role: 'el banner, Quitar anuncios y Pro en los teléfonos.' },
  ],
  flow: [
    'Cada lunes una tarea de CI descarga los archivos de ventas y alquileres de los estados.',
    'El pipeline en Rust une cada fila con un barrio y calcula las medianas.',
    'Los archivos JSON y los mosaicos viajan con el build web a GitHub Pages.',
    'La app carga un archivo de mapa para los filtros elegidos.',
    'MapLibre colorea cada barrio, y un toque abre su ficha y su gráfico.',
  ],
  links: [
    {
      to: 'realestate.com.au',
      text: 'Las fichas llevan a la misma búsqueda allí. La app no lee ninguna página del sitio.',
    },
    {
      to: 'Australian Bureau of Statistics',
      text: 'Los contornos de barrios y códigos postales, y las cifras del censo de 2021 en cada ficha.',
    },
    { to: 'Google Play', text: 'Quitar anuncios y Property Trends Pro se venden como compras únicas en Android.' },
    { to: 'App Store', text: 'Las mismas compras en iPhone, cuando se abra la cuenta de desarrollador.' },
  ],
  design: {
    scale: [
      'Un solo sitio estático atiende a todos los visitantes, así que más lectores no cuestan nada al estudio.',
      'Las ventas vienen de VIC, NSW y SA, y el archivo de formas corta 15 358 suburbios de la ABS en un solo archivo PMTiles de 53 MB.',
      'Los demás estados salen grises, porque no publican datos de ventas gratuitos.',
    ],
    data: [
      'Cada conjunto de filtros tiene su propio archivo JSON, porque las medianas no se suman entre grupos. Una celda con menos de 5 ventas no tiene mediana.',
      'Las formas están en boundaries.pmtiles, con el código del suburbio como id del objeto y sin etiquetas.',
      'Un archivo de suburbio guarda cada tipo y tramo de parcela como lista de periodo, mediana y ventas. Los archivos del censo añaden cifras del Census 2021 y SEIFA.',
    ],
    interfaces: [
      'La app lee JSON estático y PMTiles con peticiones HTTP range, sin API propia.',
      'El pipeline de Rust lee las listas de VIC y SA desde APIs CKAN, los zips .DAT de NSW y las formas de la ABS.',
      'ts-rs escribe los tipos de TypeScript de cada archivo de datos a partir de los structs de Rust.',
    ],
    reliability: [
      'Un cambio de licencia en una fuente detiene la ejecución del pipeline, así que no se publican datos sin licencia.',
      'Pages cambia todo el sitio de una vez, así que un visitante lee una versión completa.',
      'Aún no hay service worker, así que la app web instalada necesita red.',
    ],
    security: [
      'Sin inicio de sesión y sin servidor. Google Play comprueba las compras en el móvil, así que un móvil con root puede falsificar una.',
      'Solo entran datos abiertos con licencia listada. Las ventas de NSW salen en el sitio sin anuncios, porque su licencia no es comercial.',
      'Un Worker de Rust previsto guardaría cualquier clave de API en un secreto de Worker, fuera del bundle. No está construido.',
    ],
    performance: [
      'Los archivos precalculados hacen que un cambio de filtro cargue un solo JSON, y el mapa web cambia los colores con feature-state.',
      'En el móvil MapLibre arma una expresión match desde el archivo, porque 15 000 llamadas a feature-state cruzarían el puente una a una.',
      'PMTiles guarda una sola vez las teselas idénticas, y un despliegue se salta el pipeline si sus entradas coinciden con la última ejecución.',
    ],
    operations: [
      'Checks ejecuta juntos los jobs de TypeScript y Rust en el runner del PC: lint, tipos, pruebas y las exportaciones web e iOS.',
      'Deploy web corre tras cada Release verde y cada lunes. Publica un release del repositorio del sitio, y Pages descomprime el más nuevo.',
      'El alojamiento cuesta 0 $: GitHub Pages, un mapa base de OpenFreeMap sin clave y un runner propio.',
    ],
    tradeoffs: [
      'Archivos estáticos en GitHub Pages en vez de una base de datos de servidor, para que el alojamiento cueste 0 $. Los filtros siguen siendo opciones fijas.',
      'Datos abiertos del gobierno en vez de rastrear un portal, que sus términos prohíben. El coste: sin dormitorios y estados grises.',
      'Un pipeline de Rust en vez de un script de Node, porque NSW guarda cada venta desde 1990 y las formas piden trabajo pesado.',
      'Una sola base Expo en vez de un sitio solo web, para que las compilaciones de tienda no sean una segunda app. El mapa necesita 2 bibliotecas.',
    ],
  },
  features: {
    'Price map':
      'El pipeline en Rust calcula una mediana por barrio y tipo para cada periodo. MapLibre colorea cada contorno de barrio de la ABS en 7 tramos cortados en los cuantiles.',
    Filters:
      'Cada mezcla de filtros tiene su propio archivo JSON, hecho de antemano. Un cambio de filtro carga un archivo, y la URL guarda la elección.',
    'Listings on realestate.com.au':
      'La app arma un enlace de búsqueda de realestate.com.au con el barrio, el código postal y el tipo. No lee ninguna página del sitio.',
    'Suburb card and history chart':
      'Un toque carga un archivo por barrio con la mediana y las ventas de cada periodo. react-native-svg y d3 dibujan el gráfico en cada plataforma.',
    Search:
      'La búsqueda lee un archivo índice con el nombre, el código postal y el recuadro de cada barrio. Una elección lleva el mapa a ese recuadro.',
    Languages:
      'i18next tiene los 9 catálogos, e Intl da formato a los precios y las fechas de cada idioma. El navegador recuerda la elección.',
    Rents:
      'El pipeline calcula un alquiler semanal mediano por código postal con los datos de fianzas de los estados y el VIC Rental Report. MapLibre colorea un archivo aparte de mosaicos de códigos postales.',
    'Install from the browser':
      'Un manifiesto de app web da el nombre, los iconos y el color de la barra de título. Aún no tiene service worker, así que necesita la red.',
    'Ads and Remove ads':
      'react-native-google-mobile-ads muestra el banner tras el formulario de consentimiento de Google. expo-iap comprueba la compra de Quitar anuncios en cada inicio, y el build web apaga los anuncios.',
    'Property Trends Pro':
      'expo-iap comprueba la compra de Pro con Google Play o la App Store en cada inicio. Una sola comprobación en la app abre los alquileres y el historial completo.',
    'iPhone app':
      'El mismo código de Expo se compila para iOS y hace la pregunta de seguimiento antes de que arranque AdMob. Por ahora un runner de macOS o EAS compila la app del simulador.',
  },
};

export default arch;
