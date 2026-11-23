import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Una app de Expo sin servidor. WebView ocultas en el teléfono cargan la página de búsqueda de cada fuente, y la app lee los precios del HTML que devuelven.',
  parts: [
    {
      name: 'Expo y React Native',
      role: 'la app y sus pantallas con expo-router, en 9 idiomas con i18next.',
    },
    {
      name: 'react-native-webview',
      role: 'carga cada página de búsqueda sin mostrarla y devuelve su HTML a la app.',
    },
    {
      name: 'node-html-parser',
      role: 'lee los precios de ese HTML con el mismo código de análisis que los tests corren sobre páginas guardadas.',
    },
    {
      name: 'metro.json',
      role: 'asigna cada estación de metro, МЦК y МЦД de Moscú a su distrito.',
    },
    {
      name: 'expo-sqlite',
      role: 'guarda la lista de compras en el teléfono.',
    },
    {
      name: 'GitHub Actions',
      role: 'revisa cada push, compila el APK firmado, lo abre en un emulador y publica la versión.',
    },
  ],
  flow: [
    'El comprador escribe un artículo y pulsa Buscar.',
    'Una WebView oculta por fuente abre su página de búsqueda con la conexión del propio teléfono.',
    'El HTML vuelve, y una función de análisis por fuente lo convierte en ofertas.',
    'El filtro por distrito y un orden por precio arman una sola lista en pantalla.',
  ],
  links: [
    {
      to: 'АптекаМос',
      text: 'Páginas de productos y farmacias con el precio, la dirección y el metro de cada farmacia.',
    },
    {
      to: 'Мегаптека',
      text: 'Una API de búsqueda JSON, consultada para Moscú con orden por precio.',
    },
    {
      to: 'Wildberries',
      text: 'Fichas de producto, leídas tras el control por script del propio sitio.',
    },
    {
      to: 'Ozon',
      text: 'Resultados de búsqueda en la medida de lo posible, porque su control de bots es el más estricto.',
    },
    {
      to: 'GitHub',
      text: 'Guarda las versiones APK donde la app busca actualizaciones.',
    },
  ],
  design: {
    scale: [
      'Un comprador con un teléfono Android en Moscú, que busca unos pocos artículos a la vez.',
      'Gratis de mantener: sin servidor, sin API de pago y sin anuncios, así que cada búsqueda corre en el teléfono.',
    ],
    data: [
      'Las ofertas viven en memoria durante la búsqueda: producto, envase, precio, vendedor, dirección y metro.',
      'La lista de compras está en SQLite. La elección de distritos y el idioma están en el almacenamiento local.',
    ],
    interfaces: [
      'Cada módulo de fuente da una URL de búsqueda y una función de análisis. El script inyectado envía el HTML limpio por window.ReactNativeWebView.postMessage.',
      'Мегаптека responde a un fetch simple a api.megapteka.ru con city_id 6565 para Moscú.',
    ],
    reliability: [
      'Cada fuente falla por su cuenta tras 60 segundos como mucho, y su línea dice por qué. Las demás fuentes siguen.',
      'Un test por fuente corre su análisis sobre una página guardada, así que un cambio de marcado se ve en CI.',
    ],
    security: [
      'La app no tiene cuenta y no envía datos a un servidor propio.',
      'Las sesiones de los distribuidores quedan en el almacén de cookies de la WebView en el teléfono. La clave de firma está en Bitwarden y en los secretos del repo.',
    ],
    performance: [
      'Las fuentes cargan en paralelo, y АптекаМос lee solo los 3 productos que tienen más farmacias.',
      'El script inyectado quita scripts y estilos antes de devolver el HTML.',
    ],
    operations: [
      'Checks corre lint, tipos, knip, los tests y un bundle de Android en cada push a main.',
      'Release compila el APK firmado, lo abre en un emulador para detectar un cierre, y lo publica como medpoisk-v<date>.<n>.',
    ],
    tradeoffs: [
      'Leer las páginas en el teléfono en lugar de un servidor, porque las fuentes rusas bloquean IP extranjeras y de centros de datos. Un cambio en un sitio rompe su fuente hasta que se arregla el análisis.',
      'Un panel para el control de robots en lugar de resolverlo en código, así el comprador lo pasa a mano una vez.',
      'Portales de distribuidores con la sesión del comprador en lugar de precios mayoristas en la lista, porque esos precios piden su cuenta.',
    ],
  },
  features: {
    'Price search':
      'run-search.ts arranca cada fuente a la vez. HiddenPages.tsx carga cada página en una WebView invisible, y cada módulo de fuente convierte el HTML en ofertas ordenadas por precio.',
    'Moscow okrugs':
      'okrug-of.ts busca la estación de metro de la farmacia en metro.json. Una dirección sin estación se asigna por su ciudad: Moscú queda sin distrito, otra ciudad es Подмосковье.',
    'Site checks':
      'Cada fuente tiene un test que distingue su página de control de una de resultados. CheckSheet.tsx muestra el control, las cookies quedan en el almacén común de las WebView, y la fuente vuelve a correr oculta.',
    'Shopping list':
      'items.ts guarda las palabras escritas en SQLite. check-all.ts busca cada artículo por turno y se queda con su oferta más barata en los distritos elegidos.',
    'Map and the place to buy':
      'places.json guarda los distritos y estaciones de Moscú con coordenadas de Wikidata. offer-sections.ts ordena por la distancia a la estación de cada farmacia, y OfferMap dibuja los marcadores con MapLibre sobre teselas de OpenFreeMap.',
    'Wholesale prices':
      'dealmed.ts e imsstore.ts leen el precio mayorista y las existencias de cada página de búsqueda, en el teléfono y en el Worker de búsqueda.',
    Distributors:
      'distributors.ts lista la página de inicio de cada empresa. browser.tsx la abre en una WebView que guarda sus cookies.',
    'Languages and updates':
      'i18n.ts cambia i18next al momento y guarda la elección. newer-release.ts pide a GitHub un APK de medpoisk más nuevo al iniciar y al volver a la app.',
  },
};

export default arch;
