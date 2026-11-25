# Load speed of workbench-soft.com

## What it does for the person

A visitor on a phone over a slow network sees the page and can scroll it
sooner. The work touches only the shared layout, styles, fonts and the build,
so the app panels keep their text.

## How it works: modules, files, data

- **Measure** Lighthouse 12.8.2 in headless Chromium, mobile profile with its
  simulated slow 4G and 4x CPU. A small Node server serves `dist/` with gzip
  and `max-age=600`, as GitHub Pages does. Each page gets 1 warm-up and 5
  runs, the variant and the baseline take turns run by run, and the table
  gives the median.
- **Pages** the home page, `/about/`, `/testers/` and
  `/skyaltar/astrology/`.

## Limits

- **Headers** GitHub Pages sets `Cache-Control: max-age=600` on every file
  and takes no custom headers, so long caching of the hashed `_astro/` files
  stays out of reach.
- **Shader** the hero shader runs on the CPU in headless Chromium, so its cost
  in TBT reads higher than on a phone GPU.

## Changes

### 2026-11-25 performance pass

Baseline, median of 5 runs:

| Page                   | FCP   | LCP   | TBT    | CLS | Bytes  |
| ---------------------- | ----- | ----- | ------ | --- | ------ |
| `/`                    | 2.4 s | 3.9 s | 3.8 s  | 0   | 213 KB |
| `/about/`              | 0.8 s | 2.1 s | 0 ms   | 0   | 73 KB  |
| `/testers/`            | 0.8 s | 2.1 s | 56 ms  | 0   | 74 KB  |
| `/skyaltar/astrology/` | 0.8 s | 2.2 s | 200 ms | 0   | 77 KB  |

- **Home page** 8,960 DOM nodes, 652 KB of them in the project panels. Style,
  layout and paint of the whole list make one 5.5 s task.
- **Inner pages** the LCP is text, and 79% of it is render delay behind the
  two preloaded fonts, 54 KB together.

#### Kept: the visit counter loads after the first paint

The Cloudflare beacon in `src/layouts/Base.astro` used to load with `defer`.
Its connection to `static.cloudflareinsights.com` sat on the LCP path, so the
text waited for a second host. The counter now loads once the page has both
painted and fired `load`. It still sends its report.

Before against after, 6 runs each in turns (median):

| Page                   | LCP before | LCP after | FCP before | FCP after | CLS | Bytes  |
| ---------------------- | ---------- | --------- | ---------- | --------- | --- | ------ |
| `/about/`              | 2.13 s     | 1.41 s    | 1.44 s     | 0.81 s    | 0   | 73 KB  |
| `/testers/`            | 2.31 s     | 1.37 s    | 0.82 s     | 0.77 s    | 0   | 74 KB  |
| `/skyaltar/astrology/` | 2.28 s     | 1.36 s    | 0.81 s     | 0.76 s    | 0   | 77 KB  |
| `/`                    | 3.58 s     | 2.87 s    | 2.06 s     | 1.87 s    | 0   | 213 KB |

- **Inner pages** every after run beats every before run.
- **Home page** the runs overlap, from 2.4 to 4.0 s before and 2.4 to 3.6 s
  after, so the home gain sits inside the noise. TBT there ranges from 0.4 to
  7.3 s on both builds.

#### Tried and reverted

- **`content-visibility: auto` on the project panels** it cut paint time, yet
  home LCP and TBT moved only inside the noise.
- **Async shader compile** through `KHR_parallel_shader_compile` in
  `src/scripts/field.ts`: inside the noise.
- **No preload of the mono font** FCP on `/about/` got worse, 1.1 s.
- **Counter deferred to `load` only** headless Chromium paints after `load`,
  so Lighthouse still counts the beacon on the LCP path. No gain.
- **Bound: home without the shader** TBT 1.9 s against 2.5 s, still inside the
  noise, so the shader stays.

#### Left

- **Home HTML weight** 695 KB raw, 134 KB gzip, mostly app text in the
  project panels. That text belongs to the app pages' own sessions.
- **Other pages with the beacon** `apps/games`, `langflip/` and the Jekyll
  app sites still load it with `defer`. They can take the same change.
