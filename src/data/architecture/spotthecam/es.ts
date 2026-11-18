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
  design: {
    scale: [
      'Un conductor por instalación. El archivo de radares tiene unos 13 700 radares, uno por línea.',
      'El sitio son archivos estáticos, así que solo compartir viajes necesita servidor. Un Worker pequeño se queda en el plan gratuito de Cloudflare.',
      'Un viaje compartido está limitado a 1 MB y 100 000 puntos, y una dirección puede compartir 10 viajes por minuto.',
    ],
    data: [
      'data/cameras.json guarda un radar por línea: tipo, estado, punto, calle, barrio, fuente, límite y dirección.',
      'Los viajes están 400 días en el almacenamiento privado de la app. Los límites de las vías quedan 60 días en el teléfono.',
      'Un viaje compartido vive en Cloudflare KV bajo un id de 10 caracteres, como líneas de ruta aligeradas y totales sin horas.',
    ],
    interfaces: [
      'El Worker responde a POST /api/trips, y a GET y DELETE en /api/trips/<id>. Todo lo demás son archivos estáticos.',
      'Los plugins de Capacitor unen la página web con los servicios de conducción en Kotlin y sus ports en Swift.',
      'Las teselas de Overpass dan vías, ferrocarriles y pistas. Photon, Valhalla y TomTom responden por lugares, rutas y tráfico.',
    ],
    reliability: [
      'El service worker prueba primero la red y recurre a la copia a los 4 segundos, con hasta 500 teselas del mapa guardadas sin conexión.',
      'Un fallo del almacén en el Worker sale como 503 con cabeceras CORS, para que la app lo lea como fallo y no como falta de señal.',
      'Si un servidor público de rutas no responde, la voz lo dice. Pasado el límite de TomTom, las rutas van sin tráfico.',
    ],
    security: [
      'Compartir no pide iniciar sesión. KV guarda solo un hash SHA-256 de la clave de borrado, así que leer el almacén no permite borrar viajes.',
      'El Worker revisa cada cuerpo con un analizador estricto y envía nosniff y una política default-src none.',
      'Los viajes quedan en el teléfono hasta que se comparten. Un viaje compartido no lleva horas, y las velocidades en los radares quedan fuera sin permiso.',
    ],
    performance: [
      'Servicios en Kotlin cruzan el GPS con las vías en caché del teléfono y avisan unos 20 segundos antes de un radar, sin red.',
      'La compilación nocturna convierte los límites horarios en ventanas para los próximos 35 días, y el navegador solo elige la actual.',
      'KV guarda en caché un viaje compartido un minuto cerca del lector, y las teselas se guardan sin la carpeta semanal de OpenFreeMap.',
    ],
    operations: [
      'Una tarea de CI actualiza los radares a las 3 de la mañana de Sídney y sube el archivo con un radar por línea para que los diffs sean pequeños.',
      'Cada push a main despliega el sitio en Cloudflare. Una tarea nocturna envía el bundle de Android a Google Play si la app cambió.',
      'La versión APK de GitHub se actualiza sola desde GitHub Releases. La de Google Play no lleva ese código.',
    ],
    tradeoffs: [
      'Un sitio Next.js estático en una carcasa de Capacitor en vez de Expo, para que el mapa y las páginas compartan código, a costa de un Worker para los viajes.',
      'Un JSON diario en vez de una base de datos tras una API, para funcionar sin conexión y sin servidor, a costa de una lista de hasta un día.',
      'Servicios de conducción nativos en Kotlin en vez de JavaScript en la WebView, porque Android pausa la WebView con la pantalla apagada.',
      'Leaflet con teselas de OpenFreeMap en vez de Google Maps o Mapbox, porque no hay clave ni cuota.',
    ],
  },
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
    'Streets in the recorded voice':
      'El PC pronuncia cada calle de Australia y Nueva Zelanda con edge-tts y pone los clips en Cloudflare R2. El teléfono baja los clips de las calles cercanas y los guarda en caché.',
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
