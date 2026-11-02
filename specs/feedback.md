# Order form on workbench-soft.com

## What it does for the person

- **Order on the page** the Contact section at the bottom of every language
  is a form: what to build, an email for the reply and an optional name. Send
  posts it from the site, and the form says it reached the studio.
- **Always in reach** an Order button stays in the bottom right corner at
  any scroll point. It scrolls to the form and puts the cursor in the message
  box. It hides while the form is on screen.
- **Other ways in** Start a project in the hero, Contact in the header and
  `/#contact`, `/#order` or the old `/#feedback` all lead to the form.
- **Email as a backup** a line under the form gives the studio address with a
  copy button, for people who prefer their own mail app.

## User flows

1. The person presses Order in the corner, Start a project, Contact, or opens
   a `#order` link.
2. The page scrolls to the form with the cursor in the message box.
3. The person describes the app, gives an email and, if they want, a name.
4. Send, or `Ctrl+Enter`, posts the form. A line says it reached the studio
   and the form clears. On a failure the line gives the studio address.

## How it works: modules, files, data

- **`src/components/Contact.astro`** the section, the form, the corner
  button and their script, rendered once per page from `[...lang].astro`.
- **Delivery** the script posts JSON to
  `https://formsubmit.co/ajax/hello@workbench-soft.com`. FormSubmit mails it
  to `hello@workbench-soft.com`, and Cloudflare Email Routing forwards that
  to the studio Gmail. The mail subject is "Order from workbench-soft.com" and
  it holds the message, the email, the name, the page language and address.
  The person sees only the site's own form.
- **Reply** the email field is required and goes as `_replyto`, so Reply in
  Gmail answers the person.
- **Spam** a hidden `_honey` field drops bots, and `_captcha` stays off
  since the post goes through fetch.
- **Text** the strings sit under `contact` in each of the 9 catalogs.
- **Why FormSubmit** the site is static on GitHub Pages and the studio rule
  puts "no server" first. FormSubmit is free, needs no account and no key,
  and mails the studio address the site already shows. A Rust Worker with
  the Email Routing binding would cost a deploy and a secret for one form.

## Limits

- **Activation** FormSubmit holds the first post from each site address,
  such as `https://workbench-soft.com/`, until someone presses Activate Form
  in its mail to `hello@workbench-soft.com`. A post from `localhost` asks for
  its own activation.
- **Third party** the message passes through FormSubmit's servers.
- **Main site only** the Games, Langflip, Memories and Media Organizer pages
  keep their own layouts. They MAY link to `/#order`.

## Changes

### 2026-11-02 A feedback form reachable from any point of the site

- **Why** the person asked for a feedback form on the public site, easy to
  see from anywhere on it. The site only had a mailto link.
- **Changes** `src/components/Feedback.astro` is new. `[...lang].astro`
  renders it and gets a footer link. Each catalog gets a `feedback` block.
- **Steps** this spec, then the component and the catalogs, then the docs.
- **Docs** `docs/features.md` gets a Feedback heading, `docs/user-flows.md`
  a flow, and `CHANGELOG.md` a line. The site has no project entry of its own, so
  `projects.ts` stays as it is.

### 2026-11-02 Orders in place of feedback, sent from the Contact section

- **Why** the person wants orders, not feedback. The form belongs at the
  bottom in place of the mailto buttons, the corner button leads there, and
  email stays only as a backup.
- **Changes** `Contact.astro` holds the form, the corner Order button and
  the script, taken from `Feedback.astro`, which goes. The email field turns
  required and a name field joins. The hero Start a project button links to
  `#contact`. The footer Feedback link goes. The `feedback` catalog block
  merges into `contact`.
- **Steps** this spec, then the component and the catalogs, then the docs.
- **Docs** `docs/features.md` renames Feedback to Order form,
  `docs/user-flows.md` rewrites its flow, `CHANGELOG.md` gets a line.
