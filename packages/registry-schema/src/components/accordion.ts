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
			description:
				"Ignored: Base UI/bits-ui's single mode always allows closing the open panel. Kept for backward compatibility.",
			default: true,
			control: { kind: "none" },
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
			"Open/close state, focus and keyboard handling are delegated to Base UI (React) and bits-ui (Svelte); this component only owns the classes and data-slots.",
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
			dependencies: ["clsx", "tailwind-merge", "@base-ui/react"],
		},
		svelte: {
			entry: "Accordion",
			files: [
				{ path: "accordion/accordion.svelte", type: "registry:ui" },
				{ path: "accordion/accordion-item.svelte", type: "registry:ui" },
				{ path: "accordion/accordion-trigger.svelte", type: "registry:ui" },
				{ path: "accordion/accordion-content.svelte", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "bits-ui"],
		},
	},
	keywords: ["accordion", "disclosure", "faq", "collapse"],
});
