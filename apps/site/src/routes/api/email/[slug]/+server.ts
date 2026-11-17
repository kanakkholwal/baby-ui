import { defaultProps } from "@baby-ui/registry-schema";
import {
	createEmailTheme,
	type EmailBrand,
	type EmailDensity,
	type EmailRadius,
} from "@baby-ui/svelte/lib/email-brand";
import { pixelBasedPreset, Renderer } from "@better-svelte-email/server";
import { error } from "@sveltejs/kit";
import { proEmailSample, proEmailTemplates } from "#lib/pro.js";
import { MAX_PROPS, safeUrls, sameOrigin } from "#lib/server/preview-guard.js";
import { findSpec } from "#lib/server/registry.js";
import {
	emailPlainText,
	type TemplateModule,
	templateLoader,
} from "#lib/server/templates.js";
import {
	previewProps,
	withSiteAssets,
} from "../../../../../../../packages/demos/src/data/preview-props";
import type { RequestHandler } from "./$types";

// Re-renders the Svelte port as controls change; the build-time render covers the defaults.
export const prerender = false;

const loader = templateLoader({
	...import.meta.glob<TemplateModule>(
		"../../../../../../../components/email-*/svelte/email-*.svelte",
	),
	...proEmailTemplates,
});

const RADII: readonly EmailRadius[] = ["none", "sm", "md", "lg", "full"];
const DENSITIES: readonly EmailDensity[] = ["compact", "default", "relaxed"];

/** `?primary=%23e11d48&radius=lg&density=compact`: anything invalid falls back to the default. */
function brandFrom(params: URLSearchParams): EmailBrand {
	const primary = params.get("primary");
	const radius = RADII.find((value) => value === params.get("radius"));
	const density = DENSITIES.find((value) => value === params.get("density"));
	return {
		primary: primary && /^#[0-9a-f]{6}$/i.test(primary) ? primary : undefined,
		radius,
		density,
	};
}

const renderers = new Map<string, Renderer>();
function rendererFor(brand: EmailBrand) {
	const key = JSON.stringify(brand);
	let renderer = renderers.get(key);
	if (!renderer) {
		renderer = new Renderer({
			tailwindConfig: { ...createEmailTheme(brand), presets: [pixelBasedPreset] },
		});
		if (renderers.size >= 24) renderers.clear();
		renderers.set(key, renderer);
	}
	return renderer;
}

export const GET: RequestHandler = async ({ params, url, request }) => {
	if (!sameOrigin(request, url)) throw error(403, "Same-origin requests only");
	const raw = url.searchParams.get("props") ?? "{}";
	if (raw.length > MAX_PROPS) throw error(413, "props too large");
	const spec = findSpec("emails", params.slug);
	const load = spec && loader(params.slug);
	if (!spec || !load) throw error(404, `No email template named "${params.slug}"`);

	let given: Record<string, unknown> = {};
	try {
		given = safeUrls(JSON.parse(raw), url.origin) as Record<string, unknown>;
	} catch {
		throw error(400, "props must be JSON");
	}
	const props = withSiteAssets(
		previewProps(
			params.slug,
			{ ...defaultProps(spec), ...given },
			await proEmailSample(params.slug),
		),
		url.origin,
	);

	const { default: Template } = await load();
	let html: string;
	try {
		html = await rendererFor(brandFrom(url.searchParams)).render(Template, { props });
	} catch {
		throw error(400, `Invalid props for "${params.slug}"`);
	}
	return Response.json(
		{ html, text: emailPlainText(html), bytes: new TextEncoder().encode(html).length },
		// private: a shared cache would replay the result to requests that skipped the origin check.
		{ headers: { "cache-control": "private, max-age=3600" } },
	);
};
