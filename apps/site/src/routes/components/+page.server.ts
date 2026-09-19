import { redirect } from "@sveltejs/kit";
import { sidebarGroups } from "$lib/registry";

export const load = () => {
	const first = sidebarGroups()[0]?.items[0];
	if (first) throw redirect(307, first.href);
};
