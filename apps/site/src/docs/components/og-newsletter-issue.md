---
title: OG Newsletter Issue
description: A 1200x630 editorial newsletter cover with a small publication name, one huge headline and an optional also-inside line, rendered to PNG with takumi.
component: og-newsletter-issue
category: og-images
tags: [og, open graph, social card, newsletter]
---

A fixed 1200x630 canvas built from flex layout and your theme tokens, so it renders the same in
the browser and in [takumi](https://takumi.kane.tw). The headline is the focal point and clamps
to three lines; the also-inside line clamps to one. `mode` picks a light or dark card; `tone` tints
the field (`chart`, `primary`) or leaves it plain (`neutral`) and colours the issue line.

## Render it to PNG

Install the renderer once: `pnpm add takumi-js`. Point `og:image` at the route with the issue's
fields in the query string.

SvelteKit, `src/routes/og/newsletter/+server.ts`:

```ts
import { render } from "svelte/server";
import { googleFonts } from "takumi-js/helpers";
import { ImageResponse } from "takumi-js/response";
import OgNewsletterIssue from "$lib/components/ui/og-newsletter-issue/og-newsletter-issue.svelte";
import css from "../../../app.css?inline";

const fonts = googleFonts({ families: [{ name: "Inter", weight: [400, 600, 700] }] });

export async function GET({ url }) {
	const { head, body } = render(OgNewsletterIssue, {
		props: { publication: "Acme Weekly", headline: url.searchParams.get("headline") ?? "" },
	});
	return new ImageResponse(head + body, { width: 1200, height: 630, css, fonts: await fonts });
}
```

Next.js has no inline CSS import, so compile your stylesheet once (add it to your build script):
`npx @tailwindcss/cli -i app/globals.css -o og.css`. Then `app/og/newsletter/route.tsx`:

```tsx
import { readFile } from "node:fs/promises";
import { googleFonts } from "takumi-js/helpers";
import { ImageResponse } from "takumi-js/response";
import { OgNewsletterIssue } from "@/components/ui/og-newsletter-issue/og-newsletter-issue";

const fonts = googleFonts({ families: [{ name: "Inter", weight: [400, 600, 700] }] });

export async function GET(request: Request) {
	const headline = new URL(request.url).searchParams.get("headline") ?? "";
	const css = await readFile("og.css", "utf8");
	return new ImageResponse(<OgNewsletterIssue publication="Acme Weekly" headline={headline} />, {
		width: 1200,
		height: 630,
		css,
		fonts: await fonts,
	});
}
```

Pass the headline as `og:image:alt`. The logo must be an absolute URL; issue and date arrive
pre-formatted.
