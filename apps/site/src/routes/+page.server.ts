import { cardItems } from "$lib/server/registry";
import type { PageServerLoad } from "./$types";

/** The components the home page's area switcher shows, one per tab. */
const SHOWCASE = ["message", "records-table", "input", "line-chart"];

export const load: PageServerLoad = () => ({ showcase: cardItems(SHOWCASE) });
