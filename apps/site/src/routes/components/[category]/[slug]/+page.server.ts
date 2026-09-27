import { components, docviaSource } from "virtual:docvia/source";
import type { Framework } from "@baby-ui/registry-schema";
import { FRAMEWORKS, TOP_LEVEL_CATEGORIES } from "@baby-ui/registry-schema";
import { error } from "@sveltejs/kit";
import { prepare } from "$lib/docs-nodes";
import { highlight, langFor } from "$lib/highlight";
import { componentCss, cssNames } from "$lib/registry-items";
import { adjacentComponents, cardItems, findSpec, specs } from "$lib/server/registry";
import { usageSnippet } from "$lib/usage";
import type { EntryGenerator, PageServerLoad } from "./$types";

type EmailRender = { html: string; text: string; bytes: number };
// Written by `pnpm emails`: both ports rendered at build and gated for parity.
const emailRenders = import.meta.glob<{ react: EmailRender; svelte: EmailRender }>(
	"/src/lib/generated/emails/*.json",
	{ import: "default" },
);
// The kit has no layout of its own, so its page previews the welcome email built from it.
const EMAIL_PREVIEW: Record<string, string> = { "email-kit": "email-welcome" };

// Listed rather than crawled, so a component nothing links to still gets built. Charts are
// crawled from /charts, which the reroute hook serves at their public URL.
export const entries: EntryGenerator = () =>
	specs
		.filter((spec) => !TOP_LEVEL_CATEGORIES.includes(spec.category))
		.map((spec) => ({ category: spec.category, slug: spec.slug }));

export const load: PageServerLoad = async ({ params }) => {
	const spec = findSpec(params.category, params.slug);
	if (!spec) throw error(404, `No ${params.category} component named "${params.slug}"`);

	// Pro prose is its own collection, present only when the Pro submodule is checked out.
	const collections = docviaSource.collections as Record<
		string,
		typeof components | undefined
	>;
	const doc = await (spec.tier === "pro" ? collections.pro : components)?.getPage([
		params.slug,
	]);

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
			const css = await componentCss(spec.slug, framework);
			return {
				framework,
				usage,
				dependencies,
				css: css ? cssNames(css) : [],
			};
		}),
	);

	const emailSlug = EMAIL_PREVIEW[spec.slug] ?? spec.slug;
	const email =
		spec.category === "emails"
			? ((await emailRenders[`/src/lib/generated/emails/${emailSlug}.json`]?.()) ?? null)
			: null;

	const prose = doc ? await prepare(doc.content) : null;
	const related = specs
		.filter((s) => s.category === spec.category && s.slug !== spec.slug)
		.slice(0, 6)
		.map((s) => s.slug);
	return {
		spec,
		related: cardItems(related),
		adjacent: adjacentComponents(spec.category, spec.slug),
		ports,
		email: email && { slug: emailSlug, react: email.react, svelte: email.svelte },
		prose: prose?.content ?? null,
		proseHeadings: prose?.headings ?? [],
	};
};
