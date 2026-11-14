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
  features: {
    'Sample library':
      'Un script Python dessine les photos avec des dates EXIF et quelques points GPS. Elles partent en fichiers statiques et remplissent le Durable Object au démarrage.',
    'Sign in': 'Le Worker compare un seul utilisateur Basic à un secret du Worker. OPTIONS répond sans connexion.',
    'Uploads and sorting':
      'Les envois et les déplacements vont dans une couche à part, au-dessus des exemples en lecture seule. Un cron de nuit efface cette couche et les exemples reviennent.',
  },
};

export default arch;
