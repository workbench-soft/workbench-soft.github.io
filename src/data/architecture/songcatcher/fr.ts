import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Une app Android en Kotlin sans serveur. Un service au premier plan entend le mot de réveil, le téléphone calcule lui même l’empreinte Shazam, et le morceau part vers Spotify et Lumiere.',
  parts: [
    {
      name: 'ListenService',
      role: 'le service micro au premier plan : lit des trames de 80 ms, lance une capture et dit le résultat.',
    },
    {
      name: 'sherpa-onnx',
      role: 'le repérage de mots clés qui entend « Shazam » à partir d’une ligne de phrase, sans entraînement.',
    },
    {
      name: 'Signature.kt',
      role: 'un portage Kotlin de l’empreinte shazamio : une FFT du son 16 kHz mono et des pics dans 4 bandes.',
    },
    { name: 'Shazam', role: 'le service de reconnaissance, interrogé avec l’empreinte à 3, 6, 9 et 12 secondes.' },
    { name: 'Spotify.kt', role: 'la connexion PKCE, la recherche du titre par ISRC et l’ajout aux titres likés.' },
    {
      name: 'wakeshare',
      role: 'le module de micro partagé de ce dépôt, pour que les autres apps à réveil gardent leurs phrases.',
    },
  ],
  flow: [
    'Le repérage entend « Shazam », le service prend le micro et émet un bip.',
    'La capture enregistre et construit l’empreinte pendant que les requêtes partent vers Shazam en arrière plan.',
    'Un résultat part vers Lumiere par broadcast et vers les titres likés de Spotify.',
    'Une voix dit le résultat, et le micro écoute de nouveau chaque mot de réveil.',
  ],
  links: [
    { to: 'Shazam', text: 'Reçoit l’empreinte et répond avec le titre, l’artiste, l’album et l’ISRC.' },
    { to: 'Spotify', text: 'Trouve le titre par ISRC, puis par artiste et titre, et l’ajoute aux titres likés.' },
    {
      to: 'lumiere-player',
      text: 'Reçoit chaque morceau par le broadcast LIKE_CAUGHT_SONG et l’ajoute à ses titres likés.',
    },
    { to: 'keeppad', text: 'Partage le micro avec SongCatcher par wakeshare, avec SpotTheCam et ServoHop.' },
  ],
  design: {
    scale: [
      'Le téléphone d’un seul propriétaire, quelques captures par jour.',
      'Shazam a répondu 429 après environ 15 requêtes en 2 minutes, donc une capture en envoie 4 au plus.',
    ],
    data: [
      'Les 50 derniers morceaux et leur état Spotify sont dans les shared preferences.',
      'Les empreintes faites hors ligne attendent à côté pendant une semaine au plus. Le son lui même n’est pas gardé.',
    ],
    interfaces: [
      'Un POST HTTPS de l’empreinte vers amp.shazam.com, et l’API Web de Spotify avec un jeton bearer.',
      'Un broadcast explicite vers com.workbenchsoft.lumiere, et le service lié wakeshare pour les autres apps à réveil.',
    ],
    reliability: [
      'Sans réseau, un 429 ou un 5xx garde l’empreinte, et le réveil ou le démarrage suivant l’envoie.',
      'Un morceau n’est marqué enregistré qu’une fois la bibliothèque Spotify d’accord, et un bouton relance le reste.',
    ],
    security: [
      'La connexion passe par PKCE, donc aucun secret client n’existe. Le jeton de rafraîchissement est chiffré par une clé Android Keystore.',
      'Seule l’empreinte, quelques Ko de pics, quitte le téléphone. L’enregistrement disparaît à la fin de la capture.',
    ],
    performance: [
      'Les requêtes tournent sur un second fil, donc l’enregistrement continue pendant que Shazam répond en 0,3 à 0,6 seconde.',
      'La première requête part après 3 secondes de musique, et la plupart des morceaux sont trouvés dès elle.',
    ],
    operations: [
      'La CI lance les tests unitaires et construit l’APK comme artefact songcatcher.',
      'SignatureTest tient l’empreinte aux octets de shazamio, et CatalogTest les 9 catalogues de textes.',
    ],
    tradeoffs: [
      'L’adresse Shazam gratuite plutôt qu’AudD, un jeton payant par requête, et ShazamKit, qui demande les frais de développeur Apple. L’adresse n’est pas publique et peut changer.',
      'Une ligne de phrase sherpa plutôt qu’une tête openWakeWord entraînée, pour sortir sans entraînement. La tête viendra plus tard.',
      'Une app à part plutôt qu’une fonction dans Lumiere, pour qu’une capture marche Lumiere fermé. Un APK de plus à installer.',
    ],
  },
  features: {
    'Wake by voice':
      'KeywordAudio.kt fait tourner sherpa-onnx sur la ligne de keywords.txt. ListenService.kt tient le micro partagé pendant la capture et émet le bip par Voice.kt.',
    'Song recognition':
      'Catch.kt passe des trames de 100 ms à Signature.kt et envoie l’empreinte à 3, 6, 9 et 12 secondes. Shazam.kt lit le titre, l’artiste, l’album et l’ISRC.',
    'Liked Songs in Spotify and Lumiere':
      'Lumiere.kt envoie le broadcast avec l’artiste, le titre, l’album, l’ISRC et l’heure. Spotify.kt cherche par ISRC, puis par nom, et ajoute à la bibliothèque.',
    'Spoken answer':
      'Voice.kt joue le bip et parle par la synthèse vocale d’Android en baissant la musique. L’interrupteur à l’écran coupe la voix.',
    'Offline catches':
      'History.kt garde l’empreinte et sa durée. Après chaque capture et au démarrage, le service envoie celles en attente et enregistre chaque résultat sans voix.',
    'Caught songs':
      'History.kt garde les 50 derniers morceaux et leur état Spotify. retryPending enregistre les morceaux en attente et dit combien sont passés.',
    Lyrics:
      'Lyrics.kt demande à LRCLIB l’artiste, le titre et l’album, puis cherche, et garde la réponse dans le dossier de cache. SongSheet en Compose montre un indicateur, les paroles ou un nouvel essai.',
    Languages:
      'Chaque texte affiché ou dit est dans res/values strings.xml en 9 langues, et CatalogTest vérifie les clés.',
    'Shared microphone':
      'WakeShare relie les apps à réveil par un service lié. L’app au plus petit nom de paquet tient le micro et envoie WAKE à l’app dont elle a entendu la phrase.',
    'Wake engine':
      'wakeword fait tourner les têtes openWakeWord sur ONNX Runtime avec un vérificateur par propriétaire. Le repérage sherpa couvre chaque phrase sans tête, comme SongCatcher aujourd’hui.',
  },
};

export default arch;
