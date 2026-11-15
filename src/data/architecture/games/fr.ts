import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Astro construit des pages statiques, et une app Preact fait tourner la salle dans le navigateur. Un seul Worker Cloudflare sert les pages et donne à chaque salle son propre Durable Object.',
  parts: [
    { name: 'Astro', role: 'les pages d’accueil, de jeu et d’infos en HTML statique pour les moteurs de recherche.' },
    { name: 'Preact', role: 'l’app de la salle avec le salon, les jeux et le chat.' },
    { name: 'Cloudflare Worker', role: 'sert les pages et ouvre le WebSocket de chaque salle.' },
    {
      name: 'Durable Objects',
      role: 'un objet par code de salle garde l’état dans son stockage SQLite et gère les minuteurs.',
    },
    {
      name: 'Règles du jeu en TypeScript',
      role: 'des classes simples pour la salle et les 3 jeux, testées hors de Cloudflare.',
    },
    {
      name: 'Module de canevas partagé',
      role: 'garde un dessin comme une liste d’actions sur une grille de 800 sur 600.',
    },
    { name: 'Capacitor', role: 'emballe les mêmes pages dans les apps Android et iOS avec une bannière AdMob.' },
  ],
  flow: [
    'L’hôte crée une salle et envoie le lien.',
    'Chaque joueur ouvre un WebSocket vers le Durable Object de la salle.',
    'La salle applique les règles et envoie l’état à chaque joueur.',
    'Les dessins voyagent en petites actions à intervalles de 80 ms.',
    'Des alarmes closent les tours, et une salle vide s’efface après 30 minutes.',
  ],
  links: [
    { to: 'Cloudflare', text: 'Workers Free héberge les pages et les salles.' },
    { to: 'Google AdSense', text: 'AdSense affiche la bannière sur le site web.' },
    { to: 'Google AdMob', text: 'AdMob affiche la bannière dans les apps Android et iOS.' },
  ],
  design: {
    scale: [
      "Une salle accueille jusqu'à 12 joueurs, et le duel d'indices en demande au moins 4.",
      'Workers Free donne 100 000 requêtes par jour, soit environ 40 heures de dessin par jour.',
      'Un message est limité à 256 Ko, et un dessin à 3000 actions.',
    ],
    data: [
      'Chaque salle est un Durable Object avec son propre stockage SQLite et 3 sortes de clés : meta, canvas et chain:N.',
      "meta garde les joueurs, les scores, les réglages, la phase, le chat et l'état du jeu après chaque changement. canvas s'enregistre au plus toutes les 2 secondes.",
      "Un dessin est une liste d'actions sur une grille de 800 sur 600. Le navigateur garde un jeton et des réglages sous des clés qui commencent par wg-.",
    ],
    interfaces: [
      "Un WebSocket par joueur sur /games/ws/CODE. Le Worker relie le code à l'objet de la salle avec idFromName.",
      'Le premier message, hello, porte la version du protocole, le jeton, le nom et la couleur. Viennent ensuite state, chat et draw.',
      "Les apps Android et iOS ouvrent les mêmes sockets sur le Worker des jeux. Un contrôle d'Origin laisse entrer le site et les apps.",
    ],
    reliability: [
      "L'API Hibernation laisse une salle inactive quitter la mémoire, et un message de socket ou une alarme la réveille depuis le stockage.",
      "Les alarmes pilotent chaque échéance et nettoient une salle 30 minutes après qu'elle s'est vidée.",
      "Un numéro PROTOCOL permet au Worker de répondre à une ancienne app dans son format. Un joueur déconnecté garde sa place jusqu'à ce que la salle atteigne 24 places.",
    ],
    security: [
      'Pas de compte. Le navigateur garde un jeton aléatoire, et la salle en stocke le hachage comme identifiant du joueur.',
      "L'objet de la salle choisit le mot et vérifie chaque proposition : la réponse reste sur le serveur.",
      "Les sockets d'autres sites sont refusées. Les noms sont limités à 20 caractères, les lignes de chat à 100.",
    ],
    performance: [
      "Le dessin voyage en petites listes d'actions toutes les 80 ms, pas en pixels.",
      "Avec l'hibernation, 20 messages WebSocket comptent pour 1 requête.",
      "Les pages statiques ne coûtent rien, car run_worker_first n'envoie par le code du Worker que les liens de salle et les sockets.",
    ],
    operations: [
      "Un Worker se déploie avec wrangler : le dossier statique dist/ et l'objet de salle. Le workflow Games déploie à chaque push sur main.",
      'mise run check lance oxlint, la vérification des types et Vitest sur les règles de chaque jeu.',
      "L'observabilité du Worker est activée. L'app Android passe par le test fermé de Google Play.",
    ],
    tradeoffs: [
      'Durable Objects avec hibernation plutôt que Supabase Realtime, PartyKit ou un VPS : pas de serveur et une offre gratuite. Le code de salle est écrit pour Cloudflare.',
      "Des pages statiques Astro avec un îlot Preact plutôt qu'une application Preact monopage, pour que les moteurs de recherche reçoivent du HTML complet.",
      "Des actions de dessin sur une grille fixe plutôt que des pixels, pour que les messages restent petits et que l'annulation soit un pas.",
      "Capacitor plutôt qu'une Trusted Web Activity ou React Native, pour que les mêmes pages tournent dans les apps avec une bannière AdMob native.",
    ],
  },
  features: {
    'Rooms by link':
      'Le Worker relie chaque code de salle à son propre Durable Object. Un jeton aléatoire dans le navigateur représente le joueur, et la salle n’en garde que l’empreinte.',
    'Kids mode':
      'La synthèse vocale du navigateur lit chaque mot à voix haute. La liste pour enfants associe 80 mots à une image dans chacune des 9 langues.',
    'Guess the drawing':
      'L’objet de la salle choisit le mot et vérifie chaque proposition sur le serveur. Des alarmes finissent chaque tour, et les points suivent la vitesse de la réponse.',
    'Drawing telephone':
      'La salle passe chaque phrase et chaque dessin au joueur suivant selon un minuteur. Chaque histoire va dans le stockage de la salle pour l’album.',
    'Clue duel':
      'La salle distribue un plateau commun de 12 mots et 2 mots secrets par équipe. Le serveur compte à part les mots de l’équipe et les mots volés.',
    'Drawing tools':
      'Le peintre du canevas change chaque trait en actions sur une grille fixe. La salle les envoie aux autres joueurs à intervalles de 80 ms, et l’annulation retire la dernière action.',
    Languages:
      'L’app de la salle garde ses textes dans 9 fichiers, et les listes de mots existent en 9 langues. Astro construit les pages en anglais et en russe.',
    Ads: 'AdSense place la bannière sur les pages du site. Dans les apps le plugin AdMob pour Capacitor l’affiche après le formulaire de consentement là où la loi le demande.',
    'Android and iOS apps':
      'Capacitor emballe les pages construites dans des apps natives qui les chargent depuis des fichiers locaux. Les apps ouvrent leurs sockets sur le Worker des jeux.',
    'Party look':
      'Un CSS commun pose la lueur de nuit, les pastels clairs et une couleur par jeu. Le mouvement s’arrête avec le réglage de réduction des animations.',
  },
};

export default arch;
