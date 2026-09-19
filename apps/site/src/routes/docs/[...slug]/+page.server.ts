import { guides } from "virtual:docvia/source";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
	const page = await guides.getPage(params.slug ? params.slug.split("/") : ["index"]);
	if (!page) throw error(404, "Page not found");
	return { page };
};
