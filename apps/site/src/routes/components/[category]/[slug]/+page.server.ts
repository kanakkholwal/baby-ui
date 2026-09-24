import { components } from "virtual:docvia/source";
import type { Framework } from "@baby-ui/registry-schema";
import { FRAMEWORKS } from "@baby-ui/registry-schema";
import { specs } from "@baby-ui/registry-schema/components";
import { error } from "@sveltejs/kit";
import { prepare } from "$lib/docs-nodes";
import { highlight, langFor } from "$lib/highlight";
import { findSpec } from "$lib/registry";
import { usageSnippet } from "$lib/usage";
import type { EntryGenerator, PageServerLoad } from "./$types";

// Listed rather than crawled, so a component nothing links to still gets built. Charts are
// crawled from /charts, which the reroute hook serves at their public URL.
export const entries: EntryGenerator = () =>
	specs
		.filter((spec) => spec.category !== "charts")
		.map((spec) => ({ category: spec.category, slug: spec.slug }));

export const load: PageServerLoad = async ({ params }) => {
	const spec = findSpec(params.category, params.slug);
	if (!spec) throw error(404, `No ${params.category} component named "${params.slug}"`);

	const doc = await components.getPage([params.slug]);

	const ports = await Promise.all(
		FRAMEWORKS.filter((f) => spec.impl[f]).map(async (framework: Framework) => {
			const snippet = await usageSnippet(spec.slug, framework);
			const usage = snippet
				? {
						path: snippet.path,
						ts: {
							code: snippet.ts,
							lang: langFor(snippet.path),
							html: await highlight(snippet.ts, langFor(snippet.path)),
						},
						js: snippet.js
							? {
									code: snippet.js,
									lang: langFor(snippet.path) === "tsx" ? "jsx" : langFor(snippet.path),
									html: await highlight(
										snippet.js,
										langFor(snippet.path) === "tsx" ? "jsx" : langFor(snippet.path),
									),
								}
							: null,
					}
				: null;
			const dependencies = spec.impl[framework]?.dependencies ?? [];
			return {
				framework,
				usage,
				dependencies,
			};
		}),
	);

	const prose = doc ? await prepare(doc.content) : null;
	return {
		spec,
		ports,
		prose: prose?.content ?? null,
		proseHeadings: prose?.headings ?? [],
	};
};
