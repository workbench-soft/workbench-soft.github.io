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
