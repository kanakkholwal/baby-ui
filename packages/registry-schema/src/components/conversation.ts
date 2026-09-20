import { defineComponent } from "../index";

export const conversation = defineComponent({
	slug: "conversation",
	name: "Conversation",
	description:
		"Transcript viewport that follows new turns only when the reader is at the bottom.",
	category: "agents",
	status: "stable",
	props: [
		{
			name: "maxHeight",
			type: "string",
			description: "CSS max-height for the viewport.",
			default: "24rem",
			control: { kind: "text" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "The jump scrolls instantly.",
		behaviour: [
			"New turns are followed only while pinned within 24px of the bottom, which tolerates sub-pixel scroll rounding.",
			"The jump button uses smooth scrolling, which the platform already disables under reduced motion.",
		],
	},
	a11y: {
		keyboard: ["The jump-to-latest button is reachable by Tab when visible"],
		notes: [
			"Auto-scroll is suspended the moment the reader scrolls up. Yanking someone back to the bottom while they are reading is the single most common bug in a chat transcript.",
			"A jump-to-latest control appears only when the view is detached, so it never covers content unnecessarily.",
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
			entry: "Conversation",
			files: [
				{ path: "conversation/conversation.tsx", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
		svelte: {
			entry: "Conversation",
			files: [
				{ path: "conversation/conversation.svelte", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},
	keywords: ["conversation"],
});
