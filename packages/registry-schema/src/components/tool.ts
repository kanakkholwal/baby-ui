import { defineComponent } from "../index";

export const tool = defineComponent({
	slug: "tool",
	name: "Tool Call",
	description: "Collapsible tool invocation showing state, input and output.",
	category: "agents",
	status: "beta",
	props: [
		{
			name: "name",
			type: "string",
			description: "Tool name, shown in monospace.",
			default: "search_docs",
			control: { kind: "text" },
		},
		{
			name: "status",
			type: '"pending" | "running" | "done" | "error"',
			description: "Current state.",
			default: "running",
			control: { kind: "select", options: ["pending", "running", "done", "error"] },
		},
		{
			name: "input",
			type: "string",
			description: "Serialised arguments.",
			control: { kind: "none" },
		},
		{
			name: "output",
			type: "string",
			description: "Serialised result.",
			control: { kind: "none" },
		},
		{
			name: "defaultOpen",
			type: "boolean",
			description: "Start expanded.",
			default: false,
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "The spinner stops and the panel opens instantly.",
		behaviour: [
			"Only the running state animates. Everything else is a static icon, so a finished list is still.",
			"The panel opens with grid-template-rows, so no JavaScript measures the payload.",
		],
	},
	a11y: {
		keyboard: ["Enter and Space toggle the panel"],
		notes: [
			"State is written out as a word beside the icon, so it does not depend on colour.",
			"Collapsed by default: a transcript full of expanded tool payloads buries the answer.",
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
			entry: "Tool",
			files: [
				{ path: "tool/tool.tsx", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
		svelte: {
			entry: "Tool",
			files: [
				{ path: "tool/tool.svelte", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},
	keywords: ["tool"],
});
