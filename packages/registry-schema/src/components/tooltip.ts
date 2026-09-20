import { defineComponent } from "../index";

export const tooltip = defineComponent({
	slug: "tooltip",
	name: "Tooltip",
	description:
		"Delayed label anchored to its trigger, shown on hover and on keyboard focus.",
	category: "base",
	status: "stable",
	props: [
		{
			name: "label",
			type: "string",
			description: "Text to show. Keep it short; a tooltip is not a paragraph.",
			default: "Copy to clipboard",
			control: { kind: "text" },
		},
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
			name: "delay",
			type: "number",
			description: "Milliseconds of hover before it opens.",
			default: 400,
			control: { kind: "number", min: 0, max: 1000, step: 50 },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "The tooltip appears without the scale.",
		behaviour: [
			"Hover waits `delay` before opening; focus opens immediately, because a deliberate key press is not an accidental sweep.",
			"It grows from the edge nearest the trigger over 200ms.",
		],
	},
	a11y: {
		role: "tooltip",
		keyboard: [
			"Escape closes the tooltip",
			"Focusing the trigger opens it with no delay",
		],
		notes: [
			"Opens on focus as well as hover, otherwise keyboard users never see it.",
			"The tooltip is aria-describedby the trigger, so it supplements the accessible name rather than replacing it.",
			"pointer-events are off, so the tooltip can never eat the click meant for the trigger.",
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
			entry: "Tooltip",
			files: [
				{ path: "tooltip/tooltip.tsx", type: "registry:ui" },
				{ path: "lib/anchor.ts", type: "registry:lib" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "@floating-ui/dom"],
		},
		svelte: {
			entry: "Tooltip",
			files: [
				{ path: "tooltip/tooltip.svelte", type: "registry:ui" },
				{ path: "lib/anchor.ts", type: "registry:lib" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "@floating-ui/dom"],
		},
	},
	keywords: ["tooltip", "overlay"],
});
