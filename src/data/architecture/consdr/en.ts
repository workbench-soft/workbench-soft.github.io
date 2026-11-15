import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'A static React site built by Vite runs the whole calculator in the browser, and Cloudflare serves it. A Java WebView app on Android shows the live site, and a Capacitor app on the iPhone carries the site inside.',
  parts: [
    { name: 'React and Vite', role: 'the calculator page, prerendered at build time with the default numbers.' },
    {
      name: 'Rules and costs modules',
      role: 'plain TypeScript with the tax rules, their sources and the sums for each option.',
    },
    { name: 'localStorage', role: 'the edited fields, the theme and the language, on that browser only.' },
    { name: 'Service worker', role: 'a cache of the pages and files, so later visits work offline.' },
    { name: 'i18next', role: 'the 9 catalogs, each loaded when the person picks it.' },
    { name: 'Cloudflare', role: 'serves the built files, the redirects and Web Analytics.' },
    {
      name: 'Android WebView app',
      role: 'Java around the live site, with an AdMob banner and a Google Play purchase.',
    },
    { name: 'Capacitor', role: 'the iPhone app with the site files inside, and Swift for ads, StoreKit and sharing.' },
  ],
  flow: [
    'Cloudflare sends the prerendered page with the default numbers.',
    'The page reads the saved fields from localStorage.',
    'Each edit reruns the comparison in the browser and saves the fields.',
    'The page shows the 3 totals, their parts and the working.',
    'The service worker caches the files for the next visit offline.',
  ],
  links: [
    { to: 'Cloudflare', text: 'Hosts the site and runs its redirects and Web Analytics.' },
    { to: 'Google AdSense', text: 'Auto ads on the website. The apps load no AdSense.' },
    { to: 'Google Play', text: 'The AdMob banner and the Remove ads purchase in the Android app.' },
    { to: 'App Store', text: 'StoreKit sells Remove ads in the iPhone app once it is on the App Store.' },
  ],
  design: {
    scale: [
      'One person per browser, with 23 inputs on one calculator page. The comparison reruns in the browser on each edit.',
      "The site is static files on Cloudflare, so no server of the studio's own carries the load.",
      'Tax tiers, FBT and stamp duty are fixed numbers in code, so keeping them current is the limit, not load.',
    ],
    data: [
      'No database and no account. Edits sit in localStorage as JSON under 3 keys: inputs (with a version field), theme and language.',
      'Only edited fields are saved, so an untouched start date reads as today and a default follows the car type and the rules.',
      'Tax tiers, FBT constants and stamp duty per state sit in src/rules as constants, each with a link to its source.',
    ],
    interfaces: [
      'compareOptions takes one CalcInputs object and returns a Comparison: cost, account run and cost parts per option.',
      'The page talks to the Android app over window.ConsdrApp, with the messages state, buy, privacy and devAds and JSON replies.',
      'The iPhone app answers the same bridge from Swift, and Capacitor serves the built site from inside the app.',
      'The build writes sitemap.xml, llms.txt, ads.txt and the JSON-LD of the common questions.',
    ],
    reliability: [
      'Pages go to the network first and fall back to the cached copy after 3 seconds or on a server error.',
      'With site data blocked, reads give null and writes are skipped, so the page still works for that visit.',
      'A saved value of the wrong type or an unknown select value is dropped on load. A save in one tab reloads the other tabs.',
    ],
    security: [
      'No sign in, and the numbers go to no server, so the inputs stay in the browser.',
      'Response headers set frame-ancestors none, object-src none, nosniff and HSTS, and switch off camera, microphone and location.',
      'The Android signing key is a CI secret decoded on the runner, and the repo holds no key.',
      "The Android app asks for ad consent through Google's consent SDK.",
    ],
    performance: [
      'English ships in the main script, and each of the 8 other catalogs loads as its own chunk when picked.',
      'The build prerenders the calculator with the defaults and preloads the Latin fonts, so content shows early and numbers hold still.',
      'Files in /assets/ carry a content hash, get a one year immutable cache header and are served cache first by the worker.',
    ],
    operations: [
      'One job lints, tests and builds, then wrangler deploy publishes dist/ to Cloudflare on each push to main.',
      "CI runs on the studio's own Windows PC runner, so the private repo uses no Actions minutes.",
      'A nightly run at 19:00 Sydney time builds the signed Android bundle for Google Play, only when android/ changed.',
      'The service worker cache name hashes the file list, the page text and the worker code, so each deploy replaces the old cache.',
    ],
    tradeoffs: [
      'Calculation in the browser over a server API, so no data leaves the device and hosting is static files.',
      'A WebView around the live site on Android over native screens, so one codebase serves web and app, and a site deploy reaches the app at once.',
      'Network first pages over cache first, so a deploy shows at once, at the cost of up to 3 seconds on a slow link.',
      'Fixed rules in code with sources over a rates API, so each number is reviewable, but a tax year change needs a release.',
    ],
  },
  features: {
    'Compare a lease, a loan and cash':
      'A plain TypeScript function takes the fields and returns one total per option. It runs in the browser on each edit, and no server sees the numbers.',
    'Where the money goes':
      'The comparison returns the parts of each total beside the total itself. A notes module writes the line and the formula next to each number.',
    'Lease and loan settings':
      'The form module turns the typed text into numbers and saves each edit in localStorage. A half typed value stays on screen.',
    'FBT by car type and start date':
      'A rules module picks the FBT rate and the EV exemption from the car type, the start date and the price. Each constant names its source.',
    'Stamp duty by state':
      'A table per state in the rules module works out the duty from the price, the car type and the start date.',
    'Account interest':
      'The comparison runs the account month by month at its rate, for each option and for no car. The gap gives the missed interest.',
    'Borrowing for another home':
      'The comparison works out how much less a bank would lend while the car is paid off. It uses the APRA buffer of 3 points over 30 years.',
    'Working and sources':
      'A notes module writes each step and formula beside the numbers. A sources file links each fixed number to its page.',
    'Common questions':
      'A module builds the answers in the current language from the same rules. The English set also goes into the page as JSON-LD for search.',
    'Guides and pages':
      'A Vite plugin renders each guide into static HTML at build time, with numbers from the same rules. It writes the sitemap too.',
    'Saved inputs and reset':
      'The edited fields go to localStorage as JSON. Reset drops them, and the defaults come back.',
    'Offline use':
      'A service worker written at build time caches the pages and files. Pages try the network first and fall back to the cache after 3 seconds.',
    'Colour theme':
      'A small script in the page head sets the saved theme before the first paint. The pick sits in localStorage.',
    'Remove ads in the Android app':
      'The page asks the Java app over a bridge, and Google Play Billing sells the product. The app sends back the ad free state.',
    'Which lease term costs least':
      'A function runs the comparison once per term from 1 to 5 years. It carries the account on to year 5, so each term covers the same years.',
    'If you leave your job':
      'A module works out the payout on the leave date and the cost of each way out against staying. It reuses the lease figures of the comparison.',
    Language:
      'i18next with react-i18next loads each catalog as its own file when picked. Money stays in Australian dollars.',
    Ads: 'AdSense runs auto ads on the website. The apps mark the page, so AdSense stays off there and AdMob shows the native banner.',
    "No ads on the developer's phone":
      'The Android app keeps a developer key that the PC sends to the phone once. With it, each build hides the banner.',
    'iPhone app':
      'Capacitor serves the built site from inside the app, so it opens offline. Swift code answers the same page bridge as the Android app.',
    'Remove ads on the iPhone':
      'StoreKit 2 sells the same product id as Google Play. Restore purchase asks the App Store for past purchases.',
    'Share the result':
      'The page builds the verdict line with the link. The iPhone app opens the iOS share sheet, and a phone browser uses Web Share.',
  },
};

export default arch;
