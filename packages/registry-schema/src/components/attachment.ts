import { defineComponent } from "../index";

export const attachment = defineComponent({
	slug: "attachment",
	name: "Attachment",
	description: "File row with upload progress, ready and error states.",
	category: "agents",
	status: "stable",
	props: [
		{
			name: "name",
			type: "string",
			description: "File name.",
			default: "spec-draft.md",
			control: { kind: "text" },
		},
		{
			name: "size",
			type: "string",
			description: "Human-readable size, shown when ready.",
			default: "18 KB",
			control: { kind: "text" },
		},
		{
			name: "status",
			type: '"uploading" | "ready" | "error"',
			description: "Current state.",
			default: "ready",
			control: { kind: "select", options: ["uploading", "ready", "error"] },
		},
		{
			name: "progress",
			type: "number",
			description: "Upload percentage, used while uploading.",
			default: 40,
			control: { kind: "number", min: 0, max: 100, step: 1 },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "The bar jumps to its value.",
		behaviour: [
			"The progress bar eases over 280ms, matching the standalone progress component.",
		],
	},
	a11y: {
		keyboard: ["The remove button is reachable by Tab"],
		notes: [
			"The state is always written out as text, never carried by the border colour alone.",
			"The remove button names the file it removes, so a list of them is not five identical Remove buttons.",
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
			entry: "Attachment",
			files: [
				{ path: "attachment/attachment.tsx", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
		svelte: {
			entry: "Attachment",
			files: [
				{ path: "attachment/attachment.svelte", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},
	keywords: ["attachment"],
});
