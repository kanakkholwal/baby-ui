import { specs } from "@baby-ui/registry-schema/components";
import { error } from "@sveltejs/kit";
import { componentMarkdown } from "$lib/markdown";
import { findSpec } from "$lib/registry";
import type { EntryGenerator, RequestHandler } from "./$types";

export const prerender = true;
export const entries: EntryGenerator = () =>
	specs
		.filter((spec) => spec.category !== "charts")
		.map((spec) => ({ category: spec.category, slug: spec.slug }));

export const GET: RequestHandler = ({ params }) => {
	const spec = findSpec(params.category, params.slug);
	if (!spec) throw error(404);
	return new Response(componentMarkdown(spec), {
		headers: { "content-type": "text/markdown; charset=utf-8" },
	});
};
