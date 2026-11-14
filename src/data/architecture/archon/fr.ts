import type { Arch } from '../types';

const arch: Arch = {
  summary:
    "Un serveur Node sur le PC sert une page web à une fenêtre d'app Edge. Le serveur lit les dépôts et les runs, et ouvre une console avec un agent de code pour chaque tâche.",
  parts: [
    { name: 'Node 24', role: 'fait tourner le serveur en TypeScript, sans paquets ni étape de build.' },
    { name: 'Page web', role: "un module par onglet, affiché dans une fenêtre d'app Edge sur le PC." },
    { name: 'Agents de code', role: 'Claude Code, Codex ou Kimi Code, lancés dans une console par tâche.' },
    { name: 'adb', role: 'installe et ouvre les apps sur un téléphone ou une TV branchés.' },
    { name: 'Fichiers de données JSON', role: "les dépôts, les apps et les tâches d'agent qu'Archon liste." },
    { name: 'Tailscale', role: 'publie Archon dans le tailnet pour que le téléphone puisse l’ouvrir.' },
    { name: 'Scripts PowerShell', role: "restaurent un PC et déplacent l'espace de travail vers un nouveau dossier." },
    { name: 'Pages encadrées', role: "la page de statut CI, Reddit Desk et l'indexeur Memories dans des onglets." },
  ],
  flow: [
    'La personne coche des dépôts et choisit une tâche, ou dicte une commande.',
    'La page envoie le choix au serveur local.',
    "Le serveur écrit un fichier batch et ouvre une console avec l'agent.",
    "L'agent travaille dans le dépôt et écrit une marque de fin.",
    'Toutes les 5 secondes la page interroge les runs et montre la progression.',
  ],
  links: [
    { to: 'local-ci', text: "L'onglet CI encadre sa page de statut et la lance quand elle est éteinte." },
    { to: 'reddit-desk', text: "L'onglet Reddit encadre la fenêtre de l'app en HTTP local." },
    { to: 'memories', text: "L'onglet Memories montre la progression de son indexeur de photos." },
    { to: 'songfactory', text: "L'onglet Songs lance les tuiles de sa chaîne et montre chaque run." },
    {
      to: 'agent-skills-private',
      text: 'Ses règles et skills fixent comment chaque agent lancé par Archon livre un changement.',
    },
  ],
  features: {
    'Ask Archon':
      "Edge transforme la voix en texte. Claude Code sur Haiku choisit ensuite une action du lanceur, et le serveur l'exécute et ouvre son onglet.",
    'Runs strip':
      'Le serveur tient un registre des runs et lit la marque de fin de chacun. Le temps restant est la médiane des runs passés du même genre.',
    Apps: "Les cartes viennent d'une liste JSON et des derniers builds du dépôt de releases du studio. adb les installe et les ouvre sur le téléphone ou la TV.",
    'Ads on this phone':
      "Un script envoie par adb un lien de déverrouillage à chaque app du studio. Une clé valide marque le téléphone dans le stockage de l'app et règle l'interrupteur des pubs.",
    'To do':
      "Le serveur lit les points ouverts de chaque fichier TODO.md. Les points cochés vont à une console d'agent dans leur dépôt.",
    Sessions:
      "Le serveur lit les fichiers de session de l'app Claude et les sessions Codex et Kimi Code. Une reprise ouvre une console avec l'agent de la session.",
    Agents:
      "Les dépôts et leur rôle viennent d'une liste JSON, et les tâches d'une autre. Chaque dépôt coché reçoit une console avec l'agent sur la tâche.",
    Docs: 'Le serveur sert le Markdown de chaque dépôt. La page le dessine avec marked et les schémas avec mermaid.',
    Rules:
      'Le serveur lit les fichiers de règles partagés et le AGENTS.md de chaque dépôt. Il cherche dans chaque dépôt les fichiers et tâches que demandent les conventions.',
    Branches:
      'git liste les branches, worktrees et stashes de chaque dépôt avec leurs PR. Les suppressions passent par git, et les fusions vont à un agent.',
    Packages:
      "Le serveur parcourt les fichiers de paquets de chaque dépôt et demande à npm, crates.io ou PyPI la dernière version stable. Une mise à jour va à une console d'agent par dépôt.",
    'CI, Reddit and Memories':
      'Chaque onglet encadre une page servie par un autre programme local. Start lance le programme tant que sa page est éteinte.',
    Songs:
      'Le serveur lit les thèmes de songfactory et lance chaque tuile comme processus enfant. Il lit les étapes et le journal dans la sortie de ce processus.',
    Voices:
      "L'onglet liste les voix edge-tts et en joue une. Use for the agents relance l'installeur du hook turn-voice avec les choix.",
    Keys: 'Le script rotate-secrets liste chaque secret CI avec son âge. Un renouvellement ouvre une console où Claude Code lance le skill rotate-secrets.',
    'Archon on the phone':
      "Tailscale serve publie le serveur local dans le tailnet. Le téléphone ajoute la page à son écran d'accueil comme une app.",
    'Restore a PC':
      "Un script PowerShell remet en place chaque élément qu'une liste JSON nomme. Une tâche de contrôle échoue sur un élément présent sur le PC et absent de la liste.",
    'Move the workspace':
      "Un script PowerShell tourne depuis une copie temporaire et déplace le dossier. Il corrige ensuite chaque endroit qui nomme l'ancien chemin, des liens de worktree aux tâches planifiées.",
    'Sync the repos':
      'Un script Node clone chaque dépôt de la liste JSON qui manque au dossier. Il met à jour les autres avec git, 8 à la fois.',
  },
};

export default arch;
