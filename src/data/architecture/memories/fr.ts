import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Une app Expo pour Android, l’iPhone et le navigateur lit les photos d’un NAS maison en WebDAV et tient son propre index SQLite. Des conteneurs en option sur le NAS indexent les photos, groupent les visages et servent les liens d’album.',
  parts: [
    { name: 'Expo et React Native', role: 'un seul code pour l’app Android, l’app iPhone et la version navigateur.' },
    { name: 'expo-sqlite', role: 'l’index sur le téléphone, avec la date, le lieu et l’appareil de chaque fichier.' },
    { name: 'WebDAV', role: 'le seul lien avec le NAS pour les listes, les en-têtes, les envois et les déplacements.' },
    {
      name: 'Crate folder-rules',
      role: 'les règles Rust des dossiers par année, lieu et jour, partagées avec le trieur de bureau.',
    },
    { name: 'places.db', role: 'un extrait GeoNames et OpenStreetMap dans l’app qui nomme les lieux sans réseau.' },
    { name: 'Conteneurs Node du NAS', role: 'l’indexeur rapide, les pages d’album et l’app navigateur sur le NAS.' },
    {
      name: 'Moteur de visages en Rust',
      role: 'fait tourner YuNet et SFace avec tract sur le NAS et groupe les visages par personne.',
    },
    {
      name: 'Éditeur photo Konva',
      role: 'un seul éditeur dans un composant Expo DOM, partagé avec Shuttrix et le bureau.',
    },
  ],
  flow: [
    'Une tâche de fond liste les dossiers du NAS à quelques heures d’intervalle.',
    'Elle ne lit que l’en-tête de chaque nouveau fichier pour la date et le GPS.',
    'La base de lieux hors ligne nomme le lieu, et SQLite garde la ligne.',
    'La tâche planifie les rappels des 7 prochains jours.',
    'Les écrans interrogent l’index et diffusent les photos complètes depuis le NAS.',
  ],
  links: [
    {
      to: 'media-organizer',
      text: 'Le trieur de bureau utilise les mêmes règles de dossiers en Rust et le même éditeur.',
    },
    { to: 'shuttrix', text: 'L’appareil photo partage l’éditeur, la recherche de lieux et la carte des spots.' },
    {
      to: 'keeppad',
      text: 'Keeppad ajoute des notes au journal d’une personne sur le NAS par un fournisseur Android.',
    },
    { to: 'memories-demo-webdav', text: 'L’examen de Google Play se connecte à ce NAS d’exemple.' },
    { to: 'Tailscale', text: 'Une deuxième adresse atteint le NAS hors de chez soi. Funnel sert les liens d’album.' },
  ],
  features: {
    'Daily reminder':
      'expo-notifications garde des rappels ponctuels pour les 7 prochains jours, planifiés depuis l’index par la tâche de fond. Un voyage à l’étranger ce jour-là choisit l’année.',
    Today:
      'Une requête sur une table de comptes de photos par jour trouve chaque année avec des photos à cette date. Des déclencheurs tiennent ces comptes, donc les lignes de fichiers restent de côté.',
    Trips:
      'L’app découpe les suites de jours à l’étranger dans les comptes par jour. Le lien du voyage ouvre les photos du premier au dernier jour.',
    Photos:
      'FlashList dessine les vignettes à l’écran et un écran plus loin. Chaque vignette montre la petite miniature EXIF, en cache sur le téléphone.',
    'Filter by place':
      'La recherche de lieux lit les pays et les lieux dans les comptes par jour. Les choix deviennent une condition de plus dans chaque requête de galerie.',
    'Camera and drone shots':
      'Le modèle EXIF ou le nom du fichier décide pendant la synchro entre téléphone, appareil et drone. L’index le garde pour chaque fichier.',
    'Tile size':
      'Un gestionnaire de pincement règle 1 à 6 vignettes par ligne. Une seule valeur enregistrée pilote chaque grille.',
    'Send many photos at once':
      'L’app copie la sélection dans son cache, 3 à la fois. Un petit module natif la passe d’un coup à la feuille de partage du système.',
    'Share an album by link':
      'L’app écrit un fichier d’album sur le NAS en WebDAV. Un serveur Node du NAS le montre via Tailscale Funnel, avec des aperçus faits par sharp.',
    'Memories in the browser':
      'Un serveur Node du NAS sert la version web et relaie WebDAV sur la même adresse. Tailscale Serve le garde dans le tailnet.',
    Organize:
      'Chaque carte lance une tâche : le tri de l’appareil photo, l’envoi ou la libération de place. Les règles de dossiers en Rust prévoient dossier et nom avant chaque déplacement.',
    'Import from Google Photos':
      'L’API Picker de Google Photos ne montre que les éléments choisis par la personne. L’app les télécharge dans le dossier de l’appareil photo et l’envoi les reprend.',
    'Sort picked photos on the NAS':
      'Les règles de dossiers en Rust prévoient un nouveau dossier et un nom par fichier. Un MOVE WebDAV l’y place et l’index du téléphone suit aussitôt.',
    Viewer:
      'expo-image affiche la photo complète par-dessus la miniature en cache. expo-video diffuse les vidéos du NAS par requêtes de plage.',
    'Connect to the NAS':
      'Une recherche mDNS liste les appareils du Wi-Fi, et une sonde trouve le port WebDAV. La connexion reste dans le stockage sécurisé du téléphone.',
    'Photos away from home':
      'Une sonde de l’adresse maison part au démarrage et à chaque changement de réseau. Sans réponse l’app passe à l’adresse Tailscale.',
    'Sync progress':
      'Le bandeau lit l’état de la synchro en direct sur le téléphone. La partie NAS vient d’un fichier d’état que l’indexeur écrit chaque minute.',
    'Mobile data':
      'Une seule vérification garde chaque tâche NAS sur les données mobiles. La réponse enregistrée la laisse tourner ou la fait attendre le Wi-Fi.',
    'Index from the NAS':
      'Un conteneur Node du NAS lit les en-têtes sur son propre disque et écrit un fichier d’index à côté des photos. Le téléphone le télécharge et ajoute les lignes qui lui manquent.',
    'Move the index to a new phone':
      'SQLite copie la partie NAS de l’index dans un seul fichier pour la feuille de partage. Le nouveau téléphone attache ce fichier et y copie ses lignes.',
    Language:
      'i18next tient les 9 catalogues, et expo-localization lit la langue du téléphone. Un choix dans les réglages l’emporte et replanifie les rappels.',
    Theme:
      'Une palette tient un jeu de couleurs claires et un jeu sombre. Les écrans la lisent par un hook qui suit le téléphone ou le choix enregistré.',
    'Ads and remove ads':
      'Google Mobile Ads affiche les bannières AdMob et la pub plein écran après le consentement. expo-iap vend Supprimer les pubs via Google Play.',
    'Memories Pro':
      'expo-iap vend le produit via Google Play et l’App Store. Un seul module vérifie l’achat avant l’ouverture de chaque fonction verrouillée.',
    'Desktop sorter':
      'Une app Tauri avec un backend Rust trie un dossier sur l’ordinateur. Elle relie la même crate de règles de dossiers que le téléphone.',
    Archive:
      'La liste des mois lit les comptes de photos par jour, tenus par des déclencheurs. Un appui demande les fichiers du mois par heure de prise.',
    'Trip list and places map':
      'La liste des voyages réunit les voyages à l’étranger et les virées dans le pays, tirés des comptes par jour. Leaflet dans une WebView dessine la carte à partir des comptes par petite case.',
    People:
      'Un moteur Rust sur le NAS groupe les visages avec YuNet et SFace. Le téléphone télécharge le résultat et renvoie noms et fusions au NAS.',
    'Indexing progress page':
      'Le moteur de visages et l’indexeur écrivent des fichiers d’état sur le NAS. Un serveur Node en fait une page en direct avec des événements serveur.',
    'Albums about a person':
      'Le fichier d’album garde la personne, sa date de naissance et les notes. Le serveur d’albums du NAS range les photos par année d’âge.',
    'Turn a photo':
      'Le moteur de visages essaie chaque photo tournée de 90, 180 et 270 degrés. Le téléphone règle l’orientation EXIF et remplace le fichier sur le NAS après un contrôle.',
    'Edit a photo':
      'Konva fait tourner l’éditeur dans un composant Expo DOM. Enregistrer une copie écrit un JPEG sur le téléphone et le NAS, et Enregistrer remplace le fichier après une comparaison des octets.',
    'Draw a new picture':
      'Le même éditeur Konva s’ouvre sur une feuille vierge. L’enregistrement place le dessin sur le téléphone et sur le NAS selon les règles d’envoi.',
    'Photos on the phone':
      'Un module Expo local en Kotlin lit le dossier de l’appareil photo grâce à une autorisation unique. Ses fichiers rejoignent le même index que ceux du NAS.',
    Settings:
      'Les petites valeurs restent dans le stockage clé valeur d’expo-sqlite et se chargent au démarrage. Le mot de passe du NAS reste dans le stockage sécurisé.',
    'Duplicates on the NAS':
      'Une requête sur l’index groupe les fichiers du NAS par heure de prise et taille. Une comparaison des octets en WebDAV prouve chaque paire avant que la copie parte dans la corbeille du NAS.',
    Updates:
      'Un paquet de mise à jour partagé lit la dernière release GitHub et ouvre l’installeur Android. La version Google Play le remplace par des modules vides.',
    'Light, blur and fonts':
      'Les filtres Konva appliquent les curseurs de couleur, puis un flou autour d’une ellipse ou d’une bande. Chaque légende garde sa famille de police.',
    'On the iPhone':
      'Des fichiers iOS remplacent les modules Android par des versions pour la photothèque, URLSession et l’App Store. Les règles de dossiers tournent en XCFramework Rust via Swift.',
  },
};

export default arch;
