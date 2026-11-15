import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Each alias is a bash script in one git repo. An include in the git config points git at the clone, so a pull updates each alias on the machine.',
  parts: [
    {
      name: 'bash scripts',
      role: 'one script per alias, run by the bash that ships with git on macOS, Linux and Windows.',
    },
    { name: 'Git config include', role: 'maps each alias name to its script and points git at the clone.' },
    { name: 'fzf', role: 'the fuzzy menu for picking branches and worktrees.' },
    {
      name: 'zsh and PowerShell functions',
      role: 'turn the folder line of the branch switch into a real change of folder.',
    },
    {
      name: 'Installers',
      role: 'one for macOS and Linux and one for Windows, which wire up the git config, the shell and the hook.',
    },
    { name: 'shellcheck and shfmt', role: 'check each script in the commit hook and in CI.' },
    {
      name: 'GitHub Actions',
      role: 'runs the lint and the tests on Linux and Windows, then tags each green push to main.',
    },
  ],
  flow: [
    'The person types a short command, such as git co.',
    'Git finds the alias in the included config and runs its script.',
    'The script calls git, and fzf when it needs a pick.',
    'A shell function turns a folder line into a change of folder.',
    'The result prints in the terminal, and the repo changes through git.',
  ],
  links: [{ to: 'GitHub', text: 'Hosts the repo, runs the checks and publishes the dated releases.' }],
  design: {
    scale: [
      'One developer on a few machines, with no server. Each alias is one bash script in bin/.',
      'The load is a few git calls per alias, so git and the repo set the limits, not the scripts.',
    ],
    data: [
      'The aliases keep no state of their own. They read and change the repo through git.',
      'The installers write gitaliases.dir and include.path to the user git config, and a function to the zsh or PowerShell profile.',
      'aliases.gitconfig maps each alias name to its script in the clone.',
    ],
    interfaces: [
      'Git runs an alias as a child process, so a script takes arguments and prints to the terminal.',
      'git sb prints a __cd__ line with a path on stdout, and a zsh or PowerShell function turns it into a cd.',
      'fzf draws the picker, and the scripts source the helpers _shared.sh and _prune.sh.',
    ],
    reliability: [
      'Each script runs with set -euo pipefail, so a failed git call stops the alias.',
      'Branch and worktree removal skips the main worktree, the current folder and locked worktrees.',
      'Esc in the picker ends the alias and deletes no branch.',
    ],
    security: [
      'The only outside service is the git remote. The scripts store no token and call no API.',
      'The installers ask before each change and copy each file they edit first.',
      'The delete aliases list the candidates and remove only what the person picks.',
    ],
    performance: [
      'Each alias is one bash process with a few git calls, and a pull updates all of them.',
      'The prune lists come from one for-each-ref call and the worktree list, and one_line uses printf -v since a command substitution per worktree costs a fork.',
    ],
    operations: [
      'lint.sh runs shellcheck and shfmt and checks that each alias has a script, a description and a README row. test.sh runs the aliases on scratch repos.',
      'A pre-commit hook and a pre-push hook run mise run lint, and lint.yml runs it on Linux and Windows runners.',
      'Each green push to main gets a dated release such as v2026.10.30.1.',
    ],
    tradeoffs: [
      'A bash script per alias over inline ! aliases or shell functions, so shellcheck and tests can cover it, at the cost of a file per alias.',
      'Bash over TypeScript or Rust, since git ships bash on every system and no machine needs Node.',
      'An include that points at the clone over copied aliases, so a git pull updates them. Moving the clone breaks them.',
      'Two installers over one, since only PowerShell needs its profile edited, at the cost of two copies to keep in step.',
    ],
  },
  features: {
    Aliases:
      'A config file maps each alias name to a bash script in the clone. git a reads the comment at the top of each script and prints the list.',
    'Switch branch folders':
      'git sb lists the local branches in fzf, worktrees included. The script prints the path, and a zsh or PowerShell function moves the shell and the VS Code window there.',
    'Delete branches and worktrees':
      'git db picks them in fzf, and git dbm finds branches whose remote is gone. One shared helper removes each worktree and its branch and asks before it forces one with changes.',
    Installer:
      'A shell installer for macOS and Linux and a PowerShell one for Windows write the include into the git config. Each file they edit gets a dated copy first.',
    'Lint hook':
      'The installer points git hooks at a folder in the repo. Each commit there runs shellcheck, shfmt and the repo rules, then oxfmt and markdownlint on the staged files.',
    'Reset to the default branch':
      'The script reads the default branch from the remote HEAD, then fetches and hard resets to it. It asks first when local changes or unpushed commits would go.',
    Releases:
      'A GitHub Actions workflow starts once the lint run passes on main. It picks the next date version and writes the notes from the commits since the last tag.',
  },
};

export default arch;
