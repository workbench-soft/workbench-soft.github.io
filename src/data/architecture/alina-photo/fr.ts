import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Un seul Cloudflare Worker en Rust sert les pages statiques Astro et l’API. D1 garde les réservations et les réglages, et R2 garde les photos.',
  parts: [
    { name: 'Astro', role: 'construit les pages statiques, les balises d’en-tête et le plan du site.' },
    { name: 'Rust Worker', role: 'répond à l’API des photos, réservations, connexions, galeries et du flux d’agenda.' },
    {
      name: 'booking-core',
      role: 'la crate Rust qui calcule les heures libres, le coucher du soleil et le texte iCal.',
    },
    { name: 'D1', role: 'garde la liste des photos, les réservations, les galeries, les réglages et les sessions.' },
    { name: 'R2', role: 'garde les photos réduites, les fichiers des galeries et une police importée.' },
    {
      name: 'Email Routing',
      role: 'envoie à Alina les réservations et les questions, et aux admins leurs liens de connexion.',
    },
    {
      name: 'Scripts du navigateur',
      role: 'réduisent, retouchent et filigranent les photos et construisent le zip sur l’appareil de la personne.',
    },
    {
      name: 'Google Agenda',
      role: 'son adresse iCal privée marque les heures prises, et il relit le flux des réservations.',
    },
  ],
  flow: [
    'Un client ouvre une page, servie en HTML statique par le Worker.',
    'La page demande à l’API du Worker des photos ou des heures libres.',
    'Le Worker lit D1 et l’agenda d’Alina, et booking-core trouve les heures libres.',
    'Une nouvelle réservation va dans D1 et à Alina par e-mail avec un fichier d’agenda.',
    'Les photos arrivent de R2 en 2 tailles.',
  ],
  links: [
    {
      to: 'Google Calendar',
      text: 'Les heures prises arrivent en iCal, en cache 5 minutes. Un flux privé renvoie chaque réservation.',
    },
    { to: 'Cloudflare', text: 'Fait tourner le Worker, D1, R2, Email Routing et la limite de débit des formulaires.' },
    { to: 'GitHub', text: 'Une version lance les migrations D1 et déploie quand les contrôles passent sur main.' },
  ],
  design: {
    scale: [
      "Le site de studio d'une photographe : les clients réservent et ouvrent des galeries, et Alina gère un espace d'administration. Le trafic est faible.",
      "Chaque photo est stockée en 2 tailles, 2400 px et 800 px, et un fichier d'appareil de 25 Mo est envoyé en moins de 1 Mo.",
      'Une requête du Worker a quelques millisecondes de CPU et le build wasm pèse environ 2,5 Mo, ce qui a poussé le travail lourd vers le navigateur.',
    ],
    data: [
      "D1 contient photos, bookings, settings, sessions, login_links, galleries et gallery_files. Les heures sont en texte UTC, donc l'ordre du texte est l'ordre du temps.",
      "Les lignes de settings sont du JSON sans version. Une ligne qui ne s'analyse plus retombe sur la valeur par défaut et journalise une erreur.",
      'R2 contient les photos en p/<id>/l.webp et s.webp, une police envoyée et les fichiers de galerie sous g/<gallery>/ : épreuve, vignette de 160 px et original.',
    ],
    interfaces: [
      "Le Worker sert du JSON sous /api pour les jours, les créneaux, les réservations, les photos, les galeries et la connexion, et un flux d'agenda sur /calendar/<token>.ics.",
      "L'agenda en entrée est l'adresse iCal secrète d'Alina, en cache 5 minutes. En sortie, c'est le flux des réservations, et chaque mail de réservation porte booking.ics.",
      "Le courrier part par la liaison send_email d'Email Routing, vers la seule adresse vérifiée d'Alina.",
      "booking-core est un crate Rust pour les créneaux, la revérification, l'heure du coucher du soleil et iCal, avec le crate rrule pour les événements répétés.",
    ],
    reliability: [
      'Un POST de réservation revérifie que le créneau est encore libre, donc un créneau pris après le chargement de la liste est refusé.',
      "Un flux d'agenda abonné retarde de plusieurs heures, donc chaque mail de réservation porte aussi le fichier iCal.",
      "Les sessions et liens de connexion expirés sont supprimés de D1, et un test enregistré garde lisibles les lignes de settings d'aujourd'hui.",
      "La release migre D1 puis déploie, et les délais d'attente de Cloudflare donnent 3 essais aux migrations et au déploiement.",
    ],
    security: [
      'La connexion est un lien envoyé par mail, valable 15 minutes. Il ouvre une page qui envoie le jeton en POST, car les scanners de courrier ouvrent les liens GET.',
      'Une session dure 30 jours dans un cookie HttpOnly et SameSite Lax, et D1 ne stocke que le hash du jeton.',
      "Une liaison de limite de débit de Workers autorise 5 appels par minute et par IP sur les formulaires de réservation et d'envoi de mail.",
      "L'identifiant de galerie est dans le hash du lien, donc hors des journaux du serveur et des referrers. Quiconque a le lien voit la galerie.",
    ],
    performance: [
      "Le navigateur réduit chaque photo en 2 tailles avant l'envoi, donc un fichier de 25 Mo part en moins de 1 Mo, sans données GPS.",
      'client-zip construit le zip de la galerie dans le navigateur, car le Worker ne peut pas lire des gigaoctets dans sa limite de CPU.',
      "Les pages sont du HTML Astro statique servi par le Worker, et le texte de l'agenda est en cache 5 minutes.",
    ],
    operations: [
      "Un seul Worker sert les pages et l'API. worker-build transforme le Rust en wasm, et mise fixe Rust, Node et pnpm.",
      'La release démarre sur workflow_run une fois Checks passé sur main, une exécution à la fois : build, migrations D1, déploiement, tag.',
      'Les migrations sont des fichiers SQL numérotés dans migrations/. Le lint couvre oxlint, oxfmt, tsc, knip, rustfmt, clippy pour le PC et pour wasm, et cargo shear.',
    ],
    tradeoffs: [
      "Un seul Worker pour les pages et l'API plutôt que GitHub Pages plus un Worker, pour que le cookie d'admin marche sur une seule origine sans CORS.",
      "Une connexion par lien de mail plutôt qu'un mot de passe ou Cloudflare Access, pour qu'Alina n'ait aucun mot de passe à oublier et qu'aucune configuration Zero Trust ne soit nécessaire.",
      "iCal en entrée et en sortie plutôt que l'API Google Agenda, pour éviter appli OAuth, validation et renouvellement de jeton, mais un flux retarde de plusieurs heures.",
      "Réduction, filigrane et zip dans le navigateur plutôt que dans le Worker, qui manque de CPU, au prix qu'une épreuve ne peut pas être refiligranée sans son fichier original.",
    ],
  },
  features: {
    Portfolio:
      'La page charge la liste des photos depuis le Worker, qui la lit dans D1. Chaque photo vient de R2 en 2 tailles WebP, 800 et 2400 px.',
    Booking:
      'booking-core en Rust calcule les heures libres à partir des horaires d’Alina, des réservations dans D1 et de son agenda. Il marque l’heure dorée d’après le coucher du soleil.',
    Questions:
      'Le formulaire va au Worker, qui écrit à Alina par Cloudflare Email Routing. Elle répond au client depuis cet e-mail.',
    Admin:
      'Le Worker envoie un lien de connexion par e-mail et garde la session dans D1. Les photos passent à 2400 px et perdent le GPS dans le navigateur avant d’aller dans R2.',
    'Calendar sync':
      'Le Worker lit l’adresse iCal privée du Google Agenda d’Alina et la garde 5 minutes en cache. Un flux privé et un fichier dans chaque e-mail de réservation renvoient les réservations.',
    Fonts:
      'Les 10 polices sont livrées avec le site, et une police importée va dans R2. Le Worker sert une feuille de thème selon le choix dans D1, en cache 1 minute.',
    'Client galleries':
      'Le navigateur dessine le filigrane sur un petit aperçu de chaque photo avant l’envoi, et R2 garde les aperçus, les originaux et les copies retouchées. Le Worker ne donne un original ou une copie retouchée qu’après la coche Payé, et seulement pour un fichier acheté. Le navigateur du client construit le zip des fichiers achetés avec client-zip.',
    Reviews:
      "Le Worker garde chaque avis dans D1 en attente, derrière un honeypot et une limite d'envois, et écrit à Alina. Seules les lignes validées sortent par l'API, et la page ajoute les données Review et AggregateRating.",
    Search:
      'Astro écrit le titre, la description, la carte photo et les données structurées dans chaque page au build. Le plan du site vient des pages construites.',
  },
};

export default arch;
