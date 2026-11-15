import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'A Node server on the PC serves a web page to an Edge app window. The server reads the repos and runs, and it opens a console with a coding agent for each task.',
  parts: [
    { name: 'Node 24', role: 'runs the server as TypeScript, with no packages and no build step.' },
    { name: 'Web page', role: 'a module per tab, shown in an Edge app window on the PC.' },
    { name: 'Coding agents', role: 'Claude Code, Codex or Kimi Code in a console per task.' },
    { name: 'adb', role: 'installs and opens the apps on a plugged in phone or TV.' },
    { name: 'JSON data files', role: 'the repos, the apps and the agent tasks that Archon lists.' },
    { name: 'Tailscale', role: 'publishes Archon inside the tailnet so the phone can open it.' },
    { name: 'PowerShell scripts', role: 'restore a PC and move the workspace to a new folder.' },
    { name: 'Framed pages', role: 'the CI status page, Reddit Desk and the Memories indexer shown in tabs.' },
  ],
  flow: [
    'The person ticks repos and picks a task, or speaks a command.',
    'The page posts the choice to the local server.',
    'The server writes a batch file and opens a console with the agent.',
    'The agent works in the repo and writes an end marker.',
    'The page polls the runs every 5 seconds and shows the progress.',
  ],
  links: [
    { to: 'local-ci', text: 'The CI tab frames its status page and starts it when it is off.' },
    { to: 'reddit-desk', text: 'The Reddit tab frames the app window over local HTTP.' },
    { to: 'memories', text: 'The Memories tab shows the progress of its photo indexer.' },
    { to: 'songfactory', text: 'The Songs tab runs its pipeline tiles and shows each run.' },
    { to: 'agent-skills-private', text: 'Its rules and skills set how each agent that Archon starts ships a change.' },
  ],
  design: {
    scale: [
      "One developer's PC, a few dozen repos, and 5 to 10 agents working at once.",
      'The run registry keeps the last 200 runs, and the rest is small JSON lists, so no database is needed.',
    ],
    data: [
      'JSON lists name the repos, the apps and the agent tasks that Archon shows.',
      'runs.json in the local app data folder holds each run with its start, end and result.',
      "Each repo's TODO.md and the agent session files are read in place, and Archon keeps no copy.",
    ],
    interfaces: [
      'server.ts maps each path to one function: reads answer GET with JSON, and actions answer POST with a line of text.',
      'A console run ends with a done or failed marker that the registry reads.',
      'Other tools sit behind adb, git, the GitHub releases API and the npm, crates.io and PyPI registries. Some tabs frame local pages over HTTP.',
    ],
    reliability: [
      'The server stays up until sign out, so runs and updates go on with every window closed.',
      'A second start finds the port taken and opens one more window on the same server.',
      'The page starts on its own catalogs, so the tab buttons work offline, and a tab that failed to load retries on the next click.',
    ],
    security: [
      'The server listens on loopback only, and the phone reaches it through Tailscale inside the tailnet.',
      "An action needs a JSON content type, so a page on another site can't post without a preflight, which the server doesn't answer.",
      "Ask Archon can't reach branch deletes or key rotation. The Keys tab shows each secret's age, not its value.",
    ],
    performance: [
      'The page polls the runs every 5 seconds from small files, so no push channel is needed.',
      'The time left for a run is the median of past done runs of the same kind.',
      'Repo syncs and package scans run 8 repos at a time.',
    ],
    operations: [
      'Every 2 minutes the updater pulls main and installs newer desktop builds. New Archon code restarts the server and reloads the page.',
      'A hidden shortcut in the Startup folder starts the server at sign in, with no window.',
      'mise run test checks that the English and Russian catalogs hold the same keys, then runs the Node test runner.',
    ],
    tradeoffs: [
      'A local web page over Tauri, since it runs on Node alone and opens on the phone. It needs Edge for the app window and speech.',
      'No packages and no build step, so git pull is the whole deploy. Routing is written by hand.',
      'A visible console per agent run over headless runs, so the person can watch and answer questions.',
    ],
  },
  features: {
    'Ask Archon':
      'Edge turns speech into text. Claude Code on Haiku then picks one launcher action, and the server runs it and opens its tab.',
    'Runs strip':
      'The server keeps a registry of runs and reads the end marker of each one. The time left is the median of past runs of the same kind.',
    Apps: "The cards come from a JSON list and the newest builds on the studio's releases repo. adb installs and opens them on the phone or TV.",
    'Ads on this phone':
      "A script sends each studio app an unlock link through adb. A matching key marks the phone in that app's storage and sets the ads switch.",
    'To do': 'The server reads the open items of each TODO.md file. Ticked items go to an agent console in their repo.',
    Sessions:
      "The server reads the Claude app session files and the Codex and Kimi Code sessions. A resume opens a console with the session's own agent.",
    Agents:
      'The repos come from a JSON list with their purpose, and the tasks from another. Each ticked repo gets a console with the agent on the task.',
    Docs: 'The server serves the Markdown of each repo. The page draws it with marked and the diagrams with mermaid.',
    Rules:
      "The server reads the shared rule files and each repo's AGENTS.md. It checks each repo for the files and tasks the conventions ask for.",
    Branches:
      'git lists the branches, worktrees and stashes of each repo with their PRs. Deletes run in git, and merges go to an agent.',
    Packages:
      'The server scans the package files of each repo and asks npm, crates.io or PyPI for the newest stable version. An update goes to an agent console per repo.',
    'CI, Reddit and Memories':
      'Each tab frames a page that another local program serves. Start runs the program while its page is off.',
    Songs:
      "The server reads the songfactory themes and runs each tile as a child process. It reads the steps and the log from the child's output.",
    Voices:
      'The tab lists the edge-tts voices and plays one. Use for the agents reruns the turn-voice hook installer with the picks.',
    Keys: 'The rotate-secrets script lists each CI secret with its age. A renewal opens a console where Claude Code runs the rotate-secrets skill.',
    'Archon on the phone':
      'Tailscale serve publishes the local server inside the tailnet. The phone adds the page to its home screen as an app.',
    'Restore a PC':
      'A PowerShell script brings back each item that a JSON list names. A check task fails on an item the PC holds and the list lacks.',
    'Move the workspace':
      'A PowerShell script runs from a temporary copy and moves the folder. It then fixes each place that names the old path, from worktree links to scheduled tasks.',
    'Sync the repos':
      'A Node script clones each repo from the JSON list that the folder lacks. It pulls the rest with git, 8 at a time.',
  },
};

export default arch;
