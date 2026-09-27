import type { Reroute } from "@sveltejs/kit";

// Top-level categories (`/charts/*`, `/og-images/*`) share the components page templates.
const TOP_LEVEL = ["/charts", "/og-images", "/emails"];

export const reroute: Reroute = ({ url }) => {
	if (TOP_LEVEL.some((p) => url.pathname === p || url.pathname.startsWith(`${p}/`)))
		return `/components${url.pathname}`;
};
