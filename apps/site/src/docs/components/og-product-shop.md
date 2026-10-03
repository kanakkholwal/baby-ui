---
title: OG Product Shop
description: A 1200x630 product card with product shot on a tinted panel, name, sale price, stars, reviews and stock, rendered to PNG with takumi.
component: og-product-shop
category: og-images
tags: [og, open graph, social card, product, ecommerce]
---

A fixed 1200x630 canvas built from flex layout and your theme tokens, so it renders the same in
the browser and in [takumi](https://takumi.kane.tw). Name clamps to three lines. Prices arrive
pre-formatted; `rating` draws to the nearest half star. `mode` picks a light or dark card, `tone`
tints the product panel and sale sticker.

## Render it to PNG

Register each font under the family name your `--font-*` tokens use; on a mismatch takumi
silently falls back to the first font and the PNG stops matching the page.

Install the renderer once: `pnpm add takumi-js`. Point `og:image` at the route with the card's
fields in the query string.

SvelteKit, `src/routes/og/product/+server.ts`:

```ts
import { render } from "svelte/server";
import { googleFonts } from "takumi-js/helpers";
import { ImageResponse } from "takumi-js/response";
import OgProductShop from "$lib/components/ui/og-product-shop/og-product-shop.svelte";
import css from "../../../app.css?inline";

const fonts = googleFonts({ families: [{ name: "Inter", weight: [400, 600, 700] }] });

export async function GET({ url }) {
	const { head, body } = render(OgProductShop, {
		props: { name: url.searchParams.get("name") ?? "", image: url.searchParams.get("image") ?? "", price: url.searchParams.get("price") ?? "" },
	});
	return new ImageResponse(head + body, { width: 1200, height: 630, css, fonts: await fonts });
}
```

Next.js has no inline CSS import, so compile your stylesheet once (add it to your build script):
`npx @tailwindcss/cli -i app/globals.css -o og.css`. Then `app/og/product/route.tsx`:

```tsx
import { readFile } from "node:fs/promises";
import { googleFonts } from "takumi-js/helpers";
import { ImageResponse } from "takumi-js/response";
import { OgProductShop } from "@/components/ui/og-product-shop/og-product-shop";

const fonts = googleFonts({ families: [{ name: "Inter", weight: [400, 600, 700] }] });

export async function GET(request: Request) {
	const q = new URL(request.url).searchParams;
	const css = await readFile("og.css", "utf8");
	return new ImageResponse(<OgProductShop name={q.get("name") ?? ""} image={q.get("image") ?? ""} price={q.get("price") ?? ""} />, {
		width: 1200,
		height: 630,
		css,
		fonts: await fonts,
	});
}
```

Pass the name and price as `og:image:alt`. Images (product, logo) must be absolute URLs; format prices on the server.
