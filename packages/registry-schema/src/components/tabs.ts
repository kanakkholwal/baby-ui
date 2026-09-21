import { defineComponent } from "../index";

export const tabs = defineComponent({
	slug: "tabs",
	name: "Tabs",
	description:
		"Panel switcher with a sliding indicator and a list that scrolls when it overflows.",
	category: "base",
	status: "stable",
	variants: {
		variant: ["pill", "underline", "segment", "soft", "outline", "enclosed"],
		size: ["sm", "md", "lg", "xl"],
	},
	props: [
		{
			name: "value",
			type: "string",
			description: "Active tab id. Bindable.",
			control: { kind: "none" },
		},
		{
			name: "variant",
			type: '"pill" | "underline" | "segment" | "soft" | "outline" | "enclosed"',
			description: "Indicator treatment.",
			default: "pill",
			control: {
				kind: "select",
				options: ["pill", "underline", "segment", "soft", "outline", "enclosed"],
			},
		},
		{
			name: "size",
			type: '"sm" | "md" | "lg" | "xl"',
			description: "Control size.",
			default: "md",
			control: { kind: "select", options: ["sm", "md", "lg", "xl"] },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "The indicator jumps between tabs; labels still change colour.",
		behaviour: [
			"The indicator is measured from the active tab's box and slides over 200ms, so it tracks font loading and resize.",
			"A duplicate label clipped to the indicator carries the active colour, so the text recolours exactly as the indicator passes rather than cross-fading.",
			"When the list is wider than its container it scrolls, the overflowing edges fade under a mask, and arrow buttons appear over the fade.",
			"Selecting or focusing a tab scrolls it clear of those arrows rather than under them.",
		],
	},
	a11y: {
		role: "tablist",
		keyboard: [
			"Arrow keys move between tabs",
			"Home and End jump to the first and last tab",
		],
		notes: [
			"Each tab is aria-controls linked to its panel, and the panel is aria-labelledby its tab.",
			"Selection follows focus, which is correct only because panels are already rendered; it would be wrong if switching fetched data.",
			"Part names and data-slot values match shadcn/ui, so this replaces an existing tabs without touching call sites.",
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
			entry: "Tabs",
			files: [
				{ path: "tabs/tabs.tsx", type: "registry:ui" },
				{ path: "tabs/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "Tabs",
			files: [
				{ path: "tabs/tabs.svelte", type: "registry:ui" },
				{ path: "tabs/tabs-list.svelte", type: "registry:ui" },
				{ path: "tabs/tabs-trigger.svelte", type: "registry:ui" },
				{ path: "tabs/tabs-content.svelte", type: "registry:ui" },
				{ path: "tabs/context.ts", type: "registry:ui" },
				{ path: "tabs/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: ["tabs", "navigation", "segmented"],
});
