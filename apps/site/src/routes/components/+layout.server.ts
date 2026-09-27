import { CATEGORIES, type Category } from "@baby-ui/registry-schema";
import { sidebarGroups } from "$lib/server/registry";
import type { LayoutServerLoad } from "./$types";

/** The category in the URL (/charts, /og-images or /components/<category>/...) leads the sidebar. */
function leadCategory(pathname: string): Category | undefined {
	if (pathname.startsWith("/charts")) return "charts";
	if (pathname.startsWith("/og-images")) return "og-images";
	if (pathname.startsWith("/emails")) return "emails";
	const segment = pathname.split("/")[2] as Category | undefined;
	return segment && CATEGORIES.includes(segment) ? segment : undefined;
}

export const load: LayoutServerLoad = ({ url }) => ({
	groups: sidebarGroups(leadCategory(url.pathname)),
});
