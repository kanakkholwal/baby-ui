import { BRANDS } from "./media";

export const LOGO_CLOUD = {
	title: "Trusted by product teams at",
	link: { label: "See all customers", href: "#" },
	// A neutral grey reads on both themes; Simple Icons recolours from the path suffix.
	logos: BRANDS.map((b) => ({ name: b.name, logo: `${b.logo}/a1a1aa` })),
};
