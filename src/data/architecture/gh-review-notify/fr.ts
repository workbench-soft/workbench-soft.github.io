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
