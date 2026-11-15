import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'KeepPad es una sola app de Expo que da la app de Android, la de iPhone y la web. Las notas se quedan en SQLite en el teléfono, y solo las compartidas van a Firebase.',
  parts: [
    {
      name: 'Expo y React Native',
      role: 'un solo código para Android, iPhone y la web, con pantallas de expo-router.',
    },
    {
      name: 'Servicio en Kotlin',
      role: 'el servicio de Android en primer plano oye Hey Keep, graba la nota y reproduce las respuestas.',
    },
    { name: 'sherpa-onnx', role: 'el pequeño modelo de palabras clave del teléfono detecta las frases de activación.' },
    {
      name: 'Reconocimiento de voz del teléfono',
      role: 'el servicio de voz de Android y el de Apple pasan la voz a texto.',
    },
    {
      name: 'SQLite',
      role: 'las notas, el registro de notas enviadas y la lista de entradas ya leídas, en el teléfono.',
    },
    {
      name: 'Gemini Nano y Apple Foundation Models',
      role: 'el modelo del teléfono elige un grupo mejor mientras la app está abierta.',
    },
    { name: 'Firebase', role: 'Firestore guarda las notas compartidas, y Hosting sirve la web.' },
    { name: 'Google Play', role: 'los anuncios de AdMob, y las compras Quitar anuncios y KeepPad Pro.' },
  ],
  flow: [
    'El servicio oye «Hey Keep» con la app cerrada.',
    'Graba la nota y pasa la voz a texto en el teléfono.',
    'El servicio escribe la nota en un pequeño archivo de entrada.',
    'La app la guarda en SQLite y elige un grupo por las palabras.',
    'El modelo del teléfono puede mover la nota, y la lista se recarga.',
  ],
  links: [
    {
      to: 'memories',
      text: 'Una nota que empieza con el nombre de una persona va a su diario en el NAS de casa por WebDAV.',
    },
    {
      to: 'lumiere-player',
      text: 'Con Wake Share el servicio de KeepPad oye también «Hey Lumi» y se lo pasa a Lumiere.',
    },
    { to: 'spotthecam', text: 'El mismo micrófono compartido pasa «Hey Spot» a SpotTheCam.' },
    { to: 'Firebase', text: 'Firestore mantiene vivas las notas compartidas, y Hosting sirve la web.' },
    { to: 'Google Play', text: 'AdMob muestra el banner, y Play Billing vende Quitar anuncios y KeepPad Pro.' },
  ],
  design: {
    scale: [
      'Una persona por instalación. Las notas se quedan en el teléfono, y solo una nota compartida llega a Firestore, como texto de hasta 20 000 caracteres.',
      'Hey Keep funciona todo el día como servicio en primer plano de Android, así que la batería marcó el diseño: un umbral de volumen salta los fotogramas silenciosos.',
    ],
    data: [
      'SQLite keeppad.db guarda notas, exports (qué app recibió qué nota) y applied_inbox. PRAGMA user_version cuenta los pasos de migración que ejecutó un teléfono.',
      'Las grabaciones son archivos WAV en files/audio. Las notas que Hey Keep graba con la app cerrada son archivos JSON en files/keep-inbox.',
      'Los ajustes están en localStorage. Los tokens de las apps vinculadas están en el keystore de Android o el keychain de iOS mediante expo-secure-store.',
      'Una nota compartida en Firestore guarda solo text, group y updated.',
    ],
    interfaces: [
      'El servicio de Kotlin y la app se pasan las notas por la bandeja JSON y un evento watch, porque el servicio no llega a SQLite.',
      'Las apps vinculadas reciben cada nota nueva por su propia API web. Obsidian recibe un archivo en una carpeta elegida, y un diario de Memories la recibe por WebDAV.',
      'expo-speech-recognition convierte la voz en texto con el servicio de voz de Android o el reconocedor de Apple.',
    ],
    reliability: [
      'Una grabación larga escribe sobre la marcha un archivo PCM y un archivo JSON, y tras un fallo la app los convierte en una nota.',
      'applied_inbox guarda el id de la bandeja en la misma transacción que la nota, así que un fallo no importa dos veces una nota de continuación.',
      'Cada edición local guarda updated = MAX(now, updated + 1), así que un teléfono con el reloj lento sigue ganando en Firestore.',
    ],
    security: [
      'Sin cuentas y sin reconocimiento de voz en la nube. El modelo de la palabra de activación corre en el teléfono, así que ningún sonido sale de él.',
      'Las reglas de Firestore piden un id de nota de 32 dígitos hex, niegan el listado y aceptan solo text, group y updated. Nadie puede buscar ids.',
      'Los tokens de las apps vinculadas quedan fuera del archivo de notas, en el almacén seguro.',
    ],
    performance: [
      'En una sala tranquila cada fotograma de 100 ms cuesta una suma. El modelo sherpa-onnx de 3,3 M de parámetros solo corre con fotogramas fuertes.',
      'Cada escritura sube notesVersion y las pantallas se recargan. La FlashList de notas solo dibuja las filas en pantalla.',
      'Una coincidencia de palabras elige el grupo al instante, y Gemini Nano o Apple Foundation Models solo corre con la app abierta.',
    ],
    operations: [
      'Checks y Release empiezan juntos con cada push a main. La release publica el APK cuando Checks pasan, y conserva las últimas 3.',
      'Un bundle de Play se compila con PLAY=1 una vez al día a las 19:00 de Sídney, si la app cambió. El APK de GitHub se actualiza solo.',
      'Firebase Hosting sirve el sitio, y se despliega con las reglas de Firestore cuando Checks pasan. La compilación de iPhone corre en macOS solo a mano.',
    ],
    tradeoffs: [
      'Expo con módulos de Kotlin y Swift en lugar de una app nativa de Android, para el iPhone y la web, a costa de código nativo junto a TypeScript.',
      'Un servicio en primer plano con sherpa-onnx en lugar de una palabra de activación en JavaScript, para oír con la pantalla apagada. El modelo solo sabe inglés.',
      'El reconocedor de voz del propio teléfono en lugar de un modelo en el APK. El teléfono ya tiene inglés y ruso, así que la app no incluye modelo.',
      'Un APK de GitHub que se actualiza solo y una compilación de Play con stubs en lugar de una sola, porque Play rechaza las apps que instalan actualizaciones.',
    ],
  },
  features: {
    'Hey Keep':
      'Un servicio en Kotlin salta el silencio y pasa un modelo sherpa-onnx por los tramos fuertes. Las respuestas salen de clips grabados por voz, y el ajuste fija un umbral por frase.',
    'Long recording':
      'El servicio escribe el sonido en un archivo provisional mientras graba. Tras un cierre forzado la app lo convierte en nota y saca el texto del sonido.',
    'Stop and continue':
      'El modelo de palabras clave y el reconocedor escuchan los dos «Stop». Tras «continue» el servicio suma las palabras nuevas y el sonido a la nota más reciente.',
    'Record by button':
      'expo-speech-recognition muestra las palabras en pantalla mientras la persona habla. La nota va a SQLite con su sonido donde el teléfono lo permite.',
    Recordings:
      'La app graba el sonido por su cuenta y se lo pasa al reconocedor. El archivo WAV se queda en el teléfono junto a la nota.',
    Groups:
      'Una búsqueda por raíces de palabras en inglés y ruso elige un grupo al momento. Gemini Nano o Apple Foundation Models pueden elegir uno mejor mientras la app está abierta.',
    Languages:
      'El reconocedor del teléfono entiende inglés y ruso, sin conexión con los paquetes de idioma. i18next tiene las pantallas en 9 catálogos.',
    'Share by link':
      'La nota va a Firestore, y el enlace la abre en la app o en un navegador. Un oyente mantiene vivas las 2 copias, y gana la edición más nueva.',
    'Send to other apps':
      'Cada app enlazada recibe la nota nueva por su propia API web. Obsidian recibe un archivo en una carpeta elegida, y los tokens de acceso van al almacén seguro.',
    Website:
      'Expo exporta cada ruta como página estática, y Firebase Hosting la sirve. Una nota compartida se carga desde Firestore en el navegador.',
    'In-app update':
      'La versión de GitHub lee la lista de versiones al abrir y al volver. Descarga el APK y abre el instalador de Android. La versión de Play deja fuera este código.',
    'Light and dark theme':
      'El módulo de tema sigue el esquema de color del teléfono o una elección fija. La elección se queda en el teléfono con los demás ajustes.',
    Ads: 'La biblioteca Google Mobile Ads muestra el banner de AdMob en la pantalla de inicio. En Europa pregunta antes el formulario de consentimiento de Google.',
    'Remove ads':
      'expo-iap vende el producto con Google Play Billing. Restaurar compra lo recupera en un teléfono nuevo con la misma cuenta.',
    'Loud sound from the phone speaker':
      'El módulo nativo manda cada sonido al altavoz del teléfono a todo volumen. Un refuerzo suma 6 dB, y el volumen vuelve tras el sonido.',
    'Notes about a person go to Memories':
      'La app compara la primera palabra de la nota con los nombres de Memories. La nota ordenada y con fecha va a ese diario por WebDAV.',
    'KeepPad Pro':
      'expo-iap vende Pro con Google Play, y un módulo Pro lo comprueba antes de cada acción bloqueada. Un reembolso apaga Pro en el siguiente inicio.',
    'Fast scroll':
      'El paquete fast-scroll del estudio envuelve la lista de notas. La lista sigue al control en cada fotograma. iOS y la web mantienen su propia barra.',
  },
};

export default arch;
