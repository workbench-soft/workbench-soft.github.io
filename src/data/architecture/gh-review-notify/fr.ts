import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Un seul script bash tourne sur le Mac, lancé toutes les 3 minutes par un agent launchd. Il lit GitHub par la CLI gh et montre chaque nouvel événement dans le Centre de notifications.',
  parts: [
    { name: 'Agent launchd', role: 'lance le script toutes les 180 secondes et rattrape le retard au réveil du Mac.' },
    {
      name: 'Script bash',
      role: 'cherche les PR, lit les revues et les commentaires, les filtre et envoie les notifications.',
    },
    {
      name: 'GitHub CLI',
      role: 'fait chaque appel à GitHub avec la connexion que gh garde déjà. L’outil ne stocke aucun jeton.',
    },
    { name: 'jq', role: 'lit les réponses JSON de GitHub.' },
    {
      name: 'terminal-notifier',
      role: 'montre la notification et ouvre le commentaire au clic, avec osascript en secours.',
    },
    {
      name: 'Fichiers de cache',
      role: 'des fichiers simples dans le dossier de cache de l’utilisateur gardent les événements vus et la dernière mise à jour de chaque PR.',
    },
  ],
  flow: [
    'launchd lance le script, et un verrou bloque un second passage.',
    'gh cherche vos PR ouvertes mises à jour depuis 3 jours.',
    'Le script lit les revues et commentaires des seules PR modifiées.',
    'Les événements déjà dans la liste des vus sont écartés.',
    'terminal-notifier montre le reste, et un clic ouvre le commentaire.',
  ],
  links: [
    { to: 'GitHub', text: 'La source de chaque PR, revue et commentaire, lue par la CLI gh.' },
    { to: 'Homebrew', text: 'Installe jq et terminal-notifier à l’installation.' },
  ],
  design: {
    scale: [
      'Une personne sur un Mac. La recherche couvre les PR ouvertes mises à jour dans les 3 derniers jours.',
      'Une exécution après la première dure moins de 10 secondes, car seules les PR dont updatedAt a bougé sont rouvertes.',
      "L'outil est un seul fichier bash de moins de 400 lignes.",
    ],
    data: [
      "Des fichiers plats dans le dossier de cache de l'utilisateur : seen.txt, pr-updated.tsv, review-requests.tsv et un dossier de verrou.",
      "seen.txt garde les 3000 dernières clés d'événement. Une clé est l'URL de la revue ou du commentaire.",
      "Le dossier n'est lisible que par le compte, car il liste les URL de PR privées.",
    ],
    interfaces: [
      'gh search prs et gh api lisent GitHub, et jq lit les réponses JSON.',
      'terminal-notifier affiche chaque alerte et ouvre le commentaire au clic, avec osascript en secours.',
      "launchd lance l'agent toutes les 180 secondes. GH_REVIEW_NOTIFY_INTERVAL et GH_REVIEW_NOTIFY_BOTS changent l'intervalle et le filtre des bots.",
    ],
    reliability: [
      'Un dossier de verrou fait quitter aussitôt une deuxième exécution.',
      "Une recherche de PR en échec arrête l'exécution avant tout changement du cache, et une demande de revue en échec reste hors du cache : la suivante réinterroge.",
      "Un événement apparaît avec jusqu'à 3 minutes de retard, et seulement quand le Mac est éveillé. launchd rattrape au réveil.",
    ],
    security: [
      "Il utilise la connexion de gh auth : l'outil ne stocke aucun jeton.",
      'Les fichiers de cache ne sont lisibles que par le compte.',
      "Il interroge github.com depuis le Mac, donc ni webhook ni adresse publique n'atteignent la machine.",
    ],
    performance: [
      "Les revues et les commentaires ne sont lus que pour les PR dont updatedAt a bougé, ou pour chaque PR lors d'un amorçage.",
      "Les demandes de revue d'équipe sont écartées, et plus de 4 commentaires sur une PR se replient en 1 alerte.",
      "grep et awk comparent chaque clé d'événement à seen.txt, sans base de données.",
    ],
    operations: [
      "install.sh copie le script dans le dossier bin local, écrit le plist et charge l'agent. uninstall.sh fait l'inverse.",
      'tests/run.sh exécute le script sur des réponses GitHub préparées, avec des doublures pour gh, date et terminal-notifier.',
      "Les vérifications tournent sur un runner macOS de GitHub, et chaque push vert reçoit une version datée. L'installation prend le dernier main.",
    ],
    tradeoffs: [
      "Un relevé toutes les 3 minutes plutôt que l'e-mail, l'app Slack ou des webhooks : ni serveur ni adresse publique, au prix d'un délai jusqu'à 3 minutes.",
      "La CLI gh plutôt que curl avec un jeton, donc aucun jeton à stocker. L'outil s'arrête quand gh perd sa connexion.",
      'Un seul fichier bash plutôt que TypeScript ou Rust : il se copie sans build, et les tests ont besoin de doublures.',
      "Des fichiers plats plutôt que SQLite, pour que bash n'ait besoin que de grep et awk. Un nouveau format prend un nouveau nom de fichier.",
    ],
  },
  features: {
    'Review and comment notifications':
      'gh cherche les PR ouvertes que vous avez écrites, relues ou suivies, puis lit les revues et commentaires de chaque PR modifiée. Chaque nouvel événement devient une notification.',
    'Review requests':
      'Une requête à GitHub garde les demandes à votre nom et écarte celles faites à une équipe. Une requête ratée reste hors du cache, donc le passage suivant redemande.',
    'Comment bursts':
      'Avant de notifier, le script compte les nouveaux commentaires par PR. Au delà de 4, ils tiennent en 1 notification avec le nombre et les noms, et un clic ouvre la PR.',
    'Quiet first run':
      'Sans cache, le script écrit les événements des 3 derniers jours dans la liste des vus et n’en montre aucun. Un premier passage raté laisse le cache vide, et le suivant recommence.',
    'Bot filter':
      'Le script écarte les commentaires des comptes de bots avant de comparer les événements. Un réglage donné à l’installation va dans l’agent launchd et les rallume.',
    'Status and test':
      'Une option affiche l’état de l’agent, le compte, le dernier passage et les réglages. Une autre envoie une notification de test par le même chemin.',
    Releases:
      'Un workflow GitHub Actions tague chaque push sur main qui passe shellcheck, avec une version datée. Les notes listent les commits depuis la version précédente.',
  },
};

export default arch;
