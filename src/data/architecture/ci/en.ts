import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'A private GitHub repo of shared steps that each org repo calls from its own workflows. A composite action sets up the tools, and reusable workflows merge Dependabot PRs and build for the iPhone simulator.',
  parts: [
    {
      name: 'Composite action',
      role: "the setup step that runs inside the caller's job and installs the pinned tools and packages.",
    },
    { name: 'mise', role: 'installs each tool at the version the repo pins.' },
    { name: 'pnpm', role: 'installs the packages from the lockfile, with a copy in place of hardlinks on Windows.' },
    { name: 'Reusable workflows', role: 'the Dependabot merge and the iOS simulator build that each app repo calls.' },
    { name: 'Node script', role: 'lists the Android only pieces of an app that have no iOS plan.' },
    { name: 'macOS runner and Maestro', role: 'build the app for the iPhone simulator and run its test flows.' },
    { name: 'Release scripts', role: 'shell scripts that pick the date tag and write the notes from the commits.' },
  ],
  flow: [
    "An app repo's workflow calls a step here on the main branch.",
    'GitHub loads the step from this repo for that run.',
    'The setup step installs the pinned tools, then the packages.',
    "The caller's own checks run next in the same job.",
    'A fix merged here reaches each repo on its next run.',
  ],
  links: [
    { to: 'GitHub Actions', text: 'Each org repo calls the steps here from its own workflows.' },
    {
      to: 'local-ci',
      text: 'On the PC runners the setup step copies packages from the shared store to avoid file locks.',
    },
    { to: 'agent-skills-private', text: 'The release scripts match the CI templates of its repo-ci skill.' },
    { to: 'Dependabot', text: 'Its PRs merge through the shared workflow, and a major update waits for a person.' },
  ],
  design: {
    scale: [
      'One owner and the dozens of app repos of one GitHub org, each calling the same few steps from its own workflows.',
      'A fix here reaches every caller on its next run, so one bad merge can break all of them.',
    ],
    data: [
      'No database. The state is a date tag, a commit subject format and the mise.toml that pins each tool.',
      'The tag is v<yyyy.mm.dd>.<n>, and the notes sort feat, fix and perf commits from subjects shaped type(scope)!: text.',
    ],
    interfaces: [
      'The setup step is a composite action that a caller runs with uses, and it runs inside the caller’s job.',
      'The Dependabot merge and the iOS simulator build are reusable workflows that take the list of workflows to start on main.',
      'The auto merge runs from pull_request_target, and the iOS check is a Node script with a pass or fail result.',
    ],
    reliability: [
      'The merge job runs only when dependabot[bot] opened the PR and made the event, and it stops on a PR that is merged or closed.',
      'On the PC runners pnpm copies packages from a shared store, since a deleted hardlink made other reads fail with EBUSY.',
      'A job gets its own mise shim folder, so a running process holding the shared uvx.exe can’t block a tool update.',
    ],
    security: [
      'The repo is private, and its Actions access is set to the org so that the callers can load the workflows.',
      'pull_request_target runs from main with a write token, so only Dependabot’s own PRs merge and a major update waits for a person.',
    ],
    performance: [
      'Tool installs stay shared across jobs on a runner, and only the small shim folder is rebuilt for each job.',
      'pnpm installs from the lockfile with no resolution step, and the iOS check runs first so a bad plan fails before the Mac minutes start.',
    ],
    operations: [
      'Lint runs on each push to main. The release workflow starts on workflow_run after Lint passes and tags the commit with a date.',
      'A push of Markdown only skips Lint, so it gets no release.',
      'mise run test builds a throwaway git repo and checks the two release scripts, and Vitest covers ios-check.',
    ],
    tradeoffs: [
      'Callers use @main over a pinned tag, so one fix lands everywhere. A repo that needs to hold back pins a release tag.',
      'A composite action over a reusable workflow for setup, so the caller’s own checks follow it in the same job.',
      'Merge on open and check on main over waiting for PR checks, since the org repos run none on PRs. A bad update reaches main first.',
      'A macOS runner for the iPhone build, since the PC runners are Windows. A macOS minute counts as 10, so callers start it by hand or on release.',
    ],
  },
  features: {
    'Setup step':
      "A composite action runs mise for the tools the repo pins, then pnpm installs from the lockfile. It runs inside the caller's job, so the caller's checks follow it.",
    'Dependabot details':
      'The Dependabot metadata action reads the update type of each PR. The merge job uses it to hold a major update for a person.',
    'Dependabot auto merge':
      "A reusable workflow squash merges a Dependabot PR as it opens, then starts the repo's checks on main. Only a PR that Dependabot opened and pushed merges this way.",
    Releases:
      'A release workflow starts once Lint passes on a push to main. Two shell scripts pick the date tag and write the notes from the commits since the last tag.',
    'iOS check and simulator build':
      "A Node script reads the app's packages, native modules and Gradle files for Android only pieces. A reusable workflow then builds on a GitHub macOS runner, and Maestro takes the screenshots.",
    'Affected step':
      'A composite action compares the push with the last green run on main for checks, or the last release tag for a release. It then matches the files to the paths in affected.json.',
  },
};

export default arch;
