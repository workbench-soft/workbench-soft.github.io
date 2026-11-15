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
  design: {
    scale: [
      'One person saves one open page at a time, and two tabs can save at once.',
      'The files sit in memory until the zip is written, so a site of several hundred megabytes may fail.',
    ],
    data: [
      'A save is a zip named after the host and the time, with index.html, one folder per host, _sources and _frames.',
      'The state of each save sits in chrome.storage.session: the counts, the failed files and the stage.',
      'After the zip lands in Downloads, the extension keeps no data, no history and no settings.',
    ],
    interfaces: [
      'The popup, the service worker and the offscreen page talk through chrome.runtime messages and the session storage state.',
      'A page script injected with chrome.scripting returns the HTML and the URLs from performance entries, src and link href.',
      'The zip leaves as a blob URL that chrome.downloads saves under Downloads.',
    ],
    reliability: [
      'A file the server refuses counts as failed and stays out of the zip, with no second try. A fetch stops after 2 minutes.',
      'The popup can close mid-save and redraw from session storage when it opens again, so the save goes on.',
      'One shared promise creates the offscreen page, so a second tab reuses the one Chrome allows.',
    ],
    security: [
      'The extension asks for activeTab, scripting, downloads, storage, offscreen and all URLs, since it fetches from any site the page loads from.',
      'It has no server of its own. The only requests go to the sites the page already uses.',
      "A file behind a login the extension can't send counts as failed. Chrome pages and the Chrome Web Store refuse extensions.",
    ],
    performance: [
      "Discovery fetches the scripts and stylesheets of each round side by side and keeps their bytes, so pack doesn't fetch them again.",
      'Progress counts merge and go out at most every 100 ms, and a new state goes out at once.',
      'Images, fonts, video and other compressed formats are stored in the zip as they are, with no second compression.',
    ],
    operations: [
      'Vite bundles the service worker, the popup and the offscreen page. fflate also zips the extension for each release.',
      'Each push to main builds the zip beside Checks. A gate script publishes it once Checks pass and cancels it when they fail.',
      'Releases get a date tag such as v2026.11.02.1, and the manifest carries the same version. Chrome loads it unpacked.',
    ],
    tradeoffs: [
      'An offscreen page over a data URL from the worker, since only a page can make a blob URL and a data URL is a third bigger.',
      "zipSync over the async zip, since the extension policy blocks the blob workers of fflate's async zip, at the cost of a pause on big zips.",
      'Find the files first, then fetch, so the total stays fixed while the bar fills, at the cost of a wait before the first file on big pages.',
      'chrome.i18n over i18next, since the manifest name can only come from _locales and a second catalog adds no value.',
    ],
  },
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
