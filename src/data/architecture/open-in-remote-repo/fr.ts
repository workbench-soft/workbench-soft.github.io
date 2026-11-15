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
  design: {
    scale: [
      'Une personne par fenêtre VS Code, un lien par clic, donc le travail se réduit à quelques appels git sur un dépôt.',
      'Elle tourne dans les fenêtres locales, SSH et conteneur, et un appel git s’arrête après 10 secondes pour qu’un remote lent ne fige pas l’éditeur.',
    ],
    data: [
      'L’extension ne garde aucun état. Chaque commande lit les réglages, la sélection et git, construit un lien puis les oublie.',
      'Les réglages openInGitHub et l’URL du remote décident de l’hôte, de la branche et d’une adresse remplacée.',
    ],
    interfaces: [
      'Les commandes viennent de la palette, du menu de l’éditeur et du menu de l’Explorateur, au nombre de 8, et chacune appelle le même exécuteur de liens.',
      'git donne la racine du dépôt, l’URL du remote et les branches via execFile, et les constructeurs de liens écrivent les URL de fichier, blame et historique de chaque hôte.',
      'vscode.env.openExternal ouvre le navigateur et vscode.env.clipboard copie, donc les deux marchent dans les fenêtres distantes.',
    ],
    reliability: [
      'Le contrôle de branche essaie le réglage, le HEAD du remote, main et master, puis retombe sur la branche courante ou le commit en HEAD détaché.',
      'Un échec de git affiche le message propre à git, et git ne demande aucun mot de passe dans un terminal.',
    ],
    security: [
      'L’extension n’envoie aucune requête aux hôtes, donc elle n’a besoin d’aucun jeton ni connexion pour GitHub, GitLab ou Bitbucket.',
      'git passe par execFile sans shell, donc le réglage defaultRemote ne peut lancer aucune commande.',
    ],
    performance: [
      'esbuild regroupe les sources en un fichier, ce qui a allégé le paquet et accéléré le chargement.',
      'Chaque appel git est un court processus via execFile avec une limite de 10 secondes, donc un clic coûte quelques petits processus.',
    ],
    operations: [
      'Checks lance lint, vérification des types, tests unitaires et build à chaque push, et le workflow de release construit le .vsix à côté.',
      'Un script de porte publie la construction quand Checks passe, et un Checks en échec l’annule. La publication sur le Marketplace reste manuelle.',
      'Le TypeScript simple de git et links tourne dans Node sous mise run test, et seule la colle de l’éditeur demande une fenêtre de test VS Code.',
    ],
    tradeoffs: [
      'Des liens issus du git local plutôt que de l’API REST de chaque hôte, donc pas de jeton et pas d’appel réseau par clic. Le lien ne peut pas confirmer que le fichier existe sur l’hôte.',
      'vscode.env.openExternal plutôt que le paquet open, qui cassait des noms comme users.$id.tsx et n’ouvrait aucun navigateur depuis les fenêtres SSH.',
      'Un fork d’une extension existante plutôt qu’une réécriture, qui a gardé le code des liens d’hôtes et ses tests. Le nouvel id oblige à réinstaller.',
    ],
  },
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
