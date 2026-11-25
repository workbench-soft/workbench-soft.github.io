# Private apps page

## One-pager

- **What** <https://insiders.workbench-soft.com/private/> lists the apps
  Workbench Soft keeps off the public site, starting with Suno Download, in
  the 9 site languages.
- **Who** the owner and each email on the Cloudflare Access allow list.
  Anyone else gets the Access login and no page.
- **How** a Worker in `apps/private` serves the page. Cloudflare Access
  guards the whole host, and the Worker checks the
  `Cf-Access-Jwt-Assertion` token itself, so a request that skips Access
  gets 403.
- **Data** one file, `apps/private/src/apps.ts`, holds each app: its name,
  its repo and its line in the 9 languages. A new app is one entry.
- **Out of search** no sitemap, no `llms.txt`, no catalog entry, a
  `noindex` tag and header, and `robots.txt` disallows `/private`.
- **Invite** an email goes on the allow list through
  `apps/private/scripts/invite.ts`, or the Zero Trust dashboard.

## What it does for the person

- **Owner** opens the page, signs in with a one-time PIN sent to the email,
  and sees each private app with its release link and install steps.
- **Invited person** gets the link, types the invited email, gets a PIN, and
  sees the same page.
- **Stranger** sees the Access login, and a PIN goes only to an email on the
  list.
- **Languages** the page picks the language from `?lang=` or the browser's
  `Accept-Language`, and a picker switches it.

## User flows

1. The owner adds a friend's email: `mise run invite friend@example.com` in
   `apps/private`.
2. The owner sends the friend <https://insiders.workbench-soft.com/private/>.
3. The friend types the email on the Access page and gets a 6-digit PIN.
4. The friend types the PIN and lands on the page for 30 days.
5. The friend presses "Latest release" or follows the install steps.

## How it works: modules, files, data

- **`apps/private/src/index.ts`** the Worker: it checks the Access token,
  then answers `/private/` with the page and `/` with a redirect there.
- **`apps/private/src/access.ts`** verifies the token with `jose` against
  the team's keys at `https://<team>.cloudflareaccess.com/cdn-cgi/access/certs`
  and the app's audience tag. The team domain and the tag sit in `vars` of
  `wrangler.jsonc`, since neither is a secret.
- **`apps/private/src/page.ts`** the HTML of the page, with `noindex`.
- **`apps/private/src/apps.ts`** the list of private apps.
- **`apps/private/src/i18n/`** the page text in 9 languages, typed by
  English. It takes the language list from the site's `src/i18n/locales.ts`.
- **`apps/private/scripts/access.ts`** makes or updates the Access app and
  its policy through the Cloudflare API, with the token from Bitwarden.
  `scripts/invite.ts` adds an email to the policy.
- **`registry.json`** registers `/private` like `/games`, so the edge sends
  the path to this Worker once it goes live.
- **CI** `.github/workflows/private.yml` checks the app and deploys it on a
  push to main, like `games.yml`.

## Limits

- **Host** the edge Worker isn't deployed, and the apex of
  `workbench-soft.com` stays on GitHub Pages, which Access can't guard. So
  the page runs on its own host, as the games do.
- **Private repos** the release link opens only for a GitHub account with
  access to the repo. An invited person without one follows the steps or
  gets the zip from the owner. A download route through the Worker with a
  read-only GitHub token is the next step.
- **Free plan** Zero Trust Free covers 50 users.

## Changes

### 2026-11-25 A private page for insiders

- **Why** the owner wants a page only they and the people they invite can
  open, for apps like Suno Download that stay off the public site.
- **Changes** a new `apps/private` Worker, its CI workflow, a line in
  `registry.json`, a `robots.txt` disallow, the Access setup and invite
  scripts, and the invite steps in the README.
- **Steps** the spec, then the Worker and its tests, then the Access app
  and policy, then the deploy and a check with an invited email and an
  anonymous request.
- **Docs** `README.md`, `apps/private/README.md`, `CHANGELOG.md`.
