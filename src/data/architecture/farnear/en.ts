import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Farnear is one React web app, wrapped in Kotlin for Android and in Capacitor for the iPhone. A Rust Worker on Cloudflare passes the sealed room messages, and the call goes straight between the devices.',
  parts: [
    { name: 'React and Vite', role: 'the screens, the room page and the home page prerendered in 9 languages.' },
    { name: 'WebRTC', role: 'sound, video and the board data channels, straight between up to 4 devices.' },
    {
      name: 'Rust Worker and Durable Object',
      role: 'one object per room passes the sealed messages and hands out relay settings.',
    },
    { name: 'TURN relays', role: 'carry the encrypted media when a direct path between 2 networks fails.' },
    {
      name: 'Board modules',
      role: 'plain TypeScript keeps the lines, the erased lines and the file transfer outside React.',
    },
    { name: 'Whisper and MediaPipe', role: 'speech to text and the video background, both on the device.' },
    { name: 'Kotlin wrapper', role: 'the Android app around the live site, with AdMob, Play Billing and the ring.' },
    { name: 'Capacitor and Swift', role: 'the iPhone app around the same site, with StoreKit and the share sheet.' },
  ],
  flow: [
    'A room link holds its key, and the page opens with it.',
    'The page joins the room on the Worker over a WebSocket.',
    'The devices swap sealed offers and network paths through the Worker.',
    'WebRTC connects the devices directly, or through a relay.',
    'Video, sound, board lines and files flow between the devices.',
  ],
  links: [
    { to: 'Cloudflare', text: 'The Worker, the Durable Object and a TURN relay run in the free tier.' },
    { to: 'consdr', text: 'The Android wrapper ports the AdMob and Play Billing code of Consdr to Kotlin.' },
    { to: 'Google Play', text: 'Play Billing sells Remove ads and Farnear Pro, and AdMob shows the Android ads.' },
    { to: 'app-updater', text: 'WBS Updater compares the installed version with the newest GitHub release.' },
    { to: 'Hugging Face', text: 'The scribe downloads the Whisper weights from there once.' },
  ],
  design: {
    scale: [
      'One call joins up to 4 devices in a mesh, so each device uploads its video to the other 3.',
      'A room object holds 6 sockets at most, 64 KB per message and 20 messages a second, so a flood stays in one room.',
      'The Worker, the Durable Object and the relay all run in free tiers, since only small sealed messages cross them.',
    ],
    data: [
      'No account database. The name, language, saved rooms and push keys sit in localStorage under one versioned prefix.',
      'The transcript and the text messages of each room sit in IndexedDB on each device.',
      'The Durable Object keeps only the relay quota and a cached relay reply for 90 minutes. KV keeps connection reports for 14 days.',
    ],
    interfaces: [
      'Signalling is a WebSocket to the room object. Each message is an AES-GCM envelope with a version, an id and a sequence number.',
      'Each pair of devices opens 3 negotiated data channels: live points, control messages and file chunks.',
    ],
    reliability: [
      'After a 3 second disconnect the lower peer id sends an ICE restart offer, with waits of 12, 18 and 25 seconds.',
      'A health check reads each track every 3 seconds. A 15 second stall starts an ICE repair, then a rebuild of that pair.',
      'An envelope id drops a copy, the sequence number drops a replay and an offer id drops a superseded answer.',
    ],
    security: [
      'The room key sits after the # of the link, so the Worker sees ciphertext and no names, titles or offers.',
      'Media is DTLS-SRTP between the devices, and a TURN relay carries only encrypted packets.',
      'The room page loads no ad script and carries noindex, so no third party code runs beside the key.',
    ],
    performance: [
      'The canvas and the WebRTC calls run in plain modules, and React reads small stores through useSyncExternalStore.',
      'The Worker caches relay settings per room for 90 minutes and issues at most 20 upstream per room and day.',
      'Whisper runs on WebGPU where it exists and the small model on WebAssembly elsewhere. Large file sends wait for the channel to drain.',
    ],
    operations: [
      'Checks run lint, tests and the build on each push to main, then the site goes to GitHub Pages and the Worker deploys through wrangler.',
      'The APK builds only when android/ changed, since the app loads the live site. A web change gets a tag and no heavy runner.',
      'A nightly run at 19:00 Sydney builds the Play bundle when android/ changed. A failed Checks run cancels the build.',
    ],
    tradeoffs: [
      'A mesh of direct links over a media server, so no server hosts video and it costs no hosting. Upload grows with each person, so calls stop at 4.',
      'A wrapper around the live site over native screens, so a web fix ships with no store review. The app needs the network.',
      'Whisper in the browser over a cloud speech API, so audio stays on the devices. The first use downloads the model weights.',
    ],
  },
  features: {
    'Calls through a link':
      'The end of the link holds the room key, so the Worker sees only sealed messages. WebRTC then joins up to 4 devices in a mesh.',
    'Recover a dropped call':
      'After a drop one side sends an ICE restart offer, up to 3 times. A queue per peer keeps an old answer from winning.',
    'Return to a call':
      'The browser remembers the open call for 30 minutes, so the link joins again by itself. A Web Lock per room lets a newer tab take the call over.',
    'Relay for blocked networks':
      'The Worker hands each browser short lived TURN settings over its socket. ICE tries direct paths first and falls back to a relay.',
    'Share the call link':
      'The invite panel builds a draft for Gmail, WhatsApp or Telegram in the app language. Other apps opens the share sheet of the system.',
    'Saved rooms':
      'A room link sits in the browser storage under a name, and no server keeps the list. The same key opens the same room each time.',
    Board:
      'Plain modules hold the lines and the erased lines as 2 sets, sent over WebRTC data channels. A canvas draws them outside React.',
    'Share an image or video':
      'The file goes in chunks over its own data channel to each person. The play, pause and seek of the sharer go over the control channel.',
    'Lessons (planned)':
      'A spec plans slides sent to each device before the lesson, with the board tools on each slide. The app has no lesson code yet.',
    'Contacts and ringing':
      'The ring is a web push sealed for the other device and sent through the Worker. The Android app takes it through Google Play services, with no Firebase.',
    'Ads and remove ads':
      'AdMob shows the Android banner and the ad after a call. Play Billing sells the removal, and the room page loads no ad script.',
    'Farnear Pro':
      'Play Billing sells Pro in the Android app, and browsers get the tools free. A device with Pro says so in its sealed hello, so the room opens the board.',
    'Android app':
      'A Kotlin WebView wrapper loads the live site and passes the camera and microphone through. CI signs each APK and puts it in a public GitHub release.',
    'iPhone app':
      'Capacitor loads the live site, and Swift twins of the Kotlin parts add StoreKit, AdMob and the share sheet. The code waits for its first build.',
    Languages: 'i18next holds the 9 catalogs, and a pick switches each screen at once. The choice stays on the device.',
    'App icon':
      'One SVG is the source of the favicon, the web icons and the Android launcher sizes. Android also gets an adaptive and a themed icon.',
    'Call stage':
      'A stage module picks the large tile and the strip from the pin and the shared screen. Each device measures the voices itself for the speaker ring.',
    'Share a screen':
      'Each connection keeps a spare video slot from the start, so a shared screen needs no new offer. The board draws over it.',
    'Take a photo':
      'modern-screenshot captures the visible call as a PNG, with the video and the board. The Android app saves it to Downloads, and no server gets it.',
    'Your name':
      'The name stays in the browser storage and goes to the others in the sealed hello message. A change shows from the next call.',
    'Video background':
      'MediaPipe finds the person on the device, and a canvas draws them over a blur or a picture. That canvas track replaces the camera before it leaves.',
    'Call transcript and summary':
      'One device runs Whisper in the browser, on WebGPU where it can. The lines go to the others over a data channel and stay in IndexedDB. The built-in summarizer of Chrome writes the summary.',
    'Recover stalled media':
      'A health check reads the incoming bytes and frames of each track every 3 seconds. A 15 second stall starts an ICE repair, then a rebuild of that pair.',
    'Shared call titles':
      'The title goes in the sealed signalling with a revision counter. The newest revision wins on each device, and the Worker cannot read it.',
    'Shared documents on the board':
      'PDF.js paints a PDF page and a PowerPoint renderer paints a slide on the device. Page turns and removals go over the control channel.',
    'Contacts and rooms':
      'Contacts and rooms share one saved list in the browser, each with its kind. A contact name stays on the device, and a room title syncs.',
    'Search and share preview':
      'A Vite plugin prerenders the home page in each of the 9 languages at build time. Another writes the sitemap, and each page carries its preview tags.',
    'Messages in a call':
      'A line goes sealed over the room signalling, apart from the video path. Each device keeps it in IndexedDB and swaps missing lines on the next call.',
    'Button hints':
      'One shared module shows the bubble after a hover or a long press. A long press shows the name and holds back the tap.',
    'Close Farnear and take back its permissions':
      'The page ends the call and the ring, then asks the Android wrapper to drop its permissions and close. A browser gets the steps to reset them by hand.',
  },
};

export default arch;
