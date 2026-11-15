import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Plain Markdown skills and a few scripts, with no server and no build. An installer links one clone into each coding agent on the machine, and CI checks the skills before each release.',
  parts: [
    {
      name: 'Agent Skills format',
      role: 'each skill is one Markdown folder that an agent loads when a request matches it.',
    },
    {
      name: 'Installer in POSIX shell',
      role: 'links the clone into Claude Code, Codex, Kimi Code and other agents, with a PowerShell wrapper for Windows.',
    },
    { name: 'Git hooks', role: 'link the skills again after a pull, a merge or a checkout.' },
    { name: 'Node scripts', role: 'merge the agent hooks into each agent’s settings and copy the MCP servers.' },
    { name: 'turn-voice hook', role: 'a C# player on Windows and a Node twin on a Mac that speak the end of a turn.' },
    {
      name: 'Python and TypeScript checks',
      role: 'check the skill format, the key words and the length of each skill.',
    },
    { name: 'GitHub Actions', role: 'runs the checks on Windows and Linux, then tags a dated release.' },
  ],
  flow: [
    'A person clones the repo and runs the installer.',
    'The installer links each skill folder into each agent it finds.',
    'The agent reads each skill description at the start of a session.',
    'A matching request loads the full skill, and the agent follows its steps.',
    'At the end of the turn the voice hook speaks the outcome.',
  ],
  links: [
    { to: 'agent-skills-private', text: 'The owner’s private rules and skills sit there, beside these public ones.' },
    { to: 'Claude Code', text: 'The installer links the skills and merges the hooks into its settings.' },
    { to: 'Codex', text: 'The same skills, the hooks and a copy of the MCP servers of Claude Code.' },
    { to: 'GitHub', text: 'The checks and the dated releases run on GitHub Actions.' },
  ],
  design: {
    scale: [
      'One person per machine, 33 skills, and any number of agents that read the Agent Skills format.',
      'Every session loads each skill description, so a description stays under 480 characters and a skill body under 300 lines.',
    ],
    data: [
      'No database. A skill is a folder with a SKILL.md and its front matter, plus references that load on demand.',
      'Hook groups sit in JSON files, and the turn-voice hook keeps its cached voice clips in a local folder.',
    ],
    interfaces: [
      'The contract with an agent is the front matter: the name equals the folder, and the description says when to load the skill.',
      'The installer merges hook groups into the settings of Claude Code and Codex, and writes a marked block for Kimi Code.',
      'The turn-voice hook reads the status marker on the last line of a turn and speaks the matching phrase.',
    ],
    reliability: [
      'Git hooks in the clone relink the skills after a pull, a merge, a checkout and a rebase, so a new skill shows up at once.',
      'The hook merge keeps the person’s own hooks. Without Node the install skips the hooks and says so.',
      'A failed voice fetch leaves only the sound cue, and a cached clip plays with no network.',
    ],
    security: [
      'The repo is public and holds no token. Fork PRs run on GitHub runners, so their code stays off the PC.',
      'The site skills stop at a login, a CAPTCHA, a secret or a payment, and leave those to the person.',
    ],
    performance: [
      'Only the short writing rules load on every turn. A full skill loads when a request matches its description.',
      'Voice clips are cached, and the cue and the voice join in one PlaySound call, so the first word comes through whole.',
    ],
    operations: [
      'The check workflow runs on Windows for the PowerShell install and on Linux for the shell install, with mise pinning each tool.',
      'The release workflow starts on workflow_run once check passes on main, and tags a date version such as v2026.10.30.1.',
      'mise run test checks the skill format, the prose budget, the unit tests and an install and uninstall in a temp home.',
    ],
    tradeoffs: [
      'One Markdown folder per skill over a rules file per agent, so one copy serves about 50 agents. Only the agent that reads a rule enforces it.',
      'One clone linked into each agent over a copy per agent, so an edit reaches every agent at once. Windows without Developer Mode gets junctions.',
      'A C# hook built with the csc.exe that ships with Windows, so no SDK is needed. It runs on Windows only, and a Node twin covers the Mac.',
    ],
  },
  features: {
    'Writing style':
      'A short rules file loads on every turn through each agent’s main rules file. The full skill loads before the first piece of text, with its word tables and a final check.',
    'Code review':
      'The review skill reads the PR or the diff and checks each problem against the code. One table comes back with the line, the input that breaks it and the fix.',
    'Reviewer lenses':
      'The reviewer skill picks the lenses for a diff or a repo and starts one subagent per lens. A domain lens such as legal or SEO loads its own skill.',
    'Pull requests':
      'The create-pr skill writes the body and opens or updates the PR with the GitHub CLI. Mermaid diagrams show each flow before and after.',
    'Review comments':
      'The address-comments skill reads each open thread through the GitHub CLI. Each fix lands as its own commit, and the reply names its SHA.',
    'Ticket to merge':
      'The implement-ticket skill reads Jira through the Atlassian MCP server or its CLI. The plan lands in the repo specs, and each commit carries the ticket key.',
    'App audit':
      'The app-audit skill starts the reviewer lenses with each agent in its own git worktree. The main agent picks the safe fixes onto one branch and merges the PR.',
    'Specs first':
      'The specs skill keeps one Markdown file per feature in the repo. Each change adds a dated entry in the first commit, before the code.',
    'One-pager':
      'The one-pager skill writes the full text first. It then puts a one screen summary on top, which adds no fact of its own.',
    'Commands through mise':
      'The mise skill runs each task through mise run and each other command through mise x. A new tool goes into the repo’s mise config at a pinned version.',
    Translations:
      'The translations skill picks the i18n tool for the stack and adds each string to every catalog. A test keeps the catalogs on the same keys.',
    Worktrees:
      'The git-worktrees skill makes a folder beside the repo with its ignored files and dependencies. After the merge a script checks the PR and removes the folder and the branches.',
    'Fast JavaScript':
      'The javascript skill holds rules taken from Vercel’s React best practices, minus the React parts. Each finding names the rule, the line and its cost.',
    Architecture:
      'The architecture skill writes the design into the repo docs with diagrams and a decision per choice. Lint or CI then enforces the layer rules.',
    Monorepos:
      'The monorepo skill picks the task runner and one workspace per language. One API schema generates a client per platform, and CI runs only the affected apps.',
    'History reset':
      'The reset-history skill saves a git bundle outside the repo, then builds one commit from the default branch. It asks once and force pushes with a lease.',
    'Rewrite a repo':
      'The rewrite-repo skill records the behaviour and plans a rename map for the code and the docs. It ends with one fresh commit in place of the history.',
    'Help on a site':
      'The guide-on-site skill drives the person’s own Chrome through Claude in Chrome. It fills the fields it knows and stops at each step only the person can take.',
    'Hung runs':
      'The hung-process skill finds the dev tool that holds a port or a lock on Windows. It ends that process tree and reruns the step, or hands over an elevated command.',
    'Search setup':
      'The seo-setup skill finds where the DNS sits and audits the live site and the repo. It then sets up Search Console, Bing and Cloudflare Web Analytics in the browser.',
    Ads: 'The ads-setup skill goes through the AdSense and AdMob dashboards with the person logged in. It wires the IDs into the code with test ads in debug builds.',
    'Google Play release':
      'The play-release skill builds a signed bundle with a new version code and keeps the key outside the repo. It rolls out to internal testing and returns the tester link.',
    'Launch in one run':
      'The launch skill asks the shared facts once. It then runs the search, ads and Google Play skills in order and ends with a table of each service.',
    Marketing:
      'The marketing skill starts from the budget and writes the message and a launch calendar. The plan stays in the repo docs, so the next run picks it up.',
    'In-app updates':
      'The app-update skill adds a check against GitHub releases at launch and on resume. A download bar and a notification follow, and the code stays out of the Play build.',
    'Names and domains':
      'A script checks each name against 3 domain endings and the Australian Business Register. It also checks IP Australia trade marks and needs no API keys.',
    'Legal risks':
      'A script scans the dependency licences and the data SDKs in the repo. The skill rates each risk in a doc and ships the safe fixes in a PR.',
    'App icons':
      'The agent draws 10 flat SVG icons and shows a picker in the chat. A script with resvg then exports the pick to each size the platforms need.',
    'Demo screenshots':
      'The app runs with made-up demo data while the agent takes screenshots and short videos. A shot list in the repo lets the next run take the same shots.',
    'Store media':
      'The store-media skill takes the screenshots and the icon from the repo and makes each size. It uploads them in the browser with the person logged in and asks before a review.',
    'End to end walk of a release':
      'The e2e-walk skill installs the newest release on an emulator or a phone and walks each flow from the docs. It skips each delete and keeps the flow list in the repo.',
    'Hear and pick a voice':
      'A Python script fetches each Microsoft neural voice through edge-tts and caches the clips. It prints each voice id and resumes from any number.',
    'Reddit comments':
      'The skill pulls hot threads through the Reddit MCP server and keeps the ones the repo can answer. Playwright types the draft into Chrome, and the person presses Comment.',
    'Voice at the end of a turn':
      'A hook reads the marker on the last line and picks the cue and the phrase. edge-tts speaks it through a C# player on Windows and Node on a Mac.',
    Install:
      'A POSIX shell installer links one clone into each agent it finds, with a PowerShell wrapper for Windows. Git hooks in the clone link the skills again after each pull.',
    'Agent hooks':
      'A Node script merges the hook groups into the settings of Claude Code and Codex. It also copies the MCP servers of Claude Code to Codex and Kimi Code.',
    Releases:
      'A GitHub Actions workflow starts once the checks pass on a push to main. It tags the commit with a date version and writes the notes from the commits.',
  },
};

export default arch;
