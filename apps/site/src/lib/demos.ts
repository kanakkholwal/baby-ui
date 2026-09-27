import { type DemoLoader, demos as publicDemos } from "@baby-ui/demos/svelte";
import { kitDemos } from "@baby-ui/demos/svelte/kit";
import { proDemos } from "$lib/pro";

export type { DemoLoader };

/** Every demo by slug: public ones, plus Pro ones when the build shows Pro. */
export const demos: Record<string, DemoLoader> = {
	...publicDemos,
	...kitDemos,
	...proDemos,
};
