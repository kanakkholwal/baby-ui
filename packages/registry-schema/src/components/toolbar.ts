import { defineComponent } from "../index";

export const toolbar = defineComponent({
	slug: "toolbar",
	name: "Toolbar",
	description: "Grouped controls with roving focus, so the whole bar is one tab stop.",
	category: "base",
	status: "stable",
	props: [
		{
			name: "orientation",
			type: '"horizontal" | "vertical"',
			description: "Layout and which arrow keys move focus.",
			default: "horizontal",
			control: { kind: "select", options: ["horizontal", "vertical"] },
		},
		{
			name: "label",
			type: "string",
			description: "Accessible name for the toolbar.",
			default: "Formatting",
			control: { kind: "text" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "Unchanged: there is no animation to reduce.",
		behaviour: [
			"Nothing animates. A toolbar is used constantly and any motion here is friction.",
		],
	},
	a11y: {
		role: "toolbar",
		keyboard: [
			"Arrow keys move between controls",
			"Home and End jump to the first and last control",
		],
		notes: [
			"role=toolbar promises roving focus, delivered by the primitive: each control must be a ToolbarButton (or another primitive-aware toolbar part) to register with it, not a plain button.",
			"Without roving focus a twelve-button toolbar adds twelve tab stops between the user and the content.",
			"Roving focus and keyboard nav are delegated to Base UI (React) and bits-ui (Svelte); shadcn/ui itself ships no reference for this component, since neither the React nor Svelte registry has one (this component predates that catalog).",
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
			entry: "Toolbar",
			files: [
				{ path: "toolbar/toolbar.tsx", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "@base-ui/react"],
		},
		svelte: {
			entry: "Toolbar",
			files: [
				{ path: "toolbar/toolbar.svelte", type: "registry:ui" },
				{ path: "toolbar/toolbar-button.svelte", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "bits-ui"],
		},
	},
	keywords: ["toolbar"],
});
