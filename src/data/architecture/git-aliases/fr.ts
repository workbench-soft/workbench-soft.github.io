import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Chaque alias est un script bash dans un seul dépôt git. Un include dans la config git pointe vers le clone, donc un pull met à jour chaque alias de la machine.',
  parts: [
    {
      name: 'Scripts bash',
      role: 'un script par alias, lancé par le bash fourni avec git sur macOS, Linux et Windows.',
    },
    { name: 'Include dans la config git', role: 'relie chaque nom d’alias à son script et pointe git vers le clone.' },
    { name: 'fzf', role: 'le menu de recherche floue pour choisir des branches et des worktrees.' },
    {
      name: 'Fonctions zsh et PowerShell',
      role: 'transforment la ligne de dossier du changement de branche en vrai changement de dossier.',
    },
    {
      name: 'Installeurs',
      role: 'un pour macOS et Linux et un pour Windows. Ils règlent la config git, le shell et le hook.',
    },
    { name: 'shellcheck et shfmt', role: 'vérifient chaque script dans le hook de commit et dans la CI.' },
    {
      name: 'GitHub Actions',
      role: 'lance le lint et les tests sous Linux et Windows, puis tague chaque push vert sur main.',
    },
  ],
  flow: [
    'La personne tape une commande courte, comme git co.',
    'Git trouve l’alias dans la config incluse et lance son script.',
    'Le script appelle git, et fzf quand il faut choisir.',
    'Une fonction du shell change de dossier à partir d’une ligne de dossier.',
    'Le résultat s’affiche dans le terminal, et le dépôt change par git.',
  ],
  links: [{ to: 'GitHub', text: 'Héberge le dépôt, lance les contrôles et publie les versions datées.' }],
  features: {
    Aliases:
      'Un fichier de config relie chaque nom d’alias à un script bash du clone. git a lit le commentaire en tête de chaque script et affiche la liste.',
    'Switch branch folders':
      'git sb liste les branches locales dans fzf, worktrees compris. Le script affiche le chemin, et une fonction zsh ou PowerShell y déplace le shell et la fenêtre VS Code.',
    'Delete branches and worktrees':
      'git db les choisit dans fzf, et git dbm trouve les branches dont la branche distante a disparu. Un helper commun supprime chaque worktree avec sa branche et demande avant de forcer un worktree modifié.',
    Installer:
      'Un installeur shell pour macOS et Linux et un installeur PowerShell pour Windows écrivent l’include dans la config git. Chaque fichier modifié reçoit d’abord une copie datée.',
    'Lint hook':
      'L’installeur dirige les hooks git vers un dossier du dépôt. Chaque commit y lance shellcheck, shfmt et les règles du dépôt, puis oxfmt et markdownlint sur les fichiers indexés.',
    'Reset to the default branch':
      'Le script lit la branche par défaut dans le HEAD du remote, puis fait un fetch et un reset dur dessus. Il demande d’abord si des changements locaux ou des commits non poussés seraient perdus.',
    Releases:
      'Un workflow GitHub Actions démarre quand le lint passe sur main. Il choisit la prochaine version datée et écrit les notes à partir des commits depuis le dernier tag.',
  },
};

export default arch;
