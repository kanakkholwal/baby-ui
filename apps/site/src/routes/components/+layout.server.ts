import { CATEGORIES, type Category } from "@baby-ui/registry-schema";
import { sidebarGroups } from "$lib/registry";
import type { LayoutServerLoad } from "./$types";

/** The category in the URL (/charts or /components/<category>/...) leads the sidebar. */
function leadCategory(pathname: string): Category | undefined {
	if (pathname.startsWith("/charts")) return "charts";
	const segment = pathname.split("/")[2] as Category | undefined;
	return segment && CATEGORIES.includes(segment) ? segment : undefined;
}

export const load: LayoutServerLoad = ({ url }) => ({
	groups: sidebarGroups(leadCategory(url.pathname)),
});
