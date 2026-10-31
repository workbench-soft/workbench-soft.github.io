# Features

The features of https://workbench-soft.github.io. The Memories site and the Langflip page have their own folders.

## Hero

- **What it does** names the studio and what it builds, with a button that starts an email and counts of projects, features and platforms.
- **Where** the top of the home page. A WebGL2 shader draws a moving grid terrain behind the text, and the pointer tilts it.
- **Limits** a browser without WebGL2 shows a still gradient. The terrain stops while the hero is off screen and under reduced motion.

## Services

- **What it does** lists the kinds of work a client can order. Each card links to the projects that show that work.
- **Where** the Services link in the header.
- **Limits** the cards hold no prices.

## Projects

- **What it does** gives each project a panel: what it does, the platforms, the stack, links and each of its features.
- **Where** the Projects link in the header. The index above the panels jumps to a project and shows its feature count.
- **Filter** chips show all projects, the apps, the developer tools or the archive.
- **Limits** links go to the public sites, the install pages and the releases page. The code repos are private.

## Search

- **What it does** finds a project or a feature by any word of its name or text, then scrolls to it and lights it up.
- **Where** `Ctrl+K`, `Cmd+K` or `/`, and the Search buttons. The arrow keys move through the results, and Enter opens one.
- **Limits** words in the language of the page, up to 40 results.

## Languages

- **What it does** shows the whole page in English, Russian, German, French, Spanish, Chinese (Simplified), Japanese, Korean or Norwegian Bokmål.
- **Where** the globe button in the header opens a menu with each language in its own name. English sits at `/`, the others at `/ru/`, `/de/`, `/fr/`, `/es/`, `/zh/`, `/ja/`, `/ko/` and `/nb/`.
- **Search engines** each page names the other 8 as `hreflang` alternates, and `sitemap-index.xml` lists all 9.
- **Limits** app, stack and platform names stay in English. The page doesn't follow the browser language on its own. The Memories site, the Langflip page and the games keep their own languages.

## Process and contact

- **What it does** shows the 4 steps a project goes through, then the email address with buttons to write or copy it.
- **Where** the Process and Contact links in the header.
- **Limits** contact is by email only.

## Motion and access

- **Scroll** blocks rise in as they enter the screen, and a bar at the top shows how far the page has scrolled.
- **Reduced motion** the system setting turns off the shader motion, the headline decode, the counters and the reveals.
- **Keyboard** a skip link jumps to the projects. Each button and link shows a focus ring.

## Langflip page

- **What it does** names what people search for, переключатель раскладки and аналог Punto Switcher, says how the fix works, and answers 5 questions in a FAQ that search engines read as `FAQPage` data.
- **Where** `/langflip/`, in Russian, from the Download link of the Langflip panel on the home page. `sitemap-index.xml` lists it.
- **Limits** no 1200×630 image yet, so a shared link shows text alone. The page is a static file in `langflip/`, outside the Astro build.
