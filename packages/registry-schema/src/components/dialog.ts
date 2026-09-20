import { defineComponent } from "../index";

export const dialog = defineComponent({
	slug: "dialog",
	name: "Dialog",
	description:
		"Centred dialog on the platform top layer, composed from trigger, content, header, title, description and footer.",
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
			name: "size",
			type: '"sm" | "md" | "lg" | "xl"',
			description: "Maximum width of the content panel.",
			default: "md",
			control: { kind: "select", options: ["sm", "md", "lg", "xl"] },
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
			"DialogTitle and DialogDescription own the ids that the dialog is labelled and described by, so the wiring cannot drift.",
			"Part names and data-slot values match shadcn/ui, so this replaces an existing dialog without touching call sites.",
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
			entry: "Dialog",
			files: [
				{ path: "dialog/dialog.tsx", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
		svelte: {
			entry: "Dialog",
			files: [
				{ path: "dialog/dialog.svelte", type: "registry:ui" },
				{ path: "dialog/dialog-trigger.svelte", type: "registry:ui" },
				{ path: "dialog/dialog-content.svelte", type: "registry:ui" },
				{ path: "dialog/dialog-header.svelte", type: "registry:ui" },
				{ path: "dialog/dialog-title.svelte", type: "registry:ui" },
				{ path: "dialog/dialog-description.svelte", type: "registry:ui" },
				{ path: "dialog/dialog-footer.svelte", type: "registry:ui" },
				{ path: "dialog/dialog-close.svelte", type: "registry:ui" },
				{ path: "dialog/context.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},
	keywords: ["dialog", "modal"],
});
