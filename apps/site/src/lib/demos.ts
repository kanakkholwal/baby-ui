import { type DemoLoader, demos as publicDemos } from "@baby-ui/demos/svelte";

export type { DemoLoader };

// pro/ is the private Pro submodule. Same build-time flag as the Pro specs, so a build that
// hides Pro drops these lazy chunks entirely instead of shipping unlinked Pro code.
const pro =
	import.meta.env.DEV || import.meta.env.VITE_SHOW_PRO === "true"
		? (import.meta.glob(
				"../../../../pro/packages/demos/src/svelte/*-demo.svelte",
			) as Record<string, DemoLoader>)
		: {};

// Pro demos follow the `<slug>-demo.svelte` convention, like the public ones.
const proBySlug = Object.fromEntries(
	Object.entries(pro).map(([path, load]) => [
		path.slice(path.lastIndexOf("/") + 1).replace(/-demo\.svelte$/, ""),
		load,
	]),
);

/** Every demo by slug: public ones, plus Pro ones when the build shows Pro. */
export const demos: Record<string, DemoLoader> = { ...publicDemos, ...proBySlug };
