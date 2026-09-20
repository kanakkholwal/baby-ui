# Deployment

Two Cloudflare projects, one repo, one build.

| | Project | Kind | Serves |
| --- | --- | --- | --- |
| Docs | `baby-ui-site` | Worker | `baby-ui.nexonauts.com` |
| Registry | `baby-ui` | Pages | `baby-ui.pages.dev` |

A single Cloudflare project cannot own both hostnames: `*.pages.dev` belongs to Pages and
`*.workers.dev` to Workers. Two projects, deployed by one workflow, is the way to get both.

They are deployed from the same commit in the same job, so the docs can never describe a
registry that is not live yet.

## Why split at all

`shadcn add` traffic is static JSON. On Pages it costs no Worker invocations, caches at the
edge on its own, and stays up while the docs site is being redeployed. The Worker only
handles what actually needs rendering.

The site also keeps its own copy of `/r` and `/svelte/r`, so `baby-ui.nexonauts.com/r/button.json`
works as a fallback. `baby-ui.pages.dev` is the documented origin.

## One-time setup

1. **Worker.** `cd apps/site && pnpm exec wrangler deploy` creates `baby-ui-site`. The
   `routes` entry in `wrangler.jsonc` attaches `baby-ui.nexonauts.com`, which requires
   `nexonauts.com` to be a zone on the same Cloudflare account.
2. **Pages.** `cd apps/registry && pnpm exec wrangler pages deploy` creates the `baby-ui`
   Pages project and its `baby-ui.pages.dev` hostname.
3. **Secrets.** Add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` to the repository's
   `production` environment. The token needs *Workers Scripts: Edit*, *Cloudflare Pages: Edit*
   and *Workers Routes: Edit*.

## Origins

Both are baked into the emitted JSON at build time, so they are build inputs, not runtime config.

| Variable | Default | Appears in |
| --- | --- | --- |
| `BABY_UI_SITE_URL` | `https://baby-ui.nexonauts.com` | each item's `meta.docs`, `registry.json` `homepage` |
| `BABY_UI_REGISTRY_URL` | `https://baby-ui.pages.dev` | `llms.txt` endpoints and install commands |

Change a hostname in exactly two places: `.github/workflows/deploy.yml` and the defaults in
`packages/registry-build/src/config.ts`.

## Bundle budget

`pnpm size` fails the build above 2.6 MiB gzipped. Cloudflare's own ceiling is 3 MiB on the
free plan and 10 MiB on paid; the current bundle is **2.11 MiB**, and most of it is
`sources.json`, which is inlined and grows with every component.

When it crosses the budget, the fix is to stop inlining: write `sources.json` per slug into
`static/` and fetch it through the `ASSETS` binding instead of importing it.

## Workflows

- `ci.yml` — every PR and every non-main branch: lint, gates, type-check, build, budget.
- `deploy.yml` — pushes to `main` and manual runs: the same, then both deploys, then a
  smoke test that four URLs across both origins return 200.
