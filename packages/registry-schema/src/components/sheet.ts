import { defineComponent } from "../index";

export const sheet = defineComponent({
	slug: "sheet",
	name: "Sheet",
	description:
		"Panel that slides in from any edge, with focus moved inside and Escape to close.",
	category: "base",
	status: "stable",
	props: [
		{
			name: "open",
			type: "boolean",
			description: "Whether the sheet is shown. Bindable.",
			default: false,
			control: { kind: "boolean" },
		},
		{
			name: "side",
			type: '"left" | "right" | "top" | "bottom"',
			description: "Edge it slides from.",
			default: "right",
			control: { kind: "select", options: ["left", "right", "top", "bottom"] },
		},
		{
			name: "title",
			type: "string",
			description: "Accessible name and visible heading.",
			default: "Filters",
			control: { kind: "text" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "The panel appears in place without travelling.",
		behaviour: [
			"The panel slides in from its own edge, driven by a CSS variable set per side, so all four directions share one keyframe.",
			"Uses the drawer easing rather than the standard ease-out, because a large surface travelling a long way needs the slower settle.",
		],
	},
	a11y: {
		role: "dialog",
		keyboard: ["Escape closes the sheet"],
		notes: [
			"aria-modal with a labelled heading. Focus moves to the first control inside on open.",
			"Prefer `bottom` on phones: it is the reachable part of the screen.",
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
			entry: "Sheet",
			files: [
				{ path: "sheet/sheet.tsx", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
		svelte: {
			entry: "Sheet",
			files: [
				{ path: "sheet/sheet.svelte", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},
	keywords: ["sheet"],
});
