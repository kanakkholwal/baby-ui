import { defineComponent } from "../index.js";

export const fileTree = defineComponent({
	slug: "file-tree",
	name: "File Tree",
	description:
		"Keyboard-navigable file explorer with animated expand and collapse, indent guides, and single selection.",
	category: "advanced",
	status: "beta",

	props: [
		{
			name: "indent",
			type: "number",
			description: "Horizontal indent added per nesting level, in pixels.",
			default: 14,
			control: { kind: "number", min: 8, max: 32, step: 2 },
		},
		{
			name: "showGuides",
			type: "boolean",
			description: "Draw a vertical rule connecting the children of an open folder.",
			default: true,
			control: { kind: "boolean" },
		},
		{
			name: "defaultExpanded",
			type: "boolean",
			description: "Whether folders start open on first render.",
			default: true,
			control: { kind: "boolean" },
		},
		{
			name: "tree",
			type: "FileTreeNode[]",
			description: "Nested nodes. A node with `children` renders as a folder.",
			required: true,
			control: { kind: "none" },
		},
	],

	motion: {
		springs: [],
		reducedMotion: "Rows appear without the fade and travel; the chevron still rotates.",
		behaviour: [
			"Newly revealed rows fade and slide 2px into place over 200ms; the chevron rotates 90 degrees over the same duration, so the two read as one gesture.",
			"Collapsing removes rows immediately. An exit animation would need a JS-driven unmount in React and a transition in Svelte, and the two would not match.",
			"Selection is single: selecting a node clears the previous one.",
		],
	},

	a11y: {
		role: "tree",
		keyboard: [
			"Arrow Down and Arrow Up move between visible rows",
			"Arrow Right opens a closed folder, then moves into it",
			"Arrow Left closes an open folder, then moves to its parent",
			"Enter and Space select the focused row",
		],
		notes: [
			"Rows use roving tabindex, so the tree is one tab stop rather than one per file.",
			"`aria-expanded` is set on folders only; files omit it rather than reporting false.",
		],
	},

	impl: {
		react: {
			entry: "FileTree",
			files: [
				{ path: "file-tree/file-tree.tsx", type: "registry:ui" },
				{ path: "file-tree/types.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
		svelte: {
			entry: "FileTree",
			files: [
				{ path: "file-tree/file-tree.svelte", type: "registry:ui" },
				{ path: "file-tree/types.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},

	keywords: ["file tree", "explorer", "sidebar", "directory", "navigation"],
});
