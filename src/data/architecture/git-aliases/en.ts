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
