# How each project is built

## One-pager

- **Ask** the site shows how each app is built: its tech and the job of each, the data flow, its links to other projects, and how each feature works.
- **Where** each project panel gets a "How it is built" block, and each feature opens to a "How it works" line.
- **Data** `src/data/architecture/<project>/<lang>.ts`, one file per project and language, written from the repo's `docs/architecture.md`, README and code.
- **Check** a test matches each file with `src/data/projects.ts`: every project, every language, every feature.
- **Missing features** the features `feature-check` lists as absent join the site in the same change.

## What it does for the person

A client who reads the site sees how the studio builds an app, beside what the app does. Each project panel shows:

- **Parts** each technology and the job it does in the app.
- **Data flow** the path data takes, from where it comes in to what the person sees.
- **Connected to** the other projects and services the app talks to, linked to their panels.
- **How it works** under each feature, one or two sentences on the modules and data behind it.

## User flows

1. The visitor opens a project panel on the home page, in any of the 9 languages.
2. The visitor opens "How it is built" below the features and reads the parts, the flow and the links.
3. The visitor taps a feature, and its "How it works" line opens under it.
4. A link under "Connected to" scrolls to the other project's panel.

## How it works: modules, files, data

- **`src/data/architecture/types.ts`** the `Arch` shape: `summary`, `parts` as name and role, `flow` as steps, `links` to a project id or an outside service, and `features` keyed by the English feature name.
- **`src/data/architecture/<id>/<lang>.ts`** one `Arch` per project and language. The keys of `features` stay in English in every language, so a renamed translation keeps its line.
- **`src/data/architecture/index.ts`** loads every file with `import.meta.glob` and gives `archOf(id, lang)`.
- **`src/data/architecture/architecture.test.ts`** fails on a missing project or language, on lists of other lengths than English, and on feature keys that differ from `projects.ts`.
- **`src/i18n/index.ts`** `projectsIn` keeps the English feature name as `key`, so the panel finds its line in any language.
- **`src/components/Architecture.astro`** the "How it is built" block.
- **`src/components/ProjectPanel.astro`** each feature becomes a `<details>` with its line, and the block sits below the features.
- **`src/i18n/*.ts`** the labels of the block in each catalog.

## Limits

- **Public text** the lines name tools and modules. Hosts, addresses, accounts and keys stay out.
- **By hand** the lines come from each repo's docs at the time of writing. A later change to an app updates its lines through `feature-docs`.

## Changes

### 2026-11-15 Architecture of each project and feature, and the missing features

- **Why** the owner asked for a high level architecture of each app and each feature on the site, and for the features the site lacks.
- **Changes**
  - **`src/data/architecture/`** new: the types, the loader, the test and a folder per project.
  - **`src/components/Architecture.astro`** new block. **`ProjectPanel.astro`** features open to their line.
  - **`src/i18n/`** labels in 9 languages. `projectsIn` keeps the feature key.
  - **`src/data/projects.ts`** and the catalogs: the features `feature-check` found missing in SpotTheCam, Tickalot, Consdr, Tripforge, Alina Photo, Aspiration Style and CI.
- **Steps**
  1. This spec.
  2. The types, loader, test, block and labels, with one project filled in.
  3. The missing features.
  4. The other projects, a few per commit.
- **Docs** `docs/architecture.md`, `docs/features.md`, `README.md`.

### 2026-11-15 Fast scroll on the site

- **Why** `feature-check --fetch` found Tickalot "Long lists", KeepPad "Fast scroll" and Sky Altar "Long lists", added by the shared `fast-scroll` package after the first merge.
- **Changes** `src/data/projects.ts`, the 8 catalogs and the architecture files of the 3 projects get the feature and its line.

### 2026-11-15 Design depth for each project

- **Why** the owner wants each project's block to answer the questions a senior engineer asks about a system: load and limits, data, interfaces, failures, security, speed, release and the choices behind them. The site stays about the apps, so no line mentions interviews.
- **Shape** `Arch` gets `design` with 8 lists of 2 to 4 lines each:
  - **`scale`** who uses it, how much data and load, the limits that shaped it.
  - **`data`** what it stores, the shape of the records, where each one lives.
  - **`interfaces`** the APIs, protocols and messages between the parts.
  - **`reliability`** failures, offline work, retries, conflicts, consistency.
  - **`security`** sign in, permissions, secrets, privacy.
  - **`performance`** caching, batching, background work, the hot paths.
  - **`operations`** build, release, hosting, updates, monitoring.
  - **`tradeoffs`** each choice, the option it gave up and the reason.
- **Facts** each line comes from the repo: its code, `docs/architecture.md`, specs and README. A number stays only when the repo shows it.
- **Changes** `types.ts`, the test, `Architecture.astro` and the 8 labels in each catalog, then the `design` of each project in 9 languages.
- **Docs** `docs/architecture.md`, `docs/features.md`.
