import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'A VS Code extension that builds each link from local git. It sends the hosts no requests, then opens the link in the browser or copies it.',
  parts: [
    { name: 'VS Code API', role: 'registers the 8 commands and the menus, and reads the settings and the selection.' },
    { name: 'git', role: 'gives the repo root, the remote URL and the branches, with a 10 second limit per call.' },
    {
      name: 'Link builders',
      role: 'plain TypeScript that turns a remote into the file, blame and history link of each host.',
    },
    {
      name: 'vscode.env',
      role: 'opens the link in the browser or puts it on the clipboard, in local and remote windows.',
    },
    { name: 'vscode.l10n', role: 'translates the commands, settings and messages into 9 languages.' },
    { name: 'esbuild', role: 'bundles the code into one file, so the extension loads fast.' },
    { name: 'GitHub Actions', role: 'builds the .vsix beside the checks and publishes it once they pass.' },
  ],
  flow: [
    'The person runs a command from the palette, the editor or the Explorer.',
    'The extension finds the repo root of the file with git.',
    'git returns the remote URL and a branch that holds the file.',
    'The link builder writes the URL for that host with the selected lines.',
    'VS Code opens it in the browser or copies it with a notice.',
  ],
  links: [
    { to: 'GitHub', text: 'Hosts the fork and its releases with the .vsix. GitHub links are the default.' },
    { to: 'GitLab and Bitbucket', text: 'Link targets beside GitHub, built from the remote URL with no API call.' },
    { to: 'Visual Studio Marketplace', text: 'Lists the extension. Each publish there is done by hand.' },
  ],
  design: {
    scale: [
      'One person per VS Code window, one link per click, so the work is a few git calls on one repo.',
      'It runs in local, SSH and container windows, and a git call stops after 10 seconds so a slow remote can’t hang the editor.',
    ],
    data: [
      'The extension keeps no state. Each command reads the settings, the selection and git, builds a link and forgets them.',
      'The openInGitHub settings and the remote URL decide the host, the branch and any mapped address.',
    ],
    interfaces: [
      'Commands come from the palette, the editor menu and the Explorer menu, 8 of them, and each calls the same link runner.',
      'git gives the repo root, the remote URL and the branches through execFile, and the link builders write the file, blame and history URLs for each host.',
      'vscode.env.openExternal opens the browser and vscode.env.clipboard copies, so both work in remote windows.',
    ],
    reliability: [
      'The branch check tries the setting, the remote HEAD, main and master, then falls back to the current branch or the commit on a detached HEAD.',
      'A git failure shows git’s own message, and git asks for no password in a terminal.',
    ],
    security: [
      'The extension sends the hosts no requests, so it needs no token or login for GitHub, GitLab or Bitbucket.',
      'git runs through execFile with no shell, so the defaultRemote setting can’t run a command.',
    ],
    performance: [
      'esbuild bundles the sources into one file, which made the package smaller and the load faster.',
      'Each git call is a short process through execFile with a 10 second limit, so a click costs a few small processes.',
    ],
    operations: [
      'Checks run lint, the type check, the unit tests and the build on each push, and the release workflow builds the .vsix beside them.',
      'A gate script publishes the build once Checks pass, and a failed Checks run cancels it. A Marketplace publish stays manual.',
      'Plain TypeScript in git and links runs in Node under mise run test, and only the editor glue needs a VS Code test window.',
    ],
    tradeoffs: [
      'Links from local git over each host’s REST API, so there is no token and no network call per click. The link can’t confirm the file exists on the host.',
      'vscode.env.openExternal over the open package, which broke names such as users.$id.tsx and opened no browser from SSH windows.',
      'A fork of an existing extension over a rewrite, which kept the host link code and its tests. The new id means people reinstall.',
    ],
  },
  features: {
    'Open a file, blame or history link':
      'The command reads the file and its selected lines from the editor and the remote from git. A host module writes the link, and VS Code opens it in the browser.',
    'Copy a link':
      'The same link goes to the VS Code clipboard, so a remote window fills the local one. A notice shows the URL.',
    'Links from the Explorer':
      'The Explorer menu passes the file or folder to the same command. The link carries no line anchor.',
    'Main or master first':
      'git checks the setting, then the remote HEAD, main and master for a branch that holds the file. With no match the link uses the current branch.',
    'Hosts and mapped URLs':
      'The host comes from a setting or from the remote URL. A mapping setting swaps a remote URL before the link builder writes the link.',
    Languages:
      'vscode.l10n picks the catalog from the VS Code display language. The command names and settings come from 9 package catalogs.',
  },
};

export default arch;
