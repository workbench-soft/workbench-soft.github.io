import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Une seule app Kotlin pour les téléphones Android et Google TV lit les fichiers du téléphone, d’une clé USB ou d’un partage SMB avec libVLC. Les bibliothèques et les positions restent sur l’appareil dans SQLite, et l’APK de GitHub ajoute la musique en ligne.',
  parts: [
    {
      name: 'Kotlin et Android Views',
      role: 'les écrans pour la télécommande et le tactile, dans une app pour le téléphone et la TV.',
    },
    { name: 'libVLC', role: 'lit la vidéo et la musique, lit les tags et parcourt les partages SMB.' },
    {
      name: 'SQLite',
      role: 'les positions, les bibliothèques de musique, de livres et de vidéos, et la position dans chaque livre.',
    },
    {
      name: 'Media3',
      role: 'la session musicale avec la notification, l’écran de verrouillage et les boutons Bluetooth.',
    },
    { name: 'WorkManager', role: 'parcourt les dossiers de musique, de livres et de vidéos en arrière-plan.' },
    { name: 'sherpa-onnx', role: 'le détecteur de mot clé qui entend Hey Lumi sur le téléphone.' },
    {
      name: 'Chaquopy et yt-dlp',
      role: 'le module en ligne avec les noms de MusicBrainz et le son de YouTube, dans l’APK de GitHub seulement.',
    },
    {
      name: 'Google Play Billing et AdMob',
      role: 'les achats Pro et Supprimer les pubs, et la bannière sur le téléphone.',
    },
  ],
  flow: [
    'La personne ajoute un dossier du téléphone, une clé USB ou un partage SMB.',
    'Une analyse en arrière-plan écrit les noms et les tags dans SQLite.',
    'L’écran d’accueil montre les fichiers, les chansons, les livres et les vidéos.',
    'Un toucher, une touche de télécommande ou une commande vocale choisit la lecture.',
    'libVLC lit le fichier, et l’app garde la position au fil de la lecture.',
  ],
  links: [
    {
      to: 'guitar-upscale',
      text: 'Trouver les tabs ouvre Guitar Upscale sur la chanson en cours, par un lien Android.',
    },
    {
      to: 'spotthecam',
      text: 'Hey Lumi partage le micro avec Hey Spot, donc les deux phrases marchent en même temps.',
    },
    { to: 'keeppad', text: 'Hey Lumi utilise le même modèle de mot clé que Hey Keep et partage le micro avec lui.' },
    { to: 'GitHub', text: 'L’APK et ses mises à jour viennent des versions sur GitHub.' },
    { to: 'Google Play', text: 'La version Play, ses mises à jour et les achats Pro et Supprimer les pubs.' },
  ],
  design: {
    scale: [
      "Un APK pour les téléphones Android et Google TV, une personne par installation. Les bibliothèques sont indexées sur l'appareil.",
      "L'analyse vidéo lit seulement les noms, sans lire les tags, si bien qu'un gros partage s'indexe sans ouvrir chaque fichier.",
      "Deux ABI sont livrées, armeabi-v7a et arm64-v8a, pour garder l'APK avec libVLC léger.",
    ],
    data: [
      "SQLite sur l'appareil : positions.db, library.db, books.db, book-places.db et videos.db.",
      "positions.db indexe une ligne par l'URI sans l'identifiant NAS, et un fichier USB aussi par nom et taille.",
      'La sauvegarde Android garde les positions et les passages de livres, mais pas nas.xml ni les bases qui contiennent un identifiant NAS.',
    ],
    interfaces: [
      "libVLC lit les sources file://, content:// et smb://. Un MediaSessionService de Media3 fournit la notification, l'écran verrouillé et les boutons Bluetooth.",
      "La voix passe par le SpeechRecognizer de l'appareil, et sherpa-onnx repère la phrase Hey Lumi. Guitar Upscale s'ouvre par un lien Android VIEW.",
      "Le module en ligne appelle MusicBrainz et Wikidata, et YouTube via yt-dlp, dans l'APK GitHub seulement.",
    ],
    reliability: [
      "Le lecteur enregistre sa position toutes les 5 secondes, à la pause, à l'arrêt et à la sortie, donc un plantage coûte des secondes.",
      'ScanWorker tourne sous WorkManager pour un nouveau dossier, au démarrage et chaque jour en Wi-Fi, et les recherches vont lentement sur un seul thread.',
      'Un appareil Bluetooth qui ne joue rien renvoie le son vers le haut-parleur.',
    ],
    security: [
      "Pas de compte ni de serveur propre. Les noms et les tags restent sur l'appareil.",
      'La liste NAS avec ses mots de passe est dans nas.xml, que la sauvegarde Android écarte.',
      "SponsorBlock reçoit seulement un préfixe de hachage de l'id YouTube. Le micro d'éveil tourne comme service au premier plan.",
    ],
    performance: [
      "libVLC joue chaque fichier directement, et un lecteur Media3 l'enveloppe pour l'audio : un seul moteur sert la vidéo et la musique.",
      "LoudnessGate ne donne au modèle de mot clé que les trames fortes et la demi-seconde avant, donc une pièce calme l'évite.",
      "Les pochettes sont décodées à leur taille avec un cache, et l'index de mots liste chaque mot une fois avec ses livres.",
    ],
    operations: [
      "Un push sur main lance Checks et Release côte à côte. Release signe l'APK et le publie une fois Checks passés.",
      'Chaque runner de build garde son état Gradle, donc Gradle ne refait que ce qui a changé. La liste des versions garde les 3 plus récentes.',
      "L'APK se met à jour depuis GitHub Releases au lancement. Le bundle Play écarte le module de mise à jour et le module en ligne.",
    ],
    tradeoffs: [
      "Kotlin natif avec des Views simples plutôt qu'Expo, car le lecteur est une vue libVLC pilotée par les touches de la télécommande et le focus.",
      "libVLC sans modification plutôt que Media3 ExoPlayer, pour les pistes MKV, le parcours SMB et les sous-titres Windows-1251, au prix d'une mention LGPL et d'un gros APK.",
      "SMB via libVLC plutôt qu'une bibliothèque à part, sans dépendance de plus, mais une liste NAS ne donne pas la taille du fichier.",
      "Un seul achat Pro plutôt qu'un abonnement par app, donc une seule vérification, Entitled.pro(), commande chaque écran.",
    ],
  },
  features: {
    'Direct folder browsing and playback':
      'Les dossiers USB s’ouvrent par le système de fichiers d’Android, et libVLC parcourt les partages SMB. La liste des NAS reste sur l’appareil, hors de la sauvegarde Android.',
    Resume:
      'Le lecteur enregistre chaque position dans SQLite par intervalles de 5 secondes et à la sortie. La liste des fichiers lit la même table pour la barre sous chaque fichier.',
    'Subtitles and audio':
      'libVLC liste les pistes intégrées et les fichiers de sous-titres du dossier. Les sous-titres texte se lisent en UTF-8, sinon en Windows-1251.',
    Controls:
      'Le lecteur pilote les sauts et la vitesse dans libVLC. Un module de file garde l’ordre, l’aléatoire et la répétition.',
    Updates:
      'Au lancement, l’APK lit la dernière version sur GitHub et télécharge un APK plus récent. L’installateur Android demande ensuite de confirmer.',
    Ads: 'AdMob montre la bannière sur le téléphone après le formulaire de consentement de Google. Un seul test la masque après un achat Pro ou Supprimer les pubs, et la TV n’en montre pas.',
    Languages:
      'Les ressources de texte Android portent les 9 langues. L’API de langue d’AppCompat applique le choix des réglages ou la langue de l’appareil.',
    'Touch on a phone':
      'Une couche de gestes sur la vidéo change les touchers et les glissés en sauts, recherche, luminosité et volume. La télécommande de la TV passe par-dessus cette couche.',
    'Panel buttons':
      'Le choix reste dans les préférences du lecteur sur l’appareil. Le lecteur construit sa rangée de boutons à partir de ce choix, et libVLC met l’image à l’échelle.',
    'Sponsor skip':
      'Le lecteur lit les chapitres SponsorBlock du fichier, ou interroge l’API SponsorBlock par un hachage de l’ID vidéo. libVLC saute ensuite chaque segment.',
    'Phone speaker':
      'Une piste audio muette qui vise le haut-parleur intégré entraîne le son de libVLC. Un test chaque seconde renvoie un Bluetooth muet vers le haut-parleur.',
    Look: 'De simples Android Views écrites en code partagent un jeu de couleurs, de polices et la pastille de focus. Le logo utilise Instrument Serif.',
    'Music library':
      'Une tâche WorkManager parcourt chaque dossier et lit les tags avec libVLC. Les chansons vont dans SQLite sur l’appareil, hors de la sauvegarde Android.',
    'Music player':
      'Une session Media3 joue les chansons avec libVLC sans vidéo. Elle dessine la notification et l’écran de verrouillage, et la barre la suit sur chaque écran.',
    'MusicBrainz and YouTube':
      'MusicBrainz nomme les titres, les artistes et les albums. yt-dlp tourne en Python via Chaquopy et prend le son sur YouTube, dans l’APK de GitHub.',
    Audiobooks:
      'Une analyse regroupe les fichiers audio en livres selon le fichier OPF, les tags et les noms de dossiers. Wikidata nomme l’auteur, et SQLite garde la position dans chaque livre.',
    'Video library':
      'L’analyse garde seulement le chemin de chaque vidéo dans SQLite. Un analyseur lit la série, la saison et l’épisode dans les noms, et Wikidata ajoute leurs autres noms. Le téléphone lit et écrit les fiches de films du téléviseur LG dans un fichier à côté des films sur le NAS, en SMB avec smbj.',
    'Find tabs':
      'La barre du lecteur envoie un lien Android avec l’artiste et le titre à Guitar Upscale. Le bouton apparaît seulement quand Android trouve cette app.',
    'Google Play build':
      'Un second type de build retire la mise à jour intégrée, l’accès complet aux fichiers et le module en ligne. Google Play le met ensuite à jour.',
    'Voice commands':
      'sherpa-onnx entend Hey Lumi sur le téléphone, et la reconnaissance vocale d’Android prend la commande. Une recherche trouve la chanson, le livre ou la vidéo, et la synthèse vocale répond.',
    'Online music':
      'Le module en ligne lance yt-dlp en Python par Chaquopy. MusicBrainz nomme les chansons et YouTube donne le son, dans l’APK de GitHub sur un téléphone 64 bits.',
    'Lumiere Pro':
      'Google Play Billing vend un seul produit Pro, et l’app interroge Google Play à chaque lancement. Un seul test dans l’app ouvre les fonctions vocales et masque la bannière.',
    'LG webOS app':
      'Une page web en TypeScript lit les vidéos avec le lecteur de la télé. Un service Node du même paquet webOS liste les clés USB et le NAS en WebDAV, et envoie les fichiers à la page.',
    'Optional library setup and NAS finder':
      'NasFind frappe au port 445 sur tout le réseau /24 du téléviseur et demande chaque nom par NetBIOS. Après la connexion, libVLC liste les partages, et les dossiers de la bibliothèque gardent le type de chaque dossier dans SharedPreferences.',
    'Windows and Mac app':
      'Electron exécute la page webOS et son service Node sans changement. La page se charge depuis sa propre origine lumiere://, et le service liste le dossier personnel et les disques à la place des clés USB.',
    'Continue Watching':
      'Les deux apps construisent les lignes à partir des positions enregistrées, les plus récentes en haut, jusqu’à 20. Une position à 95 % compte comme vue, et un épisode vu laisse place au suivant.',
    'Film look':
      'Une couche de grain dessinée au-dessus de la vidéo ne coûte rien au décodeur, donc le HDR et le décodage matériel restent. Sur Android 12 et plus, le lecteur passe la cadence du film à Surface.setFrameRate.',
    'Caught songs':
      'Un récepteur de l’APK GitHub vérifie que SongCatcher a envoyé la prise, puis l’enregistre dans liked-songs.db. Une chanson des dossiers pointe vers son fichier, une autre garde son adresse YouTube.',
    'Titles of films, series and books':
      'La recherche de films demande à Wikidata le titre russe et anglais et l’année. Une fonction par app construit la ligne : Titles.label sur Android, titleLine sur webOS.',
    'Library scan':
      'Chaque dossier de la bibliothèque est une tâche avec une phase. Une fonction calcule à partir des tâches la part terminée et le temps restant : ScanProgress.kt sur Android et scan-progress.ts sur webOS, avec les mêmes tests. Les dossiers sont groupés par appareil, et 3 groupes tournent en même temps.',
  },
};

export default arch;
