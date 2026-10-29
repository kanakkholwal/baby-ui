import { BRANDS, PRODUCT_SHOTS } from "./media";

export const HERO_SECTION = {
	announcement: { label: "New", text: "Workflows now run on a schedule", href: "#" },
	title: "Ship the work, skip the busywork",
	description:
		"Plan, track and hand off every project in one calm workspace that keeps your team moving without the status meetings.",
	actions: [
		{ label: "Start for free", href: "#" },
		{ label: "Book a demo", href: "#" },
	],
	logosLabel: "Trusted by teams at",
	// A neutral grey reads on both themes; Simple Icons recolours from the path suffix.
	logos: BRANDS.slice(0, 6).map((b) => ({ name: b.name, logo: `${b.logo}/a1a1aa` })),
	image: PRODUCT_SHOTS.inbox,
};
