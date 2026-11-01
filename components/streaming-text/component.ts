import { defineComponent, variantsOf } from "@baby-ui/registry-schema";
import { streamingText as streamingTextVariants } from "./variants";

const LAYOUTS = ["inline", "card"];
const SIZES = ["sm", "default", "lg"];

export const streamingText = defineComponent({
	slug: "streaming-text",
	name: "Streaming Text",
	description:
		"Word-by-word answer reveal, plain or with inline citation chips, then a footer, sources and follow-ups once it settles.",
	category: "agents",
	status: "stable",
	variants: variantsOf(streamingTextVariants, ["layout", "size"]),
	props: [
		{
			name: "layout",
			type: LAYOUTS.map((v) => `"${v}"`).join(" | "),
			description:
				"StreamingText: `card` wraps the answer in a bordered surface; `inline` has none, for a Message bubble.",
			default: "inline",
			control: { kind: "select", options: LAYOUTS },
		},
		{
			name: "size",
			type: SIZES.map((v) => `"${v}"`).join(" | "),
			description: "StreamingText: type scale of the answer.",
			default: "default",
			control: { kind: "select", options: SIZES },
		},
		{
			name: "sources",
			type: "StreamingSource[]",
			description:
				"StreamingText: cited sources, as inline chips and in StreamingTextSources.",
			control: { kind: "none" },
		},
		{
			name: "content",
			type: "StreamingToken[] | string",
			description:
				'StreamingTextContent: a plain string, or tokens where `{ text: "", cite: n }` places a chip for `sources[n]`.',
			control: { kind: "none" },
		},
		{
			name: "markdown",
			type: "boolean",
			description:
				"StreamingTextContent: render as Markdown; the reveal follows `streaming`.",
			default: false,
			control: { kind: "boolean" },
		},
		{
			name: "streaming",
			type: "boolean",
			description: "StreamingTextContent: Markdown chunks are still arriving.",
			control: { kind: "none" },
		},
		{
			name: "caret",
			type: "boolean",
			description: "StreamingTextContent: a blinking caret while the text reveals.",
			default: true,
			control: { kind: "boolean" },
		},
		{
			name: "wordDelay",
			type: "number",
			description: "StreamingTextContent: milliseconds between words.",
			default: 55,
			control: { kind: "number", min: 10, max: 200, step: 5 },
			showWhen: { markdown: [false] },
		},
		{
			name: "onDone",
			type: "() => void",
			description: "StreamingTextContent: called once the answer has fully revealed.",
			control: { kind: "none" },
		},
		{
			name: "items / onSelect",
			type: "string[] / (text: string, index: number) => void",
			description: "StreamingTextFollowUps: suggested next prompts.",
			control: { kind: "none" },
		},
		{
			name: "children",
			type: "ReactNode | Snippet",
			description:
				"StreamingText: StreamingTextContent, StreamingTextFooter (StreamingTextCopy, MessageActions, StreamingTextSources), StreamingTextFollowUps.",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion:
			"The whole answer renders immediately; the caret and citation pop-ins drop.",
		behaviour: [
			"Words reveal one at a time and stop; there is no gallery-style auto-loop baked in.",
			"Actions, sources and follow-ups fade in together once every word has revealed.",
		],
	},
	a11y: {
		keyboard: [],
		notes: [
			"StreamingTextCopy copies the plain text; compose MessageActions in the footer for retry and feedback.",
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
		},
		svelte: {
			entry: "StreamingText",
		},
	},
	keywords: ["streaming", "answer", "citations", "sources", "follow-ups", "agent"],
});
