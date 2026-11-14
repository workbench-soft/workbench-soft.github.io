import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Une app Next.js tourne dans le navigateur et sur Cloudflare Workers. Capacitor emballe le même build dans les apps Android et iPhone, et le moteur sonore tourne sur l’appareil.',
  parts: [
    {
      name: 'Next.js et React',
      role: 'la page unique avec chaque fonction, rendue une fois par le serveur puis exécutée dans le navigateur.',
    },
    {
      name: 'Moteur sonore',
      role: 'les lecteurs et les enregistreurs hors de React, reliés par un bus d’événements RxJS.',
    },
    {
      name: 'Web Workers',
      role: 'l’horloge du tempo, la recherche de doigtés et la détection d’accords hors du fil principal.',
    },
    {
      name: 'smplr et Web Audio',
      role: 'des instruments General MIDI échantillonnés avec un bus de réverbération et de délai.',
    },
    { name: 'Redux Toolkit', role: 'les réglages et l’état de l’écran, gardés dans le navigateur.' },
    { name: 'Konva', role: 'les canevas du manche, du piano roll et de la tablature.' },
    { name: 'Capacitor', role: 'emballe le build statique dans les apps Android et iPhone avec des plugins natifs.' },
    {
      name: 'Cloudflare Workers et KV',
      role: 'hébergent le build serveur via OpenNext, relaient les sites de morceaux et gardent les morceaux intégrés.',
    },
  ],
  flow: [
    'Un appui, un accord ou un morceau chargé pose des notes sur le bus.',
    'Une horloge en Web Worker cale la lecture, le grattage et le looper.',
    'La bibliothèque smplr joue chaque note à travers la réverbération et le délai.',
    'Les enregistreurs rangent chaque note par tick pour le piano roll et le MIDI.',
    'Morceaux et paroles des sites externes passent par le Worker Cloudflare.',
  ],
  links: [
    { to: 'lumiere-player', text: 'Lumiere Player ouvre le morceau en cours dans Guitar Upscale par un lien.' },
    { to: 'keeppad', text: 'La phrase Hey Guitar utilise le même modèle de mots clés sherpa-onnx que KeepPad.' },
    {
      to: 'Songsterr',
      text: 'Les tablatures Songsterr arrivent par le proxy du Worker et deviennent des fichiers Guitar Pro.',
    },
    { to: 'Google Play', text: 'Google Play vend Pro et Remove ads, et AdMob affiche les pubs.' },
    { to: 'Cloudflare', text: 'Cloudflare Workers héberge le site, et KV garde les morceaux intégrés.' },
  ],
  features: {
    Fretboard:
      'Konva dessine le manche sur un canevas selon la gamme et l’accordage des réglages. Un appui envoie la note sur le bus, et smplr la joue.',
    'Scale, tuning and capo':
      'Les gammes et les accordages sont des données fixes dans l’app. Un choix va dans Redux, et le manche et les doigtés se reconstruisent.',
    Tuner:
      'La bibliothèque pitchy lit la hauteur du micro dans le navigateur. L’app devine l’accordage d’après les cordes à vide, et Konva dessine le cadran.',
    Chords:
      'Un groupe de 4 Web Workers au plus cherche les doigtés pour le manche et le capodastre. Le panneau se remplit un type d’accord à la fois.',
    Strumming:
      'Chaque bouton d’accord tenu joue le motif choisi sur l’horloge du Worker. Les motifs perso restent dans le navigateur.',
    'Song list':
      'Les morceaux intégrés sont des fichiers Guitar Pro dans Cloudflare KV, changés en JSON au build. Vos morceaux restent dans le navigateur, et la liste note la gamme de chacun.',
    'Voice search':
      'Dans le navigateur la Speech API entend les mots, et l’app Android utilise le service vocal du téléphone. L’app joue ensuite le morceau de la liste ou le cherche sur les sites.',
    'Hey Guitar':
      'Sur Android un modèle de mots clés sherpa-onnx venu de KeepPad entend la phrase hors ligne. Dans le navigateur le service vocal écoute tant que la page reste ouverte.',
    'MIDI recording':
      'Un enregistreur écoute le bus et range chaque note par tick d’horloge. Les notes jouées par l’app portent une marque, donc la prise les saute.',
    Looper:
      'Chacun des 8 canaux enregistre depuis le bus sur l’horloge du Worker. Les boucles s’arrondissent à des mesures entières et jouent en mesure.',
    Quantize:
      'Une seule durée dans les réglages fixe la grille du piano roll. Les enregistreurs placent chaque note sur cette grille dès son arrivée.',
    'Piano roll':
      'Le piano roll modifie sur place la ligne de notes commune, avec une annulation par piste. Konva dessine les notes, et un worker devine les parties quand le fichier n’en a pas.',
    'Tab view':
      'Un module de mise en page change les notes d’une piste en cases sur des cordes. Konva dessine les mesures et suit la tête de lecture commune.',
    'Chord sheet':
      'Le Worker cherche les paroles sur des sites d’accords et de paroles, car ils bloquent les appels du navigateur. L’app transpose leurs accords dans la tonalité et cale chaque ligne sur le morceau.',
    'Song upload':
      'Des lecteurs changent les fichiers Guitar Pro et MIDI en notes dans le navigateur. Un fichier audio cherche son morceau par son nom, ou des modèles ONNX entendent ses accords sur l’appareil.',
    'Find a song online':
      'Le Worker Cloudflare transmet chaque recherche aux 4 sites de morceaux, qui bloquent les appels du navigateur. L’app change un morceau Songsterr en fichier Guitar Pro.',
    'Chord and scale detection':
      'Un détecteur d’accords dans un Web Worker compare les notes tapées aux doigtés. Le détecteur de gammes tourne sur le fil principal et propose des gammes.',
    'Instruments and sound':
      'La bibliothèque smplr joue des soundfonts General MIDI tirées de banques libres et les charge au premier appui. La mélodie et les accords ont chacun leur instrument.',
    Effects:
      'Chaque instrument passe dans un bus Web Audio avec une réverbération à convolution et un délai à réinjection. Un curseur change le bus en direct sans recharger l’instrument.',
    'MIDI export':
      'La bibliothèque midi-writer-js écrit les notes chargées dans un fichier MIDI. Un module Guitar Pro enregistre les mêmes notes dans un fichier Guitar Pro.',
    'Guitar Upscale Pro':
      'Chaque build contient chaque fonction. L’app Android cache les fonctions Pro tant que Google Play Billing sur le téléphone ne signale pas l’achat.',
    'Install and offline':
      'Un service worker met en cache les pages, le code et les morceaux pour le mode hors ligne. L’app Android porte le build statique et ses sons dans l’APK.',
    'iPhone app':
      'Capacitor emballe le même build statique dans un projet iOS avec des plugins Swift. StoreKit vend les achats, et AdMob affiche les pubs après la demande de suivi.',
    'Screen layout':
      'Des composants React flottent au-dessus du canevas du manche en plein écran. Un réglage place les accords à gauche ou à droite.',
    'Play panel':
      'Un lecteur parcourt la ligne de notes sur l’horloge du Worker et envoie chaque note au bus. Le panneau d’accords prend ses doigtés aux workers de recherche.',
    'Easy and Pro mode':
      'Un filtre du lecteur ne garde que les accords quand Easy est actif. Un morceau sans accords joue en entier.',
    'Song links':
      'Le menu construit une adresse de recherche sur chaque site à partir du nom du morceau. Le site s’ouvre dans un nouvel onglet ou le navigateur Android.',
    'Built-in songs admin':
      'La page d’admin et le téléphone du propriétaire écrivent les morceaux dans Cloudflare KV. La route du téléphone vérifie une clé de développeur et lance un déploiement via GitHub Actions.',
    Settings:
      'Redux Toolkit tient chaque réglage, et redux-persist le garde dans le navigateur. Le moteur lit une simple copie hors de React.',
    'Android updates':
      'Le build GitHub demande à GitHub Releases un APK plus récent au lancement et au retour. Un plugin natif le télécharge et ouvre l’installeur.',
    Ads: 'AdMob affiche la bannière et la pub plein écran dans les apps. Un achat Remove ads sur Google Play ou la clé de développeur du téléphone les coupe.',
    Languages:
      'i18next garde le texte de l’app dans 10 catalogues et suit la langue du téléphone ou du navigateur. Les pages de cours sont construites par langue sous leur propre chemin.',
  },
};

export default arch;
