import { defineComponent } from "../index";

export const accordion = defineComponent({
	slug: "accordion",
	name: "Accordion",
	description: "Disclosure sections with animated height; one open at a time, or many.",
	category: "base",
	status: "stable",
	props: [
		{
			name: "type",
			type: '"single" | "multiple"',
			description: "Whether one panel or any number can be open.",
			default: "single",
			control: { kind: "select", options: ["single", "multiple"] },
		},
		{
			name: "collapsible",
			type: "boolean",
			description: "Single mode only: lets the open panel close again.",
			default: true,
			control: { kind: "boolean" },
		},
		{
			name: "value",
			type: "string | string[]",
			description: "Controlled open item, or items in multiple mode.",
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
			"Each trigger is a button inside a heading, with aria-expanded and aria-controls pointing at its panel region.",
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
				{ path: "accordion/accordion-trigger.svelte", type: "registry:ui" },
				{ path: "accordion/accordion-content.svelte", type: "registry:ui" },
				{ path: "accordion/context.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},
	keywords: ["accordion", "disclosure", "faq", "collapse"],
});
