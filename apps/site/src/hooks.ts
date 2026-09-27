import type { Reroute } from "@sveltejs/kit";

// Top-level categories (`/charts/*`, `/og-images/*`) share the components page templates.
const TOP_LEVEL = ["/charts", "/og-images", "/emails"];
// Collections (`/data`, `/forms`) are listing pages only; their items keep category URLs.
const COLLECTIONS = ["/data", "/forms"];

export const reroute: Reroute = ({ url }) => {
	if (
		COLLECTIONS.includes(url.pathname) ||
		TOP_LEVEL.some((p) => url.pathname === p || url.pathname.startsWith(`${p}/`))
	)
		return `/components${url.pathname}`;
};
