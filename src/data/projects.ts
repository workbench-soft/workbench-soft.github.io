// Each project's text comes from its repo: docs/features.md and the README.

export type Kind = 'app' | 'tool' | 'internal' | 'archive';

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
  /** The clone, and the folder in it, that holds docs/features.md and specs/. */
  repo?: string;
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
export const kinds: Kind[] = ['app', 'tool', 'internal', 'archive'];

export const projects: Project[] = [
  {
    id: 'memories',
    kind: 'app',
    repo: 'memories',
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
            name: 'Photos',
            text: 'Each photo and video, newest first, under a header per day. The archive lists each year and month with a count.',
          },
          {
            name: 'Filter by place',
            text: 'Each day names where it was. A filter bar searches places and picks devices.',
          },
          {
            name: 'Camera and drone shots',
            text: 'Shots from a camera or a drone get their own group beside the phone shots.',
          },
          {
            name: 'Tile size',
            text: 'A pinch sets 1 to 6 tiles per line, shared by each grid and kept between launches.',
          },
          {
            name: 'Send many photos at once',
            text: 'A long press starts picking. The picked photos go to any app in one share.',
          },
          {
            name: 'Share an album by link',
            text: 'Picked photos become a link. The other person opens the album in a browser, with no app or account.',
          },
          {
            name: 'Organize',
            text: 'Step cards sort the photos on the phone, move them to dated folders on the NAS and free up the phone.',
          },
          {
            name: 'Sort picked photos on the NAS',
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
            name: 'Photos away from home',
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
            name: 'Index from the NAS',
            text: 'An indexer on the NAS reads the photos from its own disk, far faster than a sync over WebDAV.',
          },
          {
            name: 'Move the index to a new phone',
            text: 'The new phone takes the index from the old one, in place of a first sync that takes hours.',
          },
          { name: 'Language', text: 'The app follows the phone language. Android 13 and later set it per app.' },
          { name: 'Theme', text: 'Follows the phone, or a fixed choice in Settings.' },
          {
            name: 'Ads and remove ads',
            text: 'A one time Google Play purchase hides the ads on each phone with the same Google account.',
          },
          {
            name: 'Desktop sorter',
            text: 'The desktop app sorts a folder into the same year, place and day folders as the phone.',
          },
          { name: 'Archive', text: 'Each year and month with a photo count. A tap opens the whole month.' },
          { name: 'People', text: 'The NAS groups the faces in the photos by person, named people first.' },
          {
            name: 'Indexing progress page',
            text: 'A page on the NAS shows how far the face engine and the indexer got.',
          },
          {
            name: 'Albums about a person',
            text: 'An album about one child opens as a scrapbook, a chapter per year of age.',
          },
          { name: 'Turn a photo', text: 'A photo on its side gets stood up in the file on the NAS.' },
          { name: 'Edit a photo', text: 'The editor keeps the original and saves an edited copy.' },
          { name: 'Draw a new picture', text: 'The brush on Today opens a blank sheet with every editor tool.' },
          {
            name: 'Photos on the phone',
            text: 'Phone photos show in each grid, and Organize uploads them to the NAS.',
          },
          { name: 'Settings', text: 'One row per section with its value: reminders, gallery, NAS, home.' },
          {
            name: 'Duplicates on the NAS',
            text: 'Pairs with the same capture time and size, side by side, to drop the extra copy.',
          },
          { name: 'Updates', text: 'The build from outside a store finds, downloads and installs its new version.' },
        ],
      },
    ],
  },
  {
    id: 'spotthecam',
    kind: 'app',
    repo: 'spotthecam',
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
            name: 'Camera map',
            text: "Each camera shows the limit at this moment. In a school zone the number follows the zone's timetable.",
          },
          { name: 'Search and filter', text: 'Type a suburb, and the map flies to its cameras.' },
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
            name: 'Offline map',
            text: 'The camera list and each map area you opened stay on the device. It installs as an app.',
          },
          { name: 'Light and dark theme', text: 'Auto matches the device, or pick one in the gear menu.' },
          { name: 'Languages', text: 'The map and the Android app in 9 languages.' },
          {
            name: 'Site pages and ads',
            text: 'About, How, Types, Sources and Terms pages, a page per camera, a banner under the map.',
          },
        ],
      },
      {
        title: 'Android app',
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
    id: 'shuttrix',
    kind: 'app',
    repo: 'shuttrix',
    hue: 190,
    code: 'SHX',
    name: 'Shuttrix',
    tagline: 'A camera with the dials of a DSLR, and a Simple mode with big sliders.',
    lede: 'Shuttrix is an Android camera in 2 modes. Simple mode has big sliders with Night, Long exposure and Panorama, and Pro mode puts lens, focus, white balance, ISO and shutter on dials.',
    platforms: ['Android'],
    stack: ['Expo', 'React Native', 'Kotlin', 'CameraX'],
    links: [],
    groups: [
      {
        features: [
          { name: 'Simple and Pro', text: 'A glass switch at the top picks the mode. A new install opens in Simple.' },
          { name: 'Simple mode', text: 'Lens pills over a zoom slider, then Light, Warmth and Color sliders.' },
          { name: 'Night', text: 'The phone builds the photo from several frames while a bar shows.' },
          { name: 'Long exposure', text: 'Blurs what moves: silky water, light trails, a crowd that fades.' },
          { name: 'Panorama', text: 'A wide photo from a slow turn, stitched on the phone.' },
          { name: 'Lenses', text: 'A chip per lens the phone has, over one zoom scale.' },
          { name: 'Focus', text: 'AF-C follows a moving subject and faces. A tap focuses on a point.' },
          { name: 'White balance', text: 'Auto, presets or kelvin on a dial.' },
          { name: 'Exposure', text: 'ISO and shutter, each auto or manual in third stops.' },
          { name: 'Color', text: 'One saturation value for the COLOR dial and the Color slider.' },
          {
            name: 'Photo, video and flash',
            text: 'The photo comes from the frame on screen at the touch. Hold to record.',
          },
          { name: 'Place and camera tags', text: 'Each shot carries where and how it was taken, as EXIF tags.' },
          { name: 'Photo and video size', text: 'Settings pick the photo and video size.' },
          { name: 'Enhance photos', text: 'Deeper blacks, lifted shadows, livelier colour and a touch of sharpness.' },
          { name: 'QR codes', text: 'A code in the preview gets brackets and a pill to open it.' },
          { name: 'Gallery', text: 'The shots in a grid and full screen, with pinch and double tap zoom.' },
          { name: 'Straighten and rotate', text: 'EDIT in the viewer levels and turns a photo.' },
          { name: 'Quick start', text: 'A double press of the power button opens Shuttrix, over the lock screen too.' },
          { name: 'Languages', text: 'The app in 9 languages, following the phone or browser.' },
        ],
      },
    ],
  },
  {
    id: 'guitar-upscale',
    kind: 'app',
    repo: 'guitar-upscale',
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
          { name: 'Chords', text: 'One chord per scale note, such as Em F#dim G Am Bm C D for E minor.' },
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
          {
            name: 'Instruments and sound',
            text: 'Lead and chord instruments apart: sitar, banjo, koto, strings and more.',
          },
          {
            name: 'Effects',
            text: 'Reverb and delay, each with its own switch and sliders. The sound changes as a slider moves.',
          },
          { name: 'MIDI export', text: 'Files download, or go out through the share sheet.' },
          {
            name: 'Sign-in and paid tiers',
            text: 'Patreon sign in or a Google Play purchase unlock the Explorer and Composer tools.',
          },
          {
            name: 'Install and offline',
            text: 'A PWA that opens full screen in landscape. The Android APK updates itself.',
          },
          {
            name: 'Screen layout',
            text: 'The fretboard takes the whole screen, and the panels float over its corners.',
          },
          { name: 'Play panel', text: 'Plays what is loaded, steps through it, shuffles songs and saves them.' },
          { name: 'Easy and Pro mode', text: 'Easy plays only the chords of a song, so a beginner strums along.' },
          { name: 'Song links', text: 'One menu searches the open song on chord, tab, video and lyrics sites.' },
          { name: 'Built-in songs admin', text: 'The owner adds and removes the built-in songs on an admin page.' },
          { name: 'Settings', text: 'The gear opens a drawer, and each value survives a reload.' },
          {
            name: 'Android updates',
            text: 'The APK from GitHub installs its newer release. Play updates its own build.',
          },
          { name: 'Ads', text: "Ads until Remove ads is bought. The developer's phone opens without them." },
          {
            name: 'Languages',
            text: 'The screens follow the phone or browser, and the lesson pages read in 10 languages.',
          },
        ],
      },
    ],
  },
  {
    id: 'tickalot',
    kind: 'app',
    repo: 'tickalot',
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
            name: 'Typing and dictating',
            text: '"Croissants 2 packs of 3, organic eggs" becomes 2 items with amounts. English and Russian.',
          },
          { name: 'Pictures', text: "The app picks an emoji from each item's name. One tap adds a photo." },
          {
            name: 'The store and the walk through it',
            text: 'Pick the shop from OpenStreetMap and type an aisle once. The list then follows your walk.',
          },
          { name: 'Shared aisles', text: 'Aisles one shopper types fill in for each person who picks the same shop.' },
          {
            name: 'Prices at Coles and Woolworths',
            text: 'A unit price under each item, with the cheaper shop in green.',
          },
          { name: 'Packing for a trip', text: 'Each trip starts as a copy of your usual packing list.' },
          { name: 'Things to see', text: 'Places from Wikipedia, spread over the days of the trip.' },
          { name: 'Lists that are done', text: 'A finished list tidies itself away, with no clean up by hand.' },
          { name: 'Light and dark', text: 'Follows the phone, or a fixed choice.' },
          { name: 'Updates', text: 'The APK offers a newer release with its size and a warning on mobile data.' },
          { name: 'Ads', text: 'A one time purchase. People in Europe see the consent form before any ad.' },
          { name: 'The weekly shop for two', text: 'One person sets up the list, the other ticks it on the way home.' },
          { name: 'Songs to learn', text: 'A list of songs to learn on the guitar, the most wanted first.' },
          {
            name: 'Changing and deleting',
            text: 'Each field saves on its own, a tap ticks, and a removal offers Undo.',
          },
          { name: 'Languages', text: 'A shared list opens in the language of the phone that opens it.' },
          { name: 'Finding Tickalot in search', text: 'Guides and a home page bring people from search to the app.' },
        ],
      },
    ],
  },
  {
    id: 'keeppad',
    kind: 'app',
    repo: 'keeppad',
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
            name: 'Languages',
            text: 'A note uses either language or both. On Android 14 a note can switch language at a pause.',
          },
          {
            name: 'Share by link',
            text: 'The other person opens the note in the app or a browser, and both edit it live.',
          },
          { name: 'Send to other apps', text: 'New notes go to Obsidian, Notion, Todoist, Google Docs or OneNote.' },
          { name: 'Website', text: 'Shared notes open in a browser, beside the guides and the policies.' },
          { name: 'In-app update', text: 'The APK finds a newer release, downloads it and opens the installer.' },
          { name: 'Light and dark theme', text: 'Follows the phone, or a fixed choice.' },
          { name: 'Ads', text: 'One banner on the home screen, after consent in Europe.' },
          { name: 'Remove ads', text: 'A one time purchase hides the banner on each phone of the account.' },
        ],
      },
    ],
  },
  {
    id: 'farnear',
    kind: 'app',
    repo: 'farnear',
    hue: 160,
    code: 'FNR',
    name: 'Farnear',
    tagline: 'Video calls across a border that blocks the usual apps, with a board to draw on.',
    lede: 'Farnear calls family through a link, with no account. The video goes straight between the people on the call, and the call tries several paths until one gets through.',
    platforms: ['Web', 'Android', 'iOS'],
    stack: ['Expo', 'React Native', 'WebRTC', 'Cloudflare Workers'],
    links: [],
    groups: [
      {
        features: [
          { name: 'Calls through a link', text: 'A link is the room. Up to 4 people see and hear each other.' },
          { name: 'Saved rooms', text: 'A room link saved under a name, such as Mum. The same link works every time.' },
          {
            name: 'Calls that try several paths to Russia',
            text: 'A direct path first, then relays, with a paste by hand as the last resort.',
          },
          { name: 'Board', text: 'Everyone draws on one surface with a pen, a highlighter or a laser.' },
          {
            name: 'Share a screen, a picture or a video',
            text: 'The board shows a window, a picture or a video, and everyone draws over it.',
          },
          { name: 'Photo from the phone', text: 'The camera takes a photo of a page and puts it on the board.' },
          {
            name: 'Lessons',
            text: 'A teacher steps through slides, both sides draw, and a timer chimes before the end.',
          },
          {
            name: 'Ads and remove ads',
            text: "Ads on the home page and guides. One purchase removes them for the buyer's rooms.",
          },
          { name: 'Languages', text: 'The app in 9 languages, following the phone or browser.' },
        ],
      },
    ],
  },
  {
    id: 'memoire',
    kind: 'app',
    repo: 'memoire',
    hue: 50,
    code: 'MMR',
    name: 'Memoire',
    tagline: 'Learn English or Russian words in short batches, right before you forget them.',
    lede: 'Memoire teaches English to Russian speakers and Russian to English speakers. It shows short batches of word cards a few times a day, right before a word slips away.',
    platforms: ['Android', 'iOS', 'Web'],
    stack: ['Expo', 'React Native', 'Firebase'],
    links: [],
    groups: [
      {
        features: [
          { name: 'Word batches', text: 'Short batches of cards: due words first, new words between them.' },
          { name: 'Ways to ask', text: 'A card asks for the meaning, the word, what was heard or the spelling.' },
          { name: 'Add a word', text: 'Type a word and get cards with translations and examples.' },
          { name: 'Pictures', text: "A card shows the photo from the word's Wikipedia article." },
          { name: 'Built in words', text: 'About 8,000 English words with CEFR levels and Russian translations.' },
          { name: 'Level test', text: 'Up to 6 rounds of yes or no on real and made up words set the level.' },
          { name: 'Topics', text: '14 topics such as IT, travel, food and kids words.' },
          { name: 'Reminders', text: 'Local notifications at set times, only when words wait.' },
          { name: 'My words', text: 'A list of cards with search, stars and delete.' },
          { name: 'Look and language', text: 'Light and dark themes, and the screens in 9 languages.' },
          {
            name: 'Talk practice',
            text: "A chat on a scene such as a café or a job interview, at the learner's level.",
          },
          {
            name: 'Sync between devices',
            text: 'The same cards on a phone, a tablet and a browser, paired by a code.',
          },
          { name: 'Home screen widget', text: 'The number of waiting words and one word with its meaning.' },
        ],
      },
    ],
  },
  {
    id: 'lumiere-player',
    kind: 'app',
    repo: 'lumiere-player',
    hue: 280,
    code: 'LUM',
    name: 'Lumiere Player',
    tagline: 'A video player for Google TV that plays files from a USB stick or a NAS.',
    lede: 'Lumiere Player plays files from a USB stick or an SMB share on libVLC, so it opens what VLC opens. Each file keeps its place, and the remote skips and switches tracks.',
    platforms: ['Google TV', 'Android TV'],
    stack: ['Kotlin', 'Jetpack Compose', 'libVLC'],
    links: [],
    groups: [
      {
        features: [
          { name: 'Sources', text: 'USB sticks and SMB shares, listed on the home screen.' },
          { name: 'Resume', text: 'Each file keeps its position, and the list shows how far you got.' },
          { name: 'Subtitles and audio', text: 'Embedded tracks and files in the same folder, Cyrillic included.' },
          { name: 'Controls', text: 'Skip 10 or 30 seconds, change speed, shuffle and repeat.' },
          { name: 'Updates', text: 'Finds new releases on GitHub at launch or under Updates.' },
          { name: 'Ads', text: 'A banner on the home screen, with a one time unlock in the Play build.' },
          { name: 'Languages', text: 'The TV screens in 9 languages, following the phone or browser.' },
        ],
      },
    ],
  },
  {
    id: 'servohop',
    kind: 'app',
    repo: 'servohop',
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
            name: 'Fuel prices on a map',
            text: 'Green pins for the cheapest third, amber for the middle and red for the dearest.',
          },
          {
            name: 'Station list',
            text: 'The servos in view, cheapest first, with brand, suburb and when the price changed.',
          },
          {
            name: 'Price history chart',
            text: 'The daily average over a band from the low to the high, for 30, 90 or 365 days.',
          },
          { name: 'Driver price reports', text: 'Where no state feed exists, drivers send the price on the board.' },
          {
            name: 'EV chargers',
            text: 'Network, plugs and top power. Drivers report the price per kWh, and the app keeps its history.',
          },
          {
            name: 'Search pages',
            text: 'A page for each state, suburb and servo, with structured data and a sitemap.',
          },
          {
            name: 'Self-update from GitHub',
            text: 'The APK checks GitHub on start and on each return, and shows the download in the header.',
          },
          { name: 'Remove ads', text: 'A one time Google Play purchase, restored on a new phone.' },
          { name: 'Fuel panel', text: 'Pick petrol, diesel, gas or chargers, slow AC or fast DC.' },
          { name: 'Ads', text: 'One banner under the list: AdMob in the app, AdSense on the site.' },
          { name: 'Languages', text: 'The screens come in 9 languages and follow the phone or browser.' },
        ],
      },
    ],
  },
  {
    id: 'consdr',
    kind: 'app',
    repo: 'consdr',
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
          {
            name: 'Compare a lease, a loan and cash',
            text: 'Lease, loan and cash, each as one total for the whole term.',
          },
          {
            name: 'Where the money goes',
            text: 'Each total splits into the car, finance, running costs, tax and missed interest.',
          },
          {
            name: 'Lease and loan settings',
            text: 'Rate, balloon, fees, fuel through the lease and the FBT exemption.',
          },
          {
            name: 'FBT by car type and start date',
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
          { name: 'Borrowing for another home', text: 'How much less a bank would lend while the car is paid off.' },
          { name: 'Working and sources', text: 'Each step of the sum, with a source for each fixed number.' },
          { name: 'Common questions', text: 'Answers on leases, the EV exemption, balloons and home loans.' },
          {
            name: 'Guides and pages',
            text: 'Plain pages on novated leases, FBT, balloons and stamp duty, with numbers from the same rules.',
          },
          { name: 'Saved inputs and reset', text: 'A reload keeps your fields. Reset to defaults clears them.' },
          { name: 'Offline use', text: 'The calculator opens with no network after the first visit.' },
          { name: 'Colour theme', text: 'Auto, Light or Dark.' },
          { name: 'Remove ads in the Android app', text: 'A one time purchase in the Android app.' },
          {
            name: 'Which lease term costs least',
            text: 'The same car over 1 to 5 years, with the cheapest term marked.',
          },
          { name: 'Language', text: 'The calculator in 9 languages, with money in Australian dollars.' },
          { name: 'Ads', text: 'AdSense blocks on the site and an AdMob banner in the Android app.' },
          {
            name: "No ads on the developer's phone",
            text: 'Each build hides the banner on a phone with the developer key.',
          },
        ],
      },
    ],
  },
  {
    id: 'property-trends',
    kind: 'app',
    repo: 'property-trends',
    hue: 100,
    code: 'PRT',
    name: 'Property Trends',
    tagline: 'Australian suburbs coloured by their median property price, with the history.',
    lede: 'A map of Australian suburbs, each coloured by its median sale price, with a chart of how that median moved. It runs on open government data.',
    platforms: ['Web'],
    stack: ['React', 'MapLibre', 'Open data'],
    links: [{ href: '/property-trends/', label: 'Open the map' }],
    groups: [
      {
        features: [
          { name: 'Price map', text: 'Each suburb coloured by its median sale price.' },
          { name: 'Filters', text: 'The property type and the period the map shows.' },
          { name: 'Listings on realestate.com.au', text: 'Buttons open the same search on realestate.com.au.' },
          {
            name: 'Suburb card and history chart',
            text: "A suburb's median, its sales count and a chart over the years.",
          },
          { name: 'Search', text: 'Finds a suburb by name or postcode and flies the map there.' },
          { name: 'Languages', text: 'The app in 9 languages, following the phone or browser.' },
          { name: 'Rents', text: 'Each NSW postcode coloured by the median weekly rent of new leases.' },
          { name: 'Install from the browser', text: 'The web build installs as an app with its own icon.' },
        ],
      },
    ],
  },
  {
    id: 'games',
    kind: 'app',
    repo: 'workbench-soft.github.io/apps/games',
    hue: 130,
    code: 'GAM',
    name: 'Workbench Games',
    tagline: 'Party games in the browser: draw, guess and give clues.',
    lede: 'Workbench Games are three party games for friends. One person makes a room and sends the link, and the others join in the browser with no account.',
    platforms: ['Web'],
    stack: ['Astro', 'Preact', 'Cloudflare Workers', 'Durable Objects'],
    links: [{ href: 'https://games.workbench-soft.com/games/', label: 'Play now' }],
    groups: [
      {
        features: [
          { name: 'Rooms by link', text: 'One link brings 2 to 12 friends into the same room.' },
          { name: 'Guess the drawing', text: "Draw a word, guess the others' drawings, race for points." },
          {
            name: 'Drawing telephone',
            text: 'A phrase turns into drawings and back, and the album shows how it changed.',
          },
          { name: 'Clue duel', text: 'A team word game where every clue is public and stealing pays.' },
          { name: 'Drawing tools', text: 'Pen, eraser, fill, 20 colours, 4 sizes and undo.' },
          { name: 'Languages', text: 'The pages and the rooms work in English and Russian.' },
          { name: 'Ads', text: 'The games stay free, with a banner on the content pages, the lobby and the results.' },
          { name: 'Android and iOS apps', text: 'The same games as an installed app.' },
        ],
      },
    ],
  },
  {
    id: 'tripforge',
    kind: 'app',
    repo: 'tripforge',
    hue: 15,
    code: 'TRF',
    name: 'Tripforge',
    tagline: 'A whole trip from a few words: flights, route, hotels and car, priced.',
    lede: 'Tripforge plans a trip from the places, a rough date and the group. The answer is a priced plan with flights, a route, hotels and a car, and cheaper dates nearby.',
    platforms: ['Web', 'Android'],
    stack: ['Expo', 'React Native', 'Cloudflare Workers'],
    links: [],
    groups: [
      {
        features: [
          { name: 'Ask', text: 'Type the places, a rough date, how long and who goes.' },
          { name: 'Flights', text: 'The cheapest round trips around the asked date, with cheaper dates beside.' },
          { name: 'To Tickalot', text: 'One tap turns the trip into Tickalot lists: sights and packing.' },
          { name: 'Settings', text: "The language: the phone's, or one of the 9." },
        ],
      },
    ],
  },
  {
    id: 'langflip',
    kind: 'app',
    repo: 'langflip',
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
            name: 'Fix the layout of a word',
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
          {
            name: 'The current layout on the icon',
            text: 'The tray shows EN on blue or RU on red for the window in front.',
          },
          { name: 'Pause with a click', text: 'A click on the tray icon turns fixing off, and the icon turns grey.' },
          {
            name: 'Switch the layout with a double click',
            text: 'A double click on the icon switches the layout of the window in front.',
          },
          { name: 'Start at login', text: 'Turns on at the first start, with a switch in the tray menu.' },
          { name: 'Settings file', text: 'Excluded apps and words to keep, in one TOML file.' },
          {
            name: 'Go on with a word',
            text: 'Letters typed onto a word count as the rest of that word, in its language.',
          },
          { name: 'The app icon', text: 'A navy А and Я on a holo foil card, on the exe, the shortcuts and Settings.' },
          {
            name: 'Install on Windows',
            text: 'A double click on Langflip.cmd builds and installs it for the current user.',
          },
          { name: 'Tray menu', text: 'A right click on the icon opens the menu.' },
          { name: 'Decision log', text: 'A log file says what Langflip decided for each word and why.' },
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
    repo: 'agent-skills',
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
          { name: 'Writing', text: 'Rules that strip the AI tone from chat, commits, docs and UI copy.' },
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
            name: 'Launch and growth',
            text: 'Search setup, AdMob and AdSense, Google Play release and a marketing plan in one run.',
          },
          { name: 'In-app updates', text: 'Self-update for sideloaded apps, left out of the Play build.' },
          { name: 'Repo care', text: 'Worktrees, repo moves, history resets and secret rotation.' },
          { name: 'Names and domains', text: 'Checks a name against domains, the business register and trade marks.' },
          { name: 'Hear and pick a voice', text: 'Plays each text to speech voice, so a person can pick one.' },
          { name: 'Code work', text: 'Skills to do a ticket, open a PR, answer review threads and review a PR.' },
          {
            name: 'Project setup',
            text: 'Skills to plan an architecture, set up a monorepo and run commands through mise.',
          },
          { name: 'App icons', text: '10 icons in styles that fit the app, a picker in the chat, then every size.' },
          {
            name: 'Demo screenshots and store media',
            text: 'Demo data, screenshots and short videos for the README and the store.',
          },
          {
            name: 'End to end walk of a release',
            text: 'Installs the newest release, walks each main flow and reports per flow.',
          },
          { name: 'Voice at the end of a turn', text: 'A short spoken line says the agent is done, waits or asks.' },
          { name: 'Install', text: 'One clone linked into each agent on the machine. An edit reaches all of them.' },
          { name: 'Releases', text: 'Each push to main that passes the checks gets a dated release with notes.' },
        ],
      },
    ],
  },
  {
    id: 'local-ci',
    kind: 'tool',
    repo: 'local-ci',
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
          { name: 'Self-hosted CI runner', text: "The machine builds CI jobs for the org's repos." },
          { name: 'Start button', text: 'A double click starts the latest version of the CI.' },
          { name: 'CI status page', text: 'A local page shows the runner and the jobs at a glance.' },
          {
            name: 'Cloud runners first',
            text: 'Jobs build on free cloud runners while their minutes last, then on this PC.',
          },
          { name: 'Releases', text: 'Each push to main that passes the checks gets a dated release with notes.' },
          { name: 'Updates by themselves', text: 'The PC installs each release within minutes of the merge.' },
        ],
      },
    ],
  },
  {
    id: 'git-aliases',
    kind: 'tool',
    repo: 'git-aliases',
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
          { name: 'Aliases', text: 'Lists each alias with what it does.' },
          { name: 'Switch branch folders', text: 'Picks a branch with fuzzy search and moves into its worktree.' },
          { name: 'Delete branches and worktrees', text: 'Picks branches to delete with fuzzy search.' },
          { name: 'Installer', text: 'They ask before each change and back up each file they edit.' },
          { name: 'Lint hook', text: 'Each commit to the repo runs the lint.' },
          {
            name: 'Reset to the default branch',
            text: 'git m fetches and hard resets to the default branch of the remote.',
          },
          { name: 'Releases', text: 'Each push to main that passes the checks gets a dated release with notes.' },
        ],
      },
    ],
  },
  {
    id: 'gh-review-notify',
    kind: 'tool',
    repo: 'gh-review-notify',
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
          {
            name: 'Review and comment notifications',
            text: 'Each review and comment on your open PRs, within 3 minutes.',
          },
          { name: 'Review requests', text: 'A notification when someone asks you by name to review.' },
          { name: 'Comment bursts', text: 'More than 4 new comments on one PR come as 1 notification.' },
          { name: 'Quiet first run', text: 'The first run records the last 3 days and shows none of them.' },
          { name: 'Bot filter', text: 'Comments by bots stay silent unless you turn them on.' },
          { name: 'Status and test', text: 'One flag prints the state, another sends a test notification.' },
          { name: 'Releases', text: 'Each push to main that passes the checks gets a dated release with notes.' },
        ],
      },
    ],
  },
  {
    id: 'open-in-remote-repo',
    kind: 'tool',
    repo: 'vscode-open-in-github',
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
          {
            name: 'Open a file, blame or history link',
            text: 'Opens each one on the remote host, with the selected lines.',
          },
          { name: 'Copy a link', text: 'The same links go to the clipboard, with a notice that shows the URL.' },
          { name: 'Links from the Explorer', text: 'A right click on a file or folder opens or copies its link.' },
          { name: 'Main or master first', text: 'Links point at a branch that already holds the file.' },
          { name: 'Hosts and mapped URLs', text: 'GitHub, GitHub servers, GitLab, Bitbucket and Bitbucket Server.' },
          { name: 'Languages', text: 'Commands, settings and messages follow the VS Code display language.' },
        ],
      },
    ],
  },
  {
    id: 'ci',
    kind: 'internal',
    repo: 'ci',
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
            name: 'Dependabot auto merge',
            text: 'Merges a Dependabot PR once each check passes. A major update waits for a person.',
          },
          { name: 'Releases', text: 'Each push to main that passes the checks gets a dated release with notes.' },
        ],
      },
    ],
  },
  {
    id: 'reddit-desk',
    kind: 'internal',
    repo: 'reddit-desk',
    hue: 20,
    code: 'RDK',
    name: 'Reddit Desk',
    tagline: 'Drafts Reddit comments about a repo and types them into Chrome.',
    lede: 'A Windows app for the taskbar. Pick a repo, press Find, and Claude Code drafts a comment for each thread the repo can answer. Open a card and Chrome gets the draft, ready to post by hand.',
    platforms: ['Windows'],
    stack: ['Tauri', 'Rust', 'React', 'Claude Code'],
    links: [],
    groups: [
      {
        features: [
          { name: 'Repo picker', text: 'A dropdown lists each git folder under the root.' },
          { name: 'Subreddits', text: 'Claude reads the repo and fills in the subs that fit it.' },
          { name: 'Find threads', text: 'Claude Code finds threads the repo can answer and drafts a comment.' },
          { name: 'Cards', text: 'Each card shows the sub, the thread title and the draft to edit.' },
          { name: 'Open in Chrome', text: 'Chrome opens the thread with the comment typed in, ready to post.' },
          { name: 'Posts tab', text: 'Drafts posts that promote the picked repos in fitting subs.' },
          { name: 'Screenshots and videos', text: "Each post lists media from the repo's screenshots folder." },
          { name: 'Open a post', text: "Chrome opens the sub's submit page with the post filled in." },
          { name: 'Ban risk', text: 'A line rates the next post, and each card rates its sub.' },
          { name: 'Tester post', text: 'A post that asks for testers of an Android app, from a list of apps.' },
          { name: 'Inside Archon', text: 'The Reddit tab of Archon shows this window in a frame.' },
          { name: 'Info button', text: 'The i button explains the Reddit setup.' },
          { name: 'Language', text: "Settings has a language dropdown: the system's or one of 9." },
          { name: 'Done list', text: 'Each posted and skipped thread with its date.' },
        ],
      },
    ],
  },
  {
    id: 'songfactory',
    kind: 'internal',
    repo: 'songfactory',
    hue: 330,
    code: 'SGF',
    name: 'Songfactory',
    tagline: 'Turns a folder of songs into a long looping YouTube video and uploads it.',
    lede: 'Songfactory joins the songs of one theme over a looping background clip, writes the chapters and the thumbnail, and uploads the video on a schedule. Claude writes the text, and ComfyUI can draw the background.',
    platforms: ['Windows'],
    stack: ['ffmpeg', 'Python', 'ComfyUI', 'YouTube API'],
    links: [],
    groups: [
      {
        features: [
          { name: 'Install and check the setup', text: 'One script installs the tools, and a doctor checks them.' },
          {
            name: 'Long video from a playlist',
            text: 'The songs of a theme folder join with a crossfade over a looping clip.',
          },
          { name: 'Seamless loop', text: 'The clip plays forward then backward, so a jump at the end goes away.' },
          {
            name: 'Chapters and thumbnail',
            text: 'The description lists each song with its start time, and a thumbnail gets made.',
          },
          { name: 'Scheduled upload', text: 'One command uploads with the AI label and a publish time.' },
          { name: 'Text from Claude', text: 'Claude writes the YouTube title and description from the songs.' },
          {
            name: 'Background from ComfyUI',
            text: 'A prompt in the theme file makes ComfyUI draw the background clip.',
          },
        ],
      },
    ],
  },
  {
    id: 'speed-camera-location-scraper',
    kind: 'internal',
    repo: 'speed-camera-location-scraper',
    hue: 40,
    code: 'SCS',
    name: 'Speed Camera Scraper',
    tagline: 'Merges the Australian speed camera lists into one CSV.',
    lede: 'The scraper opens each state page of the camera lists, saves each camera file and merges them into one CSV, a row per camera with its state. SpotTheCam reads its camera sites from it.',
    platforms: ['Windows', 'macOS'],
    stack: ['Node', 'Playwright', 'Python'],
    links: [],
    groups: [
      {
        features: [
          { name: 'Scan the state pages', text: 'Opens each state page and saves each camera file it lists.' },
          { name: 'One CSV of cameras', text: 'A row per camera with its state, for SpotTheCam.' },
          { name: 'Checks and releases', text: 'Each push to main is checked and becomes a dated release.' },
        ],
      },
    ],
  },
  {
    id: 'archon',
    kind: 'internal',
    hue: 190,
    code: 'ARC',
    name: 'Archon',
    tagline: 'The studio launcher that hands work to coding agents.',
    lede: 'Archon is one window for the whole workspace. It opens each app on the phone or the PC, gives tasks to Claude Code in a console per repo, and shows what runs right now.',
    platforms: ['Windows', 'Web'],
    stack: ['TypeScript', 'Node', 'adb', 'Claude Code'],
    links: [],
    groups: [
      {
        title: 'On every page',
        features: [
          { name: 'Ask Archon', text: 'A spoken or typed command picks the tool and opens its tab.' },
          { name: 'Runs strip', text: 'Each run in flight, with the time so far and the time left.' },
        ],
      },
      {
        title: 'Every day',
        features: [
          { name: 'Apps', text: 'Install, update and open each app on the phone, the TV or the PC.' },
          { name: 'Ads on this phone', text: 'Hides the ads or shows test ads, in every app or one.' },
          { name: 'To do', text: 'The open items of each TODO.md, sent to an agent in one press.' },
          { name: 'Sessions', text: 'Agent sessions that stopped early, resumed with one tick.' },
        ],
      },
      {
        title: 'Repos',
        features: [
          { name: 'Agents', text: 'Tick repos, pick a task such as an audit, and each gets a console.' },
          { name: 'Docs', text: 'The README, docs and specs of each repo, with the diagrams drawn.' },
          { name: 'Rules', text: 'The rules every agent reads, and the gaps each repo has.' },
          { name: 'Branches', text: 'Each branch and worktree, with keep, merge or delete.' },
          { name: 'Packages', text: 'Each package with its newest version, updated by an agent.' },
        ],
      },
      {
        title: 'Services and settings',
        features: [
          { name: 'CI, Reddit and Memories', text: 'The pages of the CI, Reddit Desk and the NAS indexer in tabs.' },
          { name: 'Songs', text: 'Builds and publishes the songfactory videos, with progress.' },
          { name: 'Voices', text: 'Picks the voice each agent speaks with.' },
          { name: 'Keys', text: 'The age of each CI secret, and a renewal through an agent.' },
        ],
      },
    ],
  },
  {
    id: 'agent-skills-private',
    kind: 'internal',
    repo: 'agent-skills-private',
    hue: 280,
    code: 'ASP',
    name: 'Agent Skills, private',
    tagline: 'The org rules and skills on top of Agent Skills.',
    lede: 'The skills tied to the workbench-soft org. They move repos, set up CI, rotate secrets, and make each agent session plan, ship and report the same way.',
    platforms: ['Windows', 'macOS'],
    stack: ['Markdown', 'Shell', 'Claude Code', 'Codex'],
    links: [],
    groups: [
      {
        features: [
          { name: 'Move a repo', text: 'Moves a repo to the org and makes it private, with free CI kept.' },
          {
            name: 'CI and releases for every repo',
            text: 'Checks each repo for Checks and Release, and adds the missing ones.',
          },
          { name: 'Rewrite a repo', text: 'New names, folders and docs, with the same behaviour.' },
          { name: 'Rotate secrets', text: 'Renews the CI secrets and keys, app by app.' },
          { name: 'Workflow rules', text: 'A spec first, a merge right away, a batch test later.' },
          { name: 'Releases', text: 'A dated release for each green push to main.' },
        ],
      },
    ],
  },
  {
    id: 'memories-demo-webdav',
    kind: 'internal',
    repo: 'memories-demo-webdav',
    hue: 215,
    code: 'DAV',
    name: 'Memories demo NAS',
    tagline: 'A sample photo NAS for the Google Play review.',
    lede: 'A WebDAV server with sample photos, so a Google Play reviewer can sign in to Memories without a NAS of their own. It runs as a Cloudflare Worker on the free plan.',
    platforms: ['Cloudflare'],
    stack: ['TypeScript', 'Cloudflare Workers', 'Durable Objects', 'WebDAV'],
    links: [],
    groups: [
      {
        features: [
          { name: 'Sample library', text: '42 photos and 2 videos from 2015 to 2025, some with map pins.' },
          { name: 'Sign in', text: 'One reviewer login, the way a real NAS asks for it.' },
          { name: 'Uploads and sorting', text: 'Uploads and moves work, and a nightly job clears them.' },
        ],
      },
    ],
  },
  {
    id: 'memories-windows',
    kind: 'archive',
    repo: 'memories-legacy-windows',
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
