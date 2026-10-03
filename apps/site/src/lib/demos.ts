import { type DemoLoader, demos as publicDemos } from "@baby-ui/demos/svelte";
import { proDemos } from "#lib/pro.js";

export type { DemoLoader };

/** Every demo by slug: public ones, plus Pro ones when the build shows Pro. */
export const demos: Record<string, DemoLoader> = {
	...publicDemos,
	...proDemos,
};
