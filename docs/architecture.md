# Architecture

The repo serves https://workbench-soft.github.io from GitHub Pages. The site has no server and no outside service at run time, apart from Google Fonts.

## Parts

| Part | Folder | Built by |
| --- | --- | --- |
| Home page | `src/` | Astro, into `dist/` |
| Memories site | `memories-mobile/` | Jekyll |
| Langflip page | `langflip/` | copied as is |
| Root files | `app-ads.txt`, `robots.txt` | copied as is |

```mermaid
flowchart LR
  data["src/data<br/>projects, services, steps"] --> pages["src/pages/index.astro"]
  components["src/components"] --> pages
  scripts["src/scripts/field.ts<br/>WebGL2 shader"] --> components
  pages --> astro["astro build"] --> dist["dist/"]
  jekyll["memories-mobile/"] --> jb["Jekyll build"] --> site["_site/"]
  dist --> site
  root["langflip/, app-ads.txt, robots.txt"] --> site
  site --> pages_["GitHub Pages"]
```

## Home page

- **Data** `src/data/projects.ts` holds each project with its features in groups. `src/data/studio.ts` holds the services, the process steps, the stack and the email.
- **Components** one Astro file per block: `Nav`, `Hero`, `Marquee`, `Services`, `Projects` with `ProjectPanel`, `Process`, `Contact` and `Palette`.
- **Scripts** each component bundles its own TypeScript. `field.ts` draws the hero terrain. The palette builds its index from the rendered panels, so it finds what the page shows.
- **Styles** `src/styles/global.css` holds the colours, buttons and the reveal. Each component keeps its own scoped styles.
- **Counts** the hero counts come from the data at build time, so the HTML holds them before any script runs.

## A visit

```mermaid
sequenceDiagram
  participant B as Browser
  participant P as GitHub Pages
  participant F as Google Fonts
  B->>P: GET /
  P-->>B: index.html, CSS, scripts
  B->>F: fonts
  B->>B: WebGL2 shader draws the hero
  B->>B: scroll timelines reveal the blocks
```

## Deploy

1. A push to `main` starts [pages.yml](../.github/workflows/pages.yml).
2. mise installs node and pnpm from `mise.toml`, then pnpm installs the packages.
3. `mise run check` and `mise run build` write `dist/`.
4. Jekyll builds the Memories site into `_site/memories-mobile`.
5. The job copies `dist/`, `langflip/` and the root files into `_site/` and publishes it.

## workbenchsoft.com and the apps

The domain sits behind the edge Worker in [apps/edge](../apps/edge/). [registry.json](../registry.json) lists which app owns each top path, and every other path comes from this site on GitHub Pages.

```mermaid
flowchart LR
  B[Browser] --> E[Edge Worker]
  E -- /games/* --> G[Games Worker<br/>apps/games]
  E -- other paths --> P[GitHub Pages<br/>this site]
```

- **Apart** each app in `apps/` has its own packages, checks and deploy in the [Games workflow](../.github/workflows/games.yml). This site's build leaves `apps/` out.
- **Games** [apps/games/docs/architecture.md](../apps/games/docs/architecture.md) describes the rooms and the games.