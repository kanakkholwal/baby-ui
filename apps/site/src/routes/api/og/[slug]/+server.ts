import { error } from "@sveltejs/kit";
import type { Component } from "svelte";
import { render } from "svelte/server";
import { googleFonts } from "takumi-js/helpers";
import { ImageResponse } from "takumi-js/response";
import { defaultProps } from "$lib/registry";
import { MAX_PROPS, safeUrls, sameOrigin } from "$lib/server/preview-guard";
import { findSpec } from "$lib/server/registry";
import {
	OG_SAMPLE_BY_PROPS,
	OG_SAMPLES,
} from "../../../../../../../packages/demos/src/data/og-samples";
import layoutCss from "../../../layout.css?inline";
import type { RequestHandler } from "./$types";

// Props arrive as `?props=`, so this runs in the Worker instead of being prerendered.
export const prerender = false;

type Loader = () => Promise<{ default: Component<Record<string, unknown>> }>;
const publicTemplates = import.meta.glob<{ default: Component<Record<string, unknown>> }>(
	"../../../../../../../packages/ui-svelte/src/lib/og-*/og-*.svelte",
);
// pro/ is the private Pro submodule; in a public checkout this glob matches nothing.
const proTemplates = import.meta.glob<{ default: Component<Record<string, unknown>> }>(
	"../../../../../../../pro/packages/svelte/src/lib/og-*/og-*.svelte",
);

// Eager so samples resolve synchronously; empty in a public checkout.
const proSamples = import.meta.glob<{
	OG_SAMPLES: Record<string, Record<string, unknown>>;
}>("../../../../../../../pro/packages/demos/src/data/og-samples.ts", { eager: true });

function sample(slug: string): Record<string, unknown> {
	const pro = __SHOW_PRO__ ? Object.values(proSamples)[0]?.OG_SAMPLES : undefined;
	return OG_SAMPLES[slug] ?? pro?.[slug] ?? {};
}

function loaders(): Map<string, Loader> {
	const entries = Object.entries(
		__SHOW_PRO__ ? { ...publicTemplates, ...proTemplates } : publicTemplates,
	);
	return new Map(
		entries.map(([path, load]) => [
			path.split("/").at(-1)?.replace(".svelte", "") ?? "",
			load,
		]),
	);
}

const fontsPromise = googleFonts({
	families: [{ name: "Inter", weight: [400, 500, 600, 700] }],
});

export const GET: RequestHandler = async ({ params, url, request }) => {
	if (!sameOrigin(request, url)) throw error(403, "Same-origin requests only");
	const raw = url.searchParams.get("props") ?? "{}";
	if (raw.length > MAX_PROPS) throw error(413, "props too large");
	const load = loaders().get(params.slug);
	if (!load) throw error(404, `No OG template named "${params.slug}"`);

	let given: Record<string, unknown> = {};
	try {
		given = safeUrls(JSON.parse(raw), url.origin) as Record<string, unknown>;
	} catch {
		throw error(400, "props must be JSON");
	}
	// Demo samples carry object props, spec defaults the controls, so a bare URL renders the demo card.
	const spec = findSpec("og-images", params.slug);
	const defaults = Object.fromEntries(
		Object.entries(spec ? defaultProps(spec) : {}).filter(([, v]) => v !== undefined),
	);
	const derived = OG_SAMPLE_BY_PROPS[params.slug]?.({ ...defaults, ...given }) ?? {};
	const props = { ...sample(params.slug), ...defaults, ...derived, ...given };

	const { default: Template } = await load();
	let markup: string;
	try {
		const { head, body } = render(Template, { props });
		markup = head + body;
	} catch {
		throw error(400, `Invalid props for "${params.slug}"`);
	}

	return new ImageResponse(markup, {
		width: 1200,
		height: 630,
		css: layoutCss,
		fonts: await fontsPromise,
		// private: a shared cache would replay the image to requests that skipped the origin check.
		headers: { "cache-control": "private, max-age=3600" },
	});
};
