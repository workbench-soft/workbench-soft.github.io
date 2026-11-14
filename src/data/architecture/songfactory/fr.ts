import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Un outil Python en ligne de commande tourne sur le PC Windows avec ffmpeg et le GPU local. Il change un dossier de thème en vidéo YouTube, et une fenêtre de bureau ou Archon le pilote.',
  parts: [
    { name: 'Python et uv', role: 'la commande songfactory et ses modules, lancés avec uv.' },
    { name: 'ffmpeg', role: 'mixe les morceaux, boucle le clip et encode sur le GPU avec NVENC.' },
    { name: 'numpy et Apollo', role: 'reconstruisent la bande haute coupée par un encodeur avec perte.' },
    { name: 'Claude CLI', role: 'écrit les sujets, les paroles et le texte YouTube avec l’abonnement Claude.' },
    { name: 'Playwright', role: 'pilote le site Suno dans Chromium pour créer et télécharger les morceaux.' },
    { name: 'ComfyUI', role: 'dessine le clip de fond sur le GPU local à partir d’un prompt.' },
    { name: 'YouTube Data API', role: 'envoie la vidéo avec sa miniature, le label IA et l’heure de publication.' },
    { name: 'tkinter', role: 'la fenêtre de bureau qui nettoie ou améliore les morceaux choisis en 9 langues.' },
  ],
  flow: [
    'Les morceaux viennent d’un dossier de thème ou de la tuile Suno.',
    'ffmpeg nettoie chaque morceau et garde l’original.',
    'ffmpeg enchaîne les morceaux en fondu sur un clip en boucle.',
    'Le build écrit les chapitres, la description et la miniature.',
    'La YouTube Data API envoie la vidéo avec une heure de publication.',
  ],
  links: [
    { to: 'archon', text: 'L’onglet Songs d’Archon dessine les tuiles et lance chacune par la commande songfactory.' },
    { to: 'Suno', text: 'Suno crée les morceaux, et Playwright les télécharge.' },
    { to: 'YouTube', text: 'Les vidéos partent par la YouTube Data API, environ 6 par jour.' },
    { to: 'Claude', text: 'La Claude CLI écrit le texte avec l’abonnement et sans compte API.' },
  ],
  features: {
    'Audio workbench':
      'Une fenêtre tkinter lance la commande de nettoyage ou d’amélioration sur les fichiers choisis. Un contrôle des noms arrête le lot avant que deux sorties se heurtent.',
    'Tile pipeline':
      'Chaque projet garde ses 10 tuiles et leurs réglages dans un fichier JSON. Un lanceur donne à chaque tuile la sortie de la précédente, et Archon dessine les tuiles.',
    'Per-song videos':
      'Le module des clips reprend le thème, le nettoyage et l’encodeur pour une vidéo en boucle par morceau. Sur demande ffmpeg les relie en coupes franches.',
    'Install and check the setup':
      'Un script PowerShell installe mise, les outils figés et les paquets. Un module de contrôle vérifie chaque prérequis et dit quoi corriger.',
    'Long video from a playlist':
      'ffmpeg mixe les morceaux en fondu et répète le clip sur la durée du son. L’encodage passe par NVENC quand le GPU le permet.',
    'Cleanup of AI artifacts':
      'Une chaîne de filtres ffmpeg fixe un gain constant et retire le grondement, le souffle et le scintillement fort. La copie propre va dans un fichier FLAC à côté de l’original.',
    'Enhance a song':
      'numpy reconstruit la bande haute à partir de la bande du dessous. Le modèle Apollo sur le GPU peut faire ce travail à sa place, et une page montre les deux spectrogrammes.',
    'Seamless loop':
      'ffmpeg joue le clip à l’endroit puis à l’envers avant de boucler. Le saut entre la dernière et la première image disparaît.',
    'Chapters and thumbnail':
      'Les temps des chapitres viennent des durées des morceaux moins les fondus. Pillow écrit le titre sur une image du clip.',
    'Scheduled upload':
      'La YouTube Data API envoie la vidéo avec le label IA et une heure de publication. Le Planificateur de tâches de Windows lance le build quotidien à 03:00.',
    'Text from Claude':
      'La Claude CLI remplit le titre, la description et les tags vides à partir des noms des morceaux. Un fichier du dossier de thème garde la réponse pour le build suivant.',
    'Background from ComfyUI':
      'L’outil envoie le prompt à un workflow ComfyUI sur le GPU local. Le clip renvoyé devient le fond en boucle.',
  },
};

export default arch;
