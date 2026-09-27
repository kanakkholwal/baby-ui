import { rerouteTopLevel } from "@baby-ui/registry-schema/categories";
import type { Reroute } from "@sveltejs/kit";
import { isCollection } from "$lib/registry";

// Top-level categories (`/charts/*`) and collection listings (`/forms`) share the components
// page templates; collection items keep their category URLs.
export const reroute: Reroute = ({ url }) =>
	isCollection(url.pathname.slice(1))
		? `/components${url.pathname}`
		: rerouteTopLevel(url.pathname);
