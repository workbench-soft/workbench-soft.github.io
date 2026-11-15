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
  design: {
    scale: [
      "One developer's PC and its network shares, with each run covering the folders of one config.",
      'A big share is the limit that shaped it. Hashing is staged, and a progress line prints every 5 seconds with the time left.',
    ],
    data: [
      'A JSON config outside git holds the folders and rules. The repo ships config.example.json with made up paths.',
      'Each run writes a plan CSV with From, To and an optional Keep column, and a moves log with From, To and Time.',
      'The inventory command writes a Markdown report of counts, sizes, years, file types and likely copies.',
    ],
    interfaces: [
      'A command line with inventory, move, undo, dupes, candidates, sort and inbox, parsed with node:util parseArgs.',
      'The plan CSV is the contract between commands and the mover, so a person can edit it and apply it with move.',
      'Each CSV starts with a UTF-8 byte order mark, so Excel and PowerShell 5.1 read Cyrillic names right.',
    ],
    reliability: [
      "A run stops when its log can't be written, so each move stays undoable. The log gets each row before the next move.",
      'Across drives a move copies first and removes after, so a failed copy leaves the source whole.',
      'A duplicate whose kept copy is gone stays in place, and a run exits with 1 when a kept copy is missing afterwards.',
    ],
    security: [
      'The tool deletes no file. A remove moves it under quarantine with its drive and path kept.',
      'inventory, candidates, sort and inbox read names, sizes and dates only. dupes reads content only to hash it.',
      'It reads the local config and files, makes no network call and stores no token. Real paths stay out of git.',
    ],
    performance: [
      'dupes groups by size, hashes the first 1 MB, and reads in full only the files that still match.',
      'The walker reads file stats 64 at a time and counts each path once, so overlapping roots stay cheap.',
      'Hashing reads 4 files at a time and reports files, gigabytes, percent and time left.',
    ],
    operations: [
      'Node 24 runs the TypeScript files as they are, with no bundle, and mise runs each command and task.',
      'Checks run on each push to main, and Release then publishes a GitHub release once Checks pass. Pull request runs are off.',
      'A husky pre-push hook runs lint and tests. The tests build temp folders and leave real ones alone.',
    ],
    tradeoffs: [
      'Quarantine over deleting or the recycle bin, so a wrong rule costs a move back, at the cost of space freed only when the person empties it.',
      'One plan module for every command over checks in each command, so a kept copy or a clashing move stops the run in one place.',
      'A private config outside git over rules in the repo, so folder names stay on the PC, at the cost of copying the config to a new PC by hand.',
      'TypeScript on Node over the first PowerShell scripts, for tests and paths kept in config.',
    ],
  },
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
