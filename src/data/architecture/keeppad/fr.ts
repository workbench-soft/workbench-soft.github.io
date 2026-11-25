import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'KeepPad est une seule app Expo qui donne l’app Android, l’app iPhone et le site. Les notes restent dans SQLite sur le téléphone, et seules les notes partagées vont dans Firebase.',
  parts: [
    {
      name: 'Expo et React Native',
      role: 'un seul code pour Android, iPhone et le site, avec des écrans expo-router.',
    },
    {
      name: 'Service Kotlin',
      role: 'le service Android au premier plan entend Hey Keep, enregistre la note et joue les réponses.',
    },
    { name: 'sherpa-onnx', role: 'le petit modèle de mots-clés du téléphone repère les phrases de réveil.' },
    {
      name: 'Reconnaissance vocale du téléphone',
      role: 'le service vocal d’Android et le moteur d’Apple changent la parole en texte.',
    },
    {
      name: 'SQLite',
      role: 'les notes, la trace des notes envoyées et la liste des entrées traitées, sur le téléphone.',
    },
    {
      name: 'Gemini Nano et Apple Foundation Models',
      role: 'le modèle du téléphone choisit un meilleur groupe tant que l’app est ouverte.',
    },
    { name: 'Firebase', role: 'Firestore garde les notes partagées, et Hosting sert le site.' },
    { name: 'Google Play', role: 'les pubs AdMob, et les achats Supprimer les pubs et KeepPad Pro.' },
  ],
  flow: [
    'Le service entend « Hey Keep » même avec l’app fermée.',
    'Il enregistre la note et change la parole en texte sur le téléphone.',
    'Le service écrit la note dans un petit fichier d’entrée.',
    'L’app la range dans SQLite et choisit un groupe d’après les mots.',
    'Le modèle du téléphone peut déplacer la note, et la liste se recharge.',
  ],
  links: [
    {
      to: 'memories',
      text: 'Une note qui commence par le nom d’une personne va dans son journal sur le NAS de la maison, par WebDAV.',
    },
    {
      to: 'lumiere-player',
      text: 'Avec Wake Share le service KeepPad entend aussi « Hey Lumi » et le passe à Lumiere.',
    },
    { to: 'spotthecam', text: 'Le même micro partagé passe « Hey Spot » à SpotTheCam.' },
    { to: 'Firebase', text: 'Firestore garde les notes partagées en direct, et Hosting sert le site.' },
    { to: 'Google Play', text: 'AdMob affiche la bannière, et Play Billing vend Supprimer les pubs et KeepPad Pro.' },
  ],
  design: {
    scale: [
      'Une personne par installation. Les notes restent sur le téléphone, et seule une note partagée atteint Firestore, en texte de 20 000 caractères au plus.',
      'Hey Keep tourne toute la journée comme service de premier plan Android, donc la batterie a façonné la conception: un seuil de volume saute les trames silencieuses.',
    ],
    data: [
      'SQLite keeppad.db garde les notes, exports (quelle app a reçu quelle note) et applied_inbox. PRAGMA user_version compte les étapes de migration passées par un téléphone.',
      'Les enregistrements sont des fichiers WAV dans files/audio. Les notes que Hey Keep enregistre app fermée sont des fichiers JSON dans files/keep-inbox.',
      'Les réglages sont dans localStorage. Les jetons des apps liées sont dans le keystore Android ou le keychain iOS via expo-secure-store.',
      'Une note partagée dans Firestore ne garde que text, group et updated.',
    ],
    interfaces: [
      "Le service Kotlin et l'app s'échangent les notes par la boîte JSON et un événement watch, car le service n'atteint pas SQLite.",
      'Les apps liées reçoivent chaque nouvelle note par leur propre API web. Obsidian reçoit un fichier dans un dossier choisi, et un journal Memories la reçoit en WebDAV.',
      "expo-speech-recognition transforme la parole en texte par le service vocal d'Android ou le recognizer d'Apple.",
    ],
    reliability: [
      "Un long enregistrement écrit au fur et à mesure un fichier PCM et un fichier JSON, et après un plantage l'app en fait une note.",
      "applied_inbox enregistre l'id de la boîte dans la même transaction que la note, donc un plantage n'importe pas deux fois une note de suite.",
      "Chaque modification locale stocke updated = MAX(now, updated + 1), donc un téléphone à l'horloge lente gagne quand même dans Firestore.",
    ],
    security: [
      "Pas de comptes et pas de reconnaissance vocale dans le cloud. Le modèle du mot d'éveil tourne sur le téléphone, donc aucun son ne le quitte.",
      "Les règles Firestore exigent un id de note de 32 chiffres hex, refusent le listage et n'acceptent que text, group et updated. Personne ne peut chercher des ids.",
      'Les jetons des apps liées restent hors du fichier de notes, dans le stockage sécurisé.',
    ],
    performance: [
      'Dans une pièce calme, chaque trame de 100 ms coûte une somme. Le modèle sherpa-onnx de 3,3 M de paramètres ne tourne que sur les trames fortes.',
      "Chaque écriture fait monter notesVersion et les écrans se rechargent. La FlashList des notes ne dessine que les lignes à l'écran.",
      "Une correspondance de mots choisit le groupe tout de suite, et Gemini Nano ou Apple Foundation Models ne tourne qu'app ouverte.",
    ],
    operations: [
      "Checks et Release démarrent ensemble à chaque push sur main. La release publie l'APK une fois Checks passés, et garde les 3 dernières.",
      "Un bundle Play se construit avec PLAY=1 une fois par jour à 19 h 00 heure de Sydney, si l'app a changé. L'APK de GitHub se met à jour seul.",
      'Firebase Hosting sert le site, déployé avec les règles Firestore une fois Checks passés. Le build iPhone tourne sur macOS à la main seulement.',
    ],
    tradeoffs: [
      "Expo avec des modules Kotlin et Swift plutôt qu'une app Android native, pour l'iPhone et le web, au prix de code natif à côté de TypeScript.",
      "Un service de premier plan avec sherpa-onnx plutôt qu'un mot d'éveil en JavaScript, pour entendre écran éteint. Le modèle ne parle qu'anglais.",
      "Le recognizer du téléphone plutôt qu'un modèle dans l'APK. Le téléphone a déjà l'anglais et le russe, donc l'app n'embarque aucun modèle.",
      "Un APK GitHub qui se met à jour seul et un build Play avec des stubs plutôt qu'un seul build, car Play rejette les apps qui installent leurs mises à jour.",
    ],
  },
  features: {
    'Hey Keep':
      'Un service Kotlin au premier plan saute le silence et lance un modèle sherpa-onnx sur les trames fortes. Les réponses viennent de clips enregistrés par voix, et le réglage fixe un seuil par phrase.',
    'Long recording':
      'Le service écrit le son dans un fichier provisoire pendant l’enregistrement. Après un plantage l’app en fait une note et tire le texte du son.',
    'Stop and continue':
      'Le modèle de mots-clés et la reconnaissance vocale guettent tous deux « Stop ». Après « continue » le service ajoute les nouveaux mots et le son à la note la plus récente.',
    'Record by button':
      'expo-speech-recognition affiche les mots à l’écran pendant que la personne parle. La note va dans SQLite avec son son quand le téléphone le permet.',
    Recordings:
      'L’app enregistre le son elle-même et le donne à la reconnaissance vocale. Le fichier WAV reste sur le téléphone à côté de la note.',
    Groups:
      'Une recherche sur les racines de mots anglais et russes choisit un groupe tout de suite. Gemini Nano ou Apple Foundation Models peuvent en choisir un meilleur tant que l’app est ouverte.',
    Languages:
      'La reconnaissance du téléphone comprend l’anglais et le russe, hors ligne avec les packs de langue. i18next garde les écrans dans 9 catalogues.',
    'Share by link':
      'La note va dans Firestore, et le lien l’ouvre dans l’app ou un navigateur. Un écouteur garde les 2 copies en direct, et la modification la plus récente gagne.',
    'Send to other apps':
      'Chaque app liée reçoit la nouvelle note par sa propre API web. Obsidian reçoit un fichier dans un dossier choisi, et les jetons de connexion restent dans le stockage sécurisé.',
    Website:
      'Expo exporte chaque route en page statique, et Firebase Hosting la sert. Une note partagée se charge depuis Firestore dans le navigateur.',
    'In-app update':
      'La version GitHub lit la liste des versions au lancement et au retour. Elle télécharge l’APK et ouvre l’installateur Android. La version Play laisse ce code de côté.',
    'Light and dark theme':
      'Le module de thème suit le jeu de couleurs du téléphone ou un choix fixe. Le choix reste sur le téléphone avec les autres réglages.',
    Ads: 'La bibliothèque Google Mobile Ads affiche la bannière AdMob sur l’écran d’accueil. En Europe le formulaire de consentement de Google passe d’abord.',
    'Remove ads':
      'expo-iap vend le produit via Google Play Billing. Restaurer l’achat le retrouve sur un nouveau téléphone avec le même compte.',
    'Loud sound from the phone speaker':
      'Le module natif envoie chaque son au haut-parleur intégré à plein volume. Un amplificateur ajoute 6 dB, et le volume revient après le son.',
    'Notes about a person go to Memories':
      'L’app compare le premier mot de la note aux noms de Memories. La note remise au propre et datée va dans ce journal par WebDAV.',
    'KeepPad Pro':
      'expo-iap vend Pro via Google Play, et un module Pro le vérifie avant chaque action verrouillée. Un remboursement coupe Pro au lancement suivant.',
    'Fast scroll':
      'Le paquet fast-scroll du studio enveloppe la liste des notes. La liste suit le curseur à chaque image. iOS et le web gardent leur barre de défilement.',
    'Notes in the phone backup':
      'Android Auto Backup copie la base des notes et les réglages sur Google Drive. Les règles de sauvegarde de la config de l’app excluent les enregistrements et les jetons de connexion.',
    'Crash reports':
      'React Native Firebase Crashlytics attrape chaque exception non gérée, service Kotlin compris. Un rapport contient la trace, le modèle du téléphone et les versions, sans texte de note.',
  },
};

export default arch;
