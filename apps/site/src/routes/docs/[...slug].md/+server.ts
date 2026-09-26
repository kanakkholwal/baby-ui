import { guides } from "virtual:docvia/source";
import { error } from "@sveltejs/kit";
import { guideMarkdown } from "$lib/markdown";
import type { EntryGenerator, RequestHandler } from "./$types";

export const prerender = true;
export const entries: EntryGenerator = () =>
	["index", "installation", "theming"].map((slug) => ({ slug }));

export const GET: RequestHandler = async ({ params }) => {
	const slug = params.slug || "index";
	const page = await guides.getPage(slug.split("/"));
	if (!page || page.data?.draft === true) throw error(404);
	const data = page.data as { title?: string; description?: string } | undefined;
	return new Response(guideMarkdown(slug, data?.title ?? slug, data?.description ?? ""), {
		headers: { "content-type": "text/markdown; charset=utf-8" },
	});
};
