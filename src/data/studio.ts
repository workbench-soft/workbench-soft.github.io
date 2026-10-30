export const email = 'workbench.soft@gmail.com';
export const mailto = `mailto:${email}?subject=${encodeURIComponent('A project for Workbench Soft')}`;

/** Platforms a person installs or opens an app on. Tool hosts such as VS Code stay out of the count. */
export const devicePlatforms = ['Android', 'iPhone', 'Web', 'Windows', 'macOS', 'Linux'];

export const stack = [
  'Astro',
  'React Native',
  'Expo',
  'Next.js',
  'React',
  'TypeScript',
  'Rust',
  'Tauri',
  'Capacitor',
  'Cloudflare Workers',
  'Firebase',
  'WebGL',
  'MapLibre',
  'Web Audio',
  'MIDI',
  'ExifTool',
  'WebDAV',
  'Tailscale',
  '.NET',
  'GitHub Actions',
  'mise',
];

export type Icon = 'phone' | 'browser' | 'code' | 'pin' | 'growth' | 'gear';

export const services: { icon: Icon; title: string; text: string; proof: string[] }[] = [
  {
    icon: 'phone',
    title: 'Mobile apps',
    text: 'Android and iPhone apps in React Native and Expo. Background services, wake words, maps, offline data and in-app purchases. Released to Google Play, or as an APK that updates itself.',
    proof: ['keeppad', 'tickalot', 'memories'],
  },
  {
    icon: 'browser',
    title: 'Web apps and PWAs',
    text: 'Next.js, React and Astro apps that install to the home screen and open with no network. Hosted on Cloudflare Workers, with pages search engines can index.',
    proof: ['guitar-upscale', 'consdr', 'servohop'],
  },
  {
    icon: 'code',
    title: 'Desktop and system tools',
    text: 'Native apps in Rust and Tauri for Windows and macOS. Keyboard hooks, tray icons, file sorting with undo, and installers that update themselves.',
    proof: ['langflip', 'media-organizer'],
  },
  {
    icon: 'pin',
    title: 'Maps, voice and audio',
    text: 'Live maps with turn by turn routes. Offline wake words and speech to text. Synths, effects and MIDI in the browser.',
    proof: ['spotthecam', 'guitar-upscale', 'keeppad'],
  },
  {
    icon: 'growth',
    title: 'Launch and growth',
    text: 'Google Play listing and release, Search Console, sitemaps and structured data. AdMob and AdSense with the consent message, then a plan for the first users.',
    proof: ['servohop', 'consdr', 'agent-skills'],
  },
  {
    icon: 'gear',
    title: 'Engineering and AI tooling',
    text: "CI on your own hardware, shared GitHub Actions, and skills that make coding agents follow a team's rules from the ticket to the merge.",
    proof: ['agent-skills', 'local-ci', 'git-aliases'],
  },
];

export const steps: { title: string; text: string }[] = [
  {
    title: 'Spec',
    text: 'Each feature starts as a written spec in the repo: what it does for the person, the flows and the limits. You read and approve the same file.',
  },
  {
    title: 'Build',
    text: 'The work happens on its own branch, with its own database, port and emulator. Each step is a commit with passing checks.',
  },
  {
    title: 'Review and ship',
    text: 'A pull request with diagrams of the user flows, then CI. Green checks merge, and the docs change in the same PR.',
  },
  {
    title: 'Launch and run',
    text: 'Store release, search setup and updates inside the app. The README, architecture and feature docs stay true after each change.',
  },
];
