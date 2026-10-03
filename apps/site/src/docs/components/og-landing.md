---
title: OG Landing
description: A 1200x630 product card in five layouts around one headline, rendered to PNG with takumi.
component: og-landing
category: og-images
tags: [og, open graph, social card, landing, product, hero]
---

A fixed 1200x630 canvas built from flex layout and your theme tokens, so it renders the same in
the browser and in [takumi](https://takumi.kane.tw).

- `streaks`: brand top left, headline bottom left closed by a `tone` period, light streaks and a spark.
- `showcase`: headline left, two offset columns of framed screenshots right.
- `picker`: a lead word, a vertical `words` list with the `active` one selected, and a `cta`.
- `screen`: headline left, one tilted screenshot right over a soft `tone` glow.
- `spotlight`: centred headline with the brand under it, `images` as portraits around.

## Render it to PNG

Install the renderer once: `pnpm add takumi-js`. Point `og:image` at the route with the page's
fields in the query string.

SvelteKit, `src/routes/og/landing/+server.ts`:

```ts
import { render } from "svelte/server";
import { googleFonts } from "takumi-js/helpers";
import { ImageResponse } from "takumi-js/response";
import OgLanding from "$lib/components/og/og-landing/og-landing.svelte";
import css from "../../../app.css?inline";

const fonts = googleFonts({ families: [{ name: "Inter", weight: [400, 500, 600] }] });

export async function GET({ url }) {
	const { head, body } = render(OgLanding, {
		props: { title: url.searchParams.get("title") ?? "", site: "Acme", tone: "chart" },
	});
	return new ImageResponse(head + body, { width: 1200, height: 630, css, fonts: await fonts });
}
```

Next.js has no inline CSS import, so compile your stylesheet once (add it to your build script):
`npx @tailwindcss/cli -i app/globals.css -o og.css`. Then `app/og/landing/route.tsx`:

```tsx
import { readFile } from "node:fs/promises";
import { googleFonts } from "takumi-js/helpers";
import { ImageResponse } from "takumi-js/response";
import { OgLanding } from "@/components/og/og-landing/og-landing";

const fonts = googleFonts({ families: [{ name: "Inter", weight: [400, 500, 600] }] });

export async function GET(request: Request) {
	const title = new URL(request.url).searchParams.get("title") ?? "";
	const css = await readFile("og.css", "utf8");
	return new ImageResponse(<OgLanding title={title} site="Acme" tone="chart" />, {
		width: 1200,
		height: 630,
		css,
		fonts: await fonts,
	});
}
```

Pass the headline as `og:image:alt`. Logos and images must be absolute PNG, SVG or WebP URLs.
