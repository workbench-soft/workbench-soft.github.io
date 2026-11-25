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
  design: {
    scale: [
      'One person on one Windows PC, with caps that keep it small: 6 comment drafts, 3 post drafts and 3 posted comments an hour.',
      'A Find takes 1 to 5 minutes, because Claude Code reads the threads itself.',
    ],
    data: [
      'Plain JSON files in the app data folder hold the settings, the queue, the post cards and both histories.',
      'history.json keeps posted and skipped threads with the date, and the next Find skips them. opens.json holds the time of each posted comment in the last day.',
    ],
    interfaces: [
      'The core runs claude -p with stream-json and turns each output line into a find-log event for the window.',
      'Claude reaches Reddit through one MCP server pinned to a commit, passed with --strict-mcp-config.',
      'The window calls the core through Tauri invoke, or through HTTP and server-sent events when Archon frames it.',
      'Post it for me drives Chrome over the DevTools protocol with chromiumoxide.',
    ],
    reliability: [
      'A Find can be cancelled, and the core parses found.json after the run and keeps 6 cards.',
      "Post it for me counts a comment as posted only after the page shows a comment by the account with the draft's text.",
      'One app runs at a time. A second start shows the open window, and a background run quits 2 minutes after the frame closes.',
    ],
    security: [
      "The Reddit login stays in the person's Chrome profile or the app's own Chrome folder. The app stores no password.",
      "The local server answers only a loopback Host, and a POST needs a JSON content type, so another site can't call it.",
      'A Claude run may use read tools, the Reddit server and a write to its own output file. The updater checks a signature before it installs.',
    ],
    performance: [
      'Claude and Chrome run as child processes with no console window, and the window gets streamed lines instead of waiting for the end.',
      'The release build skips LTO and takes 16 codegen units, which cut the compile from 18 minutes to about 2.',
      "The runner keeps cargo's target folder between builds, so only the app crate compiles again.",
    ],
    operations: [
      'Checks and Release start together on each push to main, and a release gate cancels the build when Checks fail.',
      'Publish tags the commit with the date and uploads the NSIS installer. A signed latest.json drives the updater.',
      'The Tauri updater checks at start and every 24 hours, then installs the new build quietly.',
    ],
    tradeoffs: [
      'Claude Code with a skill over the Reddit API called from Rust, so the thread rules live in one place. A Find runs slower.',
      'Tauri 2 over Electron, which ships a whole Chromium in each install. The cost is 2 languages to check.',
      "The app's own Chrome with a debug port over the person's Chrome, since Chrome 136 refuses a debug port on the default profile. It needs one more Reddit login.",
      'The old Reddit form over the new editor, which hides its inputs in shadow roots.',
    ],
  },
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
    Activity:
      'The Rust side streams each step and each stdout line of Claude Code to the window as events. The panel keeps the last 500 in memory.',
  },
};

export default arch;
