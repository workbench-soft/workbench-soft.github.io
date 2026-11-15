import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Farnear est une seule app web React, emballée en Kotlin pour Android et en Capacitor pour l’iPhone. Un Worker Rust chez Cloudflare relaie les messages scellés de la salle, et l’appel passe en direct entre les appareils.',
  parts: [
    { name: 'React et Vite', role: 'les écrans, la page de salle et la page d’accueil prérendue en 9 langues.' },
    {
      name: 'WebRTC',
      role: 'le son, la vidéo et les canaux de données du tableau, en direct entre 4 appareils au plus.',
    },
    {
      name: 'Worker Rust et Durable Object',
      role: 'un objet par salle relaie les messages scellés et donne les réglages de relais.',
    },
    { name: 'Relais TURN', role: 'portent les médias chiffrés quand un chemin direct entre 2 réseaux échoue.' },
    {
      name: 'Modules du tableau',
      role: 'du TypeScript pur garde les traits, les traits effacés et l’envoi de fichiers hors de React.',
    },
    { name: 'Whisper et MediaPipe', role: 'la parole en texte et le fond vidéo, tous deux sur l’appareil.' },
    {
      name: 'Enveloppe Kotlin',
      role: 'l’app Android autour du site en ligne, avec AdMob, Play Billing et la sonnerie.',
    },
    { name: 'Capacitor et Swift', role: 'l’app iPhone autour du même site, avec StoreKit et la feuille de partage.' },
  ],
  flow: [
    'Un lien de salle porte sa clé, et la page s’ouvre avec elle.',
    'La page rejoint la salle sur le Worker par un WebSocket.',
    'Les appareils échangent offres scellées et chemins réseau via le Worker.',
    'WebRTC relie les appareils en direct, ou par un relais.',
    'Vidéo, son, traits et fichiers circulent entre les appareils.',
  ],
  links: [
    { to: 'Cloudflare', text: 'Le Worker, le Durable Object et un relais TURN tournent dans l’offre gratuite.' },
    { to: 'consdr', text: 'L’enveloppe Android reprend en Kotlin le code AdMob et Play Billing de Consdr.' },
    {
      to: 'Google Play',
      text: 'Play Billing vend Supprimer les pubs et Farnear Pro, et AdMob affiche les pubs Android.',
    },
    { to: 'app-updater', text: 'WBS Updater compare la version installée à la dernière version sur GitHub.' },
    { to: 'Hugging Face', text: 'Le scribe y télécharge une fois les poids de Whisper.' },
  ],
  features: {
    'Calls through a link':
      'La fin du lien porte la clé de la salle, donc le Worker ne voit que des messages scellés. WebRTC relie ensuite jusqu’à 4 appareils en maillage.',
    'Recover a dropped call':
      'Après une coupure un côté envoie une offre de redémarrage ICE, jusqu’à 3 fois. Une file par pair empêche une ancienne réponse de gagner.',
    'Return to a call':
      'Le navigateur retient l’appel ouvert pendant 30 minutes, donc le lien rejoint seul. Un Web Lock par salle laisse un onglet plus récent reprendre l’appel.',
    'Relay for blocked networks':
      'Le Worker donne à chaque navigateur des réglages TURN de courte durée par son socket. ICE essaie d’abord les chemins directs puis passe par un relais.',
    'Share the call link':
      'Le panneau d’invitation prépare un brouillon pour Gmail, WhatsApp ou Telegram dans la langue de l’app. Autres apps ouvre la feuille de partage du système.',
    'Saved rooms':
      'Un lien de salle reste dans le stockage du navigateur sous un nom, et aucun serveur ne garde la liste. La même clé ouvre la même salle à chaque fois.',
    Board:
      'Des modules purs gardent les traits et les traits effacés en 2 ensembles, envoyés par les canaux de données WebRTC. Un canvas les dessine hors de React.',
    'Share an image or video':
      'Le fichier part en morceaux par son propre canal de données vers chaque personne. Lecture, pause et saut de la personne qui partage passent par le canal de contrôle.',
    'Lessons (planned)':
      'Une spec prévoit des diapos envoyées à chaque appareil avant la leçon, avec les outils du tableau sur chacune. L’app n’a pas encore de code de leçon.',
    'Contacts and ringing':
      'La sonnerie est un push web scellé pour l’autre appareil et envoyé via le Worker. L’app Android le reçoit par les services Google Play, sans Firebase.',
    'Ads and remove ads':
      'AdMob affiche la bannière Android et la pub après un appel. Play Billing vend leur suppression, et la page de salle ne charge pas de script de pub.',
    'Farnear Pro':
      'Play Billing vend Pro dans l’app Android, et les navigateurs ont les outils gratuitement. Un appareil avec Pro le dit dans son bonjour scellé, et la salle ouvre le tableau.',
    'Android app':
      'Une enveloppe WebView en Kotlin charge le site en ligne et lui passe la caméra et le micro. La CI signe chaque APK et le met dans une version GitHub publique.',
    'iPhone app':
      'Capacitor charge le site en ligne, et des jumeaux Swift des parties Kotlin ajoutent StoreKit, AdMob et la feuille de partage. Le code attend son premier build.',
    Languages:
      'i18next garde les 9 catalogues, et un choix change chaque écran tout de suite. Le choix reste sur l’appareil.',
    'App icon':
      'Un seul SVG sert de source au favicon, aux icônes web et aux tailles du lanceur Android. Android reçoit aussi une icône adaptative et une icône à thème.',
    'Call stage':
      'Un module de scène choisit la grande tuile et la bande selon l’épingle et l’écran partagé. Chaque appareil mesure lui-même les voix pour l’anneau de parole.',
    'Share a screen':
      'Chaque connexion garde dès le début une place vidéo libre, donc un écran partagé n’exige pas de nouvelle offre. Le tableau dessine par-dessus.',
    'Take a photo':
      'modern-screenshot saisit l’appel visible en PNG, avec la vidéo et le tableau. L’app Android l’enregistre dans Téléchargements, et l’image reste hors des serveurs.',
    'Your name':
      'Le nom reste dans le stockage du navigateur et part aux autres dans le bonjour scellé. Un changement se voit dès l’appel suivant.',
    'Video background':
      'MediaPipe trouve la personne sur l’appareil, et un canvas la dessine sur un flou ou une image. Cette piste canvas remplace la caméra avant l’envoi.',
    'Call transcript and summary':
      'Un appareil fait tourner Whisper dans le navigateur, sur WebGPU quand il peut. Les lignes partent aux autres par un canal de données et restent dans IndexedDB. Le résumeur intégré de Chrome écrit le résumé.',
    'Recover stalled media':
      'Un contrôle lit les octets et les images reçus de chaque piste toutes les 3 secondes. Un blocage de 15 secondes lance une réparation ICE, puis la reconstruction de cette paire.',
    'Shared call titles':
      'Le titre passe dans la signalisation scellée avec un compteur de révision. La révision la plus récente gagne sur chaque appareil, et le Worker ne peut pas le lire.',
    'Shared documents on the board':
      'PDF.js peint une page PDF et un moteur PowerPoint peint une diapo sur l’appareil. Pages tournées et retraits passent par le canal de contrôle.',
    'Contacts and rooms':
      'Contacts et salles partagent une liste enregistrée dans le navigateur, chacun avec son type. Un nom de contact reste sur l’appareil, un titre de salle se synchronise.',
    'Search and share preview':
      'Un plugin Vite prérend la page d’accueil dans chacune des 9 langues au build. Un autre écrit le plan du site, et chaque page porte ses balises d’aperçu.',
    'Messages in a call':
      'Une ligne passe scellée par la signalisation de la salle, à part du chemin vidéo. Chaque appareil la garde dans IndexedDB et échange les lignes manquantes à l’appel suivant.',
    'Button hints':
      'Un module partagé affiche la bulle après un survol ou un appui long. Un appui long montre le nom et retient le tap.',
    'Close Farnear and take back its permissions':
      'La page termine l’appel et la sonnerie, puis demande à l’enveloppe Android de rendre ses autorisations et de se fermer. Un navigateur reçoit les étapes pour les réinitialiser à la main.',
  },
};

export default arch;
