import { defineComponent } from "../index";

export const tagInput = defineComponent({
	slug: "tag-input",
	name: "Tag Input",
	description:
		"Free-text tags with Enter to commit and Backspace to remove the last one.",
	category: "base",
	status: "stable",
	props: [
		{
			name: "tags",
			type: "string[]",
			description: "Current tags. Bindable.",
			control: { kind: "none" },
		},
		{
			name: "placeholder",
			type: "string",
			description: "Field placeholder.",
			default: "Add a tag\u2026",
			control: { kind: "text" },
		},
		{
			name: "max",
			type: "number",
			description: "Maximum number of tags.",
			default: 6,
			control: { kind: "number", min: 1, max: 12, step: 1 },
		},
		{
			name: "disabled",
			type: "boolean",
			description: "Disable the control.",
			default: false,
			control: { kind: "boolean" },
		},
	],
	a11y: {
		keyboard: [
			"Enter or comma commits the current text",
			"Backspace on an empty field removes the last tag",
			"Each tag's remove button is reachable by Tab",
		],
		notes: [
			"A live region reports the tag count, so adding and removing is audible without focusing each chip.",
			"Duplicates are rejected silently rather than added twice.",
			"Blur commits any pending text, so a half-typed tag is not lost when the user clicks away.",
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
			entry: "TagInput",
			files: [
				{ path: "tag-input/tag-input.tsx", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
		svelte: {
			entry: "TagInput",
			files: [
				{ path: "tag-input/tag-input.svelte", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},
	keywords: ["tag", "input"],
});
