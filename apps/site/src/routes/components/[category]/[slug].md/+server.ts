import { TOP_LEVEL_CATEGORIES } from "@baby-ui/registry-schema";
import { error } from "@sveltejs/kit";
import { componentMarkdown } from "$lib/markdown";
import { findSpec, specs } from "$lib/server/registry";
import type { EntryGenerator, RequestHandler } from "./$types";

export const prerender = true;
export const entries: EntryGenerator = () =>
	specs
		.filter((spec) => !TOP_LEVEL_CATEGORIES.includes(spec.category))
		.map((spec) => ({ category: spec.category, slug: spec.slug }));

export const GET: RequestHandler = async ({ params }) => {
	const spec = findSpec(params.category, params.slug);
	if (!spec) throw error(404);
	return new Response(await componentMarkdown(spec), {
		headers: { "content-type": "text/markdown; charset=utf-8" },
	});
};
