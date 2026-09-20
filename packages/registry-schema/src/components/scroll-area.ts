import { defineComponent } from "../index";

export const scrollArea = defineComponent({
	slug: "scroll-area",
	name: "Scroll Area",
	description:
		"Scroll container with edge fades that appear only when there is more to see.",
	category: "base",
	status: "stable",
	props: [
		{
			name: "maxHeight",
			type: "string",
			description: "CSS max-height for the viewport.",
			default: "16rem",
			control: { kind: "text" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "Unchanged; the fades are not motion.",
		behaviour: [
			"Top and bottom fades appear only when content is actually clipped in that direction, so a short list has no false edge.",
			"They fade over 150ms, which is below the threshold where the change itself draws attention.",
		],
	},
	a11y: {
		keyboard: ["Arrow keys and Page Up and Page Down scroll the region natively"],
		notes: [
			"Native scrolling, not a JavaScript reimplementation, so keyboard scrolling, momentum and screen-reader virtual cursors all keep working.",
			"The scrollbar is thinned, never hidden. Hiding it removes the only affordance a mouse user has.",
		],
	},
	licenseOrigin: {
		source: "sivir-ui",
		url: "https://github.com/aidan-neel/sivir-ui",
		license: "MIT",
		copyright: "Copyright (c) 2026 Aidan Neel",
	},
	impl: {
		react: {
			entry: "ScrollArea",
			files: [
				{ path: "scroll-area/scroll-area.tsx", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
		svelte: {
			entry: "ScrollArea",
			files: [
				{ path: "scroll-area/scroll-area.svelte", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},
	keywords: ["scroll", "area"],
});
