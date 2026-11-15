import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Une app de bureau sur Tauri 2 pour Windows et macOS. Un backend Rust scanne, lit les dates, planifie et déplace les fichiers, et une webview React affiche les événements qu’il envoie.',
  parts: [
    { name: 'Tauri 2', role: 'l’enveloppe de bureau, avec la webview du système et un petit installeur.' },
    {
      name: 'Backend Rust',
      role: 'prend chaque décision sur les fichiers, du scan aux déplacements et à l’historique.',
    },
    {
      name: 'React et Vite',
      role: 'la table des fichiers, la barre d’outils et les réglages, tirés des événements du backend.',
    },
    { name: 'ExifTool', role: 'un outil fourni qui lit la date, l’appareil et le GPS de chaque fichier.' },
    { name: 'Crate folder-rules', role: 'les règles de dossiers par année, lieu et jour, partagées avec Memories.' },
    {
      name: 'GeoNames et OpenStreetMap',
      role: 'noms de lieux et contours de parcs dans l’installeur pour chercher sans réseau.',
    },
    {
      name: 'tauri-plugin-updater',
      role: 'cherche une nouvelle version dans la release GitHub et l’installe au redémarrage.',
    },
  ],
  flow: [
    'La personne choisit un dossier, et le parcours Rust envoie ses fichiers.',
    'Les processus ExifTool lisent la date et le GPS de chaque lot.',
    'Le géocodeur hors ligne nomme un lieu pour chaque point GPS.',
    'Les règles de dossiers prévoient un nouveau dossier et un nom par fichier.',
    'La personne confirme, et le backend déplace chaque fichier et note l’étape.',
  ],
  links: [
    {
      to: 'memories',
      text: 'L’app pour téléphone et ce trieur partagent la crate des règles de dossiers et l’éditeur photo.',
    },
    {
      to: 'GitHub Releases',
      text: 'L’installeur et le fichier de mise à jour sont sur une release du dépôt public du site.',
    },
  ],
  design: {
    scale: [
      'Une personne sur un PC. La taille visée est un dossier de 100 000 fichiers, donc Rust garde les enregistrements et la webview ne reçoit que des ids.',
      "Les données de lieux sont dans l'installeur, en extrait GeoNames et contours de parcs. La reconstruire télécharge environ 640 Mo.",
    ],
    data: [
      "Les réglages sont dans un seul fichier JSON du dossier de données de l'app. L'historique est un fichier JSONL par exécution, plus un index.json.",
      "Les enregistrements, les dates et les plans d'un scan restent dans la session de scan du backend, donc les commandes prennent des ids de fichiers et des plans.",
      "Les données de lieux sont geodata.tsv.gz (villes de 1 000 habitants et plus, et sites d'intérêt) et parks.tsv.gz. Les deux se chargent dans une grille de 1 degré.",
    ],
    interfaces: [
      'La webview envoie des commandes Tauri comme start_scan et start_moves. Le backend répond par des événements: scan:files, metadata:results, plan:files et move:file.',
      "ts-rs écrit les types TypeScript des charges utiles depuis les modèles Rust, donc les deux côtés d'une commande concordent.",
      "ExifTool reçoit une ligne par requête, avec sortie json, liste de tags et chemins absolus. Le programme de mise à jour lit latest.json d'une release.",
    ],
    reliability: [
      'Un déplacement utilise un renommage sans remplacement. Une copie entre volumes est vérifiée en taille et en octets avant que la source parte.',
      "Un plantage laisse le fichier à la source, à la destination ou sous les deux noms d'un lien physique, et aucun fichier n'est perdu.",
      "Une exécution écrit une ligne de journal à la fin de chaque étape, et un journal qui ne s'écrit pas arrête l'exécution. Un événement tardif d'un scan remplacé est écarté par scan_id.",
    ],
    security: [
      "La webview n'a que les permissions core:default, sans plugin fs ni shell. Rust fait chaque modification de fichier.",
      "Un déplacement ne part que d'un dossier choisi dans le sélecteur natif pendant cette session. Une destination doit être dans la racine choisie, revérifiée avant chaque déplacement.",
      "Aucun point GPS ne quitte le PC, car les lieux se résolvent hors ligne. Les chemins d'ExifTool sont vérifiés pour qu'un nom de fichier n'injecte pas de commande.",
    ],
    performance: [
      "Le parcours du scan tourne hors du fil de l'interface et envoie les fichiers par lots. Le tableau les met en tampon, donc un gros dossier coûte quelques redessins par seconde.",
      'Les workers ExifTool restent ouverts et tournent en basse priorité, ce qui évite un démarrage de processus par fichier.',
      'Une recherche de lieu ne parcourt que les cellules voisines de la grille, et les contours de parcs sont testés par boîtes de 64 arêtes.',
    ],
    operations: [
      "Le backend est dans son propre crate à côté du crate de l'app, donc une release compile un minuscule crate au lieu de 18 000 lignes.",
      'La CI tourne sur un PC Windows, donc les releases contiennent un installeur Windows et pas de build macOS. Un Mac le construit avec pnpm tauri build.',
      'Le programme de mise à jour lit latest.json au démarrage, au retour sur la fenêtre et sur demande. Il télécharge après Update et installe après Restart now.',
    ],
    tradeoffs: [
      "Tauri 2 plutôt qu'Electron: un installeur plus petit sur la webview du système et Rust qui garde la logique des fichiers, au prix de WebView2 et WebKit qui diffèrent.",
      'Planifier en Rust plutôt que dans la webview, la première version, qui ralentissait sur les gros dossiers.',
      'Seul disk/safe_fs modifie les fichiers, imposé par clippy.toml, plutôt que des appels std::fs dans chaque module qui pourraient écraser un fichier.',
      "GeoNames dans l'installeur plutôt qu'un géocodeur en ligne, donc aucun point GPS ne quitte le PC et aucune limite de requêtes ne s'applique.",
    ],
  },
  features: {
    Scan: 'Un parcours Rust tourne hors du fil de l’interface et envoie les fichiers par lots. La table les met en tampon, donc un gros dossier coûte peu de rendus par seconde.',
    'Capture dates':
      'Un groupe de processus ExifTool reste ouvert et lit chaque lot dès que le scan le trouve. Il tourne en basse priorité sur la moitié des cœurs.',
    'Places offline':
      'Un extrait GeoNames et des contours de parcs se chargent une fois dans une grille de 1 degré. Une recherche ne lit que les cases voisines et aucun point GPS ne quitte le PC.',
    'Plan first':
      'La crate partagée des règles de dossiers donne à chaque fichier son dossier et son nom, à blanc. La table montre chaque plan avant la confirmation.',
    Moves:
      'Un seul module Rust fait chaque changement de fichier, par un renommage sans écrasement ou une copie vérifiée. Pause s’arrête après le fichier en cours.',
    'History, undo and redo':
      'Chaque passe écrit un journal JSONL dans le dossier de données de l’app, une ligne par fichier. Annuler et Rétablir rejouent le journal avec les mêmes contrôles.',
    Settings:
      'Le backend enregistre la destination, les modes et le domicile dans un fichier JSON. Le choix de langue reste dans le stockage de la webview.',
    'File table':
      'React dessine une ligne par fichier à partir des événements du backend. Un double clic sur un lieu ouvre Leaflet sur des tuiles OpenStreetMap.',
    'Self-update':
      'tauri-plugin-updater lit le fichier de la dernière release au démarrage et au retour de la fenêtre. Le téléchargement suit Mettre à jour et l’installation suit Redémarrer.',
    'One command install':
      'Un script PowerShell lit la version la plus récente dans le fichier de release. Il télécharge l’installeur et le lance en mode silencieux pour l’utilisateur courant.',
  },
};

export default arch;
