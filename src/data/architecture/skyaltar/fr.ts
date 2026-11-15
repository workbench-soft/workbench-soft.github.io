import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Sky Altar est une seule app Expo pour Android et le web, sans serveur à elle. Astronomy Engine et les données d’étoiles de l’app donnent le ciel, et Skia le dessine.',
  parts: [
    {
      name: 'Expo et React Native',
      role: 'une seule base de code pour l’app Android et le site, avec les noms dans les polices du téléphone.',
    },
    { name: 'Skia', role: 'dessine le ciel entier en une image par trame sur le GPU.' },
    { name: 'Astronomy Engine', role: 'place le Soleil, la Lune et les planètes et calcule les thèmes de naissance.' },
    {
      name: 'Données d3-celestial',
      role: 'les 2851 étoiles jusqu’à la magnitude 5,5 et les figures de l’UAI avec leurs noms.',
    },
    {
      name: 'expo-camera',
      role: 'prend une photo silencieuse toutes les 1,5 seconde pour la reconnaissance des étoiles.',
    },
    {
      name: 'Media3 ExoPlayer',
      role: 'un module Kotlin qui joue la musique en boucle sur le haut-parleur à un volume fixe.',
    },
    { name: 'Cloudflare R2', role: 'sert les images et les morceaux des thèmes payants.' },
    {
      name: 'Google Play Billing et AdMob',
      role: 'vendent Retirer les pubs et Pro et affichent les pubs après consentement.',
    },
  ],
  flow: [
    'Le capteur de rotation ou un doigt tourne la vue du ciel.',
    'Chaque seconde, Astronomy Engine change chaque étoile en position sur l’horizon.',
    'Chaque trame projette les étoiles et les figures sur l’écran.',
    'Skia enregistre les dessins, les lignes et les étoiles en une image.',
    'React Native écrit les noms par-dessus, et les étoiles de la caméra brillent au-dessus.',
  ],
  links: [
    {
      to: 'songfactory',
      text: 'Les morceaux des thèmes viennent de Suno via Songfactory, avec une ligne de style par thème.',
    },
    { to: 'tickalot', text: 'La recherche de mise à jour est une copie de celle de Tick-a-Lot.' },
    { to: 'app-updater', text: 'WBS Updater installe le même APK depuis les versions communes.' },
    { to: 'Google Play', text: 'Google Play Billing vend Retirer les pubs et Pro.' },
    {
      to: 'Open-Meteo',
      text: 'La recherche de la ville de naissance envoie seulement le nom tapé et reçoit le lieu et son fuseau horaire.',
    },
  ],
  design: {
    scale: [
      'Une personne par installation, sans compte et sans serveur propre.',
      'Le ciel compte 2851 étoiles, 89 figures et 19 thèmes de cultures, dessinés en environ 3000 points par image.',
      "Seuls les 2 thèmes gratuits sont dans l'app, et chaque image payante pèse environ 30 Ko depuis un CDN.",
    ],
    data: [
      "Les étoiles, les figures et les noms sont du JSON dans l'app. Les récits tiennent dans un fichier .lore par langue.",
      'Les réglages et les données de naissance enregistrées sont dans localStorage, ou dans expo-sqlite sur le téléphone.',
      "Le téléphone garde les images et les pistes téléchargées dans le dossier de documents de l'app.",
    ],
    interfaces: [
      "Un manifest.json sur le CDN associe chaque image de thème à un fichier nommé d'après le hash de son contenu.",
      'expo-iap lit deux produits Google Play. La vérification des mises à jour lit la liste partagée des releases GitHub.',
      'Le géocodage Open-Meteo reçoit un nom de ville saisi et renvoie le lieu et son fuseau horaire.',
    ],
    reliability: [
      'Un thème téléchargé une fois marche hors ligne, et les thèmes gratuits marchent hors ligne dès le premier lancement.',
      "Une image dont le téléchargement échoue est retentée au bout d'une minute.",
      'Le gyroscope déplace la vue, et la boussole ne la corrige que pendant une rotation, pour que le ciel ne dérive pas.',
    ],
    security: [
      'Ni connexion ni serveur. Les données de naissance enregistrées restent sur le téléphone.',
      'Open-Meteo ne reçoit que le nom de ville saisi. Les photos de la caméra sont lues sur le téléphone.',
      "Le formulaire de consentement de Google s'affiche dans l'EEE, au Royaume-Uni et en Suisse avant toute pub. La clé de signature reste hors du dépôt.",
    ],
    performance: [
      "Un cache d'horizon en tableaux typés se remplit une fois par seconde, donc une image ne crée aucun objet par étoile.",
      'Skia enregistre une image par frame pour la vue, sans rendu React. Une vue immobile se redessine environ 8 fois par seconde.',
      'Le flou des images est fait une fois au chargement, et des noms de fichier à hash laissent le CDN et le téléphone les garder un an.',
    ],
    operations: [
      "Checks lance le lint, les tests et les bundles Android et web à chaque push sur main, et Release construit l'APK signé à côté.",
      "Publish met l'APK dans la liste partagée des releases, qui garde les 3 derniers builds de chaque app.",
      "mise run deploy envoie les nouvelles images, pistes et le manifeste, donc une image redessinée n'a pas besoin de release.",
    ],
    tradeoffs: [
      'Skia plutôt que react-native-svg, trop lent pour 3000 points par image. Le coût est un fichier CanvasKit de 7 Mo sur le web.',
      'Les noms dans React Native plutôt que des paragraphes Skia, pour que le chinois, le japonais et le coréen prennent les polices du téléphone.',
      'Les données d3-celestial plutôt que les cultures du ciel de Stellarium, qui mélangent les licences et dont certaines sont en GPL.',
      'Astronomy Engine plutôt que Swiss Ephemeris, sous AGPL ou payante, avec un build natif par plateforme.',
    ],
  },
  features: {
    'Sky view':
      'Le capteur de rotation bouge la vue, et le gyroscope la tient stable entre les corrections de la boussole. Skia dessine les étoiles, les astres et 88 figures depuis les données de l’app.',
    Clock:
      'Une couche React Native dessine l’heure et la date dans la police du thème. Un minuteur part chaque minute, et l’horloge s’atténue avec les boutons.',
    'Camera stars':
      'L’app prend une photo silencieuse toutes les 1,5 seconde et cherche les points lumineux en JavaScript. Les points qui collent au catalogue d’étoiles brillent en or sur le ciel.',
    'Culture themes':
      'Une fiche par culture fixe ses couleurs, son style de ligne et sa police. Chaque image s’accroche à 3 étoiles de sa figure, et les thèmes payants viennent une fois de Cloudflare R2.',
    'Ambient music':
      'Un module Kotlin sur Media3 ExoPlayer joue le morceau en boucle avec des fondus, intégré ou venu du CDN. Un sélecteur de fichiers copie vos fichiers ou un dossier dans l’app.',
    'Ads and Remove ads':
      'AdMob affiche des bannières dans la fiche des thèmes et les réglages, plus une pub plein écran au plus toutes les 30 minutes. Google Play Billing vend Retirer les pubs.',
    'Sky Altar Pro':
      'Google Play Billing vend le produit Pro, et une seule vérification décide chaque verrou. La version web n’a pas de boutique et ouvre les parties Pro.',
    'App languages':
      'i18next garde 9 catalogues pour les écrans. Les noms des figures et les fichiers de légendes existent aussi dans chaque langue.',
    'Updates from GitHub':
      'La recherche de mise à jour lit les versions GitHub communes, télécharge l’APK et le passe à l’installateur. La version Google Play remplace la recherche par des bouchons vides.',
    Astrology:
      'Astronomy Engine place les planètes du thème de naissance, en maisons par signes entiers. Open-Meteo trouve la ville de naissance, et les données enregistrées restent sur le téléphone.',
    'Constellation navigation':
      'Une liste virtualisée filtre le catalogue et place le point d’étiquette de chaque constellation sur le ciel du moment. Un appui y mène la vue en 450 ms.',
    'Constellation lore':
      'Chaque fiche lit le récit de la culture du thème dans un fichier de légendes par langue. Les données des étoiles viennent d’Hipparcos dans l’archive ESA Gaia.',
    'Long lists':
      'Le paquet fast-scroll du studio enveloppe les deux listes, et chacune ne dessine que les lignes visibles. Le curseur prend une couleur atténuée du panneau ou celle des libellés du thème.',
  },
};

export default arch;
