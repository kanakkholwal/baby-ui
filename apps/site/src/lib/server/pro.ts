import type { ComponentSpec } from "@baby-ui/registry-schema";

// Eager, so the registry stays synchronous; server-only, so specs never reach the client.
// The flag sits at the glob itself: only a literal there lets a flag-off build drop the module.
const specs: Record<string, ComponentSpec[]> = __SHOW_PRO__
	? import.meta.glob<ComponentSpec[]>("../../../../../pro/packages/schema/src/index.ts", {
			eager: true,
			import: "proSpecs",
		})
	: {};

/** Pro specs when the private checkout is present and the build shows Pro. */
export const proSpecs: readonly ComponentSpec[] = Object.values(specs).flat();
