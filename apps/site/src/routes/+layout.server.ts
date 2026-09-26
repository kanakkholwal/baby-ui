import { cardItems, navCategories, specs } from "$lib/server/registry";
import type { LayoutServerLoad } from "./$types";

const FOOTER_PICKS = [
	"dia-text",
	"reasoning",
	"records-table",
	"rolling-digits",
	"sidebar-nav",
	"week-calendar",
];

// Small on purpose: this lands in every page. Search fetches /catalog.json when it opens.
export const load: LayoutServerLoad = () => ({
	categories: navCategories(),
	total: specs.length,
	footerPicks: cardItems(FOOTER_PICKS).map(({ slug, name, href }) => ({
		slug,
		name,
		href,
	})),
});
