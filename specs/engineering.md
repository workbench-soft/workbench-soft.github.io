# Engineering section and code metrics

## One-pager

- **For the visitor** the home page shows how Workbench Soft builds software:
  the code rules, the tests, the specs, the docs, the agent setup and the
  stack, with live numbers about the code.
- **Numbers** lines of code, source files, functions, types, tests, modules,
  the share of files under 100 lines, specs, doc pages, commits and merged
  PRs in the last 30 days, and lines per language.
- **Source** `pages.yml` counts them from the org repos on GitHub before each
  build and each night. No count sits in git.
- **Access** the count reads private repos with the repo secret
  `CODE_STATS_TOKEN`. Without it, the build skips the count and the site
  hides the numbers, since the public repos alone undercount.

## What it does for the person

A client or a developer who opens the site sees section 04, "Engineering".
It shows the numbers first, then a card per topic, then the stack table. The
hero's "Lines of code" takes its number from the same count.

## How it works: modules, files, data

- **`scripts/code-stats/`** the count. `main.ts` lists the org repos through
  the GraphQL API, clones each one shallow and sparse into a temp folder, and
  writes `src/data/code-stats.json`.
- **Clone** `git clone --depth 1 --filter=blob:none --sparse`, with sparse
  patterns for the source files, the manifests, `specs/`, `docs/` and
  `README.md`. Git fetches only those blobs.
- **Lines and files** the non-blank lines of each source file, grouped by
  language from the extension.
- **Functions, types, tests** ast-grep parses TypeScript, TSX, Rust, Kotlin,
  Swift and Python with one rule file built in `rules.ts`.
- **Modules** each `package.json`, each `Cargo.toml` with `[package]`, and
  each `build.gradle` or `build.gradle.kts`.
- **Activity** commits on the default branch and merged PRs since 30 days
  ago, from the GraphQL API.
- **Page** `src/components/Engineering.astro` and `EngineeringStats.astro`
  read the JSON at build time. The text sits in `src/data/engineering/`, a
  file per language.

### Why ast-grep

The `stack` skill has no tool that parses code in several languages.
ast-grep reads TypeScript, Rust, Kotlin, Swift and Python with tree-sitter,
ships as one binary through mise and is free. A regex count would mistake
comments and strings for code.

## Limits

- **Repos left out** forks, and the built copies and moved code the old count
  skipped: `aspirationstyle-site`, `farnear-site`, `media-organizer`,
  `shuttrix`, `workbench-soft`.
- **Code left out** `vendor/`, `dist/`, `generated/`, `binaries/`, `*.min.*`
  and `worker-configuration.d.ts`.
- **Functions** named ones: declarations, methods and arrow functions bound
  to a name. A callback passed inline doesn't count.
- **Local build** with no `src/data/code-stats.json`, the section hides its
  numbers. `mise run code-stats` writes the file with the `gh` login.

## Changes

### 2026-11-15 First version

- **Why** the owner wants the site to present the studio as a strong
  engineering team: the code rules, testing, specs, docs and the agent setup.
  The lines of code count sat in a committed JSON, and the owner wants it
  live from GitHub, with numbers that describe the code and its quality.
- **Changes**
  - **`scripts/code-stats/`** replaces `scripts/code-lines.ts`, and
    `src/data/code-stats.json` replaces the committed `code-lines.json`.
  - **`mise.toml`** pins `ast-grep`, and `code-stats` replaces `code-lines`.
  - **`pages.yml`** runs `mise run code-stats` before the build, with a
    nightly schedule.
  - **`src/components/`** the new section, a nav link, the hero number.
  - **`src/data/engineering/`** the text in 9 languages, with a test that
    each language holds the same topics and points.
- **Steps** the spec, the count, the section in English, the translations,
  the docs.
- **No token yet** the first deploy counted only the 7 public repos, so the
  build now skips the count until the secret exists.
- **Docs** `README.md`, `docs/features.md`, `docs/architecture.md`,
  `CHANGELOG.md`, and the workspace `docs/accounts.md` for the token.
