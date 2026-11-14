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
    Search:
      'Astro writes the title, description, photo card and structured data into each page at build time. The sitemap comes from the pages the build renders.',
  },
};

export default arch;
