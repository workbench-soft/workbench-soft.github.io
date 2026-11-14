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
  },
};

export default arch;
