import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'A Cloudflare Worker in TypeScript speaks the WebDAV methods Memories sends. One Durable Object keeps the files in its SQLite storage on the free plan.',
  parts: [
    { name: 'Cloudflare Worker', role: 'checks the Basic login and passes each WebDAV request on.' },
    { name: 'Durable Object', role: 'one store for the whole tree, with files in 1 MB chunks in its SQLite.' },
    { name: 'Static assets', role: 'carry the sample photos with the Worker and fill the store on each start.' },
    { name: 'Python sample script', role: 'draws the 42 synthetic photos and 2 videos with EXIF dates and GPS.' },
    { name: 'Cron trigger', role: 'deletes the upload layer each night at 03:00 UTC.' },
  ],
  flow: [
    'The app sends a WebDAV request with a Basic login.',
    'The Worker checks the login and forwards the request to the Durable Object.',
    'A read looks in the upload layer first, then in the samples.',
    'The app gets a folder listing or the bytes of the range it asked for.',
  ],
  links: [
    { to: 'memories', text: 'The Google Play reviewer types this server into the Memories connect screen.' },
    { to: 'Google Play', text: 'The App access notes give the reviewer the address and the login.' },
    { to: 'Cloudflare', text: 'The free Workers plan runs it, and CI deploys it once the checks pass.' },
  ],
  design: {
    scale: [
      'One shared demo library for Google Play reviewers: 42 photos, 2 videos and one login.',
      'One Durable Object takes every request, so all reviewers share one copy on the free Workers plan.',
    ],
    data: [
      'Files sit in 1 MB chunks in the SQLite storage of the Durable Object, below the 2 MB row cap.',
      "Samples under base/ stay read only. A client's uploads and folders go to Uploads/, with markers for deletes and moves.",
      'A JSON file holds the EXIF date of each sample, which PROPFIND reports as the last modified time.',
    ],
    interfaces: [
      'WebDAV only as far as the app needs: OPTIONS, PROPFIND at Depth 0 or 1, ranged GET and HEAD, PUT, MKCOL, MOVE and DELETE.',
      'LOCK answers 405 and PROPFIND at Depth infinity answers 403.',
      'The Worker forwards each request to the Durable Object, which offers head, ranged get, put, delete and list calls.',
    ],
    reliability: [
      'A daily cron at 03:00 UTC deletes Uploads/, so the demo returns to the samples.',
      'On each start the Durable Object brings base/ in line with the sample list, so a half finished seed heals.',
      'A PUT stops reading past 50 MB, and a ranged GET loads only its chunks, to stay inside 128 MB of memory.',
    ],
    security: [
      'One Basic auth user is checked against a Worker secret. OPTIONS answers without a login.',
      'The sample files ship as static assets behind the Worker, so the login guards them too.',
      'The samples are synthetic, so no real person or place is exposed.',
    ],
    performance: [
      "A ranged GET reads only the chunks it needs, so a 50 MB file doesn't take 100 MB of memory.",
      'Sample dates come from a JSON file, so a PROPFIND needs no EXIF read.',
    ],
    operations: [
      'Checks run lint, the type check and unit tests on each push to main, and Deploy starts once they pass.',
      'Deploy builds the samples, runs the wrangler deploy through mise and tags the commit with a date version.',
      'It stops when the sample folder and the date list disagree, or when the Cloudflare token is missing.',
      'One deploy runs at a time, and a newer waiting one replaces an older one.',
    ],
    tradeoffs: [
      'Durable Object SQLite over R2, since R2 needs a payment card and the free plan covers the Durable Object.',
      'A write layer over read-only samples over writes into them, so a reset is one prefix delete.',
      'Synthetic photos over real ones, so a stranger sees no real people or places.',
      'A TypeScript Worker now over Rust, to ship first. The org stack plans a move to workers-rs.',
    ],
  },
  features: {
    'Sample library':
      'A Python script draws the photos with EXIF dates and some GPS points. They ship as static assets and fill the Durable Object on start.',
    'Sign in': 'The Worker checks one Basic auth user against a Worker secret. OPTIONS answers without a login.',
    'Uploads and sorting':
      'Uploads and moves land in a separate layer over the read only samples. A nightly cron deletes that layer, and the samples come back.',
  },
};

export default arch;
