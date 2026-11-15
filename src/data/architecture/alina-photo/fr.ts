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
      'Le navigateur dessine le filigrane sur chaque épreuve avant l’envoi, et R2 garde les épreuves et les originaux. Le navigateur du client construit le zip des originaux avec client-zip.',
    Search:
      'Astro écrit le titre, la description, la carte photo et les données structurées dans chaque page au build. Le plan du site vient des pages construites.',
  },
};

export default arch;
