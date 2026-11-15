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
