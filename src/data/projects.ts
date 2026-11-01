// Each project's text comes from its repo: docs/features.md and the README.

export type Kind = 'app' | 'tool' | 'archive';

export interface Feature {
  name: string;
  text: string;
}

export interface FeatureGroup {
  /** Shown above the group. A project with one group leaves it out. */
  title?: string;
  features: Feature[];
}

export interface Project {
  id: string;
  kind: Kind;
  /** OKLCH hue of the project's accent colour. */
  hue: number;
  code: string;
  name: string;
  tagline: string;
  lede: string;
  platforms: string[];
  stack: string[];
  links: { href: string; label: string }[];
  groups: FeatureGroup[];
}

/** The order of the filter chips and the groups. Their labels sit in src/i18n/. */
export const kinds: Kind[] = ['app', 'tool', 'archive'];

export const projects: Project[] = [
  {
    id: 'memories',
    kind: 'app',
    hue: 210,
    code: 'MEM',
    name: 'Memories',
    tagline: 'On this day photos from your own NAS.',
    lede: 'Memories shows this day in earlier years, from the photos and videos on a home NAS. It works like the reminders in Google Photos, and the photos stay on hardware the owner keeps at home.',
    platforms: ['Android', 'Windows', 'macOS', 'NAS'],
    stack: ['Expo', 'React Native', 'Rust', 'Tauri', 'WebDAV', 'Tailscale'],
    links: [{ href: '/memories-mobile/', label: 'Open the site' }],
    groups: [
      {
        features: [
          {
            name: 'Daily reminder',
            text: 'A notification at the chosen time names the year and the place, such as "3 years ago in Japan". Trips abroad go first.',
          },
          {
            name: 'Today',
            text: 'This month and day in each year of the library. A tap on the date picks any other day.',
          },
          {
            name: 'Trips',
            text: 'A run of days with photos abroad becomes a trip. One link opens its photos from the first day to the last.',
          },
          {
            name: 'Photos and archive',
            text: 'Each photo and video, newest first, under a header per day. The archive lists each year and month with a count.',
          },
          { name: 'Places', text: 'Each day names where it was. A filter bar searches places and picks devices.' },
          {
            name: 'Camera and drone shots',
            text: 'Shots from a camera or a drone get their own group beside the phone shots.',
          },
          {
            name: 'Pinch to resize',
            text: 'A pinch sets 1 to 6 tiles per line, shared by each grid and kept between launches.',
          },
          {
            name: 'Send many at once',
            text: 'A long press starts picking. The picked photos go to any app in one share.',
          },
          {
            name: 'Album links',
            text: 'Picked photos become a link. The other person opens the album in a browser, with no app or account.',
          },
          {
            name: 'Organize',
            text: 'Step cards sort the photos on the phone, move them to dated folders on the NAS and free up the phone.',
          },
          {
            name: 'Sort on the NAS',
            text: 'Picked NAS files get their dated name and folder, on the NAS and in the index at once.',
          },
          {
            name: 'Viewer',
            text: 'Photos and videos full screen, with a swipe to the next. Videos play straight from the NAS.',
          },
          {
            name: 'Connect to the NAS',
            text: 'The app finds the NAS on the Wi-Fi. One login opens the photo folder over WebDAV.',
          },
          {
            name: 'Away from home',
            text: 'A second address through Tailscale reaches the NAS without opening it to the internet.',
          },
          {
            name: 'Sync progress',
            text: 'A banner tells what the phone and the NAS index hold, what runs now and what comes next.',
          },
          {
            name: 'Mobile data',
            text: 'The first sync on mobile data asks first. A switch in Settings changes the answer.',
          },
          {
            name: 'Index on the NAS',
            text: 'An indexer on the NAS reads the photos from its own disk, far faster than a sync over WebDAV.',
          },
          {
            name: 'Move to a new phone',
            text: 'The new phone takes the index from the old one, in place of a first sync that takes hours.',
          },
          {
            name: 'English and Russian',
            text: 'The app follows the phone language. Android 13 and later set it per app.',
          },
          { name: 'Light and dark', text: 'Follows the phone, or a fixed choice in Settings.' },
          {
            name: 'Remove ads',
            text: 'A one time Google Play purchase hides the ads on each phone with the same Google account.',
          },
        ],
      },
    ],
  },
  {
    id: 'spotthecam',
    kind: 'app',
    hue: 25,
    code: 'STC',
    name: 'SpotTheCam',
    tagline: 'Speed cameras of Australia and New Zealand on one map.',
    lede: 'SpotTheCam puts the official speed camera sites of the Australian states and New Zealand on one map. Each marker carries the limit that applies right now. The Android app adds voice warnings, a trip log and turn by turn routes.',
    platforms: ['Web', 'Android'],
    stack: ['Next.js', 'Capacitor', 'MapLibre', 'Cloudflare Workers'],
    links: [{ href: 'https://spotthecam.com', label: 'spotthecam.com' }],
    groups: [
      {
        title: 'On the map, in any browser',
        features: [
          {
            name: 'Live limits',
            text: "Each camera shows the limit at this moment. In a school zone the number follows the zone's timetable.",
          },
          { name: 'Suburb search', text: 'Type a suburb, and the map flies to its cameras.' },
          { name: 'Camera types', text: 'A press keeps only the types you need. The browser remembers the pick.' },
          {
            name: 'Follow me',
            text: 'The map follows you and turns to your heading. Street names and signs stay upright.',
          },
          {
            name: 'Camera details',
            text: 'A marker opens the type, the address, the limit now and a link to the official source.',
          },
          {
            name: 'Works offline',
            text: 'The camera list and each map area you opened stay on the device. It installs as an app.',
          },
          { name: 'Light and dark map', text: 'Auto matches the device, or pick one in the gear menu.' },
        ],
      },
      {
        title: 'In the Android app',
        features: [
          { name: 'Speed badge', text: "Your speed beside the road's limit. The badge turns red above it." },
          {
            name: 'Camera warnings',
            text: 'A beep about 20 seconds ahead, then "Speed camera ahead. Limit 60." It reaches the lock screen too.',
          },
          { name: 'Over the limit', text: '"You\'re doing 72. Slow down." Near cameras only, or on any road.' },
          {
            name: 'Trip log',
            text: 'Drives and walks record on their own. Each route shows your speed at each camera, green or red.',
          },
          {
            name: 'Share a trip',
            text: 'A link shows the route in any browser. Stop sharing removes it from the server.',
          },
          { name: 'Distance', text: 'Large digits give the km of the current trip and the total for the day.' },
          {
            name: 'Turn by turn routes',
            text: "The fastest order through the stops, turns called at 500 m and 200 m, around today's traffic. A wrong turn gets a new route.",
          },
          {
            name: 'Route options',
            text: 'And back, on foot, or around toll roads. Favourites such as Home go on the route with a tap.',
          },
          {
            name: 'Hey Spot',
            text: '"Hey Spot, go to Bondi Beach, Manly and back." An offline model on the phone hears the wake words.',
          },
          { name: 'Screen stays on', text: 'The map stays lit on the dashboard while the app is open.' },
          {
            name: 'Self-update',
            text: 'The APK checks GitHub for a newer release, with the size, progress and a cancel button.',
          },
        ],
      },
    ],
  },
  {
    id: 'guitar-upscale',
    kind: 'app',
    hue: 300,
    code: 'GUP',
    name: 'Guitar Upscale',
    tagline: 'A guitar you play in the browser.',
    lede: 'Guitar Upscale shows scales and chords on a virtual fretboard, records loops and saves them as MIDI. It edits songs note by note, shows them as tab, and installs to the home screen.',
    platforms: ['Web', 'Android'],
    stack: ['Next.js', 'React', 'Web Audio', 'MIDI', 'Capacitor', 'Cloudflare'],
    links: [{ href: 'https://guitar-upscale.com', label: 'guitar-upscale.com' }],
    groups: [
      {
        features: [
          {
            name: 'Fretboard',
            text: 'The fretboard fills the screen, marks the notes of the scale and plays each note you tap.',
          },
          {
            name: 'Scale, tuning and capo',
            text: 'One button names the key and mode, and opens the pickers for scale, tuning and capo.',
          },
          { name: 'Tuner', text: 'Listens through the microphone, with a dial that grows with the window.' },
          { name: 'Chords of the key', text: 'One chord per scale note, such as Em F#dim G Am Bm C D for E minor.' },
          { name: 'Strumming', text: 'A held chord strums a pattern in time with the clock. Patterns are editable.' },
          { name: 'Song list', text: 'Built-in songs and your own. Songs that fit the current scale show in green.' },
          { name: 'Voice search', text: 'Say a song name. The words fill the search as you speak.' },
          { name: 'Hey Guitar', text: '"Hey Guitar, play Metallica One." The app answers "Listening" and plays it.' },
          {
            name: 'MIDI recording',
            text: 'Records the notes and chords you play. Notes the app plays back stay out of the take.',
          },
          { name: 'Looper', text: 'Short loops on several channels play together.' },
          {
            name: 'Quantize',
            text: 'One length from 1/1 to 1/64 sets the grid, the recording and the looper, as in Cubase.',
          },
          {
            name: 'Piano roll',
            text: 'Draw, move, stretch, copy and erase notes. The ruler marks verse, chorus, bridge and solo.',
          },
          { name: 'Tab view', text: 'A track as Guitar Pro style tab, with a playhead that follows the song.' },
          {
            name: 'Chord sheet',
            text: 'Chord names in bars that light up with the song. The words open on Musixmatch.',
          },
          { name: 'Song upload', text: 'Guitar Pro and MIDI files join your song list.' },
          {
            name: 'Find a song online',
            text: 'Searches 4 song sites at once. A Songsterr song turns into a Guitar Pro file.',
          },
          { name: 'Chord and scale detection', text: 'Play, and the app names the chord or the scale it hears.' },
          { name: 'Instruments', text: 'Lead and chord instruments apart: sitar, banjo, koto, strings and more.' },
          {
            name: 'Effects',
            text: 'Reverb and delay, each with its own switch and sliders. The sound changes as a slider moves.',
          },
          { name: 'MIDI export', text: 'Files download, or go out through the share sheet.' },
          {
            name: 'Paid tiers',
            text: 'Patreon sign in or a Google Play purchase unlock the Explorer and Composer tools.',
          },
          {
            name: 'Install and offline',
            text: 'A PWA that opens full screen in landscape. The Android APK updates itself.',
          },
        ],
      },
    ],
  },
  {
    id: 'tickalot',
    kind: 'app',
    hue: 150,
    code: 'TCK',
    name: 'Tickalot',
    tagline: 'Shopping, packing and sightseeing lists you share by link.',
    lede: 'The other person opens the link and ticks items, and each tick shows on both phones at once. There is no sign up. Lists stay on the phone, and a shared list also goes to the cloud.',
    platforms: ['Android', 'Web'],
    stack: ['Expo', 'React Native', 'Firebase', 'OpenStreetMap', 'Wikipedia'],
    links: [{ href: 'https://tickalot.web.app', label: 'tickalot.web.app' }],
    groups: [
      {
        features: [
          {
            name: 'Share by link',
            text: 'Both phones see each tick live. Edits made offline sync once the network is back.',
          },
          {
            name: 'Base list',
            text: "The things you usually buy. A few taps turn it into this week's list, with amounts and notes.",
          },
          {
            name: 'Type or say many items',
            text: '"Croissants 2 packs of 3, organic eggs" becomes 2 items with amounts. English and Russian.',
          },
          { name: 'Pictures', text: "The app picks an emoji from each item's name. One tap adds a photo." },
          {
            name: 'Store aisles',
            text: 'Pick the shop from OpenStreetMap and type an aisle once. The list then follows your walk.',
          },
          { name: 'Shared aisles', text: 'Aisles one shopper types fill in for each person who picks the same shop.' },
          {
            name: 'Coles and Woolworths prices',
            text: 'A unit price under each item, with the cheaper shop in green.',
          },
          { name: 'Packing for a trip', text: 'Each trip starts as a copy of your usual packing list.' },
          { name: 'Things to see', text: 'Places from Wikipedia, spread over the days of the trip.' },
          { name: 'Done lists', text: 'A finished list tidies itself away, with no clean up by hand.' },
          { name: 'Light and dark', text: 'Follows the phone, or a fixed choice.' },
          { name: 'Updates', text: 'The APK offers a newer release with its size and a warning on mobile data.' },
          { name: 'Remove ads', text: 'A one time purchase. People in Europe see the consent form before any ad.' },
        ],
      },
    ],
  },
  {
    id: 'keeppad',
    kind: 'app',
    hue: 70,
    code: 'KPD',
    name: 'KeepPad',
    tagline: 'Voice notes you start by saying "Hey Keep".',
    lede: 'Say "Hey Keep" and the app replies "Recording". It types out what you say next and files the note in the right group, with the app closed and the screen off.',
    platforms: ['Android', 'iPhone', 'Web'],
    stack: ['Expo', 'React Native', 'Firebase', 'On-device speech', 'Gemini Nano'],
    links: [{ href: 'https://keeppad.com', label: 'keeppad.com' }],
    groups: [
      {
        features: [
          { name: 'Hey Keep', text: 'A wake word the phone listens for in the background. "Эй, Кип" works too.' },
          {
            name: 'Stop and continue',
            text: '"Stop" ends the note at once. "Hey Keep, continue" adds to the newest note.',
          },
          { name: 'Record by button', text: 'The words show on screen as you talk.' },
          { name: 'Recordings', text: 'On Android 13 and later and on iPhone, a note keeps its sound.' },
          {
            name: 'Groups',
            text: 'To do, Shopping, Ideas, Work and more. On-device AI picks the group on phones that have it.',
          },
          {
            name: 'English and Russian',
            text: 'A note uses either language or both. On Android 14 a note can switch language at a pause.',
          },
          {
            name: 'Share by link',
            text: 'The other person opens the note in the app or a browser, and both edit it live.',
          },
          { name: 'Send to other apps', text: 'New notes go to Obsidian, Notion, Todoist, Google Docs or OneNote.' },
          { name: 'Website', text: 'Shared notes open in a browser, beside the guides and the policies.' },
          { name: 'In-app update', text: 'The APK finds a newer release, downloads it and opens the installer.' },
          { name: 'Light and dark', text: 'Follows the phone, or a fixed choice.' },
        ],
      },
    ],
  },
  {
    id: 'servohop',
    kind: 'app',
    hue: 110,
    code: 'SVH',
    name: 'ServoHop',
    tagline: "Australian fuel prices on a map, with each servo's history.",
    lede: 'ServoHop reads the state fuel price schemes and puts each servo on a map, coloured by price. It keeps the daily history and shows EV chargers too. It is free and needs no account.',
    platforms: ['Web', 'Android', 'iPhone'],
    stack: ['Expo', 'React Native', 'MapLibre', 'Cloudflare Workers'],
    links: [{ href: 'https://servohop.com', label: 'servohop.com' }],
    groups: [
      {
        features: [
          {
            name: 'Prices on a map',
            text: 'Green pins for the cheapest third, amber for the middle and red for the dearest.',
          },
          {
            name: 'Station list',
            text: 'The servos in view, cheapest first, with brand, suburb and when the price changed.',
          },
          {
            name: 'Price history',
            text: 'The daily average over a band from the low to the high, for 30, 90 or 365 days.',
          },
          { name: 'Driver reports', text: 'Where no state feed exists, drivers send the price on the board.' },
          {
            name: 'EV chargers',
            text: 'Network, plugs and top power. Drivers report the price per kWh, and the app keeps its history.',
          },
          {
            name: 'Search pages',
            text: 'A page for each state, suburb and servo, with structured data and a sitemap.',
          },
          {
            name: 'Self-update',
            text: 'The APK checks GitHub on start and on each return, and shows the download in the header.',
          },
          { name: 'Remove ads', text: 'A one time Google Play purchase, restored on a new phone.' },
        ],
      },
    ],
  },
  {
    id: 'consdr',
    kind: 'app',
    hue: 255,
    code: 'CNS',
    name: 'Consdr',
    tagline: 'Lease, loan or cash: what a car costs in Australia.',
    lede: 'Consdr shows the total cost of the same car over the same term as a novated lease, a car loan and a cash purchase. Each fixed number in the working links to its source.',
    platforms: ['Web', 'Android'],
    stack: ['React', 'Vite', 'Cloudflare Workers', 'Service worker'],
    links: [{ href: 'https://consdr.com', label: 'consdr.com' }],
    groups: [
      {
        features: [
          { name: 'Three ways side by side', text: 'Lease, loan and cash, each as one total for the whole term.' },
          {
            name: 'Where the money goes',
            text: 'Each total splits into the car, finance, running costs, tax and missed interest.',
          },
          {
            name: 'Lease and loan settings',
            text: 'Rate, balloon, fees, fuel through the lease and the FBT exemption.',
          },
          {
            name: 'FBT by car type',
            text: 'The rule for an electric car, a plug-in hybrid or a petrol car, by start date and price.',
          },
          {
            name: 'Stamp duty by state',
            text: 'All 8 states and territories, from the price, car type and start date.',
          },
          {
            name: 'Account interest',
            text: 'The money grows each month in a mortgage offset or a savings account, so the comparison stays fair.',
          },
          { name: 'Borrowing for a home', text: 'How much less a bank would lend while the car is paid off.' },
          { name: 'Working and sources', text: 'Each step of the sum, with a source for each fixed number.' },
          { name: 'Common questions', text: 'Answers on leases, the EV exemption, balloons and home loans.' },
          {
            name: 'Guides',
            text: 'Plain pages on novated leases, FBT, balloons and stamp duty, with numbers from the same rules.',
          },
          { name: 'Saved inputs', text: 'A reload keeps your fields. Reset to defaults clears them.' },
          { name: 'Offline', text: 'The calculator opens with no network after the first visit.' },
          { name: 'Colour theme', text: 'Auto, Light or Dark.' },
          { name: 'Remove ads', text: 'A one time purchase in the Android app.' },
        ],
      },
    ],
  },
  {
    id: 'langflip',
    kind: 'app',
    hue: 345,
    code: 'LFP',
    name: 'Langflip',
    tagline: 'Fixes words typed in the wrong keyboard layout.',
    lede: 'Type ghbdtn with the wrong layout on, and Langflip types «привет» in its place and switches the layout. English works the same way. It runs offline and keeps no log of what you type.',
    platforms: ['Windows', 'macOS'],
    stack: ['Rust', 'Win32', 'Dictionaries'],
    links: [{ href: '/langflip/', label: 'Download' }],
    groups: [
      {
        features: [
          {
            name: 'Fix while typing',
            text: 'From the 4th letter, a word that only makes sense in the other layout gets typed again in it.',
          },
          {
            name: 'Short words',
            text: 'Words under 4 letters change on Space, Enter or Tab, only when the other layout gives a real word.',
          },
          { name: 'Digits kept', text: 'ьз3 turns into mp3.' },
          { name: 'Undo a fix', text: 'Pause right after a fix brings the word back and remembers it.' },
          { name: 'Convert by hand', text: 'Shift+Pause converts the last word to the other layout.' },
          {
            name: 'Skip apps and fields',
            text: 'Password fields, admin windows and any app in the settings stay untouched.',
          },
          { name: 'Layout on the icon', text: 'The tray shows EN on blue or RU on red for the window in front.' },
          { name: 'Pause with a click', text: 'A click on the tray icon turns fixing off, and the icon turns grey.' },
          {
            name: 'Switch with a double click',
            text: 'A double click on the icon switches the layout of the window in front.',
          },
          { name: 'Start at login', text: 'Turns on at the first start, with a switch in the tray menu.' },
          { name: 'Settings file', text: 'Excluded apps and words to keep, in one TOML file.' },
        ],
      },
    ],
  },
  {
    id: 'media-organizer',
    kind: 'app',
    hue: 185,
    code: 'MOR',
    name: 'Media Organizer',
    tagline: 'Sorts photos and videos into folders by date and place.',
    lede: 'A desktop app that reads when and where each photo was taken, then moves it into a year, place and day folder. It shares the folder rules of Memories, so the phone and the computer sort the same way.',
    platforms: ['Windows', 'macOS', 'Android'],
    stack: ['Tauri', 'Rust', 'React', 'ExifTool', 'Leaflet'],
    links: [{ href: 'https://github.com/workbench-soft/workbench-soft.github.io#media-organizer', label: 'Install' }],
    groups: [
      {
        features: [
          { name: 'Scan', text: 'Lists each file of the picked folder while it walks the folder.' },
          {
            name: 'Capture dates',
            text: 'A bundled ExifTool reads the date, the camera and the GPS of each photo and video.',
          },
          { name: 'Places offline', text: 'GPS turns into a place folder with no network.' },
          { name: 'Plan first', text: 'The app shows the new folder and name of each file before any file moves.' },
          { name: 'Moves', text: 'Confirmed files move, with pause, resume and cleanup.' },
          { name: 'History, undo and redo', text: 'Each run goes in a log and replays either way.' },
          { name: 'Settings', text: 'Destination folder, rename only, group by place and the home location.' },
          { name: 'File table', text: 'Rows with statuses, filters, a place map and a status bar.' },
          { name: 'Self-update', text: 'Checks at start and on return, shows the download, then asks to restart.' },
          {
            name: 'One command install',
            text: 'One PowerShell line installs the latest release, with no admin rights.',
          },
        ],
      },
    ],
  },
  {
    id: 'agent-skills',
    kind: 'tool',
    hue: 170,
    code: 'SKL',
    name: 'Agent Skills',
    tagline: 'Skills that make a coding agent work like a studio.',
    lede: 'A set of skills for coding agents: write like a person, plan in a spec, do a ticket, open a pull request and answer its review. Other skills audit a whole app, or take a site live with search, ads and Google Play.',
    platforms: ['Claude Code', 'Codex', 'Copilot'],
    stack: ['Markdown', 'Shell', 'PowerShell', 'Hooks'],
    links: [],
    groups: [
      {
        features: [
          { name: 'Plain writing', text: 'Rules that strip the AI tone from chat, commits, docs and UI copy.' },
          { name: 'Specs first', text: 'Each feature starts as a spec in the repo, and the work follows it.' },
          {
            name: 'Ticket to merge',
            text: 'Reads a ticket, builds it in its own worktree, opens the PR and moves the ticket.',
          },
          { name: 'Pull requests', text: 'Short PR bodies with flow diagrams, and one commit per review thread.' },
          { name: 'Code review', text: 'A review against a checklist, with each finding checked against the code.' },
          {
            name: 'App audit',
            text: 'Parallel reviewers per lens, such as security and performance. The safe findings get fixed.',
          },
          { name: 'Architecture and monorepos', text: 'Layered packages, shared API contracts and CI per app.' },
          {
            name: 'Launch',
            text: 'Search setup, AdMob and AdSense, Google Play release and a marketing plan in one run.',
          },
          { name: 'In-app updates', text: 'Self-update for sideloaded apps, left out of the Play build.' },
          { name: 'Repo care', text: 'Worktrees, repo moves, history resets and secret rotation.' },
          { name: 'Names and domains', text: 'Checks a name against domains, the business register and trade marks.' },
          { name: 'Voices', text: 'Plays each text to speech voice, so a person can pick one.' },
        ],
      },
    ],
  },
  {
    id: 'local-ci',
    kind: 'tool',
    hue: 55,
    code: 'LCI',
    name: 'local-ci',
    tagline: 'One script sets up a dev machine and makes it the CI runner.',
    lede: 'local-ci gives a Mac or a Windows PC the same dev tools, then registers it as a self-hosted GitHub Actions runner. CI for private repos then builds on that machine at no cost.',
    platforms: ['Windows', 'macOS'],
    stack: ['PowerShell', 'Shell', 'GitHub Actions', 'mise'],
    links: [],
    groups: [
      {
        features: [
          { name: 'Mac setup', text: 'Homebrew tools, mise, the shell and the git config in one run.' },
          { name: 'Windows setup', text: 'The same tools through winget. A second run skips what is in place.' },
          { name: 'Self-hosted runner', text: "The machine builds CI jobs for the org's repos." },
          { name: 'Start button', text: 'A double click starts the latest version of the CI.' },
          { name: 'CI status page', text: 'A local page shows the runner and the jobs at a glance.' },
        ],
      },
    ],
  },
  {
    id: 'ci',
    kind: 'tool',
    hue: 225,
    code: 'CI',
    name: 'ci',
    tagline: 'Shared GitHub Actions steps for each repo.',
    lede: 'One fix here reaches each repo on its next run.',
    platforms: ['GitHub Actions'],
    stack: ['YAML', 'mise', 'pnpm', 'Dependabot'],
    links: [],
    groups: [
      {
        features: [
          { name: 'Setup step', text: 'Installs the tools a repo pins in mise, then its packages from the lockfile.' },
          { name: 'Dependabot details', text: 'Stores the update type of each Dependabot PR for the merge job.' },
          {
            name: 'Auto-merge',
            text: 'Merges a Dependabot PR once each check passes. A major update waits for a person.',
          },
        ],
      },
    ],
  },
  {
    id: 'git-aliases',
    kind: 'tool',
    hue: 15,
    code: 'GIT',
    name: 'git-aliases',
    tagline: 'Short git aliases, ready for any machine.',
    lede: 'Each alias is a small script in one repo, so the same commands work on each machine.',
    platforms: ['Windows', 'macOS', 'Linux'],
    stack: ['Shell', 'PowerShell', 'fzf'],
    links: [],
    groups: [
      {
        features: [
          { name: 'git a', text: 'Lists each alias with what it does.' },
          { name: 'git sb', text: 'Picks a branch with fuzzy search and moves into its worktree.' },
          { name: 'git db', text: 'Picks branches to delete with fuzzy search.' },
          { name: 'Safe installers', text: 'They ask before each change and back up each file they edit.' },
          { name: 'Lint hook', text: 'Each commit to the repo runs the lint.' },
        ],
      },
    ],
  },
  {
    id: 'gh-review-notify',
    kind: 'tool',
    hue: 275,
    code: 'GRN',
    name: 'gh-review-notify',
    tagline: 'A Mac notification for each review on your pull requests.',
    lede: 'GitHub sends reviews by email, so an approval can wait for hours. This tool checks every 3 minutes and pops a notification. A click opens the comment.',
    platforms: ['macOS'],
    stack: ['Shell', 'launchd', 'GitHub CLI'],
    links: [],
    groups: [
      {
        features: [
          { name: 'Reviews and comments', text: 'Each review and comment on your open PRs, within 3 minutes.' },
          { name: 'Review requests', text: 'A notification when someone asks you by name to review.' },
          { name: 'Comment bursts', text: 'More than 4 new comments on one PR come as 1 notification.' },
          { name: 'Quiet first run', text: 'The first run records the last 3 days and shows none of them.' },
          { name: 'Bot filter', text: 'Comments by bots stay silent unless you turn them on.' },
          { name: 'Status and test', text: 'One flag prints the state, another sends a test notification.' },
        ],
      },
    ],
  },
  {
    id: 'open-in-remote-repo',
    kind: 'tool',
    hue: 240,
    code: 'ORR',
    name: 'Open in Remote Repo',
    tagline: 'A VS Code extension that opens a file on GitHub, GitLab or Bitbucket.',
    lede: 'A fork of Open in GitHub by Stanislav Sysoev. It opens or copies the link to the file, its blame or its history, with the selected lines marked.',
    platforms: ['VS Code'],
    stack: ['TypeScript', 'VS Code API'],
    links: [
      {
        href: 'https://marketplace.visualstudio.com/items?itemName=workbench-soft.open-in-remote-repo',
        label: 'Marketplace',
      },
    ],
    groups: [
      {
        features: [
          { name: 'File, blame and history', text: 'Opens each one on the remote host, with the selected lines.' },
          { name: 'Copy a link', text: 'The same links go to the clipboard, with a notice that shows the URL.' },
          { name: 'From the Explorer', text: 'A right click on a file or folder opens or copies its link.' },
          { name: 'Main or master first', text: 'Links point at a branch that already holds the file.' },
          { name: 'Hosts and mapped URLs', text: 'GitHub, GitHub servers, GitLab, Bitbucket and Bitbucket Server.' },
        ],
      },
    ],
  },
  {
    id: 'memories-windows',
    kind: 'archive',
    hue: 200,
    code: 'MWN',
    name: 'Memories for Windows',
    tagline: 'The first Memories: a tray app with a sync service on the NAS.',
    lede: 'A service in Docker on the NAS read the date of each photo into a database per day. The Windows app sat in the tray and opened the photos taken on this day. The phone app replaced it.',
    platforms: ['Windows', 'NAS'],
    stack: ['.NET', 'WPF', 'Docker', 'LiteDB'],
    links: [],
    groups: [
      {
        features: [
          { name: 'Tray', text: 'The app waits in the tray. A click opens the gallery.' },
          { name: 'Daily reminder', text: "Once a day a notification calls you to that day's photos." },
          { name: 'Gallery by period', text: 'Pick a day or a span of years, and the photos load as you scroll.' },
          { name: 'Photo window', text: 'One photo large, with the next and the previous a key away.' },
          { name: 'Details and map', text: 'The camera details and the place on a map.' },
          { name: 'Send', text: 'Picked photos go out in one action.' },
        ],
      },
    ],
  },
];

export const featureCount = (p: Project) => p.groups.reduce((n, g) => n + g.features.length, 0);
