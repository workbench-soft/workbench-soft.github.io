import type { Arch } from '../types';
const arch: Arch = {
  summary: 'Expo partage les écrans entre Android, iOS et le Web.',
  parts: [
    { name: 'Expo', role: 'Expo partage les écrans entre Android, iOS et le Web.' },
    { name: 'AsyncStorage', role: 'AsyncStorage garde les coches sur l’appareil.' },
    { name: 'Cloudflare R2', role: 'Les images et les 2 clips approuvés viennent de Cloudflare R2 via le CDN.' },
    { name: 'expo-video', role: 'Seule l’étape courante lit son clip avec expo-video.' },
  ],
  flow: [
    'Les fiches des boissons choisissent les étapes pour 1 ou 2 tasses.',
    'Cappuccino au chocolat et latte avec cœur, tulipe ou feuille pour 1 ou 2 tasses. Dessins, minuteries et coches enregistrées guident chaque boisson. Les étapes de versement indiquent l’angle de la tasse et la hauteur du pichet. Le cercle et le cœur ont des vidéos muettes en boucle; les 33 autres scènes ont des images.',
    'AsyncStorage garde les coches sur l’appareil.',
  ],
  links: [
    { to: 'GitHub', text: 'GitHub héberge les APK Android signés.' },
    { to: 'Cloudflare R2', text: 'Les images et les 2 clips approuvés viennent de Cloudflare R2 via le CDN.' },
  ],
  design: {
    scale: [
      'Expo partage les écrans entre Android, iOS et le Web.',
      'Les fiches des boissons choisissent les étapes pour 1 ou 2 tasses.',
    ],
    data: [
      'Les fiches des boissons choisissent les étapes pour 1 ou 2 tasses.',
      'AsyncStorage garde les coches sur l’appareil.',
    ],
    interfaces: [
      'Les images et les 2 clips approuvés viennent de Cloudflare R2 via le CDN.',
      'GitHub héberge les APK Android signés.',
    ],
    reliability: [
      'AsyncStorage garde les coches sur l’appareil.',
      'Les 33 autres scènes gardent leurs images en attendant l’approbation des vidéos.',
    ],
    security: [
      'Le guide ne demande pas de compte et garde la progression sur l’appareil.',
      'GitHub héberge les APK Android signés.',
    ],
    performance: [
      'Les images et les 2 clips approuvés viennent de Cloudflare R2 via le CDN.',
      'Seule l’étape courante lit son clip avec expo-video.',
    ],
    operations: [
      'GitHub héberge les APK Android signés.',
      'Les vérifications et un lancement sur émulateur précèdent la publication de l’APK.',
    ],
    tradeoffs: [
      'Expo partage les écrans entre Android, iOS et le Web.',
      'Les 33 autres scènes gardent leurs images en attendant l’approbation des vidéos.',
    ],
  },
  features: {
    'Coffee guide':
      'Cappuccino au chocolat et latte avec cœur, tulipe ou feuille pour 1 ou 2 tasses. Dessins, minuteries et coches enregistrées guident chaque boisson. Les étapes de versement indiquent l’angle de la tasse et la hauteur du pichet. Le cercle et le cœur ont des vidéos muettes en boucle; les 33 autres scènes ont des images.',
    'Releases and updates':
      'Android cherche un nouvel APK GitHub au démarrage et au retour. Le menu affiche la version et permet une vérification manuelle; le téléchargement affiche sa progression. iOS et le Web ne contiennent pas de mise à jour APK.',
  },
};
export default arch;
