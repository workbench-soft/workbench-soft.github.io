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
