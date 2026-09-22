import { defineComponent } from "../index";

export const chatComposer = defineComponent({
	slug: "chat-composer",
	name: "Chat Composer",
	description: "Interactive chat panel with tabs, scripted replies, and a composer.",
	category: "agents",
	status: "stable",
	props: [
		{
			name: "initialPrompt",
			type: "string",
			description: "The pre-filled prompt shown in the first user bubble before sending.",
			control: { kind: "text" },
		},
		{
			name: "messages",
			type: "ChatMessage[]",
			description: "Scripted agent replies revealed in sequence after the user sends.",
			control: { kind: "none" },
		},
		{
			name: "suggestions",
			type: "string[]",
			description: "Header chips (tabs) for switching context. Omit for none.",
			control: { kind: "none" },
		},
		{
			name: "placeholder",
			type: "string",
			description: "Composer input placeholder.",
			default: "Send a message…",
			control: { kind: "text" },
		},
	],
	motion: {
		springs: [],
		reducedMotion:
			"Every transition here is opacity/colour-only already; no travel to drop.",
		behaviour: [
			"The card's height never changes: replies scroll into a fixed conversation region rather than growing the panel.",
			"Each reply fades up on reveal; the first reply dims slightly while the second is still resolving, then settles at full opacity.",
		],
	},
	a11y: {
		keyboard: [
			"Enter in the input sends",
			"Tab reaches the tabs, header actions, and the send button",
		],
		notes: [
			'The composer\'s click-to-focus wrapper is `role="presentation"`; the real input carries `aria-label="Chat prompt"`.',
			'Each header icon button has its own distinct `aria-label` ("New"/"History"/"More"), not a shared generic one.',
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
			entry: "ChatComposer",
			files: [
				{ path: "chat-composer/chat-composer.tsx", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
		svelte: {
			entry: "ChatComposer",
			files: [
				{ path: "chat-composer/chat-composer.svelte", type: "registry:ui" },
				{ path: "chat-composer/types.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},
	keywords: ["chat", "composer", "conversation", "agent"],
});
