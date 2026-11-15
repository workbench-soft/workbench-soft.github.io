import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Markdown skills and a rules file that a shell installer links into Claude Code, Codex and Kimi Code. Helper scripts audit the CI, store secrets and set up the MCP gateway.',
  parts: [
    { name: 'Markdown skills', role: 'the steps for one job each, loaded when a request names that job.' },
    { name: 'Rules file', role: 'the workflow rules that load on each turn of each session.' },
    { name: 'Shell installer', role: 'links the skills into each agent and wires the rules file into its config.' },
    {
      name: 'GitHub Actions templates',
      role: 'the Checks and Release workflows and the release gate that repo-ci copies into a repo.',
    },
    { name: 'gh and GraphQL', role: 'read the workflows and secret lists of each org repo in one call.' },
    { name: 'PowerShell script', role: 'stores a new secret value in GitHub without the agent seeing it.' },
    { name: 'mcpproxy', role: 'one gateway server that stands in for 5 MCP servers.' },
    { name: 'Python and TypeScript checks', role: 'check the frontmatter, links, key words and length of each skill.' },
  ],
  flow: [
    'The installer links the skills and copies the rules file into each agent.',
    'A session loads the rules file on each turn.',
    "A request that matches a skill's description loads that skill.",
    'The skill drives gh, scripts and MCP tools against GitHub and the consoles.',
    'The agent ships the change and ends the turn with a status marker.',
  ],
  links: [
    { to: 'agent-skills', text: 'The public skills install first, and these skills load its writing rules.' },
    { to: 'local-ci', text: 'The repo-ci templates build on the runners that local-ci routes.' },
    { to: 'ci', text: 'Its release scripts match the repo-ci templates.' },
    { to: 'Bitwarden', text: 'Each token goes to the vault first, then to GitHub through the rotation script.' },
    { to: 'GitHub', text: 'The skills move repos, add workflows and store secrets through gh.' },
  ],
  design: {
    scale: [
      'One owner, 11 skills, and the dozens of repos of one GitHub org that the skills audit and ship.',
      'A rules file loads on every turn of every session, so it stays short and each job rule moves into a skill.',
    ],
    data: [
      'No database. Skills are Markdown folders, and the rules file is one Markdown file that the installer copies into each agent.',
      'Each app repo lists its secrets in .github/secret-rotation.json: the kind, the provider page and what a new value costs.',
    ],
    interfaces: [
      'The audit script reads the workflow files and secret lists of every repo with one gh GraphQL call.',
      'The installer wires the rules file into the global files of Claude Code and Codex in a marked block, and Kimi Code reads the same line.',
      'One gateway server stands in for 5 MCP servers, so an agent loads a single tool list.',
    ],
    reliability: [
      'The release workflow builds beside Checks. A gate script looks up Checks at the end, so a failed Checks run cancels the build.',
      'A later Checks run starts the publish job through workflow_run, so no job holds a runner while it waits.',
      'Runs move to the owner’s PC when the cloud minutes run low, and jobs wait in the queue while it is off.',
    ],
    security: [
      'The rotation script reads a new value from a hidden prompt or a file and stores it with gh secret set, so the agent does not see it.',
      'Every token goes to the vault first and to GitHub second.',
      'The repo is private, since it names the org’s secret lists and runners. The public agent-skills repo holds the generic skills.',
    ],
    performance: [
      'Only the rules each turn needs load every time. A job rule loads from its skill when a request matches.',
      'The release build saves its files to the cache under the run id, so the publish job reuses them and takes a light runner for a minute.',
    ],
    operations: [
      'check.yml and release.yml read their runner from repo variables, which a router points at cloud runners first and the PC last.',
      'Releases get a date tag such as v2026.10.30.1 from shell scripts that the repo-ci templates share with the ci repo.',
      'mise run test checks the skills, the prose budget, the install in a temp home, the gateway and the release scripts.',
    ],
    tradeoffs: [
      'A private repo beside the public one, so the org’s runners and secret lists stay unpublished. It costs two clones and two installers.',
      'Job rules in skills over one long rules file, so a quiet turn pays fewer tokens. A skill with a weak description gets skipped.',
      'A manifest in each app repo over one central list, so a workflow change and its secret entry land in one PR. A repo with no manifest gets no rotation.',
    ],
  },
  features: {
    'Move a repo':
      'The move-repo skill has the agent find each link to the old address with gh. It then transfers the repo, makes it private and moves CI to the self-hosted runner.',
    'CI and releases for every repo':
      'A shell script reads the workflows of each org repo in one GraphQL call. The repo-ci skill then adds the missing Checks and Release from its templates.',
    'Rotate secrets':
      'A PowerShell script reads the secret list in each repo and stores each new value with gh. The person copies the value, so the agent sees none.',
    'Workflow rules':
      'A Markdown rules file loads on each turn of Claude Code, Codex and Kimi Code. It names the skill each job loads.',
    'MCP gateway':
      'mcpproxy runs the 5 servers behind one stdio server, and each session gets its own data folder. The agent searches for a tool, then calls it.',
    Releases:
      'A release workflow starts once the check workflow passes on main. Two shell scripts pick the date tag and write the notes.',
    'Feature queue':
      'Each session writes a claim file on a board in the home folder of this PC. A session whose files overlap waits and checks again.',
  },
};

export default arch;
