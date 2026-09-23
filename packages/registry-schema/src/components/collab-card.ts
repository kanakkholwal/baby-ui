import { defineComponent } from "../index";

export const collabCard = defineComponent({
	slug: "collab-card",
	name: "Collab Card",
	description:
		"A Figma-style multiplayer canvas: wandering cursors, click bursts, live presence.",
	category: "blocks",
	status: "alpha",
	props: [
		{
			name: "collaborators",
			type: "[CollabCardCollaborator, CollabCardCollaborator]",
			description:
				"The two named editors whose cursors click on the pills below the frame.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "presenceColors",
			type: "string[]",
			description: "Avatar swatch colors for the visible presence stack, left to right.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "extraCount",
			type: "number",
			description: "Editors beyond the visible swatches, shown as a `+N` avatar.",
			default: 0,
			control: { kind: "number", min: 0, max: 9, step: 1 },
		},
		{
			name: "greeting",
			type: "string",
			description: "The giant word inside the dashed frame.",
			default: "hello!",
			control: { kind: "text" },
		},
		{
			name: "eyebrow",
			type: "string",
			description: "Small line above the frame.",
			default: "Now in multiplayer",
			control: { kind: "text" },
		},
		{
			name: "intro",
			type: "string",
			description: "Word before the first collaborator's pill.",
			default: "editing",
			control: { kind: "text" },
		},
		{
			name: "conjunction",
			type: "string",
			description: "Joiner between the two collaborator pills.",
			default: "&",
			control: { kind: "text" },
		},
		{
			name: "trailing",
			type: "string",
			description: "Optional word after the second collaborator's pill.",
			control: { kind: "text" },
		},
		{
			name: "liveLabel",
			type: "string",
			description:
				"Status line beside the live dot. Defaults to a count derived from `presenceColors`/`extraCount`, never a fixed number.",
			control: { kind: "none" },
		},
		{
			name: "backgroundUrl",
			type: "string",
			description: "Background image URL. Falls back to a dark canvas gradient.",
			control: { kind: "text" },
		},
	],
	motion: {
		springs: [],
		reducedMotion:
			"Every cursor, the click burst and the live-dot ping freeze in place at full opacity.",
		behaviour: [
			"The host cursor wanders a fixed multi-point path; each collaborator's cursor jitters near a pill and fires a click-burst ring on a loop, all timed independently so they never sync up.",
			"Every dimension is in `cqi` (container query inline units), so the whole card (frame, cursors, pills, presence stack) scales continuously with its own width, not with viewport breakpoints.",
		],
	},
	a11y: {
		keyboard: [],
		notes: [
			"Purely decorative: cursors, the live-ping dot and the presence stack are all `aria-hidden`.",
			"The Figma-brand colors (`#0D99FF`, `#A259FF`, `#FF7262`, `#1ABCFE`, `#0ACF83`) are fixed, not theme tokens: this card depicts a specific external tool's canvas and stays dark regardless of the site's light/dark mode, the same way a browser-chrome mockup wouldn't reskin either.",
		],
	},
	licenseOrigin: {
		source: "animata",
		url: "https://animata.design",
		license: "MIT",
		copyright: "Copyright (c) animata",
	},
	impl: {
		react: {
			entry: "CollabCard",
			files: [
				{ path: "collab-card/collab-card.tsx", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
		svelte: {
			entry: "CollabCard",
			files: [
				{ path: "collab-card/collab-card.svelte", type: "registry:ui" },
				{ path: "collab-card/types.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},
	keywords: ["collaboration", "multiplayer", "cursors", "presence", "figma", "bento"],
});
