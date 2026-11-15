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
  design: {
    scale: [
      'Una lista privada se queda en un solo teléfono, y una lista compartida llega a un hogar o a unos amigos con un enlace.',
      'La app no tiene servidor, así que el plan gratuito de Firestore, 50 000 lecturas y 20 000 escrituras al día, marca el presupuesto de las listas compartidas.',
    ],
    data: [
      'SQLite en el teléfono guarda listas, artículos, tiendas, pasillos, recorridos, nombres conocidos y precios. La versión web ejecuta el mismo SQLite sobre wasm.',
      'Solo las listas compartidas llegan a Firestore, como lists/{id}/items/{itemId}, y los pasillos y recorridos de una tienda como stores/{osmId}.',
      'Un borrado pone deleted = 1 y conserva la fila. dirty = 1 marca un cambio que Firestore aún no ha recibido.',
      'Una foto es un JPEG de 360 píxeles, de unos 30 KB, guardado dentro del artículo.',
    ],
    interfaces: [
      'Un enlace para compartir lleva un id de lista aleatorio de 32 dígitos hexadecimales, y un intent filter de Android lo abre en la app.',
      'Un enlace de viaje de Tripforge lleva JSON en base64url con v, place, start, nights y hasta 60 lugares.',
      'Los precios salen del JSON detrás de la búsqueda de los sitios de Woolworths y Coles, las tiendas de Nominatim y Overpass, y los lugares del Worker de Tripforge o de Wikidata.',
    ],
    reliability: [
      'Cada cambio se guarda primero en SQLite y la pantalla se dibuja desde ahí, así que marcar funciona sin señal. El envío se repite cada 30 segundos mientras la app está abierta.',
      'Gana el cambio más reciente por artículo, en el teléfono y en las reglas de Firestore. Dos ediciones sin conexión del mismo artículo no se fusionan, y la posterior se queda con todo el artículo.',
      'El oyente funciona un minuto después de que la app pasa a segundo plano. Una app cerrada no recibe avisos, porque haría falta un servidor de notificaciones push.',
    ],
    security: [
      'Cada instalación entra en Firebase de forma anónima, y el id aleatorio de la lista en el enlace es el secreto. Firestore se niega a listar las listas.',
      'Las reglas comprueban el id de 32 dígitos hex, los campos conocidos, sus tamaños y una hora como mucho un día adelantada. Una foto debe ser datos JPEG o una imagen de Wikimedia Commons.',
      'Quien tenga el enlace puede leer, cambiar y borrar la lista, y Firebase App Check está desactivado por ahora.',
    ],
    performance: [
      'El envío espera medio segundo, así que una ráfaga de marcas sale en una sola escritura.',
      'Los precios se cargan de Woolworths de 3 en 3 nombres y de Coles de uno en uno. Quedan un día en SQLite, y solo se redibujan los precios.',
      'El teléfono lee los pasillos de una tienda en Firestore como mucho una vez cada 10 minutos.',
    ],
    operations: [
      'Checks y Release empiezan juntos con cada push a main. La release publica el APK firmado cuando Checks pasan, y un Checks fallido cancela la compilación.',
      'Un bundle de Google Play se compila una vez al día a las 19:00 de Sídney, y solo si la app cambió.',
      'Firebase Hosting sirve la versión web, y se despliega con las reglas de Firestore cuando Checks pasan. El APK de GitHub se actualiza solo, y la compilación de Play deja ese código fuera.',
    ],
    tradeoffs: [
      'Expo en lugar de una app nativa en Kotlin, para que un solo código dé también la página donde se abre un enlace compartido.',
      'Filas de Firestore en lugar de un servidor propio o WebRTC: no hay servidor que mantener, y una marca no espera a un teléfono dormido.',
      'Gana el cambio más reciente por artículo en lugar de fusionar campos: menos código, pero se pierde una edición anterior hecha sin conexión.',
      'Firebase Hosting en lugar de GitHub Pages, porque SQLite sobre wasm necesita las cabeceras COOP y COEP que Pages no puede poner.',
    ],
  },
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
