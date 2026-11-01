import { defineComponent, variantsOf } from "@baby-ui/registry-schema";
import { composer as composerVariants } from "./variants";

const VARIANTS = ["outline", "filled"];
const SIZES = ["sm", "md", "lg"];

export const composer = defineComponent({
	slug: "composer",
	name: "Composer",
	description:
		"Chat input that grows with content, sends on Enter, and composes an actions menu, a model picker and send or stop.",
	category: "agents",
	status: "stable",
	variants: variantsOf(composerVariants, ["variant", "size"]),
	props: [
		{
			name: "value / defaultValue / onValueChange",
			type: "string / string / (value: string) => void",
			description:
				"Composer: the draft. Controlled with onValueChange, uncontrolled from defaultValue; bindable in Svelte.",
			control: { kind: "none" },
		},
		{
			name: "onSubmit",
			type: "(value: string) => void",
			description: "Composer: called with the trimmed text on Enter or the send button.",
			control: { kind: "none" },
		},
		{
			name: "variant",
			type: VARIANTS.map((v) => `"${v}"`).join(" | "),
			description:
				"Composer: `outline` is the bordered field; `filled` sits on a muted surface.",
			default: "outline",
			control: { kind: "select", options: VARIANTS },
		},
		{
			name: "size",
			type: SIZES.map((v) => `"${v}"`).join(" | "),
			description: "Composer: padding and text size of the field.",
			default: "default",
			control: { kind: "select", options: SIZES },
		},
		{
			name: "loading",
			type: "boolean",
			description:
				"Composer: a reply is being written; ComposerSubmit becomes Stop and calls onStop.",
			default: false,
			control: { kind: "boolean" },
		},
		{
			name: "onStop",
			type: "() => void",
			description: "Composer: called by ComposerSubmit's stop button while loading.",
			control: { kind: "none" },
		},
		{
			name: "disabled",
			type: "boolean",
			description: "Composer: turns every part off.",
			default: false,
			control: { kind: "boolean" },
		},
		{
			name: "placeholder",
			type: "string",
			description: "ComposerInput: shown while the field is empty.",
			default: "Ask the agent to do something…",
			control: { kind: "text" },
		},
		{
			name: "maxRows",
			type: "number",
			description: "ComposerInput: lines before the field scrolls.",
			default: 8,
			control: { kind: "number", min: 2, max: 16, step: 1 },
		},
		{
			name: "actions / onAction",
			type: "ComposerAction[] / (value: string) => void",
			description: "ComposerActions: the menu behind the plus button.",
			control: { kind: "none" },
		},
		{
			name: "models / model / onModelChange",
			type: "ComposerModel[] / string / (model: string) => void",
			description: "ComposerModelSelect: the model picker; bindable `model` in Svelte.",
			control: { kind: "none" },
		},
		{
			name: "children",
			type: "ReactNode | Snippet",
			description:
				"Composer: ComposerInput, then ComposerToolbar with ComposerActions, ComposerModelSelect and ComposerSubmit.",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion:
			"Unchanged; the field has no motion beyond its own instant height changes.",
		behaviour: [
			"Height follows content with no easing, for the same reason as Textarea: an eased grow lags the caret.",
			'The "+" action-menu glyph rotates 45° while its menu is open, a plain CSS transform, not a spring.',
		],
	},
	a11y: {
		keyboard: [
			{ keys: ["Enter"], action: "Sends" },
			{ keys: ["Shift+Enter"], action: "Inserts a line break" },
		],
		notes: [
			"Enter sends and Shift+Enter breaks the line, the convention every chat client uses. The reverse strands anyone writing more than a sentence.",
			"A composing Enter (committing an IME conversion) never submits, only a plain Enter does.",
			"The send button is disabled while empty, disabled, or loading rather than hidden, so its position never shifts.",
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
			entry: "Composer",
		},
		svelte: {
			entry: "Composer",
		},
	},
	keywords: ["composer", "prompt", "chat", "input"],
});
