import { defineComponent } from "../index";

export const modal = defineComponent({
	slug: "modal",
	name: "Modal",
	description:
		"Centred dialog on the platform top layer, with sizes and an optional footer.",
	category: "base",
	status: "stable",
	props: [
		{
			name: "open",
			type: "boolean",
			description: "Whether the dialog is shown. Bindable.",
			default: false,
			control: { kind: "boolean" },
		},
		{
			name: "title",
			type: "string",
			description: "Accessible name and visible heading.",
			default: "Deploy to production",
			control: { kind: "text" },
		},
		{
			name: "description",
			type: "string",
			description: "Optional supporting line under the title.",
			default: "This will replace the current build.",
			control: { kind: "text" },
		},
		{
			name: "size",
			type: '"sm" | "md" | "lg"',
			description: "Maximum width.",
			default: "md",
			control: { kind: "select", options: ["sm", "md", "lg"] },
		},
		{
			name: "dismissOnBackdrop",
			type: "boolean",
			description: "Close when the backdrop is clicked.",
			default: true,
			control: { kind: "boolean" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "The panel appears at full size; the backdrop still dims.",
		behaviour: [
			"The panel scales from 0.96 and fades over 280ms; the backdrop blurs at the same time.",
			"Closing is immediate: the decision is already made and holding the layout is just latency.",
		],
	},
	a11y: {
		role: "dialog",
		keyboard: [
			"Escape closes the dialog",
			"Tab cycles within the dialog while it is open",
		],
		notes: [
			"Rendered with the native dialog element, so the top layer, the backdrop and inertness of the rest of the page come from the browser rather than a focus-trap library.",
			"aria-labelledby points at the dialog's own heading.",
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
			entry: "Modal",
			files: [
				{ path: "modal/modal.tsx", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
		svelte: {
			entry: "Modal",
			files: [
				{ path: "modal/modal.svelte", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},
	keywords: ["modal"],
});
