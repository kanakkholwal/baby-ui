import { defineComponent } from "../index";

export const reasoning = defineComponent({
	slug: "reasoning",
	name: "Reasoning",
	description:
		"Collapsible chain-of-thought panel that opens while thinking and closes when done.",
	category: "agents",
	status: "beta",
	props: [
		{
			name: "thinking",
			type: "boolean",
			description: "Model is still reasoning. Drives the auto-open and the timer.",
			default: true,
			control: { kind: "boolean" },
		},
		{
			name: "duration",
			type: "number",
			description: "Seconds spent reasoning, shown in the header once finished.",
			default: 4,
			control: { kind: "number", min: 0, max: 60, step: 1 },
		},
		{
			name: "defaultOpen",
			type: "boolean",
			description: "Open on mount rather than waiting for `thinking`.",
			default: false,
			control: { kind: "boolean" },
		},
	],
	motion: {
		springs: [],
		reducedMotion:
			"The panel opens and closes without the height animation; the shimmer stops.",
		behaviour: [
			"The header label shimmers while `thinking` and settles to a duration when it flips false.",
			"The panel auto-opens when thinking starts and auto-closes when it ends, unless the reader has touched it, in which case their choice wins.",
			"Height animates with grid-template-rows, so no JS measures the content.",
		],
	},
	a11y: {
		keyboard: ["Enter and Space toggle the panel"],
		notes: [
			"The trigger is a button with aria-expanded pointing at the panel region.",
			"Reasoning is supplementary, so the panel is not a live region; announcing it would talk over the answer.",
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
			entry: "Reasoning",
			files: [
				{ path: "reasoning/reasoning.tsx", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
		svelte: {
			entry: "Reasoning",
			files: [
				{ path: "reasoning/reasoning.svelte", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},
	keywords: ["reasoning", "thinking", "ai", "chain of thought"],
});
