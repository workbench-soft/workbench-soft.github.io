import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Un poller sur GitHub Actions écrit les relevés de prix des États dans Cloudflare D1. Des Pages Functions lisent D1 pour l’app et les pages de recherche, et une seule app Expo dessine la carte sur Android, l’iPhone et le web.',
  parts: [
    {
      name: 'Poller sur GitHub Actions',
      role: 'récupère chaque flux selon un horaire et écrit les prix modifiés dans D1.',
    },
    {
      name: 'Flux de prix des États',
      role: 'NSW FuelCheck, Servo Saver en VIC, Fuel Prices QLD et FuelWatch WA donnent les prix.',
    },
    {
      name: 'Sources des bornes',
      role: 'Open Charge Map, Transport for NSW et OpenStreetMap, fusionnés pour que chaque borne apparaisse une fois.',
    },
    { name: 'Cloudflare D1', role: 'les prix actuels, et un déclencheur qui tient l’historique jour par jour.' },
    {
      name: 'Cloudflare Pages Functions',
      role: 'répondent à l’app par l’API et produisent les pages de recherche et les sitemaps.',
    },
    { name: 'Expo et React Native', role: 'un seul code pour Android, l’iPhone et le site.' },
    {
      name: 'MapLibre et OpenFreeMap',
      role: 'la carte dans le navigateur et sur les téléphones, avec des tuiles sans clé.',
    },
    {
      name: 'Module Hey Servo',
      role: 'un module Expo en Kotlin avec un modèle de mot d’éveil hors ligne et le service vocal d’Android.',
    },
  ],
  flow: [
    'Le poller lit les flux des États, chaque heure pour NSW, VIC et QLD.',
    'Seuls les prix modifiés entrent dans D1, et un déclencheur les ajoute à l’historique.',
    'L’app demande à une Pages Function les stations dans le cadre de la carte.',
    'Le cache en périphérie répond aux répétitions pendant 5 minutes, et D1 au reste.',
    'L’app colore chaque repère selon son prix et liste les stations.',
  ],
  links: [
    {
      to: 'spotthecam',
      text: 'Hey Servo reprend la conception de Hey Spot. Une seule app tient le micro pour chaque phrase d’éveil.',
    },
    {
      to: 'keeppad',
      text: 'keepPad et Lumiere partagent le même micro grâce à la bibliothèque wakeshare.',
    },
    {
      to: 'Google Maps',
      text: 'Un appui sur l’itinéraire ou une commande Hey Servo ouvre la navigation dans Google Maps.',
    },
    {
      to: 'Google Play',
      text: 'Supprimer les pubs et ServoHop Pro se vendent en achat unique. AdMob affiche la bannière.',
    },
    { to: 'GitHub Releases', text: 'Chaque version y dépose l’APK, et le build GitHub se met à jour depuis là.' },
  ],
  design: {
    scale: [
      'Une installation par téléphone, sans compte : la charge se résume à des lectures de prix publics par les conducteurs et les moteurs de recherche.',
      'Les offres gratuites ont fixé la forme : 100k requêtes Pages, 100k lignes D1 écrites et 10 ms de CPU par requête et par jour.',
      "Une réponse de carte contient jusqu'à 400 stations pour la zone affichée.",
    ],
    data: [
      "D1 contient station, price_now, price_daily, price_report, ev_site et ev_price. L'id d'une station porte la source, comme nsw-1234.",
      'price_now a une ligne par station et carburant. Un trigger verse chaque changement dans price_daily avec le plus bas, le plus haut et le nombre du jour.',
      'Le téléphone ne garde que le choix du carburant et les réglages. Les prix vivent dans D1.',
    ],
    interfaces: [
      "L'app appelle des routes JSON sous /api : les stations d'une zone, l'historique d'une station, les signalements et les bornes.",
      'Les mêmes Functions rendent du HTML simple sous /fuel et les sitemaps pour les moteurs de recherche.',
      'Le poller lit WA RSS, les API de NSW, VIC et QLD, Open Charge Map et OpenStreetMap, et écrit par wrangler d1 execute.',
    ],
    reliability: [
      'Une source sans clé est ignorée : la tâche reste verte et les autres États se mettent à jour.',
      "Chaque upsert finit par WHERE price_now.cents <> excluded.cents, donc une relance n'écrit aucune ligne deux fois.",
      "Les relevés s'arrêtent quand le runner maison est à l'arrêt. Un prix apparaît avec jusqu'à 5 minutes de retard, et ceux de VIC avec 24 heures.",
    ],
    security: [
      "Pas de connexion ni de compte. L'auteur d'un signalement est un hachage salé de l'adresse, pas l'adresse.",
      'Un signalement passe un contrôle de plage de prix et une limite de 10 par heure et par auteur.',
      "Les clés des sources sont dans les secrets GitHub Actions, lus seulement par le poller. L'app n'en a aucune.",
    ],
    performance: [
      "Les réponses de l'API portent s-maxage=300 et l'app arrondit la zone à 2 décimales, si bien que des déplacements proches partagent une réponse en cache.",
      "Les pages de recherche se mettent en cache 30 minutes, l'historique une heure, les sitemaps 6 heures.",
      "La liste NSW de plusieurs Mo est analysée sur le runner, car un Worker gratuit n'a que 10 ms de CPU.",
    ],
    operations: [
      "Les vérifications tournent à chaque push. Release construit l'APK et le bundle Play en même temps, et un échec des vérifications les annule.",
      'Deploy web applique db/schema.sql à la D1 en ligne, puis publie Pages. Chaque instruction du schéma est IF NOT EXISTS.',
      'Les relevés tournent par cron : toutes les heures pour NSW, VIC et QLD, toutes les 6 heures pour la Tasmanie, chaque jour pour WA et les bornes.',
    ],
    tradeoffs: [
      "Pages Functions et D1 plutôt que Firebase ou un serveur payant, pour qu'une zone de carte soit une requête SQL dans l'offre gratuite.",
      "Un cumul quotidien plutôt qu'une ligne par relevé, pour que les relevés horaires restent sous la limite d'écriture. Un jour sans changement n'a pas de ligne.",
      "Un poller sur GitHub Actions plutôt qu'un cron Worker, car l'analyse de la liste NSW dépasse 10 ms.",
      'MapLibre avec les tuiles OpenFreeMap plutôt que Google Maps, donc sans clé ni facture, au prix de deux builds de carte.',
    ],
  },
  features: {
    'Fuel prices on a map':
      'Une Pages Function renvoie depuis D1 jusqu’à 400 stations dans le cadre de la carte. L’app répartit les prix à l’écran en tiers et colore les repères.',
    'Your place on the map':
      'Sur les téléphones, expo-location donne la position et le cap de la boussole. Sur le web, les événements de position et d’orientation du navigateur font de même.',
    'Station list':
      'La liste montre les mêmes stations que la carte, tirées de la même réponse. La distance est une ligne droite depuis le téléphone.',
    'Price history chart':
      'Une Pages Function lit les lignes du jour dans D1, et un code de graphique partagé reporte le prix sur les jours sans changement. react-native-svg dessine la ligne et la bande.',
    'Driver price reports':
      'L’app envoie le relevé à une Pages Function, qui vérifie la plage et la limite par heure et par expéditeur. Le prix va dans D1.',
    'EV chargers':
      'Le poller fusionne chaque jour les bornes de 3 sources ouvertes. Les relevés des conducteurs gardent dans D1 le prix au kWh de chaque réseau.',
    'Search pages':
      'Des Pages Functions produisent du HTML simple pour chaque État, banlieue et station, avec le graphique en SVG. La périphérie garde chaque page 30 minutes.',
    'Site text and guides':
      'Une étape du build écrit le texte de l’accueil dans le HTML exporté. Des Pages Functions servent les guides depuis des textes du dépôt.',
    'Self-update from GitHub':
      'L’app demande à GitHub Releases un APK plus récent et le passe à l’installeur Android. Le build Google Play remplace le code de mise à jour par des modules vides.',
    'Remove ads':
      'expo-iap vend le produit par Google Play. L’achat suit le compte Google, et Restaurer le ramène sur un nouveau téléphone.',
    'ServoHop Pro':
      'expo-iap vérifie l’achat Pro à chaque lancement. Un seul contrôle dans l’app ouvre le graphique sur 365 jours et cache les pubs.',
    'Area search':
      'Une Pages Function trouve la banlieue ou le code postal dans la table des stations grâce à 2 index. Elle n’a besoin d’aucun géocodeur externe ni de clé.',
    'Hey Servo':
      'sherpa-onnx entend la phrase d’éveil sur le téléphone, et le service vocal d’Android entend la commande. La réponse vient de l’API de ServoHop.',
    'Fuel panel':
      'Le choix fixe le carburant de chaque appel à l’API, et l’app le garde pour le prochain lancement. Une borne compte selon sa prise la plus puissante.',
    Ads: 'react-native-google-mobile-ads affiche la bannière dans l’app après le formulaire de consentement. AdSense la remplit sur le site et les pages de recherche.',
    Languages: 'i18next tient les 9 catalogues, et expo-localization lit la langue du téléphone ou du navigateur.',
  },
};

export default arch;
