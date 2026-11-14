import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'A TypeScript command line tool that Node runs on Windows with no bundle. Each command builds a plan of moves from a private config, and one module applies each plan.',
  parts: [
    { name: 'Node', role: 'runs the TypeScript files as they are.' },
    { name: 'zod', role: 'checks the config file of folders and rules before a run.' },
    { name: 'File walker', role: 'lists files with size and date, 64 at a time, and counts each path once.' },
    {
      name: 'Rules modules',
      role: 'turn the config into moves for copies, files safe to drop, topic sort and the monthly inbox.',
    },
    { name: 'Plan checks', role: 'stop a plan with a clash, a repeated path or a kept copy before the first move.' },
    { name: 'Mover', role: 'makes folders, renames on a clash and logs each move before the next one.' },
    { name: 'CSV files', role: 'the plan and the moves log, with a byte order mark so Excel reads Cyrillic names.' },
  ],
  flow: [
    'The person runs a command through mise, often as a dry run first.',
    'The tool reads and checks the private config.',
    'It walks the folders and builds a list of moves.',
    'The plan goes to a CSV the person can edit.',
    'The mover applies the plan and logs each move for undo.',
  ],
  links: [{ to: 'GitHub', text: 'Runs the checks on each push to main and publishes a release with notes.' }],
  features: {
    'Folder report':
      'The walker reads names, sizes and dates in the listed folders. The tool writes the counts, years, types and likely copies into a Markdown file.',
    'Duplicates to quarantine':
      'Files of the same size get a hash of their first 1 MB, then a full SHA-256. Path rules rank each copy, and the best ranked one stays.',
    'Files safe to drop':
      'Each rule matches a name, a path or an age and names a quarantine category. A keep pattern wins over each rule.',
    'Sort into topic folders':
      'A sort job holds match rules for folders and files with a target for each. Entries with no match go to a fallback, such as a folder per year.',
    'Monthly inbox':
      'The tool reads the dates of the entries in the inbox folder. Entries older than 30 days move into a folder named for their month.',
    'Plans, moves and undo':
      'Each run writes a plan CSV and a moves log. The mover checks the plan before the first move, and undo reads the log to put files back, last first.',
  },
};

export default arch;
