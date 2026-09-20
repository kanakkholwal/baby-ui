import { defineComponent } from "../index";

export const popover = defineComponent({
	slug: "popover",
	name: "Popover",
	description:
		"Anchored panel that flips and shifts to stay on screen, dismissed by Escape or an outside click.",
	category: "base",
	status: "beta",
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
			name: "gap",
			type: "number",
			description: "Distance from the anchor, in pixels.",
			default: 6,
			control: { kind: "number", min: 0, max: 24, step: 1 },
		},
		{
			name: "open",
			type: "boolean",
			description: "Controlled open state. Bindable.",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "The panel appears without the scale; positioning is unchanged.",
		behaviour: [
			"Positioned with floating-ui: it flips to the opposite side when space runs out and shifts along the axis to stay clear of the viewport edge.",
			"transform-origin is set from the side flip settled on, so it always grows out of the trigger rather than from a fixed corner.",
			"Position is recalculated on scroll and resize through autoUpdate, which is torn down with the popover.",
		],
	},
	a11y: {
		keyboard: ["Escape closes the popover and returns focus to the trigger"],
		notes: [
			"The trigger carries aria-expanded and aria-controls, so the relationship is announced.",
			"Outside pointerdown is captured, so a click that closes the popover does not also activate what is underneath.",
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
			entry: "Popover",
			files: [
				{ path: "popover/popover.tsx", type: "registry:ui" },
				{ path: "lib/anchor.ts", type: "registry:lib" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "@floating-ui/dom"],
		},
		svelte: {
			entry: "Popover",
			files: [
				{ path: "popover/popover.svelte", type: "registry:ui" },
				{ path: "popover/popover-trigger.svelte", type: "registry:ui" },
				{ path: "popover/popover-content.svelte", type: "registry:ui" },
				{ path: "popover/context.ts", type: "registry:ui" },
				{ path: "lib/anchor.ts", type: "registry:lib" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "@floating-ui/dom"],
		},
	},
	keywords: ["popover", "overlay"],
});
