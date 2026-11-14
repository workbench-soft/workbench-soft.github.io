import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Une app Tauri 2 pour Windows avec un cœur en Rust et une fenêtre React. Le cœur lance Claude Code pour trouver des fils et écrire des brouillons, et ouvre Chrome pour publier.',
  parts: [
    { name: 'Tauri 2', role: "l'enveloppe de bureau qui met la fenêtre et le cœur Rust dans un seul installeur." },
    {
      name: 'Cœur en Rust',
      role: 'lance Claude Code et Chrome, garde les fichiers JSON et tient les limites de rythme.',
    },
    { name: 'React et Vite', role: 'la fenêtre avec les onglets Comments et Posts et leurs cartes.' },
    { name: 'Claude Code', role: 'lit le dépôt, récupère les fils par un serveur MCP Reddit et écrit les brouillons.' },
    {
      name: 'chromiumoxide',
      role: "pilote la fenêtre Chrome propre à l'app quand la personne appuie sur Post it for me.",
    },
    { name: 'axum', role: 'sert la même fenêtre en HTTP local pour qu’Archon puisse l’encadrer.' },
    { name: 'i18next', role: 'les 9 catalogues de langue de la fenêtre.' },
    { name: 'Plugin de mise à jour Tauri', role: "trouve une nouvelle version signée et l'installe." },
  ],
  flow: [
    'La personne choisit un dépôt et appuie sur Find.',
    'Le cœur lance Claude Code dans ce dépôt avec le skill reddit-comments.',
    'Claude lit les fils chauds par le serveur Reddit et écrit les brouillons dans un fichier.',
    'Le cœur garde 6 brouillons et les montre en cartes.',
    'La personne ouvre une carte, et Chrome reçoit le fil avec le brouillon.',
  ],
  links: [
    { to: 'agent-skills', text: 'Son skill reddit-comments choisit les fils et donne le ton de chaque commentaire.' },
    { to: 'archon', text: "L'onglet Reddit d'Archon encadre la fenêtre et lance l'app quand elle est fermée." },
    { to: 'Reddit', text: 'Claude lit les fils par un serveur MCP, et la personne publie dans Chrome.' },
    {
      to: 'GitHub Releases',
      text: "L'installeur et le fichier de mise à jour signé sont dans une release du dépôt public du site.",
    },
  ],
  features: {
    'Repo picker':
      "Le cœur Rust liste chaque dossier git sous le dossier racine des réglages. Le choix est gardé dans un fichier JSON du dossier de données de l'app.",
    Subreddits:
      'Le cœur lance Claude Code sans serveur MCP et avec des outils de lecture seulement. Claude nomme les subs à partir du dépôt, et la liste est gardée par dépôt.',
    'Find threads':
      'Le cœur lance Claude Code dans le dépôt avec le skill reddit-comments et un serveur MCP Reddit. Claude écrit les fils et les brouillons dans un fichier, et le cœur en garde 6.',
    'Steps on top': "La fenêtre React allume l'étape qui attend, selon l'état de la recherche et des cartes.",
    Cards:
      "Les cartes viennent d'un fichier de file que le cœur écrit. Les modifications y sont gardées quand la zone de texte perd le focus.",
    'Open in Chrome':
      'Le cœur met le brouillon dans le presse-papiers et lance Chrome dans le profil choisi. Une limite tient le rythme à 3 commentaires publiés par heure.',
    'Post it for me':
      "Le cœur lance son propre Chrome avec un port de débogage et le pilote par chromiumoxide. Il remplit le formulaire de l'ancien Reddit, appuie sur Save et vérifie que le commentaire apparaît.",
    'Posts tab':
      'Claude Code lit les dépôts cochés et le skill marketing, puis écrit des brouillons de posts dans un fichier. Le cœur en garde 3 et retire les médias sans fichier.',
    'Screenshots and videos':
      "Claude choisit jusqu'à 4 fichiers dans le dossier de captures du dépôt d'après leurs légendes. Un clic sur un fichier l'ouvre dans l'Explorateur.",
    'Open a post':
      "Le cœur ouvre dans Chrome la page de soumission de l'ancien Reddit avec le titre et le texte dans l'adresse. Un post avec médias ouvre le premier fichier dans l'Explorateur.",
    'Ban risk':
      "Un module Rust note le prochain post d'après les fichiers d'historique des posts et des commentaires. Les règles viennent du skill marketing, comme une communauté par jour.",
    'Tester post':
      "Le cœur remplit un modèle avec le lien du Google Group et les lignes d'apps du panneau. Aucun passage de Claude n'est nécessaire.",
    'Inside Archon':
      "Le cœur sert la même fenêtre et les mêmes commandes en HTTP local avec axum. Archon l'encadre, et l'app se ferme 2 minutes après la fermeture de l'onglet.",
    'Info button':
      'Une boîte de dialogue liste ce dont Find a besoin et les règles de risque de bannissement. Elle montre aussi la version et une vérification des mises à jour.',
    Updates:
      "Le plugin de mise à jour Tauri lit un fichier signé dans une release GitHub au démarrage et toutes les 24 heures. Il vérifie la signature avant de lancer l'installeur.",
    Language:
      'i18next tient les 9 catalogues dans la fenêtre. Le choix est gardé dans le fichier de réglages, donc la fenêtre Tauri et le cadre Archon le partagent.',
    'Done list':
      "Les fils publiés et ignorés passent dans un fichier d'historique avec la date. La recherche suivante les donne à Claude pour qu'il les saute.",
  },
};

export default arch;
