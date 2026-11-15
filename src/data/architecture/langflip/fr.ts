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
  design: {
    scale: [
      "Une personne par PC ou Mac. Le texte tapé reste sur la machine, et toute l'installation tient dans un exe.",
      "Le modèle couvre 2 langues, l'anglais et le russe, chacune avec un dictionnaire des 100 000 mots les plus courants et une table de triplets de lettres.",
      "Il n'existe que 2 dispositions fixes, US QWERTY et russe ЙЦУКЕН. Le hook doit répondre dans son rappel, donc une décision prend des microsecondes.",
    ],
    data: [
      "Les réglages sont dans settings.toml, dans le dossier de données de l'appli. Le fichier du modèle est intégré au binaire.",
      'Le fichier du modèle commence par la marque LFM1, puis par langue un alphabet, les log-probabilités des triplets en f32 et un dictionnaire.',
      "Le journal Windows garde le nombre de touches, les noms d'applis et les décisions, sans lettres, dans des fichiers de 1 Mo qui passent à langflip.old.log.",
    ],
    interfaces: [
      "Le crate noyau reçoit les positions des touches et la disposition utilisée, et renvoie une correction ou rien. Les deux couches système l'appellent.",
      'Windows utilise les hooks WH_KEYBOARD_LL et WH_MOUSE_LL, SendInput pour la correction et WM_INPUTLANGCHANGEREQUEST pour la disposition.',
      'macOS utilise un CGEventTap de session, des envois CGEvent pour la correction et Text Input Sources pour la disposition.',
      "La vérification de mise à jour lit l'API des releases GitHub une fois par jour pour les tags langflip-v* et n'envoie que sa version.",
    ],
    reliability: [
      'Les événements de la correction portent une marque Langflip, donc le hook les laisse passer. Les touches tapées pendant une correction attendent et rejouent après un marqueur de fin.',
      "Les touches retenues attendent jusqu'à 500 ms que la fenêtre prenne la nouvelle disposition, et une correction bloquée les libère après 1 seconde.",
      "Annuler retape le mot tel qu'il avait été tapé, et un second Annuler l'ajoute à la liste à garder.",
      "Le démarrage automatique est une entrée de clé Run, doublée d'une tâche du Planificateur, au cas où l'Explorateur ignore la clé Run.",
    ],
    security: [
      'Pas de serveur ni de compte. Le seul appel réseau est la vérification de mise à jour, et elle ne porte aucun texte tapé.',
      "Les champs de mot de passe et les fenêtres d'administrateur sont ignorés, et le fichier de réglages liste d'autres applis à ignorer.",
      "Le journal ne contient aucune lettre. Les fenêtres élevées restent hors de portée sauf si Langflip tourne en administrateur, et macOS exige l'accès à l'Accessibilité et à la Surveillance de l'entrée.",
      "Le remplacement lors d'une mise à jour vérifie HTTPS et la taille du fichier, sans signature, et l'exe n'est pas signé.",
    ],
    performance: [
      'Le noyau note un mot par une simple recherche dans une table, en microsecondes, sans pause de ramasse-miettes dans le rappel du hook.',
      'Dès la 4e lettre, le moteur vérifie le mot pendant la frappe, donc la correction arrive avant la fin du mot.',
      'Le modèle est intégré et la liste triée des mots se charge en environ 20 ms. Un ensemble de tous les débuts de mots prenait 0,4 s à chaque démarrage et a perdu.',
      "caret.rs lit jusqu'à 40 caractères avant le curseur par UI Automation, dans son propre thread, 40 ms après un clic.",
    ],
    operations: [
      'mise run lint couvre rustfmt, clippy, cargo shear, ruff, shellcheck et actionlint, et la CI vérifie le build macOS depuis Windows.',
      'mise run eval mesure les fausses corrections et les oublis sur 10 000 mots du dictionnaire et 10 000 mots plus rares par langue.',
      'Un workflow de release publie langflip.exe sur GitHub Releases avec une version datée passée dans LANGFLIP_VERSION.',
      "L'appli cherche une release plus récente, demande d'abord, et self-replace remplace l'exe en cours. mise run install ne demande aucun droit d'administrateur.",
    ],
    tradeoffs: [
      "Un crate noyau en Rust et une couche mince par système plutôt qu'un crate mixte, pour que les tests du noyau tournent sur tout OS, au prix de chaque correction faite deux fois.",
      "Des hooks bas niveau dans le processus propre de Langflip plutôt qu'une DLL de hook, pour qu'aucun code ne se charge dans les autres applis, mais les fenêtres élevées restent hors de portée.",
      "Des triplets de lettres plus un dictionnaire plutôt qu'un dictionnaire seul, pour attraper les mots inconnus, mais un mot rare peut basculer trop tôt et Annuler le rétablit.",
      "Des tables statiques pour 2 dispositions plutôt que lire n'importe quelle disposition dans le système, pour que Windows et macOS donnent les mêmes lettres, mais les autres dispositions ne marchent pas.",
    ],
  },
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
    'Welcome on the first start':
      'Au premier lancement sous Windows, une boîte de dialogue de tâche montre les touches dans son propre thread, pour que les hooks gardent leurs messages. L’info-bulle donne la disposition aux lecteurs d’écran.',
  },
};

export default arch;
