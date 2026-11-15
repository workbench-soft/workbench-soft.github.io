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
  },
};

export default arch;
