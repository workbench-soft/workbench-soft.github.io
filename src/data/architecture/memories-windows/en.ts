import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'A .NET synchronizer in Docker on the NAS read the capture date of each photo into a LiteDB index. A WPF tray app on Windows looked up that index by date and opened the files from the NAS.',
  parts: [
    { name: '.NET', role: 'one platform for the NAS service and the Windows app.' },
    { name: 'Docker', role: 'ran the synchronizer on the NAS beside the photo archive.' },
    { name: 'LiteDB', role: 'the index of capture dates, read by the gallery day by day.' },
    { name: 'WPF', role: 'the tray icon, the gallery and the photo window on Windows.' },
    { name: 'Quartz', role: 'the scheduler that fires the daily reminder job.' },
  ],
  flow: [
    'The synchronizer on the NAS read the EXIF of each photo.',
    'It wrote the capture date into the LiteDB index.',
    'Once a day a Windows notification called the person to the gallery.',
    'The gallery looked up the photos of the period in the index.',
    'It opened the files straight from the photo archive.',
  ],
  links: [{ to: 'memories', text: 'The phone app replaced it and took over the on this day idea.' }],
  design: {
    scale: [
      'One person and one Windows PC, reading the photo archive of a home NAS.',
      'The index holds capture dates only, so it stays small next to the photos.',
    ],
    data: [
      'LiteDB, an embedded document database, holds the index of capture dates.',
      'The synchronizer reads the EXIF of each photo, and the gallery opens the index for each day of the period.',
    ],
    interfaces: [
      'The synchronizer on the NAS and the Windows app meet in the LiteDB index, read by date.',
      'The app opens the photo files straight from the NAS archive, with no server API between.',
    ],
    reliability: [
      "The synchronizer ran in Docker beside the archive, so indexing didn't need the PC.",
      'The gallery skips files in the recycle bin and loads the rest as you scroll.',
    ],
    security: [
      'No account and no cloud service: photos and index stayed on the home NAS and the PC.',
      'The app opens the archive with the file access the PC already had.',
    ],
    performance: [
      'Capture dates are read once on the NAS, so the gallery needs no scan of the photos.',
      'The gallery loads photos as you scroll, a day of the period at a time.',
    ],
    operations: [
      'The synchronizer shipped as a Docker container on the NAS, and the app as a Windows program.',
      'The repo is archived, since the phone app replaced it.',
    ],
    tradeoffs: [
      '.NET for both parts over two stacks, so one platform covered the NAS service and the Windows app.',
      'An index built on the NAS over a scan from the PC, so dates were ready when the gallery opened.',
      'Replaced by the phone app, which reads the NAS over WebDAV and needs no Windows PC.',
    ],
  },
  features: {
    Tray: 'A WPF window lives in the system tray. A click or the tray menu opens the gallery.',
    'Daily reminder': 'A Quartz job shows a Windows notification with a button. The button opens the gallery.',
    'Gallery by period':
      'The gallery opens the LiteDB index for each day of the period. It skips files in the recycle bin and loads the rest as you scroll.',
    'Photo window': 'A WPF window shows one photo large. A key steps to the next or the previous file of the period.',
    'Details and map': 'The app reads the camera details from the photo file and shows its place on a map.',
    Send: 'The picked files go to another app in one action.',
  },
};

export default arch;
