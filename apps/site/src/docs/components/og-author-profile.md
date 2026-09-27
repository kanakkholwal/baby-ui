---
title: OG Author Profile
description: A 1200x630 author card with avatar panel, name, role, bio, handle and stats, rendered to PNG with takumi.
component: og-author-profile
category: og-images
tags: [og, open graph, social card, author, profile]
---

A fixed 1200x630 canvas built from flex layout and your theme tokens, so it renders the same in
the browser and in [takumi](https://takumi.kane.tw). Name clamps to two lines, bio to two, stats
show the first three. No avatar falls back to initials. `mode` picks a light or dark card; `tone`
colours the avatar panel and accents.

## Render it to PNG

Install the renderer once: `pnpm add takumi-js`. Point `og:image` at the route with the author's
fields in the query string.

SvelteKit, `src/routes/og/author/+server.ts`:

```ts
import { render } from "svelte/server";
import { googleFonts } from "takumi-js/helpers";
import { ImageResponse } from "takumi-js/response";
import OgAuthorProfile from "$lib/components/og/og-author-profile/og-author-profile.svelte";
import css from "../../../app.css?inline";

const fonts = googleFonts({ families: [{ name: "Inter", weight: [400, 600, 700] }] });

export async function GET({ url }) {
	const { head, body } = render(OgAuthorProfile, {
		props: { name: url.searchParams.get("name") ?? "", role: "Staff Engineer" },
	});
	return new ImageResponse(head + body, { width: 1200, height: 630, css, fonts: await fonts });
}
```

Next.js has no inline CSS import, so compile your stylesheet once (add it to your build script):
`npx @tailwindcss/cli -i app/globals.css -o og.css`. Then `app/og/author/route.tsx`:

```tsx
import { readFile } from "node:fs/promises";
import { googleFonts } from "takumi-js/helpers";
import { ImageResponse } from "takumi-js/response";
import { OgAuthorProfile } from "@/components/og/og-author-profile/og-author-profile";

const fonts = googleFonts({ families: [{ name: "Inter", weight: [400, 600, 700] }] });

export async function GET(request: Request) {
	const name = new URL(request.url).searchParams.get("name") ?? "";
	const css = await readFile("og.css", "utf8");
	return new ImageResponse(<OgAuthorProfile name={name} role="Staff Engineer" />, {
		width: 1200,
		height: 630,
		css,
		fonts: await fonts,
	});
}
```

Pass the name and role as `og:image:alt`. The avatar must be an absolute URL; stats arrive
pre-formatted (`"12.4k"`).
