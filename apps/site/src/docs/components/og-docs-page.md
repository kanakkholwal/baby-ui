---
title: OG Docs Page
description: A 1200x630 documentation card with breadcrumb, title, description and a code or terminal window, rendered to PNG with takumi.
component: og-docs-page
category: og-images
tags: [og, open graph, social card, docs, documentation]
---

A fixed 1200x630 canvas built from flex layout and your theme tokens, so it renders the same in
the browser and in [takumi](https://takumi.kane.tw). Title clamps to three lines, description to
three, each snippet line to one. `motif` picks an editor window or an always-dark terminal;
without `snippet` the window draws placeholder bars.

## Render it to PNG

Register each font under the family name your `--font-*` tokens use; on a mismatch takumi
silently falls back to the first font and the PNG stops matching the page.

Install the renderer once: `pnpm add takumi-js`. Point `og:image` at the route with the page's
fields in the query string.

SvelteKit, `src/routes/og/docs/+server.ts`:

```ts
import { render } from "svelte/server";
import { googleFonts } from "takumi-js/helpers";
import { ImageResponse } from "takumi-js/response";
import OgDocsPage from "#lib/components/og/og-docs-page/og-docs-page.svelte";
import css from "../../../app.css?inline";

const fonts = googleFonts({ families: [{ name: "Inter", weight: [400, 600, 700] }] });

export async function GET({ url }) {
	const { head, body } = render(OgDocsPage, {
		props: {
			title: url.searchParams.get("title") ?? "",
			section: url.searchParams.getAll("section"),
			site: "Acme",
		},
	});
	return new ImageResponse(head + body, { width: 1200, height: 630, css, fonts: await fonts });
}
```

Next.js has no inline CSS import, so compile your stylesheet once (add it to your build script):
`npx @tailwindcss/cli -i app/globals.css -o og.css`. Then `app/og/docs/route.tsx`:

```tsx
import { readFile } from "node:fs/promises";
import { googleFonts } from "takumi-js/helpers";
import { ImageResponse } from "takumi-js/response";
import { OgDocsPage } from "@/components/og/og-docs-page/og-docs-page";

const fonts = googleFonts({ families: [{ name: "Inter", weight: [400, 600, 700] }] });

export async function GET(request: Request) {
	const params = new URL(request.url).searchParams;
	const css = await readFile("og.css", "utf8");
	return new ImageResponse(
		<OgDocsPage
			title={params.get("title") ?? ""}
			section={params.getAll("section")}
			site="Acme"
		/>,
		{ width: 1200, height: 630, css, fonts: await fonts },
	);
}
```

Pass the page title as `og:image:alt`. The logo must be an absolute URL.
