---
title: OG Blog Post
description: A 1200x630 blog post card with publication, category, title, excerpt and byline, rendered to PNG with takumi.
component: og-blog-post
category: og-images
tags: [og, open graph, social card, blog]
---

A fixed 1200x630 canvas built from flex layout and your theme tokens, so it renders the same in
the browser and in [takumi](https://takumi.kane.tw). Title clamps to three lines, excerpt to two.
`mode` picks a light or dark card regardless of the page theme; `tone` colours the glow.

## Render it to PNG

Install the renderer once: `pnpm add takumi-js`. Point `og:image` at the route with the post's
fields in the query string.

SvelteKit, `src/routes/og/blog/+server.ts`:

```ts
import { render } from "svelte/server";
import { googleFonts } from "takumi-js/helpers";
import { ImageResponse } from "takumi-js/response";
import OgBlogPost from "$lib/components/og/og-blog-post/og-blog-post.svelte";
import css from "../../../app.css?inline";

const fonts = googleFonts({ families: [{ name: "Inter", weight: [400, 600, 700] }] });

export async function GET({ url }) {
	const { head, body } = render(OgBlogPost, {
		props: { title: url.searchParams.get("title") ?? "", site: "Acme" },
	});
	return new ImageResponse(head + body, { width: 1200, height: 630, css, fonts: await fonts });
}
```

Next.js has no inline CSS import, so compile your stylesheet once (add it to your build script):
`npx @tailwindcss/cli -i app/globals.css -o og.css`. Then `app/og/blog/route.tsx`:

```tsx
import { readFile } from "node:fs/promises";
import { googleFonts } from "takumi-js/helpers";
import { ImageResponse } from "takumi-js/response";
import { OgBlogPost } from "@/components/og/og-blog-post/og-blog-post";

const fonts = googleFonts({ families: [{ name: "Inter", weight: [400, 600, 700] }] });

export async function GET(request: Request) {
	const title = new URL(request.url).searchParams.get("title") ?? "";
	const css = await readFile("og.css", "utf8");
	return new ImageResponse(<OgBlogPost title={title} site="Acme" />, {
		width: 1200,
		height: 630,
		css,
		fonts: await fonts,
	});
}
```

Pass the same text as `og:image:alt`. Images (logo, avatar) must be absolute URLs.
