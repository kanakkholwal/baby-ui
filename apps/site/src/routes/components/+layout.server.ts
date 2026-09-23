import { sidebarGroups } from "$lib/registry";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = ({ url }) => ({
	groups: sidebarGroups(url.pathname.startsWith("/charts") ? "charts" : "components"),
});
