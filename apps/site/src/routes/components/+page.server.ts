import { cardItems, sidebarGroups } from "$lib/server/registry";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => ({
	sections: sidebarGroups().map((group) => ({
		category: group.category,
		items: cardItems(group.items.map((item) => item.slug)),
	})),
});
