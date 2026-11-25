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

| Page                   | FCP    | LCP    | TBT    | CLS | Bytes  |
| ---------------------- | ------ | ------ | ------ | --- | ------ |
| `/`                    | 2.4 s  | 3.9 s  | 3.8 s  | 0   | 213 KB |
| `/about/`              | 0.8 s  | 2.1 s  | 0 ms   | 0   | 73 KB  |
| `/testers/`            | 0.8 s  | 2.1 s  | 56 ms  | 0   | 74 KB  |
| `/skyaltar/astrology/` | 0.8 s  | 2.2 s  | 200 ms | 0   | 77 KB  |

- **Home page** 8,960 DOM nodes, 652 KB of them in the project panels. Style,
  layout and paint of the whole list make one 5.5 s task.
- **Inner pages** the LCP is text, and 79% of it is render delay behind the
  two preloaded fonts, 54 KB together.
