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
