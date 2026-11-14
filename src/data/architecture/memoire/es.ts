import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Una app de Expo para Android, el iPhone y la web guarda cada tarjeta en SQLite en el dispositivo. La base de palabras viene dentro de la app, y Firestore sincroniza un mazo cuando la persona vincula dispositivos.',
  parts: [
    { name: 'Expo and React Native', role: 'una sola base de código para Android, el iPhone y la web.' },
    {
      name: 'SQLite',
      role: 'las tarjetas, las respuestas, las palabras conocidas y las imágenes, en cada dispositivo.',
    },
    { name: 'ts-fsrs', role: 'el calendario FSRS que decide cuándo vuelve cada tarjeta.' },
    {
      name: 'Base de palabras',
      role: 'palabras en inglés y ruso en JSON dentro de la app, hechas con listas abiertas y Wiktionary.',
    },
    { name: 'Firestore', role: 'una copia de cada mazo sincronizado, al que se llega con un código de vínculo.' },
    {
      name: 'Motores de conversación',
      role: 'Gemini con la clave de la persona, Qwen 3 en el teléfono o el modelo integrado de Chrome.',
    },
    {
      name: 'Módulo de altavoz',
      role: 'un módulo local en Kotlin que reproduce las palabras por el altavoz al máximo volumen.',
    },
    { name: 'Google Play', role: 'los anuncios de AdMob y las compras Quitar anuncios y Pro con expo-iap.' },
  ],
  flow: [
    'La persona escribe una palabra o empieza una tanda.',
    'La búsqueda mira la base de palabras, luego Wiktionary y MyMemory.',
    'La app guarda las tarjetas en SQLite en el dispositivo.',
    'FSRS elige las tarjetas pendientes, y palabras nuevas completan la tanda.',
    'La tarjeta muestra la palabra, su imagen y su sonido.',
  ],
  links: [
    { to: 'Firebase', text: 'Firestore guarda una copia de cada mazo vinculado, tras un acceso anónimo.' },
    {
      to: 'Wiktionary and MyMemory',
      text: 'Una palabra escrita que falta en la base recibe aquí sus traducciones, sin clave.',
    },
    { to: 'Wikipedia', text: 'La foto principal del artículo de la palabra, con su crédito de Commons.' },
    {
      to: 'Google Gemini',
      text: 'La práctica de conversación y los temas sugeridos lo llaman con la clave de la persona.',
    },
    { to: 'Google Play', text: 'AdMob muestra los anuncios, y Play Billing vende Quitar anuncios y Pro.' },
  ],
  features: {
    'Word batches':
      'Un módulo de tandas toma las tarjetas pendientes de SQLite y luego palabras nuevas de la base hasta la cuota del día. ts-fsrs decide cuándo vuelve cada tarjeta.',
    'Ways to ask':
      'Cada tarjeta toma una forma de preguntar de las destrezas elegidas en Metas. La escucha lee la palabra con la voz del propio teléfono.',
    'Add a word':
      'La búsqueda prueba la base integrada, luego Wiktionary y luego MyMemory. Las sugerencias salen de la base sin red.',
    Pictures:
      'La app pide a la API de Wikipedia del idioma que se aprende la foto del artículo, solo con licencia libre. expo-image la guarda en el dispositivo, fuera de la sincronización.',
    'Built in words':
      'Un script de build une CEFR-J, Octanove, Wiktionary y OpenRussian en 2 archivos JSON. La app los carga en el primer uso.',
    'Level test':
      'La prueba mezcla palabras de la base de cada nivel con palabras inventadas. Una nota por nivel, menos lo adivinado, decide de dónde salen las palabras nuevas.',
    Topics:
      'Cada palabra de la base lleva sus temas. Una palabra escrita los recibe de Wiktionary, de Gemini o del modelo de Chrome.',
    Reminders:
      'Un planificador en el teléfono programa una semana de avisos locales con expo-notifications. Vuelve a planear cada vez que la app se abre o se cierra.',
    'My words':
      'La lista lee las tarjetas de SQLite en el dispositivo. Borrar marca la tarjeta, para que la sincronización la lleve.',
    'Look and language':
      'i18next tiene los 9 catálogos, y el tema sigue al teléfono o a Ajustes. Las 2 elecciones se quedan en el dispositivo.',
    'Talk practice':
      'La escena va a Gemini con la clave de la persona, a Qwen 3 en el teléfono o al modelo de Chrome. Tocar una palabra de la respuesta guarda una tarjeta.',
    'Sync between devices':
      'Cada dispositivo entra en Firebase de forma anónima y envía las tarjetas cambiadas al mazo de su código. Gana el cambio más reciente de una palabra.',
    'Home screen widget':
      'react-native-android-widget lo dibuja desde SQLite en segundo plano. Se actualiza cada 30 minutos y cuando la app pasa a segundo plano.',
    'Ads and Remove ads':
      'AdMob muestra el banner y el anuncio a pantalla completa tras el formulario de consentimiento. Google Play Billing vende Quitar anuncios con expo-iap.',
    Sound:
      'Un módulo local en Kotlin graba cada palabra en un archivo y la reproduce por el altavoz al máximo volumen. iOS y la web usan la salida del sistema.',
    'Memoire Pro':
      'Google Play Billing vende Pro con expo-iap. Una sola comprobación lee la compra y abre cada elemento bloqueado.',
    Updates:
      'El APK de GitHub lee la lista pública de releases y abre el instalador de Android. Las versiones de Play y del iPhone no llevan este módulo.',
  },
};

export default arch;
