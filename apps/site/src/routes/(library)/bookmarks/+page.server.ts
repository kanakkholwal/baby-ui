import { cardItems, liveSpecs } from "#lib/server/registry.js";
import type { PageServerLoad } from "./$types";

// Bookmarks live in the browser, so the page ships every card and shows the saved ones.
export const load: PageServerLoad = () => ({
	items: cardItems(liveSpecs.map((spec) => spec.slug)),
});
