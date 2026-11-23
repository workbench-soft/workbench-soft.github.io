import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Una app de Android en Kotlin sin servidor. Un servicio en primer plano oye la palabra de activación, el móvil calcula él mismo la huella de Shazam y la canción va a Spotify y a Lumiere.',
  parts: [
    {
      name: 'ListenService',
      role: 'el servicio de micrófono en primer plano: lee bloques de 80 ms, inicia una captura y dice el resultado.',
    },
    {
      name: 'sherpa-onnx',
      role: 'el detector de palabras clave que oye «Shazam» con una línea de frase, sin entrenamiento.',
    },
    {
      name: 'Signature.kt',
      role: 'una versión en Kotlin de la huella de shazamio: una FFT del sonido 16 kHz mono y picos en 4 bandas.',
    },
    { name: 'Shazam', role: 'el servicio de reconocimiento, consultado con la huella a los 3, 6, 9 y 12 segundos.' },
    { name: 'Spotify.kt', role: 'el inicio de sesión PKCE, la búsqueda por ISRC y el guardado en Tus me gusta.' },
    {
      name: 'wakeshare',
      role: 'el módulo de micrófono compartido de este repositorio, para que las demás apps conserven sus frases.',
    },
  ],
  flow: [
    'El detector oye «Shazam», el servicio toma el micrófono y pita.',
    'La captura graba y construye la huella mientras las consultas van a Shazam en segundo plano.',
    'Un acierto va a Lumiere por broadcast y a Tus me gusta de Spotify.',
    'Una voz dice el resultado y el micrófono vuelve a oír cada frase de activación.',
  ],
  links: [
    { to: 'Shazam', text: 'Recibe la huella y responde con el título, el artista, el álbum y el ISRC.' },
    { to: 'Spotify', text: 'Busca la pista por ISRC, luego por artista y título, y la guarda en Tus me gusta.' },
    { to: 'lumiere-player', text: 'Recibe cada canción por el broadcast LIKE_CAUGHT_SONG y la añade a sus Me gusta.' },
    { to: 'keeppad', text: 'Comparte el micrófono con SongCatcher por wakeshare, junto con SpotTheCam y ServoHop.' },
  ],
  design: {
    scale: [
      'El móvil de un solo dueño, unas pocas capturas al día.',
      'Shazam respondió 429 tras unas 15 consultas en 2 minutos, así que una captura envía 4 como mucho.',
    ],
    data: [
      'Las 50 últimas canciones y su estado en Spotify están en shared preferences.',
      'Las huellas hechas sin conexión esperan al lado durante una semana como mucho. El sonido no se guarda.',
    ],
    interfaces: [
      'Un POST HTTPS de la huella a amp.shazam.com y la Web API de Spotify con un token bearer.',
      'Un broadcast explícito a com.workbenchsoft.lumiere y el servicio enlazado de wakeshare para las demás apps.',
    ],
    reliability: [
      'Sin red, un 429 o un 5xx guarda la huella, y la siguiente activación o arranque la envía.',
      'Una canción solo queda guardada cuando la biblioteca de Spotify lo confirma, y un botón reintenta el resto.',
    ],
    security: [
      'El inicio de sesión usa PKCE, así que no hay secreto de cliente. El token de refresco va cifrado con una clave de Android Keystore.',
      'Solo la huella, unos KB de picos, sale del móvil. La grabación se borra al acabar la captura.',
    ],
    performance: [
      'Las consultas van en un segundo hilo, así la grabación sigue mientras Shazam responde en 0,3 a 0,6 segundos.',
      'La primera consulta sale tras 3 segundos de música, y la mayoría de canciones aciertan con ella.',
    ],
    operations: [
      'La CI pasa las pruebas unitarias y construye el APK como artefacto songcatcher.',
      'SignatureTest ata la huella a los bytes de shazamio, y CatalogTest los 9 catálogos de textos.',
    ],
    tradeoffs: [
      'La dirección gratuita de Shazam en vez de AudD, con un token de pago por consulta, y de ShazamKit, que pide la cuota de desarrollador de Apple. La dirección no es pública y puede cambiar.',
      'Una línea de frase de sherpa en vez de un modelo openWakeWord entrenado, para salir sin entrenamiento. El modelo llega después.',
      'Una app aparte en vez de una función en Lumiere, para que una captura funcione con Lumiere cerrado. Un APK más que instalar.',
    ],
  },
  features: {
    'Wake by voice':
      'KeywordAudio.kt ejecuta sherpa-onnx con la línea de keywords.txt. ListenService.kt toma el micrófono compartido durante la captura y pita con Voice.kt.',
    'Song recognition':
      'Catch.kt pasa bloques de 100 ms a Signature.kt y envía la huella a los 3, 6, 9 y 12 segundos. Shazam.kt lee el título, el artista, el álbum y el ISRC.',
    'Liked Songs in Spotify and Lumiere':
      'Lumiere.kt envía el broadcast con el artista, el título, el álbum, el ISRC y la hora. Spotify.kt busca por ISRC, luego por nombre, y guarda en la biblioteca.',
    'Spoken answer':
      'Voice.kt pita y habla con la síntesis de voz de Android bajando la música. El interruptor de la pantalla apaga la voz.',
    'Offline catches':
      'History.kt guarda la huella y su duración. Tras cada captura y al arrancar, el servicio envía las que esperan y guarda cada acierto sin voz.',
    'Caught songs':
      'History.kt guarda las 50 últimas canciones y su estado en Spotify. retryPending guarda las que esperan y dice cuántas entraron.',
    Lyrics:
      'Lyrics.kt pide a LRCLIB la canción por artista, título y álbum, luego busca, y guarda la respuesta en la carpeta de caché. SongSheet en Compose muestra un indicador, la letra o un reintento.',
    'Find tabs in Guitar Upscale':
      'GuitarTabs.kt envía https://guitar-upscale.com/?song=<artista título> como intent VIEW al paquete de Guitar Upscale, el mismo enlace que Lumiere. El botón solo aparece si la app acepta el enlace.',
    Languages:
      'Cada texto visible y hablado está en res/values strings.xml en 9 idiomas, y CatalogTest comprueba las claves.',
    'Shared microphone':
      'WakeShare une las apps de activación con un servicio enlazado. La app con el nombre de paquete más bajo tiene el micrófono y envía WAKE a la app cuya frase oyó.',
    'Wake engine':
      'wakeword ejecuta modelos openWakeWord en ONNX Runtime con un verificador por dueño. El detector sherpa cubre cada frase sin modelo, como hoy en SongCatcher.',
  },
};

export default arch;
