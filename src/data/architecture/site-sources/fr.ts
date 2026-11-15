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
  design: {
    scale: [
      'Une personne enregistre une page ouverte à la fois, et deux onglets peuvent enregistrer en même temps.',
      "Les fichiers restent en mémoire jusqu'à l'écriture du zip, donc un site de plusieurs centaines de mégaoctets peut échouer.",
    ],
    data: [
      "Un enregistrement est un zip nommé d'après l'hôte et l'heure, avec index.html, un dossier par hôte, _sources et _frames.",
      "L'état de chaque enregistrement est dans chrome.storage.session : les compteurs, les fichiers en échec et l'étape.",
      "Rien n'est conservé une fois le zip dans Téléchargements. L'extension n'a ni historique ni réglages.",
    ],
    interfaces: [
      "Le popup, le service worker et la page offscreen dialoguent par des messages chrome.runtime et l'état du session storage.",
      'Un script de page injecté avec chrome.scripting renvoie le HTML et les URL des entrées performance, de src et de link href.',
      "Le zip sort sous forme d'URL blob que chrome.downloads enregistre dans Téléchargements.",
    ],
    reliability: [
      "Un fichier refusé par le serveur compte comme échoué et reste hors du zip, sans seconde tentative. Une requête s'arrête après 2 minutes.",
      'Le popup peut se fermer en pleine sauvegarde et se redessiner depuis le session storage à sa réouverture, la sauvegarde continue.',
      "Une seule promesse partagée crée la page offscreen, donc un second onglet réutilise l'unique page que Chrome autorise.",
    ],
    security: [
      "L'extension demande activeTab, scripting, downloads, storage, offscreen et toutes les URL, car elle récupère des fichiers de tout site que la page utilise.",
      "Elle n'envoie rien à un serveur à elle. Les seules requêtes vont aux sites que la page utilise déjà.",
      "Un fichier derrière une connexion que l'extension ne peut pas envoyer compte comme échoué. Les pages Chrome et le Chrome Web Store refusent les extensions.",
    ],
    performance: [
      "La découverte récupère côte à côte les scripts et feuilles de style de chaque tour et garde leurs octets, donc l'empaquetage ne les reprend pas.",
      'Les compteurs de progression fusionnent et partent au plus toutes les 100 ms, et un nouvel état part aussitôt.',
      'Images, polices, vidéo et autres formats compressés vont dans le zip tels quels, sans seconde compression.',
    ],
    operations: [
      "Vite assemble le service worker, le popup et la page offscreen. fflate zippe aussi l'extension pour chaque version.",
      "Chaque push sur main construit le zip à côté des contrôles. Un script de barrière le publie quand les contrôles passent et l'annule s'ils échouent.",
      'Les versions reçoivent une étiquette de date comme v2026.11.02.1, et le manifeste porte la même version. Chrome la charge décompressée.',
    ],
    tradeoffs: [
      "Une page offscreen plutôt qu'une URL de données depuis le worker, car seule une page peut créer une URL blob et une URL de données est un tiers plus grosse.",
      "zipSync plutôt que le zip asynchrone, car la politique de l'extension bloque les workers blob du zip asynchrone de fflate, au prix d'une pause sur les gros zips.",
      "Trouver les fichiers d'abord, puis les récupérer, pour que le total reste fixe pendant que la barre se remplit, au prix d'une attente avant le premier fichier sur les grosses pages.",
      "chrome.i18n plutôt qu'i18next, car le nom du manifeste ne peut venir que de _locales et un second catalogue n'apporte rien.",
    ],
  },
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
