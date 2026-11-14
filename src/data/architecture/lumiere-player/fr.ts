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
  features: {
    Sources:
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
      'L’analyse garde seulement le chemin de chaque vidéo dans SQLite. Un analyseur lit la série, la saison et l’épisode dans les noms, et Wikidata ajoute leurs autres noms.',
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
  },
};

export default arch;
