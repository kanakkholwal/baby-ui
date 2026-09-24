import { defineComponent } from "../index";

const CURSORS = ["bar", "block", "none"];

export const typewriter = defineComponent({
	slug: "typewriter",
	name: "Typewriter",
	description:
		"Types a line with human stumbles: wrong keys appear and get corrected on the way.",
	category: "text",
	status: "stable",
	variants: { cursor: CURSORS },
	props: [
		{
			name: "text",
			type: "string",
			description: "The line to type.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "durationMs",
			type: "number",
			description: "Scales every keystroke; 3000 is the reference pace.",
			default: 3000,
			control: { kind: "number", min: 1000, max: 9000, step: 500 },
		},
		{
			name: "loop",
			type: "boolean",
			description: "Hold the finished line for a second, then type it again.",
			default: true,
			control: { kind: "boolean" },
		},
		{
			name: "cursor",
			type: CURSORS.map((v) => `"${v}"`).join(" | "),
			description: "Caret shape while typing.",
			default: "bar",
			control: { kind: "select", options: CURSORS },
		},
		{
			name: "onComplete",
			type: "() => void",
			description: "Fired each time the line finishes typing.",
			control: { kind: "none" },
		},
		{
			name: "as",
			type: "string",
			description: "Element to render.",
			default: "div",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "The full line shows at once, with no caret and no loop.",
		behaviour: [
			"About 40% of keys first type a wrong symbol, pause 100 to 250ms, delete it, and sometimes stumble once more before the right key.",
			"Typos are seeded per pass, so server and client type the same way while each loop differs.",
			"The caret fades out and back over 800ms, linear, and hides during the 1s hold.",
		],
	},
	a11y: {
		notes: ["Screen readers get the final line once; the typed copy is hidden."],
	},
	licenseOrigin: {
		source: "iconiq",
		url: "https://iconiqui.com",
		license: "MIT",
		copyright: "Copyright (c) 2024-2026 Edwin Vakayil",
	},
	impl: {
		react: {
			entry: "Typewriter",
			files: [
				{ path: "typewriter/typewriter.tsx", type: "registry:ui" },
				{ path: "typewriter/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "Typewriter",
			files: [
				{ path: "typewriter/typewriter.svelte", type: "registry:ui" },
				{ path: "typewriter/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: ["typewriter", "typing", "typo", "caret", "text"],
});
