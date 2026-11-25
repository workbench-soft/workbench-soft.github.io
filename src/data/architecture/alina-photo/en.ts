import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'One Cloudflare Worker in Rust serves the static Astro pages and the API. D1 keeps the bookings and settings, and R2 keeps the photos.',
  parts: [
    { name: 'Astro', role: 'builds the static pages, the head tags and the sitemap.' },
    { name: 'Rust Worker', role: 'answers the API for photos, bookings, sign in, galleries and the calendar feed.' },
    { name: 'booking-core', role: 'the Rust crate that works out the free times, the sunset and the iCal text.' },
    { name: 'D1', role: 'holds the photo list, the bookings, the galleries, the settings and the sign in sessions.' },
    { name: 'R2', role: 'holds the resized photos, the gallery files and an uploaded font.' },
    {
      name: 'Email Routing',
      role: 'sends Alina the bookings and questions, and sends the admins their sign in links.',
    },
    {
      name: 'Browser scripts',
      role: "resize, edit and watermark photos and build the zip on the person's own device.",
    },
    {
      name: 'Google Calendar',
      role: 'its private iCal address marks busy times, and it reads the bookings feed back.',
    },
  ],
  flow: [
    'A client opens a page, served as static HTML by the Worker.',
    'The page asks the Worker API for photos or free times.',
    "The Worker reads D1 and Alina's calendar, and booking-core finds free times.",
    'A new booking goes to D1 and to Alina by email with a calendar file.',
    'Photos load from R2 in 2 sizes.',
  ],
  links: [
    {
      to: 'Google Calendar',
      text: 'Busy times come in as iCal, cached for 5 minutes. A private feed sends each booking back.',
    },
    { to: 'Cloudflare', text: 'Runs the Worker, D1, R2, Email Routing and the rate limit on the forms.' },
    { to: 'GitHub', text: 'A release runs the D1 migrations and deploys once the checks pass on main.' },
  ],
  design: {
    scale: [
      "One photographer's studio site: clients book and open galleries, and Alina runs an admin area. Traffic is small.",
      'Each photo is stored in 2 sizes, 2400 px and 800 px, and a 25 MB camera file uploads as under 1 MB.',
      'A Worker request has a few milliseconds of CPU and the wasm build is about 2.5 MB, which pushed heavy work into the browser.',
    ],
    data: [
      'D1 holds photos, bookings, settings, sessions, login_links, galleries and gallery_files. Times sit in UTC text, so text order is time order.',
      'Settings rows are JSON with no version. A row that no longer parses falls back to the default and logs an error.',
      'R2 holds the photos as p/<id>/l.webp and s.webp, an uploaded font, and gallery files under g/<gallery>/ as proof, 160 px thumbnail and original.',
    ],
    interfaces: [
      'The Worker serves JSON under /api for days, slots, bookings, photos, galleries and sign in, and a calendar feed at /calendar/<token>.ics.',
      "Calendar in is Alina's secret iCal address, cached for 5 minutes. Calendar out is the bookings feed, and each booking email carries booking.ics.",
      "Email leaves through the send_email binding of Email Routing, to Alina's verified address only.",
      'booking-core is a Rust crate for slots, the booking recheck, sunset times and iCal, with the rrule crate for repeating events.',
    ],
    reliability: [
      'A booking POST rechecks that the slot is still free, so a slot taken after the list loaded is refused.',
      'A subscribed calendar feed lags by hours, so each booking email also carries the iCal file.',
      "Expired sessions and login links are deleted from D1, and a stored test keeps today's settings rows parsing.",
      'Release migrates D1 and deploys, and Cloudflare timeouts get 3 tries for the migrations and for the deploy.',
    ],
    security: [
      'Sign in is an emailed link valid for 15 minutes. It opens a page that POSTs the token, since mail scanners open GET links.',
      'A session lasts 30 days in an HttpOnly, SameSite Lax cookie, and D1 stores only the hash of the token.',
      'A Workers rate limit binding allows 5 calls a minute per IP on the forms that book or send email.',
      'The gallery id sits in the link hash, so it stays out of server logs and referrers. Anyone with the link sees the gallery.',
    ],
    performance: [
      'The browser resizes each photo to 2 sizes before upload, so a 25 MB file goes up as under 1 MB with GPS data gone.',
      "client-zip builds the gallery zip in the browser, since the Worker can't read gigabytes within its CPU limit.",
      'Pages are static Astro HTML served by the Worker, and the calendar text is cached for 5 minutes.',
    ],
    operations: [
      'One Worker serves the pages and the API. worker-build turns the Rust into wasm, and mise pins Rust, Node and pnpm.',
      'Release starts on workflow_run once Checks pass on main, one run at a time: build, D1 migrations, deploy, tag.',
      'Migrations are numbered SQL files in migrations/. Lint covers oxlint, oxfmt, tsc, knip, rustfmt, clippy for the PC and for wasm, and cargo shear.',
    ],
    tradeoffs: [
      'One Worker for pages and API over GitHub Pages plus a Worker, so the admin cookie works on one origin with no CORS.',
      'Email link sign in over a password or Cloudflare Access, so Alina has no password to forget and no Zero Trust setup is needed.',
      'iCal in and out over the Google Calendar API, so no OAuth app, review or token refresh is needed, but a feed lags by hours.',
      "Resize, watermark and zip in the browser over the Worker, which has too little CPU, at the cost that a proof can't be re-watermarked without its original file.",
    ],
  },
  features: {
    Portfolio:
      'The page loads the photo list from the Worker, which reads it from D1. Each photo comes from R2 in 2 WebP sizes, 800 and 2400 px.',
    Booking:
      "booking-core in Rust works out the free times from Alina's hours, the bookings in D1 and her busy calendar times. It marks golden hour from the sunset.",
    Questions:
      'The form posts to the Worker, which emails Alina through Cloudflare Email Routing. She replies to the client straight from that email.',
    Admin:
      'The Worker emails a sign in link and keeps the session in D1. Photos shrink to 2400 px and lose GPS data in the browser before they go to R2.',
    'Calendar sync':
      "The Worker reads the private iCal address of Alina's Google Calendar and caches it for 5 minutes. A private feed and a file in each booking email carry the bookings back.",
    Fonts:
      'The 10 fonts ship with the site, and an uploaded one goes to R2. The Worker serves a theme stylesheet from the pick in D1, cached for 1 minute.',
    'Client galleries':
      "The browser draws the watermark on each proof before upload, and R2 keeps the proofs and originals. The client's browser builds the zip of originals with client-zip.",
    Reviews:
      'The Worker keeps each review in D1 as pending, behind a honeypot and a rate limit, and emails Alina. Only approved rows leave through the API, and the page adds Review and AggregateRating data.',
    Search:
      'Astro writes the title, description, photo card and structured data into each page at build time. The sitemap comes from the pages the build renders.',
  },
};

export default arch;
