import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Langflip is one Rust program for Windows and macOS, with no server. A core crate decides each word, and a thin layer per system catches the keys and types the fix.',
  parts: [
    {
      name: 'langflip-core',
      role: 'the Rust crate with the 2 layouts, the language model and the keep or fix decision.',
    },
    {
      name: 'Windows hooks',
      role: 'low level keyboard and mouse hooks see each key in every app and send the fix as Unicode.',
    },
    { name: 'macOS event tap', role: 'the same job on a Mac, with the input sources for the layout.' },
    {
      name: 'Language model',
      role: 'letter triple scores and a dictionary per language, built from wordfreq and embedded in the exe.',
    },
    { name: 'tray-icon', role: 'the tray icon with the current layout, and its menu on both systems.' },
    { name: 'rust-i18n', role: 'the menu and tooltip text in 9 languages, built into the binary.' },
    {
      name: 'ureq and self-replace',
      role: 'the update check against GitHub Releases, and the swap of the running exe.',
    },
  ],
  flow: [
    'A low level hook catches each key in the app in front.',
    'The hook maps the physical key to a position, whatever the layout.',
    'The core scores the letters in both layouts against the model.',
    'When the other layout wins, the hook swallows the key.',
    'Langflip erases the word, types it in the other layout and switches the layout.',
  ],
  links: [
    {
      to: 'GitHub Releases',
      text: 'The Windows exe ships there. Langflip checks once a day for a newer one and sends only its version.',
    },
  ],
  features: {
    'Fix the layout of a word':
      'From the 4th letter the core compares the typed letters with the same keys in the other layout. The model scores both, and a clear winner gets typed again.',
    'Short words':
      'A score on 1 to 3 letters is too noisy, so the core checks the dictionary only. The fix waits for Space, Enter or Tab.',
    'Digits kept':
      'A digit types the same in both layouts, so the word buffer keeps it in place. The dictionary holds words with digits, such as mp3.',
    'Undo a fix':
      'The core keeps the last word as typed, and Undo types it back. A second Undo of the same word adds it to the keep list in the settings file.',
    'Convert by hand':
      'The core holds the word being typed or the last one. The hotkey sends it to the other layout with no check.',
    'Skip apps and fields':
      'The system layer checks the app in front against the list in the settings file. Password fields and admin windows get skipped through signals of the system.',
    'The current layout on the icon':
      'The Windows layer follows window and focus changes and reads the layout of the window in front. tray-icon draws EN or RU on the icon.',
    'Pause with a click':
      'A click flips the fixing switch, and the hook then lets each key pass. The tray draws the icon in grey.',
    'Switch the layout with a double click':
      'On Windows Langflip brings back the window that was in front and asks it to change layout. On a Mac it switches the input source.',
    'Start at login':
      'On Windows a Run key entry starts Langflip, and a Task Scheduler task backs it up. On a Mac a launch agent does the job.',
    'Settings file':
      'A TOML file in the app data folder holds the switch, the excluded apps, the kept words and the menu language. Langflip reads it again at the next window switch.',
    'Go on with a word':
      'On Windows UI Automation reads the word before the caret after a click or a field change. The core judges the new letters as the rest of that word.',
    'The app icon':
      'One SVG is the source of the icon. The build writes it into the exe, and the install script puts it on the shortcuts.',
    'Install on Windows':
      'The script builds the exe with Cargo and copies it to the programs folder of the user. It adds the shortcuts and the Settings entry with no admin rights.',
    'Tray menu':
      'tray-icon draws the same menu on Windows and macOS. rust-i18n gives its text in 9 languages, from the system language or the pick.',
    'Decision log':
      'The Windows layer writes each decision to a log file with the key count, the app and the reason. Letters stay out, and the file rolls over at 1 MB.',
    'Update from GitHub':
      'A thread asks the GitHub releases list once a day through ureq. After a click it checks the size and the SHA-256, and self-replace swaps the running exe.',
  },
};

export default arch;
