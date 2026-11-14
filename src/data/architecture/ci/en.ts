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
  },
};

export default arch;
