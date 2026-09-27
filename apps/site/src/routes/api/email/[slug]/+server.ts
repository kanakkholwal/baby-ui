import { pixelBasedPreset, Renderer, toPlainText } from "@better-svelte-email/server";
import { error, json } from "@sveltejs/kit";
import type { Component } from "svelte";
import { defaultProps } from "$lib/registry";
import { MAX_PROPS, safeUrls, sameOrigin } from "$lib/server/preview-guard";
import { findSpec } from "$lib/server/registry";
import { EMAIL_SAMPLES } from "../../../../../../../packages/demos/src/data/email-samples";
import { emailTailwindConfig } from "../../../../../../../packages/ui-svelte/src/lib/lib/email-theme";
import type { RequestHandler } from "./$types";

// Re-renders the Svelte port as controls change; the build-time render covers the defaults.
export const prerender = false;

type Template = { default: Component<Record<string, unknown>> };
const templates = import.meta.glob<Template>(
	"../../../../../../../packages/ui-svelte/src/lib/email-*/email-*.svelte",
);

// Kit parts share the glob; a template is the file named after its own folder.
function loader(slug: string) {
	const entry = Object.entries(templates).find(([path]) =>
		path.endsWith(`/${slug}/${slug}.svelte`),
	);
	return slug === "email-kit" ? undefined : entry?.[1];
}

const renderer = new Renderer({
	tailwindConfig: { ...emailTailwindConfig, presets: [pixelBasedPreset] },
});

export const GET: RequestHandler = async ({ params, url, request }) => {
	if (!sameOrigin(request, url)) throw error(403, "Same-origin requests only");
	const raw = url.searchParams.get("props") ?? "{}";
	if (raw.length > MAX_PROPS) throw error(413, "props too large");
	const spec = findSpec("emails", params.slug);
	const load = spec && loader(params.slug);
	if (!load) throw error(404, `No email template named "${params.slug}"`);

	let given: Record<string, unknown> = {};
	try {
		given = safeUrls(JSON.parse(raw), url.origin) as Record<string, unknown>;
	} catch {
		throw error(400, "props must be JSON");
	}
	const defaults = Object.fromEntries(
		Object.entries(spec ? defaultProps(spec) : {}).filter(([, v]) => v !== undefined),
	);
	const props = { ...EMAIL_SAMPLES[params.slug], ...defaults, ...given };

	const { default: Template } = await load();
	let html: string;
	try {
		html = await renderer.render(Template, { props });
	} catch {
		throw error(400, `Invalid props for "${params.slug}"`);
	}
	const text = toPlainText(
		html.replace(/<div[^>]*data-skip-in-text="true"[^>]*>[\s\S]*?<\/div>\s*<\/div>/, ""),
	);
	return json(
		{ html, text, bytes: new TextEncoder().encode(html).length },
		// private: a shared cache would replay the result to requests that skipped the origin check.
		{ headers: { "cache-control": "private, max-age=3600" } },
	);
};
