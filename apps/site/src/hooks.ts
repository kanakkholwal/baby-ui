import type { Reroute } from "@sveltejs/kit";

// `/charts/*` is served by the components routes so both share one page template.
export const reroute: Reroute = ({ url }) => {
	if (url.pathname === "/charts" || url.pathname.startsWith("/charts/"))
		return `/components${url.pathname}`;
};
