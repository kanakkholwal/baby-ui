import { emailRender } from "#lib/server/emails.js";
import { cardItems, freshness, latestNew, liveSpecs } from "#lib/server/registry.js";
import type { PageServerLoad } from "./$types";

/** The showcase grid: one live panel per area, none repeating the hero. */
const GRID = [
	"orbit-card-stack",
	"voice-orb",
	"notification-stack",
	"image-compare",
	"card-stack",
	"prism-orb",
];

/** Micro-interactions, each one worth trying: a dense grid like a toolbox. */
const MOTION = [
	"confirm-morph",
	"hold-to-confirm",
	"fill-button",
	"theme-toggle",
	"rolling-digits",
	"text-reel",
	"letter-morph",
	"expanding-search",
	"swipe-actions",
	"morph-select",
	"wheel-picker",
	"expanding-button-group",
];

/** One running example per area most libraries skip. */
const BREADTH = ["approval-gate", "area-chart", "og-product-launch"];

export const load: PageServerLoad = async () => ({
	breadth: cardItems(BREADTH),
	emailHtml: (await emailRender("email-welcome"))?.svelte.html,
	grid: cardItems(GRID),
	motion: cardItems(MOTION),
	// Six fills the row at two and three columns.
	fresh: latestNew(6, [...GRID, ...MOTION, ...BREADTH]),
	freshCount: liveSpecs.filter((s) => freshness(s) === "new").length,
});
