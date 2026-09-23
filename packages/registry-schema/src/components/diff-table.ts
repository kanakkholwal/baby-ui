import { defineComponent } from "../index";

const CHANGES = ["removed", "added"];

export const diffTable = defineComponent({
	slug: "diff-table",
	name: "Diff Table",
	description:
		"A proposed edit as a table; each changed row is its own include/exclude toggle.",
	category: "advanced",
	status: "stable",
	variants: { change: CHANGES },
	props: [
		{
			name: "title",
			type: "string",
			description: "Header label above the table.",
			default: "Proposed changes",
			control: { kind: "text" },
		},
		{
			name: "rows",
			type: "DiffRow[]",
			description:
				'Every changed row, removed and added alike, each with its own `change` ("removed"/"added") and optional `included` starting state.',
			control: { kind: "none" },
		},
		{
			name: "onApply",
			type: "(includedKeys: string[]) => void",
			description:
				"Fired when Apply is pressed, with the keys of every currently-included row.",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion:
			"Rows lose their staggered fade-up entrance; the footer's applied state drops its pop-in.",
		behaviour: [
			'Rows fade up on mount with a staggered delay, no scripted "computing the diff" reveal.',
			'A row toggles include/exclude on click until Apply is pressed, after which the table locks and the footer shows an "N edits applied" confirmation.',
		],
	},
	a11y: {
		keyboard: ["Tab reaches each toggleable row", "Enter and Space toggle a row"],
		notes: [
			'Each row carries `role="checkbox"`/`aria-checked` since the whole row is the control, not a separate input.',
			"Removed rows use both colour and a strikethrough; added rows use colour and the same include/exclude mark, so neither depends on colour alone.",
		],
	},
	licenseOrigin: {
		source: "beUI",
		url: "https://beui.dev",
		license: "MIT",
		copyright: "Copyright (c) 2026 beUI",
	},
	impl: {
		react: {
			entry: "DiffTable",
			files: [
				{ path: "diff-table/diff-table.tsx", type: "registry:ui" },
				{ path: "diff-table/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
			registryDependencies: ["badge", "button"],
		},
		svelte: {
			entry: "DiffTable",
			files: [
				{ path: "diff-table/diff-table.svelte", type: "registry:ui" },
				{ path: "diff-table/types.ts", type: "registry:ui" },
				{ path: "diff-table/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
			registryDependencies: ["badge", "button"],
		},
	},
	keywords: ["diff", "table", "review", "changes"],
});
