import { cardItems } from "$lib/server/registry";
import type { PageServerLoad } from "./$types";

/** Every slug the home page previews: the showcase grid plus the install terminal's cycle. */
const SHOWCASE = [
	"dia-text",
	"rolling-digits",
	"area-chart",
	"message",
	"reasoning",
	"thinking-state",
	"bar-chart",
	"streaming-text",
	"week-calendar",
];

export const load: PageServerLoad = () => ({ showcase: cardItems(SHOWCASE) });
