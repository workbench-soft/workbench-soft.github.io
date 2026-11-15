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
  design: {
    scale: [
      "Un apprenant par installation, toutes les cartes sont dans SQLite sur l'appareil. Aucun serveur propre du studio ne tourne.",
      "La base de mots est livrée dans l'appli sous assets/words/en.json et ru.json, construits à partir de CEFR-J, Octanove, Wiktionary et OpenRussian.",
      'Des services gratuits fixent les limites : MyMemory donne environ 5 000 mots par jour et par appareil, et la liste des releases GitHub permet 60 appels par heure et par adresse.',
      'Le modèle de conversation sur le téléphone prend environ 1,2 Go de stockage et 2 Go de mémoire libre.',
    ],
    data: [
      'Les cartes, les révisions, les mots connus et les images sont dans SQLite via expo-sqlite, sur le web aussi.',
      "Une carte garde son état FSRS en JSON dans memory, et due est copié dans sa propre colonne pour l'index. (lang, term_key) est unique.",
      'Une carte supprimée reste avec un drapeau, et updated_at fait gagner la modification la plus récente à la synchronisation.',
      'Les réglages sont dans localStorage. Les images restent sur chaque appareil, hors synchronisation.',
    ],
    interfaces: [
      'La synchronisation écrit chaque carte dans Firestore sous decks/{code}/cards/{lang}_{termKey}, et firestore.rules vérifie la longueur du code et chaque champ.',
      "Un mot saisi va à la base, puis à Wiktionary via kaikki.org, puis à l'API MyMemory. Wikipédia donne la photo principale.",
      "Gemini est appelé depuis l'appareil avec la propre clé de la personne, et Qwen 3 tourne sur le téléphone via react-native-executorch.",
      "Un module Kotlin dans modules/speaker/ rend la voix dans un fichier, et un gestionnaire en arrière-plan dessine le widget d'écran d'accueil Android.",
    ],
    reliability: [
      "Chaque appareil travaille seul sur son fichier SQLite, donc l'appli marche hors ligne, et la synchronisation est une couche facultative au-dessus.",
      "La modification la plus récente d'un mot l'emporte à la synchronisation, et une carte supprimée reste avec un drapeau pour que la suppression se synchronise aussi.",
      "Une recherche retombe de la base sur Wiktionary puis sur MyMemory. kaikki.org n'envoie pas d'en-têtes CORS, donc la version web l'ignore.",
      "Une fonction pure et testée planifie une semaine de notifications locales, si bien que qui délaisse l'appli en reçoit une par jour pendant 7 jours.",
    ],
    security: [
      "La connexion anonyme Firebase donne un utilisateur par appareil, et un code d'appairage de 80 bits aléatoires partage un paquet sans compte.",
      'Quiconque a le code peut lire et modifier ce paquet. Les révisions, les réglages et les mots connus restent sur chaque appareil.',
      "Gemini tourne avec la propre clé de la personne, et aucun message ne quitte l'appareil hormis l'appel au moteur choisi.",
      'Le keystore Android et son mot de passe sont des secrets de CI, avec une copie gardée hors du dépôt.',
    ],
    performance: [
      "La requête de lot lit les cartes à réviser par l'index cards_due, puis ajoute de nouveaux mots jusqu'au quota du jour.",
      'words/complete propose des mots de la base selon les premières lettres sans réseau, et la base se charge au premier usage.',
      "expo-image garde les images sur le disque, et un résultat d'image vide est redemandé après 30 jours.",
      'Le build de release réutilise son dossier android/ conservé quand @expo/fingerprint correspond, et ne reconstruit que le JS.',
    ],
    operations: [
      'Les vérifications lancent lint, format, types, knip et Vitest deux fois : comme Android et le web, puis avec Platform.OS réglé sur ios.',
      "Un push sur main construit l'APK sur un runner lourd, et release-gate.sh publie une fois les vérifications passées. Des vérifications en échec annulent le build.",
      "Avec PLAY_TRACK défini, une exécution nocturne à 19 h, heure de Sydney, envoie un bundle à Google Play, et seulement si l'appli a changé.",
      "L'APK GitHub cherche dans la liste des releases un tag memoire-v* plus récent. Les builds Play et iOS laissent ce code de côté.",
    ],
    tradeoffs: [
      "Expo avec React Native plutôt qu'une appli Kotlin native, pour qu'un seul code construise Android, iOS et le web, au prix de quelques parties réservées au téléphone.",
      "SQLite sur l'appareil plutôt que Firestore comme seul stockage, pour que l'appli marche hors ligne et s'ouvre aussitôt, et que la synchronisation reste facultative.",
      "Un code d'appairage plutôt qu'une connexion Google, pour appairer les appareils sans compte, au prix que quiconque a le code peut modifier le paquet.",
      "L'état FSRS dans une colonne JSON plutôt qu'une colonne par champ, pour qu'un changement de ts-fsrs n'exige pas de changer le schéma, mais le JSON ne se requête pas.",
    ],
  },
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
