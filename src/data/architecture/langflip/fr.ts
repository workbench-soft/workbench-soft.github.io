import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Langflip est un seul programme Rust pour Windows et macOS, sans serveur. Un crate central juge chaque mot, et une fine couche par système capte les touches et tape la correction.',
  parts: [
    {
      name: 'langflip-core',
      role: 'le crate Rust avec les 2 dispositions, le modèle de langue et la décision de garder ou corriger.',
    },
    {
      name: 'Hooks Windows',
      role: 'des hooks bas niveau du clavier et de la souris voient chaque touche dans chaque app et envoient la correction en Unicode.',
    },
    { name: 'Event tap macOS', role: 'le même travail sur Mac, avec les sources de saisie pour la disposition.' },
    {
      name: 'Modèle de langue',
      role: 'des scores de triplets de lettres et un dictionnaire par langue, tirés de wordfreq et intégrés dans l’exe.',
    },
    {
      name: 'tray-icon',
      role: 'l’icône de la zone de notification avec la disposition en cours, et son menu sur les 2 systèmes.',
    },
    { name: 'rust-i18n', role: 'le texte du menu et de l’infobulle en 9 langues, intégré au programme.' },
    {
      name: 'ureq et self-replace',
      role: 'la recherche de mise à jour sur GitHub Releases, et le remplacement de l’exe en cours.',
    },
  ],
  flow: [
    'Un hook bas niveau capte chaque touche dans l’app au premier plan.',
    'Le hook associe la touche physique à une position, quelle que soit la disposition.',
    'Le noyau note les lettres dans les 2 dispositions avec le modèle.',
    'Quand l’autre disposition gagne, le hook avale la touche.',
    'Langflip efface le mot, le retape dans l’autre disposition et change de disposition.',
  ],
  links: [
    {
      to: 'GitHub Releases',
      text: 'L’exe Windows y est publié. Langflip y cherche une version plus récente une fois par jour et n’envoie que sa version.',
    },
  ],
  features: {
    'Fix the layout of a word':
      'Dès la 4e lettre, le noyau compare les lettres tapées aux mêmes touches dans l’autre disposition. Le modèle note les deux, et un net gagnant est retapé.',
    'Short words':
      'Sur 1 à 3 lettres un score est trop bruité, donc le noyau consulte seulement le dictionnaire. La correction attend Espace, Entrée ou Tab.',
    'Digits kept':
      'Un chiffre se tape pareil dans les 2 dispositions, donc le tampon du mot le garde à sa place. Le dictionnaire contient des mots avec chiffres comme mp3.',
    'Undo a fix':
      'Le noyau garde le dernier mot tel que tapé, et Annuler le retape. Une 2e annulation du même mot l’ajoute à la liste des exceptions.',
    'Convert by hand':
      'Le noyau tient le mot en cours ou le dernier mot. Le raccourci le passe dans l’autre disposition sans vérification.',
    'Skip apps and fields':
      'La couche système compare l’app au premier plan avec la liste du fichier de réglages. Les champs de mot de passe et les fenêtres admin sont repérés par des signaux du système.',
    'The current layout on the icon':
      'La couche Windows suit les changements de fenêtre et de focus et lit la disposition de la fenêtre au premier plan. tray-icon dessine EN ou RU sur l’icône.',
    'Pause with a click':
      'Un clic coupe la correction, et le hook laisse passer chaque touche. La zone de notification affiche l’icône en gris.',
    'Switch the layout with a double click':
      'Sous Windows Langflip ramène la fenêtre qui était devant et lui demande de changer de disposition. Sur Mac il change la source de saisie.',
    'Start at login':
      'Sous Windows une entrée de la clé Run lance Langflip, et une tâche du Planificateur de tâches sert de relais. Sur Mac un agent de lancement s’en charge.',
    'Settings file':
      'Un fichier TOML du dossier de données garde l’interrupteur, les apps exclues, les mots gardés et la langue du menu. Langflip le relit au prochain changement de fenêtre.',
    'Go on with a word':
      'Sous Windows UI Automation lit le mot avant le curseur après un clic ou un changement de champ. Le noyau juge les nouvelles lettres comme la suite de ce mot.',
    'The app icon':
      'Un seul SVG sert de source à l’icône. Le build l’écrit dans l’exe, et le script d’installation la pose sur les raccourcis.',
    'Install on Windows':
      'Le script compile l’exe avec Cargo et le copie dans le dossier des programmes de l’utilisateur. Il ajoute les raccourcis et l’entrée dans Paramètres sans droits admin.',
    'Tray menu':
      'tray-icon dessine le même menu sous Windows et macOS. rust-i18n donne son texte en 9 langues, selon la langue du système ou le choix fait.',
    'Decision log':
      'La couche Windows écrit chaque décision dans un journal avec le nombre de touches, l’app et la raison. Les lettres restent hors du journal, et le fichier tourne à 1 Mo.',
    'Update from GitHub':
      'Un thread interroge la liste des versions GitHub une fois par jour avec ureq. Après un clic il vérifie la taille et le SHA-256, puis self-replace remplace l’exe en cours.',
  },
};

export default arch;
