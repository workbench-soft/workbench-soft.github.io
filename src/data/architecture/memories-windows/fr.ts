import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Un synchroniseur .NET dans Docker sur le NAS écrivait la date de prise de chaque photo dans un index LiteDB. Une app WPF dans la zone de notification de Windows cherchait dans cet index par date et ouvrait les fichiers depuis le NAS.',
  parts: [
    { name: '.NET', role: 'une seule plateforme pour le service du NAS et l’app Windows.' },
    { name: 'Docker', role: 'faisait tourner le synchroniseur sur le NAS, à côté des photos.' },
    { name: 'LiteDB', role: 'l’index des dates de prise, lu par la galerie jour après jour.' },
    { name: 'WPF', role: 'l’icône de notification, la galerie et la fenêtre photo sous Windows.' },
    { name: 'Quartz', role: 'le planificateur qui lançait le rappel du jour.' },
  ],
  flow: [
    'Le synchroniseur du NAS lisait l’EXIF de chaque photo.',
    'Il écrivait la date de prise dans l’index LiteDB.',
    'Une fois par jour une notification Windows appelait vers la galerie.',
    'La galerie cherchait les photos de la période dans l’index.',
    'Elle ouvrait les fichiers directement dans l’archive photo.',
  ],
  links: [{ to: 'memories', text: 'L’app pour téléphone l’a remplacée et a repris l’idée du « ce jour-là ».' }],
  design: {
    scale: [
      'Une personne et un PC Windows, qui lisent l’archive photo d’un NAS maison.',
      'L’index ne garde que les dates de prise de vue, donc il reste petit à côté des photos.',
    ],
    data: [
      'LiteDB, une base de documents embarquée, garde l’index des dates de prise de vue.',
      'Le synchroniseur lit l’EXIF de chaque photo, et la galerie ouvre l’index pour chaque jour de la période.',
    ],
    interfaces: [
      'Le synchroniseur du NAS et l’app Windows se retrouvent dans l’index LiteDB, lu par date.',
      'L’app ouvre les fichiers photo directement depuis l’archive du NAS, sans API serveur entre les deux.',
    ],
    reliability: [
      'Le synchroniseur tournait dans Docker à côté de l’archive, donc l’indexation n’avait pas besoin du PC.',
      'La galerie saute les fichiers de la corbeille et charge le reste au défilement.',
    ],
    security: [
      'Pas de compte ni de service cloud : photos et index restaient sur le NAS maison et le PC.',
      'L’app ouvre l’archive avec l’accès aux fichiers que le PC avait déjà.',
    ],
    performance: [
      'Les dates de prise de vue se lisent une fois sur le NAS, donc la galerie n’a pas à parcourir les photos.',
      'La galerie charge les photos au défilement, un jour de la période à la fois.',
    ],
    operations: [
      'Le synchroniseur était livré en conteneur Docker sur le NAS, et l’app en programme Windows.',
      'Le dépôt est archivé, car l’app du téléphone l’a remplacé.',
    ],
    tradeoffs: [
      '.NET pour les deux parties plutôt que deux piles, donc une seule plateforme couvrait le service du NAS et l’app Windows.',
      'Un index construit sur le NAS plutôt qu’un scan depuis le PC, donc les dates étaient prêtes à l’ouverture de la galerie.',
      'Remplacé par l’app du téléphone, qui lit le NAS en WebDAV et n’a pas besoin d’un PC Windows.',
    ],
  },
  features: {
    Tray: 'Une fenêtre WPF vit dans la zone de notification. Un clic ou le menu de l’icône ouvre la galerie.',
    'Daily reminder': 'Une tâche Quartz affiche une notification Windows avec un bouton. Ce bouton ouvre la galerie.',
    'Gallery by period':
      'La galerie ouvre l’index LiteDB pour chaque jour de la période. Elle saute les fichiers de la corbeille et charge le reste au défilement.',
    'Photo window':
      'Une fenêtre WPF montre une photo en grand. Une touche passe au fichier suivant ou précédent de la période.',
    'Details and map': 'L’app lit les données de l’appareil dans le fichier photo et montre son lieu sur une carte.',
    Send: 'Les fichiers choisis partent vers une autre app en une action.',
  },
};

export default arch;
