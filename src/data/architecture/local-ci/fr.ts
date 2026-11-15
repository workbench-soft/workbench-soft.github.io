import type { Arch } from '../types';

const arch: Arch = {
  summary:
    "Des scripts en PowerShell et POSIX sh préparent un PC Windows ou un Mac et l'inscrivent comme runners GitHub Actions. Une page Next.js sur le PC montre les runners et les runs, et son serveur répartit et annule les jobs.",
  parts: [
    { name: 'Installeurs PowerShell et sh', role: 'installent les outils de dev avec winget ou Homebrew et mise.' },
    {
      name: 'Runner GitHub Actions',
      role: "prend les jobs CI de l'organisation, plusieurs par PC avec une voie pour les gros builds.",
    },
    {
      name: 'Planificateur de tâches Windows',
      role: 'lance les runners et la page au démarrage et la mise à jour toutes les 5 minutes.',
    },
    {
      name: 'Next.js',
      role: 'la page de statut locale, dont les server actions arrêtent les runs et installent les APK.',
    },
    {
      name: 'API REST de GitHub',
      role: 'donne à la page ses runs et ses releases, lus avec des ETag pour ménager la limite.',
    },
    { name: 'adb', role: 'installe un APK de release sur le téléphone branché en USB.' },
    { name: 'Blacksmith et Oracle Cloud', role: 'les runners cloud gratuits qui prennent les jobs avant le PC.' },
    {
      name: 'Graphiques SVG',
      role: 'dessinés sur le serveur à partir de 90 jours de runs gardés dans un fichier JSON.',
    },
  ],
  flow: [
    "Un push dans un dépôt de l'organisation met des jobs en file sur GitHub.",
    'Le serveur de la page oriente chaque dépôt vers un runner cloud ou ce PC.',
    'Un runner prend le job qui correspond à ses labels.',
    'Le serveur de la page lit les runs et arrête ceux qui sont remplacés.',
    "Toutes les 15 secondes la page montre les jobs, les releases et les raisons d'arrêt.",
  ],
  links: [
    { to: 'GitHub Actions', text: "Les machines s'inscrivent comme runners de l'organisation, et la page lit l'API." },
    { to: 'archon', text: "L'onglet CI d'Archon affiche la page de statut dans un cadre." },
    {
      to: 'ci',
      text: 'Les jobs qui appellent son étape d’installation sur ce PC copient les paquets du magasin partagé.',
    },
    {
      to: 'agent-skills-private',
      text: "Ses modèles repo-ci lisent les variables de runner et fixent les règles d'annulation.",
    },
    {
      to: 'Blacksmith',
      text: 'Des runners cloud pour les jobs légers et lourds tant que durent les minutes gratuites.',
    },
  ],
  features: {
    'Mac setup':
      'Un script POSIX sh installe les outils Homebrew, mise et le shell. Il règle ensuite git et clone les dépôts de l’organisation. Un second passage saute ce qui est déjà là.',
    'Windows setup':
      'Un script PowerShell installe les mêmes outils par winget et mise, avec Python et un cache de compilation Rust. Il saute les pièces propres au Mac et ce qui est déjà là.',
    'Self-hosted CI runner':
      'Les scripts téléchargent le runner GitHub, vérifient son SHA256 et inscrivent 4 runners sous Windows. Les 2 premiers prennent les jobs Gradle, Cargo et Tauri.',
    'Start button':
      'Un double clic place la copie sur la dernière release et relance les installeurs modifiés. Il démarre ensuite les tâches des runners et de la page puis ouvre la page.',
    'CI status page':
      "Un serveur Next.js lit les runners, les runs et les jobs dans l'API GitHub et les dossiers de runners du PC. Les barres de progression viennent des 10 derniers runs finis.",
    'Build cancellation':
      'La concurrency des workflows annule les anciens runs sur GitHub. Toutes les 10 secondes le serveur de la page arrête aussi un run remplacé et une release aux Checks ratés, et note la cause dans un fichier.',
    'Cloud runners first':
      'Le serveur de la page compte les minutes gratuites de Blacksmith et de GitHub. Il fixe une variable de runner dans chaque dépôt privé, et sans elle les jobs reviennent aux labels du PC.',
    Releases:
      "Des server actions lancent le workflow de release d'une app ou compilent son APK depuis main dans un clone temporaire. adb installe ensuite l'APK sur le téléphone branché.",
    'Updates by themselves':
      "Une tâche planifiée tourne toutes les 5 minutes et à l'ouverture de session. Elle place la copie sur le dernier tag de release et relance seulement les installeurs dont les fichiers ont bougé.",
    Sites:
      'Une fois par heure la page lit les workflows de chaque dépôt et trouve celui qui déploie un site. Le bouton le lance sur main.',
    'CI trends':
      'Toutes les 10 minutes le serveur de la page lit les runs finis et garde 90 jours dans un fichier JSON. Il dessine les graphiques en SVG sur le serveur.',
  },
};

export default arch;
