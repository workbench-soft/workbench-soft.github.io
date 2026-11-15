import type { Arch } from '../types';

const arch: Arch = {
  summary:
    "Un site React statique construit par Vite fait tourner le calculateur entier dans le navigateur, et Cloudflare le sert. Une app Java avec WebView sur Android montre le site en ligne, et une app Capacitor sur l'iPhone embarque le site.",
  parts: [
    { name: 'React and Vite', role: 'la page du calculateur, prérendue au build avec les valeurs par défaut.' },
    {
      name: 'Modules de règles et de coûts',
      role: 'du TypeScript simple avec les règles fiscales, leurs sources et les calculs de chaque option.',
    },
    { name: 'localStorage', role: 'les champs modifiés, le thème et la langue, dans ce navigateur seulement.' },
    {
      name: 'Service worker',
      role: 'un cache des pages et des fichiers, pour que les visites suivantes marchent hors ligne.',
    },
    { name: 'i18next', role: 'les 9 catalogues, chacun chargé quand la personne le choisit.' },
    { name: 'Cloudflare', role: 'sert les fichiers construits, les redirections et Web Analytics.' },
    {
      name: 'Android WebView app',
      role: 'du Java autour du site en ligne, avec une bannière AdMob et un achat Google Play.',
    },
    {
      name: 'Capacitor',
      role: "l'app iPhone avec les fichiers du site dedans, et du Swift pour les pubs, StoreKit et le partage.",
    },
  ],
  flow: [
    'Cloudflare envoie la page prérendue avec les valeurs par défaut.',
    'La page lit les champs enregistrés dans localStorage.',
    'Chaque modification relance la comparaison dans le navigateur et enregistre les champs.',
    'La page montre les 3 totaux, leurs parts et le détail du calcul.',
    'Le service worker met les fichiers en cache pour la prochaine visite hors ligne.',
  ],
  links: [
    { to: 'Cloudflare', text: 'Héberge le site et gère ses redirections et Web Analytics.' },
    { to: 'Google AdSense', text: 'Annonces automatiques sur le site. Les apps ne chargent pas AdSense.' },
    { to: 'Google Play', text: "La bannière AdMob et l'achat Supprimer les pubs dans l'app Android." },
    { to: 'App Store', text: "StoreKit vend Supprimer les pubs dans l'app iPhone dès qu'elle sera sur l'App Store." },
  ],
  design: {
    scale: [
      'Une personne par navigateur, 23 champs sur une seule page de calcul. La comparaison se recalcule dans le navigateur à chaque modification.',
      'Le site est fait de fichiers statiques sur Cloudflare, donc aucun serveur du studio ne porte la charge.',
      "Les tranches d'impôt, la FBT et les droits de timbre sont des nombres fixes dans le code : la limite est de les tenir à jour, pas la charge.",
    ],
    data: [
      'Ni base de données ni compte. Les modifications sont dans localStorage en JSON sous 3 clés : champs (avec un numéro de version), thème et langue.',
      "Seuls les champs modifiés sont enregistrés, donc une date de début intacte vaut aujourd'hui et une valeur par défaut suit le type de voiture et les règles.",
      "Les tranches d'impôt, les constantes FBT et les droits de timbre par État sont des constantes dans src/rules, chacune avec un lien vers sa source.",
    ],
    interfaces: [
      'compareOptions prend un objet CalcInputs et renvoie un Comparison : coût, évolution du compte et parts du coût par option.',
      "La page parle à l'appli Android par window.ConsdrApp, avec les messages state, buy, privacy et devAds et des réponses en JSON.",
      "L'appli iPhone répond au même pont depuis Swift, et Capacitor sert le site construit depuis l'intérieur de l'appli.",
      'Le build écrit sitemap.xml, llms.txt, ads.txt et le JSON-LD des questions fréquentes.',
    ],
    reliability: [
      "Les pages passent d'abord par le réseau et retombent sur la copie en cache après 3 secondes ou sur une erreur serveur.",
      "Si les données du site sont bloquées, la lecture donne null et l'écriture est ignorée, et la page marche pour cette visite.",
      'Une valeur enregistrée du mauvais type ou une valeur de liste inconnue est écartée au chargement. Un enregistrement dans un onglet recharge les autres.',
    ],
    security: [
      'Pas de connexion, et les chiffres ne vont vers aucun serveur : les saisies ne quittent pas le navigateur.',
      'Les en-têtes de réponse posent frame-ancestors none, object-src none, nosniff et HSTS, et coupent caméra, micro et position.',
      'La clé de signature Android est un secret de CI déchiffré sur le runner, et le dépôt ne contient aucune clé.',
      "L'appli Android demande le consentement aux publicités via le SDK de consentement de Google.",
    ],
    performance: [
      "L'anglais est dans le script principal, et chacun des 8 autres catalogues se charge en morceau séparé quand on le choisit.",
      'Le build prérend le calculateur avec les valeurs par défaut et précharge les polices latines, pour que le contenu apparaisse tôt et que les chiffres ne bougent pas.',
      "Les fichiers de /assets/ portent un hash de contenu, reçoivent un en-tête de cache d'un an et sortent d'abord du cache dans le worker.",
    ],
    operations: [
      'Un seul job vérifie, teste et construit, puis wrangler deploy publie dist/ sur Cloudflare à chaque push sur main.',
      'La CI tourne sur le runner Windows du studio, donc le dépôt privé ne consomme aucune minute Actions.',
      'Une exécution nocturne à 19 h, heure de Sydney, construit le bundle Android signé pour Google Play, seulement si android/ a changé.',
      "Le nom du cache du service worker hache la liste des fichiers, le texte des pages et le code du worker, donc chaque déploiement remplace l'ancien cache.",
    ],
    tradeoffs: [
      "Un calcul dans le navigateur plutôt qu'une API serveur, pour qu'aucune donnée ne quitte l'appareil et que l'hébergement se réduise à des fichiers statiques.",
      "Sur Android, une WebView autour du site en ligne plutôt que des écrans natifs, pour qu'un seul code serve le web et l'appli, et qu'un déploiement du site arrive aussitôt.",
      "Des pages d'abord par le réseau plutôt que par le cache, pour qu'un déploiement se voie tout de suite, au prix de 3 secondes sur une connexion lente.",
      "Des règles fixes dans le code avec leurs sources plutôt qu'une API de taux, pour que chaque nombre se vérifie, mais un nouvel exercice fiscal demande une version.",
    ],
  },
  features: {
    'Compare a lease, a loan and cash':
      'Une simple fonction TypeScript prend les champs et rend un total par option. Elle tourne dans le navigateur à chaque modification, et aucun serveur ne voit les chiffres.',
    'Where the money goes':
      'La comparaison rend les parts de chaque total à côté du total. Un module de notes écrit la ligne et la formule près de chaque chiffre.',
    'Lease and loan settings':
      'Le module du formulaire change le texte tapé en nombres et enregistre chaque modification dans localStorage. Une valeur à moitié tapée reste affichée.',
    'FBT by car type and start date':
      "Un module de règles choisit le taux de FBT et l'exemption des voitures électriques selon le type, la date de début et le prix. Chaque constante cite sa source.",
    'Stamp duty by state':
      'Une table par État dans le module de règles calcule le droit selon le prix, le type de voiture et la date de début.',
    'Account interest':
      'La comparaison fait vivre le compte mois par mois à son taux, pour chaque option et sans voiture. L’écart donne les intérêts perdus.',
    'Borrowing for another home':
      'La comparaison calcule combien une banque prêterait en moins pendant que la voiture se paie. Elle prend la marge APRA de 3 points sur 30 ans.',
    'Working and sources':
      'Un module de notes écrit chaque étape et chaque formule près des chiffres. Un fichier de sources relie chaque chiffre fixe à sa page.',
    'Common questions':
      'Un module construit les réponses dans la langue en cours à partir des mêmes règles. La version anglaise entre aussi dans la page en JSON-LD pour la recherche.',
    'Guides and pages':
      'Un plugin Vite rend chaque guide en HTML statique au build, avec les chiffres des mêmes règles. Il écrit aussi le sitemap.',
    'Saved inputs and reset':
      'Les champs modifiés vont dans localStorage en JSON. Réinitialiser les efface, et les valeurs par défaut reviennent.',
    'Offline use':
      'Un service worker écrit au build met en cache les pages et les fichiers. Les pages essaient le réseau, puis prennent la copie en cache après 3 secondes.',
    'Colour theme':
      "Un petit script dans l'en-tête de la page applique le thème enregistré avant le premier affichage. Le choix est dans localStorage.",
    'Remove ads in the Android app':
      "La page interroge l'app Java par un pont, et Google Play Billing vend le produit. L'app renvoie l'état sans pubs.",
    'Which lease term costs least':
      "Une fonction lance la comparaison une fois par durée, de 1 à 5 ans. Elle prolonge le compte jusqu'à l'année 5, pour que chaque durée couvre les mêmes années.",
    'If you leave your job':
      'Un module calcule le solde à la date de départ et le coût de chaque sortie du leasing face au fait de rester. Il reprend les chiffres du leasing de la comparaison.',
    Language:
      'i18next avec react-i18next charge chaque catalogue comme un fichier à part quand on le choisit. Les montants restent en dollars australiens.',
    Ads: 'AdSense diffuse des annonces automatiques sur le site. Les apps marquent la page, donc AdSense y reste éteint et AdMob montre la bannière native.',
    "No ads on the developer's phone":
      "L'app Android garde une clé de développeur que le PC envoie une fois au téléphone. Avec elle, chaque version cache la bannière.",
    'iPhone app':
      "Capacitor sert le site construit depuis l'intérieur de l'app, qui s'ouvre donc hors ligne. Du code Swift répond au même pont de page que l'app Android.",
    'Remove ads on the iPhone':
      "StoreKit 2 vend le même identifiant de produit que Google Play. Restaurer l'achat demande à l'App Store les achats passés.",
    'Share the result':
      "La page compose la ligne du verdict avec le lien. L'app iPhone ouvre la feuille de partage d'iOS, et un navigateur de téléphone utilise Web Share.",
  },
};

export default arch;
