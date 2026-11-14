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
