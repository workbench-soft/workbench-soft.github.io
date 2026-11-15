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
  design: {
    scale: [
      'One person per PC or Mac. Typed text stays on the machine, and the whole install is one exe.',
      'The model covers 2 languages, English and Russian, each with a dictionary of the top 100,000 words and a table of letter triples.',
      'Only 2 fixed layouts exist, US QWERTY and Russian ЙЦУКЕН. The hook must answer inside its callback, so a decision takes microseconds.',
    ],
    data: [
      'Settings sit in settings.toml in the app data folder. The model file is built into the binary.',
      'The model file starts with the magic LFM1, then per language an alphabet, letter triple log probabilities as f32 and a dictionary.',
      'The Windows log keeps key counts, app names and decisions, with no letters, in 1 MB files that roll over to langflip.old.log.',
    ],
    interfaces: [
      'The core crate takes key positions and the layout in use, and returns a fix or no fix. Both system layers call it.',
      'Windows uses WH_KEYBOARD_LL and WH_MOUSE_LL hooks, SendInput for the fix and WM_INPUTLANGCHANGEREQUEST for the layout.',
      'macOS uses a session CGEventTap, CGEvent posts for the fix and Text Input Sources for the layout.',
      'The update check reads the GitHub releases API once a day for langflip-v* tags and sends only its version.',
    ],
    reliability: [
      'Events the fix sends carry a Langflip tag, so the hook lets them through. Keys typed during a fix wait and replay after an end marker.',
      'Held keys wait up to 500 ms for the window to take the new layout, and a stuck fix lets them go after 1 second.',
      'Undo types the word back as typed, and a second Undo adds it to the keep list.',
      'Autostart is a Run key entry backed by a Task Scheduler task, for when Explorer skips the Run key.',
    ],
    security: [
      'No server and no account. The one network call is the update check, and it carries no typed text.',
      'Password fields and admin windows are skipped, and the settings file lists more apps to skip.',
      'The log holds no letters. Elevated windows stay out of reach unless Langflip runs as admin, and macOS needs Accessibility and Input Monitoring access.',
      'The update swap checks HTTPS and the asset size, with no signature, and the exe is unsigned.',
    ],
    performance: [
      'The core scores a word with a table lookup in microseconds, with no garbage collector pause inside the hook callback.',
      'From the 4th letter the engine checks the word while it is typed, so the fix lands before the word ends.',
      'The model is embedded and the sorted word list loads in about 20 ms. A set of every word start took 0.4 s at each start and lost.',
      'caret.rs reads up to 40 characters before the caret through UI Automation, on its own thread, 40 ms after a click.',
    ],
    operations: [
      'mise run lint covers rustfmt, clippy, cargo shear, ruff, shellcheck and actionlint, and CI checks the macOS build from Windows.',
      'mise run eval measures false fixes and misses on 10,000 dictionary words and 10,000 rarer words per language.',
      'A release workflow publishes langflip.exe on GitHub Releases with a date version passed in LANGFLIP_VERSION.',
      'The app checks for a newer release, asks first, and self-replace swaps the running exe. mise run install needs no admin rights.',
    ],
    tradeoffs: [
      'A Rust core crate and a thin layer per system over one mixed crate, so core tests run on any OS, at the cost of each fix made twice.',
      "Low level hooks in Langflip's own process over a hook DLL, so no code loads into other apps, but elevated windows stay out of reach.",
      'Letter triples plus a dictionary over a dictionary alone, so unknown words get caught, but a rare word can switch early and Undo puts it back.',
      "Static tables for 2 layouts over reading any layout from the system, so Windows and macOS give the same letters, but other layouts don't work.",
    ],
  },
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
