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
  design: {
    scale: [
      'Une personne sur un PC Windows, et des plafonds le gardent petit : 6 brouillons de commentaires, 3 brouillons de posts et 3 commentaires postés par heure.',
      'Un Find prend de 1 à 5 minutes, car Claude Code lit lui-même les threads.',
    ],
    data: [
      "De simples fichiers JSON dans le dossier de données de l'app gardent les réglages, la file, les cartes de posts et les deux historiques.",
      "history.json garde les threads postés et passés avec la date, et le Find suivant les saute. opens.json garde l'heure de chaque commentaire posté sur le dernier jour.",
    ],
    interfaces: [
      'Le cœur lance claude -p avec stream-json et transforme chaque ligne de sortie en événement find-log pour la fenêtre.',
      'Claude atteint Reddit par un serveur MCP épinglé sur un commit, passé avec --strict-mcp-config.',
      "La fenêtre appelle le cœur par Tauri invoke, ou par HTTP et server-sent events quand Archon l'encadre.",
      'Post it for me pilote Chrome par le protocole DevTools avec chromiumoxide.',
    ],
    reliability: [
      "Un Find peut être annulé, et le cœur lit found.json après l'exécution et garde 6 cartes.",
      'Post it for me ne compte un commentaire comme posté que lorsque la page montre un commentaire du compte avec le texte du brouillon.',
      "Une seule instance tourne. Un second lancement montre la fenêtre ouverte, et une exécution en arrière-plan s'arrête 2 minutes après la fermeture du cadre.",
    ],
    security: [
      "La connexion Reddit reste dans le profil Chrome de la personne ou dans le dossier Chrome propre à l'app. L'app ne garde aucun mot de passe.",
      "Le serveur local ne répond qu'à un Host de boucle locale, et un POST exige le type JSON, donc un autre site ne peut pas l'appeler.",
      "Une exécution de Claude peut utiliser des outils de lecture, le serveur Reddit et une écriture dans son propre fichier de sortie. Le programme de mise à jour vérifie une signature avant d'installer.",
    ],
    performance: [
      "Claude et Chrome tournent en processus enfants sans fenêtre de console, et la fenêtre reçoit les lignes au fil de l'eau au lieu d'attendre la fin.",
      'Le build release désactive la LTO et prend 16 codegen units, ce qui a ramené la compilation de 18 minutes à environ 2.',
      "Le runner garde le dossier target de cargo entre les builds, donc seul le crate de l'app se recompile.",
    ],
    operations: [
      'Checks et Release démarrent ensemble à chaque push sur main, et une release gate annule le build si Checks échouent.',
      "Publish étiquette le commit avec la date et envoie l'installeur NSIS. Un latest.json signé pilote la mise à jour.",
      'Le programme de mise à jour de Tauri vérifie au démarrage et toutes les 24 heures, puis installe la nouvelle version en silence.',
    ],
    tradeoffs: [
      "Claude Code avec un skill plutôt que l'API Reddit appelée depuis Rust, pour que les règles de threads vivent à un seul endroit. Un Find est plus lent.",
      "Tauri 2 plutôt qu'Electron, qui embarque tout Chromium à chaque installation. Le coût : 2 langages à vérifier.",
      "Le Chrome propre à l'app avec un port de débogage plutôt que celui de la personne, car Chrome 136 refuse un port de débogage sur le profil par défaut. Cela demande une connexion Reddit de plus.",
      "L'ancien formulaire de Reddit plutôt que le nouvel éditeur, qui cache ses champs dans des shadow roots.",
    ],
  },
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
