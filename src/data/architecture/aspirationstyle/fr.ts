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
