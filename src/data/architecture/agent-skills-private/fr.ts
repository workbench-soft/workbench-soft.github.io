import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Des skills en Markdown et un fichier de règles, liés à Claude Code, Codex et Kimi Code par un installeur shell. Des scripts auditent la CI, rangent les secrets et montent la passerelle MCP.',
  parts: [
    { name: 'Skills en Markdown', role: 'les étapes d’une tâche chacun, chargés quand une demande nomme cette tâche.' },
    { name: 'Fichier de règles', role: 'les règles de travail chargées à chaque tour de chaque session.' },
    { name: 'Installeur shell', role: 'lie les skills à chaque agent et branche le fichier de règles dans sa config.' },
    {
      name: 'Modèles GitHub Actions',
      role: 'les workflows Checks et Release et la porte de release que repo-ci copie dans un dépôt.',
    },
    {
      name: 'gh et GraphQL',
      role: "lisent en un appel les workflows et les listes de secrets de chaque dépôt de l'organisation.",
    },
    { name: 'Script PowerShell', role: "range une nouvelle valeur secrète dans GitHub sans que l'agent la voie." },
    { name: 'mcpproxy', role: 'un seul serveur passerelle qui remplace 5 serveurs MCP.' },
    {
      name: 'Contrôles en Python et TypeScript',
      role: 'vérifient dans les skills le frontmatter, les liens, les mots clés et la longueur.',
    },
  ],
  flow: [
    "L'installeur lie les skills et copie le fichier de règles dans chaque agent.",
    'Une session charge le fichier de règles à chaque tour.',
    "Une demande qui colle à la description d'un skill charge ce skill.",
    'Le skill pilote gh, des scripts et des outils MCP sur GitHub et les consoles.',
    "L'agent livre le changement et finit le tour par une marque d'état.",
  ],
  links: [
    {
      to: 'agent-skills',
      text: "Les skills publics s'installent d'abord, et ces skills y prennent les règles d'écriture.",
    },
    { to: 'local-ci', text: 'Les modèles repo-ci compilent sur les runners que local-ci attribue.' },
    { to: 'ci', text: 'Ses scripts de release suivent les modèles repo-ci.' },
    { to: 'Bitwarden', text: 'Chaque jeton va d’abord au coffre, puis à GitHub par le script de rotation.' },
    { to: 'GitHub', text: 'Les skills déplacent des dépôts, ajoutent des workflows et rangent les secrets par gh.' },
  ],
  features: {
    'Move a repo':
      "Le skill move-repo fait trouver à l'agent chaque lien vers l'ancienne adresse avec gh. Il transfère ensuite le dépôt, le rend privé et passe la CI sur le runner auto-hébergé.",
    'CI and releases for every repo':
      "Un script shell lit en un appel GraphQL les workflows de chaque dépôt de l'organisation. Le skill repo-ci ajoute ensuite les Checks et Release manquants depuis ses modèles.",
    'Rotate secrets':
      "Un script PowerShell lit la liste des secrets de chaque dépôt et range chaque nouvelle valeur avec gh. La personne copie la valeur, donc l'agent ne la voit pas.",
    'Workflow rules':
      'Un fichier de règles en Markdown se charge à chaque tour de Claude Code, Codex et Kimi Code. Il nomme le skill que charge chaque tâche.',
    'MCP gateway':
      'mcpproxy fait tourner les 5 serveurs derrière un seul serveur stdio, et chaque session a son dossier de données. L’agent cherche un outil, puis l’appelle.',
    Releases:
      'Un workflow de release démarre une fois le workflow check passé sur main. Deux scripts shell choisissent le tag daté et écrivent les notes.',
    'Feature queue':
      'Chaque session écrit un fichier de réservation sur un tableau dans le dossier personnel de ce PC. Une session dont les fichiers se croisent attend et revérifie.',
  },
};

export default arch;
