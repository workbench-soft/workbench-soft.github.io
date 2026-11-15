import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'A Tauri 2 app for Windows with a Rust core and a React window. The core runs Claude Code to find threads and draft text, and it opens Chrome for the posting.',
  parts: [
    { name: 'Tauri 2', role: 'the desktop shell that packs the window and the Rust core into one installer.' },
    { name: 'Rust core', role: 'runs Claude Code and Chrome, keeps the JSON files and holds the pace caps.' },
    { name: 'React and Vite', role: 'the window with the Comments and Posts tabs and their cards.' },
    { name: 'Claude Code', role: 'reads the repo, fetches threads through a Reddit MCP server and writes the drafts.' },
    { name: 'chromiumoxide', role: "drives the app's own Chrome window when the person presses Post it for me." },
    { name: 'axum', role: 'serves the same window over local HTTP, so Archon can frame it.' },
    { name: 'i18next', role: 'the 9 language catalogs of the window.' },
    { name: 'Tauri updater plugin', role: 'checks for a signed new build and installs it.' },
  ],
  flow: [
    'The person picks a repo and presses Find.',
    'The core starts Claude Code in that repo with the reddit-comments skill.',
    'Claude reads hot threads through the Reddit server and writes drafts to a file.',
    'The core keeps 6 drafts and shows them as cards.',
    'The person opens a card, and Chrome gets the thread with the draft.',
  ],
  links: [
    { to: 'agent-skills', text: 'Its reddit-comments skill picks the threads and sets the voice of each comment.' },
    { to: 'archon', text: 'The Reddit tab of Archon frames the window and starts the app when it is closed.' },
    { to: 'Reddit', text: 'Claude reads threads through an MCP server, and the person posts in Chrome.' },
    {
      to: 'GitHub Releases',
      text: 'The installer and the signed update file sit in a release of the public site repo.',
    },
  ],
  features: {
    'Repo picker':
      'The Rust core lists each git folder under the root folder from the settings. The pick saves to a JSON file in the app data folder.',
    Subreddits:
      'The core runs Claude Code with no MCP server and read tools only. Claude names the subs from the repo, and the list is kept per repo.',
    'Find threads':
      'The core runs Claude Code in the repo with the reddit-comments skill and a Reddit MCP server. Claude writes the threads and drafts to a file, and the core keeps 6.',
    'Steps on top': 'The React window lights the step that waits, from the state of the Find run and the cards.',
    Cards: 'The cards come from a queue file the core writes. Edits save to it when the text box loses focus.',
    'Open in Chrome':
      'The core puts the draft on the clipboard and starts Chrome in the profile the person picked. A cap holds the pace at 3 posted comments an hour.',
    'Post it for me':
      'The core starts its own Chrome with a debug port and drives it through chromiumoxide. It fills the old Reddit form, presses Save and checks that the comment shows.',
    'Posts tab':
      'Claude Code reads the ticked repos and the marketing skill, then writes post drafts to a file. The core keeps 3 and drops media that has no file.',
    'Screenshots and videos':
      "Claude picks up to 4 files from the repo's screenshots folder by their captions. A press on a file opens Explorer on it.",
    'Open a post':
      'The core opens the old Reddit submit page in Chrome with the title and body in the address. A post with media opens Explorer on the first file.',
    'Ban risk':
      'A Rust module rates the next post from the post and comment history files. The rules come from the marketing skill, such as one community a day.',
    'Tester post':
      'The core fills a template from the Google Group link and the app lines in the panel. No Claude run is needed.',
    'Inside Archon':
      'The core serves the same window and commands over local HTTP with axum. Archon frames it, and the app quits 2 minutes after the tab closes.',
    'Info button':
      'A dialog in the window lists what Find needs and the ban risk rules. It also shows the version and a check for updates.',
    Updates:
      'The Tauri updater plugin reads a signed update file from a GitHub release at start and every 24 hours. It checks the signature before it runs the installer.',
    Language:
      'i18next holds the 9 catalogs in the window. The pick saves in the settings file, so the Tauri window and the Archon frame share it.',
    'Done list':
      'Posted and skipped threads move to a history file with the date. The next Find passes them to Claude to skip.',
  },
};

export default arch;
