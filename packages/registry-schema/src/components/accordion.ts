import { defineComponent } from "../index.js";

export const accordion = defineComponent({
	slug: "accordion",
	name: "Accordion",
	description: "Disclosure list with single or multiple open panels and animated height.",
	category: "base",
	status: "stable",
	props: [
		{
			name: "multiple",
			type: "boolean",
			description: "Allow more than one panel open at a time.",
			default: false,
			control: { kind: "boolean" },
		},
		{
			name: "collapsible",
			type: "boolean",
			description: "In single mode, allow closing the open panel.",
			default: true,
			control: { kind: "boolean" },
		},
		{
			name: "items",
			type: "{ id: string; title: string; content: string }[]",
			description: "Panels, in order.",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "Panels open and close instantly; the chevron still rotates.",
		behaviour: [
			"Opening animates height from zero with a grid-template-rows transition, so no JS measures the panel.",
			"The chevron rotates 180 degrees over the same 200ms, so the two read as one gesture.",
		],
	},
	a11y: {
		keyboard: [
			"Tab moves between panel headers",
			"Enter and Space toggle the focused panel",
		],
		notes: [
			"Each header is a button with aria-expanded and aria-controls pointing at its panel region.",
			"Uses grid-template-rows rather than max-height, so a tall panel does not open at the wrong speed.",
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
			entry: "Accordion",
			files: [
				{ path: "accordion/accordion.tsx", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
		svelte: {
			entry: "Accordion",
			files: [
				{ path: "accordion/accordion.svelte", type: "registry:ui" },
				{ path: "accordion/accordion-item.svelte", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},
	keywords: ["accordion", "disclosure", "faq", "collapse"],
});
