import { defineComponent } from "../index.js";

export const dock = defineComponent({
	slug: "dock",
	name: "Dock",
	description:
		"macOS-style dock whose items magnify by cursor proximity, with a spring-settled active indicator.",
	category: "animated",
	status: "beta",

	props: [
		{
			name: "size",
			type: "number",
			description: "Resting width and height of each item, in pixels.",
			default: 44,
			control: { kind: "number", min: 32, max: 80, step: 2 },
		},
		{
			name: "magnification",
			type: "number",
			description: "Peak size of the item directly under the cursor, in pixels.",
			default: 72,
			control: { kind: "number", min: 44, max: 120, step: 2 },
		},
		{
			name: "distance",
			type: "number",
			description: "Cursor distance in pixels at which magnification falls off to zero.",
			default: 140,
			control: { kind: "number", min: 60, max: 300, step: 10 },
		},
		{
			name: "spring",
			type: '"snappy" | "gentle" | "bouncy"',
			description: "Named spring from the token layer that settles the magnification.",
			default: "gentle",
			control: { kind: "select", options: ["snappy", "gentle", "bouncy"] },
		},
	],

	motion: {
		springs: ["snappy", "gentle", "bouncy"],
		reducedMotion:
			"Magnification is disabled entirely; items stay at `size` and the active indicator jumps without travel. Hover still changes the background.",
		behaviour: [
			"Item size interpolates from `size` to `magnification` as the cursor's x distance to the item centre falls from `distance` to 0.",
			"The falloff is linear in distance, then settled by the named spring, so the curve the user sees is the spring's, not the interpolation's.",
			"Items grow from the bottom edge: the dock's baseline does not move.",
			"On pointerleave every item returns to `size` under the same spring, so an interrupted return keeps its velocity.",
			"The active indicator is a pill inset within the active item, so it magnifies with it and needs no measurement.",
			"Changing the active item crossfades the two pills through a 3px blur rather than sliding, because a shared-layout slide has no portable equivalent across the two frameworks.",
		],
	},

	a11y: {
		role: "group",
		keyboard: [
			"Tab moves between dock items in DOM order",
			"Enter and Space activate the focused item",
		],
		notes: [
			"Magnification is pointer-only and never triggers on focus, so keyboard traversal does not cause the dock to churn.",
			"Items that wrap their own link or button are rendered as a plain container so the accessible name is not doubled.",
			"The root is role=group, not role=toolbar: toolbar promises arrow-key roving focus, which this does not implement.",
		],
	},

	licenseOrigin: {
		source: "beUI (starc007/ui-components)",
		url: "https://github.com/starc007/ui-components",
		license: "MIT",
		copyright: "Copyright (c) 2026 Saurabh Chauhan",
	},

	impl: {
		react: {
			entry: "Dock",
			files: [
				{ path: "dock/dock.tsx", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["motion", "clsx", "tailwind-merge"],
		},
		svelte: {
			entry: "Dock",
			files: [
				{ path: "dock/dock.svelte", type: "registry:ui" },
				{ path: "dock/dock-item.svelte", type: "registry:ui" },
				{ path: "dock/dock-separator.svelte", type: "registry:ui" },
				{ path: "dock/context.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},

	keywords: ["dock", "magnify", "macos", "toolbar", "launcher"],
});
