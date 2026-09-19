import { defineComponent } from "../index.js";

export const textarea = defineComponent({
	slug: "textarea",
	name: "Textarea",
	description: "Multi-line field that can grow with its content instead of scrolling.",
	category: "base",
	status: "stable",
	props: [
		{
			name: "rows",
			type: "number",
			description: "Initial visible rows.",
			default: 3,
			control: { kind: "number", min: 2, max: 12, step: 1 },
		},
		{
			name: "autoGrow",
			type: "boolean",
			description: "Grow to fit content up to maxRows, then scroll.",
			default: true,
			control: { kind: "boolean" },
		},
		{
			name: "maxRows",
			type: "number",
			description: "Row count at which growing stops and scrolling starts.",
			default: 10,
			control: { kind: "number", min: 4, max: 24, step: 1 },
		},
		{
			name: "invalid",
			type: "boolean",
			description: "Mark the field as failing validation.",
			default: false,
			control: { kind: "boolean" },
		},
		{
			name: "disabled",
			type: "boolean",
			description: "Disable the field.",
			default: false,
			control: { kind: "boolean" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "Height changes apply immediately without easing.",
		behaviour: [
			"Auto-grow sets height from scrollHeight on input, so the caret never leaves the visible area.",
			"Growth is not animated: a field that eases taller lags behind the character you just typed.",
		],
	},
	a11y: {
		keyboard: [],
		notes: [
			"Auto-grow changes the control height, not its value, so nothing is announced on resize.",
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
			entry: "Textarea",
			files: [
				{ path: "textarea/textarea.tsx", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
		svelte: {
			entry: "Textarea",
			files: [
				{ path: "textarea/textarea.svelte", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},
	keywords: ["textarea", "form", "multiline"],
});
