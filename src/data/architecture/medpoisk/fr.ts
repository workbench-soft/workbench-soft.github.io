import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Une app Expo sans serveur. Des WebView cachées sur le téléphone chargent la page de recherche de chaque source, et l’app lit les prix dans le HTML renvoyé.',
  parts: [
    {
      name: 'Expo et React Native',
      role: 'l’app et ses écrans avec expo-router, en 9 langues avec i18next.',
    },
    {
      name: 'react-native-webview',
      role: 'charge chaque page de recherche hors de la vue et renvoie son HTML à l’app.',
    },
    {
      name: 'node-html-parser',
      role: 'lit les prix dans ce HTML, avec le même code d’analyse que les tests lancent sur des pages enregistrées.',
    },
    {
      name: 'metro.json',
      role: 'relie chaque station de métro, МЦК et МЦД de Moscou à son district.',
    },
    {
      name: 'expo-sqlite',
      role: 'garde la liste d’achats sur le téléphone.',
    },
    {
      name: 'GitHub Actions',
      role: 'vérifie chaque push, construit l’APK signé, l’ouvre sur un émulateur et publie la version.',
    },
  ],
  flow: [
    'L’acheteur tape un article et appuie sur Rechercher.',
    'Une WebView cachée par source ouvre sa page de recherche par la connexion du téléphone.',
    'Le HTML revient, et une fonction d’analyse par source en tire des offres.',
    'Le filtre par district et un tri par prix forment une seule liste à l’écran.',
  ],
  links: [
    {
      to: 'АптекаМос',
      text: 'Pages de produits et de pharmacies avec le prix, l’adresse et le métro de chaque pharmacie.',
    },
    {
      to: 'Мегаптека',
      text: 'Une API de recherche JSON, interrogée pour Moscou avec un tri par prix.',
    },
    {
      to: 'Wildberries',
      text: 'Fiches produit, lues après le contrôle par script du site.',
    },
    {
      to: 'Ozon',
      text: 'Résultats de recherche au mieux, car son contrôle anti robot est le plus strict.',
    },
    {
      to: 'GitHub',
      text: 'Garde les versions APK où l’app cherche ses mises à jour.',
    },
  ],
  design: {
    scale: [
      'Un acheteur avec un téléphone Android à Moscou, qui cherche quelques articles à la fois.',
      'Gratuit à faire tourner : pas de serveur, pas d’API payante ni de publicité, donc chaque recherche tourne sur le téléphone.',
    ],
    data: [
      'Les offres restent en mémoire pour la recherche en cours : produit, conditionnement, prix, vendeur, adresse et métro.',
      'La liste d’achats est dans SQLite. Le choix des districts et la langue sont dans le stockage local.',
    ],
    interfaces: [
      'Chaque module de source donne une URL de recherche et une fonction d’analyse. Le script injecté renvoie le HTML nettoyé par window.ReactNativeWebView.postMessage.',
      'Мегаптека répond à un simple fetch vers api.megapteka.ru avec city_id 6565 pour Moscou.',
    ],
    reliability: [
      'Chaque source échoue seule, au plus tard après 60 secondes, et sa ligne dit pourquoi. Les autres sources continuent.',
      'Un test par source lance son analyse sur une page enregistrée, donc un changement de balisage se voit dans la CI.',
    ],
    security: [
      'L’app n’a pas de compte et n’envoie pas de données à un serveur à elle.',
      'Les connexions aux distributeurs restent dans le stockage des cookies de la WebView sur le téléphone. La clé de signature est dans Bitwarden et les secrets du dépôt.',
    ],
    performance: [
      'Les sources chargent en parallèle, et АптекаМос ne lit que les 3 produits que la plupart des pharmacies ont en stock.',
      'Le script injecté retire scripts et styles avant de renvoyer le HTML.',
    ],
    operations: [
      'Checks lance le lint, les types, knip, les tests et un bundle Android à chaque push sur main.',
      'Release construit l’APK signé, l’ouvre sur un émulateur pour attraper un plantage, puis le publie en medpoisk-v<date>.<n>.',
    ],
    tradeoffs: [
      'La lecture des pages sur le téléphone plutôt qu’un serveur, car les sources russes bloquent les IP étrangères et de centres de données. Un site modifié casse sa source jusqu’à la correction de l’analyse.',
      'Un panneau pour le contrôle anti robot plutôt qu’un solveur dans le code, et l’acheteur le passe une fois à la main.',
      'Les portails des distributeurs avec le compte de l’acheteur plutôt que les prix de gros dans la liste, car ces prix demandent son compte.',
    ],
  },
  features: {
    'Price search':
      'run-search.ts lance chaque source en même temps. HiddenPages.tsx charge chaque page dans une WebView invisible, et chaque module de source tire du HTML des offres triées par prix.',
    'Moscow okrugs':
      'okrug-of.ts cherche la station de métro de la pharmacie dans metro.json. Une adresse sans station se classe par sa ville : Moscou reste inconnu, une autre ville est Подмосковье.',
    'Site checks':
      'Chaque source a un test qui distingue sa page de contrôle d’une page de résultats. CheckSheet.tsx montre le contrôle, les cookies restent dans le stockage commun des WebView, et la source repart cachée.',
    'Shopping list':
      'items.ts enregistre les mots tapés dans SQLite. check-all.ts lance la recherche de chaque article à tour de rôle et garde son offre la moins chère dans les districts choisis.',
    Distributors:
      'distributors.ts liste la page d’accueil de chaque société. browser.tsx l’ouvre dans une WebView qui garde ses cookies.',
    'Languages and updates':
      'i18n.ts change i18next tout de suite et garde le choix. newer-release.ts demande à GitHub un APK medpoisk plus récent au démarrage et au retour dans l’app.',
  },
};

export default arch;
