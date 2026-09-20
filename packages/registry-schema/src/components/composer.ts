import { defineComponent } from "../index";

export const composer = defineComponent({
	slug: "composer",
	name: "Composer",
	description:
		"Chat input that grows with content, sends on Enter and exposes a toolbar slot.",
	category: "agents",
	status: "stable",
	props: [
		{
			name: "value",
			type: "string",
			description: "Draft text. Bindable.",
			control: { kind: "text" },
		},
		{
			name: "placeholder",
			type: "string",
			description: "Field placeholder.",
			default: "Send a message\u2026",
			control: { kind: "text" },
		},
		{
			name: "busy",
			type: "boolean",
			description: "A send is in flight; the button shows a spinner and refuses.",
			default: false,
			control: { kind: "boolean" },
		},
		{
			name: "maxRows",
			type: "number",
			description: "Rows before the field scrolls.",
			default: 8,
			control: { kind: "number", min: 2, max: 16, step: 1 },
		},
		{
			name: "disabled",
			type: "boolean",
			description: "Disable the composer.",
			default: false,
			control: { kind: "boolean" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "Unchanged.",
		behaviour: [
			"Height follows content with no easing, for the same reason as the textarea: an eased grow lags the caret.",
		],
	},
	a11y: {
		keyboard: ["Enter sends", "Shift and Enter insert a line break"],
		notes: [
			"Enter sends and Shift+Enter breaks the line, which is the convention every chat client uses. The reverse strands anyone writing more than a sentence.",
			"The send button is disabled while empty or busy rather than hidden, so its position never shifts.",
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
			entry: "Composer",
			files: [
				{ path: "composer/composer.tsx", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
		svelte: {
			entry: "Composer",
			files: [
				{ path: "composer/composer.svelte", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},
	keywords: ["composer"],
});
