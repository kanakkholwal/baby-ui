import { defineComponent } from "../index";

export const pagination = defineComponent({
	slug: "pagination",
	name: "Pagination",
	description: "Page links with a sliding window and always-visible first and last.",
	category: "base",
	status: "stable",
	props: [
		{
			name: "page",
			type: "number",
			description: "Current page, 1-based. Bindable.",
			default: 4,
			control: { kind: "number", min: 1, max: 20, step: 1 },
		},
		{
			name: "total",
			type: "number",
			description: "Total page count.",
			default: 12,
			control: { kind: "number", min: 1, max: 50, step: 1 },
		},
		{
			name: "siblings",
			type: "number",
			description: "Pages shown either side of the current one.",
			default: 1,
			control: { kind: "number", min: 0, max: 3, step: 1 },
		},
	],
	a11y: {
		keyboard: ["Tab reaches each page link and both arrows"],
		notes: [
			"A nav labelled Pagination; the current page carries aria-current=page.",
			"The arrows have accessible names, because a bare chevron is announced as button.",
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
			entry: "Pagination",
			files: [
				{ path: "pagination/pagination.tsx", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
		svelte: {
			entry: "Pagination",
			files: [
				{ path: "pagination/pagination.svelte", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},
	keywords: ["pagination"],
});
