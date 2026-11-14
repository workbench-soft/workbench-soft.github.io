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
