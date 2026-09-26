import { defineComponent } from "../index";

const COLUMNS = ["2", "3", "4"];
const ASPECTS = ["portrait", "square", "landscape"];

export const layeredStack = defineComponent({
	slug: "layered-stack",
	name: "Layered Stack",
	description:
		"Image cards piled in the centre at loose angles that fan out into a grid on hover or focus.",
	category: "animated",
	status: "stable",
	variants: { columns: COLUMNS, aspect: ASPECTS },
	props: [
		{
			name: "items",
			type: "{ src: string; alt: string }[]",
			description: "The cards; the first sits on top of the pile.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "columns",
			type: COLUMNS.map((v) => `"${v}"`).join(" | "),
			description: "Grid columns when spread; narrow containers drop to two.",
			default: "4",
			control: { kind: "select", options: COLUMNS },
		},
		{
			name: "aspect",
			type: ASPECTS.map((v) => `"${v}"`).join(" | "),
			description: "Card shape.",
			default: "portrait",
			control: { kind: "select", options: ASPECTS },
		},
		{
			name: "tilt",
			type: "number",
			description: "Largest resting tilt of a stacked card, in degrees.",
			default: 10,
			control: { kind: "number", min: 0, max: 30, step: 1 },
		},
		{
			name: "open",
			type: "boolean",
			description:
				"Controlled spread state; pair with `onOpenChange` (Svelte: `bind:open`).",
			control: { kind: "none" },
		},
		{
			name: "defaultOpen",
			type: "boolean",
			description: "Spread state before any interaction.",
			default: false,
			control: { kind: "none" },
		},
		{
			name: "onOpenChange",
			type: "(open: boolean) => void",
			description: "Fired when hover, focus or keys ask to spread or stack.",
			control: { kind: "none" },
		},
		{
			name: "label",
			type: "string",
			description: "Accessible name of the group.",
			default: "Card stack",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "Cards jump between pile and grid with no transition.",
		behaviour: [
			"Offsets from each grid cell to the centre are measured with a ResizeObserver; CSS transitions do the motion.",
			"Spreading and stacking run 800 ms on an expo-out curve; spreading staggers cards over 100 ms in order.",
			"Each card's resting tilt is a stable pseudo-random angle, so server and client agree.",
		],
	},
	a11y: {
		keyboard: [
			"Tab focuses the stack and spreads it",
			"Arrow keys, Home and End move between cards",
			"Enter or Space toggles spread; Escape stacks",
		],
		notes: ["Cards are a roving-tabindex group; each card is named by its alt text."],
	},
	licenseOrigin: {
		source: "componentry",
		url: "https://componentry.dev",
		license: "MIT",
		copyright: "Copyright (c) 2026 Harsh Jadhav",
	},
	impl: {
		react: {
			entry: "LayeredStack",
			files: [
				{ path: "layered-stack/layered-stack.tsx", type: "registry:ui" },
				{ path: "layered-stack/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "LayeredStack",
			files: [
				{ path: "layered-stack/layered-stack.svelte", type: "registry:ui" },
				{ path: "layered-stack/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: ["stack", "cards", "hover", "grid", "images", "spread"],
});
