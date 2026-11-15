import type { Engineering } from './types';

export default {
  title: 'How the code gets built',
  intro:
    'Each repo follows the same rules for code, tests, specs and docs. Coding agents do most of the typing, and the rules keep their work small, checked and documented.',
  numbers: {
    title: 'The code today',
    source: 'Counted from {repos} repos on GitHub on {date}. The count runs again on each deploy and each night.',
    languages: 'Lines by language',
    other: 'Other',
    metrics: {
      lines: ['Lines of code', 'Non-blank lines of source, without built or vendored code.'],
      files: ['Source files', 'Each file in a programming language.'],
      functions: ['Functions', 'Named functions and methods, from the syntax tree.'],
      types: ['Types', 'Classes, interfaces, structs, enums and traits.'],
      tests: ['Tests', 'Test cases in Vitest, Rust, Kotlin, Swift and Python.'],
      modules: ['Modules', 'npm packages, Rust crates and Gradle modules.'],
      smallFiles: ['Files under 100 lines', 'The share of source files that fit the 100 line rule.'],
      medianLines: ['Median file', 'Half the source files are this many lines or shorter.'],
      specs: ['Specs', 'Feature specs in the specs folder of each repo.'],
      docs: ['Doc pages', 'READMEs and the pages in each docs folder.'],
      commits: ['Commits in 30 days', 'Commits on the main branch of each repo.'],
      prs: ['PRs merged in 30 days', 'Pull requests merged across the org.'],
    },
  },
  topics: [
    {
      id: 'code',
      title: 'Small, plain code',
      lead: 'Code reads clearly on the first pass, and each file holds one job.',
      points: [
        ['Under 100 lines', 'a file stays under 100 lines. A longer one splits by job.'],
        ['Reuse first', 'new code starts with a search of the repo and the shared packages.'],
        ['Library first', 'a maintained library wins over code written by hand.'],
        ['Shared packages', 'code that 2 apps need moves into one package that both install.'],
        ['Strict', 'TypeScript runs in strict mode, and the linters fail on a warning.'],
      ],
    },
    {
      id: 'tests',
      title: 'Tested at each step',
      lead: 'A change passes the same checks on the PC, in CI and on a real phone.',
      points: [
        ['Before the push', 'a git hook runs lint, the format check and the type check.'],
        ['CI on each push', 'checks and the release build start together. A failed check cancels the build.'],
        ['Unit tests', 'Vitest, cargo test and Gradle tests run in each repo with mise run test.'],
        ['Real devices', 'merged work installs on a real phone or opens in a browser, flow by flow.'],
        ['Catalog tests', 'a test fails when a language lacks a string that English has.'],
      ],
    },
    {
      id: 'specs',
      title: 'A spec for each feature',
      lead: 'Each feature has one spec in the repo, written before the code.',
      points: [
        ['First commit', 'the spec or its new entry lands before any code.'],
        ['One-pager on top', 'a short summary leads, then the flows, the modules, the data and the limits.'],
        ['History below', 'each change adds a dated entry with the reason, the files and the steps.'],
        ['Kept', 'specs stay after the merge, so the reason behind the code stays too.'],
      ],
    },
    {
      id: 'docs',
      title: 'Docs in the same change',
      lead: 'A change updates each doc it makes stale, in the same commit.',
      points: [
        ['Each repo', 'a README, a changelog, a to-do list and the specs.'],
        ['Each app', 'the architecture with diagrams, the user flows and the features.'],
        ['Checked', 'a script checks that each feature in the docs has its spec and its line on this site.'],
        ['Plain words', 'docs, commits and PRs follow one writing guide: the answer first, short sentences.'],
        ['9 languages', 'each string a person sees ships in 9 languages in the same change.'],
      ],
    },
    {
      id: 'agents',
      title: 'Coding agents with rules',
      lead: 'Claude Code, Codex and Kimi Code read the same rules and skills.',
      points: [
        ['Rules as files', 'each repo holds its own AGENTS.md, and one shared file sets the stack and the layout.'],
        ['Skills', 'a skill per job: ship, review, test, release. The public ones sit in agent-skills.'],
        [
          'One task, one worktree',
          'each session claims its files, works in its own git worktree and merges through a PR.',
        ],
        ['Archon', 'a launcher on the PC starts a session per task and shows what each one is doing.'],
        ['Lessons', 'a step that cost an agent a retry becomes a rule, so the next session skips it.'],
      ],
    },
    {
      id: 'tools',
      title: 'One tool per job',
      lead: 'Each repo uses the same tools at the same versions.',
      points: [
        ['Pinned', 'mise pins each tool version, and the lockfiles sit in git.'],
        ['Newest stable', 'a new tool starts at its latest stable release.'],
        ['Upgraded together', 'a major bump of a shared tool goes to each repo that uses it.'],
        ['Free', 'each tool and service is free, or stays in its free tier.'],
      ],
    },
  ],
  stack: {
    title: 'The stack',
    head: ['Job', 'Pick'],
    rows: [
      ['Phone and web apps', 'Expo, React Native and react-native-web, one codebase'],
      ['Desktop apps', 'Tauri 2, with a Vite and React UI over a Rust core'],
      ['Logic for each platform', 'a Rust crate, built to wasm for the web and through FFI for phones'],
      ['Backend', 'Rust on Cloudflare Workers, with D1 and R2'],
      ['Live shared data', 'Firestore with Firebase Auth'],
      ['Static sites', 'Astro on GitHub Pages'],
      ['Android native code', 'Kotlin and Jetpack Compose'],
      ['Scripts', 'TypeScript on Node'],
      ['TypeScript checks', 'Vitest, oxlint, oxfmt, knip and tsc'],
      ['Rust checks', 'clippy, rustfmt and cargo-shear'],
    ],
  },
} satisfies Engineering;
