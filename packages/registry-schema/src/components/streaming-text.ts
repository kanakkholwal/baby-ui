import { defineComponent } from "../index";

const LAYOUTS = ["inline", "card"];

export const streamingText = defineComponent({
	slug: "streaming-text",
	name: "Streaming Text",
	description:
		"Word-by-word answer reveal with inline citation chips, then actions, sources and follow-ups once it settles.",
	category: "agents",
	status: "stable",
	variants: { layout: LAYOUTS },
	props: [
		{
			name: "layout",
			type: LAYOUTS.map((v) => `"${v}"`).join(" | "),
			description:
				"`card` wraps the answer in a bordered surface; `inline` (default) has none, for embedding inside a Message bubble.",
			default: "inline",
			control: { kind: "select", options: LAYOUTS },
		},
		{
			name: "content",
			type: "StreamingToken[]",
			description:
				'The answer, tokenized. A token is a word, or `{ text: "", cite: n }` to place a citation chip for `sources[n]` inline.',
			control: { kind: "none" },
		},
		{
			name: "sources",
			type: "StreamingSource[]",
			description:
				"Cited sources, shown as inline chips and in the expandable sources list.",
			control: { kind: "none" },
		},
		{
			name: "followUps",
			type: "string[]",
			description:
				"Follow-up prompt suggestions shown once the answer finishes revealing.",
			control: { kind: "none" },
		},
		{
			name: "wordDelay",
			type: "number",
			description: "Milliseconds between each revealed word.",
			default: 55,
			control: { kind: "number", min: 10, max: 200, step: 5 },
		},
	],
	motion: {
		springs: [],
		reducedMotion:
			"The whole answer renders immediately; the caret and citation pop-ins drop.",
		behaviour: [
			"Words reveal one at a time and stop, same contract as ResponseStream; there is no gallery-style auto-loop baked in.",
			"Actions, sources and follow-ups fade in together once every word has revealed.",
		],
	},
	a11y: {
		keyboard: [],
		notes: [
			"Retry and the thumbs-up/down feedback buttons only render when `onRetry`/`onFeedback` are passed; Copy always works, reading the assembled plain text.",
			"Citation chips and source rows are real links, not styled spans with a click handler.",
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
			entry: "StreamingText",
			files: [
				{ path: "streaming-text/streaming-text.tsx", type: "registry:ui" },
				{ path: "streaming-text/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "StreamingText",
			files: [
				{ path: "streaming-text/streaming-text.svelte", type: "registry:ui" },
				{ path: "streaming-text/types.ts", type: "registry:ui" },
				{ path: "streaming-text/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: ["streaming", "answer", "citations", "sources", "follow-ups", "agent"],
});
