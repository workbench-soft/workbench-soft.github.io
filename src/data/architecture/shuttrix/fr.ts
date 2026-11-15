import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Shuttrix est une app Expo dont les écrans en React Native reposent sur un module caméra en Kotlin, sur CameraX et Camera2. Chaque photo est construite et enregistrée sur le téléphone, sans serveur.',
  parts: [
    {
      name: 'Expo et React Native',
      role: 'l’écran caméra, les molettes, le mode simple, la galerie et les réglages en TypeScript.',
    },
    {
      name: 'CameraX et Camera2',
      role: 'CameraX gère le cycle de vie et les flux, avec les valeurs Camera2 pour les molettes manuelles.',
    },
    {
      name: 'Module caméra en Kotlin',
      role: 'branche les objectifs, applique les molettes et passe chaque photo enregistrée par les étapes du mode.',
    },
    {
      name: 'OpenCV',
      role: 'assemble le panorama, aligne la pile de mise au point macro et rend le flou du portrait.',
    },
    { name: 'ML Kit', role: 'lit les codes QR de l’aperçu et trouve le sujet du portrait.' },
    {
      name: 'ONNX Runtime',
      role: 'fait tourner sur le téléphone un modèle de profondeur pour le flou de Portrait et Mini.',
    },
    { name: 'Crate Rust photo', role: 'développe les images brutes du capteur en photo pour l’option Raw.' },
    {
      name: 'MediaStore',
      role: 'range chaque prise dans le dossier caméra, où Memories et les autres galeries la trouvent.',
    },
  ],
  flow: [
    'La personne choisit un mode et tourne une molette ou un curseur.',
    'L’écran passe les valeurs à la vue caméra en Kotlin comme props.',
    'CameraX et Camera2 les appliquent, et les molettes montrent les valeurs de chaque image.',
    'Un appui prend la photo, et les étapes du mode passent sur le fichier.',
    'MediaStore range le résultat dans le dossier caméra, et la galerie l’affiche.',
  ],
  links: [
    {
      to: 'memories',
      text: 'Shuttrix vit dans le dépôt de Memories et partage son éditeur, sa visionneuse et ses noms de lieux. Memories lit les prises dans le dossier caméra.',
    },
    { to: 'app-updater', text: 'WBS Updater installe le même APK depuis les versions communes.' },
    { to: 'GitHub', text: 'La version hors boutique trouve sa mise à jour dans les versions publiques.' },
    { to: 'Google Play', text: 'Google Play Billing vend Plus et Retirer les pubs.' },
    { to: 'Google AdMob', text: 'AdMob affiche la bannière de la galerie après le formulaire de consentement.' },
  ],
  design: {
    scale: [
      'Une personne par téléphone, sans serveur : chaque photo est construite et enregistrée sur le téléphone.',
      'Une photo Portrait coûte environ 7 s par 12 Mpx sur le processeur d’un Pixel 7 Pro, et le modèle de profondeur est un téléchargement de 26 Mo.',
      'Une photo fusionnée garde en mémoire 5 images pleine taille d’environ 18 Mo chacune.',
    ],
    data: [
      'Les réglages sont une valeur JSON dans les shared preferences d’Android, lue au premier rendu, donc la caméra s’ouvre comme on l’a laissée.',
      'Les prises sont des fichiers WebP, JPEG, PNG ou MP4 dans DCIM/Camera, listés par les lignes MediaStore que l’app possède. Le RAW ajoute un DNG.',
      'Le lieu, l’étalonnage de la balance des blancs et les valeurs en direct restent en mémoire tant que la caméra est ouverte.',
    ],
    interfaces: [
      'React Native passe les valeurs des molettes à la vue caméra Kotlin comme props, et le module renvoie les valeurs en direct 4 fois par seconde.',
      'CameraX gère le cycle de vie et les use cases, et l’interop Camera2 règle l’ISO, la vitesse, la distance de mise au point et les gains de balance des blancs.',
      'Les prises arrivent dans MediaStore sous DCIM/Camera, où Memories les lit, et l’app répond aux intents caméra d’Android.',
    ],
    reliability: [
      'Les molettes reviennent sur la caméra à chaque ouverture, depuis les réglages enregistrés.',
      'Un brouillon de 512 px s’affiche dans la galerie jusqu’à l’arrivée du fichier final.',
      'Un objectif sans l’extension Night passe à une cadence lente avec forte réduction du bruit, et CameraX prend la taille prise en charge la plus proche.',
    ],
    security: [
      'Les photos restent sur le téléphone. L’app n’a ni compte ni serveur à elle.',
      'La position n’est lue que pendant que la caméra est ouverte, et le lieu va dans les tags EXIF du fichier enregistré.',
      'AdMob demande le consentement dans la galerie à la première ouverture, pas au lancement, donc une photo rapide n’est pas retardée.',
    ],
    performance: [
      'Le zéro retard d’obturateur se déclenche au toucher, donc la prise garde l’instant de l’appui.',
      'Une photo simple demande une plage de 60 images, donc l’exposition auto garde 1/60 s ou plus court.',
      'Le flou du Portrait se rend sur une couche de 2048 px, et Enhance et Mini passent par le GPU.',
      'Un anneau garde les 5 dernières images pour la photo fusionnée et les 8 dernières images brutes pour le développement en Rust.',
    ],
    operations: [
      'Un push sur main lance les checks de la caméra et le build de release côte à côte, et release-gate.sh ne publie que si les checks passent.',
      'Les tags sont shuttrix-v avec une date, et l’APK va dans une release du dépôt public du site, où l’app et l’updater la trouvent.',
      'Le bundle Play se construit une fois par jour à 19:00 de Sydney si la caméra a changé, et le build Play garde un stub pour l’updater.',
      'Un workflow à part construit les bibliothèques ONNX Runtime et OpenCV et les publie en prerelease.',
    ],
    tradeoffs: [
      'Expo avec un module Kotlin sur CameraX plutôt que react-native-vision-camera, qui n’a ni distance de mise au point manuelle, ni ISO, ni vitesse, ni kelvin.',
      'Nuit par l’extension CameraX plutôt qu’en empilant des images en Kotlin, donc le pipeline du téléphone tourne et garde la balance des blancs et l’EV.',
      'Depth Anything V2 Small plutôt qu’un modèle plus grand pour sa licence Apache, avec un téléchargement de 26 Mo et environ 7 s par photo.',
      'Un monorepo avec Memories plutôt qu’un dépôt à part, pour partager l’éditeur et la visionneuse, au prix d’une CI par chemins.',
    ],
  },
  features: {
    'Simple and Pro':
      'Les 2 modes pilotent une seule vue caméra. Simple confie la mise au point et l’exposition à l’auto, et Pro les confie aux molettes.',
    'Simple mode':
      'React Native dessine les icônes d’objectif, la barre de zoom et les curseurs sur la vue caméra. Un magasin de réglages garde chaque valeur et la change en props de caméra.',
    Night:
      'Le module Kotlin lance l’extension Nuit de CameraX, qui est le traitement de nuit du téléphone. Un objectif sans elle reçoit une cadence lente et une forte réduction du bruit.',
    Astro:
      'Le module prend jusqu’à 24 images d’un quart de seconde et les aligne sur les étoiles. Une passe de tons retire ensuite la lueur du ciel et fait ressortir les étoiles.',
    Moon: 'Une rafale de 2,5 secondes garde les 8 images les plus nettes autour de la Lune et en fait la moyenne. Une seconde passe accentue la netteté et règle les niveaux.',
    'Long exposure':
      'Un flux d’images réunit 3 secondes d’images prises à main levée et les aligne. Le mélange garde l’image la plus nette là où la scène n’a pas bougé.',
    Portrait:
      'ML Kit trouve le sujet au point de mise au point, et un modèle de profondeur donne les distances. OpenCV rend ensuite le flou selon la profondeur sur le téléphone.',
    Mini: 'Un flou GPU recouvre la photo nette à travers un masque en dégradé, avec des couleurs plus fortes. Un seul filtre GPU donne le même rendu à l’aperçu et à la vidéo.',
    Macro:
      'L’app choisit l’objectif arrière qui fait la mise au point au plus près et calcule la largeur du cadre. Une pile de mise au point OpenCV fond 6 à 10 images en une photo nette.',
    Panorama:
      'Le capteur de rotation garde une image à chaque rotation suffisante du téléphone, jusqu’à 12. OpenCV les courbe sur un cylindre et assemble les bandes par points communs.',
    'Slow motion':
      'Une session haute vitesse de CameraX filme à la cadence fixe la plus élevée de l’objectif. CameraX écrit elle-même le MP4 ralenti.',
    'Time lapse':
      'Un second flux d’images envoie une image chaque demi-seconde à un encodeur H.264. Chaque image reçoit un horodatage fixe, donc la vitesse reste à 15 fois.',
    Lenses:
      'Le module lit chaque objectif et sa plage auprès de la caméra, et un seul facteur de zoom choisit l’objectif. Pour le selfie, les visages détectés règlent le cadrage.',
    Focus:
      'Le détecteur de visages de la caméra trouve les visages sur chaque image. Le module pointe la mise au point et la mesure sur le visage visé ou le point touché.',
    'White balance':
      'Camera2 règle les préréglages et les gains. Pour les kelvins, le module mesure chaque préréglage une fois par objectif et place la valeur entre les 2 plus proches.',
    Exposure:
      'Camera2 règle l’ISO et la vitesse à la main ou les laisse à l’exposition auto. L’objectif donne la plage de correction, et l’auto assombrit les scènes sombres jusqu’à 2 EV.',
    'Auto tune':
      'Une fonction pure lit la lumière mesurée et les kelvins de la balance des blancs auto. Elle rend les valeurs Lumière, Chaleur et Couleur pour la scène.',
    Color:
      'Camera2 n’a pas de réglage de saturation, donc une matrice de couleur réécrit chaque photo enregistrée. L’aperçu reçoit la même matrice en effet direct.',
    'Photo, video and flash':
      'CameraX déclenche la photo au toucher sans délai de déclenchement. Un appui long branche les flux vidéo, filme et remet ensuite les flux photo.',
    'Place and camera tags':
      'Le service de position d’Android garde un point frais tant que la caméra est ouverte. Une passe EXIF écrit ensuite le lieu, les molettes et le cap de l’objectif dans le fichier.',
    'Photo and video size':
      'Les réglages offrent 3 niveaux photo et 4 niveaux vidéo. CameraX se replie sur la taille la plus proche que l’objectif propose.',
    'Photo format and originals':
      'Un module de fichiers encode chaque photo en WebP, JPEG ou PNG et copie ses tags EXIF. Il peut garder l’original de la caméra et une copie Couleur seule, et RAW ajoute un DNG.',
    'Multi-frame photo':
      'Un anneau garde les 5 dernières images pleine taille pendant que la caméra tourne. Un appui fond les images d’avant le toucher, avec la plus récente comme référence.',
    'Enhance photos':
      'Avec Améliorer, un shader GPU éclaircit les ombres et ajoute couleur et netteté au JPEG enregistré. Sans lui, Camera2 demande une courbe sRGB simple quand la caméra le permet.',
    'Raw photo (beta)':
      'Une session Camera2 à part garde les 8 dernières images brutes du capteur. Un crate Rust les aligne et les fond, puis développe la photo sur le téléphone.',
    'QR codes':
      'Le lecteur ML Kit intégré lit chaque image de l’aperçu sur le téléphone. CameraX place le cadre de chaque code à l’écran pour les crochets.',
    Clock:
      'Une couche React Native dessine l’heure dans la bande laissée par la barre d’état cachée. Un minuteur part chaque minute, et les touchers passent jusqu’à l’aperçu.',
    Gallery:
      'La galerie liste les prises que l’app a enregistrées via MediaStore et regroupe les versions d’une photo. Le menu de partage d’Android envoie les fichiers choisis.',
    Plus: 'Google Play Billing vend l’achat unique, et l’app le vérifie à la première ouverture de la galerie. Un mode verrouillé ouvre la fiche Plus avec le prix de Google Play.',
    Ads: 'AdMob affiche une bannière sous la grille de la galerie et demande le consentement à la première ouverture. La même vérification Google Play la masque après Retirer les pubs ou Plus.',
    'Edit photos':
      'Le paquet d’éditeur partagé du dépôt de Memories tourne dans un composant Expo DOM. Le module Kotlin enregistre le résultat sur le fichier ou en nouveau JPEG, avec ses métadonnées.',
    'Quick start':
      'L’app répond aux intents caméra d’Android, donc un double appui sur le bouton marche l’ouvre. Une tuile de réglages rapides et une activité sur l’écran verrouillé l’ouvrent aussi verrouillé.',
    Updates:
      'Un paquet de mise à jour partagé vérifie les versions GitHub au lancement et à chaque retour. La version Google Play le remplace par un bouchon sans vérification.',
    Languages:
      'i18next garde un catalogue par langue, et un test vérifie chaque clé. Le module caméra garde le choix des réglages à côté des molettes.',
    'Light, blur and fonts':
      'L’éditeur partagé travaille sur les pixels finis, donc son flou suit une ellipse sans données de profondeur. Les réglages propres à la prise de vue restent dehors.',
    'iPhone app':
      'Un jumeau Swift du module caméra tourne sur AVFoundation avec les mêmes appels. Core Image fait les passes photo, et les modes construits prennent les images vidéo.',
  },
};

export default arch;
