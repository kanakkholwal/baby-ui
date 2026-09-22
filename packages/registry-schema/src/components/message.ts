import { defineComponent } from "../index";

const TONES = ["surface", "solid", "muted", "outline", "destructive", "raw"];
const LAYOUTS = ["default", "compact", "wide"];
const MOTIONS = ["none", "fade", "slide", "imessage"];

export const message = defineComponent({
	slug: "message",
	name: "Message",
	description:
		"Chat turn with sender-aware alignment, an independent colour variant, and actions that appear on hover.",
	category: "agents",
	status: "stable",
	variants: {
		align: ["start", "end"],
		tone: TONES,
		layout: LAYOUTS,
		motion: MOTIONS,
	},
	props: [
		{
			name: "align",
			type: '"start" | "end"',
			description:
				'Which side the turn sits on. The only thing that reads as "sender"; colour is a separate axis.',
			default: "start",
			control: { kind: "select", options: ["start", "end"] },
		},
		{
			name: "tone",
			type: TONES.map((v) => `"${v}"`).join(" | "),
			description:
				"Bubble colour, independent of `align` so Message works outside a two-party chat. `surface` is the neutral received-style look, `solid` is high-emphasis, `destructive` reads as a failed/system turn, `raw` drops the border and background only (padding and shape stay) so you can supply your own surface via `bubbleClassName`.",
			default: "surface",
			control: { kind: "select", options: TONES },
		},
		{
			name: "layout",
			type: LAYOUTS.map((v) => `"${v}"`).join(" | "),
			description:
				"`compact` drops the avatar for dense reuse (e.g. inside Conversation); `wide` removes the 85% width clamp.",
			default: "default",
			control: { kind: "select", options: LAYOUTS },
		},
		{
			name: "motion",
			type: MOTIONS.map((v) => `"${v}"`).join(" | "),
			description:
				"Entrance transition. `imessage` slides up with a scale overshoot, matching iMessage's bubble pop.",
			default: "none",
			control: { kind: "select", options: MOTIONS },
		},
		{
			name: "name",
			type: "string",
			description: "Sender name, used for the avatar fallback.",
			default: "Assistant",
			control: { kind: "text" },
		},
		{
			name: "pending",
			type: "boolean",
			description: "Show the typing indicator instead of content.",
			default: false,
			control: { kind: "boolean" },
		},
		{
			name: "showActions",
			type: "boolean",
			description:
				"Reveal the actions row on hover. Copy always works; Retry only renders when `onRetry` is passed.",
			default: true,
			control: { kind: "boolean" },
		},
	],
	motion: {
		springs: [],
		reducedMotion:
			"Entrance animations drop travel and scale; actions appear without the fade and the typing dots stop.",
		behaviour: [
			"Actions fade in over 150ms on hover or focus-within, never on a timer.",
			"The typing indicator is three dots on a staggered 1.2s loop, which reads as waiting rather than as progress.",
			"The `imessage` motion variant plays once on mount: a 320ms slide-up with a scale overshoot, not a spring that resettles.",
		],
	},
	a11y: {
		keyboard: [],
		notes: [
			"Each turn is an article with an accessible name of the sender, so a screen reader can walk the transcript turn by turn.",
			"Hover-revealed actions stay in the tab order and become visible on focus; hiding them from the keyboard would make them unreachable.",
			"Copy reads the rendered bubble's own text and announces success via its accessible name; there is nothing decorative in the actions row.",
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
			entry: "Message",
			files: [
				{ path: "message/message.tsx", type: "registry:ui" },
				{ path: "message/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "Message",
			files: [
				{ path: "message/message.svelte", type: "registry:ui" },
				{ path: "message/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: ["message", "chat", "ai", "transcript"],
});
