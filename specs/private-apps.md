# Private apps page

## One-pager

- **What** <https://insiders.workbench-soft.com/private/> lists the apps
  Workbench Soft keeps off the public site, starting with Suno Download, in
  the 9 site languages: Suno Download, MP3 Upscaler, Chrome Site Sources,
  Songfactory, Disk Reorg and Reddit Desk.
- **Who** the owner and each email on the Cloudflare Access allow list.
  Anyone else gets the Access login and no page.
- **How** a Worker in `apps/private` serves the page. Cloudflare Access
  guards the whole host, and the Worker checks the
  `Cf-Access-Jwt-Assertion` token itself, so a request that skips Access
  gets 403.
- **Data** one file, `apps/private/src/apps.ts`, holds each app: its name,
  its repo, the release file to serve and its line and steps in the 9
  languages. A new app is one entry.
- **Download** each app has a Download button. The Worker fetches the newest
  release file from GitHub with a read-only token and streams it, so the
  person needs no GitHub account and the repo stays private.
- **Out of search** no sitemap, no `llms.txt`, no catalog entry, a
  `noindex` tag and header, and `robots.txt` disallows `/private`.
- **Invite** an email goes on the allow list in the Zero Trust dashboard, as
  the README says, or through `apps/private/scripts/invite.ts` once the
  token has the Access permission.

## What it does for the person

- **Owner** opens the page, signs in with a one-time PIN sent to the email,
  and sees each private app with a Download button and install steps.
- **Invited person** gets the link, types the invited email, gets a PIN, and
  sees the same page.
- **Stranger** sees the Access login, and a PIN goes only to an email on the
  list.
- **Languages** the page picks the language from `?lang=` or the browser's
  `Accept-Language`, and a picker switches it.

## User flows

1. The owner adds a friend's email to the "Invited insiders" policy in the
   Zero Trust dashboard.
2. The owner sends the friend <https://insiders.workbench-soft.com/private/>.
3. The friend types the email on the Access page and gets a 6-digit PIN.
4. The friend types the PIN and lands on the page for 24 hours.
5. The friend presses Download, gets the newest file and follows the
   install steps.

## How it works: modules, files, data

- **`apps/private/src/index.ts`** the Worker: it checks the Access token,
  then answers `/private/` with the page and `/` with a redirect there.
- **`apps/private/src/download.ts`** answers `/private/download/<id>`: it
  asks the GitHub API for the newest release of the app, or the newest one
  whose tag starts with `tagPrefix`, picks the asset whose name matches
  `asset`, or else the source zip of that tag, and streams it with a
  `Content-Disposition` file name. The token is the Worker secret
  `GITHUB_TOKEN`, a fine-grained token with Contents read on the listed
  repos, kept in Bitwarden as `WORKBENCH_SOFT_GITHUB_IO_PRIVATE_GITHUB_TOKEN`.
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
- **No release** an app without a release, or a missing token, answers the
  Download button with a short page that says so.
- **Reddit Desk** its installer sits in the releases of this public repo,
  where its updater reads it, so its file is public anyway.
- **Free plan** Zero Trust Free covers 50 users. The checkout keeps the card
  on file for use past the free limits.
- **Token** the deploy token can deploy the Worker but has no Access
  permission, so the Access app and policy were made in the dashboard. The
  scripts work once "Access: Apps and Policies Edit" is on the token.
- **Edge path** a request through the edge to `/private` would skip Access,
  so the Worker answers it 403 until an Access app also covers that path.

## Changes

### 2026-11-25 A private page for insiders

- **Why** the owner wants a page only they and the people they invite can
  open, for apps like Suno Download that stay off the public site.
- **Changes** a new `apps/private` Worker, its CI workflow, a line in
  `registry.json`, a `robots.txt` disallow, the Access setup and invite
  scripts, and the invite steps in the README.
- **Steps** the spec, then the Worker and its tests, then Zero Trust Free
  with the team `workbench-soft`, the "Invited insiders" policy and the
  Access app in the dashboard, then the deploy and a check with an invited
  email and an anonymous request.
- **Docs** `README.md`, `apps/private/README.md`, `CHANGELOG.md`.

### 2026-11-25 Download from the page, and more private apps

- **Why** an invited friend has no access to the private repos, so the
  release link failed. The owner also wants the other private tools listed.
- **Changes** `src/download.ts` and its route, a Download button in place
  of the release link, the `download` and `noRelease` strings in 9
  languages, four new entries in `src/apps.ts`, and a person script that
  stores the GitHub token in Bitwarden and the Worker.
- **Steps** the spec, then the route and its tests, then the entries, then
  the token, the deploy and a download check.
- **Docs** `README.md`, `CHANGELOG.md`, `TODO.md`.
