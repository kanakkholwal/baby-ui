import { defineComponent } from "../index";

export const responseStream = defineComponent({
	slug: "response-stream",
	name: "Response Stream",
	description: "Streamed assistant text with a caret that tracks the last character.",
	category: "agents",
	status: "stable",
	props: [
		{
			name: "text",
			type: "string",
			description: "Full text to reveal. Append to it as tokens arrive.",
			default:
				"Streaming reveals text at a steady rate so the reader is never chasing it.",
			control: { kind: "text" },
		},
		{
			name: "speed",
			type: "number",
			description: "Characters revealed per second.",
			default: 60,
			control: { kind: "number", min: 10, max: 200, step: 10 },
		},
		{
			name: "streaming",
			type: "boolean",
			description: "Whether more text is still coming. Controls the caret.",
			default: true,
			control: { kind: "boolean" },
		},
		{
			name: "size",
			type: '"sm" | "md" | "lg"',
			description: "Text size and leading.",
			default: "md",
			control: { kind: "select", options: ["sm", "md", "lg"] },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "Text appears in full immediately and the caret does not blink.",
		behaviour: [
			"Characters are revealed on a timer at `speed` per second, independent of how fast tokens arrive, so network jitter does not show.",
			"The caret blinks at 1s steps and disappears the moment `streaming` goes false.",
			"Revealing never re-renders earlier text, so selection made mid-stream survives.",
		],
	},
	a11y: {
		keyboard: [],
		notes: [
			"The container is aria-live=polite and announces only when streaming ends, so a screen reader is not read a partial sentence every frame.",
			"Under reduced motion the full text is present immediately, which is also what a screen reader gets.",
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
			entry: "ResponseStream",
			files: [
				{ path: "response-stream/response-stream.tsx", type: "registry:ui" },
				{ path: "response-stream/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "ResponseStream",
			files: [
				{ path: "response-stream/response-stream.svelte", type: "registry:ui" },
				{ path: "response-stream/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: ["stream", "typewriter", "ai", "response"],
});
