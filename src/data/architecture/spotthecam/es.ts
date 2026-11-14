import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Un sitio estático en Next.js sobre Cloudflare muestra el mapa de radares, y Capacitor envuelve los mismos archivos como apps de Android y iPhone. Código nativo en Kotlin y Swift lleva las funciones de conducción, y un pequeño Worker guarda los viajes compartidos.',
  parts: [
    {
      name: 'Build de datos de radares',
      role: 'un script de TypeScript en CI que cada noche une las listas de los estados y de Nueva Zelanda en un solo JSON.',
    },
    {
      name: 'OpenStreetMap',
      role: 'el punto de cada radar, los límites de las calles y los límites por horario de las zonas escolares.',
    },
    { name: 'Next.js', role: 'una exportación estática con el mapa, las páginas del sitio y una página por radar.' },
    {
      name: 'Leaflet y MapLibre',
      role: 'Leaflet dibuja los radares y los viajes, y MapLibre pinta debajo los mosaicos de OpenFreeMap.',
    },
    { name: 'Cloudflare Worker y KV', role: 'sirve el sitio y guarda los viajes que la gente comparte.' },
    {
      name: 'Capacitor y Kotlin',
      role: 'la capa de Android, con servicios nativos para velocidad, avisos, viajes, rutas y Hey Spot.',
    },
    { name: 'Photon, Valhalla y TomTom', role: 'la búsqueda de lugares, las rutas con giros y el tráfico del día.' },
    {
      name: 'Swift y StoreKit 2',
      role: 'la versión para iPhone del código de conducción y rutas, y las compras en la App Store.',
    },
  ],
  flow: [
    'Cada noche una tarea de CI descarga las listas de los estados y de Nueva Zelanda.',
    'OpenStreetMap añade el punto y el límite de la calle de cada radar.',
    'Next.js construye el sitio, y Cloudflare lo sirve con el archivo de radares.',
    'El navegador elige el límite del minuto actual y dibuja el mapa.',
    'En el teléfono un servicio nativo lee el mismo archivo y avisa de los radares.',
    'Los viajes se quedan en el teléfono hasta que la persona comparte uno.',
  ],
  links: [
    {
      to: 'keeppad',
      text: 'Hey Spot usa el mismo modelo de palabra de activación que keepPad. Una sola app tiene el micrófono para las dos frases.',
    },
    {
      to: 'lumiere-player',
      text: 'Hey Lumi comparte el micrófono con Hey Spot mediante la misma biblioteca de activación.',
    },
    {
      to: 'Google Maps',
      text: 'Iniciar abre Google Maps con las paradas en el mejor orden, y la app sigue avisando.',
    },
    {
      to: 'Google Play',
      text: 'Play Billing vende Quitar anuncios y SpotTheCam Pro. AdMob muestra el banner en la app.',
    },
    {
      to: 'GitHub Releases',
      text: 'Cada versión deja allí el APK, y el build de GitHub se actualiza solo desde allí.',
    },
  ],
  features: {
    'Camera map':
      'El build nocturno convierte los límites por horario de cada radar en ventanas para los próximos 35 días. El navegador elige la ventana del minuto actual.',
    'Search and filter':
      'La página construye un índice de barrios con el archivo de radares y lo busca en el navegador. No interviene ningún servidor.',
    'Camera types':
      'Cada radar lleva su tipo de la lista de origen. El navegador recuerda la elección, y la app de Android avisa solo de los tipos del mapa.',
    'Follow me':
      'La página gira el mapa según el rumbo del GPS mientras la persona se mueve. MapLibre gira los mosaicos de calles con su propio ángulo, y los nombres quedan derechos.',
    'Camera details':
      'La ventana lee el archivo de radares que llega con el sitio. Cada fuente de la lista de tipos lleva el enlace a su página oficial.',
    'Offline map':
      'Un service worker guarda la página, el archivo de radares y hasta 500 mosaicos en el dispositivo. Un manifiesto web deja que el navegador lo instale como app.',
    'Light and dark theme':
      'El tema se aplica antes de que la página se dibuje. Un estilo vectorial da calles claras al mapa oscuro desde el código.',
    Languages:
      'i18next tiene 9 catálogos para el mapa y las pantallas de la app. Las notificaciones de Android toman su texto de los archivos de cadenas de Android.',
    'Site pages and ads':
      'Next.js escribe en el build una página estática por estado, barrio y radar. AdSense llena el banner del sitio web.',
    'Speed badge':
      'Código en Kotlin une la posición GPS con las calles de OpenStreetMap y sus límites. Los informes de actividad de Android y el trazado de vías y pistas distinguen el coche del tren o el avión.',
    'Camera warnings':
      'Un servicio en Kotlin busca los radares por delante en el rumbo y habla unos 20 segundos antes. El trazado de las calles junto al radar dice en qué lado está.',
    'Camera alerts stay ready':
      'Los informes de actividad de Android y una valla de 300 m alrededor del último aparcamiento arrancan el servicio de conducción. Una pantalla transparente lo arranca de nuevo tras un reinicio o una actualización.',
    'Over the limit':
      'Los límites llegan de OpenStreetMap por Overpass y se quedan 60 días en el teléfono. Una comprobación en Kotlin habla tras 5 segundos por encima del límite.',
    'School zones':
      'Los límites por horario de OpenStreetMap dan las horas de la zona. Una lista de los trimestres escolares publicados de NSW dentro de la app da los días lectivos.',
    'Loud warnings':
      'Cada sonido suena como alarma por el altavoz integrado, y la app sube el volumen hasta que terminan las palabras. Los interruptores de Ajustes devuelven la salida al teléfono.',
    "Author's voice":
      'Un modelo de voz abierto en un PC creó las palabras de aviso con la voz del propio autor. Los clips van dentro de la app, y Pro los desbloquea.',
    'Trip log':
      'Servicios en Kotlin graban cada viaje y cada paseo con la velocidad en cada radar. Los viajes se quedan 400 días en el almacenamiento privado de la app.',
    'Trip line by limit':
      'Cada punto grabado guarda la velocidad y el límite de la calle en OpenStreetMap. El mapa pinta cada tramo de la línea con esos dos datos.',
    'Trip stats':
      'La app calcula los datos en el teléfono con los puntos del viaje. Un tramo por debajo de 20 km/h durante 3 minutos o más cuenta como atasco.',
    'Share a trip':
      'La app envía una ruta aligerada a un Cloudflare Worker, que la guarda en KV con su propio id. Dejar de compartir la borra allí.',
    Distance:
      'Las cifras leen los totales que el servicio de conducción guarda en el teléfono. No interviene ningún servidor.',
    'Turn by turn routes':
      'Valhalla mide el tiempo entre cada par de paradas, y la app prueba cada orden. TomTom elige calles que evitan el tráfico, y una biblioteca de navegación de MapLibre sigue el coche.',
    'Route options':
      'Las casillas pasan a pie o sin peajes a los servicios de rutas. Los favoritos se quedan en el teléfono, y Hey Spot los reconoce por su nombre.',
    'Hey Spot':
      'sherpa-onnx oye las palabras de activación en el teléfono sin red. El servicio de voz de Android oye el resto, y Photon encuentra los lugares.',
    'Hey Spot, what street am I on?':
      'La app lee el nombre y el límite de la calle de OpenStreetMap bajo el coche. La voz sintética del teléfono los dice.',
    'Screen stays on':
      'La ventana de Android de la app pide al sistema que deje la pantalla encendida. La petición termina cuando la app pasa a segundo plano.',
    'Self-update':
      'El build de GitHub pregunta a GitHub Releases por un APK más nuevo y lo pasa al instalador de Android. El build de Google Play deja fuera el código de actualización.',
    'Same app on the iPhone':
      'Capacitor envuelve el mismo sitio para iOS. Versiones en Swift del código Kotlin de conducción y rutas hacen el trabajo nativo, y StoreKit 2 vende Pro.',
  },
};

export default arch;
