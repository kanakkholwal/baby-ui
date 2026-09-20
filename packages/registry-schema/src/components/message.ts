import { defineComponent } from "../index";

export const message = defineComponent({
	slug: "message",
	name: "Message",
	description:
		"Chat turn with sender-aware alignment, avatar, and actions that appear on hover.",
	category: "agents",
	status: "stable",
	variants: { role: ["user", "assistant"] },
	props: [
		{
			name: "role",
			type: '"user" | "assistant"',
			description: "Who sent the turn. Drives alignment and surface.",
			default: "assistant",
			control: { kind: "select", options: ["user", "assistant"] },
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
			description: "Reveal copy and retry actions on hover.",
			default: true,
			control: { kind: "boolean" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "Actions appear without the fade; the typing dots stop.",
		behaviour: [
			"Actions fade in over 150ms on hover or focus-within, never on a timer.",
			"The typing indicator is three dots on a staggered 1.2s loop, which reads as waiting rather than as progress.",
		],
	},
	a11y: {
		keyboard: [],
		notes: [
			"Each turn is an article with an accessible name of the sender, so a screen reader can walk the transcript turn by turn.",
			"Hover-revealed actions stay in the tab order and become visible on focus; hiding them from the keyboard would make them unreachable.",
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
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
		svelte: {
			entry: "Message",
			files: [
				{ path: "message/message.svelte", type: "registry:ui" },
				{ path: "message/message-actions.svelte", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},
	keywords: ["message", "chat", "ai", "transcript"],
});
