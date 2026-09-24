import { render } from "svelte/server";
import { googleFonts } from "takumi-js/helpers";
import { ImageResponse } from "takumi-js/response";
import OgTemplate from "$lib/components/og-template.svelte";
import layoutCss from "../layout.css?inline";
import type { RequestHandler } from "./$types";

const fontsPromise = googleFonts({
	families: [{ name: "Inter", weight: [400, 600, 700] }],
});

export const GET: RequestHandler = async ({ url }) => {
	const title = url.searchParams.get("title") ?? "Baby UI";
	const description = url.searchParams.get("description") ?? undefined;
	const tag = url.searchParams.get("tag") ?? undefined;

	const { head, body } = render(OgTemplate, { props: { title, description, tag } });

	return new ImageResponse(`${head}${body}`, {
		width: 1200,
		height: 630,
		css: layoutCss,
		fonts: await fontsPromise,
		headers: { "cache-control": "public, immutable, no-transform, max-age=31536000" },
	});
};
