import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Una sola app de Expo funciona en Android y en la web y guarda cada lista en SQLite en el dispositivo. Una lista compartida también va a Firestore, y la app no tiene servidor propio.',
  parts: [
    {
      name: 'Expo and React Native',
      role: 'una sola base de código para la app de Android y la web, que sirve Firebase Hosting.',
    },
    {
      name: 'SQLite',
      role: 'cada lista y cada artículo en el dispositivo con expo-sqlite, en wasm dentro del navegador.',
    },
    {
      name: 'Firestore',
      role: 'las listas compartidas, los pasillos y los recorridos de las tiendas, tras un acceso anónimo.',
    },
    {
      name: 'Parser de frases y diccionario de emoji',
      role: 'reglas en el teléfono que parten una frase en artículos y eligen emoji y sección.',
    },
    { name: 'OpenStreetMap', role: 'la búsqueda de tiendas, y la tienda donde está el teléfono.' },
    {
      name: 'Wikipedia and Wikidata',
      role: 'la ciudad y sus sitios, leídos a través del Worker de Tripforge cuando responde.',
    },
    { name: 'Coles and Woolworths', role: 'los precios por unidad, leídos de la búsqueda de la web de cada tienda.' },
    { name: 'Google Play', role: 'los anuncios de AdMob y las compras Quitar anuncios y Pro con expo-iap.' },
  ],
  flow: [
    'La persona escribe o dicta los artículos, y el parser los separa.',
    'El teléfono guarda cada artículo en SQLite al momento.',
    'Compartir envía la lista a Firestore y abre un enlace.',
    'El otro teléfono abre el enlace y sigue la lista en Firestore.',
    'Una marca en un teléfono aparece en el otro en 1 o 2 segundos.',
  ],
  links: [
    {
      to: 'tripforge',
      text: 'Un enlace de viaje de Tripforge crea una lista de sitios y una de equipaje. La lista de sitios enlaza de vuelta para planear los vuelos.',
    },
    {
      to: 'guitar-upscale',
      text: 'Una canción de Canciones por aprender se abre en Guitar Upscale para tocar encima.',
    },
    { to: 'Firebase', text: 'Firestore sincroniza las listas compartidas, y Hosting sirve la web.' },
    { to: 'OpenStreetMap', text: 'Nominatim busca una tienda por su nombre, y Overpass encuentra la tienda cercana.' },
    { to: 'Google Play', text: 'AdMob muestra los anuncios, y Play Billing vende Quitar anuncios y Pro.' },
  ],
  features: {
    'Share by link':
      'Firestore guarda una copia de cada lista compartida, y el enlace lleva su id aleatorio. Cada teléfono guarda un cambio primero en SQLite y lo envía cuando vuelve la red.',
    'Base list':
      'Una lista hecha desde una base copia cada artículo base y recuerda a cuál sigue. Un cambio en la base llega a las copias que la persona dejó sin tocar.',
    'Typing and dictating':
      'Un parser de reglas en el teléfono parte la frase con el diccionario de emoji y los números. expo-speech-recognition pasa la voz a texto con el servicio de voz del teléfono.',
    Pictures:
      'Un diccionario dentro de la app asigna al nombre un emoji y una sección, en inglés y ruso. Una foto se reduce a un JPEG pequeño que viaja dentro del artículo.',
    'The store and the walk through it':
      'Overpass y Nominatim, de OpenStreetMap, encuentran la tienda. La app aprende el orden de las secciones con las marcas y lo guarda en SQLite.',
    'Shared aisles':
      'Los pasillos y recorridos están en Firestore bajo el id de OpenStreetMap de la tienda. Cada teléfono que elige esa tienda los lee, y un pasillo escrito sube al momento.',
    'Prices at Coles and Woolworths':
      'El teléfono lee la búsqueda de la web de cada tienda y guarda el primer producto un día en SQLite. El precio por unidad más bajo sale en verde.',
    'Packing for a trip':
      'Una lista de equipaje es una copia de una lista de equipaje base en SQLite. Se comparte por Firestore como otra lista cualquiera.',
    'Things to see':
      'La ciudad viene de Wikipedia y sus lugares del Worker de Tripforge o de Wikidata. Un paso k-means en el teléfono los reparte por días.',
    'Lists that are done':
      'Un temporizador en el teléfono pasa una lista al archivo 3 horas después de la última marca, o tras 2 semanas sin cambios.',
    'Light and dark':
      'El tema sigue al teléfono con React Native, o una elección en Ajustes que se queda en el dispositivo.',
    Updates:
      'La versión de GitHub pregunta a las releases de GitHub por un APK más nuevo y abre el instalador de Android. La versión de Google Play no lleva este módulo.',
    Ads: 'AdMob muestra los banners y el anuncio a pantalla completa tras el formulario de consentimiento de Google. Google Play Billing vende la compra Quitar anuncios.',
    'Tick-a-Lot Pro':
      'Google Play Billing vende Pro con expo-iap, y la app vuelve a preguntar a Play en cada inicio. Un módulo decide cada bloqueo.',
    'The weekly shop for two':
      'Un teléfono crea la lista desde una base y la comparte por Firestore. El otro la marca, y cada marca vuelve en segundos.',
    'Songs to learn':
      'Un parser de canciones parte el texto solo por las comas. Cada canción recibe enlaces de búsqueda a Guitar Upscale y a webs de acordes, tablaturas y vídeos.',
    'Changing and deleting':
      'Cada campo se escribe en SQLite cuando la persona lo deja. Borrar solo marca la fila, así funcionan Deshacer y el otro teléfono.',
    Languages:
      'i18next tiene los 9 catálogos, y expo-localization lee el idioma del teléfono. El texto de la lista queda tal como se escribió.',
    'Finding Tick-a-Lot in search':
      'Tras la exportación de Expo, un script de build escribe las guías, Acerca de y el sitemap en HTML simple. Las páginas de la app llevan noindex, porque muestran listas de una persona.',
    'Open source licences':
      'Una tarea de build reúne el texto de licencia de cada paquete en un archivo dentro de la app. La pantalla de Ajustes los lista desde ese archivo.',
    'Long lists':
      'El paquete fast-scroll del estudio envuelve cada lista larga. La lista sigue al control en cada fotograma, y un control oculto deja pasar los toques.',
  },
};

export default arch;
