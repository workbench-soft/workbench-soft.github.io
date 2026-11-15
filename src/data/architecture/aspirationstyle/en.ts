import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'A static Astro site on GitHub Pages, edited through a Git based admin. One Rust Worker on Cloudflare signs Maria in and draws the AI pictures.',
  parts: [
    { name: 'Astro', role: 'builds each page to static HTML and each photo to AVIF or WebP sizes.' },
    { name: 'GitHub Pages', role: 'serves the site from a public build repo, free and fast in Russia.' },
    { name: 'Sveltia CMS', role: 'the admin, which saves each change as a commit to the private source repo.' },
    { name: 'Rust Worker', role: 'signs admins in by an emailed code and checks their repo access for the AI page.' },
    { name: 'Workers AI', role: 'runs the FLUX.2 models that draw the interiors.' },
    { name: 'FormSubmit', role: 'mails each order form to Maria with no account or server.' },
    { name: 'GitHub Actions', role: 'checks each change, builds the site and pushes it to the public repo.' },
  ],
  flow: [
    "A visitor's browser asks GitHub Pages for a page.",
    'Pages sends static HTML and photos in the sizes the layout needs.',
    'The order form posts to FormSubmit, which mails Maria.',
    "Maria's edits land as commits, and the site rebuilds in 2 minutes.",
  ],
  links: [
    { to: 'GitHub', text: 'Holds the private source and the public build repo, and serves the pages.' },
    { to: 'Cloudflare', text: 'Runs the Worker, Workers AI and the email that carries the sign in code.' },
    { to: 'FormSubmit', text: 'Mails each order to Maria.' },
    {
      to: 'Yandex',
      text: 'Reads the structured data, and a Yandex rule in robots.txt folds the filter links into one page.',
    },
  ],
  design: {
    scale: [
      'A studio portfolio for visitors in Russia, with 16 galleries and about 270 photos.',
      'A few people edit it, so the site needs no server or database and each change is a commit.',
      'The AI page runs inside the Workers AI free tier of 10,000 neurons a day, and a picture takes about 3 to 15 seconds.',
    ],
    data: [
      'Each gallery is a folder with an index.md and its photos. Its front matter holds title, category, order, cover and captions.',
      'One settings.json holds the contacts, the home page texts and the font pick. A zod schema checks it and the galleries at build time.',
      "The sign in codes aren't stored. Each one is an HMAC of the email and a 10 minute window.",
    ],
    interfaces: [
      'The Rust Worker serves GET /auth, POST /auth/code, POST /auth/verify and POST /generate.',
      'The admin writes through the GitHub API as commits. The order form posts to FormSubmit, which mails it.',
      '/generate takes a prompt, a model, a size from 256 to 1536 in steps of 64 and up to 2 reference photos as multipart form data.',
    ],
    reliability: [
      'The Worker names one allowed origin in the CORS header, since browsers reject a list. An error past that point goes out as JSON the admin page can show.',
      'A GitHub failure gets a retry note and not a no access message. A used up AI quota gets its own message.',
      'Each release rebuilds from the source, so a bad change is one commit to revert.',
    ],
    security: [
      'A person signs in with an emailed 6 digit code, 5 tries a minute per email, and the Worker hands the admin a fine grained repo token.',
      "/generate checks that the caller's token can push to the repo before it calls the model.",
      'The token goes only to a window on the allowed origins. Admin emails and tokens stay in Worker settings and secrets, out of the site.',
    ],
    performance: [
      'Astro writes each photo as AVIF or WebP in the sizes the layout needs, and GitHub Pages serves static HTML.',
      'The release keeps the Astro image cache between runs instead of redrawing all photos.',
      'A room photo shrinks to 512 px in the browser before upload. FLUX.2 klein drafts in about 3 seconds and dev takes about 15.',
    ],
    operations: [
      'Each push to main builds the site beside Checks, waits for Checks of the same commit, then pushes the pages to the public build repo.',
      "One release runs at a time, and a newer push cancels the stale one, so an old build can't overwrite a new one. Commits get date tags.",
      'The change shows about 2 minutes after a save. The Worker deploys with wrangler and has observability on.',
    ],
    tradeoffs: [
      'GitHub Pages from a public build repo over Cloudflare Pages, since Russian providers slow Cloudflare down, at the cost of two repos and a release token.',
      'A Git based admin over a hosted CMS, so there is no server or database, at the cost of a 2 minute wait for each change.',
      'FormSubmit over a Worker with email, since it is free and needs no account, at the cost of a service outside Russia.',
      'Workers AI with FLUX.2 over paid image APIs, since it reads Russian and fits the free tier, at the cost of slow pictures from Cloudflare.',
    ],
  },
  features: {
    Portfolio:
      'Each gallery is a folder of Markdown and photos in the repo. Astro builds the pages and the image sizes, and the filter runs in the browser.',
    'Order a design':
      'Each form posts to FormSubmit, which mails the request to Maria. The site keeps no server for it.',
    Admin:
      'Sveltia CMS runs on the admin page and commits each change to the repo. The Worker emails Maria a sign in code, then hands the admin a repo token.',
    Fonts:
      'The 10 fonts come from Fontsource and ship with the site. The pick sits in the site settings file, and the layout applies it on the next build.',
    'AI generator':
      "The admin page wraps Maria's Russian request and style in an English prompt. The Worker checks her GitHub access, then FLUX.2 on Workers AI draws the picture.",
    Search:
      'The Astro layout writes the title, description, share photo and structured data on each page. The build writes robots.txt, llms.txt and a sitemap with dates from git.',
  },
};

export default arch;
