import type { Arch } from '../types';

const arch: Arch = {
  summary:
    "Une seule app Expo tourne sur Android et sur le web et garde chaque liste dans SQLite sur l'appareil. Une liste partagée part aussi dans Firestore, et l'app n'a pas de serveur à elle.",
  parts: [
    {
      name: 'Expo and React Native',
      role: "une seule base de code pour l'app Android et le site, que sert Firebase Hosting.",
    },
    {
      name: 'SQLite',
      role: "chaque liste et chaque article sur l'appareil via expo-sqlite, en wasm dans le navigateur.",
    },
    {
      name: 'Firestore',
      role: 'les listes partagées, les rayons et les parcours des magasins, derrière une connexion anonyme.',
    },
    {
      name: 'Parseur de phrases et dictionnaire d’emoji',
      role: 'des règles sur le téléphone qui coupent une phrase en articles et choisissent emoji et rayon.',
    },
    { name: 'OpenStreetMap', role: 'la recherche de magasin, et le magasin où se trouve le téléphone.' },
    { name: 'Wikipedia and Wikidata', role: 'la ville et ses sites, lus via le Worker de Tripforge quand il répond.' },
    { name: 'Coles and Woolworths', role: 'les prix unitaires, lus dans la recherche du site de chaque enseigne.' },
    { name: 'Google Play', role: 'les pubs AdMob et les achats Supprimer les pubs et Pro via expo-iap.' },
  ],
  flow: [
    'La personne tape ou dicte les articles, et le parseur les sépare.',
    'Le téléphone enregistre chaque article dans SQLite aussitôt.',
    'Partager envoie la liste dans Firestore et ouvre un lien.',
    "L'autre téléphone ouvre le lien et suit la liste dans Firestore.",
    "Une coche sur un téléphone apparaît sur l'autre en 1 ou 2 secondes.",
  ],
  links: [
    {
      to: 'tripforge',
      text: 'Un lien de voyage venu de Tripforge crée une liste de sites et une liste de bagages. La liste de sites renvoie vers Tripforge pour les vols.',
    },
    { to: 'guitar-upscale', text: "Un morceau de Morceaux à apprendre s'ouvre dans Guitar Upscale pour jouer avec." },
    { to: 'Firebase', text: 'Firestore synchronise les listes partagées, et Hosting sert le site.' },
    { to: 'OpenStreetMap', text: 'Nominatim trouve un magasin par son nom, et Overpass trouve le magasin proche.' },
    { to: 'Google Play', text: 'AdMob affiche les pubs, et Play Billing vend Supprimer les pubs et Pro.' },
  ],
  features: {
    'Share by link':
      "Firestore garde une copie de chaque liste partagée, et le lien porte son identifiant aléatoire. Chaque téléphone enregistre d'abord une modification dans SQLite et l'envoie au retour du réseau.",
    'Base list':
      "Une liste tirée d'une base copie chaque article de base et retient celui qu'elle suit. Un changement de la base atteint les copies que la personne n'a pas modifiées.",
    'Typing and dictating':
      "Un parseur à règles sur le téléphone coupe la phrase grâce au dictionnaire d'emoji et aux nombres. expo-speech-recognition transforme la voix en texte via le service vocal du téléphone.",
    Pictures:
      "Un dictionnaire dans l'app associe au nom un emoji et un rayon, en anglais et en russe. Une photo devient un petit JPEG qui voyage dans l'article.",
    'The store and the walk through it':
      "Overpass et Nominatim, d'OpenStreetMap, trouvent le magasin. L'app apprend l'ordre des rayons à partir des coches et le garde dans SQLite.",
    'Shared aisles':
      "Les rayons et les parcours sont dans Firestore sous l'identifiant OpenStreetMap du magasin. Chaque téléphone qui choisit ce magasin les lit, et un rayon tapé part aussitôt.",
    'Prices at Coles and Woolworths':
      "Le téléphone lit la recherche du site de chaque enseigne et garde le premier produit un jour dans SQLite. Le prix unitaire le plus bas s'affiche en vert.",
    'Packing for a trip':
      'Une liste de bagages est une copie d’une liste de bagages de base dans SQLite. Son partage passe par Firestore comme pour une autre liste.',
    'Things to see':
      'La ville vient de Wikipedia et ses lieux du Worker de Tripforge ou de Wikidata. Une étape k-means sur le téléphone les répartit sur les jours.',
    'Lists that are done':
      "Un minuteur sur le téléphone range une liste dans l'archive 3 heures après la dernière coche, ou après 2 semaines sans changement.",
    'Light and dark':
      "Le thème suit le téléphone via React Native, ou un choix dans les réglages qui reste sur l'appareil.",
    Updates:
      "La version GitHub demande aux releases GitHub s'il existe un APK plus récent et ouvre l'installeur Android. La version Google Play n'a pas ce module.",
    Ads: "AdMob affiche les bannières et la pub plein écran après le formulaire de consentement de Google. Google Play Billing vend l'achat Supprimer les pubs.",
    'Tick-a-Lot Pro':
      "Google Play Billing vend Pro via expo-iap, et l'app redemande à Play à chaque démarrage. Un seul module décide chaque verrou.",
    'The weekly shop for two':
      "Un téléphone crée la liste depuis une base et la partage via Firestore. L'autre coche, et chaque coche revient en quelques secondes.",
    'Songs to learn':
      'Un parseur de morceaux coupe le texte aux virgules seulement. Chaque morceau reçoit des liens de recherche vers Guitar Upscale et des sites d’accords, de tablatures et de vidéos.',
    'Changing and deleting':
      "Chaque champ s'écrit dans SQLite quand la personne le quitte. Une suppression marque seulement la ligne, donc Annuler et l'autre téléphone fonctionnent.",
    Languages:
      "i18next contient les 9 catalogues, et expo-localization lit la langue du téléphone. Le texte de la liste reste tel qu'il a été tapé.",
    'Finding Tick-a-Lot in search':
      "Après l'export Expo, un script de build écrit les guides, la page À propos et le sitemap en HTML simple. Les pages de l'app portent noindex, car elles montrent les listes d'une personne.",
    'Open source licences':
      "Une tâche de build rassemble le texte de licence de chaque paquet dans un fichier de l'app. L'écran des réglages les liste depuis ce fichier.",
  },
};

export default arch;
