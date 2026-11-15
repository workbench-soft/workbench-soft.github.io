import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Un site Astro statique sur GitHub Pages, modifié par un espace admin basé sur Git. Un Rust Worker sur Cloudflare connecte Maria et dessine les images d’IA.',
  parts: [
    { name: 'Astro', role: 'construit chaque page en HTML statique et chaque photo en tailles AVIF ou WebP.' },
    { name: 'GitHub Pages', role: 'sert le site depuis un dépôt de build public, gratuit et rapide en Russie.' },
    {
      name: 'Sveltia CMS',
      role: 'l’espace admin, qui enregistre chaque changement comme un commit dans le dépôt source privé.',
    },
    {
      name: 'Rust Worker',
      role: 'connecte les admins par un code envoyé par e-mail et vérifie leur accès au dépôt pour la page d’IA.',
    },
    { name: 'Workers AI', role: 'fait tourner les modèles FLUX.2 qui dessinent les intérieurs.' },
    { name: 'FormSubmit', role: 'envoie chaque formulaire de commande à Maria, sans compte ni serveur.' },
    { name: 'GitHub Actions', role: 'vérifie chaque changement, construit le site et le pousse dans le dépôt public.' },
  ],
  flow: [
    'Le navigateur d’un visiteur demande une page à GitHub Pages.',
    'Pages envoie du HTML statique et des photos aux tailles de la mise en page.',
    'Le formulaire de commande part chez FormSubmit, qui écrit à Maria.',
    'Les changements de Maria deviennent des commits, et le site se reconstruit en 2 minutes.',
  ],
  links: [
    { to: 'GitHub', text: 'Garde la source privée et le dépôt de build public, et sert les pages.' },
    { to: 'Cloudflare', text: 'Fait tourner le Worker, Workers AI et l’e-mail qui porte le code de connexion.' },
    { to: 'FormSubmit', text: 'Envoie chaque commande à Maria.' },
    {
      to: 'Yandex',
      text: 'Lit les données structurées, et une règle Yandex dans robots.txt réunit les liens du filtre en une page.',
    },
  ],
  design: {
    scale: [
      'Un portfolio de studio pour des visiteurs en Russie, avec 16 galeries et environ 270 photos.',
      "Quelques personnes le modifient, donc le site n'a besoin ni de serveur ni de base, et chaque changement est un commit.",
      "La page d'IA tient dans l'offre gratuite de Workers AI de 10 000 neurones par jour, et une image prend de 3 à 15 secondes environ.",
    ],
    data: [
      'Chaque galerie est un dossier avec un index.md et ses photos. Son en-tête contient titre, catégorie, ordre, couverture et légendes.',
      "Un settings.json contient les contacts, les textes de l'accueil et le choix des polices. Un schéma zod le vérifie, avec les galeries, à la compilation.",
      "Les codes de connexion ne sont pas stockés. Chacun est un HMAC de l'e-mail et d'une fenêtre de 10 minutes.",
    ],
    interfaces: [
      'Le Worker en Rust sert GET /auth, POST /auth/code, POST /auth/verify et POST /generate.',
      "L'admin écrit par l'API GitHub sous forme de commits. Le formulaire de commande part chez FormSubmit, qui l'envoie par e-mail.",
      "/generate reçoit un prompt, un modèle, une taille de 256 à 1536 par pas de 64 et jusqu'à 2 photos de référence en données de formulaire multipart.",
    ],
    reliability: [
      "Le Worker nomme une seule origine autorisée dans l'en-tête CORS, car les navigateurs rejettent une liste. Une erreur après ce point part en JSON que la page d'admin peut afficher.",
      "Une panne de GitHub reçoit une note de nouvel essai et non un message d'accès refusé. Un quota d'IA épuisé a son propre message.",
      'Chaque version se reconstruit depuis les sources, donc un mauvais changement se défait par un commit.',
    ],
    security: [
      "On se connecte avec un code à 6 chiffres reçu par e-mail, 5 essais par minute et par adresse, et le Worker remet à l'admin un jeton de dépôt à droits fins.",
      "/generate vérifie que le jeton de l'appelant peut pousser dans le dépôt avant d'appeler le modèle.",
      "Le jeton ne va qu'à une fenêtre des origines autorisées. Les e-mails des admins et les jetons restent dans les réglages et secrets du Worker, hors du site.",
    ],
    performance: [
      'Astro écrit chaque photo en AVIF ou WebP aux tailles que la mise en page demande, et GitHub Pages sert du HTML statique.',
      "La version garde le cache d'images d'Astro d'une exécution à l'autre au lieu de retraiter toutes les photos.",
      "Une photo de pièce est réduite à 512 px dans le navigateur avant l'envoi. FLUX.2 klein esquisse en 3 secondes environ, dev en 15.",
    ],
    operations: [
      'Chaque push sur main construit le site à côté des contrôles, attend les contrôles du même commit, puis pousse les pages vers le dépôt de build public.',
      "Une version tourne à la fois, et un push plus récent annule l'ancienne, si bien qu'un vieux build n'écrase pas un nouveau. Les commits reçoivent des étiquettes de date.",
      "Le changement apparaît environ 2 minutes après l'enregistrement. Le Worker se déploie avec wrangler, observabilité activée.",
    ],
    tradeoffs: [
      "GitHub Pages depuis un dépôt de build public plutôt que Cloudflare Pages, car les fournisseurs russes ralentissent Cloudflare, au prix de deux dépôts et d'un jeton de publication.",
      "Une admin fondée sur Git plutôt qu'un CMS hébergé, pour n'avoir ni serveur ni base, au prix de 2 minutes d'attente par changement.",
      "FormSubmit plutôt qu'un Worker avec e-mail, car il est gratuit et sans compte, au prix d'un service hors de Russie.",
      "Workers AI avec FLUX.2 plutôt que des API d'images payantes, car il lit le russe et tient dans l'offre gratuite, au prix d'images lentes venant de Cloudflare.",
    ],
  },
  features: {
    Portfolio:
      'Chaque galerie est un dossier de Markdown et de photos dans le dépôt. Astro construit les pages et les tailles d’image, et le filtre tourne dans le navigateur.',
    'Order a design':
      'Chaque formulaire part chez FormSubmit, qui envoie la demande à Maria. Le site n’a pas de serveur pour cela.',
    Admin:
      'Sveltia CMS tourne sur la page admin et commite chaque changement dans le dépôt. Le Worker envoie à Maria un code de connexion, puis donne à l’admin un jeton du dépôt.',
    Fonts:
      'Les 10 polices viennent de Fontsource et sont livrées avec le site. Le choix vit dans le fichier de réglages, et la mise en page l’applique au build suivant.',
    'AI generator':
      'La page admin place la demande en russe et le style de Maria dans un prompt en anglais. Le Worker vérifie son accès GitHub, puis FLUX.2 sur Workers AI dessine l’image.',
    Search:
      'La mise en page Astro écrit sur chaque page le titre, la description, l’image de partage et les données structurées. Le build écrit robots.txt, llms.txt et un plan du site daté par git.',
  },
};

export default arch;
