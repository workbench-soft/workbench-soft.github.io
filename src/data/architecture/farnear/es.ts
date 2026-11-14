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
    'Saved rooms':
      'Un enlace de sala se guarda en el navegador con un nombre, y ningún servidor guarda la lista. La misma clave abre la misma sala cada vez.',
    Board:
      'Módulos puros guardan los trazos y los trazos borrados como 2 conjuntos, enviados por canales de datos WebRTC. Un canvas los dibuja fuera de React.',
    'Share an image or video':
      'El archivo va a trozos por su propio canal de datos a cada persona. Reproducir, pausar y saltar de quien comparte van por el canal de control.',
    'Lessons (planned)':
      'Una especificación plantea diapositivas enviadas a cada dispositivo antes de la clase, con las herramientas de la pizarra en cada una. La app aún no tiene código de clases.',
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
    'Contacts and rooms':
      'Contactos y salas comparten una lista guardada en el navegador, cada uno con su tipo. Un nombre de contacto se queda en el dispositivo, y un título de sala se sincroniza.',
    'Search and share preview':
      'Un plugin de Vite prerenderiza la portada en cada uno de los 9 idiomas al compilar. Otro escribe el mapa del sitio, y cada página lleva sus etiquetas de vista previa.',
    'Messages in a call':
      'Una línea va sellada por la señalización de la sala, aparte del camino del vídeo. Cada dispositivo la guarda en IndexedDB y cambia las líneas que faltan en la siguiente llamada.',
    'Button hints':
      'Un módulo compartido muestra la burbuja tras pasar el ratón o una pulsación larga. La pulsación larga muestra el nombre y no pulsa el botón.',
    'Close Farnear and take back its permissions':
      'La página corta la llamada y el timbre, y pide al envoltorio de Android que suelte sus permisos y se cierre. Un navegador recibe los pasos para reiniciarlos a mano.',
  },
};

export default arch;
