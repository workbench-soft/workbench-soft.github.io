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
