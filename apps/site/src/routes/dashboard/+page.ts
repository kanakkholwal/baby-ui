import { redirect } from "@sveltejs/kit";
import { loadProScreen } from "#lib/pro-screens.js";
import type { PageLoad } from "./$types";

export const prerender = false;

// Old links land on /account; builds without Pro 404 here like every other Pro page.
export const load: PageLoad = async () => {
	await loadProScreen("account");
	redirect(308, "/account");
};
