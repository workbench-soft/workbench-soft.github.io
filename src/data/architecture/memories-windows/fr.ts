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
