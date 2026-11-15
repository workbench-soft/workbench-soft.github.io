import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'A Tauri 2 desktop app for Windows and macOS. A Rust backend scans, reads dates, plans and moves the files, and a React webview shows the events it streams.',
  parts: [
    { name: 'Tauri 2', role: 'the desktop shell, with the system webview and a small installer.' },
    { name: 'Rust backend', role: 'makes each file decision, from the scan to the moves and the history.' },
    { name: 'React and Vite', role: 'the file table, the toolbar and the settings, drawn from backend events.' },
    { name: 'ExifTool', role: 'a bundled sidecar that reads the date, the camera and the GPS of each file.' },
    { name: 'folder-rules crate', role: 'the year, place and day folder rules shared with Memories.' },
    { name: 'GeoNames and OpenStreetMap', role: 'place names and park outlines in the installer for offline lookups.' },
    { name: 'tauri-plugin-updater', role: 'checks the GitHub release for a new version and installs it on restart.' },
  ],
  flow: [
    'The person picks a folder, and the Rust walk streams its files.',
    'ExifTool workers read the date and GPS of each batch.',
    'The offline geocoder names a place for each GPS point.',
    'The folder rules plan a new folder and name per file.',
    'The person confirms, and the backend moves each file and logs the step.',
  ],
  links: [
    { to: 'memories', text: 'The phone app and this sorter share the folder rules crate and the photo editor.' },
    { to: 'GitHub Releases', text: 'The installer and the update file sit on a release of the public site repo.' },
  ],
  design: {
    scale: [
      'One person on one PC. The design size is a folder of 100,000 files, so Rust keeps the records and the webview gets only ids.',
      'The place data ships in the installer as a GeoNames extract and park outlines. Rebuilding it downloads about 640 MB.',
    ],
    data: [
      'Settings sit in one JSON file in the app data folder. History sits in a JSONL file per run, plus an index.json.',
      'The records, dates and plans of a scan stay in the backend scan session, so commands take file ids and plans.',
      'Place data is geodata.tsv.gz (cities of 1,000 people or more and points of interest) and parks.tsv.gz. Both load into a 1 degree grid.',
    ],
    interfaces: [
      'The webview sends Tauri commands such as start_scan and start_moves. The backend answers with events: scan:files, metadata:results, plan:files and move:file.',
      'ts-rs writes the TypeScript payload types from the Rust models, so both sides of a command match.',
      'ExifTool gets one line per request with json output, the tag list and absolute paths. The updater reads latest.json from a release.',
    ],
    reliability: [
      'A move uses a no replace rename. A copy across volumes is checked by size and bytes before the source goes.',
      'A crash leaves the file at the source, at the destination or under both names of one hard link, and no file is lost.',
      'A run writes one log line as each step ends, and a log that fails to write stops the run. A late event of a replaced scan is dropped by scan_id.',
    ],
    security: [
      'The webview holds only core:default permissions, with no fs or shell plugin. Rust makes every file change.',
      'A move starts only from a folder picked in the native picker this session. A destination must sit inside the chosen root, checked again before each move.',
      "No GPS point leaves the PC, since places resolve offline. ExifTool paths are checked so a file name can't inject a command.",
    ],
    performance: [
      'The scan walk runs off the UI thread and streams files in batches. The table buffers them, so a big folder costs a few redraws a second.',
      'ExifTool workers stay open and run at low priority, which skips a process start per file.',
      'A place lookup scans only the nearby cells of the grid, and park outlines are tested through boxes of 64 edges.',
    ],
    operations: [
      'The backend sits in its own crate beside the app crate, so a release compiles a tiny crate in place of 18k lines.',
      'CI runs on a Windows PC, so releases hold a Windows installer and no macOS build. A Mac builds it with pnpm tauri build.',
      'The updater reads latest.json at start, on return to the window and on request. It downloads after Update and installs on Restart now.',
    ],
    tradeoffs: [
      'Tauri 2 over Electron: a smaller installer on the system webview and Rust owning the file logic, at the cost of WebView2 and WebKit differing.',
      'Planning in Rust over the webview, the first version, which slowed down on big folders.',
      'Only disk/safe_fs changes files, enforced by clippy.toml, over std::fs calls in each module that could overwrite a file.',
      'GeoNames inside the installer over an online geocoder, so no GPS point leaves the PC and no rate limit applies.',
    ],
  },
  features: {
    Scan: 'A Rust walk runs off the UI thread and streams the files in batches. The table buffers them, so a big folder costs a few redraws a second.',
    'Capture dates':
      'A pool of ExifTool workers stays open and reads each batch as the scan finds it. The workers run at low priority on half the cores.',
    'Places offline':
      'A GeoNames extract and park outlines load once into a 1 degree grid. A lookup reads only the nearby cells, and no GPS point leaves the PC.',
    'Plan first':
      'The shared folder rules crate gives each file its folder and name as a dry run. The table shows each plan before the person confirms.',
    Moves:
      'One Rust module makes each file change, with a no replace rename or a verified copy. Pause stops after the file moving now.',
    'History, undo and redo':
      'Each run writes a JSONL log in the app data folder, a line per file. Undo and redo replay the log with the same safety checks.',
    Settings:
      'The backend saves the destination, the modes and the home place to a JSON file. The language pick stays in the webview storage.',
    'File table':
      'React draws a row per file from the backend events. A double click on a place opens Leaflet over OpenStreetMap tiles.',
    'Self-update':
      'tauri-plugin-updater reads the latest release file at start and on return to the front. It downloads after Update and installs on Restart now.',
    'One command install':
      'A PowerShell script reads the newest version from the release file. It downloads the installer and runs it in silent mode for the current user.',
  },
};

export default arch;
