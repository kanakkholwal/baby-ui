import { defineComponent } from "../index";

export const chatComposer = defineComponent({
	slug: "chat-composer",
	name: "Chat Composer",
	description:
		"Interactive chat panel with switchable topic tabs, scripted replies, and a composer.",
	category: "agents",
	status: "stable",
	props: [
		{
			name: "topics",
			type: "ChatTopic[]",
			description:
				"Every switchable thread; the header tabs are these topics, each with its own starting prompt and scripted replies.",
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
			"Tab reaches the topic tabs, header actions, and the send button",
		],
		notes: [
			"The composer's click-to-focus wrapper has no ARIA role of its own; the real input carries `aria-label=\"Chat prompt\"` and is independently focusable, so the wrapper's click is a mouse-only convenience with no keyboard functionality riding on it.",
			'"New", "Prompt history" and "More actions" each have their own distinct `aria-label`, not a shared generic one.',
			'Copying the conversation announces its result ("Copied"/"Couldn\'t copy") through a `role="status"` live region.',
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
			registryDependencies: ["dropdown-menu"],
		},
		svelte: {
			entry: "ChatComposer",
			files: [
				{ path: "chat-composer/chat-composer.svelte", type: "registry:ui" },
				{ path: "chat-composer/types.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
			registryDependencies: ["dropdown-menu"],
		},
	},
	keywords: ["chat", "composer", "conversation", "agent"],
});
