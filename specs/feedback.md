# Feedback form on workbench-soft.com

## What it does for the person

- **Always in reach** a Feedback button stays in the bottom right corner of
  every page and every language, at any scroll point.
- **Short form** the button opens a dialog with a message box and an
  optional email for a reply. Send posts it, and the dialog says it went.
- **Other ways in** the footer has a Feedback link, and `/#feedback` (or
  `/<lang>/#feedback`) opens the dialog straight away, so other pages and
  apps can link to it.

## User flows

1. The person presses Feedback in the corner, the footer link, or opens a
   `#feedback` link.
2. The dialog opens with the cursor in the message box.
3. The person types the message and, if they want a reply, an email.
4. Send posts the form. The dialog shows "Thanks, it went" and the form
   clears. On a failure it shows the error and a link to email the studio.
5. Esc, the close button or a click outside closes the dialog.

## How it works: modules, files, data

- **`src/components/Feedback.astro`** the corner button, the dialog, the
  form and its script, rendered once per page from `[...lang].astro`.
- **Delivery** the script posts JSON to
  `https://formsubmit.co/ajax/hello@workbench-soft.com`. FormSubmit mails it
  to `hello@workbench-soft.com`, and Cloudflare Email Routing forwards that
  to the studio Gmail. The mail holds the message, the reply email, the page
  language and the page address.
- **Spam** a hidden `_honey` field drops bots, and `_captcha` stays off
  since the post goes through fetch.
- **Text** the strings sit under `feedback` in each of the 9 catalogs.
- **Why FormSubmit** the site is static on GitHub Pages and the studio rule
  puts "no server" first. FormSubmit is free, needs no account and no key,
  and mails the studio address the site already shows. A Rust Worker with
  the Email Routing binding would cost a deploy and a secret for one form.

## Limits

- **Activation** FormSubmit holds the first post until someone presses the
  link in its activation mail to `hello@workbench-soft.com`.
- **Third party** the message passes through FormSubmit's servers.
- **Main site only** the Games, Langflip, Memories and Media Organizer pages
  keep their own layouts. They MAY link to `/#feedback`.

## Changes

### 2026-11-02 A feedback form reachable from any point of the site

- **Why** the person asked for a feedback form on the public site, easy to
  see from anywhere on it. The site only had a mailto link.
- **Changes** `src/components/Feedback.astro` is new. `[...lang].astro`
  renders it and gets a footer link. Each catalog gets a `feedback` block.
- **Steps** this spec, then the component and the catalogs, then the docs.
- **Docs** `docs/features.md` gets a Feedback heading, `docs/user-flows.md`
  a flow, `CHANGELOG.md` a line, and the studio entry on the site lists it.
