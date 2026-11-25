import { defineComponent, variantsOf } from "@baby-ui/registry-schema";
import { composer as composerVariants } from "./variants";

const VARIANTS = ["default"];
const SIZES = ["sm", "default", "lg"];

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
				"Composer: one row at rest that grows into a card once the text box is focused, or there is text or an attachment.",
			default: "default",
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
			name: "value / onValueChange",
			type: "string / (value: string) => void",
			description:
				"ComposerModelGroup: the chosen model. ComposerEffort: the chosen notch, 0 to levels - 1.",
			control: { kind: "none" },
		},
		{
			name: "levels / format / lowLabel / highLabel",
			type: "number / (value: number) => string / string / string",
			description:
				"ComposerEffort: how many notches, how a notch is named, and the labels at the two ends.",
			control: { kind: "none" },
		},
		{
			name: "expanded",
			type: "boolean",
			description:
				"Composer: force the card (true) or the single row (false). By default it opens for attachments or text.",
			control: { kind: "none" },
		},
		{
			name: "percent",
			type: "number",
			description: "ComposerContext: how full the context window is, 0 to 100.",
			control: { kind: "none" },
		},
		{
			name: "children",
			type: "ReactNode | Snippet",
			description:
				"Composer: ComposerFooter, ComposerFiles, ComposerInput, then ComposerToolbar with ComposerActions, ComposerMode, and ComposerTools holding the model picker, ComposerVoice and ComposerSubmit.",
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
