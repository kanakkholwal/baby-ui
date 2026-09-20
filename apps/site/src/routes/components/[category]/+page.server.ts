import { CATEGORIES, type Category } from "@baby-ui/registry-schema";
import { specs } from "@baby-ui/registry-schema/components";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ params }) => {
	const category = params.category as Category;
	if (!CATEGORIES.includes(category)) throw error(404, `No category named "${params.category}"`);
	return { category, slugs: specs.filter((s) => s.category === category).map((s) => s.slug) };
};
