import type { Arch } from '../types';

const arch: Arch = {
  summary:
    "Une app Expo pour Android, l'iPhone et le web garde chaque carte dans SQLite sur l'appareil. La base de mots est livrée dans l'app, et Firestore synchronise un paquet dès que la personne relie ses appareils.",
  parts: [
    { name: 'Expo and React Native', role: "une seule base de code pour Android, l'iPhone et le web." },
    { name: 'SQLite', role: 'les cartes, les réponses, les mots connus et les images, sur chaque appareil.' },
    { name: 'ts-fsrs', role: 'le calendrier FSRS qui fixe le retour de chaque carte.' },
    {
      name: 'Base de mots',
      role: "des mots anglais et russes en JSON dans l'app, tirés de listes ouvertes et de Wiktionary.",
    },
    { name: 'Firestore', role: 'une copie de chaque paquet synchronisé, joint par un code de liaison.' },
    {
      name: 'Moteurs de conversation',
      role: 'Gemini avec la clé de la personne, Qwen 3 sur le téléphone, ou le modèle intégré de Chrome.',
    },
    {
      name: 'Module haut-parleur',
      role: 'un module Kotlin local qui joue les mots sur le haut-parleur à plein volume.',
    },
    { name: 'Google Play', role: 'les pubs AdMob et les achats Supprimer les pubs et Pro via expo-iap.' },
  ],
  flow: [
    'La personne tape un mot ou lance une série.',
    'La recherche consulte la base de mots, puis Wiktionary et MyMemory.',
    "L'app enregistre les cartes dans SQLite sur l'appareil.",
    'FSRS choisit les cartes dues, et des mots nouveaux complètent la série.',
    'La carte montre le mot, son image et son son.',
  ],
  links: [
    { to: 'Firebase', text: 'Firestore garde une copie de chaque paquet relié, derrière une connexion anonyme.' },
    { to: 'Wiktionary and MyMemory', text: 'Un mot tapé absent de la base y trouve ses traductions, sans clé.' },
    { to: 'Wikipedia', text: "La photo principale de l'article du mot, avec son crédit Commons." },
    { to: 'Google Gemini', text: "La conversation et les sujets devinés l'appellent avec la clé de la personne." },
    { to: 'Google Play', text: 'AdMob affiche les pubs, et Play Billing vend Supprimer les pubs et Pro.' },
  ],
  features: {
    'Word batches':
      "Un module de séries prend les cartes dues dans SQLite, puis des mots nouveaux de la base jusqu'au quota du jour. ts-fsrs fixe le retour de chaque carte.",
    'Ways to ask':
      'Chaque carte prend une façon de demander parmi les compétences choisies dans Objectifs. L’écoute lit le mot avec la voix du téléphone.',
    'Add a word':
      'La recherche essaie la base intégrée, puis Wiktionary, puis MyMemory. Les suggestions viennent de la base, sans réseau.',
    Pictures:
      "L'app demande à l'API Wikipedia de la langue apprise la photo de l'article, sous licence libre. expo-image la garde sur l'appareil, hors synchronisation.",
    'Built in words':
      "Un script de build réunit CEFR-J, Octanove, Wiktionary et OpenRussian dans 2 fichiers JSON. L'app les charge à la première utilisation.",
    'Level test':
      'Le test mêle des mots de la base de chaque niveau à des mots inventés. Un score par niveau, moins le hasard, fixe la source des mots nouveaux.',
    Topics:
      'Chaque mot de la base porte ses sujets. Un mot tapé les reçoit de Wiktionary, de Gemini ou du modèle de Chrome.',
    Reminders:
      "Un planificateur sur le téléphone pose une semaine de notifications locales via expo-notifications. Il replanifie à chaque ouverture et fermeture de l'app.",
    'My words':
      "La liste lit les cartes dans SQLite sur l'appareil. Une suppression marque la carte, pour que la synchro la transmette.",
    'Look and language':
      "i18next contient les 9 catalogues, et le thème suit le téléphone ou les réglages. Les 2 choix restent sur l'appareil.",
    'Talk practice':
      'La scène part vers Gemini avec la clé de la personne, vers Qwen 3 sur le téléphone ou vers le modèle de Chrome. Toucher un mot de la réponse crée une carte.',
    'Sync between devices':
      'Chaque appareil se connecte à Firebase en anonyme et envoie les cartes modifiées au paquet de son code. La modification la plus récente d’un mot gagne.',
    'Home screen widget':
      "react-native-android-widget le dessine depuis SQLite en arrière plan. Il se met à jour toutes les 30 minutes et quand l'app passe en arrière plan.",
    'Ads and Remove ads':
      'AdMob affiche la bannière et la pub plein écran après le formulaire de consentement. Google Play Billing vend Supprimer les pubs via expo-iap.',
    Sound:
      'Un module Kotlin local écrit chaque mot dans un fichier et le joue sur le haut-parleur à plein volume. iOS et le web passent par la sortie du système.',
    'Memoire Pro':
      "Google Play Billing vend Pro via expo-iap. Un seul contrôle lit l'achat et ouvre chaque élément verrouillé.",
    Updates:
      "L'APK de GitHub lit la liste publique des releases et ouvre l'installeur Android. Les versions Play et iPhone n'ont pas ce module.",
  },
};

export default arch;
