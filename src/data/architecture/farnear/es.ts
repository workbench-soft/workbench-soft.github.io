import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Farnear es una sola app web en React, envuelta en Kotlin para Android y en Capacitor para el iPhone. Un Worker en Rust en Cloudflare pasa los mensajes sellados de la sala, y la llamada va directa entre los dispositivos.',
  parts: [
    { name: 'React y Vite', role: 'las pantallas, la página de la sala y la portada prerenderizada en 9 idiomas.' },
    {
      name: 'WebRTC',
      role: 'el sonido, el vídeo y los canales de datos de la pizarra, directos entre hasta 4 dispositivos.',
    },
    {
      name: 'Worker en Rust y Durable Object',
      role: 'un objeto por sala pasa los mensajes sellados y reparte los datos del relé.',
    },
    { name: 'Relés TURN', role: 'llevan el medio cifrado cuando falla un camino directo entre 2 redes.' },
    {
      name: 'Módulos de la pizarra',
      role: 'TypeScript puro guarda los trazos, los trazos borrados y el envío de archivos fuera de React.',
    },
    { name: 'Whisper y MediaPipe', role: 'la voz a texto y el fondo del vídeo, los dos en el dispositivo.' },
    {
      name: 'Envoltorio en Kotlin',
      role: 'la app de Android alrededor de la web en vivo, con AdMob, Play Billing y el timbre.',
    },
    {
      name: 'Capacitor y Swift',
      role: 'la app de iPhone alrededor de la misma web, con StoreKit y la hoja para compartir.',
    },
  ],
  flow: [
    'Un enlace de sala lleva su clave, y la página se abre con ella.',
    'La página entra en la sala del Worker por un WebSocket.',
    'Los dispositivos cambian ofertas selladas y caminos de red por el Worker.',
    'WebRTC une los dispositivos directamente o a través de un relé.',
    'Vídeo, sonido, trazos y archivos fluyen entre los dispositivos.',
  ],
  links: [
    { to: 'Cloudflare', text: 'El Worker, el Durable Object y un relé TURN funcionan en el plan gratuito.' },
    { to: 'consdr', text: 'El envoltorio de Android pasa a Kotlin el código de AdMob y Play Billing de Consdr.' },
    {
      to: 'Google Play',
      text: 'Play Billing vende Quitar anuncios y Farnear Pro, y AdMob muestra los anuncios de Android.',
    },
    { to: 'app-updater', text: 'WBS Updater compara la versión instalada con la última versión de GitHub.' },
    { to: 'Hugging Face', text: 'El escriba descarga de ahí una vez los pesos de Whisper.' },
  ],
  design: {
    scale: [
      'Una llamada une hasta 4 dispositivos en malla, y cada uno envía su vídeo a los otros 3.',
      'Un objeto de sala admite 6 sockets como máximo, 64 KB por mensaje y 20 mensajes por segundo, así que una avalancha queda en una sala.',
      'El Worker, el Durable Object y el relé corren en planes gratuitos, porque solo pasan por ellos mensajes pequeños y sellados.',
    ],
    data: [
      'No hay base de datos de cuentas. El nombre, el idioma, las salas guardadas y las claves push están en localStorage con un prefijo versionado.',
      'La transcripción y los mensajes de texto de cada sala están en IndexedDB en cada dispositivo.',
      'El Durable Object solo guarda la cuota del relé y una respuesta del relé en caché durante 90 minutos. KV guarda los informes de conexión 14 días.',
    ],
    interfaces: [
      'La señalización va por un WebSocket al objeto de sala. Cada mensaje es un sobre AES-GCM con versión, id y número de secuencia.',
      'Cada par de dispositivos abre 3 canales de datos negociados: puntos en vivo, mensajes de control y trozos de archivo.',
    ],
    reliability: [
      'Tras 3 segundos de corte, el id de par más bajo envía una oferta de reinicio ICE, con esperas de 12, 18 y 25 segundos.',
      'Una comprobación lee cada pista cada 3 segundos. Un bloqueo de 15 segundos inicia una reparación ICE y luego reconstruye el par.',
      'El id del sobre descarta una copia, el número de secuencia una repetición y el id de oferta una respuesta superada.',
    ],
    security: [
      'La clave de la sala va tras el # del enlace, así que el Worker ve texto cifrado sin nombres, títulos ni ofertas.',
      'Los medios van por DTLS-SRTP entre los dispositivos, y un relé TURN solo lleva paquetes cifrados.',
      'La página de la sala no carga scripts de anuncios y lleva noindex, así que ningún código ajeno corre junto a la clave.',
    ],
    performance: [
      'El canvas y las llamadas WebRTC corren en módulos simples, y React lee pequeños stores con useSyncExternalStore.',
      'El Worker guarda en caché los ajustes del relé 90 minutos por sala y pide 20 como máximo por sala y día.',
      'Whisper corre en WebGPU donde existe, y el modelo pequeño en WebAssembly si no. Los archivos grandes esperan a que el canal se vacíe.',
    ],
    operations: [
      'Checks ejecuta lint, pruebas y compilación en cada push a main, luego el sitio va a GitHub Pages y el Worker se despliega con wrangler.',
      'El APK se compila solo si cambió android/, porque la app carga el sitio en vivo. Un cambio web recibe una etiqueta sin runner pesado.',
      'Una ejecución nocturna a las 19:00 de Sídney compila el bundle de Play si cambió android/. Un Checks fallido cancela la compilación.',
    ],
    tradeoffs: [
      'Una malla de enlaces directos en lugar de un servidor de medios: no se aloja vídeo y no cuesta nada. La subida crece con cada persona, por eso las llamadas paran en 4.',
      'Una envoltura del sitio en vivo en lugar de pantallas nativas: un arreglo web sale sin revisión de tienda. La app necesita red.',
      'Whisper en el navegador en lugar de reconocimiento de voz en la nube, para que el audio quede en los dispositivos. El primer uso descarga los pesos del modelo.',
    ],
  },
  features: {
    'Calls through a link':
      'El final del enlace lleva la clave de la sala, así que el Worker solo ve mensajes sellados. Luego WebRTC une hasta 4 dispositivos en malla.',
    'Recover a dropped call':
      'Tras un corte un lado manda una oferta de reinicio ICE, hasta 3 veces. Una cola por par evita que gane una respuesta vieja.',
    'Return to a call':
      'El navegador recuerda la llamada abierta 30 minutos, así que el enlace vuelve a entrar solo. Un Web Lock por sala deja que una pestaña más nueva tome la llamada.',
    'Relay for blocked networks':
      'El Worker da a cada navegador datos TURN de corta vida por su socket. ICE prueba antes los caminos directos y luego pasa a un relé.',
    'Share the call link':
      'El panel de invitación prepara un borrador para Gmail, WhatsApp o Telegram en el idioma de la app. Otras apps abre la hoja para compartir del sistema.',
    'Join with a room code':
      'El código es un hash de la clave de la sala. Un dispositivo de la sala responde con un saludo CPace en un vestíbulo de Nostr, así un relé que observa no lee el enlace.',
    'Saved rooms':
      'Un enlace de sala se guarda en el navegador con un nombre, y ningún servidor guarda la lista. La misma clave abre la misma sala cada vez.',
    Board:
      'Módulos puros guardan los trazos y los trazos borrados como 2 conjuntos, enviados por canales de datos WebRTC. Un canvas los dibuja fuera de React.',
    'Share an image or video':
      'El archivo va a trozos por su propio canal de datos a cada persona. Reproducir, pausar y saltar de quien comparte van por el canal de control.',
    Lessons:
      'El dispositivo del dueño envía el bloqueo, el tiempo restante y su zoom por el canal de control. La pizarra guarda las líneas de cada página, y las diapositivas esperan en IndexedDB.',
    'Lesson tasks':
      'La pregunta y las respuestas van por el canal de control. El cuaderno de cada alumno es una pizarra propia que solo recibe el profe, y una palabra o un sello arrastrado sale como copia más nueva.',
    'Contacts and ringing':
      'El timbre es un push web sellado para el otro dispositivo y enviado por el Worker. La app de Android lo recibe por los servicios de Google Play, sin Firebase.',
    'Ads and remove ads':
      'AdMob muestra el banner de Android y el anuncio tras una llamada. Play Billing vende la retirada, y la página de la sala no carga script de anuncios.',
    'Farnear Pro':
      'Play Billing vende Pro en la app de Android, y los navegadores tienen las herramientas gratis. Un dispositivo con Pro lo dice en su saludo sellado, y la sala abre la pizarra.',
    'Android app':
      'Un envoltorio WebView en Kotlin carga la web en vivo y le pasa la cámara y el micrófono. La CI firma cada APK y lo pone en una versión pública de GitHub.',
    'iPhone app':
      'Capacitor carga la web en vivo, y gemelos en Swift de las piezas de Kotlin añaden StoreKit, AdMob y la hoja para compartir. El código espera su primera compilación.',
    Languages:
      'i18next guarda los 9 catálogos, y una elección cambia cada pantalla al momento. La elección se queda en el dispositivo.',
    'App icon':
      'Un solo SVG es la fuente del favicon, los iconos web y los tamaños del lanzador de Android. Android recibe además un icono adaptable y uno temático.',
    'Call stage':
      'Un módulo de escena elige el mosaico grande y la tira según el fijado y la pantalla compartida. Cada dispositivo mide las voces por su cuenta para el anillo de quien habla.',
    'Share a screen':
      'Cada conexión guarda desde el inicio un hueco de vídeo libre, así que una pantalla compartida no pide una oferta nueva. La pizarra dibuja encima.',
    'Take a photo':
      'modern-screenshot capta la llamada visible como PNG, con el vídeo y la pizarra. La app de Android la guarda en Descargas, y la imagen no pasa por ningún servidor.',
    'Your name':
      'El nombre se queda en el navegador y llega a los demás en el saludo sellado. Un cambio se ve desde la siguiente llamada.',
    'Video background':
      'MediaPipe encuentra a la persona en el dispositivo, y un canvas la dibuja sobre un desenfoque o una imagen. Esa pista de canvas sustituye a la cámara antes de salir.',
    'Call transcript and summary':
      'Un dispositivo ejecuta Whisper en el navegador, en WebGPU cuando puede. Las líneas van a los demás por un canal de datos y quedan en IndexedDB. El resumidor integrado de Chrome escribe el resumen.',
    'Recover stalled media':
      'Una revisión lee cada 3 segundos los bytes y fotogramas que llegan de cada pista. Un atasco de 15 segundos lanza una reparación ICE y luego rehace ese par.',
    'Shared call titles':
      'El título va en la señalización sellada con un contador de versiones. Gana la versión más nueva en cada dispositivo, y el Worker no puede leerlo.',
    'Shared documents on the board':
      'PDF.js pinta una página PDF y un motor de PowerPoint pinta una diapositiva en el dispositivo. Pasar página y quitar archivos van por el canal de control.',
    'Board text':
      'Un texto es un trazo de la pizarra con palabras y un punto, así que se sincroniza, se borra y se deshace como la tinta. Su altura sigue la de la pizarra y conserva su lugar con cualquier zoom.',
    'Board stamps':
      'Un sello es una línea de la pizarra con un punto y un tipo, así que se sincroniza, se borra y se deshace como la tinta. Su tamaño es una parte de la altura de la pizarra.',
    'Board pages':
      'Una pizarra vacía usa el id de página blank, y cada mensaje de página lleva la página más alta, así quien llega tarde sabe cuántas hay. Los trazos guardan su página como en las diapositivas.',
    Colouring:
      'Los dibujos son trazados SVG cerrados, dibujados para Farnear. El dibujo de cada página y el color de cada zona van por el canal de control, gana el último.',
    'Noughts and crosses':
      'Cada jugada lleva su número, así una jugada fuera de turno o en una casilla ocupada se descarta en cada dispositivo. El estado del juego va a quien abre un canal.',
    'YouTube together':
      'La API YouTube IFrame Player solo se carga cuando alguien comparte un enlace, desde el host sin cookies. Reproducir, pausar y saltar salen como un estado, gana el último.',
    'Contacts and rooms':
      'Contactos y salas comparten una lista guardada en el navegador, cada uno con su tipo. Un nombre de contacto se queda en el dispositivo, y un título de sala se sincroniza.',
    'Search and share preview':
      'Un plugin de Vite prerenderiza la portada en cada uno de los 9 idiomas al compilar. Otro escribe el mapa del sitio, y cada página lleva sus etiquetas de vista previa.',
    'Messages in a call':
      'Una línea va sellada por la señalización de la sala, aparte del camino del vídeo. Cada dispositivo la guarda en IndexedDB y cambia las líneas que faltan en la siguiente llamada.',
    'Reactions and raised hands':
      'Cada reacción va como mensaje sellado por la señalización de la sala, 3 por segundo como máximo. Una mano levantada viaja en el estado del participante que la lista repite cada 5 segundos, así la ven quienes llegan tarde. Keyframes de CSS dibujan la subida y los destellos.',
    'Button hints':
      'Un módulo compartido muestra la burbuja tras pasar el ratón o una pulsación larga. La pulsación larga muestra el nombre y no pulsa el botón.',
    'Close Farnear and take back its permissions':
      'La página corta la llamada y el timbre, y pide al envoltorio de Android que suelte sus permisos y se cierre. Un navegador recibe los pasos para reiniciarlos a mano.',
  },
};

export default arch;
