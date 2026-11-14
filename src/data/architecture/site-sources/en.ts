import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'A Manifest V3 Chrome extension with no server. The popup starts a save, the service worker runs it, and a hidden offscreen page fetches the files and builds the zip.',
  parts: [
    { name: 'Popup', role: 'shows the host, the Download button and the bar, and redraws from the stored state.' },
    {
      name: 'Service worker',
      role: 'runs one save per tab, injects the page script and hands the zip to Chrome downloads.',
    },
    { name: 'Page script', role: 'runs in each frame and returns the HTML and each URL the page loaded.' },
    { name: 'Offscreen document', role: 'finds, fetches and zips the files, since only a page can make a blob URL.' },
    { name: 'fflate', role: 'packs the zip and stores images and fonts as they are.' },
    { name: 'chrome.storage.session', role: 'holds the state of each save, so a reopened popup sees it.' },
    { name: 'chrome.i18n', role: 'serves the popup text and the extension name in 9 languages.' },
    { name: 'Vite', role: 'bundles the service worker, the popup and the offscreen page.' },
  ],
  flow: [
    'The person presses Download in the popup.',
    'The service worker injects a script into each frame of the tab.',
    'The script returns the HTML and the URLs the page loaded.',
    'The offscreen page finds more files through source maps and stylesheets, then fetches them.',
    'Counts reach the popup through session storage every 100 ms.',
    'Chrome downloads saves the zip under Downloads.',
  ],
  links: [],
  features: {
    'Download from the popup':
      'The popup hands the tab to the service worker, which runs the save on its own. The state sits in session storage, so the save goes on after the popup closes.',
    'Progress bar':
      'The offscreen page finds the files first, so the total stays fixed. It sends the done and failed counts every 100 ms, and the popup redraws from them.',
    'One zip':
      'fflate packs the live HTML and each file under a folder per host, with the server paths. Chrome downloads saves it with the host and the time in its name.',
    'Original sources':
      'The offscreen page reads the source map of each script and stylesheet. Each original file inside a map goes to its own folder in the zip.',
    Languages:
      'chrome.i18n picks the catalog from the Chrome language. 9 catalogs hold the popup text, the name and the description.',
  },
};

export default arch;
