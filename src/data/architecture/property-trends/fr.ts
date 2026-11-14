import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Un pipeline Rust transforme des données publiques ouvertes en fichiers statiques JSON et PMTiles. Ils partent avec le build web sur GitHub Pages, et une seule app Expo les lit sur le web, Android et l’iPhone.',
  parts: [
    {
      name: 'Pipeline Rust',
      role: 'télécharge les sources, relie chaque ligne à un code de banlieue ABS et calcule les médianes avec polars.',
    },
    {
      name: 'PMTiles',
      role: 'les contours des banlieues et des codes postaux dans un seul fichier de tuiles statique, découpé par le pipeline.',
    },
    { name: 'GitHub Pages', role: 'sert gratuitement le build web et les fichiers de données.' },
    {
      name: 'Expo et React Native',
      role: 'la carte, les filtres, la fiche et le graphique sur le web et les téléphones.',
    },
    {
      name: 'MapLibre et OpenFreeMap',
      role: 'dessine les contours des banlieues sur le fond de carte et colore chacune selon sa médiane.',
    },
    { name: 'TanStack Query', role: 'charge les fichiers de carte et de banlieue que les filtres demandent.' },
    { name: 'ts-rs', role: 'écrit les types TypeScript des fichiers de données à partir des structs Rust.' },
    { name: 'expo-iap et AdMob', role: 'la bannière, Supprimer les pubs et Pro sur les téléphones.' },
  ],
  flow: [
    'Chaque lundi, une tâche de CI télécharge les fichiers de ventes et de loyers des États.',
    'Le pipeline Rust relie chaque ligne à une banlieue et calcule les médianes.',
    'Les fichiers JSON et les tuiles partent avec le build web sur GitHub Pages.',
    'L’app charge un fichier de carte pour les filtres choisis.',
    'MapLibre colore chaque banlieue, et un appui ouvre sa fiche et son graphique.',
  ],
  links: [
    {
      to: 'realestate.com.au',
      text: 'Les fiches mènent à la même recherche là-bas. L’app ne lit aucune page du site.',
    },
    {
      to: 'Australian Bureau of Statistics',
      text: 'Les contours des banlieues et des codes postaux, et les chiffres du recensement 2021 sur chaque fiche.',
    },
    { to: 'Google Play', text: 'Supprimer les pubs et Property Trends Pro se vendent en achat unique sur Android.' },
    { to: 'App Store', text: 'Les mêmes achats sur l’iPhone, une fois le compte développeur ouvert.' },
  ],
  features: {
    'Price map':
      'Le pipeline Rust calcule une médiane par banlieue et par type pour chaque période. MapLibre colore chaque contour de banlieue ABS en 7 paliers coupés aux quantiles.',
    Filters:
      'Chaque mélange de filtres a son propre fichier JSON, construit à l’avance. Un changement de filtre charge un fichier, et l’URL garde le choix.',
    'Listings on realestate.com.au':
      'L’app construit un lien de recherche realestate.com.au à partir de la banlieue, du code postal et du type. Elle ne lit aucune page du site.',
    'Suburb card and history chart':
      'Un appui charge un fichier par banlieue avec la médiane et les ventes de chaque période. react-native-svg et d3 dessinent le graphique sur chaque plateforme.',
    Search:
      'La recherche lit un fichier index avec le nom, le code postal et le cadre de chaque banlieue. Un choix amène la carte sur ce cadre.',
    Languages:
      'i18next tient les 9 catalogues, et Intl met en forme les prix et les dates pour chaque langue. Le navigateur garde le choix.',
    Rents:
      'Le pipeline calcule un loyer hebdomadaire médian par code postal à partir des données de cautions des États et du VIC Rental Report. MapLibre colore un fichier de tuiles des codes postaux à part.',
    'Install from the browser':
      'Un manifeste d’app web donne le nom, les icônes et la couleur de la barre de titre. Il n’y a pas encore de service worker, donc elle a besoin du réseau.',
    'Ads and Remove ads':
      'react-native-google-mobile-ads affiche la bannière après le formulaire de consentement de Google. expo-iap vérifie l’achat Supprimer les pubs à chaque lancement, et le build web coupe les pubs.',
    'Property Trends Pro':
      'expo-iap vérifie l’achat Pro auprès de Google Play ou de l’App Store à chaque lancement. Un seul contrôle dans l’app ouvre les loyers et l’historique complet.',
    'iPhone app':
      'Le même code Expo se construit pour iOS et pose la question du suivi avant le lancement d’AdMob. Pour l’instant, un runner macOS ou EAS construit l’app du simulateur.',
  },
};

export default arch;
