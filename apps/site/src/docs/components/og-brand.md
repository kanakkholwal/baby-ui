---
title: OG Brand
description: A 1200x630 brand card, logo and wordmark over one of eight backgrounds, rendered to PNG with takumi.
component: og-brand
category: og-images
tags: [og, open graph, social card, brand, logo, wordmark]
---

A fixed 1200x630 canvas built from flex layout and your theme tokens, so it renders the same in
the browser and in [takumi](https://takumi.kane.tw). Every variant keeps the wordmark centred.

- `plain`: nothing but the mark.
- `waves`: a lens-warped line field with centre hairlines.
- `pipes`: rounded bands from `--chart-1..5` entering from three edges, over a dot grid.
- `mesh`: blurred chart-colour blobs with a sheen; the wordmark turns white.
- `blur`: a soft dark form and ripple rings on grey.
- `scatter`, `mosaic`, `split`: `images` as tiles around the mark, masonry columns, or a curved panel.

## Render it to PNG

Install the renderer once: `pnpm add takumi-js`. Point `og:image` at the route.

SvelteKit, `src/routes/og/brand/+server.ts`:

```ts
import { render } from "svelte/server";
import { googleFonts } from "takumi-js/helpers";
import { ImageResponse } from "takumi-js/response";
import OgBrand from "$lib/components/og/og-brand/og-brand.svelte";
import css from "../../../app.css?inline";

const fonts = googleFonts({ families: [{ name: "Inter", weight: [400, 600] }] });

export async function GET() {
	const { head, body } = render(OgBrand, {
		props: { name: "Acme", logo: "https://acme.com/logo.png", variant: "waves" },
	});
	return new ImageResponse(head + body, { width: 1200, height: 630, css, fonts: await fonts });
}
```

Next.js has no inline CSS import, so compile your stylesheet once (add it to your build script):
`npx @tailwindcss/cli -i app/globals.css -o og.css`. Then `app/og/brand/route.tsx`:

```tsx
import { readFile } from "node:fs/promises";
import { googleFonts } from "takumi-js/helpers";
import { ImageResponse } from "takumi-js/response";
import { OgBrand } from "@/components/og/og-brand/og-brand";

const fonts = googleFonts({ families: [{ name: "Inter", weight: [400, 600] }] });

export async function GET() {
	const css = await readFile("og.css", "utf8");
	return new ImageResponse(<OgBrand name="Acme" variant="waves" />, {
		width: 1200,
		height: 630,
		css,
		fonts: await fonts,
	});
}
```

Pass the brand name as `og:image:alt`. Logos and images must be absolute PNG, SVG or WebP URLs:
an `.ico` fails the whole render.
