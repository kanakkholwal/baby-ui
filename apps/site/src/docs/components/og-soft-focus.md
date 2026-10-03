---
title: OG Soft Focus
description: A 1200x630 brand card with the wordmark on a soft, out-of-focus dark form and ripple rings, rendered to PNG with takumi.
component: og-soft-focus
category: og-images
tags: [og, open graph, social card, brand, blur, wordmark]
---

A monochrome card with depth: a blurred dark form crosses the canvas behind the mark while
ripple rings fade in from two corners. Built from blur, repeating radial gradients and masks only.
`mode` inverts it to a pale form on dark grey.

## Render it to PNG

Register each font under the family name your `--font-*` tokens use; on a mismatch takumi
silently falls back to the first font and the PNG stops matching the page.

Install the renderer once: `pnpm add takumi-js`.

SvelteKit, `src/routes/og/brand/+server.ts`:

```ts
import { render } from "svelte/server";
import { googleFonts } from "takumi-js/helpers";
import { ImageResponse } from "takumi-js/response";
import OgSoftFocus from "$lib/components/og/og-soft-focus/og-soft-focus.svelte";
import css from "../../../app.css?inline";

const fonts = googleFonts({ families: [{ name: "Inter", weight: [400, 600] }] });

export async function GET() {
	const { head, body } = render(OgSoftFocus, { props: { name: "Acme" } });
	return new ImageResponse(head + body, { width: 1200, height: 630, css, fonts: await fonts });
}
```

Next.js has no inline CSS import, so compile your stylesheet once (add it to your build script):
`npx @tailwindcss/cli -i app/globals.css -o og.css`. Then `app/og/brand/route.tsx`:

```tsx
import { readFile } from "node:fs/promises";
import { googleFonts } from "takumi-js/helpers";
import { ImageResponse } from "takumi-js/response";
import { OgSoftFocus } from "@/components/og/og-soft-focus/og-soft-focus";

const fonts = googleFonts({ families: [{ name: "Inter", weight: [400, 600] }] });

export async function GET() {
	const css = await readFile("og.css", "utf8");
	return new ImageResponse(<OgSoftFocus name="Acme" />, {
		width: 1200,
		height: 630,
		css,
		fonts: await fonts,
	});
}
```

Pass the brand name as `og:image:alt`. The logo must be an absolute PNG, SVG or WebP URL.
