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
  design: {
    scale: [
      "Une personne planifie quelques voyages par an, donc la charge est faible. L'offre gratuite de Cloudflare Workers permet 100 000 requêtes par jour.",
      'Tout le monde partage un jeton Travelpayouts à limite par minute, donc un téléphone gratuit fait 10 recherches par jour. Pro lève la limite.',
    ],
    data: [
      "Le Worker n'a pas de base de données. Chaque réponse externe reste dans le cache de Workers pendant sa durée de vie.",
      "Le téléphone garde le choix de langue, le compteur de recherches, les voyages enregistrés et les indicateurs d'achat dans localStorage, via expo-sqlite sur Android.",
      "Un voyage arrive dans Tick-a-Lot dans le lien, en JSON avec v, place, start, nights et jusqu'à 60 lieux. Aucun serveur ne le garde.",
    ],
    interfaces: [
      'Le Worker a 4 routes GET: /places, /flights, /sights et /spots. Chacune prend des paramètres de requête et répond en JSON.',
      'trip-core prend les tarifs bruts et rend des offres chiffrées pour le groupe, le calendrier des prix et les liens.',
      "Un voyage passe à Tick-a-Lot en hash base64url, et revient à l'écran Ask en chaîne de requête avec les lieux et les nuits.",
    ],
    reliability: [
      'Les durées de cache sont de 6 heures pour les tarifs, 7 jours pour les lieux et les sites, et 30 jours pour les pages Wikivoyage.',
      'Une erreur envoyée avec un 200, comme un maxlag de MediaWiki ou un success:false de Travelpayouts, et un corps JSON coupé repartent sans cache.',
      "/spots fait 6 appels au plus, et se rabat sur Wikivoyage en anglais quand l'édition locale a moins de 3 fiches.",
    ],
    security: [
      "Le Worker détient chaque secret et chaque appel externe. L'app n'importe aucun crate et ne tient aucune clé.",
      "Pas de comptes. Les indicateurs Pro et pubs sont sur le téléphone, achetés via Google Play, donc effacer les données de l'app remet le compteur de recherches à zéro.",
      "L'appel à Wikidata nomme l'app dans son User-Agent, comme Wikimedia le demande.",
    ],
    performance: [
      'Chaque appel externe passe derrière le cache de Workers. Les fiches Wikivoyage lues y restent 30 jours, car lire Londres coûte environ 20 ms de CPU contre 1 ms en cache.',
      "Une requête Wikidata donne les nombres de langues et les classes d'une page entière de fiches, au lieu d'un appel par lieu.",
      "Les longues listes passent par FlashList, donc seules les lignes à l'écran se dessinent.",
    ],
    operations: [
      'Un push sur main lance Checks: lint, tests et build. Release et Deploy démarrent sur workflow_run une fois Checks passés.',
      'Release fait la queue pour que chacun prenne sa version après le tag précédent, et un Deploy plus récent annule un plus ancien.',
      "Deploy livre l'export web et le Worker, puis échoue si l'un des hôtes ne répond pas. La version de Rust est épinglée, et le Worker se construit pour wasm.",
    ],
    tradeoffs: [
      "Le planificateur tourne dans le Worker plutôt qu'en wasm dans l'app, car Hermes n'exécute pas de wasm. Le prix est l'absence de planification hors ligne.",
      'Les tarifs en cache de Travelpayouts plutôt que Duffel ou le scraping: gratuit, et un appel dit quelle date est la moins chère. Le prix, ce sont des tarifs vieux de 2 à 7 jours.',
      "Wikidata et Wikivoyage plutôt qu'un fournisseur de sites d'intérêt: gratuit, et le nombre de langues de Wikipédia donne un signal de notoriété qui repère les endroits secrets.",
      "Pas de pub sur l'écran des vols plutôt que plus d'espace publicitaire, car des clics ratés près des liens de commission risquent un bannissement.",
    ],
  },
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
