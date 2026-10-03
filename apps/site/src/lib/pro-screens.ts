import { error } from "@sveltejs/kit";
import { proScreen } from "#lib/pro.js";

/** The named screen and the Pro sample module, or a 404 when this build has no Pro. */
export async function loadProScreen(
	name: "login" | "pricing" | "checkout" | "dashboard",
) {
	const screen = await proScreen(name);
	if (!screen) error(404, "Not found");
	return screen;
}
