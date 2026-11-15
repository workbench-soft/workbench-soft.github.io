import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'One Kotlin app for Android reads the public GitHub releases of the studio and installs each APK through Shizuku. It has no server of its own.',
  parts: [
    { name: 'Kotlin and Android Views', role: 'one screen of plain Views with a card per app and a pull to refresh.' },
    { name: 'GitHub Releases API', role: 'the source of the newest APK of each app, with its notes and commits.' },
    { name: 'Shizuku', role: 'runs each install as the shell user, so Android shows no prompt.' },
    { name: 'Android package manager', role: 'gives the label, package name and version of each installed app.' },
    { name: 'Update run', role: 'keeps the queue outside the screen and downloads each APK in chunks.' },
    { name: 'Shared preferences', role: 'keep the last release list and the package names learned in a run.' },
    { name: 'Studio catalog', role: 'a JSON file from the studio site that names each project and its platforms.' },
  ],
  flow: [
    'The person opens the app, comes back to it or pulls the list down.',
    'The app reads each releases page from GitHub, or a list under 10 minutes old.',
    'It matches each APK to an installed app by label or package name.',
    'The studio catalog names each card and adds the projects with no APK.',
    'A tap downloads the APK, and Shizuku installs it with no prompt.',
    'The updater installs itself last, and the phone reopens it.',
  ],
  links: [
    { to: 'GitHub', text: 'The shared public releases repo holds the APK of each app, so the phone needs no token.' },
    { to: 'Shizuku', text: 'The Shizuku app grants the shell user that installs and removes the apps.' },
    { to: 'Workbench Soft site', text: 'The site builds the app catalog from its own project list.' },
    { to: 'archon', text: 'Archon ships no APK, so its card holds an Open link.' },
  ],
  design: {
    scale: [
      "One screen on the developer's own phone, with a card per released studio app.",
      'The GitHub API allows 60 unauthenticated calls an hour, which shaped the 10 minute list cache.',
    ],
    data: [
      'No database. Shared preferences hold the last release list, with notes and names, and the package names learned in a run.',
      'An asset key is the tag prefix plus the APK name without its version and platform suffix, such as farnear/farnear.',
      'The installed apps come from the Android package manager on each check.',
    ],
    interfaces: [
      'The GitHub Releases API of the shared public releases repo lists every APK page by page, and the compare API gives commit notes.',
      'The studio site serves a catalog JSON with the name, platforms and link of each project.',
      'Shizuku runs sh -c as the shell user, with pm install -r -d -S and pm uninstall.',
    ],
    reliability: [
      'A failed GitHub check shows the saved list, and an open waits a minute before it asks again.',
      'The update run lives outside the activity, so a turned screen keeps it, and Cancel stops before the next chunk.',
      'A blocking build is removed only on a signature or version clash, and the exit status shows a failed reinstall.',
    ],
    security: [
      'It reads public releases only and keeps no token or account.',
      'Install rights come from the Shizuku grant the person gives, and the app runs no root command.',
      'The own install checks the APK file size before it installs.',
    ],
    performance: [
      'APKs download in 64 KB chunks with timeouts and a stop check.',
      'The release list stays fresh for 10 minutes, so most opens skip the API.',
      'Notes for cards without them load in the background from the compare API, after the cards show.',
    ],
    operations: [
      'Checks run ktlint, shellcheck, shfmt, actionlint, markdownlint, the unit tests and the debug build on a self-hosted runner.',
      'Release builds a signed APK beside Checks, and release-gate.sh publishes it once checks pass.',
      'The job tags a date version and creates an updater release in the public releases repo, keeping the last 3.',
    ],
    tradeoffs: [
      'Shizuku over the system installer, so installs need no prompt, at the cost of a start after each reboot.',
      'Plain Views over Compose, for one screen and the Shizuku Java API, at the cost of hand built layout.',
      'A public releases repo over private app repos, so the phone needs no token, at the cost of the 60 calls an hour limit.',
      'The own APK installs last, through one shell command, since an install can kill the running process.',
    ],
  },
  features: {
    'Update all':
      'The update run queues each app that is behind and downloads it in 64 KB chunks. Shizuku installs each one as the shell user, and Cancel stops before the next chunk.',
    'Self update':
      'The updater ships to the same releases under its own tag and installs itself last. One shell command through Shizuku installs it and reopens the app once the old process ends.',
    'Update one app':
      'The Update button of a card runs the same download and Shizuku install for one APK. A failed install keeps the button for a retry.',
    'Install a missing app':
      'An APK with no match among the installed apps gets an Install button. Shizuku installs it the same way as an update.',
    'App list':
      'Each released APK gets a card, matched to the installed apps by label or package name. The studio catalog adds a card with a link for each project without an APK.',
    'Saved list offline':
      'Shared preferences keep the last release list with its notes and names. A failed GitHub check shows that list, and an open within 10 minutes skips the API.',
    'Shizuku setup':
      'A setup module finds the Shizuku step left and opens Google Play or the Shizuku app for it. The update the person tapped runs once access is granted.',
    'Release notes':
      'The app cleans up the notes of each GitHub release. When they are empty, it reads the commits of the release compare link in the background.',
  },
};

export default arch;
