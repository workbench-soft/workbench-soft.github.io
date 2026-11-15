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
  features: {
    'Sample library':
      'A Python script draws the photos with EXIF dates and some GPS points. They ship as static assets and fill the Durable Object on start.',
    'Sign in': 'The Worker checks one Basic auth user against a Worker secret. OPTIONS answers without a login.',
    'Uploads and sorting':
      'Uploads and moves land in a separate layer over the read only samples. A nightly cron deletes that layer, and the samples come back.',
  },
};

export default arch;
