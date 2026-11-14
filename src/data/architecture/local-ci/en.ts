import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Setup scripts in PowerShell and POSIX sh prepare a Windows PC or a Mac and register it as GitHub Actions runners. A Next.js page on the PC shows the runners and runs, and its server routes and cancels jobs.',
  parts: [
    { name: 'PowerShell and sh installers', role: 'set up the dev tools with winget or Homebrew and mise.' },
    { name: 'GitHub Actions runner', role: 'takes the org CI jobs, several per PC with a heavy lane for big builds.' },
    {
      name: 'Windows Task Scheduler',
      role: 'starts the runners and the page at boot and runs the update every 5 minutes.',
    },
    { name: 'Next.js', role: 'the local status page, whose server actions stop runs and install APKs.' },
    {
      name: 'GitHub REST API',
      role: 'gives the page its runs and releases, polled with ETags to spare the rate limit.',
    },
    { name: 'adb', role: 'installs a release APK on the phone plugged in over USB.' },
    { name: 'Blacksmith and Oracle Cloud', role: 'the free cloud runners that take jobs before the PC does.' },
    { name: 'SVG charts', role: 'drawn on the server from 90 days of runs kept in a JSON file.' },
  ],
  flow: [
    'A push to an org repo queues jobs on GitHub.',
    'The page server points each repo at a cloud runner or this PC.',
    'A runner picks up the job that matches its labels.',
    'The page server reads the runs and stops the replaced ones.',
    'The page shows the jobs, releases and stop reasons every 15 seconds.',
  ],
  links: [
    { to: 'GitHub Actions', text: 'The machines register as runners of the org, and the page reads the API.' },
    { to: 'archon', text: 'The CI tab of Archon frames the status page.' },
    { to: 'ci', text: 'Jobs that call its setup step on this PC copy packages from the shared store.' },
    { to: 'agent-skills-private', text: 'Its repo-ci templates read the runner variables and set the cancel rules.' },
    { to: 'Blacksmith', text: 'Cloud runners for light and heavy jobs while the free minutes last.' },
  ],
  features: {
    'Mac setup':
      'A POSIX sh script installs Homebrew tools, mise and the shell setup. It then sets the git config and clones the org repos. A second run skips what is in place.',
    'Windows setup':
      'A PowerShell script installs the same tools through winget and mise, with Python and a Rust compile cache. It skips the Mac only pieces and what is in place.',
    'Self-hosted CI runner':
      'The runner scripts download the GitHub runner, check its SHA256 and register 4 runners on Windows. The first 2 take the Gradle, Cargo and Tauri jobs.',
    'Start button':
      'A double click moves the checkout to the newest release and reruns the installers that changed. It then starts the runner and page tasks and opens the page.',
    'CI status page':
      "A Next.js server reads the runners, runs and jobs from the GitHub API and this PC's runner folders. The progress bars come from the 10 latest finished runs.",
    'Build cancellation':
      'Workflow concurrency cancels older runs on GitHub. Every 10 seconds the page server stops replaced runs and releases whose Checks failed. A file logs each cause.',
    'Cloud runners first':
      'The page server counts the free Blacksmith and GitHub minutes. It sets a runner variable in each private repo, and jobs fall back to the PC labels.',
    Releases:
      "Server actions dispatch an app's release workflow or build its APK from main in a temporary clone. adb then installs the APK on the plugged in phone.",
    'Updates by themselves':
      'A scheduled task runs every 5 minutes and at logon. It moves the checkout to the newest release tag and reruns only the installers whose files moved.',
    Sites:
      "The page reads each repo's workflows once an hour and finds the one that deploys a site. The button dispatches it on main.",
    'CI trends':
      'The page server reads the finished runs every 10 minutes and keeps 90 days in a JSON file. It draws the charts as SVG on the server.',
  },
};

export default arch;
