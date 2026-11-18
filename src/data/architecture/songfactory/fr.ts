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
  design: {
    scale: [
      "Un créateur sur un PC Windows avec un GPU. L'exécution quotidienne met en ligne environ 6 vidéos au plus.",
      'Chaque envoi coûte environ 1 600 des 10 000 unités de quota YouTube par jour, et ce quota fixe le plafond.',
      'Le GPU local produit environ 5 s de vidéo en 720p par exécution, donc chaque fond est un clip en boucle.',
    ],
    data: [
      "L'état tient dans des fichiers du dossier de thème : theme.toml garde les réglages, out/upload.json marque un thème comme fait, et out/claude.json garde le texte écrit par Claude.",
      'Un projet garde ses dix tuiles dans pipeline.json, chacune avec kind, enabled et params.',
      'Les chansons nettoyées vont dans out/clean/ en FLAC, et les originaux restent. Les secrets sont dans un dossier hors du dépôt.',
    ],
    interfaces: [
      "La CLI a les commandes bg, clean, build, upload, publish, run, enhance, clips et celles des tuiles. L'onglet Songs d'Archon lit songfactory project et lance songfactory tile.",
      'ffmpeg et ffprobe tournent comme sous-processus, et ComfyUI reçoit workflows/loop.json en HTTP avec le prompt et le seed renseignés.',
      "upload.py appelle videos.insert et thumbnails.set de l'API YouTube Data après une connexion OAuth pour application de bureau.",
      'progress.py imprime des lignes step, file i/n et progress NN% que le lanceur transforme en barres.',
    ],
    reliability: [
      "upload.json est écrit dès que YouTube renvoie l'identifiant de la vidéo, donc une miniature en échec ne provoque pas un second envoi.",
      "run saute les dossiers qui commencent par _ ou un point, et passe au thème suivant quand l'un échoue.",
      'claude.py est facultatif. Une CLI absente ou un appel en échec imprime une ligne, et le thème continue avec le nom du dossier comme titre.',
      'Une tuile désactivée transmet son entrée, et une tuile audio prend les fichiers de la tuile précédente la plus proche qui a tourné.',
    ],
    security: [
      'Le jeton OAuth de YouTube et les autres secrets sont dans un dossier hors du dépôt.',
      "claude -p tourne sans la variable de clé d'API, donc il facture l'abonnement connecté et aucun compte d'API.",
      "Les envois posent containsSyntheticMedia et restent privés tant que Google n'a pas audité le projet.",
    ],
    performance: [
      'h264_nvenc encode sur le GPU quand le PC en a un, et libx264 prend le relais sinon.',
      'Le clip boucle avec -stream_loop et un aller-retour, donc un clip de 5 s couvre une longue vidéo sans long rendu.',
      'Le nettoyage est un seul appel ffmpeg avec un gain fixe, highpass, afftdn et une coupure dynamique à 7 kHz, sans modèle neuronal.',
      'Un enhance par lot passe par un seul processus CLI, donc il écrit un seul compare.html pour toutes les chansons.',
    ],
    operations: [
      'Une tâche planifiée Windows lance mise run daily à 03 h 00 sur le PC qui garde les chansons, le jeton et le GPU.',
      'checks.yml lance lint, tests et uv build sur le runner Windows auto-hébergé à chaque push sur main.',
      'release.yml construit le wheel et le sdist à côté de Checks, et release-gate.sh publie une fois Checks passé. Un Checks en échec annule le build.',
      'mise run doctor imprime une ligne par prérequis, ok ou MISSING, et en JSON pour le lanceur.',
    ],
    tradeoffs: [
      "ffmpeg en ligne de commande plutôt qu'une bibliothèque vidéo Python, pour que le mixage, la boucle et l'encodage NVENC tiennent dans un seul outil, mais les graphes de filtres sont des chaînes et une faute ne se voit qu'à l'exécution.",
      "Un court clip en boucle plutôt qu'un clip aussi long que les chansons, puisque le GPU produit environ 5 s par exécution.",
      "De simples fichiers par thème plutôt qu'une base de données, pour qu'un fichier dise si un thème a été envoyé, mais déplacer un dossier perd son lien avec l'envoi.",
      "Le Planificateur de tâches local plutôt qu'un cron de CI, puisque les chansons et le jeton sont hors de git, mais le PC doit être allumé à 03 h 00.",
    ],
  },
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
    'ComfyStack video and robot pictures':
      'songfactory workflows sync appuie sur les boutons de téléchargement de comfystack.online avec Playwright et garde chaque workflow dans workflows/comfystack/, aux formats UI et API. comfy_graph.py remplit l’image, le morceau de chanson et le prompt selon le type de nœud, et pictures.py demande une couverture au robot aspirationstyle, puis passe au site suivant sur un 429 ou un 502.',
  },
};

export default arch;
