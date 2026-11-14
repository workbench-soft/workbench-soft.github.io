import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Un site Next.js statique sur Cloudflare affiche la carte des radars, et Capacitor emballe les mêmes fichiers en apps Android et iPhone. Du code natif en Kotlin et Swift gère les fonctions de conduite, et un petit Worker garde les trajets partagés.',
  parts: [
    {
      name: 'Build des données radars',
      role: 'un script TypeScript en CI qui fusionne chaque nuit les listes des États et de la Nouvelle-Zélande en un seul JSON.',
    },
    {
      name: 'OpenStreetMap',
      role: 'le point de chaque radar, les limites des routes et les limites horaires des zones scolaires.',
    },
    { name: 'Next.js', role: 'un export statique avec la carte, les pages du site et une page par radar.' },
    {
      name: 'Leaflet et MapLibre',
      role: 'Leaflet dessine les radars et les trajets, et MapLibre peint dessous les tuiles OpenFreeMap.',
    },
    { name: 'Cloudflare Worker et KV', role: 'sert le site et garde les trajets que les gens partagent.' },
    {
      name: 'Capacitor et Kotlin',
      role: 'la coque Android, avec des services natifs pour la vitesse, les alertes, les trajets, les itinéraires et Hey Spot.',
    },
    {
      name: 'Photon, Valhalla et TomTom',
      role: 'la recherche de lieux, les itinéraires avec virages et le trafic du jour.',
    },
    {
      name: 'Swift et StoreKit 2',
      role: 'le portage iPhone du code de conduite et d’itinéraire, et les achats sur l’App Store.',
    },
  ],
  flow: [
    'Chaque nuit, une tâche de CI récupère les listes des États et de la Nouvelle-Zélande.',
    'OpenStreetMap ajoute le point et la limite de la route de chaque radar.',
    'Next.js construit le site, et Cloudflare le sert avec le fichier des radars.',
    'Le navigateur choisit la limite de la minute en cours et dessine la carte.',
    'Sur le téléphone, un service natif lit le même fichier et annonce les radars.',
    'Les trajets restent sur le téléphone jusqu’à ce que la personne en partage un.',
  ],
  links: [
    {
      to: 'keeppad',
      text: 'Hey Spot utilise le même modèle de mot d’éveil que keepPad. Une seule app tient le micro pour les deux phrases.',
    },
    { to: 'lumiere-player', text: 'Hey Lumi partage le micro avec Hey Spot grâce à la même bibliothèque d’éveil.' },
    {
      to: 'Google Maps',
      text: 'Démarrer ouvre Google Maps avec les arrêts dans le meilleur ordre, et l’app continue d’alerter.',
    },
    {
      to: 'Google Play',
      text: 'Play Billing vend Supprimer les pubs et SpotTheCam Pro. AdMob affiche la bannière dans l’app.',
    },
    { to: 'GitHub Releases', text: 'Chaque version y dépose l’APK, et le build GitHub se met à jour depuis là.' },
  ],
  features: {
    'Camera map':
      'Le build de nuit change les limites horaires de chaque radar en fenêtres pour les 35 jours à venir. Le navigateur choisit la fenêtre de la minute en cours.',
    'Search and filter':
      'La page construit un index des banlieues à partir du fichier des radars et le cherche dans le navigateur. Aucun serveur n’intervient.',
    'Camera types':
      'Chaque radar porte son type tiré de la liste source. Le navigateur garde le choix, et l’app Android n’alerte que pour les types sur la carte.',
    'Follow me':
      'La page tourne la carte selon le cap GPS quand la personne bouge. MapLibre tourne les tuiles des rues avec son propre angle, et les noms restent droits.',
    'Camera details':
      'La fenêtre lit le fichier des radars livré avec le site. Chaque source de la liste des types porte le lien vers sa page officielle.',
    'Offline map':
      'Un service worker garde la page, le fichier des radars et jusqu’à 500 tuiles sur l’appareil. Un manifeste web permet au navigateur de l’installer comme une app.',
    'Light and dark theme':
      'Le thème s’applique avant que la page se dessine. Un style vectoriel donne des routes claires à la carte sombre dans le code.',
    Languages:
      'i18next tient 9 catalogues pour la carte et les écrans de l’app. Les notifications Android prennent leur texte dans les fichiers de chaînes Android.',
    'Site pages and ads':
      'Next.js écrit au build une page statique par État, banlieue et radar. AdSense remplit la bannière sur le site.',
    'Speed badge':
      'Du code Kotlin relie la position GPS aux routes OpenStreetMap et à leurs limites. Les rapports d’activité d’Android et le tracé des voies ferrées et des pistes distinguent la voiture du train ou de l’avion.',
    'Camera warnings':
      'Un service Kotlin cherche les radars devant sur le cap et parle environ 20 secondes avant. Le tracé des routes près du radar dit de quel côté il se trouve.',
    'Camera alerts stay ready':
      'Les rapports d’activité d’Android et une zone de 300 m autour du dernier stationnement lancent le service de conduite. Un écran transparent le relance après un redémarrage ou une mise à jour.',
    'Over the limit':
      'Les limites viennent d’OpenStreetMap via Overpass et restent 60 jours sur le téléphone. Un contrôle Kotlin parle après 5 secondes au-dessus de la limite.',
    'School zones':
      'Les limites horaires d’OpenStreetMap donnent les heures de la zone. Une liste des trimestres scolaires publiés de NSW dans l’app donne les jours d’école.',
    'Loud warnings':
      'Chaque son joue comme une alarme sur le haut-parleur intégré, et l’app monte le volume jusqu’à la fin des mots. Les interrupteurs des réglages rendent la sortie au téléphone.',
    "Author's voice":
      'Un modèle vocal ouvert sur un PC a créé les mots d’alerte à partir de la voix de l’auteur. Les clips sont dans l’app, et Pro les débloque.',
    'Trip log':
      'Des services Kotlin enregistrent chaque trajet et chaque marche avec la vitesse à chaque radar. Les trajets restent 400 jours dans le stockage privé de l’app.',
    'Trip line by limit':
      'Chaque point enregistré garde la vitesse et la limite OpenStreetMap de la route. La carte colore chaque morceau de la ligne à partir des deux.',
    'Trip stats':
      'L’app calcule les chiffres sur le téléphone à partir des points du trajet. Un passage sous 20 km/h pendant 3 minutes ou plus compte comme un bouchon.',
    'Share a trip':
      'L’app envoie un itinéraire allégé à un Cloudflare Worker, qui le garde dans KV sous son propre id. Arrêter le partage l’y supprime.',
    Distance:
      'Les chiffres lisent les totaux que le service de conduite garde sur le téléphone. Aucun serveur n’intervient.',
    'Turn by turn routes':
      'Valhalla chronomètre chaque paire d’arrêts, et l’app essaie chaque ordre. TomTom choisit des routes qui évitent le trafic, et une bibliothèque de navigation MapLibre suit la voiture.',
    'Route options':
      'Les cases passent la marche ou le refus des péages aux services d’itinéraire. Les favoris restent sur le téléphone, et Hey Spot les reconnaît par leur nom.',
    'Hey Spot':
      'sherpa-onnx entend les mots d’éveil sur le téléphone sans réseau. Le service vocal d’Android entend la suite, et Photon trouve les lieux.',
    'Hey Spot, what street am I on?':
      'L’app lit le nom et la limite de la route OpenStreetMap sous la voiture. La synthèse vocale du téléphone les prononce.',
    'Screen stays on':
      'La fenêtre Android de l’app demande au système de garder l’écran allumé. La demande cesse quand l’app passe en arrière-plan.',
    'Self-update':
      'Le build GitHub demande à GitHub Releases un APK plus récent et le passe à l’installeur Android. Le build Google Play laisse de côté le code de mise à jour.',
    'Same app on the iPhone':
      'Capacitor emballe le même site pour iOS. Des portages Swift du code Kotlin de conduite et d’itinéraire font le travail natif, et StoreKit 2 vend Pro.',
  },
};

export default arch;
