import { CATEGORIES, type Category } from "@baby-ui/registry-schema";
import { error } from "@sveltejs/kit";
import { cardItems, specs } from "$lib/server/registry";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ params }) => {
	const category = params.category as Category;
	if (!CATEGORIES.includes(category))
		throw error(404, `No category named "${params.category}"`);
	return {
		category,
		items: cardItems(
			specs
				.filter((s) => s.category === category)
				.sort((a, b) => a.name.localeCompare(b.name))
				.map((s) => s.slug),
		),
	};
};
