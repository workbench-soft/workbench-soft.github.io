import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'An Expo app for Android, the iPhone and the browser reads photos from a home NAS over WebDAV and keeps its own SQLite index. Optional containers on the NAS index the photos, group faces and serve album links.',
  parts: [
    { name: 'Expo and React Native', role: 'one code base for the Android app, the iPhone app and the browser build.' },
    { name: 'expo-sqlite', role: 'the index on the phone, with the date, place and device of each file.' },
    { name: 'WebDAV', role: 'the one link to the NAS for listings, header reads, uploads and moves.' },
    {
      name: 'folder-rules crate',
      role: 'the Rust rules for year, place and day folders, shared with the desktop sorter.',
    },
    { name: 'places.db', role: 'a GeoNames and OpenStreetMap extract in the app that names places with no network.' },
    { name: 'NAS containers in Node', role: 'the fast indexer, the album pages and the browser app on the NAS.' },
    { name: 'Face engine in Rust', role: 'runs YuNet and SFace through tract on the NAS and groups faces by person.' },
    { name: 'Konva photo editor', role: 'one editor in an Expo DOM component, shared with Shuttrix and the desktop.' },
  ],
  flow: [
    'A background task lists the NAS folders every few hours.',
    'It reads only the header of each new file for the date and GPS.',
    'The offline places database names the place, and SQLite stores the row.',
    'The task plans the reminders for the next 7 days.',
    'The screens query the index and stream the full photos from the NAS.',
  ],
  links: [
    { to: 'media-organizer', text: 'The desktop sorter links the same Rust folder rules and shows the same editor.' },
    { to: 'shuttrix', text: 'The camera shares the photo editor, the place lookup and the spot map.' },
    { to: 'keeppad', text: 'Keeppad adds notes to a person journal on the NAS through an Android provider.' },
    { to: 'memories-demo-webdav', text: 'The Google Play review signs in to this sample NAS.' },
    { to: 'Tailscale', text: 'A second address reaches the NAS away from home. Funnel serves the album links.' },
  ],
  design: {
    scale: [
      'One person per install with a home NAS, and up to about a million photos and videos.',
      'A first sync of half a million photos takes most of a day, since the NAS answers about 10 header reads a second.',
      'Album links reach a few people through Tailscale Funnel, so the NAS is the only server.',
    ],
    data: [
      'Photos stay on the NAS. The phone keeps a SQLite index with folders, media and a days table that triggers keep counted.',
      'A file row holds a folder id and a file name, so a million files fit in about 200 MB.',
      'Capture time is a wall clock in seconds, so On this day is a plain range query.',
      'The NAS keeps a .memories folder beside the photos with index.db, status.json, faces.db and the album files.',
    ],
    interfaces: [
      'The phone speaks WebDAV to the NAS: PROPFIND per folder, ranged GET for headers, PUT, MKCOL and MOVE.',
      'The NAS containers publish index.db and status.json in .memories, and the phone merges them over the same WebDAV link.',
      'The Rust folder rules reach the app as a uniffi library on Android and as wasm on the web.',
    ],
    reliability: [
      'Sync saves every 50 files in one transaction, and a pass cut short resumes in the next run.',
      'The background task has an 8 minute budget and plans the reminders first, so a failing NAS still gets reminders.',
      "An empty gallery root stops the pass, so an unmounted share doesn't wipe the index.",
    ],
    security: [
      'The NAS login sits in the Android keystore through expo-secure-store, and the app sends it as a Basic header.',
      'Album links hold a 16 byte random token. The album server mounts the gallery read-only and answers 404 to any other path.',
      'Place names come from an offline database in the app, so no GPS point leaves the phone.',
      'Plain http is allowed, since a NAS at home rarely has a certificate.',
    ],
    performance: [
      'FlashList draws the visible tiles and one screen ahead. Each tile shows the small EXIF thumbnail, read from the first 66 KB.',
      'Reads run 8 at a time in a queue, newest first, and a native module lifts OkHttp from 5 to 32 requests per host.',
      'The days and geo_cells tables keep the month list, trips and map off the million file rows.',
      'The NAS indexer reads a header from its own disk in milliseconds, where WebDAV takes seconds.',
    ],
    operations: [
      'One pnpm monorepo with node, pnpm, java and rust pinned in mise.toml and one lockfile.',
      'Each push to main whose Checks pass publishes a signed APK with a date version, and release-gate.sh cancels the build when checks fail.',
      'The installed app reads the latest release from the GitHub API. The Google Play build swaps the updater for stubs and builds once a day.',
      'The NAS containers deploy over ssh with a deploy script.',
    ],
    tradeoffs: [
      'Plain WebDAV over a server of our own, so any NAS works, at the cost of a slow first sync.',
      'SQLite on the phone over a server database, so the app works offline and needs no hosting.',
      "Capture time as a wall clock over UTC, so On this day is a simple range, but photos from two zones can't be put in exact order.",
      'One Rust folder rules crate over a copy per app, so phone and desktop sort the same, at 1 to 2 MB per ABI.',
    ],
  },
  features: {
    'Daily reminder':
      'expo-notifications holds one-off reminders for the next 7 days, planned from the index by the background task. A trip abroad on that day wins the year.',
    Today:
      'A query over a table of photo counts per day finds each year with photos on this date. Triggers keep that table counted, so it skips the file rows.',
    Trips:
      'The app cuts runs of days abroad out of the counts per day. The trip link opens the photos from the first day to the last.',
    Photos:
      'FlashList draws the tiles on screen and one screen ahead. Each tile shows the small EXIF thumbnail, cached on the phone.',
    'Filter by place':
      'The place search reads the countries and places from the counts per day. The picks become one more condition on each gallery query.',
    'Camera and drone shots':
      'The EXIF model or the file name decides phone, camera or drone during the sync. The index keeps that per file.',
    'Tile size': 'A pinch handler sets 1 to 6 tiles per line. One saved value drives each grid.',
    'Send many photos at once':
      'The app copies the picks into its cache, 3 at a time. A small native module hands them to the system share sheet in one go.',
    'Share an album by link':
      'The app writes an album file to the NAS over WebDAV. A Node server on the NAS shows it through Tailscale Funnel, with previews made by sharp.',
    'Memories in the browser':
      'A Node server on the NAS serves the web build and passes WebDAV on the same address. Tailscale Serve keeps it inside the tailnet.',
    Organize:
      'Each card runs one job: the camera sort, the upload or the free up. The Rust folder rules plan each folder and name before a file moves.',
    'Import from Google Photos':
      'The Google Photos Picker API shows only the items the person picks. The app downloads them into the camera folder, and the upload takes them on.',
    'Sort picked photos on the NAS':
      'The Rust folder rules plan a new folder and name per file. A WebDAV MOVE puts it there, and the phone index follows at once.',
    Viewer:
      'expo-image shows the full photo over the cached thumbnail. expo-video streams videos from the NAS with range requests.',
    'Connect to the NAS':
      'An mDNS search lists the devices on the Wi-Fi, and a probe finds the WebDAV port. The login stays in the secure store of the phone.',
    'Photos away from home':
      'A probe of the home address runs at start and on each network change. With no answer the app turns to the Tailscale address.',
    'Sync progress':
      'The banner reads the live sync state on the phone. The NAS part comes from a status file the indexer writes each minute.',
    'Mobile data':
      'One check guards each NAS job on mobile data. The saved answer lets the job run or makes it wait for Wi-Fi.',
    'Index from the NAS':
      'A Node container on the NAS reads the headers from its own disk and writes an index file beside the photos. The phone downloads it and merges the rows it lacks.',
    'Move the index to a new phone':
      'SQLite copies the NAS part of the index into one file for the share sheet. The new phone attaches that file and copies its rows in.',
    Language:
      'i18next holds the 9 catalogs, and expo-localization reads the phone language. A pick in Settings wins and plans the reminders again.',
    Theme:
      'One palette holds a light and a dark set of colours. The screens read it through a hook that follows the phone or the saved pick.',
    'Ads and remove ads':
      'Google Mobile Ads shows the AdMob banners and the full screen ad after consent. expo-iap sells the Remove ads purchase through Google Play.',
    'Memories Pro':
      'expo-iap sells the product through Google Play and the App Store. One module checks the purchase before each locked feature opens.',
    'Desktop sorter':
      'A Tauri app with a Rust backend sorts a folder on the computer. It links the same folder rules crate as the phone.',
    Archive:
      'The month list reads the photo counts per day, which triggers keep up to date. A tap queries the files of that month by capture time.',
    'Trip list and places map':
      'The trip list joins trips abroad with road trips found in the counts per day. Leaflet in a WebView draws the map from photo counts per small grid cell.',
    People:
      'A Rust engine on the NAS groups faces with YuNet and SFace. The phone downloads the result and writes names and merges back to the NAS.',
    'Indexing progress page':
      'The face engine and the indexer write status files on the NAS. A Node server turns them into a live page with server-sent events.',
    'Albums about a person':
      'The album file holds the person, the birth date and the notes. The album server on the NAS lays the photos out by year of age.',
    'Turn a photo':
      'The face engine tries each photo turned by 90, 180 and 270 degrees. The phone sets the EXIF orientation and swaps the file on the NAS after a check.',
    'Edit a photo':
      'Konva runs the editor inside an Expo DOM component. Save copy writes a JPEG to the phone and the NAS, and Save replaces the file after a byte check.',
    'Draw a new picture':
      'The same Konva editor opens on a blank sheet. Save writes the drawing to the phone and to the NAS by the upload rules.',
    'Photos on the phone':
      'A local Expo module in Kotlin lists the camera folder through a one time grant. Its files join the same index as the NAS files.',
    Settings:
      'Small values sit in the key value store of expo-sqlite and load at start. The NAS password sits in the secure store.',
    'Duplicates on the NAS':
      'An index query groups NAS files by capture time and size. A byte compare over WebDAV proves each pair before the copy goes to the NAS trash.',
    Updates:
      'A shared update package reads the latest GitHub release and opens the Android installer. The Google Play build swaps it for empty stubs.',
    'Light, blur and fonts':
      'Konva filters run the colour sliders, then a box blur blended around an ellipse or a strip. Each caption keeps its font family.',
    'On the iPhone':
      'Files for iOS swap the Android modules for Photos library, URLSession and App Store versions. The folder rules run as a Rust XCFramework through Swift.',
  },
};

export default arch;
