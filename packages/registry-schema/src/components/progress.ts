import { defineComponent } from "../index";

export const progress = defineComponent({
	slug: "progress",
	name: "Progress",
	description: "Determinate and indeterminate progress bar sharing one track.",
	category: "base",
	status: "stable",
	variants: { size: ["sm", "md"] },
	props: [
		{
			name: "value",
			type: "number",
			description: "Completion from 0 to 100. Ignored when indeterminate.",
			default: 40,
			control: { kind: "number", min: 0, max: 100, step: 1 },
		},
		{
			name: "indeterminate",
			type: "boolean",
			description: "Unknown duration: the bar sweeps instead of filling.",
			default: false,
			control: { kind: "boolean" },
		},
		{
			name: "size",
			type: '"sm" | "md"',
			description: "Track thickness.",
			default: "md",
			control: { kind: "select", options: ["sm", "md"] },
		},
	],
	motion: {
		springs: [],
		reducedMotion:
			"The indeterminate sweep stops and the track shows a static partial fill.",
		behaviour: [
			"A determinate bar eases its width over 280ms, so a jump from 10 to 90 reads as progress rather than a cut.",
			"The indeterminate sweep is a 1.4s linear loop; easing it would imply progress that is not being measured.",
		],
	},
	a11y: {
		role: "progressbar",
		keyboard: [],
		notes: [
			"Determinate sets aria-valuenow, aria-valuemin and aria-valuemax; indeterminate omits aria-valuenow entirely rather than reporting 0.",
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
			entry: "Progress",
			files: [
				{ path: "progress/progress.tsx", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
		svelte: {
			entry: "Progress",
			files: [
				{ path: "progress/progress.svelte", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},
	keywords: ["progress", "loading", "bar"],
});
