import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'De simples skills en Markdown et quelques scripts, sans serveur ni build. Un installateur relie un seul clone à chaque agent de code de la machine, et la CI vérifie les skills avant chaque version.',
  parts: [
    {
      name: 'Format Agent Skills',
      role: 'chaque skill est un dossier Markdown qu’un agent charge quand une demande lui correspond.',
    },
    {
      name: 'Installateur en POSIX shell',
      role: 'relie le clone à Claude Code, Codex, Kimi Code et d’autres agents, avec une enveloppe PowerShell pour Windows.',
    },
    { name: 'Git hooks', role: 'relient de nouveau les skills après un pull, un merge ou un checkout.' },
    {
      name: 'Scripts Node',
      role: 'fusionnent les hooks dans les réglages de chaque agent et copient les serveurs MCP.',
    },
    {
      name: 'Hook turn-voice',
      role: 'un lecteur C# sous Windows et son jumeau Node sur Mac qui disent la fin d’un tour.',
    },
    {
      name: 'Contrôles en Python et TypeScript',
      role: 'vérifient le format du skill, les mots clés et la longueur de chaque skill.',
    },
    { name: 'GitHub Actions', role: 'lance les contrôles sous Windows et Linux, puis pose une version datée.' },
  ],
  flow: [
    'Une personne clone le dépôt et lance l’installateur.',
    'L’installateur relie chaque dossier de skill à chaque agent trouvé.',
    'L’agent lit la description de chaque skill au début d’une session.',
    'Une demande qui correspond charge le skill entier, et l’agent suit ses étapes.',
    'À la fin du tour, le hook vocal annonce le résultat.',
  ],
  links: [
    {
      to: 'agent-skills-private',
      text: 'Les règles et skills privés du propriétaire sont là, à côté de ces skills publics.',
    },
    { to: 'Claude Code', text: 'L’installateur relie les skills et fusionne les hooks dans ses réglages.' },
    { to: 'Codex', text: 'Les mêmes skills, les hooks et une copie des serveurs MCP de Claude Code.' },
    { to: 'GitHub', text: 'Les contrôles et les versions datées tournent sur GitHub Actions.' },
  ],
  design: {
    scale: [
      'Une personne par machine, 33 skills et autant d’agents qu’il y en a pour lire le format Agent Skills.',
      'Chaque session charge la description de chaque skill, donc une description reste sous 480 caractères et un corps de skill sous 300 lignes.',
    ],
    data: [
      'Pas de base de données. Un skill est un dossier avec un SKILL.md et son front matter, plus des références chargées à la demande.',
      'Les groupes de hooks sont dans des fichiers JSON, et le hook turn-voice garde ses clips de voix en cache dans un dossier local.',
    ],
    interfaces: [
      'Le contrat avec un agent est le front matter : le nom égale le dossier, et la description dit quand charger le skill.',
      'L’installateur fusionne les groupes de hooks dans les réglages de Claude Code et de Codex, et écrit un bloc balisé pour Kimi Code.',
      'Le hook turn-voice lit le marqueur d’état sur la dernière ligne d’un tour et dit la phrase qui correspond.',
    ],
    reliability: [
      'Des hooks git dans le clone relient de nouveau les skills après pull, merge, checkout et rebase, donc un nouveau skill apparaît aussitôt.',
      'La fusion des hooks garde les hooks de la personne. Sans Node, l’installation saute les hooks et le dit.',
      'Si la récupération de la voix échoue, il ne reste que le signal sonore, et un clip en cache joue sans réseau.',
    ],
    security: [
      'Le dépôt est public et ne contient aucun jeton. Les PR de forks tournent sur des runners GitHub, leur code reste donc hors du PC.',
      'Les skills de sites s’arrêtent à une connexion, un CAPTCHA, un secret ou un paiement, et les laissent à la personne.',
    ],
    performance: [
      'Seules les courtes règles d’écriture se chargent à chaque tour. Un skill entier se charge quand une demande correspond à sa description.',
      'Les clips de voix sont en cache, et le signal et la voix passent en un seul appel PlaySound, donc le premier mot sort entier.',
    ],
    operations: [
      'Le workflow check tourne sous Windows pour l’installation PowerShell et sous Linux pour l’installation shell, avec mise pour fixer chaque outil.',
      'Le workflow release démarre sur workflow_run quand check passe sur main, et pose un tag daté comme v2026.10.30.1.',
      'mise run test vérifie le format des skills, le budget de texte, les tests unitaires et une installation puis désinstallation dans un home temporaire.',
    ],
    tradeoffs: [
      'Un dossier Markdown par skill plutôt qu’un fichier de règles par agent, donc une seule copie sert environ 50 agents. Seul l’agent qui lit applique une règle.',
      'Un clone relié à chaque agent plutôt qu’une copie par agent, donc une modification les atteint tous aussitôt. Windows sans mode développeur reçoit des junctions.',
      'Un hook en C# compilé avec le csc.exe fourni par Windows, donc sans SDK. Il ne tourne que sous Windows, et un jumeau Node couvre le Mac.',
    ],
  },
  features: {
    'Writing style':
      'Un court fichier de règles se charge à chaque tour par le fichier de règles principal de l’agent. Le skill complet se charge avant le premier texte, avec ses tables de mots et un contrôle final.',
    'Code review':
      'Le skill review lit la PR ou le diff et vérifie chaque problème dans le code. Il rend un tableau avec la ligne, l’entrée qui casse le code et le correctif.',
    'Reviewer lenses':
      'Le skill reviewer choisit les angles pour un diff ou un dépôt et lance un sous-agent par angle. Un angle métier comme le droit ou le SEO charge son propre skill.',
    'Pull requests':
      'Le skill create-pr écrit la description et ouvre ou met à jour la PR avec la CLI GitHub. Des diagrammes Mermaid montrent chaque parcours avant et après.',
    'Review comments':
      'Le skill address-comments lit chaque fil ouvert par la CLI GitHub. Chaque correctif devient son propre commit, et la réponse donne son SHA.',
    'Ticket to merge':
      'Le skill implement-ticket lit Jira par le serveur MCP d’Atlassian ou sa CLI. Le plan va dans les specs du dépôt, et chaque commit porte la clé du ticket.',
    'App audit':
      'Le skill app-audit lance les angles du reviewer, chaque agent dans son propre worktree git. L’agent principal réunit les correctifs sûrs sur une branche et fusionne la PR.',
    'Specs first':
      'Le skill specs garde un fichier Markdown par fonction dans le dépôt. Chaque changement ajoute une entrée datée dans le premier commit, avant le code.',
    'One-pager':
      'Le skill one-pager écrit d’abord le texte complet. Il place ensuite en haut un résumé d’un écran, qui n’ajoute aucun fait propre.',
    'Commands through mise':
      'Le skill mise lance chaque tâche par mise run et les autres commandes par mise x. Un nouvel outil entre dans la config mise du dépôt avec une version fixée.',
    Translations:
      'Le skill translations choisit l’outil i18n pour la pile et ajoute chaque texte à chaque catalogue. Un test garde les catalogues sur les mêmes clés.',
    Worktrees:
      'Le skill git-worktrees crée un dossier à côté du dépôt avec ses fichiers ignorés et ses dépendances. Après la fusion, un script vérifie la PR et retire le dossier et les branches.',
    'Fast JavaScript':
      'Le skill javascript reprend les règles des React best practices de Vercel, sans les parties React. Chaque constat donne la règle, la ligne et son coût.',
    Architecture:
      'Le skill architecture écrit le plan dans la doc du dépôt avec des diagrammes et une décision par choix. Le lint ou la CI font ensuite respecter les règles de couches.',
    Monorepos:
      'Le skill monorepo choisit le lanceur de tâches et un workspace par langage. Un schéma d’API produit un client par plateforme, et la CI ne lance que les apps touchées.',
    'History reset':
      'Le skill reset-history garde un bundle git hors du dépôt, puis construit un commit depuis la branche principale. Il demande une fois et pousse en force avec lease.',
    'Rewrite a repo':
      'Le skill rewrite-repo note le comportement et prépare une liste de renommages pour le code et la doc. Il finit par un commit neuf à la place de l’historique.',
    'Help on a site':
      'Le skill guide-on-site pilote votre propre Chrome par Claude in Chrome. Il remplit les champs connus et s’arrête à chaque étape que seule la personne peut faire.',
    'Hung runs':
      'Le skill hung-process trouve sous Windows l’outil qui tient un port ou un verrou. Il arrête cet arbre de processus et relance l’étape, ou donne une commande en admin.',
    'Search setup':
      'Le skill seo-setup trouve où se trouve le DNS et audite le site en ligne et le dépôt. Il configure ensuite Search Console, Bing et Cloudflare Web Analytics dans le navigateur.',
    Ads: 'Le skill ads-setup parcourt les tableaux de bord AdSense et AdMob pendant que la personne est connectée. Il place les ID dans le code avec des pubs de test en debug.',
    'Google Play release':
      'Le skill play-release construit un bundle signé avec un nouveau code de version et garde la clé hors du dépôt. Il le publie en test interne et rend le lien des testeurs.',
    'Launch in one run':
      'Le skill launch pose une fois les questions communes. Il lance ensuite dans l’ordre les skills de recherche, de pubs et de Google Play et finit par un tableau des services.',
    Marketing:
      'Le skill marketing part du budget et écrit le message et un calendrier de lancement. Le plan reste dans la doc du dépôt, donc le passage suivant le reprend.',
    'In-app updates':
      'Le skill app-update ajoute un contrôle des versions GitHub au lancement et au retour dans l’app. Une barre de téléchargement et une notification suivent, et le code reste hors du build Play.',
    'Names and domains':
      'Un script vérifie chaque nom sur 3 extensions de domaine et le registre australien des entreprises. Il vérifie aussi les marques d’IP Australia sans clé d’API.',
    'Legal risks':
      'Un script analyse les licences des dépendances et les SDK de données du dépôt. Le skill note chaque risque dans un document et livre les correctifs sûrs dans une PR.',
    'App icons':
      'L’agent dessine 10 icônes SVG plates et montre un sélecteur dans le chat. Un script avec resvg exporte ensuite le choix dans chaque taille utile aux plateformes.',
    'Demo screenshots':
      'L’app tourne avec des données de démo inventées pendant que l’agent prend des captures et de courtes vidéos. Une liste de prises dans le dépôt permet de refaire les mêmes.',
    'Store media':
      'Le skill store-media prend les captures et l’icône du dépôt et crée chaque taille. Il les envoie dans le navigateur, la personne connectée, et demande avant un examen.',
    'End to end walk of a release':
      'Le skill e2e-walk installe la dernière version sur un émulateur ou un téléphone et suit chaque parcours de la doc. Il évite chaque suppression et garde la liste des parcours dans le dépôt.',
    'Hear and pick a voice':
      'Un script Python récupère chaque voix neuronale de Microsoft par edge-tts et garde les extraits en cache. Il affiche l’ID de chaque voix et reprend à n’importe quel numéro.',
    'Reddit comments':
      'Le skill récupère les fils populaires par le serveur MCP de Reddit et garde ceux auxquels le dépôt peut répondre. Playwright tape le brouillon dans Chrome, et la personne clique sur Comment.',
    'Voice at the end of a turn':
      'Un hook lit le marqueur de la dernière ligne et choisit le signal et la phrase. edge-tts la dit par un lecteur C# sous Windows et Node sur Mac.',
    Install:
      'Un installateur en POSIX shell relie un clone à chaque agent trouvé, avec une enveloppe PowerShell pour Windows. Des Git hooks dans le clone relient de nouveau les skills après chaque pull.',
    'Agent hooks':
      'Un script Node fusionne les groupes de hooks dans les réglages de Claude Code et de Codex. Il copie aussi les serveurs MCP de Claude Code vers Codex et Kimi Code.',
    Releases:
      'Un workflow GitHub Actions démarre une fois les contrôles réussis sur un push vers main. Il pose un tag de version datée et écrit les notes à partir des commits.',
    'Progress bars':
      'Un mod de Claude Code enregistre l’outil de progression et un panneau. Un hook compte les secondes depuis le dernier rapport et le rappelle à l’agent.',
    'Feature queue':
      'Chaque session écrit par dépôt un fichier de réservation avec ses fichiers. Le skill lit les autres réservations avant de choisir main ou un worktree.',
    'Workflow and code rules':
      'install.sh lie les fichiers de règles dans le dossier personnel, et chaque agent les lit à chaque tour. Chaque skill porte les règles d’une tâche.',
  },
};

export default arch;
