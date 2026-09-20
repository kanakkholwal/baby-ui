# @baby-ui/site

The docs site. SvelteKit on Cloudflare Workers, deployed to `baby-ui.nexonauts.com`.

```sh
pnpm dev      # from the repo root
pnpm build
pnpm size     # gzipped Worker bundle against its budget
```

`wrangler.jsonc` carries `main` and `assets`, which is what puts `adapter-cloudflare`
into Workers mode. Remove them and it builds for Pages instead.

Deployment, including the second Cloudflare project that serves the registry JSON, is
described in [DEPLOYMENT.md](../../DEPLOYMENT.md).
