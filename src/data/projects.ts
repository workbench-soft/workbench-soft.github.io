// Each project's text comes from its repo: docs/features.md and the README.

export type Kind = 'app' | 'tool' | 'client' | 'internal' | 'archive';

export interface Feature {
  name: string;
  text: string;
  /** The English name, which keys the feature's architecture line in every language. */
  key?: string;
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
  /** The public GitHub repo of an open source project. */
  source?: string;
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
export const kinds: Kind[] = ['app', 'tool', 'client', 'internal', 'archive'];

export const projects: Project[] = [
  {
    id: 'baristep',
    kind: 'app',
    repo: 'baristep',
    hue: 55,
    code: 'BAR',
    name: 'Baristep',
    tagline: 'Coffee, one step at a time.',
    lede: 'A coffee guide for an office espresso machine, on Android, iOS and the web.',
    platforms: ['Android', 'iOS', 'Web'],
    stack: ['Expo', 'React Native', 'TypeScript', 'Cloudflare R2'],
    links: [
      { href: 'https://github.com/workbench-soft/workbench-soft.github.io/releases?q=baristep-v', label: 'Downloads' },
    ],
    groups: [
      {
        features: [
          {
            name: 'Coffee guide',
            text: 'Cappuccino with chocolate and latte hearts, tulips and leaves, for 1 or 2 cups. Painted steps, timers and saved ticks guide each drink. Cup angle and jug height appear on pour steps. Circle and heart steps have muted loop videos; the other 33 scenes have pictures.',
          },
          {
            name: 'Releases and updates',
            text: 'Android checks for a new GitHub APK at start and on return. The menu checks by hand and shows the version; downloads show progress. iOS and web carry no APK updater.',
          },
        ],
      },
    ],
  },
  {
    id: 'memories',
    kind: 'app',
    repo: 'memories',
    hue: 210,
    code: 'MEM',
    name: 'Memories',
    tagline: 'On this day photos from your own NAS.',
    lede: 'Memories shows this day in earlier years, from the photos and videos on a home NAS. It works like the reminders in Google Photos, and the photos stay on hardware the owner keeps at home.',
    platforms: ['Android', 'Web', 'Windows', 'macOS', 'NAS'],
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
            name: 'Memories in the browser',
            text: 'The NAS serves the app to computers in the tailnet, with every photo and the same sort and edit as the phone.',
          },
          {
            name: 'Organize',
            text: 'Step cards sort the photos on the phone, move them to dated folders on the NAS and free up the phone.',
          },
          {
            name: 'Import from Google Photos',
            text: 'Pick photos in Google Photos, and the app downloads them to DCIM, so they upload to the NAS.',
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
            name: 'Memories Pro',
            text: 'One A$7.99 purchase on Android opens People, album links, NAS duplicates, Edit and Draw, and hides the ads.',
          },
          {
            name: 'Desktop sorter',
            text: 'The desktop app sorts a folder into the same year, place and day folders as the phone.',
          },
          { name: 'Archive', text: 'Each year and month with a photo count. A tap opens the whole month.' },
          {
            name: 'Trip list and places map',
            text: 'The Archive lists trips abroad and road trips, and draws each photo with GPS on one map, by year.',
          },
          {
            name: 'People',
            text: 'The NAS groups faces by person, named people first. Merge an unknown face into a named person directly from their card.',
          },
          {
            name: 'Journal about a person',
            text: 'Notes on what a person did and said, with the date and age. Tap a note to edit or delete it, and add photos and videos from the phone or the library. Photos of that day show beside each note, and a linked Google Doc stays in step both ways.',
          },
          {
            name: 'Search by what a photo shows',
            text: 'Find a dog, a church, a passport, red or clouds, and join it with a person or a place such as Kiama. The NAS finds the things on its own, with no cloud.',
          },
          {
            name: 'Event folders in any file browser',
            text: 'Add a word in brackets to a folder name and the NAS gathers links to those folders, so Windows Explorer, a Mac or a phone file app opens them. Camera clips get a link inside their event.',
          },
          {
            name: 'Indexing progress page',
            text: 'A page on the NAS shows how far the face engine and the indexer got.',
          },
          {
            name: 'Albums about a person',
            text: 'An album about one child opens as a scrapbook, a chapter per year of age.',
          },
          { name: 'Turn a photo', text: 'A photo on its side gets stood up in the file on the NAS.' },
          {
            name: 'Edit a photo',
            text: 'The same editor in Memories and Shuttrix crops, rotates, draws and adds captions. On Android, Save replaces JPEG, PNG or WebP; Save copy keeps the source. The browser downloads a copy.',
          },
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
          {
            name: 'Light, blur and fonts',
            text: 'Exposure from −6 to +6 EV, tint, shadows and highlights. Approximate ellipse background blur and tilt shift have an adjustable sharp area. Captions offer sans serif, serif and monospace fonts. Capture-only settings stay out.',
          },
          {
            name: 'On the iPhone',
            text: 'The same app on the iPhone: the NAS, this day in past years, the editor saving to Photos and App Store purchases. The camera folder sort stays on Android.',
          },
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
          {
            name: 'Speed badge',
            text: 'Speed and limit appear in a car. Rail and flight checks silence road calls. Roads tagged in mph use miles per hour on screen and in speech.',
          },
          {
            name: 'Camera warnings',
            text: 'A beep about 20 seconds ahead, then "Speed camera ahead. Limit 60." It reaches the lock screen too, and names a camera on the other side of the road.',
          },
          {
            name: 'Camera alerts stay ready',
            text: 'Warnings keep working between drives and after Android restarts the app.',
          },
          { name: 'Over the limit', text: '"You\'re doing 72. Slow down." Near cameras only, or on any road.' },
          { name: 'School zones', text: 'The limit follows the zone hours and the NSW school terms.' },
          {
            name: 'Loud warnings',
            text: 'Full volume from the phone speaker, also in silent mode or with Bluetooth on. Each part has a switch.',
          },
          { name: "Author's voice", text: 'A Pro voice recorded from the app maker’s own voice.' },
          {
            name: 'Streets in the recorded voice',
            text: "With Maisie, Ava or Andrew, street names and their limit play in that voice too. The clips come from spotthecam.com, and a street without one uses the phone's voice.",
          },
          {
            name: 'Trip log',
            text: 'Drives and walks record on their own. Each trip gives the km driven and the km walked apart. Each route shows your speed at each camera, green or red. The speeds stay on your phone.',
          },
          {
            name: 'Trip line by limit',
            text: 'The colour of the trip line shows your speed against the limit. A tap shows the speed, the limit and the street.',
          },
          {
            name: 'Trip stats',
            text: 'Average and top speed, the share of the drive over the limit and by how much, the cameras you passed too fast, and the time lost in traffic jams. A marker on the map shows each jam.',
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
          { name: 'Hey Spot, what street am I on?', text: 'The app speaks the street and its limit.' },
          { name: 'Screen stays on', text: 'The map stays lit on the dashboard while the app is open.' },
          {
            name: 'Self-update',
            text: 'The APK checks GitHub for a newer release, with the size, progress and a cancel button.',
          },
          {
            name: 'SpotTheCam Pro',
            text: 'The free app starts 3 drives by itself, shows the stats of the last trip and gives Ava or Andrew free each week. A one time purchase lifts each limit and hides the ads.',
          },
        ],
      },
      {
        title: 'iPhone app',
        features: [
          {
            name: 'Same app on the iPhone',
            text: 'The map, trips, voice warnings, routes and Pro, sold through the App Store. It waits for an Apple account.',
          },
        ],
      },
    ],
  },
  {
    id: 'shuttrix',
    kind: 'app',
    repo: 'memories/apps/shuttrix',
    hue: 190,
    code: 'SHX',
    name: 'Shuttrix',
    tagline: 'A camera with the dials of a DSLR, and a Simple mode with big sliders.',
    lede: 'Shuttrix is an Android camera in 2 modes. Simple mode has big sliders with Night, Portrait, Long exposure, Panorama, Slow motion and Time lapse, and Pro mode puts lens, focus, white balance, ISO and shutter on dials.',
    platforms: ['Android'],
    stack: ['Expo', 'React Native', 'Kotlin', 'CameraX'],
    links: [],
    groups: [
      {
        features: [
          { name: 'Simple and Pro', text: 'A glass switch at the top picks the mode. A new install opens in Simple.' },
          {
            name: 'Simple mode',
            text: 'Lens pills over a zoom slider, then Light, Warmth and Color sliders. The modes sit up top, so the shutter stands alone under the thumb.',
          },
          { name: 'Night', text: 'The phone builds the photo from several frames while a bar shows.' },
          {
            name: 'Astro',
            text: 'A night sky held in the hand: sharp stars, the Milky Way, and a dark sky in place of a grey or orange one.',
          },
          {
            name: 'Moon',
            text: 'Zooms to 10x and exposes for the moon, so its seas and craters show in place of a white blob.',
          },
          { name: 'Long exposure', text: 'Blurs what moves: silky water, light trails, a crowd that fades.' },
          {
            name: 'Portrait',
            text: 'What you tap stays sharp, near or 10 m away, a person or a thing. The rest goes soft, and a slider sets the blur.',
          },
          { name: 'Mini', text: 'A tilt shift toy look in photos and videos, with the blur in the live preview.' },
          {
            name: 'Macro',
            text: 'A bug or a drop from 2 to 3 cm, as large as the phone allows, with the frame width in mm.',
          },
          { name: 'Panorama', text: 'A wide photo from a slow turn, stitched on the phone.' },
          { name: 'Slow motion', text: 'A video at 120 or 240 frames a second that plays back slowed.' },
          { name: 'Time lapse', text: 'A frame each half second, played 15 times faster: clouds, sunsets, crowds.' },
          {
            name: 'Lenses',
            text: 'A chip per lens the phone has, over one zoom scale. A selfie zooms to fit the people in the frame.',
          },
          {
            name: 'Focus',
            text: 'AF-C follows a moving subject and faces. A tap focuses on a point, and a drag of the reticle moves it.',
          },
          { name: 'White balance', text: 'Auto, presets or kelvin on a dial.' },
          {
            name: 'Exposure',
            text: 'ISO and shutter can be automatic or manual. Light and EV expose the full hardware compensation range. Auto reduces exposure more in dark scenes.',
          },
          {
            name: 'Auto tune',
            text: 'One button in Simple mode, or a tap on the preview, sets Light, Warmth and Color for the scene.',
          },
          { name: 'Color', text: 'One saturation value for the COLOR dial and the Color slider.' },
          {
            name: 'Photo, video and flash',
            text: 'Ordinary Photo fires on touch without an added focus wait or a later burst. Flash, RAW and hardware fallback can capture later. Hold to record.',
          },
          { name: 'Place and camera tags', text: 'Each shot carries where and how it was taken, as EXIF tags.' },
          { name: 'Photo and video size', text: 'Settings pick the photo and video size.' },
          {
            name: 'Photo format and originals',
            text: 'WebP, JPEG, PNG or RAW + JPEG, plus the camera original and a Color-only copy if you want them.',
          },
          {
            name: 'Multi-frame photo',
            text: 'A plain photo merges 5 quick frames into one, with half the noise and crisper edges.',
          },
          {
            name: 'Enhance photos',
            text: 'Enhance adds colour, sharpness and lifted shadows. With Enhance off, supported ordinary camera sessions use a fixed sRGB tone curve. Night and unsupported cameras keep their own processing.',
          },
          {
            name: 'Raw photo',
            text: 'Builds the photo from the raw sensor frames up to the press, with less noise and more detail. A room in front of a bright window stays bright. On by default.',
          },
          { name: 'QR codes', text: 'A code in the preview gets brackets and a pill to open it.' },
          {
            name: 'Clock',
            text: 'The time in the top left corner, where the phone clock sits, out of the controls’ way.',
          },
          {
            name: 'Gallery',
            text: 'Select photos or videos and share them together. The camera thumbnail refreshes after gallery deletions.',
          },
          {
            name: 'Plus',
            text: 'One purchase opens Astro, Moon, Long, Macro, Mini, Slo-mo and Lapse, and hides the ads.',
          },
          { name: 'Ads', text: 'One banner under the gallery grid. A one time purchase removes it.' },
          {
            name: 'Edit photos',
            text: 'The shared editor of Memories and Shuttrix crops, rotates, draws and adds captions. Save replaces the file, and Save copy writes a new JPEG.',
          },
          { name: 'Quick start', text: 'A double press of the power button opens Shuttrix, over the lock screen too.' },
          { name: 'Updates', text: 'A build from outside a store gets its new version from GitHub.' },
          {
            name: 'Bug reports',
            text: 'Settings sends the recent log with a note. After a crash, the next start sends the log of that moment.',
          },
          { name: 'Languages', text: 'The app in 9 languages, following the phone or browser.' },
          {
            name: 'Light, blur and fonts',
            text: 'Exposure from −6 to +6 EV, tint, shadows and highlights. Approximate ellipse background blur and tilt shift have an adjustable sharp area. Captions offer sans serif, serif and monospace fonts. Capture-only settings stay out.',
          },
          {
            name: 'iPhone app',
            text: 'The same camera on the iPhone: the dials, RAW and ProRAW, the built modes and App Store purchases. It reaches the App Store once an Apple account exists. The power button and the lock screen stay on Android.',
          },
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
    lede: 'Guitar Upscale shows scales and chords on a virtual fretboard, records loops and saves them as MIDI. It edits songs note by note, shows them as tab, and installs to the home screen. A compact fingering diagram above each playback chord shows a comfortable grip for the current scale, tuning, capo and string count.',
    platforms: ['Web', 'Android', 'iOS'],
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
          {
            name: 'Voice search',
            text: 'Say a song name. The words fill the search, and a card plays the match after 4 s unless you pick another or cancel.',
          },
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
            text: 'Chord names in bars that light up with the song. Paste words with chords, and they line up with the song.',
          },
          {
            name: 'Song upload',
            text: 'Guitar Pro and MIDI files join your song list. An MP3 finds its song online, with the chords.',
          },
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
            name: 'Guitar Upscale Pro',
            text: 'One Google Play purchase unlocks recording, the looper, song upload and search, and skins in the Android app, and removes ads. Every feature is open on the web.',
          },
          {
            name: 'Install and offline',
            text: 'A PWA that opens full screen in landscape. The Android APK updates itself.',
          },
          {
            name: 'iPhone app',
            text: 'The same app on the iPhone, with App Store purchases. It reaches the App Store once an Apple account exists.',
          },
          {
            name: 'Screen layout',
            text: 'The fretboard takes the whole screen, and the panels float over its corners.',
          },
          {
            name: 'Play panel',
            text: 'Plays what is loaded, steps through it, shuffles songs and saves them. Swipe left on the current chord panel for the next chord, or right for the previous chord on a touch screen. The chord panel shows a fingering diagram above each chord. A ?song= link, or another app such as Lumiere Player, opens a song.',
          },
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
    name: 'Tick-a-Lot',
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
          {
            name: 'Tick-a-Lot Pro',
            text: 'One Google Play purchase unlocks Packing, Things to see, the store order and prices, and hides the ads. Before that it gives a free taste: 3 prices in each list, 1 shop trip in store order, and 1 list of each kind.',
          },
          { name: 'The weekly shop for two', text: 'One person sets up the list, the other ticks it on the way home.' },
          { name: 'Songs to learn', text: 'A list of songs to learn on the guitar, the most wanted first.' },
          {
            name: 'Changing and deleting',
            text: 'Each field saves on its own, a tap ticks, and a removal offers Undo.',
          },
          { name: 'Languages', text: 'A shared list opens in the language of the phone that opens it.' },
          { name: 'Finding Tick-a-Lot in search', text: 'Guides and a home page bring people from search to the app.' },
          {
            name: 'Open source licences',
            text: 'Settings lists each package the app is built with, under the licence text it shares.',
          },
          {
            name: 'Long lists',
            text: 'On Android a green thumb at the right edge drags an 80 item list to any point. It fades 1.5 seconds after the list stops.',
          },
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
          {
            name: 'Hey Keep',
            text: 'A wake word the phone listens for in the background. "Эй, Кип" works too. Replies come in Maisie, Female, Male or the Author’s voice, and Tune to my voice fits the wake word to you.',
          },
          {
            name: 'Long recording',
            text: 'A Hey Keep note goes on through pauses and a locked screen until you tap Stop. A recording Android cuts off is saved as a note.',
          },
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
          {
            name: 'Loud sound from the phone speaker',
            text: 'Replies and recordings play from the phone speaker at full volume. Settings turn on Bluetooth or the phone volume.',
          },
          {
            name: 'Notes about a person go to Memories',
            text: 'A note that opens with the name of someone in Memories goes to their journal on the home NAS.',
          },
          {
            name: 'KeepPad Pro',
            text: 'The free app makes 3 share links and links 1 app of your pick. A one time purchase lifts both limits, sends notes to Memories and hides the ads.',
          },
          {
            name: 'Fast scroll',
            text: 'On Android a finger drags the scroll thumb of the notes list to any point, down to the last note.',
          },
          {
            name: 'Notes in the phone backup',
            text: "Android's backup to Google Drive keeps the notes, groups and settings, so a new phone gets them back. Recordings stay out.",
          },
          {
            name: 'Crash reports',
            text: 'A crash on Android sends its trace to Firebase Crashlytics, with no note text or recording.',
          },
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
    tagline: 'Video calls across borders, with a board for shared images and video.',
    lede: 'Farnear calls family through a link, with no account. Hosts connect at once; guests choose their devices, then connect.',
    platforms: ['Web', 'Android', 'iOS'],
    stack: ['React', 'Vite', 'WebRTC', 'Cloudflare Workers', 'Kotlin', 'Swift', 'Capacitor'],
    links: [{ href: 'https://farnear.workbench-soft.com', label: 'farnear.workbench-soft.com' }],
    groups: [
      {
        features: [
          {
            name: 'Calls through a link',
            text: 'A link is the room. The host joins at once; guests choose their mic, camera and speaker, then connect.',
          },
          { name: 'Recover a dropped call', text: 'A dropped call retries 3 times, then offers Try again.' },
          {
            name: 'Return to a call',
            text: 'Switched apps? The link joins again with no button, and home shows Return to the call.',
          },
          {
            name: 'Relay for blocked networks',
            text: 'Cloudflare TURN steps in when a direct path between the networks fails.',
          },
          {
            name: 'Share the call link',
            text: 'Each person in the call can copy the link or send it by Gmail, email, WhatsApp, Telegram or another app.',
          },
          {
            name: 'Join with a room code',
            text: 'A 6 symbol code, read aloud or typed on the home page, opens the call while someone is in it.',
          },
          { name: 'Saved rooms', text: 'A room link saved under a name, such as Mum. The same link works every time.' },
          {
            name: 'Board',
            text: 'Everyone draws with a pen, highlighter or fading laser. A drag draws a line, an arrow, a box or a circle. They can erase and undo their own work, and zoom in on a page on their own screen.',
          },
          {
            name: 'Share an image or video',
            text: 'One person loads an image or video up to 100 MB. Everyone sees it and draws over it.',
          },
          {
            name: 'Lessons',
            text: 'A lesson room for a teacher: slides prepared before the call, a pen lock, a timer, and students who follow the page and zoom. The slides keep their lines for the next lesson, export to another device, and the student gets only new files.',
          },
          {
            name: 'Lesson tasks',
            text: 'A quick question with yes or no or up to 4 answers, a private notebook for each student that the teacher sees in a grid, and words and stamps the students drag to their places.',
          },
          {
            name: 'Contacts and ringing',
            text: 'A tap on a person rings their phone, with Answer and Decline. No sign up. A text message reaches them as a notification.',
          },
          {
            name: 'Ads and remove ads',
            text: "Ads around a call, none during one. One A$2.99 purchase removes them for the buyer's rooms.",
          },
          {
            name: 'Farnear Pro',
            text: 'The board is free. YouTube together, files on the board, lessons and colouring each open in 3 calls for free. One A$5.99 purchase on Android takes the limit away and removes ads.',
          },
          {
            name: 'Android app',
            text: 'The web app in an Android wrapper, with signed APK and AAB releases and dated versions.',
          },
          {
            name: 'iPhone app',
            text: 'The same app on the iPhone, with App Store purchases and the iPhone share sheet. It reaches the App Store once an Apple account exists.',
          },
          { name: 'Languages', text: 'The app in 9 languages, following the phone or browser.' },
          { name: 'App icon', text: 'A neon phone portal, on Android and the web.' },
          {
            name: 'Call stage',
            text: 'The call fills the window. One tile is large, the rest sit in a strip, and a tap pins a tile large. The device details of another participant can switch their microphone or camera.',
          },
          {
            name: 'Share a screen',
            text: 'One person shares a screen, a window or a tab. The others see it large and draw over it.',
          },
          {
            name: 'Take a photo',
            text: 'Save the call with the board and a shared screen as a PNG in Downloads. The picture stays on the device.',
          },
          {
            name: 'Your name',
            text: 'The name the others see on your tile. Change it on the home page or in Settings.',
          },
          {
            name: 'Video background',
            text: 'Blur the room behind you, or put a drawn scene or your own picture there.',
          },
          {
            name: 'Call transcript and summary',
            text: 'One device writes down what each person says. The text stays with the saved call, with a summary per call.',
          },

          {
            name: 'Recover stalled media',
            text: 'Incoming audio and video are checked separately. A stall triggers ICE repair and a bounded reconnect without reloading.',
          },
          { name: 'Shared call titles', text: 'A room name syncs between participants and stays with the saved link.' },
          {
            name: 'Shared documents on the board',
            text: 'Share PDF or PowerPoint slides, turn pages together and remove the file while keeping the ink.',
          },
          {
            name: 'Board text',
            text: 'The T button types text on the board, over a file or a screen. Each person sees it and can edit, erase or undo it.',
          },
          {
            name: 'Board stamps',
            text: 'A star, a tick, a cross, a heart or a Well done badge lands on the board with a tap, in the current colour and size, for each person.',
          },
          {
            name: 'Board pages',
            text: 'New page opens an empty page on the blank board for everyone. The arrows flip the pages, and each page keeps its lines.',
          },
          {
            name: 'Colouring',
            text: 'A cat, a fish, a house, a car and a flower to colour in. A Fill tap colours an area for everyone.',
          },
          {
            name: 'Noughts and crosses',
            text: 'A game for 2 on the board, with whose turn it is, the winner and the winning row on each screen.',
          },
          {
            name: 'YouTube together',
            text: 'A pasted YouTube link plays on the board for everyone. Play, pause and seek on any device move all of them.',
          },
          {
            name: 'Contacts and rooms',
            text: 'The home page lists contacts and rooms. A contact is a person, a room is a link many people open.',
          },
          {
            name: 'Search and share preview',
            text: 'Search engines read the home page in 9 languages. A shared link shows the Farnear icon and name.',
          },
          {
            name: 'Messages in a call',
            text: 'A Messages button in the call sends short lines that arrive even when the video fails.',
          },
          { name: 'Button hints', text: 'Each icon button shows its name after a hover or a long press.' },
          {
            name: 'Close Farnear and take back its permissions',
            text: 'A power button ends the call and the ring. On Android 13 and later the app also drops its camera, microphone and notification permissions.',
          },
          {
            name: 'Reactions and raised hands',
            text: 'A heart, clap, laugh, party or fireworks rises from your tile and over the board. A raised hand stays until you lower it.',
          },
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
          {
            name: 'Ads and Remove ads',
            text: 'A banner and a full screen ad on Android. One payment removes them. A Remove ads chip sits above the banner.',
          },
          {
            name: 'Sound',
            text: 'Words play from the phone speaker at full volume. Settings can let them use Bluetooth or the system volume.',
          },
          {
            name: 'Memoire Pro',
            text: 'One A$5.99 purchase on Android opens talk practice with no limit, sync, the widget and all 14 topics, and hides the ads. Without Pro you get 3 talks a week and one Pro topic free each week.',
          },
          { name: 'Updates', text: 'The APK from GitHub says when a newer Memoire is out and installs it.' },
        ],
      },
    ],
  },
  {
    id: 'skyaltar',
    kind: 'app',
    repo: 'skyaltar',
    hue: 255,
    code: 'SKY',
    name: 'Sky Altar',
    tagline: 'The night sky through the phone, drawn in the style of old cultures.',
    lede: 'Hold the phone up and Sky Altar shows the stars, the Moon, the planets and the constellations behind it. Each theme draws them the way Greece, the Vikings, the Maya or Ancient China might have, with slow ambient music under it.',
    platforms: ['Android', 'Web'],
    stack: ['Expo', 'React Native', 'Skia', 'Astronomy Engine'],
    links: [{ href: '/skyaltar/astrology/', label: 'Astrology guide' }],
    groups: [
      {
        features: [
          {
            name: 'Sky view',
            text: 'Stars, the Sun, the Moon, the planets and 88 constellations over the camera, or turned by hand. A compass shows north, up and down.',
          },
          {
            name: 'Clock',
            text: 'A calm clock with the date at the top of the sky, in the theme’s font. It dims with the buttons.',
          },
          {
            name: 'Camera stars',
            text: 'The camera picture stays dim. Stars it sees twinkle with a trail of sparks and flash gold when they match the sky.',
          },
          {
            name: 'Culture themes',
            text: '19 cultures, from Greece and Rome to the Inca, Sumer, the Stone Age and the Celtic Elven Grove. Gallery shows the 28 pictures of each.',
          },
          {
            name: 'Ambient music',
            text: 'Each culture plays its own calm track on its old instruments, Greece the song “Sky Altar” by Lyrienne. Turn it off, or play your own files or a whole folder.',
          },
          { name: 'Ads and Remove ads', text: 'Ads stay off the sky. A one time $2.99 purchase removes them.' },
          {
            name: 'Sky Altar Pro',
            text: 'One A$4.99 purchase unlocks 18 more cultures, your own music, and each tip of Today and Match in Your stars. It hides the ads. Without it, one Pro culture is free each night, Today shows its first tip, and Match opens for 3 pairs.',
          },
          { name: 'App languages', text: 'The screens and the constellation names in 9 languages.' },
          {
            name: 'Updates from GitHub',
            text: 'The Android app finds a new version and installs it. Settings has a Check for updates button.',
          },
          {
            name: 'Astrology',
            text: 'Swipe in from the left for the birth chart, tips for the day and a match score. Today’s zodiac sign glows on the sky.',
          },
          {
            name: 'Constellation navigation',
            text: 'Search a constellation by name, and the sky turns to the one you tap.',
          },
          {
            name: 'Constellation lore',
            text: 'Each constellation has a card with its myth from the theme’s culture, what to look at, and its brightest stars with their distance. The gallery flies the sky to it. A tap on a constellation shows the figure the theme draws there, and a button reads its myth aloud.',
          },
          {
            name: 'Long lists',
            text: 'On Android a finger drags the scroll thumb of the constellation list and the theme gallery to any point.',
          },
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
    tagline:
      'An Android player with voice control for video, music and audiobooks, which also installs on a Google TV.',
    lede: 'Lumiere Player plays your own files from the phone, a USB stick or an SMB share on libVLC, so it opens what VLC opens. Each video, song and book keeps its place, and voice commands find them by name.',
    platforms: ['Android', 'Google TV', 'Android TV', 'LG webOS', 'Windows', 'macOS'],
    stack: ['Kotlin', 'Android Views', 'libVLC', 'TypeScript', 'Electron'],
    links: [],
    groups: [
      {
        features: [
          {
            name: 'Direct folder browsing and playback',
            text: 'Opens straight into a tree of the phone, USB and NAS folders, and plays a file with no setup or scan.',
          },
          {
            name: 'Optional library setup and NAS finder',
            text: 'Finds the NAS on the network so you type only the login, and lets you tick its shares. Folders of films, series, cartoons, music and audiobooks are optional and fill the search.',
          },
          { name: 'Resume', text: 'Each file keeps its position, and the list shows how far you got.' },
          { name: 'Subtitles and audio', text: 'Embedded tracks and files in the same folder, Cyrillic included.' },
          { name: 'Controls', text: 'Skip 10 or 30 seconds, change speed, shuffle and repeat.' },
          { name: 'Updates', text: 'Finds new releases on GitHub at launch or under Updates.' },
          { name: 'Ads', text: 'A banner on the home screen, with a one time unlock in the Play build.' },
          { name: 'Languages', text: 'The TV screens in 9 languages, following the phone or browser.' },
          {
            name: 'Touch on a phone',
            text: 'Tap for the panel, double tap a side to skip, drag to scrub, swipe for brightness and volume, and a touch lock.',
          },
          { name: 'Panel buttons', text: 'Pick the buttons the player shows, aspect ratio included.' },
          { name: 'Sponsor skip', text: 'Videos saved with yt-dlp skip their SponsorBlock sponsor segments.' },
          {
            name: 'Phone speaker',
            text: 'On a phone the video plays from the speaker at full volume, also with Bluetooth. Bluetooth and the system volume turn on in Settings. A Bluetooth device that plays no sound, such as a car on the radio, hands the sound back to the phone speaker.',
          },
          {
            name: 'Look',
            text: 'A calm dark look in the style of Google TV, a white focus pill, and a player that fits a phone.',
          },
          {
            name: 'Music library',
            text: 'Phone, USB and NAS folders in one music library, scanned in the background.',
          },
          {
            name: 'Music player',
            text: 'Artists and Songs sit on the home screen beside the drives. The player bar stays on each screen but video, with breadcrumbs and artist sort. Live tracks are skipped, on by default.',
          },
          {
            name: 'MusicBrainz and YouTube',
            text: 'Hey Lumi plays a song, an artist or a style no folder holds. MusicBrainz names the songs and YouTube plays them.',
          },
          {
            name: 'Audiobooks',
            text: 'Book folders by author, each book with its cover and progress. A book starts where it stopped, a little earlier after a pause. A wrong skip back to a chapter goes on where it left off.',
          },
          {
            name: 'Video library',
            text: 'Video folders list shows, seasons and episodes, crooked file names too. Say Hey Lumi, play cartoons, or a show with its season and episode. The search panel finds films and songs, typed or said into the Google TV remote. It also finds a film by its director, an actor, a genre or a year, from the facts the LG TV keeps on the NAS.',
          },
          {
            name: 'Find tabs',
            text: 'With Guitar Upscale installed, a guitar button opens the tabs of the song that plays.',
          },
          {
            name: 'Google Play build',
            text: 'Google Play updates it, and media permissions take the place of all files access.',
          },
          {
            name: 'Voice commands',
            text: 'Say Hey Lumi, then play and a song, or volume 40, in English or Russian, with the phone locked. A pulse shows it listens. Turn on Bluetooth connects the speaker or headphones and names them. Play the last album of In Flames, or its album from 2016, plays that one album.',
          },
          {
            name: 'Online music',
            text: 'In the APK from GitHub, Hey Lumi plays a song, an artist, an album or a style that no folder holds, found in the MusicBrainz catalog.',
          },
          {
            name: 'Lumiere Pro',
            text: 'One payment unlocks the voice commands and Hey Lumi, and hides the ads. Voice works free for the first 7 days.',
          },
          {
            name: 'LG webOS app',
            text: 'A webOS app for an LG TV shows USB sticks and NAS folders as one tree, finds the NAS on the network so you type only the login, and plays with on-screen buttons, subtitle and audio pickers, and a film name said into the Magic Remote. At the first start you pick the folders of films, series, cartoons, music and audiobooks, and the tree shows them by kind. Lumiere keeps the index fresh by itself, so a title such as Paddington plays at once.',
          },
          {
            name: 'Windows and Mac app',
            text: 'The LG TV app as a desktop app for Windows and Mac. It lists the home folder, each drive and each NAS, and plays with the keyboard or the mouse. Windows updates itself.',
          },
          {
            name: 'Continue Watching',
            text: 'Up to 20 recent films, episodes and books with their progress. A row resumes where you stopped, and a finished episode offers the next one.',
          },
          {
            name: 'Film look',
            text: "A light moving grain over the picture, kept for the next film. Google TV also switches to the film's own frame rate.",
          },
          {
            name: 'Caught songs',
            text: 'Each song SongCatcher catches joins Liked songs, with the app closed. A song no folder holds plays from YouTube.',
          },
          {
            name: 'Titles of films, series and books',
            text: 'The Russian and English title with the year from Wikidata, and the file name in small grey type under it.',
          },
          {
            name: 'Library scan',
            text: 'A line above the home list names the folder read now, the folders done and the time left, with a bar. Folders on different devices scan at once. Stop the scan and Scan the library again sit in Settings. The phone, the Google TV, the LG TV and the desktop behave the same.',
          },
          {
            name: 'Play all and Shuffle all on a folder',
            text: 'An open folder of the home tree starts with 2 rows. Play all plays each film or song in the folder and the folders inside it, in the order of the tree. Shuffle all plays the same files in random order.',
          },
          {
            name: 'Breadcrumbs and one level up or down',
            text: 'A row of buttons above each list shows the path to the level you are in, and a press on one jumps there. Up, Back on the remote or Escape goes one level up, and the row you came from takes the focus.',
          },
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
            text: 'Green pins for the cheapest third, yellow for the middle and red for the dearest. Coloured waves roll out from the cheapest price like an earthquake. A price a feed stops sending leaves the map after 3 days.',
          },
          { name: 'Your place on the map', text: 'A blue dot marks you, with an arrow that turns with the compass.' },
          {
            name: 'Station list',
            text: "The servos in view, cheapest first, with brand, suburb and when the price changed. It says when a state's prices are late. With no connection it keeps the last area and its prices, with Try again.",
          },
          {
            name: 'Price history chart',
            text: 'The daily average over a band from the low to the high, for 30, 90 or 365 days. The year opens free for 3 servos.',
          },
          {
            name: 'Price alert',
            text: 'Save a servo and a fuel with your price. The phone tells you when the price drops below it, or to its lowest in 30 days. One alert is free.',
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
            name: 'Site text and guides',
            text: 'A home page that explains the map in words, and guides on fuel pricing, each state scheme, the grades and EV charging.',
          },
          {
            name: 'Self-update from GitHub',
            text: 'The APK checks GitHub on start and on each return, and shows the download in the header.',
          },
          { name: 'Remove ads', text: 'A one time Google Play purchase, restored on a new phone.' },
          {
            name: 'ServoHop Pro',
            text: 'One purchase hides the ads and opens the 365 day chart, Hey Servo and a price alert for each servo. Each one works free inside a limit first.',
          },
          {
            name: 'Area search',
            text: 'Find a suburb or a postcode and fly the map there. Each row shows its distance, sorted by price, distance or power.',
          },
          {
            name: 'Hey Servo',
            text: 'Say "Hey Servo, go to the nearest charger" and Google Maps starts. Free for 7 days, then part of Pro. Android only.',
          },
          { name: 'Fuel panel', text: 'Pick petrol, diesel, gas or chargers, slow AC or fast DC.' },
          { name: 'Ads', text: 'One banner under the list: AdMob in the app, AdSense on the site.' },
          {
            name: 'App Store',
            text: 'The iPhone and iPad app ships through the App Store, in Australia only, since the prices come from the Australian state feeds. The listing comes in 9 languages.',
          },
          { name: 'Languages', text: 'The screens come in 9 languages and follow the phone or browser.' },
          {
            name: 'Links open the app',
            text: 'A servohop.com link to a servo, suburb, state or the home page opens the Android app on that screen.',
          },
          {
            name: 'Open source licences',
            text: 'Settings lists each open source package in the app with its licence. A tap opens its npm page.',
          },
        ],
      },
    ],
  },
  {
    id: 'songcatcher',
    kind: 'app',
    repo: 'wake-share',
    hue: 140,
    code: 'SNG',
    name: 'SongCatcher',
    tagline: 'Say "Shazam" and the song lands in your Liked Songs.',
    lede: 'SongCatcher is an Android app that listens for one word. Say "Shazam" with the phone locked, and the song that plays around you goes to Spotify Liked Songs and to Lumiere. It shares the microphone with the other wake phrase apps.',
    platforms: ['Android'],
    stack: ['Kotlin', 'Jetpack Compose', 'sherpa-onnx', 'Shazam', 'Spotify Web API', 'LRCLIB'],
    links: [],
    groups: [
      {
        title: 'Catch a song',
        features: [
          {
            name: 'Wake by voice',
            text: 'Say "Shazam" with the phone locked in a pocket, and a beep answers. On the screen one big button glows while it waits, fills a ring over the catch and spins while it saves.',
          },
          {
            name: 'Song recognition',
            text: "The phone builds Shazam's audio fingerprint itself and asks Shazam after 3 seconds of music, then at 6, 9 and 12. Only the fingerprint leaves the phone. A build with Apple's ShazamKit and a developer token asks the official ShazamKit catalog instead, the legal path for a paid Google Play release.",
          },
          {
            name: 'Liked Songs in Spotify and Lumiere',
            text: 'Each song goes to Spotify Liked Songs and to Lumiere Liked Songs, marked From SongCatcher.',
          },
          {
            name: 'Spoken answer',
            text: 'A voice says the song it saved, or that it found none, while the music ducks. A Russian, Japanese, Korean or Chinese name is spoken by a voice of that language.',
          },
          {
            name: 'Offline catches',
            text: 'With no internet the fingerprint waits on the phone and goes out later, for up to a week.',
          },
          {
            name: 'Caught songs',
            text: 'The latest song sits on a card with its cover, album and year. Earlier ones, up to 50, follow in a list. One button saves the songs waiting for Spotify with no new recording.',
          },
          {
            name: 'Lyrics',
            text: 'A tap on a song opens its words from LRCLIB, kept on the phone after the first load.',
          },
          {
            name: 'Find tabs in Guitar Upscale',
            text: 'With Guitar Upscale on the phone, a guitar button on the song card opens the tabs of that song, as in Lumiere.',
          },
          { name: 'Languages', text: 'The screens and the voice come in 9 languages and follow the phone.' },
        ],
      },
      {
        title: 'Shared with the other apps',
        features: [
          {
            name: 'Shared microphone',
            text: 'keepPad, Lumiere, SongCatcher, SpotTheCam and ServoHop hear their own phrases at the same time. One app holds the microphone and hands each wake to its app.',
          },
          {
            name: 'Wake engine',
            text: 'One engine hears every phrase: a small model per phrase tuned to the owner, and a keyword spotter for phrases without one.',
          },
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
          {
            name: 'If you leave your job',
            text: 'Pick a leave date to see the payout figure and four ways out of the lease, each with the cash from your pocket and the loss.',
          },
          { name: 'Language', text: 'The calculator in 9 languages, with money in Australian dollars.' },
          { name: 'Ads', text: 'AdSense blocks on the site and an AdMob banner in the Android app.' },
          {
            name: "No ads on the developer's phone",
            text: 'Each build hides the banner on a phone with the developer key.',
          },
          {
            name: 'iPhone app',
            text: 'The calculator, guides and pages as an iPhone app that works offline from the first launch. It waits for the App Store.',
          },
          {
            name: 'Remove ads on the iPhone',
            text: 'One App Store payment hides the banner. Restore purchase brings it back on a new iPhone.',
          },
          {
            name: 'Share the result',
            text: 'A Share button under the verdict sends the cheapest option and its cost, with the link, to Messages, Mail or Notes.',
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
          {
            name: 'Rents',
            text: 'Each postcode of NSW, VIC, QLD, SA and TAS coloured by the median weekly rent of new leases.',
          },
          { name: 'Install from the browser', text: 'The web build installs as an app with its own icon.' },
          {
            name: 'Ads and Remove ads',
            text: 'One AdMob banner below the map on Android. A one time A$2.99 purchase removes it. The website shows no ads.',
          },
          {
            name: 'Property Trends Pro',
            text: 'One A$5.99 purchase on Android unlocks Rents and the full price history, and removes the ads. The free app opens both for 3 suburbs a day.',
          },
          {
            name: 'iPhone app',
            text: 'The same map, Pro and languages on the iPhone, from the same code. It reaches the App Store once the developer account opens.',
          },
        ],
      },
    ],
  },
  {
    id: 'games',
    kind: 'app',
    source: 'https://github.com/workbench-soft/workbench-soft.github.io/tree/main/apps/games',
    repo: 'workbench-soft.github.io/apps/games',
    hue: 130,
    code: 'GAM',
    name: 'Workbench Games',
    tagline: 'Party games in the browser: draw, guess and give clues.',
    lede: 'Workbench Games are three party games for friends. One person makes a room and sends the link, and the others join in the browser with no account.',
    platforms: ['Web'],
    stack: ['Astro', 'Preact', 'Cloudflare Workers', 'Durable Objects'],
    links: [
      { href: 'https://games.workbench-soft.com/games/', label: 'All games' },
      { href: 'https://games.workbench-soft.com/games/guess-the-drawing/', label: 'Guess the drawing' },
      { href: 'https://games.workbench-soft.com/games/drawing-telephone/', label: 'Drawing telephone' },
      { href: 'https://games.workbench-soft.com/games/clue-duel/', label: 'Clue duel' },
    ],
    groups: [
      {
        features: [
          { name: 'Rooms by link', text: 'One link brings 2 to 12 friends into the same room.' },
          {
            name: 'Kids mode',
            text: 'A child who can’t read plays too: tap an animal to join, guess by tapping a picture, hear each word read aloud.',
          },
          { name: 'Guess the drawing', text: "Draw a word, guess the others' drawings, race for points." },
          {
            name: 'Drawing telephone',
            text: 'A phrase turns into drawings and back, and the album shows how it changed.',
          },
          { name: 'Clue duel', text: 'A team word game where every clue is public and stealing pays.' },
          {
            name: 'Drawing tools',
            text: 'Pen, eraser, fill, line, rectangle, circle, 20 colours, 4 sizes and undo, with big colours for small fingers.',
          },
          { name: 'Languages', text: 'The pages and the rooms work in English and Russian.' },
          { name: 'Ads', text: 'The games stay free, with a banner on the content pages, the lobby and the results.' },
          { name: 'Android and iOS apps', text: 'The same games as an installed app.' },
          {
            name: 'Party look',
            text: 'A night party glow, or candy pastels in light mode, with a colour for each game.',
          },
        ],
      },
    ],
  },
  {
    id: 'neurohop',
    kind: 'client',
    repo: 'neuroigry',
    hue: 35,
    code: 'NRG',
    name: 'NeuroHop',
    tagline: 'Neuropsychological games for children 2 to 12, with step by step instructions.',
    lede: 'A library of games for parents and specialists. Pick the age, the brain block after Luria and the target, such as attention or self-control, and get games with the steps, the goal and ways to make them easier or harder.',
    platforms: ['Web', 'Android', 'iPhone'],
    stack: ['Expo', 'React Native', 'Rust', 'Cloudflare Workers', 'Cloudflare R2'],
    links: [
      { href: 'https://neurohop.workbench-soft.com', label: 'neurohop.workbench-soft.com' },
      { href: 'https://neurohop.workbench-soft.com/privacy', label: 'Privacy policy' },
    ],
    groups: [
      {
        features: [
          {
            name: 'Catalog with filters and search',
            text: 'Cards with a picture, the ages, a short text and the main target. Filters by age, brain block, target, format and equipment combine, and the search matches as you type.',
          },
          {
            name: 'Game page',
            text: 'Each game in sections: age, description, goal, equipment, steps, easier, harder, ways to play and tips. Each game has its own link. The game texts are Russian, the screens come in 9 languages.',
          },
          {
            name: 'Premium games',
            text: 'A premium card shows a lock. The Workbench subscription opens the full game.',
          },
          {
            name: 'Free game of the week',
            text: 'Each week 1 premium game opens with no sign in and no subscription. Its card says "Free this week", and its page names the day the next one opens.',
          },
          { name: 'Ads', text: 'AdMob banners in the app and AdSense on the site. The subscription hides them.' },
          {
            name: 'Settings and the Workbench plan',
            text: 'Google sign in, the language, the plan with Buy and Restore on Android, ad privacy choices and Delete account.',
          },
          {
            name: 'Admin',
            text: 'The owner edits each game, uploads its picture, edits the lists of targets and formats, and imports many games from a CSV file.',
          },
          {
            name: 'App icon and store listing',
            text: 'A soft smiling brain on a peach tile. The Android app goes to Google Play once its review passes, and the iPhone app follows.',
          },
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
    links: [{ href: 'https://tripforge.workbench-soft.com', label: 'tripforge.workbench-soft.com' }],
    groups: [
      {
        features: [
          {
            name: 'Ask',
            text: 'Pick the places from a list of countries and cities, a month or a day in the calendar, the nights and who goes, or open a link from Tick-a-Lot.',
          },
          {
            name: 'Flights',
            text: 'The cheapest round trips around the date, a fare calendar, and links to Aviasales and Google Flights.',
          },
          { name: 'Places', text: 'The top sights and the secret spots of each city, filtered by interest chips.' },
          { name: 'To Tickalot', text: 'One tap sends the trip to Tick-a-Lot as a sights list and a packing list.' },
          { name: 'Settings', text: 'The app language: the phone’s, or one of 9.' },
          { name: 'Ads', text: 'A banner and a full screen ad on Android. A one time Remove ads purchase hides them.' },
          {
            name: 'Tripforge Pro',
            text: 'One purchase on Android gives unlimited searches, dates shifted up to 30 days, up to 50 saved trips and no ads. The free app tries both first: 3 searches a month with the wide shift and 1 saved trip.',
          },
          {
            name: 'Website pages for search',
            text: 'A home page per language with the ask form, its own title, preview picture and data for search engines, listed in the sitemap.',
          },
          { name: 'Dark mode', text: 'The app and the website follow the phone or browser theme.' },
        ],
      },
    ],
  },
  {
    id: 'langflip',
    kind: 'app',
    source: 'https://github.com/workbench-soft/langflip',
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
            text: 'The tray shows EN or RU for the window in front, on the icon and in its tooltip.',
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
          { name: 'Update from GitHub', text: 'Checks for a new release once a day and updates itself after a click.' },
          { name: 'Welcome on the first start', text: 'A dialog names the keys and shows where the icon hides.' },
        ],
      },
    ],
  },
  {
    id: 'media-organizer',
    kind: 'app',
    source: 'https://github.com/workbench-soft/workbench-soft.github.io/tree/main/media-organizer',
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
    source: 'https://github.com/workbench-soft/agent-skills',
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
          { name: 'Writing style', text: 'Plain, short text in each reply, commit and doc, without the AI tone.' },
          { name: 'Code review', text: 'A review against a checklist, with each finding checked against the code.' },
          {
            name: 'Reviewer lenses',
            text: 'One subagent per lens, such as security or performance. Only proven findings come back.',
          },
          { name: 'Pull requests', text: 'Short PR bodies with flow diagrams, and one commit per review thread.' },
          { name: 'Review comments', text: 'Each review thread gets one commit and a reply with its SHA.' },
          {
            name: 'Ticket to merge',
            text: 'Reads a ticket, builds it in its own worktree, opens the PR and moves the ticket.',
          },
          {
            name: 'App audit',
            text: 'Parallel reviewers per lens, such as security and performance. The safe findings get fixed.',
          },
          { name: 'Specs first', text: 'Each feature starts as a spec in the repo, and the work follows it.' },
          { name: 'One-pager', text: 'The full text first, then a one screen summary on top.' },
          { name: 'Commands through mise', text: 'Each command runs through mise, with the versions the repo pins.' },
          { name: 'Translations', text: 'Each string ships in every language of the app, in the same change.' },
          { name: 'Worktrees', text: 'Each change gets its own checkout, cleaned up after the merge.' },
          {
            name: 'Fast JavaScript',
            text: 'Fewer round trips and a smaller bundle, with the rule and the cost of each finding.',
          },
          { name: 'Architecture', text: 'The smallest layered shape for the app, with its rules enforced in CI.' },
          { name: 'Monorepos', text: 'Apps and packages in one repo, with pinned tools and one API schema.' },
          {
            name: 'History reset',
            text: 'Squashes the history into one fresh initial commit, with a bundle kept as a backup.',
          },
          { name: 'Rewrite a repo', text: 'New names, folders and docs, with the same behaviour.' },
          {
            name: 'Help on a site',
            text: 'Opens each screen in your Chrome, fills the known fields and stops at the login or the payment.',
          },
          { name: 'Hung runs', text: 'Finds the tool that holds a port or a file, ends it and reruns the step.' },
          { name: 'Search setup', text: 'Search Console, Bing, a sitemap and analytics for a site.' },
          { name: 'Ads', text: 'AdSense and AdMob, with test ads in debug builds and the consent message.' },
          {
            name: 'Google Play release',
            text: 'A signed bundle with a new version code, rolled out to internal testing.',
          },
          { name: 'Launch in one run', text: 'Search setup, ads and the Google Play release, in that order.' },
          { name: 'Marketing', text: 'First users from a budget: the message, a launch calendar and the posts.' },
          { name: 'In-app updates', text: 'Self-update for sideloaded apps, left out of the Play build.' },
          { name: 'Names and domains', text: 'Checks a name against domains, the business register and trade marks.' },
          { name: 'Legal risks', text: 'Scans licences, data SDKs and store policy, and fixes the safe findings.' },
          { name: 'App icons', text: '10 icons in styles that fit the app, a picker in the chat, then every size.' },
          { name: 'Demo screenshots', text: 'Demo data, screenshots and short videos for the README.' },
          {
            name: 'Store media',
            text: 'The same screenshots, video and icon on Google Play, the site and the installers.',
          },
          {
            name: 'End to end walk of a release',
            text: 'Installs the newest release, walks each main flow and reports per flow.',
          },
          { name: 'Hear and pick a voice', text: 'Plays each text to speech voice, so a person can pick one.' },
          {
            name: 'Reddit comments',
            text: 'Finds threads the repo can answer, drafts a reply and types it into Chrome. The person presses Comment.',
          },
          { name: 'Voice at the end of a turn', text: 'A short spoken line says the agent is done, waits or asks.' },
          { name: 'Install', text: 'One clone linked into each agent on the machine. An edit reaches all of them.' },
          {
            name: 'Agent hooks',
            text: 'The time on each prompt, guards on the built-in browser and on archiving, and the MCP servers copied to Codex and Kimi.',
          },
          { name: 'Releases', text: 'Each push to main that passes the checks gets a dated release with notes.' },
          {
            name: 'Progress bars',
            text: 'A long Claude Code turn posts text bars each minute for the script, the step and the whole task, with the minutes left.',
          },
          {
            name: 'Feature queue',
            text: 'Each session claims the files it edits. Sessions with overlapping files wait their turn, and the rest push straight to main.',
          },
          {
            name: 'Workflow and code rules',
            text: 'Every session plans, ships and reports the same way: a spec first, a PR merged at once, and one script for the steps left to a person.',
          },
        ],
      },
    ],
  },
  {
    id: 'local-ci',
    kind: 'tool',
    source: 'https://github.com/workbench-soft/local-ci',
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
          {
            name: 'CI status page',
            text: 'A local page shows the runner and the jobs at a glance, with a progress bar per release and the reason for each cancel.',
          },
          {
            name: 'Build cancellation',
            text: 'The page server stops a replaced run, and a release whose Checks failed. The log names each cause.',
          },
          {
            name: 'Cloud runners first',
            text: 'Jobs build on free cloud runners while their minutes last, then on this PC.',
          },
          {
            name: 'Releases',
            text: 'Start an app release on CI, build Android APKs from the latest main and install them on a connected phone. Install Dev also unlocks its developer settings. A cleanup deletes old Actions artifacts and APK releases after a confirm.',
          },
          { name: 'Updates by themselves', text: 'The PC installs each release within minutes of the merge.' },
          {
            name: 'Sites',
            text: 'Deploy site starts the deploy workflow of each org repo with a site, on main. The page finds the workflow by itself.',
          },
          {
            name: 'CI trends',
            text: 'Charts of runs a day by result, build time, the wait for a runner and the steps that fail most. Free, from the GitHub API.',
          },
        ],
      },
    ],
  },
  {
    id: 'git-aliases',
    kind: 'tool',
    source: 'https://github.com/workbench-soft/git-aliases',
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
    source: 'https://github.com/workbench-soft/gh-review-notify',
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
    id: 'site-sources',
    kind: 'tool',
    repo: 'chrome-site-sources',
    hue: 215,
    code: 'SRC',
    name: 'Site Sources',
    tagline: 'A Chrome extension that saves the sources of any page as one zip.',
    lede: 'Press Download in its popup and watch the bar fill. The page, every file it loaded and the original code from its source maps land in one zip under Downloads.',
    platforms: ['Chrome'],
    stack: ['TypeScript', 'Chrome Extensions API', 'Vite'],
    links: [],
    groups: [
      {
        features: [
          {
            name: 'Download from the popup',
            text: 'The icon opens a popup with the site and a Download button. It keeps going when the popup closes.',
          },
          {
            name: 'Progress bar',
            text: 'Counts the files it finds, then fills with 12 of 40 downloaded and the ones that failed.',
          },
          { name: 'One zip', text: 'The live HTML and each script, style, image and font, laid out as on the server.' },
          { name: 'Original sources', text: 'Each source map with its code gives back the .ts, .tsx or .vue files.' },
          { name: 'Languages', text: 'The popup follows the Chrome language.' },
        ],
      },
    ],
  },
  {
    id: 'open-in-remote-repo',
    kind: 'tool',
    source: 'https://github.com/workbench-soft/vscode-open-in-github',
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
    id: 'alina-photo',
    kind: 'client',
    repo: 'alina-photo',
    hue: 40,
    code: 'ALN',
    name: 'Alina Photography',
    tagline: 'Portfolio and booking site for a family photographer in Sydney.',
    lede: 'A site for Alina, a family and maternity photographer. Clients browse her galleries, book an on-location session at a free time and get their photos through a private link.',
    platforms: ['Web'],
    stack: ['Astro', 'Rust', 'Cloudflare Workers', 'D1', 'R2'],
    links: [],
    groups: [
      {
        features: [
          { name: 'Portfolio', text: 'Galleries by session type, with a full screen viewer and swipe.' },
          { name: 'Booking', text: 'Pick a session, a day and a free time. Golden hour times carry a sun.' },
          { name: 'Questions', text: 'A short form for people not ready to book, answered by email.' },
          {
            name: 'Admin',
            text: 'Sign in by email link, upload and edit photos, confirm bookings, set hours and packages.',
          },
          {
            name: 'Calendar sync',
            text: 'Busy times in Google Calendar block booking times, and a feed shows every booking.',
          },
          {
            name: 'Fonts',
            text: 'Alina picks the heading, text and label fonts from 10 free fonts, or uploads her own.',
          },
          {
            name: 'Client galleries',
            text: 'A private link with small watermarked previews of the whole session. The client picks photos to keep and to retouch, sees the amount to pay, and downloads the bought files once Alina ticks Paid. Alina retouches a pick with Auto and sliders.',
          },
          {
            name: 'Reviews',
            text: 'Clients leave a review with stars, and only the ones Alina approves show on the site.',
          },
          {
            name: 'Search',
            text: 'Each page has a title, a description and a photo card for search and link previews. A local page covers the Sutherland Shire.',
          },
        ],
      },
    ],
  },
  {
    id: 'aspirationstyle',
    kind: 'client',
    repo: 'aspirationstyle',
    hue: 15,
    code: 'ASP',
    name: 'Aspiration Style',
    tagline: 'Portfolio and order site for an interior designer.',
    lede: 'The site of Maria Shilova, an interior designer. Visitors browse her interiors and order a design, and Maria runs the galleries and draws interiors with AI in her own admin.',
    platforms: ['Web'],
    stack: ['Astro', 'Rust', 'Cloudflare Workers', 'Workers AI'],
    links: [{ href: 'https://aspirationstyle.ru', label: 'aspirationstyle.ru' }],
    groups: [
      {
        features: [
          {
            name: 'Portfolio',
            text: 'Galleries of interiors, objects, materials and decor, with a filter and a full screen viewer.',
          },
          {
            name: 'Order a design',
            text: 'A form on the home page, each gallery and Contacts sends the request to Maria by email.',
          },
          { name: 'Admin', text: 'Maria signs in with a code from an email and adds galleries, photos and texts.' },
          {
            name: 'Fonts',
            text: 'She picks the heading and text fonts from 10 free fonts with Cyrillic, or uploads her own.',
          },
          {
            name: 'AI generator',
            text: 'Draws an interior from a request in Russian, a style and a photo of the room.',
          },
          {
            name: 'Search',
            text: 'Yandex and Google read a title, a description, a share photo and structured data on each page. The sitemap lists the pages.',
          },
        ],
      },
    ],
  },
  {
    id: 'medpoisk',
    kind: 'client',
    repo: 'medpoisk',
    hue: 165,
    code: 'MED',
    name: 'МедПоиск',
    tagline: 'Prices of medical supplies across Moscow pharmacies and marketplaces.',
    lede: 'An Android app for a buyer at a licensed medical organisation in Moscow. One search checks pharmacies and marketplaces from the phone itself, with no server, and keeps the pharmacies in the okrugs the buyer picks.',
    platforms: ['Android'],
    stack: ['Expo', 'React Native', 'TypeScript', 'WebView', 'SQLite'],
    links: [],
    groups: [
      {
        features: [
          {
            name: 'Price search',
            text: 'One search asks АптекаМос, Мегаптека, ДеалМед, IMSSTORE, Wildberries and Ozon at once, with a status row per source. Prices land in one list, cheapest first, and a tap opens the offer in the app.',
          },
          {
            name: 'Moscow okrugs',
            text: 'Chips for the 12 okrugs and Подмосковье keep the pharmacies in the ones picked. A metro station gives each pharmacy its okrug, and marketplaces stay with a delivery tag.',
          },
          {
            name: 'Map and the place to buy',
            text: 'Type a district or a station, such as Жулебино, or tap Near me. Each pharmacy shows how far it is, Nearest sorts by it, and a map shows the lowest price at each station with the wholesalers’ warehouses.',
          },
          {
            name: 'Wholesale prices',
            text: 'ДеалМед, IMSSTORE and Крона’s daily drug price list join the search with an "опт" tag and their stock. A quantity gives the total of each offer.',
          },
          {
            name: 'Site checks',
            text: 'A site that asks for a robot check shows its page in a sheet. Once the buyer passes it, the search runs again out of sight.',
          },
          {
            name: 'Shopping list',
            text: 'A star saves the item. Check all searches each saved item in turn, with its progress on screen, and keeps the cheapest price in the chosen okrugs.',
          },
          {
            name: 'Distributors',
            text: 'The wholesale portals of Протек, Катрен, Пульс and Фармкомплект open in the app and keep the buyer signed in.',
          },
          {
            name: 'Languages and updates',
            text: 'The app follows the phone language, with 9 to pick in Settings. At each start it looks for a newer APK and offers to install it.',
          },
        ],
      },
    ],
  },
  {
    id: 'app-updater',
    kind: 'internal',
    repo: 'app-updater',
    hue: 290,
    code: 'UPD',
    name: 'WBS Updater',
    tagline: 'Updates every Workbench Soft app on the phone in one tap.',
    lede: 'An Android app that lists each Workbench Soft app with its installed and newest version, then installs each new release through Shizuku with no prompts.',
    platforms: ['Android'],
    stack: ['Kotlin', 'Shizuku', 'GitHub Releases'],
    links: [],
    groups: [
      {
        features: [
          {
            name: 'Update all',
            text: 'One tap updates each installed Workbench Soft app in silence through Shizuku, with a bar per app. Cancel stops it.',
          },
          {
            name: 'Self update',
            text: 'WBS Updater ships its own releases, installs itself last in a run, and the phone reopens it on the new version.',
          },
          {
            name: 'Update one app',
            text: 'An Update button on each card brings only that app to its newest release. A failed card keeps its button for a retry.',
          },
          { name: 'Install a missing app', text: 'A released app that isn’t on the phone yet installs from its card.' },
          {
            name: 'App list',
            text: 'One card per released APK, matched to the installed apps, updates first. A studio project with no APK gets an Open link.',
          },
          { name: 'Saved list offline', text: 'The last release list shows when GitHub is out of reach.' },
          { name: 'Shizuku setup', text: 'Opens Google Play or Shizuku for each missing step, then runs the update.' },
          { name: 'Release notes', text: 'Each card shows the release notes, or the commits since the last release.' },
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
            text: 'Merges a Dependabot PR as soon as it opens, and the checks run on main. A major update waits for a person.',
          },
          { name: 'Releases', text: 'Each push to main that passes the checks gets a dated release with notes.' },
          {
            name: 'iOS check and simulator build',
            text: 'Lists each Android only piece of an app with no iOS plan, and builds the app for the iPhone simulator with screenshots of its test flows.',
          },
          {
            name: 'Affected step',
            text: 'The checks and the release of a product run only when its files or packages changed. A docs push ships no release.',
          },
        ],
      },
    ],
  },
  {
    id: 'disk-reorg',
    kind: 'internal',
    repo: 'disk-reorg',
    hue: 40,
    code: 'DR',
    name: 'disk-reorg',
    tagline: 'Sorts, dedupes and archives folders by rules.',
    lede: 'disk-reorg moves files to a quarantine folder and leaves each delete to the owner. The folders, rules and keep patterns stay in a local config, out of git.',
    platforms: ['Windows'],
    stack: ['TypeScript', 'Node', 'mise'],
    links: [],
    groups: [
      {
        features: [
          { name: 'Folder report', text: 'A Markdown report of counts, sizes, years, file types and likely copies.' },
          {
            name: 'Duplicates to quarantine',
            text: 'Keeps the best placed copy of each file and moves the rest to quarantine.',
          },
          {
            name: 'Files safe to drop',
            text: 'Installers, torrents and old tickets go to quarantine by rule. Keep patterns protect important names.',
          },
          {
            name: 'Sort into topic folders',
            text: 'Files go into topic folders by rules, and the rest into a fallback folder.',
          },
          { name: 'Monthly inbox', text: 'Downloads entries older than 30 days move into a folder per month.' },
          {
            name: 'Plans, moves and undo',
            text: 'A dry run writes a plan to edit, each move goes in a log, and undo puts the moves back.',
          },
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
    lede: 'A Windows app for the taskbar. Pick a repo, press Find, and Claude Code drafts a comment for each thread the repo can answer. Open a card and Chrome gets the draft, or press Post it for me and the app posts it.',
    platforms: ['Windows'],
    stack: ['Tauri', 'Rust', 'React', 'Claude Code'],
    links: [],
    groups: [
      {
        features: [
          { name: 'Repo picker', text: 'A dropdown lists each git folder under the root.' },
          { name: 'Subreddits', text: 'Claude reads the repo and fills in the subs that fit it.' },
          { name: 'Find threads', text: 'Claude Code finds threads the repo can answer and drafts a comment.' },
          { name: 'Steps on top', text: 'Three steps on top say who does what, and the waiting one lights up.' },
          { name: 'Cards', text: 'Each card shows the sub, the thread title and the draft to edit.' },
          {
            name: 'Open in Chrome',
            text: 'Chrome opens the thread with the comment on the clipboard, ready to paste.',
          },
          { name: 'Post it for me', text: 'The app types the comment in its own Chrome window and presses Save.' },
          { name: 'Posts tab', text: 'Drafts posts that promote the picked repos in fitting subs.' },
          { name: 'Screenshots and videos', text: "Each post lists media from the repo's screenshots folder." },
          { name: 'Open a post', text: "Chrome opens the sub's submit page with the post filled in." },
          { name: 'Ban risk', text: 'A line rates the next post, and each card rates its sub.' },
          { name: 'Tester post', text: 'A post that asks for testers of an Android app, from a list of apps.' },
          { name: 'Inside Archon', text: 'The Reddit tab of Archon shows this window in a frame.' },
          { name: 'Info button', text: 'The i button explains the Reddit setup.' },
          {
            name: 'Updates',
            text: 'The app updates itself from GitHub. At start and once a day it offers Update or Later, and installs only signed builds.',
          },
          { name: 'Language', text: "Settings has a language dropdown: the system's or one of 9." },
          { name: 'Done list', text: 'Each posted and skipped thread with its date.' },
          {
            name: 'Activity',
            text: 'A panel at the bottom logs each press, each step and each line Claude prints, with the time and the result.',
          },
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
          {
            name: 'Audio workbench',
            text: 'Clean or enhance selected songs in a desktop window, with 9 languages and checks against output name collisions.',
          },
          {
            name: 'Tile pipeline',
            text: 'Ten tiles take a theme to a YouTube video: topics, stories, lyrics, Suno songs, cleanup, video and upload. Each runs alone with its settings.',
          },
          { name: 'Per-song videos', text: 'Make a looping video for each song, with an optional combined video.' },
          { name: 'Install and check the setup', text: 'One script installs the tools, and a doctor checks them.' },
          {
            name: 'Long video from a playlist',
            text: 'The songs of a theme folder join with a crossfade over a looping clip.',
          },
          {
            name: 'Cleanup of AI artifacts',
            text: 'The build takes hiss, metallic shimmer and rumble out of the songs and keeps the originals.',
          },
          {
            name: 'Enhance a song',
            text: 'One command cleans any song, puts back the band a lossy encoder cut off, and shows both spectrograms.',
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
          {
            name: 'ComfyStack video and robot pictures',
            text: 'The clips tile animates the cover with LTX 2.3 in a local ComfyUI, lip syncs it to each song, closes the loop with Wan 2.2 and upscales it to 1080p with SeedVR2. With no cover, a robot draws one on Gemini, Google Flow, Krea or SeaArt.',
          },
        ],
      },
    ],
  },
  {
    id: 'archon',
    repo: 'workspace',
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
        title: 'Services',
        features: [
          { name: 'CI, Reddit and Memories', text: 'The pages of the CI, Reddit Desk and the NAS indexer in tabs.' },
          {
            name: 'Songs',
            text: 'The songfactory pipeline as tiles: turn each on or off, set it up, run it alone, or make a whole video from a theme.',
          },
        ],
      },
      {
        title: 'Settings',
        features: [
          { name: 'Voices', text: 'Picks the voice each agent speaks with.' },
          { name: 'Keys', text: 'The age of each CI secret, and a renewal through an agent.' },
        ],
      },
      {
        title: 'The PC',
        features: [
          { name: 'Archon on the phone', text: 'Archon on the tailnet, opened from the phone as an app.' },
          {
            name: 'Restore a PC',
            text: 'One script brings back the clones, the rules, the hooks and the tools on a new PC.',
          },
          {
            name: 'Move the workspace',
            text: 'Moves every clone to a new folder and fixes each place that names the old one.',
          },
          { name: 'Sync the repos', text: 'Clones the missing repos and pulls the rest, 8 at a time.' },
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
            text: 'Checks each repo for Checks and Release, and adds the missing ones. A release builds beside Checks and publishes once they pass.',
          },
          { name: 'Rotate secrets', text: 'Renews the CI secrets and keys, app by app.' },
          { name: 'Workflow rules', text: 'A spec first, a merge right away, a batch test later.' },
          {
            name: 'MCP gateway',
            text: 'One gateway server stands in for the Google Play, GitHub, AdMob, AdSense and Reddit servers, so a session lists 7 tools in place of 238.',
          },
          { name: 'Releases', text: 'A dated release for each green push to main.' },
          { name: 'Feature queue', text: 'Sessions on one app take turns on shared files, and one release follows.' },
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
