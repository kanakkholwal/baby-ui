import { rerouteTopLevel } from "@baby-ui/registry-schema/categories";
import type { Reroute } from "@sveltejs/kit";

// Top-level categories (`/charts/*`) share the components page templates.
export const reroute: Reroute = ({ url }) => rerouteTopLevel(url.pathname);
