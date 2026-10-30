# Edge

The Worker on workbenchsoft.com. It hands each request to the app that owns the path, as `registry.json` at the repo root lists.

- **Apps** `/games` goes to the `workbench-games` Worker through a service binding.
- **Public site** every other path goes to GitHub Pages, which `pages.yml` builds from the repo root. Redirects from Pages keep the visitor on workbenchsoft.com.
- **ads.txt** AdSense reads `/ads.txt`, and the edge answers it with the root `app-ads.txt`, since both hold the same publisher line.
- **www** `www.workbenchsoft.com` redirects to the bare domain.

## Add an app

1. Give the app its own folder in `apps/` and a Worker of its own.
2. Add a line to `registry.json` with its path, its binding name and its Worker name.
3. Add the binding to `services` in `wrangler.jsonc`, then deploy the app before the edge.

## Run, check, deploy

```bash
mise x -- pnpm test
```

- **Types** `mise x -- pnpm typecheck`.
- **Deploy** `mise x -- pnpm deploy`. The domain's DNS has to sit on Cloudflare first.
