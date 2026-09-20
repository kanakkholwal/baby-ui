import { defineComponent } from "../index";

export const hoverCard = defineComponent({
	slug: "hover-card",
	name: "Hover Card",
	description:
		"Rich preview that opens on hover with a delay and survives the trip to its own surface.",
	category: "base",
	status: "stable",
	props: [
		{
			name: "placement",
			type: "Placement",
			description: "Preferred side. Flips automatically when there is not room.",
			default: "bottom-start",
			control: {
				kind: "select",
				options: [
					"top",
					"bottom",
					"left",
					"right",
					"bottom-start",
					"bottom-end",
					"top-start",
				],
			},
		},
		{
			name: "openDelay",
			type: "number",
			description: "Milliseconds before opening.",
			default: 300,
			control: { kind: "number", min: 0, max: 1000, step: 50 },
		},
		{
			name: "closeDelay",
			type: "number",
			description: "Grace period before closing, so the pointer can reach the card.",
			default: 150,
			control: { kind: "number", min: 0, max: 600, step: 25 },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "The card appears without the scale.",
		behaviour: [
			"A close delay keeps the card open while the pointer crosses the gap to it, which is the difference between a usable hover card and a flickering one.",
			"Hovering the card itself cancels the pending close.",
		],
	},
	a11y: {
		keyboard: ["Focusing the trigger opens the card"],
		notes: [
			"Hover-only content is supplementary by definition; never put the only copy of something in here.",
			"The card is aria-describedby the trigger and opens on focus as well as hover.",
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
			entry: "HoverCard",
			files: [
				{ path: "hover-card/hover-card.tsx", type: "registry:ui" },
				{ path: "lib/anchor.ts", type: "registry:lib" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "@floating-ui/dom"],
		},
		svelte: {
			entry: "HoverCard",
			files: [
				{ path: "hover-card/hover-card.svelte", type: "registry:ui" },
				{ path: "lib/anchor.ts", type: "registry:lib" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "@floating-ui/dom"],
		},
	},
	keywords: ["hover", "card", "overlay"],
});
