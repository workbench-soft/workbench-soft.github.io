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
    },
    hero: {
      status: 'Ouvert aux projets clients',
      lines: ['Nous concevons,', 'créons et livrons', 'des logiciels.'],
      lead: 'Workbench Soft est un studio indépendant. Il crée des apps pour Android, iPhone, le web, Windows et macOS, et mène chacune de la première spécification jusqu’au store, aux résultats de recherche et aux mises à jour qui suivent.',
      start: 'Lancer un projet',
      work: 'Voir les réalisations',
      projects: 'Projets',
      features: 'Fonctions livrées',
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
      kinds: { app: 'Apps', tool: 'Outils pour développeurs', archive: 'Archives' },
    },
    process: {
      title: 'De la première spécification au store',
      intro:
        'Chaque projet ci-dessus a suivi les mêmes étapes. Un projet client les suit aussi, et le client voit chacune.',
    },
    contact: {
      title: 'Une idée d’app ?',
      intro: 'Écrivez quelques lignes sur l’idée, les plateformes et l’échéance.',
      write: 'Écrire un e-mail',
      copy: 'Copier l’adresse',
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
              'Photos et archives',
              'Chaque photo et vidéo, les plus récentes d’abord, sous un titre par jour. Les archives listent chaque année et chaque mois avec un total.',
            ],
            [
              'Lieux',
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
            ['Anglais et russe', 'L’app suit la langue du téléphone. Android 13 et plus la règlent par app.'],
            ['Clair et sombre', 'Suit le téléphone, ou un choix fixe dans les réglages.'],
            [
              'Retirer les pubs',
              'Un achat unique sur Google Play masque les pubs sur chaque téléphone avec le même compte Google.',
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
          ],
        },
        {
          title: 'Dans l’app Android',
          features: [
            ['Badge de vitesse', 'Votre vitesse à côté de la limite de la route. Le badge passe au rouge au-dessus.'],
            [
              'Alertes radar',
              'Un bip environ 20 secondes avant, puis « Radar devant. Limite 60. » Il arrive aussi sur l’écran verrouillé.',
            ],
            [
              'Au-dessus de la limite',
              '« Vous roulez à 72. Ralentissez. » Près des radars seulement, ou sur toute route.',
            ],
            [
              'Journal de trajets',
              'Trajets et marches s’enregistrent seuls. Chaque parcours montre votre vitesse à chaque radar, en vert ou en rouge.',
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
      lede: 'Guitar Upscale montre gammes et accords sur un manche virtuel, enregistre des boucles et les sauve en MIDI. Il édite les morceaux note par note, les affiche en tablature et s’installe sur l’écran d’accueil.',
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
              'Formules payantes',
              'Une connexion Patreon ou un achat Google Play débloquent les outils Explorer et Composer.',
            ],
            [
              'Installation et hors ligne',
              'Une PWA qui s’ouvre en plein écran en paysage. L’APK Android se met à jour seul.',
            ],
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
              'Retirer les pubs',
              'Un achat unique. Les personnes en Europe voient le formulaire de consentement avant toute pub.',
            ],
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
              'Anglais et russe',
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
              'Mise à jour auto',
              'L’APK vérifie GitHub au lancement et à chaque retour, et montre le téléchargement dans l’en-tête.',
            ],
            ['Retirer les pubs', 'Un achat unique sur Google Play, restauré sur un nouveau téléphone.'],
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
          ],
        },
      ],
    },
    games: {
      tagline: 'Jeux de soirée dans le navigateur : dessiner, deviner, donner des indices.',
      lede: 'Workbench Games, ce sont trois jeux de soirée entre amis. Une personne crée un salon et envoie le lien, les autres rejoignent dans le navigateur, sans compte.',
      links: ['Jouer'],
      groups: [
        {
          features: [
            ['Salons par lien', 'Un lien réunit de 2 à 12 amis dans le même salon.'],
            ['Devine le dessin', 'Dessine un mot, devine les dessins des autres, marque des points.'],
            [
              'Téléphone dessiné',
              "Une phrase devient des dessins puis revient, et l'album montre comment elle a changé.",
            ],
            ["Duel d'indices", 'Un jeu de mots en équipes où chaque indice est public et où voler rapporte.'],
            ['Outils de dessin', 'Crayon, gomme, remplissage, 20 couleurs, 4 tailles et annulation.'],
            ['Deux langues', 'Les pages et les salons sont en anglais et en russe.'],
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
  },
};

export default fr;
