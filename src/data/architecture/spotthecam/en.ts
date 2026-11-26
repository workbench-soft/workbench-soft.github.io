import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'A static Next.js site on Cloudflare shows the camera map, and Capacitor wraps the same files as the Android and iPhone apps. Native Kotlin and Swift code runs the drive features, and one small Worker stores shared trips.',
  parts: [
    {
      name: 'Camera data build',
      role: 'a TypeScript script in CI that merges the state and NZ camera lists into one JSON file each night.',
    },
    { name: 'OpenStreetMap', role: 'the point of each camera, the road limits and the timed school zone limits.' },
    { name: 'Next.js', role: 'a static export with the map, the site pages and a page per camera site.' },
    {
      name: 'Leaflet and MapLibre',
      role: 'Leaflet draws the cameras and trips, and MapLibre paints the OpenFreeMap tiles below them.',
    },
    { name: 'Cloudflare Worker and KV', role: 'serves the site and stores the trips people share.' },
    {
      name: 'Capacitor and Kotlin',
      role: 'the Android shell, with native services for speed, warnings, trips, routes and Hey Spot.',
    },
    { name: 'Photon, Valhalla and TomTom', role: 'place search, routes with turns and the traffic of the day.' },
    { name: 'Swift and StoreKit 2', role: 'the iPhone port of the drive and route code, and the App Store purchases.' },
  ],
  flow: [
    'Each night a CI job fetches the state and NZ camera lists.',
    'OpenStreetMap adds the point and the road limit of each camera.',
    'Next.js builds the site, and Cloudflare serves it with the camera file.',
    'The browser picks the limit for the current minute and draws the map.',
    'On the phone a native service reads the same file and warns of cameras ahead.',
    'Trips stay on the phone until the person shares one.',
  ],
  links: [
    {
      to: 'keeppad',
      text: 'Hey Spot runs the same wake word model as keepPad. One app holds the microphone for both phrases.',
    },
    { to: 'lumiere-player', text: 'Hey Lumi shares the microphone with Hey Spot through the same wake library.' },
    { to: 'Google Maps', text: 'Start opens Google Maps with the stops in the best order, and the app keeps warning.' },
    { to: 'Google Play', text: 'Play Billing sells Remove ads and SpotTheCam Pro. AdMob shows the banner in the app.' },
    { to: 'GitHub Releases', text: 'Each release puts the APK there, and the GitHub build updates itself from it.' },
  ],
  design: {
    scale: [
      'One driver per install. The camera file holds about 13,700 cameras, one per line.',
      'The site is static files, so only trip sharing needs a server. One small Worker stays in the Cloudflare free tier.',
      'A shared trip is capped at 1 MB and 100,000 points, and one address can share 10 trips a minute.',
    ],
    data: [
      'data/cameras.json holds one camera per line: type, state, point, road, suburb, source, limit and direction.',
      'Trips sit in the private storage of the app for 400 days. Road limits stay on the phone for 60 days.',
      'A shared trip lives in Cloudflare KV under a 10 character id, as thinned route lines and totals with no times.',
    ],
    interfaces: [
      'The Worker answers POST /api/trips, and GET and DELETE on /api/trips/<id>. Everything else is a static file.',
      'Capacitor plugins link the web page to the Kotlin drive services and their Swift ports.',
      'Overpass tiles give roads, railways and runways. Photon, Valhalla and TomTom answer place, route and traffic calls.',
    ],
    reliability: [
      'The service worker tries the network first and falls back after 4 seconds, with up to 500 map tiles kept for offline use.',
      'A store failure in the Worker goes out as 503 with CORS headers, so the app reads it as a failure and not as no signal.',
      'When a public routing server is down, the voice says so. Past the TomTom limit, routes skip traffic.',
    ],
    security: [
      "Sharing needs no sign in. KV keeps only a SHA-256 hash of the delete key, so reading the store doesn't let anyone delete trips.",
      'The Worker checks each body with a strict parser and sends nosniff and a default-src none policy.',
      'Trips stay on the phone until shared. A shared trip has no times, and speeds at cameras stay out unless the person opts in.',
    ],
    performance: [
      'Kotlin services match the GPS to cached roads on the phone and speak about 20 seconds before a camera, with no network.',
      'The nightly build turns timed limits into windows for the next 35 days, so the browser only picks the current one.',
      "KV caches a shared trip for a minute near the reader, and map tiles are stored without OpenFreeMap's weekly folder name.",
    ],
    operations: [
      'A CI job refreshes the cameras at 3 am Sydney time and commits the file, one camera per line to keep diffs small.',
      'Each push to main deploys the site to Cloudflare. A nightly job sends the Android bundle to Google Play when the app changed.',
      'The GitHub APK build updates itself from GitHub Releases. The Google Play build leaves that code out.',
    ],
    tradeoffs: [
      'A static Next.js site in a Capacitor shell over Expo, so the map and the site pages share one codebase, at the cost of a Worker for trips.',
      'One daily JSON file over a database behind an API, so it works offline and costs no server, at the cost of a list up to a day old.',
      'Native Kotlin drive services over JavaScript in the WebView, since Android pauses the WebView with the screen off.',
      'Leaflet with OpenFreeMap tiles over Google Maps or Mapbox, since it needs no key and has no quota.',
    ],
  },
  features: {
    'Camera map':
      "The nightly build turns each camera's timed limits into windows for the next 35 days. The browser picks the window for the current minute.",
    'Search and filter':
      'The page builds an index of suburbs from the camera file and searches it in the browser. No server takes part.',
    'Camera types':
      'Each camera carries its type from the source list. The browser keeps the pick, and the Android app warns only for the types on the map.',
    'Follow me':
      'The page turns the map to the GPS course while the person moves. MapLibre turns the street tiles with its own bearing, which keeps the labels upright.',
    'Camera details':
      'The popup reads the camera file that ships with the site. Each source in the type list carries the link to its official page.',
    'Offline map':
      'A service worker keeps the page, the camera file and up to 500 map tiles on the device. A web manifest lets the browser install it as an app.',
    'Light and dark theme':
      'The theme applies before the page paints. A vector tile style gives the dark map light roads in code.',
    Languages:
      'i18next holds 9 catalogs for the map and the app screens. Android notifications take their text from the Android string files.',
    'Site pages and ads':
      'Next.js writes a static page per state, suburb and camera site at build time. AdSense fills the banner on the website.',
    'Speed badge':
      "Kotlin code matches the GPS position to the OpenStreetMap roads and their limits. Android's activity reports and the rail and runway shapes tell a car from a train or a plane.",
    'Camera warnings':
      'A Kotlin service checks the cameras ahead on the course and speaks about 20 seconds out. The road shapes near each camera tell which side it stands on.',
    'Camera alerts stay ready':
      "Android's activity reports and a 300 m fence around the last parking spot start the drive service. A see-through screen starts it again after a reboot or an update.",
    'Over the limit':
      'The road limits come from OpenStreetMap through Overpass and stay on the phone for 60 days. A Kotlin check speaks after 5 seconds over the limit.',
    'School zones':
      'The timed limits in OpenStreetMap give the zone hours. A list of the published NSW school terms inside the app gives the school days.',
    'Loud warnings':
      'Each sound plays as an alarm on the built-in speaker, and the app raises the volume until the words end. The switches in Settings hand the output back.',
    'Streets in the recorded voice':
      'The PC speaks each named road of Australia and New Zealand with edge-tts and puts the clips in Cloudflare R2. The phone fetches the clips of the streets around it and keeps them in its cache.',
    "Author's voice":
      "An open voice model on a PC made the warning words from the owner's own voice. The clips ship inside the app, and Pro unlocks them.",
    'Trip log':
      'Kotlin services record each drive and walk with the speed at each camera. The trips stay in the private storage of the app for 400 days.',
    'Trip line by limit':
      'Each recorded point keeps the speed and the OpenStreetMap limit of the road. The map paints each part of the line from the two.',
    'Trip stats':
      'The app works out the stats on the phone from the points of the trip. A stretch under 20 km/h for 3 minutes or more counts as a jam.',
    'Share a trip':
      'The app sends a thinned route to a Cloudflare Worker, which keeps it in KV under its own id. Stop sharing deletes it there.',
    Distance: 'The digits read the trip totals the drive service stores on the phone. No server takes part.',
    'Turn by turn routes':
      'Valhalla times each pair of stops, and the app tries each order. TomTom picks the roads around the traffic, and a MapLibre navigation library tracks the car.',
    'Route options':
      'The ticks pass walking or no tolls to the route services. Favourites stay on the phone, and Hey Spot matches them by name.',
    'Hey Spot':
      "sherpa-onnx hears the wake words on the phone with no network. Android's speech service hears the rest, and Photon finds the places.",
    'Hey Spot, what street am I on?':
      "The app reads the name and the limit of the OpenStreetMap road under the car. The phone's text to speech says them.",
    'Screen stays on':
      'The Android window of the app asks the system to keep the screen on. It ends when the app goes to the background.',
    'Self-update':
      'The GitHub build asks GitHub Releases for a newer APK and hands it to the Android installer. The Google Play build leaves the update code out.',
    'SpotTheCam Pro':
      'One table on the page sets the free limits, and a counter on the phone keeps the uses with no server. The Kotlin code counts each drive that starts by itself, so the limit holds with the app closed. Google Play Billing sells Pro.',
    'Same app on the iPhone':
      'Capacitor wraps the same site for iOS. Swift ports of the Kotlin drive and route code do the native work, and StoreKit 2 sells Pro.',
  },
};

export default arch;
