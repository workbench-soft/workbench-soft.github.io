import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Une app Expo pour Android et le web appelle un seul Worker en Rust sur Cloudflare. Le Worker fait chaque appel externe et garde les clés, et une crate Rust contient la logique du voyage.',
  parts: [
    {
      name: 'Expo and React Native',
      role: "une seule base de code pour l'app Android et le site, grâce à react-native-web.",
    },
    {
      name: 'Rust Worker',
      role: 'les routes des lieux, des vols, des sites et des coins secrets, chacune derrière le cache Workers.',
    },
    {
      name: 'trip-core',
      role: 'la crate Rust avec les fenêtres de dates, les prix pour le groupe, le calendrier des prix et les tags des lieux.',
    },
    { name: 'Travelpayouts', role: 'les prix des vols et les liens partenaires vers Aviasales.' },
    { name: 'Wikivoyage and Wikidata', role: 'les sites, les coins secrets et les classes qui les étiquettent.' },
    { name: 'Google Play', role: 'les pubs AdMob et les achats Supprimer les pubs et Pro.' },
  ],
  flow: [
    'La personne tape les lieux, une date approximative, les nuits et le groupe.',
    "L'app demande les lieux au Worker, puis les vols.",
    'Le Worker sert les réponses en cache et va chercher le reste chez Travelpayouts, Wikivoyage et Wikidata.',
    'trip-core calcule le prix du voyage pour le groupe et construit le calendrier.',
    "L'app montre les offres, le calendrier et les liens. Les voyages enregistrés restent sur le téléphone.",
  ],
  links: [
    {
      to: 'tickalot',
      text: 'Un lien porte le voyage dans les deux sens, sans compte commun. Tick-a-Lot lit ses sites auprès du même Worker.',
    },
  ],
  features: {
    Ask: 'Le formulaire cherche chaque lieu via le Worker. Un lien venu de Tick-a-Lot remplit le formulaire depuis son adresse.',
    Flights:
      'Le Worker interroge Travelpayouts pour chaque mois de la fenêtre et garde les prix 6 heures. trip-core les calcule pour le groupe et ajoute les liens.',
    Places:
      'Le Worker croise les sites Wikidata proches de la ville avec les fiches Wikivoyage. Les classes Wikidata étiquettent chaque lieu, et les puces filtrent sur ces tags.',
    'To Tickalot':
      "L'app place les lieux, le départ et les nuits dans le lien Tick-a-Lot lui-même. Aucun serveur ne garde le voyage.",
    Settings: 'i18next contient les 9 catalogues. Le choix reste sur le téléphone, dans SQLite via Expo.',
    Ads: 'AdMob affiche la bannière et la pub plein écran sur Android. Un seul contrôle décide chaque pub selon le consentement et les 2 achats.',
    'Tripforge Pro':
      "Google Play Billing vend le produit, et l'app garde l'indicateur sur le téléphone. Un seul module décide chaque verrou, et les limites tiennent dans un fichier.",
    'Website pages for search':
      'Au build, Expo écrit une page HTML par route et par langue. Un script règle ensuite la langue de la page, écrit la page 404 et construit le sitemap.',
  },
};

export default arch;
