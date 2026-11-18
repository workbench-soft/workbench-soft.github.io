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
  design: {
    scale: [
      'Un appel relie jusqu’à 4 appareils en maillage, et chacun envoie sa vidéo aux 3 autres.',
      'Un objet de salle tient 6 sockets au plus, 64 Ko par message et 20 messages par seconde, donc un déluge reste dans une salle.',
      'Le Worker, le Durable Object et le relais tournent sur des offres gratuites, car seuls de petits messages scellés y passent.',
    ],
    data: [
      'Pas de base de comptes. Le nom, la langue, les salles enregistrées et les clés push sont dans localStorage sous un préfixe versionné.',
      'La transcription et les messages texte de chaque salle sont dans IndexedDB sur chaque appareil.',
      'Le Durable Object ne garde que le quota du relais et une réponse du relais en cache pendant 90 minutes. KV garde les rapports de connexion 14 jours.',
    ],
    interfaces: [
      'La signalisation passe par un WebSocket vers l’objet de salle. Chaque message est une enveloppe AES-GCM avec une version, un id et un numéro de séquence.',
      'Chaque paire d’appareils ouvre 3 canaux de données négociés : points en direct, messages de contrôle et morceaux de fichier.',
    ],
    reliability: [
      'Après 3 secondes de coupure, l’id de pair le plus bas envoie une offre de redémarrage ICE, avec des attentes de 12, 18 et 25 secondes.',
      'Un contrôle lit chaque piste toutes les 3 secondes. Un blocage de 15 secondes lance une réparation ICE, puis la reconstruction de la paire.',
      'L’id d’enveloppe écarte une copie, le numéro de séquence un rejeu et l’id d’offre une réponse périmée.',
    ],
    security: [
      'La clé de la salle suit le # du lien, donc le Worker voit du texte chiffré sans noms, titres ni offres.',
      'Les médias passent en DTLS-SRTP entre les appareils, et un relais TURN ne porte que des paquets chiffrés.',
      'La page de salle ne charge aucun script publicitaire et porte noindex, donc aucun code tiers ne tourne près de la clé.',
    ],
    performance: [
      'Le canvas et les appels WebRTC tournent dans des modules simples, et React lit de petits stores via useSyncExternalStore.',
      'Le Worker met en cache les réglages du relais 90 minutes par salle et en demande 20 au plus par salle et par jour.',
      'Whisper tourne sur WebGPU quand il existe, sinon le petit modèle sur WebAssembly. Les gros fichiers attendent que le canal se vide.',
    ],
    operations: [
      'Checks lance lint, tests et build à chaque push sur main, puis le site part sur GitHub Pages et le Worker se déploie via wrangler.',
      'L’APK n’est construit que si android/ a changé, car l’app charge le site en direct. Un changement web reçoit un tag sans runner lourd.',
      'Un lancement nocturne à 19:00 Sydney construit le bundle Play si android/ a changé. Un Checks en échec annule la construction.',
    ],
    tradeoffs: [
      'Un maillage de liens directs plutôt qu’un serveur média : aucune vidéo n’est hébergée, et ça ne coûte rien. L’envoi croît avec chaque personne, donc les appels s’arrêtent à 4.',
      'Un habillage du site en direct plutôt que des écrans natifs : un correctif web sort sans revue des stores. L’app a besoin du réseau.',
      'Whisper dans le navigateur plutôt qu’une reconnaissance vocale cloud, pour que le son reste sur les appareils. Le premier usage télécharge les poids du modèle.',
    ],
  },
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
    'Join with a room code':
      'Le code est un hachage de la clé de la salle. Un appareil de la salle y répond par un échange CPace dans un salon Nostr, et un relais qui observe ne lit pas le lien.',
    'Saved rooms':
      'Un lien de salle reste dans le stockage du navigateur sous un nom, et aucun serveur ne garde la liste. La même clé ouvre la même salle à chaque fois.',
    Board:
      'Des modules purs gardent les traits et les traits effacés en 2 ensembles, envoyés par les canaux de données WebRTC. Un canvas les dessine hors de React.',
    'Share an image or video':
      'Le fichier part en morceaux par son propre canal de données vers chaque personne. Lecture, pause et saut de la personne qui partage passent par le canal de contrôle.',
    Lessons:
      'L’appareil du propriétaire envoie le blocage, le temps restant et son zoom sur le canal de contrôle. Le tableau garde les traits de chaque page, et les diapos attendent dans IndexedDB.',
    'Lesson tasks':
      'La question et les réponses passent par le canal de contrôle. Le cahier de chaque élève est un tableau à part que seul l’enseignant reçoit, et un mot ou un tampon glissé part en copie plus récente.',
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
    'Board text':
      'Un texte est un trait du tableau avec des mots et un point, il se synchronise, s’efface et s’annule comme l’encre. Sa taille suit la hauteur du tableau, il garde sa place à tout zoom.',
    'Board stamps':
      'Un tampon est un trait du tableau avec un point et un type, il se synchronise, s’efface et s’annule comme l’encre. Sa taille est une part de la hauteur du tableau.',
    'Contacts and rooms':
      'Contacts et salles partagent une liste enregistrée dans le navigateur, chacun avec son type. Un nom de contact reste sur l’appareil, un titre de salle se synchronise.',
    'Search and share preview':
      'Un plugin Vite prérend la page d’accueil dans chacune des 9 langues au build. Un autre écrit le plan du site, et chaque page porte ses balises d’aperçu.',
    'Messages in a call':
      'Une ligne passe scellée par la signalisation de la salle, à part du chemin vidéo. Chaque appareil la garde dans IndexedDB et échange les lignes manquantes à l’appel suivant.',
    'Reactions and raised hands':
      'Chaque réaction part en message scellé par la signalisation du salon, 3 par seconde au plus. Une main levée voyage dans l’état du participant que la liste répète toutes les 5 secondes, donc les retardataires la voient. Des keyframes CSS dessinent la montée et les éclats.',
    'Button hints':
      'Un module partagé affiche la bulle après un survol ou un appui long. Un appui long montre le nom et retient le tap.',
    'Close Farnear and take back its permissions':
      'La page termine l’appel et la sonnerie, puis demande à l’enveloppe Android de rendre ses autorisations et de se fermer. Un navigateur reçoit les étapes pour les réinitialiser à la main.',
  },
};

export default arch;
