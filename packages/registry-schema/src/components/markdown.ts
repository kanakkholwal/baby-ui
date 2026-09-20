import { defineComponent } from "../index";

export const markdown = defineComponent({
	slug: "markdown",
	name: "Markdown",
	description: "Minimal block renderer for headings, paragraphs, lists and fenced code.",
	category: "base",
	status: "beta",
	props: [
		{
			name: "content",
			type: "string",
			description: "Markdown source. Block-level constructs only.",
			control: { kind: "none" },
		},
	],
	a11y: {
		keyboard: [],
		notes: [
			"Everything is rendered as text nodes; there is no innerHTML anywhere, so untrusted markdown cannot inject markup.",
			"Headings render as real heading elements, so the outline works.",
			"Deliberately small. Anything richer than headings, paragraphs, lists and fenced code belongs in a real pipeline, not in a component you copied.",
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
			entry: "Markdown",
			files: [
				{ path: "markdown/markdown.tsx", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
		svelte: {
			entry: "Markdown",
			files: [
				{ path: "markdown/markdown.svelte", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},
	keywords: ["markdown"],
});
