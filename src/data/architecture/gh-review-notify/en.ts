import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'One bash script runs on the Mac, started every 3 minutes by a launchd agent. It reads GitHub through the gh CLI and shows each new event in Notification Center.',
  parts: [
    { name: 'launchd agent', role: 'starts the script every 180 seconds and catches up after the Mac wakes.' },
    {
      name: 'bash script',
      role: 'searches the PRs, reads the reviews and comments, filters them and sends the notifications.',
    },
    {
      name: 'GitHub CLI',
      role: 'makes each GitHub call with the login gh already keeps, so the tool stores no token.',
    },
    { name: 'jq', role: 'reads the JSON answers from GitHub.' },
    {
      name: 'terminal-notifier',
      role: 'shows the notification and opens the comment on a click, with osascript as a fallback.',
    },
    {
      name: 'Cache files',
      role: 'flat files in the user cache folder hold the seen events and the last update of each PR.',
    },
  ],
  flow: [
    'launchd starts the script, and a lock stops a second run.',
    'gh searches your open PRs updated in the last 3 days.',
    'The script reads reviews and comments only on PRs that changed.',
    'Events already in the seen list drop out.',
    'terminal-notifier shows the rest, and a click opens the comment.',
  ],
  links: [
    { to: 'GitHub', text: 'The source of each PR, review and comment, read through the gh CLI.' },
    { to: 'Homebrew', text: 'Installs jq and terminal-notifier at install time.' },
  ],
  design: {
    scale: [
      'One person on one Mac. The search covers open PRs updated in the last 3 days.',
      'A run after the first takes under 10 seconds, since only PRs whose updatedAt moved get reopened.',
      'The tool is one bash file of under 400 lines.',
    ],
    data: [
      'Flat files in the user cache folder: seen.txt, pr-updated.tsv, review-requests.tsv and a lock folder.',
      'seen.txt keeps the last 3000 event keys. A key is the URL of the review or comment.',
      'The folder is readable by the account only, since it lists the URLs of private PRs.',
    ],
    interfaces: [
      'gh search prs and gh api read GitHub, and jq reads the JSON answers.',
      'terminal-notifier shows each alert and opens the comment on a click, with osascript as the fallback.',
      'launchd starts the agent every 180 seconds. GH_REVIEW_NOTIFY_INTERVAL and GH_REVIEW_NOTIFY_BOTS change the interval and the bot filter.',
    ],
    reliability: [
      'A lock folder makes a second run quit at once.',
      'A failed PR search stops the run before any cache file changes, and a failed review request lookup stays out of the cache, so the next run asks again.',
      'An event shows up to 3 minutes late, and only while the Mac is awake. launchd catches up after wake.',
    ],
    security: [
      'It uses the login of gh auth, so the tool stores no token.',
      'Cache files stay readable by the account only.',
      'It polls github.com from the Mac, so no webhook and no public address reach the machine.',
    ],
    performance: [
      'Reviews and comments get read only for PRs whose updatedAt moved, or for every PR on a seed run.',
      'Team review requests drop, and more than 4 comments on one PR fold into 1 alert.',
      'grep and awk check each event key against seen.txt, with no database.',
    ],
    operations: [
      'install.sh copies the script to the local bin folder, writes the plist and loads the agent. uninstall.sh reverses it.',
      'tests/run.sh runs the script on canned GitHub answers, with stubs for gh, date and terminal-notifier.',
      'Checks run on a GitHub macOS runner, and each green push gets a dated release. The install fetches the latest main.',
    ],
    tradeoffs: [
      'Polling every 3 minutes over email, the Slack app or webhooks, so no server and no public address, at the cost of a delay of up to 3 minutes.',
      'The gh CLI over curl with a token, so no token to store. The tool stops when gh loses its login.',
      'One bash file over TypeScript or Rust, so it copies in with no build, and the tests need stubs.',
      'Flat files over SQLite, so bash needs only grep and awk. A new format takes a new file name.',
    ],
  },
  features: {
    'Review and comment notifications':
      'gh searches the open PRs you wrote, reviewed or joined, then reads the reviews and comments of each changed one. Each new event becomes a notification.',
    'Review requests':
      'A GitHub lookup keeps the requests that name you and drops the ones sent to a team. A failed lookup stays out of the cache, so the next run asks again.',
    'Comment bursts':
      'Before it notifies, the script counts the new comments per PR. More than 4 fold into 1 notification with the count and the names, and a click opens the PR.',
    'Quiet first run':
      'With no cache yet, the script writes the last 3 days of events to the seen list and shows none. A failed first run leaves the cache empty, so the next run seeds again.',
    'Bot filter':
      'The script drops comments from bot accounts before it compares events. A setting given at install time goes into the launchd agent and turns them back on.',
    'Status and test':
      'One flag prints the agent state, the account, the last run and the settings. Another sends a test notification through the same notifier.',
    Releases:
      'A GitHub Actions workflow tags each push to main that passes shellcheck, with a date version. The notes list the commits since the last release.',
  },
};

export default arch;
