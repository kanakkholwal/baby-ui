import { emailRender } from "#lib/server/emails.js";
import { cardItems, freshness, latestNew, liveSpecs } from "#lib/server/registry.js";
import type { PageServerLoad } from "./$types";

/** The showcase grid: one live panel per area, none repeating the hero. */
const GRID = [
	"animated-beam",
	"voice-orb",
	"notification-stack",
	"image-compare",
	"github-calendar",
	"status-monitor",
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

/** The strongest running example per area most libraries skip; the email is Pro, so it shows only when Pro does. */
const OG_SLUG = "og-spotlight";
const BREADTH = ["tool-chips", "sankey-chart", OG_SLUG];

export const load: PageServerLoad = async () => ({
	breadth: cardItems(BREADTH),
	ogSlug: OG_SLUG,
	emailHtml: __SHOW_PRO__
		? (await emailRender("email-newsletter"))?.svelte.html
		: undefined,
	grid: cardItems(GRID),
	motion: cardItems(MOTION),
	// Six fills the row at two and three columns.
	fresh: latestNew(6, [...GRID, ...MOTION, ...BREADTH]),
	freshCount: liveSpecs.filter((s) => freshness(s) === "new").length,
});
