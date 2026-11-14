import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Une extension Chrome Manifest V3 sans serveur. La popup lance la sauvegarde, le service worker la mène, et une page offscreen cachée télécharge les fichiers et construit le zip.',
  parts: [
    {
      name: 'Popup',
      role: 'montre l’hôte, le bouton Télécharger et la barre, et se redessine depuis l’état enregistré.',
    },
    {
      name: 'Service worker',
      role: 'mène une sauvegarde par onglet, injecte le script de page et confie le zip aux téléchargements de Chrome.',
    },
    {
      name: 'Script de page',
      role: 'tourne dans chaque cadre et renvoie le HTML et chaque URL que la page a chargée.',
    },
    {
      name: 'Document offscreen',
      role: 'trouve, télécharge et zippe les fichiers, car seule une page sait créer une URL blob.',
    },
    { name: 'fflate', role: 'construit le zip et garde les images et les polices telles quelles.' },
    { name: 'chrome.storage.session', role: 'garde l’état de chaque sauvegarde, donc une popup rouverte le voit.' },
    { name: 'chrome.i18n', role: 'sert le texte de la popup et le nom de l’extension en 9 langues.' },
    { name: 'Vite', role: 'regroupe le service worker, la popup et la page offscreen.' },
  ],
  flow: [
    'La personne appuie sur Télécharger dans la popup.',
    'Le service worker injecte un script dans chaque cadre de l’onglet.',
    'Le script renvoie le HTML et les URL que la page a chargées.',
    'La page offscreen trouve d’autres fichiers par les source maps et les styles, puis les télécharge.',
    'Les compteurs arrivent à la popup par le stockage de session toutes les 100 ms.',
    'Les téléchargements de Chrome enregistrent le zip dans Téléchargements.',
  ],
  links: [],
  features: {
    'Download from the popup':
      'La popup confie l’onglet au service worker, qui mène la sauvegarde seul. L’état vit dans le stockage de session, donc le travail continue après la fermeture de la popup.',
    'Progress bar':
      'La page offscreen trouve d’abord les fichiers, donc le total reste fixe. Elle envoie les comptes de fichiers faits et ratés toutes les 100 ms, et la popup se redessine.',
    'One zip':
      'fflate range le HTML vivant et chaque fichier dans un dossier par hôte, avec les chemins du serveur. Les téléchargements de Chrome l’enregistrent avec l’hôte et l’heure dans le nom.',
    'Original sources':
      'La page offscreen lit la source map de chaque script et de chaque feuille de style. Chaque fichier d’origine de la map va dans son propre dossier du zip.',
    Languages:
      'chrome.i18n choisit le catalogue selon la langue de Chrome. 9 catalogues gardent le texte de la popup, le nom et la description.',
  },
};

export default arch;
