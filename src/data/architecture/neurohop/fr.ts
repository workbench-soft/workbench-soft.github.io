import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Une seule appli Expo est le site, l’appli Android et l’appli iOS. Un Worker Cloudflare en Rust sert le site, les jeux depuis R2 et l’API d’administration sur un seul domaine.',
  parts: [
    {
      name: 'Expo et React Native',
      role: 'le catalogue, la page du jeu, les réglages et l’administration, en 9 langues.',
    },
    {
      name: 'Worker Rust',
      role: 'sert l’export web, /content/* depuis R2 et /api/* pour l’administration et les jeux premium.',
    },
    { name: 'Cloudflare R2', role: 'garde index.json, un fichier JSON par jeu et les images en WebP.' },
    {
      name: 'Compte Workbench',
      role: 'vérifie l’abonnement commun qui ouvre les jeux premium et masque la publicité.',
    },
    { name: 'AdMob et AdSense', role: 'les bannières dans l’appli et sur le site.' },
  ],
  flow: [
    'L’appli charge /content/index.json avec les listes et les cartes.',
    'La recherche et les filtres tournent sur l’appareil, sans requête.',
    'Une carte ouvre /content/games/<id>.json, un jeu premium /api/premium/<id> avec le jeton d’identité Google.',
    'Une écriture de l’administration reconstruit index.json et le purge du cache en périphérie.',
  ],
  links: [
    { to: 'Cloudflare', text: 'Workers, R2 et le cache en périphérie.' },
    { to: 'account.workbench-soft.com', text: 'Dit si le compte Google a l’abonnement Workbench.' },
    { to: 'Google Play', text: 'Vend le forfait Workbench dans l’appli Android.' },
    { to: 'GitHub', text: 'Garde les APK signés dans les releases de workbench-soft.github.io.' },
  ],
  design: {
    scale: [
      'Des parents et des spécialistes, surtout russophones, qui lisent quelques jeux à la fois.',
      'Un catalogue de centaines de jeux tient dans un seul fichier d’index que l’appareil filtre.',
    ],
    data: [
      'Chaque jeu est un fichier JSON avec l’âge, les blocs, les objectifs et ses sections. Les listes sont dans index.json.',
      'Un jeu premium est rangé sous premium/ dans R2, hors des chemins publics.',
    ],
    interfaces: [
      'GET /content/* sert les fichiers R2. /api/premium/<id> prend un jeton d’identité Google.',
      '/api/admin/* prend un jeton issu du mot de passe d’administration et écrit les jeux, les images et les listes.',
    ],
    reliability: [
      'L’appli garde une copie de l’index et de chaque jeu ouvert, et les affiche hors ligne.',
      'Une requête qui attend plus de 15 secondes compte comme un échec, et l’écran montre l’erreur au lieu d’une ligne de chargement.',
    ],
    security: [
      'Le mot de passe d’administration et le secret de session sont des secrets du Worker, gardés dans Bitwarden.',
      'Le Worker lit un jeu premium seulement après la confirmation du forfait par account.workbench-soft.com.',
    ],
    performance: [
      'index.json reste 60 secondes en cache dans le navigateur et 300 en périphérie. Les images restent un an.',
      'Les images sont en WebP avec un hash dans le nom, donc une nouvelle image ne demande aucune purge.',
    ],
    operations: [
      'Checks lance le lint et les tests sur les runners du PC à chaque push sur main.',
      'Release construit l’APK signé, l’ouvre sur un émulateur et le publie en neurohop-v<version>. Deploy met le Worker en ligne.',
    ],
    tradeoffs: [
      'Une appli Expo pour le site et les téléphones plutôt qu’une appli native, pour que chaque fonction sorte une fois.',
      'Des filtres sur l’appareil plutôt qu’une API de recherche, car tout le catalogue tient dans un petit fichier.',
    ],
  },
  features: {
    'Catalog with filters and search':
      'catalog/ filtre index.json sur l’appareil : les coches d’un groupe élargissent la liste, les groupes la resserrent. Une carte sans image prend la couleur de son premier bloc.',
    'Game page':
      'game/ charge le fichier du jeu par son id et dessine chaque section. Chaque jeu a sa route, donc un lien partagé l’ouvre.',
    'Premium games':
      'Le Worker interroge account.workbench-soft.com avec le jeton d’identité Google, puis lit premium/<id>.json dans R2.',
    'Free game of the week':
      'pro/free-game.ts choisit le jeu avec freePick de @workbench-soft/taste, selon la semaine de l’appareil. Le Worker garde la même règle en Rust et sert ce jeu sans jeton.',
    Ads: 'ads/ affiche les bannières AdMob dans l’appli et AdSense sur le site, et les masque quand le forfait est actif.',
    'Settings and the Workbench plan':
      'pro/ contient le paywall, l’achat Google Play et useEntitled(). Le site et iOS se connectent pour ouvrir un forfait acheté sur le téléphone.',
    Admin:
      'admin/ se connecte avec le mot de passe, puis modifie les jeux, envoie les images et importe un CSV par /api/admin/*. Chaque écriture reconstruit index.json.',
    'App icon and store listing':
      'L’icône vient d’un seul SVG dans design/icons/. store/listing.md contient le texte de Play et les réponses de la console.',
  },
};

export default arch;
