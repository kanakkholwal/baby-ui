import { categoryFromPath } from "@baby-ui/registry-schema/categories";
import { sidebarGroups } from "#lib/server/registry.js";
import type { LayoutServerLoad } from "./$types";

// The category in the URL (/charts or /components/<category>/...) leads the sidebar.
export const load: LayoutServerLoad = ({ url }) => ({
	groups: sidebarGroups(categoryFromPath(url.pathname)),
});
