import type { Arch } from '../types';
const arch: Arch = {
  summary: 'Expo comparte las pantallas entre Android, iOS y la web.',
  parts: [
    { name: 'Expo', role: 'Expo comparte las pantallas entre Android, iOS y la web.' },
    { name: 'AsyncStorage', role: 'AsyncStorage guarda las marcas en el dispositivo.' },
    { name: 'Cloudflare R2', role: 'Las imágenes y los 2 clips aprobados llegan desde Cloudflare R2 mediante el CDN.' },
    { name: 'expo-video', role: 'Solo el paso actual reproduce su clip con expo-video.' },
  ],
  flow: [
    'Los datos de las bebidas eligen los pasos para 1 o 2 tazas.',
    'Capuchino con chocolate y latte con corazón, tulipán u hoja para 1 o 2 tazas. Dibujos, temporizadores y marcas guardadas guían cada bebida. Al verter se indica el ángulo de la taza y la altura de la jarra. El círculo y el corazón tienen vídeos mudos en bucle; las otras 33 escenas tienen imágenes.',
    'AsyncStorage guarda las marcas en el dispositivo.',
  ],
  links: [
    { to: 'GitHub', text: 'GitHub aloja los APK firmados de Android.' },
    { to: 'Cloudflare R2', text: 'Las imágenes y los 2 clips aprobados llegan desde Cloudflare R2 mediante el CDN.' },
  ],
  design: {
    scale: [
      'Expo comparte las pantallas entre Android, iOS y la web.',
      'Los datos de las bebidas eligen los pasos para 1 o 2 tazas.',
    ],
    data: [
      'Los datos de las bebidas eligen los pasos para 1 o 2 tazas.',
      'AsyncStorage guarda las marcas en el dispositivo.',
    ],
    interfaces: [
      'Las imágenes y los 2 clips aprobados llegan desde Cloudflare R2 mediante el CDN.',
      'GitHub aloja los APK firmados de Android.',
    ],
    reliability: [
      'AsyncStorage guarda las marcas en el dispositivo.',
      'Las otras 33 escenas usan imágenes mientras sus vídeos esperan aprobación.',
    ],
    security: [
      'La guía no necesita cuenta y guarda el progreso en el dispositivo.',
      'GitHub aloja los APK firmados de Android.',
    ],
    performance: [
      'Las imágenes y los 2 clips aprobados llegan desde Cloudflare R2 mediante el CDN.',
      'Solo el paso actual reproduce su clip con expo-video.',
    ],
    operations: [
      'GitHub aloja los APK firmados de Android.',
      'Las comprobaciones y un inicio en el emulador preceden a la publicación del APK.',
    ],
    tradeoffs: [
      'Expo comparte las pantallas entre Android, iOS y la web.',
      'Las otras 33 escenas usan imágenes mientras sus vídeos esperan aprobación.',
    ],
  },
  features: {
    'Coffee guide':
      'Capuchino con chocolate y latte con corazón, tulipán u hoja para 1 o 2 tazas. Dibujos, temporizadores y marcas guardadas guían cada bebida. Al verter se indica el ángulo de la taza y la altura de la jarra. El círculo y el corazón tienen vídeos mudos en bucle; las otras 33 escenas tienen imágenes.',
    'Releases and updates':
      'Android busca un APK nuevo en GitHub al iniciar y al volver. El menú muestra la versión y permite comprobarla a mano; la descarga muestra el progreso. iOS y la web no incluyen actualizador de APK.',
  },
};
export default arch;
