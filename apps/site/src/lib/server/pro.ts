import type { ComponentSpec } from "@baby-ui/registry-schema";

// Eager, so the registry stays synchronous; server-only, so specs never reach the client.
const specs = import.meta.glob<ComponentSpec[]>("$pro/schema/src/index.ts", {
	eager: true,
	import: "proSpecs",
});

/** Pro specs when the private checkout is present and the build shows Pro. */
export const proSpecs: readonly ComponentSpec[] = __SHOW_PRO__
	? Object.values(specs).flat()
	: [];
