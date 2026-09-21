import { defineComponent } from "../index";

export const fullscreenNav = defineComponent({
	slug: "fullscreen-nav",
	name: "Fullscreen Nav",
	description:
		"Full-viewport navigation overlay with staggered links and scroll locking.",
	category: "boilerplate",
	status: "alpha",
	props: [
		{
			name: "open",
			type: "boolean",
			description: "Whether the overlay is shown. Bindable.",
			default: false,
			control: { kind: "none" },
		},
		{
			name: "links",
			type: "NavLink[]",
			description: "Navigation targets, in order.",
			control: { kind: "none" },
		},
		{
			name: "title",
			type: "string",
			description: "Accessible name for the overlay.",
			default: "Menu",
			control: { kind: "text" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "The overlay and its links appear at once, with no fade or travel.",
		behaviour: [
			"The overlay fades in over 280ms and the links stagger in at 45ms intervals, which is inside the range where stagger still reads as one gesture.",
			"Links animate opacity and transform only, so a long list does not cost layout.",
		],
	},
	a11y: {
		role: "dialog",
		keyboard: ["Escape closes the overlay", "Focus moves to the first link on open"],
		notes: [
			"Body scroll is locked while open and the previous value is restored on close, rather than being blanked.",
			"aria-modal with a labelled heading.",
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
			entry: "FullscreenNav",
			files: [
				{ path: "fullscreen-nav/fullscreen-nav.tsx", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
		svelte: {
			entry: "FullscreenNav",
			files: [
				{ path: "fullscreen-nav/fullscreen-nav.svelte", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},
	keywords: ["fullscreen", "nav"],
});
