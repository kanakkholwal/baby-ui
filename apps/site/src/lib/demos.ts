import { type DemoLoader, demos as publicDemos } from "@baby-ui/demos/svelte";

export type { DemoLoader };

// pro/ is the private Pro submodule; in a public checkout this glob matches nothing.
const pro = import.meta.glob<Record<string, DemoLoader>>(
	"../../../../pro/packages/demos/src/svelte/index.ts",
	{ eager: true, import: "demos" },
);

/** Every demo by slug: public ones, plus Pro ones when the submodule is checked out. */
export const demos: Record<string, DemoLoader> = Object.assign(
	{},
	publicDemos,
	...Object.values(pro),
);
