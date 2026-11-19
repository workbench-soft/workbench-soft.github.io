import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Una sola app en Kotlin para móviles Android y Google TV reproduce archivos del móvil, de un USB o de una carpeta SMB con libVLC. Las bibliotecas y las posiciones se quedan en el dispositivo en SQLite, y el APK de GitHub suma música en línea.',
  parts: [
    {
      name: 'Kotlin y Android Views',
      role: 'las pantallas para el mando y para el tacto, en una app para el móvil y la TV.',
    },
    { name: 'libVLC', role: 'reproduce el vídeo y la música, lee las etiquetas y recorre las carpetas SMB.' },
    { name: 'SQLite', role: 'las posiciones, las bibliotecas de música, libros y vídeos y el punto de cada libro.' },
    {
      name: 'Media3',
      role: 'la sesión de música con la notificación, la pantalla de bloqueo y los botones Bluetooth.',
    },
    { name: 'WorkManager', role: 'escanea las carpetas de música, libros y vídeos en segundo plano.' },
    { name: 'sherpa-onnx', role: 'el detector de palabra clave que oye Hey Lumi en el móvil.' },
    {
      name: 'Chaquopy y yt-dlp',
      role: 'el módulo en línea con los nombres de MusicBrainz y el sonido de YouTube, solo en el APK de GitHub.',
    },
    { name: 'Google Play Billing y AdMob', role: 'las compras Pro y Quitar anuncios, y el banner en el móvil.' },
  ],
  flow: [
    'La persona añade una carpeta del móvil, un USB o una carpeta SMB.',
    'Un escaneo en segundo plano guarda los nombres y las etiquetas en SQLite.',
    'La pantalla de inicio muestra los archivos, las canciones, los libros y los vídeos.',
    'Un toque, una tecla del mando o una orden de voz elige qué suena.',
    'libVLC lo reproduce, y la app guarda el punto sobre la marcha.',
  ],
  links: [
    {
      to: 'guitar-upscale',
      text: 'Buscar tabs abre Guitar Upscale en la canción que suena, con un enlace de Android.',
    },
    { to: 'spotthecam', text: 'Hey Lumi comparte el micrófono con Hey Spot, así las dos frases funcionan a la vez.' },
    {
      to: 'keeppad',
      text: 'Hey Lumi usa el mismo modelo de palabra clave que Hey Keep y comparte el micrófono con él.',
    },
    { to: 'GitHub', text: 'El APK y sus actualizaciones llegan de las versiones en GitHub.' },
    { to: 'Google Play', text: 'La versión de Play, sus actualizaciones y las compras Pro y Quitar anuncios.' },
  ],
  design: {
    scale: [
      'Un APK para teléfonos Android y Google TV, una persona por instalación. Las bibliotecas se indexan en el dispositivo.',
      'El escaneo de vídeo lee solo los nombres, sin leer etiquetas, así que un recurso grande se indexa sin abrir cada archivo.',
      'Se entregan dos ABI, armeabi-v7a y arm64-v8a, para mantener pequeño el APK con libVLC.',
    ],
    data: [
      'SQLite en el dispositivo: positions.db, library.db, books.db, book-places.db y videos.db.',
      'positions.db indexa una fila por la URI sin el acceso al NAS, y un archivo USB también por nombre y tamaño.',
      'La copia de seguridad de Android guarda posiciones y lugares de libros, y deja fuera nas.xml y las bases con acceso al NAS.',
    ],
    interfaces: [
      'libVLC lee fuentes file://, content:// y smb://. Un MediaSessionService de Media3 da la notificación, la pantalla de bloqueo y los botones Bluetooth.',
      'La voz usa el SpeechRecognizer del dispositivo, y sherpa-onnx detecta la frase Hey Lumi. Guitar Upscale se abre con un enlace Android VIEW.',
      'El módulo en línea llama a MusicBrainz y Wikidata, y a YouTube con yt-dlp, solo en el APK de GitHub.',
    ],
    reliability: [
      'El reproductor guarda la posición cada 5 segundos, al pausar, al parar y al salir, así que un fallo cuesta segundos.',
      'ScanWorker corre en WorkManager con una carpeta nueva, al iniciar y a diario con Wi-Fi, y las consultas van despacio en un solo hilo.',
      'Un Bluetooth que no reproduce nada devuelve el sonido al altavoz.',
    ],
    security: [
      'Sin cuenta y sin servidor propio. Los nombres y las etiquetas se quedan en el dispositivo.',
      'La lista de NAS con sus contraseñas está en nas.xml, que la copia de Android deja fuera.',
      'SponsorBlock recibe solo un prefijo del hash del id de YouTube. El micrófono de activación corre como servicio en primer plano.',
    ],
    performance: [
      'libVLC reproduce cada archivo directamente, y un reproductor Media3 lo envuelve para el audio, así que un motor sirve vídeo y música.',
      'LoudnessGate da al modelo de palabra clave solo tramas fuertes y el medio segundo anterior, y una sala tranquila lo salta.',
      'Las carátulas se decodifican a su tamaño con caché, y el índice de palabras lista cada palabra una vez con sus libros.',
    ],
    operations: [
      'Un push a main lanza Checks y Release a la vez. Release firma el APK y lo publica cuando Checks pasan.',
      'Cada runner de compilación guarda su estado de Gradle, así que Gradle recompila solo lo cambiado. La lista de versiones conserva las 3 últimas.',
      'El APK se actualiza desde GitHub Releases al abrir. El bundle de Play deja fuera el actualizador y el módulo en línea.',
    ],
    tradeoffs: [
      'Kotlin nativo con Views simples en lugar de Expo, porque el reproductor es una vista libVLC que manejan las teclas del mando y el foco.',
      'libVLC sin modificar en lugar de Media3 ExoPlayer, por las pistas MKV, la navegación SMB y los subtítulos Windows-1251, a costa de un aviso LGPL y un APK grande.',
      'SMB con libVLC en lugar de una biblioteca aparte, sin dependencia extra, pero un listado de NAS no da el tamaño del archivo.',
      'Una sola compra Pro en lugar de una suscripción por app, así que una comprobación, Entitled.pro(), controla cada pantalla.',
    ],
  },
  features: {
    Sources:
      'Las carpetas USB se abren con el sistema de archivos de Android, y libVLC recorre las carpetas SMB. La lista de NAS se queda en el dispositivo, fuera de la copia de Android.',
    Resume:
      'El reproductor guarda cada posición en SQLite cada 5 segundos y al salir. La lista de archivos lee la misma tabla para la barra bajo cada archivo.',
    'Subtitles and audio':
      'libVLC lista las pistas integradas y los archivos de subtítulos de la carpeta. Los subtítulos de texto se leen como UTF-8, si no como Windows-1251.',
    Controls:
      'El reproductor maneja en libVLC los saltos y la velocidad. Un módulo de cola guarda el orden, el aleatorio y la repetición.',
    Updates:
      'Al abrir, el APK lee la última versión en GitHub y baja un APK más nuevo. El instalador de Android pide luego la confirmación.',
    Ads: 'AdMob muestra el banner en el móvil tras el formulario de consentimiento de Google. Una sola comprobación lo oculta tras una compra Pro o Quitar anuncios, y la TV no muestra anuncios.',
    Languages:
      'Los recursos de texto de Android guardan los 9 idiomas. La API de idioma de AppCompat aplica la elección de los ajustes o el idioma del dispositivo.',
    'Touch on a phone':
      'Una capa de gestos sobre el vídeo convierte toques y arrastres en saltos, búsqueda, brillo y volumen. El mando de la TV pasa por encima de esa capa.',
    'Panel buttons':
      'La elección se guarda en las preferencias del reproductor en el dispositivo. El reproductor arma su fila de botones con ella, y libVLC escala la imagen.',
    'Sponsor skip':
      'El reproductor lee los capítulos de SponsorBlock del archivo, o consulta la API de SponsorBlock con un hash del ID del vídeo. libVLC salta luego cada segmento.',
    'Phone speaker':
      'Una pista de audio muda que prefiere el altavoz del móvil arrastra el sonido de libVLC. Una comprobación cada segundo devuelve un Bluetooth mudo al altavoz.',
    Look: 'Android Views sencillas hechas en código comparten un juego de colores, letras y la píldora de foco. El logotipo usa Instrument Serif.',
    'Music library':
      'Una tarea de WorkManager recorre cada carpeta y lee las etiquetas con libVLC. Las canciones van a SQLite en el dispositivo, fuera de la copia de Android.',
    'Music player':
      'Una sesión de Media3 reproduce las canciones con libVLC sin vídeo. Dibuja la notificación y la pantalla de bloqueo, y la barra la sigue en cada pantalla.',
    'MusicBrainz and YouTube':
      'MusicBrainz nombra las canciones, los artistas y los álbumes. yt-dlp corre en Python con Chaquopy y toma el sonido de YouTube, en el APK de GitHub.',
    Audiobooks:
      'Un escaneo agrupa los archivos de audio en libros según el archivo OPF, las etiquetas y los nombres de carpeta. Wikidata nombra al autor, y SQLite guarda el punto de cada libro.',
    'Video library':
      'El escaneo guarda solo la ruta de cada vídeo en SQLite. Un analizador lee la serie, la temporada y el episodio de los nombres, y Wikidata suma sus otros nombres. El teléfono lee y escribe los datos de películas del televisor LG en un archivo junto a las películas en el NAS, por SMB con smbj.',
    'Find tabs':
      'La barra del reproductor envía a Guitar Upscale un enlace de Android con el artista y el título. El botón aparece solo cuando Android encuentra esa app.',
    'Google Play build':
      'Un segundo tipo de build quita la autoactualización, el acceso completo a los archivos y el módulo en línea. Google Play la actualiza.',
    'Voice commands':
      'sherpa-onnx oye Hey Lumi en el móvil, y el reconocimiento de voz de Android toma la orden. Una búsqueda halla la canción, el libro o el vídeo, y la voz sintética responde.',
    'Online music':
      'El módulo en línea ejecuta yt-dlp en Python con Chaquopy. MusicBrainz nombra las canciones y YouTube da el sonido, en el APK de GitHub en un móvil de 64 bits.',
    'Lumiere Pro':
      'Google Play Billing vende un solo producto Pro, y la app consulta Google Play en cada inicio. Una sola comprobación abre las funciones de voz y oculta el banner.',
    'LG webOS app':
      'Una página web en TypeScript reproduce con el reproductor de la tele. Un servicio Node en el mismo paquete webOS lista las memorias USB y el NAS por WebDAV, y envía los archivos a la página.',
    'Library setup and NAS finder':
      'NasFind llama al puerto 445 en toda la red /24 del televisor y pide cada nombre por NetBIOS. Tras el acceso, libVLC lista las carpetas compartidas, y las carpetas de la biblioteca guardan el tipo de cada carpeta en SharedPreferences.',
  },
};

export default arch;
