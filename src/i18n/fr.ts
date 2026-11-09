import type { Catalog } from './types';

const fr: Catalog = {
  ui: {
    meta: {
      title: 'Workbench Soft : apps pour Android, le web, Windows et macOS',
      description:
        'Workbench Soft conçoit et publie des apps : {names} et des outils pour développeurs. Chaque projet avec chacune de ses fonctions.',
      org: 'Un studio logiciel qui crée des apps pour Android, iPhone, le web, Windows et macOS.',
    },
    nav: {
      services: 'Services',
      projects: 'Projets',
      process: 'Méthode',
      contact: 'Contact',
      main: 'Menu principal',
      search: 'Recherche',
      searchLabel: 'Rechercher des projets et des fonctions',
      language: 'Langue',
      skip: 'Aller aux projets',
      games: 'Jeux',
      gamesPanel: 'À propos des jeux',
      sites: 'Sites',
      clients: 'Nos clients',
    },
    hero: {
      status: 'Ouvert aux projets clients',
      lines: ['Nous concevons,', 'créons et livrons', 'des logiciels.'],
      lead: 'Workbench Soft est un studio indépendant. Il crée des apps pour Android, iPhone, le web, Windows et macOS, et mène chacune de la première spécification jusqu’au store, aux résultats de recherche et aux mises à jour qui suivent.',
      start: 'Lancer un projet',
      work: 'Voir les réalisations',
      projects: 'Projets',
      features: 'Fonctions livrées',
      code: 'Lignes de code',
      platforms: 'Plateformes',
      ads: 'Pubs sur ce site',
    },
    services: {
      title: 'Ce que le studio crée pour vous',
      intro:
        'L’équipe qui a livré les apps ci-dessous peut créer la vôtre. Chaque domaine renvoie aux projets qui le prouvent.',
    },
    projects: {
      title: 'Le travail, fonction par fonction',
      intro:
        'Chaque projet ci-dessous liste ce qu’il fait pour la personne qui l’utilise. Appuyez sur {key} pour chercher une fonction.',
      filter: 'Filtrer les projets',
      all: 'Tous',
      find: 'Trouver une fonction',
      index: 'Index des projets',
      features: 'Fonctions',
      platforms: 'Plateformes',
      stack: 'Technologies',
      shot: 'Écran {n} de {name}',
      more: 'Tout afficher ({n})',
      less: 'Afficher moins',
      openSource: 'Open source',
      source: 'Code source',
      kinds: {
        app: 'Apps pour tous',
        tool: 'Outils pour développeurs',
        client: 'Développement pour les clients',
        internal: 'Outils internes du studio',
        archive: 'Archives',
      },
    },
    process: {
      title: 'De la première spécification au store',
      intro:
        'Chaque projet ci-dessus a suivi les mêmes étapes. Un projet client les suit aussi, et le client voit chacune.',
    },
    contact: {
      title: 'Une idée d’app ?',
      intro: 'Dites au studio quoi construire : l’idée, les plateformes et l’échéance.',
      order: 'Commander une app',
      message: 'Ce qu’il faut construire',
      placeholder: 'Une app pour…, sur Android et le web, pour mars.',
      email: 'Votre e-mail, pour la réponse',
      name: 'Nom, si vous voulez',
      send: 'Envoyer la commande',
      sending: 'Envoi…',
      sent: 'Merci, la commande est arrivée au studio. La réponse viendra par e-mail.',
      failed: 'La commande n’est pas partie. Écrivez à {email}.',
      or: 'Vous préférez votre messagerie ? Écrivez à {email}',
      copy: 'Copier',
      copied: 'Copiée',
      subject: 'Un projet pour Workbench Soft',
    },
    palette: {
      results: 'Résultats',
      empty: 'Aucun résultat. Essayez un autre mot.',
      project: 'Projet',
      feature: 'Fonction',
    },
    footer: {
      noAds: 'Ce site n’affiche aucune publicité.',
      releases: 'Versions',
      privacy: 'Confidentialité Memories',
    },
    technologies: 'Technologies',
  },
  services: [
    {
      title: 'Apps mobiles',
      text: 'Apps Android et iPhone en React Native et Expo. Services en arrière-plan, mots d’activation, cartes, données hors ligne et achats intégrés. Publiées sur Google Play, ou en APK qui se met à jour seul.',
    },
    {
      title: 'Apps web et PWA',
      text: 'Apps Next.js, React et Astro qui s’installent sur l’écran d’accueil et s’ouvrent sans réseau. Hébergées sur Cloudflare Workers, avec des pages que les moteurs de recherche indexent.',
    },
    {
      title: 'Bureau et outils système',
      text: 'Apps natives en Rust et Tauri pour Windows et macOS. Hooks clavier, icônes dans la zone de notification, tri de fichiers avec annulation et installateurs qui se mettent à jour seuls.',
    },
    {
      title: 'Cartes, voix et audio',
      text: 'Cartes en direct avec guidage pas à pas. Mots d’activation et dictée hors ligne. Synthés, effets et MIDI dans le navigateur.',
    },
    {
      title: 'Lancement et croissance',
      text: 'Fiche et publication sur Google Play, Search Console, sitemaps et données structurées. AdMob et AdSense avec le message de consentement, puis un plan pour les premiers utilisateurs.',
    },
    {
      title: 'Ingénierie et outils IA',
      text: 'CI sur votre propre matériel, GitHub Actions partagées et des skills qui font suivre aux agents de code les règles d’une équipe, du ticket au merge.',
    },
  ],
  steps: [
    {
      title: 'Spécification',
      text: 'Chaque fonction commence par une spécification écrite dans le dépôt : ce qu’elle apporte à la personne, les parcours et les limites. Vous lisez et validez le même fichier.',
    },
    {
      title: 'Développement',
      text: 'Le travail se fait sur sa propre branche, avec sa base de données, son port et son émulateur. Chaque étape est un commit dont les vérifications passent.',
    },
    {
      title: 'Revue et livraison',
      text: 'Une pull request avec des schémas des parcours, puis la CI. Les vérifications au vert déclenchent le merge, et la doc change dans la même PR.',
    },
    {
      title: 'Lancement et suivi',
      text: 'Publication sur le store, référencement et mises à jour dans l’app. Le README, l’architecture et la doc des fonctions restent justes après chaque changement.',
    },
  ],
  projects: {
    memories: {
      tagline: 'Les photos de ce jour, depuis votre propre NAS.',
      lede: 'Memories montre ce jour dans les années passées, à partir des photos et vidéos d’un NAS à la maison. Il fonctionne comme les souvenirs de Google Photos, et les photos restent sur un matériel gardé chez soi.',
      links: ['Ouvrir le site'],
      groups: [
        {
          features: [
            [
              'Rappel quotidien',
              'Une notification à l’heure choisie donne l’année et le lieu, par exemple « Il y a 3 ans au Japon ». Les voyages à l’étranger passent en premier.',
            ],
            [
              'Aujourd’hui',
              'Ce mois et ce jour dans chaque année de la bibliothèque. Un appui sur la date choisit un autre jour.',
            ],
            [
              'Voyages',
              'Plusieurs jours de photos à l’étranger forment un voyage. Un lien ouvre ses photos du premier au dernier jour.',
            ],
            [
              'Photos',
              'Chaque photo et vidéo, les plus récentes d’abord, sous un titre par jour. Les archives listent chaque année et chaque mois avec un total.',
            ],
            [
              'Filtrer par lieu',
              'Chaque jour indique où il s’est passé. Une barre de filtres cherche des lieux et choisit des appareils.',
            ],
            [
              'Photos d’appareil et de drone',
              'Les prises d’un appareil photo ou d’un drone ont leur propre groupe à côté de celles du téléphone.',
            ],
            [
              'Pincer pour redimensionner',
              'Un pincement règle de 1 à 6 vignettes par ligne, pour chaque grille, et le réglage reste entre les lancements.',
            ],
            [
              'Envoi groupé',
              'Un appui long lance la sélection. Les photos choisies partent vers n’importe quelle app en un seul partage.',
            ],
            [
              'Liens d’album',
              'Les photos choisies deviennent un lien. L’autre personne ouvre l’album dans un navigateur, sans app ni compte.',
            ],
            [
              'Memories dans le navigateur',
              'Le NAS sert l’app aux ordinateurs du tailnet, avec toutes les photos, le tri et la retouche comme sur le téléphone.',
            ],
            [
              'Ranger',
              'Des cartes étape par étape trient les photos du téléphone, les déplacent dans des dossiers datés sur le NAS et libèrent le téléphone.',
            ],
            [
              'Trier sur le NAS',
              'Les fichiers choisis sur le NAS reçoivent leur nom et leur dossier datés, sur le NAS et dans l’index à la fois.',
            ],
            [
              'Visionneuse',
              'Photos et vidéos en plein écran, avec un balayage vers la suivante. Les vidéos se lisent directement depuis le NAS.',
            ],
            ['Connexion au NAS', 'L’app trouve le NAS sur le Wi-Fi. Une connexion ouvre le dossier photos en WebDAV.'],
            ['Loin de chez soi', 'Une deuxième adresse via Tailscale atteint le NAS sans l’ouvrir à internet.'],
            [
              'Progression de la synchro',
              'Une bannière indique ce que contiennent le téléphone et l’index du NAS, ce qui tourne et ce qui suit.',
            ],
            [
              'Données mobiles',
              'La première synchro en données mobiles demande d’abord. Un interrupteur dans les réglages change la réponse.',
            ],
            [
              'Index sur le NAS',
              'Un indexeur sur le NAS lit les photos sur son propre disque, bien plus vite qu’une synchro en WebDAV.',
            ],
            [
              'Changer de téléphone',
              'Le nouveau téléphone reprend l’index de l’ancien, au lieu d’une première synchro qui prend des heures.',
            ],
            ['Langue', 'L’app suit la langue du téléphone. Android 13 et plus la règlent par app.'],
            ['Clair et sombre', 'Suit le téléphone, ou un choix fixe dans les réglages.'],
            [
              'Retirer les pubs',
              'Un achat unique sur Google Play masque les pubs sur chaque téléphone avec le même compte Google.',
            ],
            [
              'Memories Pro',
              'Un achat de A$7.99 sur Android ouvre les personnes, les liens d’album, les doublons du NAS, l’édition et le dessin, et retire les pubs.',
            ],
            [
              'Tri sur ordinateur',
              "L'app de bureau range un dossier dans les mêmes dossiers par année, lieu et jours que le téléphone.",
            ],
            ['Archives', 'Chaque année et chaque mois avec le nombre de photos. Un appui ouvre tout le mois.'],
            ['Personnes', "Le NAS regroupe les visages des photos par personne, les personnes nommées d'abord."],
            [
              "Page d'avancement de l'index",
              "Une page sur le NAS montre où en sont la détection des visages et l'indexeur.",
            ],
            ['Albums sur une personne', "L'album d'un enfant s'ouvre comme un carnet, un chapitre par année d'âge."],
            ['Tourner une photo', 'Une photo couchée est redressée dans le fichier sur le NAS.'],
            [
              'Modifier une photo',
              'Memories et Shuttrix partagent le recadrage, la rotation, le dessin et les légendes. Sur Android, Enregistrer remplace le JPEG, PNG ou WebP ; Enregistrer une copie garde la source. Le navigateur télécharge une copie.',
            ],
            ['Dessiner une image', "Le pinceau d'Aujourd'hui ouvre une feuille vierge avec tous les outils."],
            [
              'Photos du téléphone',
              'Les photos du téléphone apparaissent dans chaque grille, et Ranger les envoie au NAS.',
            ],
            ['Réglages', 'Une ligne par section avec sa valeur : rappels, galerie, NAS, maison.'],
            ['Doublons sur le NAS', 'Les paires de même heure et même taille, côte à côte, pour jeter la copie.'],
            ['Mises à jour', 'La version hors store trouve, télécharge et installe sa nouvelle version.'],

            [
              'Lumière, flou et polices',
              'Exposition de −6 à +6 EV, teinte, ombres et hautes lumières. Flou de fond elliptique et effet de bascule avec zone nette réglable. Polices avec ou sans empattement et à chasse fixe. Les réglages de prise de vue sont exclus.',
            ],
          ],
        },
      ],
    },
    spotthecam: {
      tagline: 'Les radars d’Australie et de Nouvelle-Zélande sur une seule carte.',
      lede: 'SpotTheCam place les radars officiels des États australiens et de la Nouvelle-Zélande sur une seule carte. Chaque repère affiche la limite en vigueur à cet instant. L’app Android ajoute des alertes vocales, un journal de trajets et un guidage pas à pas.',
      links: ['spotthecam.com'],
      groups: [
        {
          title: 'Sur la carte, dans tout navigateur',
          features: [
            [
              'Limites en direct',
              'Chaque radar affiche la limite du moment. En zone scolaire, le chiffre suit les horaires de la zone.',
            ],
            ['Recherche par quartier', 'Tapez un quartier, et la carte vole vers ses radars.'],
            ['Types de radars', 'Un appui ne garde que les types utiles. Le navigateur retient le choix.'],
            ['Me suivre', 'La carte vous suit et tourne selon votre cap. Noms de rues et panneaux restent droits.'],
            [
              'Détails du radar',
              'Un repère ouvre le type, l’adresse, la limite actuelle et un lien vers la source officielle.',
            ],
            [
              'Hors ligne',
              'La liste des radars et chaque zone de carte ouverte restent sur l’appareil. Elle s’installe comme une app.',
            ],
            ['Carte claire et sombre', 'Auto suit l’appareil, ou choisissez dans le menu de l’engrenage.'],
            ['Langues', "La carte et l'app Android en 9 langues."],
            [
              'Pages du site et pub',
              'Pages À propos, Comment, Types, Sources et Conditions, une page par caméra, une bannière sous la carte.',
            ],
          ],
        },
        {
          title: 'App Android',
          features: [
            [
              'Badge de vitesse',
              'La vitesse et la limite apparaissent en voiture. La détection du train et de l’avion coupe les annonces routières. Les routes indiquées en mph gardent les miles par heure à l’écran et à la voix.',
            ],
            [
              'Alertes radar',
              'Un bip environ 20 secondes avant, puis « Radar devant. Limite 60. » Il arrive aussi sur l’écran verrouillé et signale un radar de l’autre côté de la route.',
            ],
            [
              'Au-dessus de la limite',
              '« Vous roulez à 72. Ralentissez. » Près des radars seulement, ou sur toute route.',
            ],
            [
              'Alertes fortes',
              'Volume maximal sur le haut-parleur du téléphone, même en silencieux ou avec le Bluetooth. Chaque partie a son interrupteur.',
            ],
            [
              'Journal de trajets',
              'Trajets et marches s’enregistrent seuls. Chaque trajet sépare les km en voiture et les km à pied. Chaque parcours montre votre vitesse à chaque radar, en vert ou en rouge. Vos vitesses restent sur votre téléphone.',
            ],
            [
              'Statistiques du trajet',
              'Vitesse moyenne et maximale, la part du trajet au-dessus de la limite et de combien, les radars passés trop vite et le temps perdu dans les bouchons. Un repère sur la carte montre chaque bouchon.',
            ],
            [
              'Partager un trajet',
              'Un lien montre le parcours dans tout navigateur. Arrêter le partage le supprime du serveur.',
            ],
            ['Distance', 'De grands chiffres donnent les km du trajet en cours et le total du jour.'],
            [
              'Guidage pas à pas',
              'L’ordre le plus rapide entre les arrêts, virages annoncés à 500 m et 200 m, selon le trafic du jour. Un mauvais virage donne un nouvel itinéraire.',
            ],
            [
              'Options d’itinéraire',
              'Aller-retour, à pied ou sans péages. Des favoris comme Maison s’ajoutent à l’itinéraire d’un appui.',
            ],
            [
              'Hey Spot',
              '« Hey Spot, go to Bondi Beach, Manly and back. » Un modèle hors ligne sur le téléphone entend les mots d’activation.',
            ],
            ['Écran allumé', 'La carte reste allumée sur le tableau de bord tant que l’app est ouverte.'],
            [
              'Mise à jour auto',
              'L’APK cherche une version plus récente sur GitHub, avec la taille, la progression et un bouton d’annulation.',
            ],
          ],
        },
      ],
    },
    'guitar-upscale': {
      tagline: 'Une guitare qui se joue dans le navigateur.',
      lede: 'Guitar Upscale montre gammes et accords sur un manche virtuel, enregistre des boucles et les sauve en MIDI. Il édite les morceaux note par note, les affiche en tablature et s’installe sur l’écran d’accueil. Sur écran tactile, balayez le panneau des accords vers la gauche pour passer au suivant, ou vers la droite pour revenir au précédent. Pendant la lecture, un petit diagramme au-dessus de chaque accord montre un doigté confortable pour la gamme, l’accordage, le capodastre et le nombre de cordes choisis.',
      links: ['guitar-upscale.com'],
      groups: [
        {
          features: [
            ['Manche', 'Le manche remplit l’écran, marque les notes de la gamme et joue chaque note touchée.'],
            [
              'Gamme, accordage et capodastre',
              'Un bouton nomme la tonalité et le mode, et ouvre le choix de la gamme, de l’accordage et du capodastre.',
            ],
            ['Accordeur', 'Écoute par le micro, avec un cadran qui grandit avec la fenêtre.'],
            [
              'Accords de la tonalité',
              'Un accord par note de la gamme, par exemple Em F#dim G Am Bm C D pour mi mineur.',
            ],
            ['Rythmique', 'Un accord tenu joue un motif en rythme avec l’horloge. Les motifs sont modifiables.'],
            [
              'Liste de morceaux',
              'Morceaux intégrés et les vôtres. Ceux qui vont avec la gamme actuelle s’affichent en vert.',
            ],
            ['Recherche vocale', 'Dites un titre. Les mots remplissent la recherche pendant que vous parlez.'],
            ['Hey Guitar', '« Hey Guitar, play Metallica One. » L’app répond « Listening » et le joue.'],
            [
              'Enregistrement MIDI',
              'Enregistre les notes et accords que vous jouez. Les notes jouées par l’app restent hors de la prise.',
            ],
            ['Looper', 'De courtes boucles sur plusieurs canaux jouent ensemble.'],
            [
              'Quantification',
              'Une durée de 1/1 à 1/64 règle la grille, l’enregistrement et le looper, comme dans Cubase.',
            ],
            [
              'Piano roll',
              'Dessinez, déplacez, étirez, copiez et effacez des notes. La règle marque couplet, refrain, pont et solo.',
            ],
            ['Vue tablature', 'Une piste en tablature façon Guitar Pro, avec une tête de lecture qui suit le morceau.'],
            [
              'Grille d’accords',
              'Les noms d’accords par mesure s’allument avec le morceau. Les paroles s’ouvrent sur Musixmatch.',
            ],
            ['Import de morceaux', 'Les fichiers Guitar Pro et MIDI rejoignent votre liste.'],
            [
              'Trouver un morceau en ligne',
              'Cherche sur 4 sites de morceaux à la fois. Un morceau Songsterr devient un fichier Guitar Pro.',
            ],
            ['Détection d’accords et de gammes', 'Jouez, et l’app nomme l’accord ou la gamme qu’elle entend.'],
            ['Instruments', 'Instruments séparés pour la mélodie et les accords : sitar, banjo, koto, cordes et plus.'],
            [
              'Effets',
              'Réverbération et délai, chacun avec son interrupteur et ses curseurs. Le son change pendant qu’un curseur bouge.',
            ],
            ['Export MIDI', 'Les fichiers se téléchargent, ou partent par le menu de partage.'],
            [
              'Guitar Upscale Pro',
              'Un achat Google Play ouvre l’enregistrement, le looper, l’import et la recherche de morceaux et les habillages sur Android, et retire les publicités. Sur le Web, toutes les fonctions sont ouvertes.',
            ],
            [
              'Installation et hors ligne',
              'Une PWA qui s’ouvre en plein écran en paysage. L’APK Android se met à jour seul.',
            ],
            ['Disposition', "Le manche prend tout l'écran, et les panneaux flottent sur ses coins."],
            ['Panneau de lecture', 'Joue ce qui est chargé, avance pas à pas, mélange les morceaux et les enregistre.'],
            ['Modes Easy et Pro', "Easy ne joue que les accords, pour qu'un débutant gratte avec."],
            [
              'Liens du morceau',
              "Un menu cherche le morceau ouvert sur des sites d'accords, de tabs, de vidéos et de paroles.",
            ],
            ['Gestion des morceaux', "Le propriétaire ajoute et retire les morceaux intégrés sur une page d'admin."],
            ['Réglages', 'La roue ouvre un tiroir, et chaque valeur survit au rechargement.'],
            ['Mises à jour Android', "L'APK de GitHub installe sa version plus récente. Play met à jour la sienne."],
            ['Publicité', "Des pubs jusqu'à l'achat de Remove ads. Le téléphone du développeur s'en passe."],
            ['Langues', 'Les écrans suivent le téléphone ou le navigateur, et les leçons existent en 10 langues.'],
          ],
        },
      ],
    },
    tickalot: {
      tagline: 'Listes de courses, de bagages et de visites partagées par lien.',
      lede: 'L’autre personne ouvre le lien et coche des éléments, et chaque coche apparaît aussitôt sur les deux téléphones. Aucune inscription. Les listes restent sur le téléphone, et une liste partagée va aussi dans le cloud.',
      links: ['tickalot.web.app'],
      groups: [
        {
          features: [
            [
              'Partage par lien',
              'Les deux téléphones voient chaque coche en direct. Les modifications faites hors ligne se synchronisent au retour du réseau.',
            ],
            [
              'Liste de base',
              'Ce que vous achetez d’habitude. Quelques appuis en font la liste de la semaine, avec quantités et notes.',
            ],
            [
              'Taper ou dicter plusieurs éléments',
              '« Croissants 2 paquets de 3, œufs bio » devient 2 éléments avec quantités. Anglais et russe.',
            ],
            ['Images', 'L’app choisit un emoji d’après le nom de chaque élément. Un appui ajoute une photo.'],
            [
              'Rayons du magasin',
              'Choisissez le magasin dans OpenStreetMap et tapez un rayon une fois. La liste suit ensuite votre parcours.',
            ],
            [
              'Rayons partagés',
              'Les rayons saisis par un client se remplissent pour chaque personne qui choisit le même magasin.',
            ],
            ['Prix Coles et Woolworths', 'Un prix unitaire sous chaque élément, le magasin le moins cher en vert.'],
            ['Bagages pour un voyage', 'Chaque voyage commence par une copie de votre liste de bagages habituelle.'],
            ['À voir', 'Des lieux tirés de Wikipédia, répartis sur les jours du voyage.'],
            ['Listes terminées', 'Une liste finie se range d’elle-même, sans ménage à la main.'],
            ['Clair et sombre', 'Suit le téléphone, ou un choix fixe.'],
            [
              'Mises à jour',
              'L’APK propose une version plus récente avec sa taille et un avertissement en données mobiles.',
            ],
            [
              'Publicité',
              'Un achat unique. Les personnes en Europe voient le formulaire de consentement avant toute pub.',
            ],
            ['Les courses de la semaine à deux', "L'un prépare la liste, l'autre la coche en rentrant."],
            ['Morceaux à apprendre', "Une liste de morceaux à la guitare, les plus voulus d'abord."],
            [
              'Modifier et supprimer',
              "Chaque champ s'enregistre seul, un appui coche, et une suppression propose Annuler.",
            ],
            ['Langues', "Une liste partagée s'ouvre dans la langue du téléphone qui l'ouvre."],
            ['Tick-a-Lot dans la recherche', "Des guides et une page d'accueil mènent de la recherche à l'app."],
          ],
        },
      ],
    },
    keeppad: {
      tagline: 'Des notes vocales qui démarrent quand vous dites « Hey Keep ».',
      lede: 'Dites « Hey Keep » et l’app répond « Enregistrement ». Elle transcrit ce que vous dites ensuite et range la note dans le bon groupe, app fermée et écran éteint.',
      links: ['keeppad.com'],
      groups: [
        {
          features: [
            ['Hey Keep', 'Un mot d’activation que le téléphone écoute en arrière-plan. « Эй, Кип » marche aussi.'],
            [
              'Stop et continuer',
              '« Stop » termine la note aussitôt. « Hey Keep, continue » complète la note la plus récente.',
            ],
            ['Enregistrer avec le bouton', 'Les mots s’affichent à l’écran pendant que vous parlez.'],
            ['Enregistrements', 'Sur Android 13 et plus et sur iPhone, une note garde son son.'],
            [
              'Groupes',
              'À faire, Courses, Idées, Travail et plus. L’IA sur l’appareil choisit le groupe sur les téléphones qui l’ont.',
            ],
            [
              'Langues',
              'Une note utilise l’une des langues ou les deux. Sur Android 14, une note peut changer de langue à une pause.',
            ],
            [
              'Partage par lien',
              'L’autre personne ouvre la note dans l’app ou un navigateur, et vous la modifiez à deux en direct.',
            ],
            [
              'Envoyer vers d’autres apps',
              'Les nouvelles notes partent vers Obsidian, Notion, Todoist, Google Docs ou OneNote.',
            ],
            ['Site web', 'Les notes partagées s’ouvrent dans un navigateur, à côté des guides et des politiques.'],
            ['Mise à jour dans l’app', 'L’APK trouve une version plus récente, la télécharge et ouvre l’installateur.'],
            ['Clair et sombre', 'Suit le téléphone, ou un choix fixe.'],
            ['Publicité', "Une bannière sur l'accueil, après accord en Europe."],
            ['Retirer la pub', 'Un achat unique masque la bannière sur chaque téléphone du compte.'],
            [
              'Son fort par le haut-parleur',
              'Les réponses et les enregistrements passent par le haut-parleur du téléphone à plein volume. Les réglages activent le Bluetooth ou le volume du téléphone.',
            ],
            [
              'Les notes sur une personne vont dans Memories',
              'Une note qui commence par le nom d’une personne de Memories rejoint son journal sur le NAS de la maison.',
            ],
            [
              'KeepPad Pro',
              'Un achat unique ouvre les nouveaux liens, l’envoi vers d’autres apps et vers Memories, et retire les pubs.',
            ],
          ],
        },
      ],
    },
    servohop: {
      tagline: 'Les prix du carburant en Australie sur une carte, avec l’historique de chaque station.',
      lede: 'ServoHop lit les relevés de prix des États et place chaque station sur une carte, colorée selon son prix. Il garde l’historique jour par jour et montre aussi les bornes de recharge. Il est gratuit et sans compte.',
      links: ['servohop.com'],
      groups: [
        {
          features: [
            [
              'Prix sur la carte',
              'Repères verts pour le tiers le moins cher, orange pour le milieu et rouges pour le plus cher.',
            ],
            [
              'Liste des stations',
              'Les stations visibles, les moins chères d’abord, avec enseigne, quartier et heure du dernier changement de prix.',
            ],
            [
              'Historique des prix',
              'La moyenne du jour sur une bande du plus bas au plus haut, sur 30, 90 ou 365 jours.',
            ],
            ['Relevés des conducteurs', 'Là où l’État ne publie rien, les conducteurs envoient le prix affiché.'],
            [
              'Bornes de recharge',
              'Réseau, prises et puissance maximale. Les conducteurs signalent le prix au kWh, et l’app garde son historique.',
            ],
            ['Pages pour la recherche', 'Une page par État, quartier et station, avec données structurées et sitemap.'],
            [
              'Textes et guides du site',
              'La page d’accueil explique la carte en mots, et des guides expliquent les prix, le dispositif de chaque État, les carburants et la recharge.',
            ],
            [
              'Mise à jour auto',
              'L’APK vérifie GitHub au lancement et à chaque retour, et montre le téléchargement dans l’en-tête.',
            ],
            ['Retirer les pubs', 'Un achat unique sur Google Play, restauré sur un nouveau téléphone.'],
            ['Panneau carburant', 'Choisir essence, diesel, gaz ou bornes, AC lente ou DC rapide.'],
            ['Publicité', "Une bannière sous la liste : AdMob dans l'app, AdSense sur le site."],
            ['Langues', 'Les écrans existent en 9 langues et suivent le téléphone ou le navigateur.'],
          ],
        },
      ],
    },
    consdr: {
      tagline: 'Leasing, crédit ou comptant : ce que coûte une voiture en Australie.',
      lede: 'Consdr montre le coût total d’une même voiture sur une même durée en novated lease, en crédit auto et au comptant. Chaque chiffre fixe du calcul renvoie à sa source.',
      links: ['consdr.com'],
      groups: [
        {
          features: [
            ['Trois options côte à côte', 'Leasing, crédit et comptant, chacun en un total pour toute la durée.'],
            [
              'Où va l’argent',
              'Chaque total se répartit entre la voiture, le financement, l’usage, les impôts et les intérêts perdus.',
            ],
            [
              'Réglages du leasing et du crédit',
              'Taux, valeur résiduelle, frais, carburant dans le leasing et exonération FBT.',
            ],
            [
              'FBT selon la voiture',
              'La règle pour une électrique, une hybride rechargeable ou une essence, selon la date de début et le prix.',
            ],
            [
              'Droits de timbre par État',
              'Les 8 États et territoires, d’après le prix, le type de voiture et la date de début.',
            ],
            [
              'Intérêts du compte',
              'L’argent grossit chaque mois sur un compte offset ou un compte épargne, pour une comparaison juste.',
            ],
            ['Emprunt immobilier', 'Combien une banque prêterait en moins tant que la voiture est remboursée.'],
            ['Calcul et sources', 'Chaque étape du calcul, avec une source pour chaque chiffre fixe.'],
            [
              'Questions fréquentes',
              'Réponses sur le leasing, l’exonération des électriques, les valeurs résiduelles et les prêts immobiliers.',
            ],
            [
              'Guides',
              'Des pages simples sur le novated lease, le FBT, la valeur résiduelle et les droits de timbre, avec des chiffres tirés des mêmes règles.',
            ],
            ['Saisies gardées', 'Un rechargement garde vos champs. Réinitialiser les vide.'],
            ['Hors ligne', 'Le calculateur s’ouvre sans réseau après la première visite.'],
            ['Thème de couleur', 'Auto, clair ou sombre.'],
            ['Retirer les pubs', 'Un achat unique dans l’app Android.'],
            [
              'Quelle durée de leasing coûte le moins',
              'La même voiture sur 1 à 5 ans, la durée la moins chère marquée.',
            ],
            [
              'Si vous quittez votre emploi',
              'Une date de départ donne le montant de rachat et quatre façons de sortir du leasing, chacune avec ce que vous payez et la perte.',
            ],
            ['Langue', 'Le calculateur en 9 langues, les montants en dollars australiens.'],
            ['Publicité', "Des blocs AdSense sur le site et une bannière AdMob dans l'app Android."],
            [
              'Pas de pub sur le téléphone du développeur',
              'Chaque version masque la bannière sur un téléphone avec la clé du développeur.',
            ],
          ],
        },
      ],
    },
    games: {
      tagline: 'Jeux de soirée dans le navigateur : dessiner, deviner, donner des indices.',
      lede: 'Workbench Games, ce sont trois jeux de soirée entre amis. Une personne crée un salon et envoie le lien, les autres rejoignent dans le navigateur, sans compte.',
      links: ['Tous les jeux', 'Devine le dessin', 'Téléphone dessiné', "Duel d'indices"],
      groups: [
        {
          features: [
            ['Salons par lien', 'Un lien réunit de 2 à 12 amis dans le même salon.'],
            [
              'Mode enfants',
              'Un enfant qui ne sait pas lire joue aussi : toucher un animal pour entrer, toucher une image pour deviner, entendre chaque mot lu à voix haute.',
            ],
            ['Devine le dessin', 'Dessine un mot, devine les dessins des autres, marque des points.'],
            [
              'Téléphone dessiné',
              "Une phrase devient des dessins puis revient, et l'album montre comment elle a changé.",
            ],
            ["Duel d'indices", 'Un jeu de mots en équipes où chaque indice est public et où voler rapporte.'],
            [
              'Outils de dessin',
              'Crayon, gomme, remplissage, 20 couleurs, 4 tailles et annulation, avec de grandes couleurs pour les petits doigts.',
            ],
            ['Langues', 'Les pages et les salons sont en anglais et en russe.'],
            ['Publicité', 'Les jeux restent gratuits, avec une bannière sur les pages, le salon et les résultats.'],
            ['Apps Android et iOS', 'Les mêmes jeux dans une app installée.'],
          ],
        },
      ],
    },
    langflip: {
      tagline: 'Corrige les mots tapés dans la mauvaise disposition de clavier.',
      lede: 'Tapez ghbdtn avec la mauvaise disposition, et Langflip tape « привет » à la place puis change la disposition. L’anglais marche pareil. Il tourne hors ligne et ne garde aucune trace de ce que vous tapez.',
      links: ['Télécharger'],
      groups: [
        {
          features: [
            [
              'Correction à la frappe',
              'Dès la 4e lettre, un mot qui n’a de sens que dans l’autre disposition y est retapé.',
            ],
            [
              'Mots courts',
              'Les mots de moins de 4 lettres changent sur Espace, Entrée ou Tab, seulement si l’autre disposition donne un vrai mot.',
            ],
            ['Chiffres gardés', 'ьз3 devient mp3.'],
            ['Annuler une correction', 'Pause juste après une correction rend le mot et le retient.'],
            ['Convertir à la main', 'Maj+Pause convertit le dernier mot dans l’autre disposition.'],
            [
              'Apps et champs ignorés',
              'Champs de mot de passe, fenêtres admin et toute app des réglages restent intacts.',
            ],
            [
              'Disposition sur l’icône',
              'La zone de notification affiche EN sur bleu ou RU sur rouge pour la fenêtre active.',
            ],
            ['Pause d’un clic', 'Un clic sur l’icône coupe la correction, et l’icône devient grise.'],
            ['Changer d’un double clic', 'Un double clic sur l’icône change la disposition de la fenêtre active.'],
            [
              'Lancement à l’ouverture de session',
              'S’active au premier lancement, avec un interrupteur dans le menu de l’icône.',
            ],
            ['Fichier de réglages', 'Apps exclues et mots à garder, dans un seul fichier TOML.'],
            ['Continuer un mot', 'Les lettres ajoutées comptent comme la suite du mot, dans sa langue.'],
            [
              "L'icône",
              "Un А et un Я bleu marine sur une carte holographique, sur l'exe, les raccourcis et les Paramètres.",
            ],
            ['Installer sous Windows', "Un double clic sur Langflip.cmd le compile et l'installe pour l'utilisateur."],
            ['Menu de la barre', "Un clic droit sur l'icône ouvre le menu."],
            ['Journal des décisions', 'Un fichier journal dit ce que Langflip a décidé pour chaque mot, et pourquoi.'],
            [
              'Mise à jour depuis GitHub',
              'Cherche une nouvelle version une fois par jour et se met à jour en un clic.',
            ],
          ],
        },
      ],
    },
    'media-organizer': {
      tagline: 'Range photos et vidéos dans des dossiers par date et par lieu.',
      lede: 'Une app de bureau qui lit quand et où chaque photo a été prise, puis la déplace dans un dossier d’année, de lieu et de jour. Elle partage les règles de dossiers de Memories, si bien que le téléphone et l’ordinateur trient pareil.',
      links: ['Installer'],
      groups: [
        {
          features: [
            ['Analyse', 'Liste chaque fichier du dossier choisi pendant qu’elle le parcourt.'],
            ['Dates de prise', 'Un ExifTool intégré lit la date, l’appareil et le GPS de chaque photo et vidéo.'],
            ['Lieux hors ligne', 'Le GPS devient un dossier de lieu sans réseau.'],
            ['Plan d’abord', 'L’app montre le nouveau dossier et le nom de chaque fichier avant tout déplacement.'],
            ['Déplacements', 'Les fichiers confirmés se déplacent, avec pause, reprise et nettoyage.'],
            ['Historique, annuler et rétablir', 'Chaque passage va dans un journal et se rejoue dans les deux sens.'],
            ['Réglages', 'Dossier de destination, renommer seulement, grouper par lieu et lieu du domicile.'],
            ['Tableau des fichiers', 'Lignes avec statuts, filtres, une carte des lieux et une barre d’état.'],
            [
              'Mise à jour auto',
              'Vérifie au lancement et au retour, montre le téléchargement, puis propose de redémarrer.',
            ],
            ['Installation en une commande', 'Une ligne PowerShell installe la dernière version, sans droits admin.'],
          ],
        },
      ],
    },
    'agent-skills': {
      tagline: 'Des skills qui font travailler un agent de code comme un studio.',
      lede: 'Des skills pour agents de code : écrire comme une personne, planifier dans une spécification, traiter un ticket, ouvrir une pull request et répondre à sa revue. D’autres auditent une app entière, ou mettent un site en ligne avec la recherche, les pubs et Google Play.',
      links: [],
      groups: [
        {
          features: [
            [
              'Écriture simple',
              'Des règles qui retirent le ton IA du chat, des commits, de la doc et des textes d’interface.',
            ],
            [
              'Spécification d’abord',
              'Chaque fonction commence par une spécification dans le dépôt, et le travail la suit.',
            ],
            [
              'Du ticket au merge',
              'Lit un ticket, le réalise dans son propre worktree, ouvre la PR et fait avancer le ticket.',
            ],
            ['Pull requests', 'Descriptions de PR courtes avec schémas des parcours, et un commit par fil de revue.'],
            ['Revue de code', 'Une revue sur checklist, chaque remarque vérifiée dans le code.'],
            [
              'Audit d’app',
              'Des relecteurs en parallèle par angle, comme la sécurité et la performance. Les remarques sûres sont corrigées.',
            ],
            ['Architecture et monorepos', 'Paquets en couches, contrats d’API partagés et CI par app.'],
            ['Lancement', 'Référencement, AdMob et AdSense, publication Google Play et plan marketing en un passage.'],
            ['Mises à jour dans l’app', 'Mise à jour auto pour les apps hors store, retirée du build Play.'],
            [
              'Entretien des dépôts',
              'Worktrees, déménagements de dépôts, remise à zéro de l’historique et rotation des secrets.',
            ],
            ['Noms et domaines', 'Vérifie un nom auprès des domaines, du registre des entreprises et des marques.'],
            ['Voix', 'Joue chaque voix de synthèse vocale, pour qu’une personne en choisisse une.'],
            [
              'Travail sur le code',
              'Des skills pour traiter un ticket, ouvrir une PR, répondre aux revues et relire une PR.',
            ],
            [
              'Mise en place',
              "Des skills pour planifier l'architecture, monter un monorepo et lancer les commandes via mise.",
            ],
            ["Icônes d'app", '10 icônes dans des styles adaptés, un choix dans le chat, puis toutes les tailles.'],
            [
              'Captures de démo et médias du store',
              'Des données de démo, des captures et des vidéos pour le README et le store.',
            ],
            [
              "Parcours complet d'une version",
              'Installe la dernière version, parcourt chaque flux principal et rend compte par flux.',
            ],
            [
              'Voix en fin de tour',
              "Une courte phrase dite à voix haute indique que l'agent a fini, attend ou demande.",
            ],
            ['Installation', 'Un seul clone relié à chaque agent de la machine. Une modification les atteint tous.'],
            ['Versions', 'Chaque push sur main qui passe les contrôles devient une version datée avec ses notes.'],
          ],
        },
      ],
    },
    'local-ci': {
      tagline: 'Un script prépare une machine de dev et en fait le runner CI.',
      lede: 'local-ci donne à un Mac ou un PC Windows les mêmes outils de dev, puis l’enregistre comme runner GitHub Actions auto-hébergé. La CI des dépôts privés tourne alors sur cette machine, sans frais.',
      links: [],
      groups: [
        {
          features: [
            ['Préparation du Mac', 'Outils Homebrew, mise, le shell et la config git en un passage.'],
            ['Préparation de Windows', 'Les mêmes outils via winget. Un deuxième passage saute ce qui est en place.'],
            ['Runner auto-hébergé', 'La machine exécute les jobs CI des dépôts de l’organisation.'],
            ['Bouton de démarrage', 'Un double clic lance la dernière version de la CI.'],
            ['Page d’état CI', 'Une page locale montre le runner et les jobs d’un coup d’œil.'],
            [
              "Runners cloud d'abord",
              "Les jobs tournent sur des runners cloud gratuits tant qu'il reste des minutes, puis sur ce PC.",
            ],
            [
              'Versions',
              'Lancez une release d’app sur la CI, compilez localement les APK Android pris en charge depuis le dernier main et installez les APK publiés ou locaux sur un téléphone connecté avec ADB.',
            ],
            ['Se met à jour seul', 'Le PC installe chaque version quelques minutes après la fusion.'],
          ],
        },
      ],
    },
    'alina-photo': {
      tagline: 'Portfolio et réservation pour une photographe de famille à Sydney.',
      lede: 'Un site pour Alina, photographe de famille et de grossesse. Les clients parcourent ses galeries, réservent une séance sur place à une heure libre et reçoivent leurs photos par un lien privé.',
      links: [],
      groups: [
        {
          features: [
            ['Portfolio', 'Des galeries par type de séance, avec une vue plein écran et le balayage.'],
            ['Réservation', 'Choisir une séance, un jour et une heure libre. Les heures dorées portent un soleil.'],
            ['Questions', 'Un court formulaire pour qui n’est pas prêt à réserver, avec réponse par e-mail.'],
            [
              'Administration',
              'Connexion par lien e-mail, envoi et retouche des photos, confirmation des réservations, horaires et formules.',
            ],
            [
              'Synchronisation du calendrier',
              'Les créneaux occupés de Google Agenda bloquent les réservations, et un flux montre chaque réservation.',
            ],
            ['Galeries clients', 'Un lien privé avec des épreuves filigranées, puis tous les originaux en un ZIP.'],
          ],
        },
      ],
    },
    aspirationstyle: {
      tagline: 'Site portfolio et de commande pour une architecte d’intérieur.',
      lede: 'Le site de Maria Shilova, architecte d’intérieur. Les visiteurs parcourent ses intérieurs et commandent un projet, et Maria gère les galeries et dessine des intérieurs avec l’IA dans son propre espace admin.',
      links: ['aspirationstyle.ru'],
      groups: [
        {
          features: [
            [
              'Portfolio',
              'Galeries d’intérieurs, d’objets, de matériaux et de décor, avec un filtre et une vue plein écran.',
            ],
            [
              'Commander un projet',
              'Un formulaire sur l’accueil, chaque galerie et Contacts envoie la demande à Maria par e-mail.',
            ],
            ['Admin', 'Maria se connecte avec un code reçu par e-mail et ajoute galeries, photos et textes.'],
            [
              'Polices',
              'Elle choisit la police des titres et du texte parmi 10 polices libres avec le cyrillique, ou importe la sienne.',
            ],
            [
              'Générateur IA',
              'Dessine un intérieur à partir d’une demande en russe, d’un style et d’une photo de la pièce.',
            ],
          ],
        },
      ],
    },
    'app-updater': {
      tagline: 'Met à jour chaque app Workbench Soft du téléphone en un geste.',
      lede: 'Une app Android liste chaque app Workbench Soft avec sa version installée et la plus récente, puis installe chaque nouvelle version via Shizuku sans confirmation.',
      links: [],
      groups: [
        {
          features: [
            [
              'Tout mettre à jour',
              "Un geste télécharge et installe chaque nouvelle version, avec une barre par app et une pour l'ensemble. Annuler l'arrête.",
            ],
            [
              'Se met à jour lui-même',
              "WBS Updater publie ses propres versions, s'installe en dernier de la passe et le téléphone le rouvre sur la version nouvelle.",
            ],
            ['Mettre à jour une app', 'Un bouton Mettre à jour à côté de chaque ligne ne met à jour que cette app.'],
            ['Liste des apps', 'Chaque app indique si elle est à jour ou quelle version arrive.'],
          ],
        },
      ],
    },
    ci: {
      tagline: 'Des étapes GitHub Actions partagées pour chaque dépôt.',
      lede: 'Un correctif ici atteint chaque dépôt à sa prochaine exécution.',
      links: [],
      groups: [
        {
          features: [
            [
              'Étape d’installation',
              'Installe les outils qu’un dépôt fixe dans mise, puis ses paquets depuis le lockfile.',
            ],
            ['Détails Dependabot', 'Garde le type de mise à jour de chaque PR Dependabot pour le job de merge.'],
            [
              'Merge auto',
              'Fusionne une PR Dependabot une fois chaque vérification passée. Une mise à jour majeure attend une personne.',
            ],
            ['Versions', 'Chaque push sur main qui passe les contrôles devient une version datée avec ses notes.'],
          ],
        },
      ],
    },
    'git-aliases': {
      tagline: 'Des alias git courts, prêts pour toute machine.',
      lede: 'Chaque alias est un petit script dans un seul dépôt, donc les mêmes commandes marchent sur chaque machine.',
      links: [],
      groups: [
        {
          features: [
            ['git a', 'Liste chaque alias avec ce qu’il fait.'],
            ['git sb', 'Choisit une branche par recherche floue et passe dans son worktree.'],
            ['git db', 'Choisit les branches à supprimer par recherche floue.'],
            [
              'Installateurs prudents',
              'Ils demandent avant chaque changement et sauvegardent chaque fichier qu’ils modifient.',
            ],
            ['Hook de lint', 'Chaque commit dans le dépôt lance le lint.'],
            [
              'Revenir à la branche par défaut',
              'git m récupère et fait un reset dur vers la branche par défaut du remote.',
            ],
            ['Versions', 'Chaque push sur main qui passe les contrôles devient une version datée avec ses notes.'],
          ],
        },
      ],
    },
    'gh-review-notify': {
      tagline: 'Une notification Mac pour chaque revue de vos pull requests.',
      lede: 'GitHub envoie les revues par e-mail, alors une validation peut attendre des heures. Cet outil vérifie toutes les 3 minutes et affiche une notification. Un clic ouvre le commentaire.',
      links: [],
      groups: [
        {
          features: [
            ['Revues et commentaires', 'Chaque revue et commentaire sur vos PR ouvertes, en moins de 3 minutes.'],
            ['Demandes de revue', 'Une notification quand quelqu’un vous demande nommément une revue.'],
            ['Rafales de commentaires', 'Plus de 4 nouveaux commentaires sur une PR arrivent en 1 notification.'],
            [
              'Premier passage silencieux',
              'Le premier passage enregistre les 3 derniers jours sans en afficher aucun.',
            ],
            ['Filtre des bots', 'Les commentaires de bots restent muets, sauf si vous les activez.'],
            ['État et test', 'Une option affiche l’état, une autre envoie une notification de test.'],
            ['Versions', 'Chaque push sur main qui passe les contrôles devient une version datée avec ses notes.'],
          ],
        },
      ],
    },
    'site-sources': {
      tagline: "Une extension Chrome qui enregistre les sources de n'importe quelle page dans un seul zip.",
      lede: "Appuyez sur Télécharger dans sa fenêtre et regardez la barre avancer. La page, chaque fichier chargé et le code d'origine des source maps arrivent dans un zip dans Téléchargements.",
      links: [],
      groups: [
        {
          features: [
            [
              'Télécharger depuis la fenêtre',
              "L'icône ouvre une fenêtre avec le site et un bouton Télécharger. Le travail continue quand elle se ferme.",
            ],
            [
              'Barre de progression',
              'Compte les fichiers trouvés, puis se remplit avec 12 sur 40 téléchargés et les échecs.',
            ],
            ['Un seul zip', 'Le HTML en direct et chaque script, style, image et police, rangés comme sur le serveur.'],
            ["Sources d'origine", 'Chaque source map avec son code rend les fichiers .ts, .tsx ou .vue.'],
            ['Langues', 'La fenêtre suit la langue de Chrome.'],
          ],
        },
      ],
    },
    'open-in-remote-repo': {
      tagline: 'Une extension VS Code qui ouvre un fichier sur GitHub, GitLab ou Bitbucket.',
      lede: 'Un fork de Open in GitHub de Stanislav Sysoev. Il ouvre ou copie le lien vers le fichier, son blame ou son historique, avec les lignes choisies marquées.',
      links: ['Marketplace'],
      groups: [
        {
          features: [
            ['Fichier, blame et historique', 'Ouvre chacun sur l’hôte distant, avec les lignes choisies.'],
            ['Copier un lien', 'Les mêmes liens vont dans le presse-papiers, avec un avis qui montre l’URL.'],
            ['Depuis l’explorateur', 'Un clic droit sur un fichier ou un dossier ouvre ou copie son lien.'],
            ['Main ou master d’abord', 'Les liens pointent vers une branche qui contient déjà le fichier.'],
            ['Hôtes et URL personnalisées', 'GitHub, serveurs GitHub, GitLab, Bitbucket et Bitbucket Server.'],
            ['Langues', "Commandes, réglages et messages suivent la langue d'affichage de VS Code."],
          ],
        },
      ],
    },
    archon: {
      tagline: 'Le lanceur du studio qui confie le travail aux agents de code.',
      lede: 'Archon réunit tout le dossier de travail dans une fenêtre. Il ouvre chaque app sur le téléphone ou le PC, confie des tâches à Claude Code dans une console par dépôt et montre ce qui tourne en ce moment.',
      links: [],
      groups: [
        {
          title: 'Sur chaque page',
          features: [
            ['Demander à Archon', 'Une commande dite ou tapée choisit l’outil et ouvre son onglet.'],
            ['Bande des tâches', 'Chaque tâche en cours, avec le temps écoulé et le temps restant.'],
          ],
        },
        {
          title: 'Chaque jour',
          features: [
            ['Apps', 'Installer, mettre à jour et ouvrir chaque app sur le téléphone, la TV ou le PC.'],
            ['Pubs sur ce téléphone', 'Cache les pubs ou montre des pubs de test, dans toutes les apps ou une seule.'],
            ['À faire', 'Les points ouverts de chaque TODO.md partent vers un agent en un clic.'],
            ['Sessions', 'Les sessions d’agent arrêtées trop tôt reprennent d’une case cochée.'],
          ],
        },
        {
          title: 'Dépôts',
          features: [
            ['Agents', 'Cochez des dépôts, choisissez une tâche comme un audit, chacun reçoit une console.'],
            ['Docs', 'Le README, les docs et les specs de chaque dépôt, avec les schémas dessinés.'],
            ['Règles', 'Les règles que lit chaque agent, et les manques de chaque dépôt.'],
            ['Branches', 'Chaque branche et worktree, à garder, fusionner ou supprimer.'],
            ['Paquets', 'Chaque paquet avec sa dernière version, mis à jour par un agent.'],
          ],
        },
        {
          title: 'Services et réglages',
          features: [
            ['CI, Reddit et Memories', 'Les pages de la CI, de Reddit Desk et de l’indexeur du NAS en onglets.'],
            [
              'Chansons',
              "La chaîne de songfactory en tuiles : activez-les, réglez-les, lancez-en une seule ou faites toute une vidéo à partir d'un thème.",
            ],
            ['Voix', 'Choisit la voix de chaque agent.'],
            ['Clés', 'L’âge de chaque secret de CI, et son renouvellement par un agent.'],
          ],
        },
      ],
    },
    'agent-skills-private': {
      tagline: 'Les règles et skills de l’organisation, par-dessus Agent Skills.',
      lede: 'Les skills liés à l’organisation workbench-soft. Ils déplacent des dépôts, installent la CI, renouvellent les secrets et font que chaque session d’agent planifie, livre et rend compte de la même façon.',
      links: [],
      groups: [
        {
          features: [
            [
              'Déplacer un dépôt',
              'Déplace un dépôt dans l’organisation et le rend privé, avec une CI qui reste gratuite.',
            ],
            [
              'CI et releases pour chaque dépôt',
              'Vérifie Checks et Release dans chaque dépôt et ajoute ceux qui manquent.',
            ],
            ['Réécrire un dépôt', 'Nouveaux noms, dossiers et docs, pour le même comportement.'],
            ['Renouveler les secrets', 'Renouvelle les secrets de CI et les clés, app par app.'],
            ['Règles de travail', 'Une spec d’abord, une fusion tout de suite, un test groupé ensuite.'],
            ['Releases', 'Une release datée pour chaque push vert sur main.'],
            [
              'File des fonctionnalités',
              'Les sessions sur une même app se relaient sur les fichiers partagés, puis une seule version sort.',
            ],
          ],
        },
      ],
    },
    'memories-demo-webdav': {
      tagline: 'Un NAS d’exemple avec des photos pour la revue Google Play.',
      lede: 'Un serveur WebDAV avec des photos d’exemple, pour qu’un relecteur Google Play se connecte à Memories sans NAS à lui. Il tourne comme Cloudflare Worker sur l’offre gratuite.',
      links: [],
      groups: [
        {
          features: [
            [
              'Bibliothèque d’exemple',
              '42 photos et 2 vidéos de 2015 à 2025, certaines avec des repères sur la carte.',
            ],
            ['Connexion', 'Un identifiant de relecteur, comme le demande un vrai NAS.'],
            ['Envois et tri', 'Envois et déplacements marchent, une tâche de nuit les efface.'],
          ],
        },
      ],
    },
    'memories-windows': {
      tagline: 'Le premier Memories : une app dans la zone de notification et un service de synchro sur le NAS.',
      lede: 'Un service dans Docker sur le NAS lisait la date de chaque photo dans une base par jour. L’app Windows attendait dans la zone de notification et ouvrait les photos prises ce jour-là. L’app mobile l’a remplacée.',
      links: [],
      groups: [
        {
          features: [
            ['Zone de notification', 'L’app attend dans la zone de notification. Un clic ouvre la galerie.'],
            ['Rappel quotidien', 'Une fois par jour, une notification vous appelle vers les photos du jour.'],
            [
              'Galerie par période',
              'Choisissez un jour ou une plage d’années, et les photos se chargent au défilement.',
            ],
            ['Fenêtre photo', 'Une photo en grand, la suivante et la précédente à une touche.'],
            ['Détails et carte', 'Les infos de l’appareil et le lieu sur une carte.'],
            ['Envoyer', 'Les photos choisies partent en une action.'],
          ],
        },
      ],
    },
    shuttrix: {
      tagline: 'Un appareil photo aux molettes de reflex, avec un mode simple à grands curseurs.',
      lede: 'Shuttrix est un appareil photo Android en 2 modes. Le mode simple a de grands curseurs avec Nuit, Portrait, Pose longue et Panorama, et Pro met objectif, mise au point, balance des blancs, ISO et vitesse sur des molettes.',
      links: [],
      groups: [
        {
          features: [
            [
              'Simple et Pro',
              "Un bouton en verre en haut choisit le mode. Une nouvelle installation s'ouvre en simple.",
            ],
            [
              'Mode simple',
              "Des pastilles d'objectif sur un curseur de zoom, puis Lumière, Chaleur et Couleur. Les modes sont en haut, et le déclencheur reste seul sous le pouce.",
            ],
            ['Nuit', "Le téléphone compose la photo à partir de plusieurs images pendant qu'une barre avance."],
            [
              'Astro',
              'Le ciel nocturne à main levée : étoiles nettes, Voie lactée et ciel sombre au lieu de gris ou orange.',
            ],
            [
              'Lune',
              'Zoom 10x et exposition pour la Lune : les mers et les cratères apparaissent, pas une tache blanche.',
            ],
            ['Pose longue', "Floute ce qui bouge : eau soyeuse, traînées de phares, foule qui s'efface."],
            [
              'Portrait',
              'Ce que vous touchez reste net, proche ou à 10 m, personne ou objet. Le reste devient doux, un curseur règle le flou.',
            ],
            [
              'Macro',
              'Un insecte ou une goutte à 2 ou 3 cm, aussi grand que le téléphone le permet, avec la largeur du cadre en mm.',
            ],
            ['Panorama', "Une photo large d'un lent pivot, assemblée sur le téléphone."],
            ['Ralenti', 'Une vidéo à 120 ou 240 images par seconde, lue au ralenti.'],
            ['Accéléré', 'Une image chaque demi-seconde, lue 15 fois plus vite : nuages, couchers de soleil, foules.'],
            [
              'Objectifs',
              "Une pastille par objectif du téléphone, sur une seule échelle de zoom. En selfie, le zoom s'ajuste aux personnes du cadre.",
            ],
            [
              'Mise au point',
              "L'AF-C suit un sujet en mouvement et les visages. Un appui vise un point, et le réticule se déplace au doigt.",
            ],
            ['Balance des blancs', 'Auto, préréglages ou kelvins sur une molette.'],
            [
              'Exposition',
              'ISO et temps de pose automatiques ou manuels. Lumière et EV utilisent toute la plage de correction de la caméra. Auto assombrit davantage les scènes sombres.',
            ],
            [
              'Réglage auto',
              'Un bouton du mode simple, ou un toucher sur l’aperçu, règle Lumière, Chaleur et Couleur pour la scène.',
            ],
            ['Couleur', 'Une seule saturation pour la molette COLOR et le curseur Couleur.'],
            [
              'Photo, vidéo et flash',
              'Photo déclenche au toucher sans attente supplémentaire de mise au point ni rafale ultérieure. Flash, RAW et repli matériel peuvent capturer plus tard. Maintenir lance une vidéo.',
            ],
            ['Lieu et réglages', 'Chaque prise garde où et comment elle a été faite, en balises EXIF.'],
            ['Taille des photos et vidéos', 'Les réglages choisissent la taille des photos et des vidéos.'],
            [
              'Photo multi-images',
              'Une photo normale fusionne 6 images rapides en une, avec moitié moins de bruit et des bords plus nets.',
            ],
            [
              'Améliorer les photos',
              'Enhance renforce couleurs, netteté et ombres. Désactivé, il laisse une courbe sRGB fixe aux caméras ordinaires compatibles. Le mode Nuit et les autres caméras gardent leur traitement.',
            ],
            ['Codes QR', "Un code dans l'aperçu reçoit un cadre et une pastille pour l'ouvrir."],
            ['Horloge', 'L’heure en haut à gauche, à la place de l’horloge du téléphone, loin des commandes.'],
            [
              'Galerie',
              'Partager ensemble les photos et vidéos sélectionnées. La miniature de la caméra se recharge après une suppression dans la galerie.',
            ],
            ['Publicités', 'Une bannière sous la grille de la galerie. Un achat unique la retire.'],
            [
              'Redresser et pivoter',
              'Memories et Shuttrix partagent le recadrage, la rotation, le dessin et les légendes. Sur Android, Enregistrer remplace le JPEG, PNG ou WebP ; Enregistrer une copie garde la source. Le navigateur télécharge une copie.',
            ],
            ['Démarrage rapide', "Deux appuis sur le bouton marche ouvrent Shuttrix, même sur l'écran verrouillé."],
            ['Langues', 'En 9 langues, selon le téléphone ou le navigateur.'],

            [
              'Lumière, flou et polices',
              'Exposition de −6 à +6 EV, teinte, ombres et hautes lumières. Flou de fond elliptique et effet de bascule avec zone nette réglable. Polices avec ou sans empattement et à chasse fixe. Les réglages de prise de vue sont exclus.',
            ],
          ],
        },
      ],
    },
    farnear: {
      tagline: 'Des appels vidéo par-delà les frontières, avec un tableau pour les images et vidéos partagées.',
      lede: 'Farnear relie la famille par un lien, sans compte. La personne qui crée l’appel rejoint tout de suite ; les invités choisissent leurs appareils.',
      links: ['farnear.workbench-soft.com'],
      groups: [
        {
          features: [
            [
              'Appels par lien',
              'Un lien est la salle. La personne qui crée l’appel rejoint tout de suite. Les invités choisissent le micro, la caméra et la sortie audio.',
            ],
            [
              'Salles enregistrées',
              'Un lien de salle enregistré sous un nom, comme Maman. Le même lien marche à chaque fois.',
            ],
            [
              'Appels vidéo directs',
              'Le son et la vidéo passent en direct si les deux réseaux le permettent. Les relais sont prévus.',
            ],
            [
              'Tableau',
              'Chacun dessine au stylo, au surligneur ou au laser qui s’efface. On peut effacer et annuler ses traits.',
            ],
            [
              'Partager une image ou une vidéo',
              'Une personne charge une image ou une vidéo de 100 Mo maximum. Les autres la voient et dessinent dessus.',
            ],
            ['Cours (prévus)', 'Les salles de cours avec diapos, dessin et minuteur sont prévus.'],
            [
              'Pub et retrait',
              'Des pubs autour de l’appel, aucune pendant. Un achat de A$2.99 les retire des salons de l’acheteur.',
            ],
            [
              'Farnear Pro',
              'Un achat de A$5.99 sur Android ouvre le tableau partagé et ses médias pour la salle, et retire les pubs.',
            ],
            [
              'Distribution Android',
              'CI crée des APK et AAB signés pour les versions publiques. Les envois sur le canal de test Play commencent après la première version et la configuration de Play Console.',
            ],
            ['Langues', 'En 9 langues, selon le téléphone ou le navigateur.'],
          ],
        },
      ],
    },
    skyaltar: {
      tagline: 'Le ciel nocturne à travers le téléphone, dessiné dans le style des cultures anciennes.',
      lede: 'Levez le téléphone et Sky Altar montre les étoiles, la Lune, les planètes et les constellations derrière lui. Chaque thème les dessine comme la Grèce, les Vikings, les Mayas ou la Chine ancienne auraient pu le faire, sur une musique ambient lente.',
      links: ['Guide d’astrologie'],
      groups: [
        {
          features: [
            [
              'Vue du ciel',
              'Étoiles, Soleil, Lune, planètes et 88 constellations sur la caméra, ou tournées à la main.',
            ],
            [
              'Horloge',
              'Une horloge discrète avec la date en haut du ciel, dans la police du thème. Elle pâlit avec les boutons.',
            ],
            [
              'Étoiles de la caméra',
              "L'image de la caméra reste sombre. Ses étoiles scintillent avec une traînée d'étincelles et brillent d'or quand elles collent au ciel.",
            ],
            ['Thèmes des cultures', '13 cultures, de la Grèce et Rome aux Incas, à Sumer et à l’âge de pierre.'],
            [
              'Musique ambient',
              'La chanson au violon « L’Exode des Mondes » tourne sous le ciel. Coupez-la, ou jouez votre propre fichier audio.',
            ],
            ['Publicités et retrait', 'Les pubs restent hors du ciel. Un achat unique de $2.99 les retire.'],
            ['Langues de l’app', 'Les écrans et les noms des constellations en 9 langues.'],
            [
              'Mises à jour depuis GitHub',
              'L’app Android trouve une nouvelle version et l’installe. Les réglages ont « Rechercher des mises à jour ».',
            ],
          ],
        },
      ],
    },
    memoire: {
      tagline: 'Apprendre des mots anglais ou russes par petites séries, juste avant de les oublier.',
      lede: "Memoire apprend l'anglais aux russophones et le russe aux anglophones. Quelques fois par jour, il montre de courtes séries de cartes, juste avant qu'un mot s'échappe.",
      links: [],
      groups: [
        {
          features: [
            ['Séries de mots', "De courtes séries : les mots à revoir d'abord, les nouveaux entre eux."],
            ['Façons de demander', "Une carte demande le sens, le mot, ce qu'on a entendu ou l'orthographe."],
            ['Ajouter un mot', 'Tapez un mot et recevez des cartes avec traductions et exemples.'],
            ['Images', "Une carte montre la photo de l'article Wikipédia du mot."],
            ['Mots intégrés', 'Environ 8 000 mots anglais avec niveaux CECR et traductions russes.'],
            ['Test de niveau', "Jusqu'à 6 manches de oui ou non sur des mots vrais et inventés fixent le niveau."],
            ['Thèmes', "14 thèmes comme l'informatique, le voyage, la cuisine et les mots d'enfants."],
            ['Rappels', "Des notifications locales aux heures choisies, seulement s'il reste des mots."],
            ['Mes mots', 'Une liste de cartes avec recherche, étoiles et suppression.'],
            ['Apparence et langue', 'Thèmes clair et sombre, et les écrans en 9 langues.'],
            ['Pratique orale', "Un chat sur une scène comme un café ou un entretien, au niveau de l'élève."],
            ['Synchro entre appareils', 'Les mêmes cartes sur téléphone, tablette et navigateur, liées par un code.'],
            ["Widget d'accueil", 'Le nombre de mots en attente et un mot avec son sens.'],
            [
              'Publicités et suppression',
              'Une bannière et une pub plein écran sur Android. Un achat unique les retire.',
            ],
            [
              'Son',
              'Les mots sortent du haut-parleur du téléphone à plein volume. Les réglages permettent le Bluetooth ou le volume du système.',
            ],
            [
              'Memoire Pro',
              'Un achat de A$5.99 sur Android ouvre la pratique de conversation, la synchro, le widget et les 14 thèmes, et retire les pubs.',
            ],
            [
              'Mises à jour',
              'L’APK de GitHub signale une nouvelle version de Memoire, la télécharge et ouvre l’installateur Android.',
            ],
          ],
        },
      ],
    },
    'lumiere-player': {
      tagline:
        "Un lecteur vidéo pour Google TV et les téléphones Android qui lit les fichiers d'une clé USB ou d'un NAS.",
      lede: "Lumiere Player lit les fichiers d'une clé USB ou d'un partage SMB avec libVLC, donc il ouvre ce qu'ouvre VLC. Chaque fichier garde sa position, et la télécommande saute et change de piste.",
      links: [],
      groups: [
        {
          features: [
            ['Sources', "Clés USB et partages SMB, listés sur l'accueil."],
            ['Reprise', 'Chaque fichier garde sa position, et la liste montre où vous en êtes.'],
            ['Sous-titres et audio', 'Pistes intégrées et fichiers du même dossier, cyrillique compris.'],
            ['Commandes', 'Sauter de 10 ou 30 secondes, changer la vitesse, aléatoire et répétition.'],
            ['Mises à jour', 'Trouve les nouvelles versions sur GitHub au lancement ou dans Mises à jour.'],
            ['Publicité', "Une bannière sur l'accueil, avec un déblocage unique dans la version Play."],
            ['Langues', 'En 9 langues, selon le téléphone ou le navigateur.'],
            [
              'Tactile sur téléphone',
              'Touchez pour le panneau, double touche sur un côté pour sauter, glissez pour avancer, balayez pour la luminosité et le volume, et un verrou tactile.',
            ],
            ['Boutons du lecteur', "Choisissez les boutons du lecteur, format d'image compris."],
            [
              'Ignorer les sponsors',
              'Les vidéos enregistrées avec yt-dlp sautent leurs segments sponsorisés SponsorBlock.',
            ],
            [
              'Apparence',
              'Un look sombre et calme façon Google TV, un focus blanc et un lecteur qui tient sur le téléphone.',
            ],
            [
              'Haut-parleur du téléphone',
              'Sur le téléphone, la vidéo sort du haut-parleur à plein volume, même avec le Bluetooth. Bluetooth et volume du système s’activent dans les réglages.',
            ],
            [
              'Bibliothèque musicale',
              "Les dossiers du téléphone, de l'USB et du NAS dans une seule bibliothèque, analysée en arrière-plan.",
            ],
            [
              'Lecteur de musique',
              "Artistes, albums, titres et dossiers, file d'attente, aléatoire et répétition, téléphone verrouillé.",
            ],
            [
              'Livres audio',
              "Les dossiers de livres par auteur, chacun avec sa couverture et sa progression. Un livre reprend là où il s'est arrêté, un peu avant après une pause.",
            ],
            [
              'Trouver les tablatures',
              'Avec Guitar Upscale, un bouton guitare ouvre les tablatures du titre en cours.',
            ],
            [
              'Version Google Play',
              "Google Play la met à jour, et les autorisations médias remplacent l'accès à tous les fichiers.",
            ],
            ['Commandes vocales', 'Dites Hey Lumi, play et un titre, en anglais ou en russe, téléphone verrouillé.'],
            ['Lumiere Pro', 'Un seul achat débloque les commandes vocales et Hey Lumi, et retire la pub.'],
          ],
        },
      ],
    },
    'property-trends': {
      tagline: "Les banlieues australiennes colorées selon le prix médian, avec l'historique.",
      lede: 'Une carte des banlieues australiennes, chacune colorée selon son prix de vente médian, avec un graphique de son évolution. Elle repose sur des données publiques ouvertes.',
      links: ['Ouvrir la carte'],
      groups: [
        {
          features: [
            ['Carte des prix', 'Chaque banlieue colorée selon son prix de vente médian.'],
            ['Filtres', 'Le type de bien et la période de la carte.'],
            ['Annonces sur realestate.com.au', 'Des boutons ouvrent la même recherche sur realestate.com.au.'],
            ['Fiche et historique', "La médiane d'une banlieue, le nombre de ventes et un graphique sur les années."],
            ['Recherche', 'Trouve une banlieue par nom ou code postal et y emmène la carte.'],
            ['Langues', 'En 9 langues, selon le téléphone ou le navigateur.'],
            [
              'Loyers',
              'Chaque code postal de NSW, QLD, SA et TAS coloré selon le loyer hebdomadaire médian des nouveaux baux.',
            ],
            ['Installer depuis le navigateur', "La version web s'installe comme une app avec son icône."],
          ],
        },
      ],
    },
    tripforge: {
      tagline: 'Tout un voyage en quelques mots : vols, itinéraire, hôtels et voiture, avec les prix.',
      lede: "Tripforge planifie un voyage à partir des lieux, d'une date approximative et du groupe. La réponse est un plan chiffré avec vols, itinéraire, hôtels et voiture, et des dates moins chères autour.",
      links: ['tripforge.workbench-soft.com'],
      groups: [
        {
          features: [
            ['Demander', 'Tapez les lieux, une date approximative, la durée et qui part.'],
            ['Vols', 'Les allers-retours les moins chers autour de la date, avec des dates moins chères à côté.'],
            [
              'Lieux',
              'Les incontournables et les lieux secrets de chaque ville selon tes centres d’intérêt, avec une coche et un lien.',
            ],
            ['Vers Tick-a-Lot', 'Un appui transforme le voyage en listes Tick-a-Lot : visites et bagages.'],
            ['Réglages', "La langue : celle du téléphone ou l'une des 9."],
            [
              'Pub',
              'De la pub sur Android, jusqu’à un achat unique qui la retire. Aucune pub à côté des liens de réservation.',
            ],
          ],
        },
      ],
    },
    'reddit-desk': {
      tagline: 'Rédige des commentaires Reddit sur un dépôt et les tape dans Chrome.',
      lede: 'Une app Windows pour la barre des tâches. Choisissez un dépôt, appuyez sur Trouver, et Claude Code rédige un commentaire pour chaque fil auquel le dépôt répond. Ouvrez une carte et Chrome reçoit le brouillon, prêt à publier à la main.',
      links: [],
      groups: [
        {
          features: [
            ['Choix du dépôt', 'Une liste de chaque dossier git sous la racine.'],
            ['Subreddits', 'Claude lit le dépôt et remplit les subs qui lui vont.'],
            ['Trouver des fils', 'Claude Code trouve les fils auxquels le dépôt répond et rédige un commentaire.'],
            ['Étapes en haut', 'Trois étapes en haut disent qui fait quoi, et celle qui attend s’allume.'],
            ['Cartes', 'Chaque carte montre le sub, le titre du fil et le brouillon à modifier.'],
            ['Ouvrir dans Chrome', 'Chrome ouvre le fil avec le commentaire saisi, prêt à publier.'],
            ['Le publier pour moi', "L'app tape le commentaire dans sa propre fenêtre Chrome et appuie sur Save."],
            ['Onglet publications', 'Rédige des posts sur les dépôts choisis dans les subs qui conviennent.'],
            ['Captures et vidéos', 'Chaque post liste les médias du dossier de captures du dépôt.'],
            ['Ouvrir un post', 'Chrome ouvre la page de publication du sub avec le post rempli.'],
            ['Risque de ban', 'Une ligne évalue le prochain post, et chaque carte son sub.'],
            ['Post pour testeurs', "Un post qui cherche des testeurs pour une app Android d'une liste."],
            ['Dans Archon', "L'onglet Reddit d'Archon affiche cette fenêtre dans un cadre."],
            ['Bouton info', 'Le bouton i explique la configuration de Reddit.'],
            ['Langue', "Les réglages ont une liste : la langue du système ou l'une des 9."],
            ['Liste des faits', 'Chaque fil publié ou ignoré, avec sa date.'],
          ],
        },
      ],
    },
    songfactory: {
      tagline: 'Transforme un dossier de chansons en longue vidéo en boucle pour YouTube et la met en ligne.',
      lede: "Songfactory enchaîne les chansons d'un thème sur un fond en boucle, écrit les chapitres et la miniature, et publie la vidéo selon un planning. Claude écrit le texte, et ComfyUI peut dessiner le fond.",
      links: [],
      groups: [
        {
          features: [
            [
              'Atelier audio',
              'Nettoyer ou améliorer les chansons dans une fenêtre de bureau, en 9 langues, avec protection contre les noms de sortie identiques.',
            ],
            [
              'Pipeline en tuiles',
              "Dix tuiles mènent d'un thème à une vidéo YouTube : sujets, histoires, paroles, chansons sur Suno, nettoyage, vidéo et mise en ligne. Chacune se lance seule avec ses réglages.",
            ],
            [
              'Une vidéo par chanson',
              'Créer une vidéo en boucle par chanson et, au choix, une vidéo réunissant les chansons.',
            ],
            ['Installer et vérifier', 'Un script installe les outils, et un contrôle les vérifie.'],
            ["Longue vidéo d'une playlist", "Les chansons d'un dossier s'enchaînent en fondu sur un clip en boucle."],
            [
              'Nettoyage des artefacts IA',
              'Le build retire le souffle, l’éclat métallique et le grondement des chansons et garde les originaux.',
            ],
            [
              'Améliorer une chanson',
              'Une commande nettoie n’importe quelle chanson, rend la bande coupée par un encodeur avec perte et montre les deux spectrogrammes.',
            ],
            ['Boucle sans raccord', "Le clip joue à l'endroit puis à l'envers, et le saut de la fin disparaît."],
            [
              'Chapitres et miniature',
              'La description liste chaque chanson avec son début, et une miniature est créée.',
            ],
            ['Mise en ligne planifiée', 'Une commande publie avec le label IA et une heure de sortie.'],
            ['Texte de Claude', 'Claude écrit le titre et la description YouTube à partir des chansons.'],
            ['Fond par ComfyUI', 'Un prompt dans le fichier du thème fait dessiner le fond par ComfyUI.'],
          ],
        },
      ],
    },
  },
};

export default fr;
