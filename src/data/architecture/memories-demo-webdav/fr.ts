import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Un Cloudflare Worker en TypeScript parle les méthodes WebDAV que Memories envoie. Un seul Durable Object garde les fichiers dans son stockage SQLite, sur l’offre gratuite.',
  parts: [
    { name: 'Cloudflare Worker', role: 'vérifie la connexion Basic et transmet chaque requête WebDAV.' },
    {
      name: 'Durable Object',
      role: 'un seul stockage pour l’arbre entier, avec des fichiers en blocs de 1 Mo dans son SQLite.',
    },
    {
      name: 'Fichiers statiques',
      role: 'livrent les photos d’exemple avec le Worker et remplissent le stockage à chaque démarrage.',
    },
    {
      name: 'Script Python d’exemples',
      role: 'dessine les 42 photos de synthèse et les 2 vidéos avec dates EXIF et GPS.',
    },
    { name: 'Déclencheur cron', role: 'efface la couche des envois chaque nuit à 03:00 UTC.' },
  ],
  flow: [
    'L’app envoie une requête WebDAV avec une connexion Basic.',
    'Le Worker vérifie la connexion et passe la requête au Durable Object.',
    'Une lecture regarde d’abord la couche des envois, puis les exemples.',
    'L’app reçoit la liste du dossier ou les octets de la plage demandée.',
  ],
  links: [
    { to: 'memories', text: 'Le testeur de Google Play saisit ce serveur dans l’écran de connexion de Memories.' },
    { to: 'Google Play', text: 'Les notes App access donnent au testeur l’adresse et la connexion.' },
    {
      to: 'Cloudflare',
      text: 'L’offre Workers gratuite le fait tourner, et la CI le déploie une fois les contrôles passés.',
    },
  ],
  design: {
    scale: [
      'Une bibliothèque de démo partagée pour les relecteurs de Google Play : 42 photos, 2 vidéos et un seul identifiant.',
      'Un seul Durable Object reçoit toutes les requêtes, donc tous les relecteurs partagent une copie sur l’offre gratuite de Workers.',
    ],
    data: [
      'Les fichiers sont en blocs de 1 Mo dans le stockage SQLite du Durable Object, sous la limite de ligne de 2 Mo.',
      'Les échantillons sous base/ restent en lecture seule. Les envois et dossiers d’un client vont dans Uploads/, avec des marqueurs pour les suppressions et déplacements.',
      'Un fichier JSON garde la date EXIF de chaque échantillon, que PROPFIND donne comme date de modification.',
    ],
    interfaces: [
      'Du WebDAV seulement ce dont l’app a besoin : OPTIONS, PROPFIND en profondeur 0 ou 1, GET et HEAD par plage, PUT, MKCOL, MOVE et DELETE.',
      'LOCK répond 405 et PROPFIND en profondeur infinie répond 403.',
      'Le Worker transmet chaque requête au Durable Object, qui offre des appels head, get par plage, put, delete et list.',
    ],
    reliability: [
      'Un cron quotidien à 03:00 UTC supprime Uploads/, et la démo revient aux échantillons.',
      'À chaque démarrage, le Durable Object met base/ en accord avec la liste d’échantillons, donc un remplissage à moitié fini se répare.',
      'Un PUT cesse de lire au-delà de 50 Mo, et un GET par plage ne charge que ses blocs, pour rester sous 128 Mo de mémoire.',
    ],
    security: [
      'Un seul utilisateur Basic est vérifié contre un secret du Worker. OPTIONS répond sans identifiant.',
      'Les fichiers d’échantillon sont des ressources statiques derrière le Worker, donc l’identifiant les protège aussi.',
      'Les échantillons sont synthétiques, donc aucune vraie personne ni aucun vrai lieu n’est exposé.',
    ],
    performance: [
      'Un GET par plage ne lit que les blocs voulus, donc un fichier de 50 Mo ne prend pas 100 Mo de mémoire.',
      'Les dates des échantillons viennent d’un fichier JSON, donc PROPFIND n’a pas à lire l’EXIF.',
    ],
    operations: [
      'Checks lance le lint, la vérification des types et les tests unitaires à chaque push sur main, et Deploy démarre une fois qu’ils passent.',
      'Deploy construit les échantillons, lance le déploiement wrangler via mise et étiquette le commit d’une version datée.',
      'Il s’arrête quand le dossier d’échantillons et la liste de dates diffèrent, ou quand le jeton Cloudflare manque.',
      'Un seul déploiement tourne à la fois, et un plus récent en attente remplace un plus ancien.',
    ],
    tradeoffs: [
      'SQLite dans un Durable Object plutôt que R2, car R2 demande une carte de paiement et l’offre gratuite couvre le Durable Object.',
      'Une couche d’écriture sur des échantillons en lecture seule plutôt qu’écrire dedans, donc une remise à zéro est une suppression de préfixe.',
      'Des photos synthétiques plutôt que réelles, pour qu’un inconnu ne voie ni vraies personnes ni vrais lieux.',
      'Un Worker en TypeScript maintenant plutôt que Rust, pour livrer d’abord. La pile de l’org prévoit un passage à workers-rs.',
    ],
  },
  features: {
    'Sample library':
      'Un script Python dessine les photos avec des dates EXIF et quelques points GPS. Elles partent en fichiers statiques et remplissent le Durable Object au démarrage.',
    'Sign in': 'Le Worker compare un seul utilisateur Basic à un secret du Worker. OPTIONS répond sans connexion.',
    'Uploads and sorting':
      'Les envois et les déplacements vont dans une couche à part, au-dessus des exemples en lecture seule. Un cron de nuit efface cette couche et les exemples reviennent.',
  },
};

export default arch;
