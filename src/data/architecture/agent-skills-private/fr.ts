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
  design: {
    scale: [
      'Un propriétaire, 11 skills et les dizaines de dépôts d’une organisation GitHub que les skills auditent et livrent.',
      'Un fichier de règles se charge à chaque tour de chaque session, donc il reste court et les règles d’une tâche passent dans des skills.',
    ],
    data: [
      'Pas de base de données. Les skills sont des dossiers Markdown, et le fichier de règles est un fichier Markdown que l’installateur copie dans chaque agent.',
      'Chaque dépôt d’app liste ses secrets dans .github/secret-rotation.json : le type, la page du fournisseur et ce que coûte une nouvelle valeur.',
    ],
    interfaces: [
      'Le script d’audit lit les fichiers de workflow et les listes de secrets de tous les dépôts avec un seul appel gh GraphQL.',
      'L’installateur branche le fichier de règles dans les fichiers globaux de Claude Code et de Codex par un bloc balisé, et Kimi Code lit la même ligne.',
      'Un serveur passerelle remplace 5 serveurs MCP, donc un agent ne charge qu’une liste d’outils.',
    ],
    reliability: [
      'Le workflow de release construit à côté de Checks. Un script de porte consulte Checks à la fin, donc un Checks en échec annule la construction.',
      'Un Checks plus tardif lance la tâche de publication via workflow_run, donc aucune tâche ne tient un runner en attendant.',
      'Les exécutions passent sur le PC du propriétaire quand les minutes cloud baissent, et les tâches attendent en file tant qu’il est éteint.',
    ],
    security: [
      'Le script de rotation lit une nouvelle valeur depuis une saisie masquée ou un fichier et la stocke avec gh secret set, donc l’agent ne la voit pas.',
      'Chaque jeton va d’abord au coffre, puis à GitHub.',
      'Le dépôt est privé, car il nomme les listes de secrets et les runners de l’organisation. Les skills génériques sont dans le dépôt public agent-skills.',
    ],
    performance: [
      'Seules les règles dont chaque tour a besoin se chargent à chaque fois. Une règle de tâche se charge depuis son skill quand une demande correspond.',
      'La construction de la release met ses fichiers en cache sous l’id d’exécution, donc la tâche de publication les reprend et prend un runner léger une minute.',
    ],
    operations: [
      'check.yml et release.yml lisent leur runner dans des variables du dépôt, qu’un routeur pointe d’abord vers les runners cloud, puis vers le PC.',
      'Les releases reçoivent un tag daté comme v2026.10.30.1 par des scripts shell que les modèles repo-ci partagent avec le dépôt ci.',
      'mise run test vérifie les skills, le budget de texte, l’installation dans un home temporaire, la passerelle et les scripts de release.',
    ],
    tradeoffs: [
      'Un dépôt privé à côté du public, pour que les runners et les listes de secrets de l’organisation restent non publiés. Cela coûte deux clones et deux installateurs.',
      'Des règles de tâche dans des skills plutôt qu’un long fichier de règles, donc un tour calme paie moins de jetons. Un skill à la description faible est ignoré.',
      'Un manifeste dans chaque dépôt d’app plutôt qu’une liste centrale, donc un changement de workflow et son entrée de secret arrivent dans une PR. Un dépôt sans manifeste n’a pas de rotation.',
    ],
  },
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
