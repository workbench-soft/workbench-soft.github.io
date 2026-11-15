import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Une app Kotlin pour Android lit les versions publiques du studio sur GitHub et installe chaque APK via Shizuku. Elle n’a pas de serveur à elle.',
  parts: [
    {
      name: 'Kotlin et Android Views',
      role: 'un seul écran en Views simples, avec une carte par app et un tirage pour actualiser.',
    },
    { name: 'GitHub Releases API', role: 'la source du dernier APK de chaque app, avec ses notes et ses commits.' },
    {
      name: 'Shizuku',
      role: 'lance chaque installation en tant qu’utilisateur shell, donc Android n’affiche aucune demande.',
    },
    { name: 'Gestionnaire de paquets Android', role: 'donne le nom, le paquet et la version de chaque app installée.' },
    { name: 'Tournée de mise à jour', role: 'garde la file hors de l’écran et télécharge chaque APK par morceaux.' },
    {
      name: 'Shared preferences',
      role: 'gardent la dernière liste des versions et les noms de paquets appris pendant une tournée.',
    },
    {
      name: 'Catalogue du studio',
      role: 'un fichier JSON du site du studio avec le nom et les plateformes de chaque projet.',
    },
  ],
  flow: [
    'La personne ouvre l’app, y revient ou tire la liste vers le bas.',
    'L’app lit chaque page de versions sur GitHub, ou une liste de moins de 10 minutes.',
    'Elle relie chaque APK à une app installée par son nom ou son paquet.',
    'Le catalogue du studio nomme chaque carte et ajoute les projets sans APK.',
    'Un appui télécharge l’APK, et Shizuku l’installe sans demande.',
    'Le programme se met à jour en dernier, et le téléphone le rouvre.',
  ],
  links: [
    {
      to: 'GitHub',
      text: 'Le dépôt public commun des versions garde l’APK de chaque app, donc le téléphone n’a besoin d’aucun jeton.',
    },
    { to: 'Shizuku', text: 'L’app Shizuku donne l’accès à l’utilisateur shell qui installe et retire les apps.' },
    {
      to: 'Workbench Soft site',
      text: 'Le site construit le catalogue des apps à partir de sa propre liste de projets.',
    },
    { to: 'archon', text: 'Archon ne livre pas d’APK, donc sa carte porte un lien Ouvrir.' },
  ],
  design: {
    scale: [
      'Un seul écran sur le téléphone du développeur, avec une carte par app publiée du studio.',
      'L’API GitHub permet 60 appels par heure sans jeton, ce qui a fixé le cache de liste de 10 minutes.',
    ],
    data: [
      'Pas de base de données. Les shared preferences gardent la dernière liste de versions, avec notes et noms, et les noms de paquet appris pendant un passage.',
      'Une clé de ressource est le préfixe du tag plus le nom de l’APK sans version ni suffixe de plateforme, comme farnear/farnear.',
      'Les apps installées viennent du gestionnaire de paquets d’Android à chaque vérification.',
    ],
    interfaces: [
      'L’API GitHub Releases du dépôt public partagé liste chaque APK page par page, et l’API compare donne les notes de commits.',
      'Le site du studio sert un catalogue JSON avec le nom, les plateformes et le lien de chaque projet.',
      'Shizuku lance sh -c comme utilisateur shell, avec pm install -r -d -S et pm uninstall.',
    ],
    reliability: [
      'Si la vérification GitHub échoue, la liste enregistrée s’affiche, et une ouverture attend une minute avant de redemander.',
      'Le passage de mise à jour vit hors de l’activity, donc une rotation d’écran ne l’arrête pas, et Annuler stoppe avant le bloc suivant.',
      'Un build gênant n’est retiré qu’en cas de conflit de signature ou de version, et le code de sortie révèle une réinstallation ratée.',
    ],
    security: [
      'Elle lit seulement des versions publiques et ne garde ni jeton ni compte.',
      'Le droit d’installer vient de l’autorisation Shizuku que donne la personne, et l’app ne lance aucune commande root.',
      'L’installation d’elle-même vérifie la taille du fichier APK avant d’installer.',
    ],
    performance: [
      'Les APK se téléchargent par blocs de 64 Ko avec des délais et un contrôle d’arrêt.',
      'La liste des versions reste fraîche 10 minutes, donc la plupart des ouvertures évitent l’API.',
      'Les notes des cartes qui n’en ont pas se chargent en fond par l’API compare, après l’affichage des cartes.',
    ],
    operations: [
      'Checks lance ktlint, shellcheck, shfmt, actionlint, markdownlint, les tests unitaires et le build de debug sur un runner auto-hébergé.',
      'Release construit un APK signé à côté de Checks, et release-gate.sh le publie une fois les checks passés.',
      'La tâche pose un tag daté et crée une release de l’updater dans le dépôt public, en gardant les 3 dernières.',
    ],
    tradeoffs: [
      'Shizuku plutôt que l’installeur système, pour des installations sans demande, au prix d’un démarrage après chaque redémarrage.',
      'Des Views simples plutôt que Compose, pour un seul écran et l’API Java de Shizuku, au prix d’une mise en page à la main.',
      'Un dépôt public de versions plutôt que des dépôts privés d’apps, pour que le téléphone n’ait pas de jeton, au prix de la limite de 60 appels par heure.',
      'L’APK de l’updater s’installe en dernier, par une seule commande shell, car une installation peut tuer le processus en cours.',
    ],
  },
  features: {
    'Update all':
      'La tournée met en file chaque app en retard et la télécharge par morceaux de 64 Ko. Shizuku installe chacune en tant qu’utilisateur shell, et Annuler arrête avant le morceau suivant.',
    'Self update':
      'WBS Updater publie dans les mêmes versions sous son propre tag et s’installe en dernier. Une commande shell via Shizuku l’installe et rouvre l’app à la fin de l’ancien processus.',
    'Update one app':
      'Le bouton Mettre à jour d’une carte lance le même téléchargement et la même installation Shizuku pour un APK. Après un échec, le bouton reste pour réessayer.',
    'Install a missing app':
      'Un APK sans app installée correspondante reçoit un bouton Installer. Shizuku l’installe comme une mise à jour.',
    'App list':
      'Chaque APK publié reçoit une carte, reliée aux apps installées par le nom ou le paquet. Le catalogue du studio ajoute une carte avec un lien pour chaque projet sans APK.',
    'Saved list offline':
      'Les shared preferences gardent la dernière liste avec ses notes et ses noms. Un échec de GitHub affiche cette liste, et une ouverture dans les 10 minutes évite l’API.',
    'Shizuku setup':
      'Un module de réglage trouve l’étape Shizuku restante et ouvre Google Play ou l’app Shizuku pour elle. La mise à jour touchée part une fois l’accès accordé.',
    'Release notes':
      'L’app nettoie les notes de chaque version GitHub. Si elles sont vides, elle lit en arrière-plan les commits du lien de comparaison.',
  },
};

export default arch;
