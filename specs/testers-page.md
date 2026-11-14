# Testers page

## One-pager

- **What** <https://workbench-soft.com/testers> tells a tester how to join the
  closed tests of every Workbench Soft Android app, in all 9 site languages.
- **Why** Google Play publishes an app of a personal developer account only
  after 12 testers keep it installed for 14 days in a row.
- **Who links here** the welcome message of the Google Group
  `workbench-soft-testers`, which caps at 1000 characters, and the tester
  emails.
- **How** one Astro component reads one catalog file, so the app list and
  its text sit in `src/testers/`.

## What it does for the person

- **Why it matters** one line on the 12 testers and 14 days rule.
- **Steps** join the Google Group, then for each app press "Join the test"
  and "Install", then keep the apps for 14 days.
- **Apps** 16 rows, each with a title, a one-line description, a "Join the
  test" link and an "Install" link.
- **Not available yet** a line says a link that shows "App not available"
  waits on the Google review, so the tester tries again in a few days.
- **Feedback** a line asks for feedback to `workbench.soft@gmail.com`.

## User flows

1. A tester opens the link from the Google Group welcome or an email.
2. The tester presses "Join group" on
   <https://groups.google.com/g/workbench-soft-testers>, with the Google
   account of the Play Store.
3. For each app the tester presses "Join the test", then "Become a tester"
   on the Google Play page.
4. The tester presses "Install" and gets the app from Google Play.
5. The tester keeps the apps for 14 days and opens them now and then.

## How it works: modules, files, data

- **`src/testers/apps.ts`** the package of each app, in the page order. The
  links come from the package: `https://play.google.com/apps/testing/<package>`
  and `https://play.google.com/store/apps/details?id=<package>`.
- **`src/testers/i18n.ts`** the page text and the app descriptions in the 9
  languages. English types the keys, and `testers.test.ts` checks each
  catalog against English.
- **`src/testers/TestersPage.astro`** the page, on the shared `Base` layout.
- **Routes** `src/pages/testers.astro` builds `/testers/`, and
  `src/pages/[lang]/testers.astro` builds `/<code>/testers/`.
- **Search** the page has a canonical link and hreflang links like the other
  pages, and the sitemap lists it.

## Limits

- **Package list** a new Android app needs a row in `apps.ts` and its
  description in each catalog.
- **Review state** the page can't tell which apps Google still reviews, so
  the "App not available" line covers all of them.

## Changes

### 2026-11-15 Add the testers page

- **Why** the owner collects 12 testers per app. The Google Group welcome
  message holds 1000 characters, too few for 16 apps with links.
- **Changes** the new `src/testers/` folder and the two route files.
- **Steps** this spec, then the page, its catalogs and test, then the docs.
- **Docs** `README.md`, `docs/features.md`, `docs/user-flows.md` and
  `CHANGELOG.md`.
