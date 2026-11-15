import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Une extension VS Code qui construit chaque lien depuis le git local. Elle n’envoie aucune requête aux hôtes, puis ouvre le lien dans le navigateur ou le copie.',
  parts: [
    { name: 'VS Code API', role: 'enregistre les 8 commandes et les menus, et lit les réglages et la sélection.' },
    {
      name: 'git',
      role: 'donne la racine du dépôt, l’URL du remote et les branches, avec 10 secondes au plus par appel.',
    },
    {
      name: 'Constructeurs de liens',
      role: 'du TypeScript simple qui fait d’un remote le lien de fichier, de blame et d’historique de chaque hôte.',
    },
    {
      name: 'vscode.env',
      role: 'ouvre le lien dans le navigateur ou le met dans le presse-papiers, en fenêtre locale ou distante.',
    },
    { name: 'vscode.l10n', role: 'traduit les commandes, les réglages et les messages en 9 langues.' },
    { name: 'esbuild', role: 'regroupe le code en un seul fichier, pour un chargement rapide.' },
    { name: 'GitHub Actions', role: 'construit le .vsix à côté des contrôles et le publie quand ils passent.' },
  ],
  flow: [
    'La personne lance une commande depuis la palette, l’éditeur ou l’explorateur.',
    'L’extension trouve avec git la racine du dépôt du fichier.',
    'git renvoie l’URL du remote et une branche qui contient le fichier.',
    'Le constructeur écrit l’URL pour cet hôte avec les lignes choisies.',
    'VS Code l’ouvre dans le navigateur ou la copie avec un avis.',
  ],
  links: [
    { to: 'GitHub', text: 'Héberge le fork et ses versions avec le .vsix. Les liens GitHub sont le choix par défaut.' },
    {
      to: 'GitLab and Bitbucket',
      text: 'Cibles de liens à côté de GitHub, construites depuis l’URL du remote sans appel d’API.',
    },
    { to: 'Visual Studio Marketplace', text: 'Liste l’extension. Chaque publication y est faite à la main.' },
  ],
  features: {
    'Open a file, blame or history link':
      'La commande lit le fichier et ses lignes choisies dans l’éditeur, et le remote dans git. Un module d’hôte écrit le lien, et VS Code l’ouvre dans le navigateur.',
    'Copy a link':
      'Le même lien va dans le presse-papiers de VS Code, donc une fenêtre distante remplit celui de la machine locale. Un avis montre l’URL.',
    'Links from the Explorer':
      'Le menu de l’explorateur passe le fichier ou le dossier à la même commande. Le lien n’a pas d’ancre de ligne.',
    'Main or master first':
      'git vérifie le réglage, puis le HEAD du remote, main et master pour trouver une branche avec le fichier. Sans résultat le lien prend la branche courante.',
    'Hosts and mapped URLs':
      'L’hôte vient d’un réglage ou de l’URL du remote. Un réglage de correspondance remplace l’URL du remote avant que le lien soit écrit.',
    Languages:
      'vscode.l10n choisit le catalogue selon la langue d’affichage de VS Code. Les noms des commandes et des réglages viennent de 9 catalogues du paquet.',
  },
};

export default arch;
