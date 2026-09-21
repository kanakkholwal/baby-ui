import { guides } from "virtual:docvia/source";
import { error } from "@sveltejs/kit";
import { prepare } from "$lib/docs-nodes";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
	const slug = params.slug ? params.slug.split("/") : ["index"];
	const page = await guides.getPage(slug);
	if (!page) throw error(404, "Page not found");
	const { content, headings } = await prepare(page.content);
	return { page: { ...page, content }, headings, slug: slug.join("/") };
};
