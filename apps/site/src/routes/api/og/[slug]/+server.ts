import { defaultProps } from "@baby-ui/registry-schema";
import { error } from "@sveltejs/kit";
import { render } from "svelte/server";
import { ImageResponse } from "takumi-js/response";
import { proOgSample, proOgTemplates } from "$lib/pro";
import { ogFonts } from "$lib/server/og-fonts";
import { MAX_PROPS, safeUrls, sameOrigin } from "$lib/server/preview-guard";
import { findSpec } from "$lib/server/registry";
import { type TemplateModule, templateLoader } from "$lib/server/templates";
import { previewProps } from "../../../../../../../packages/demos/src/data/preview-props";
import layoutCss from "../../../layout.css?inline";
import type { RequestHandler } from "./$types";

// Props arrive as `?props=`, so this runs in the Worker instead of being prerendered.
export const prerender = false;

const loader = templateLoader({
	...import.meta.glob<TemplateModule>(
		"../../../../../../../packages/ui-svelte/src/lib/og-*/og-*.svelte",
	),
	...proOgTemplates,
});

export const GET: RequestHandler = async ({ params, url, request }) => {
	if (!sameOrigin(request, url)) throw error(403, "Same-origin requests only");
	const raw = url.searchParams.get("props") ?? "{}";
	if (raw.length > MAX_PROPS) throw error(413, "props too large");
	const load = loader(params.slug);
	if (!load) throw error(404, `No OG template named "${params.slug}"`);

	let given: Record<string, unknown> = {};
	try {
		given = safeUrls(JSON.parse(raw), url.origin) as Record<string, unknown>;
	} catch {
		throw error(400, "props must be JSON");
	}
	// Spec defaults fill the controls, so a bare URL renders the demo card.
	const spec = findSpec("og-images", params.slug);
	const controls = { ...(spec ? defaultProps(spec) : {}), ...given };
	const props = previewProps(params.slug, controls, await proOgSample(params.slug));

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
		fonts: await ogFonts(),
		// private: a shared cache would replay the image to requests that skipped the origin check.
		headers: { "cache-control": "private, max-age=3600" },
	});
};
