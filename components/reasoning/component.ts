import { defineComponent, variantsOf } from "@baby-ui/registry-schema";
import { reasoning as reasoningVariants } from "./variants";

const VARIANTS = ["default", "framed"];

export const reasoning = defineComponent({
	slug: "reasoning",
	name: "Reasoning",
	description:
		"Collapsible chain-of-thought panel with steps, sources, images or trace rows; opens while thinking and closes when done.",
	category: "agents",
	status: "stable",
	variants: variantsOf(reasoningVariants, ["variant"]),
	props: [
		{
			name: "thinking",
			type: "boolean",
			description: "Model is still reasoning. Drives the auto-open and the timer.",
			default: true,
			control: { kind: "boolean" },
		},
		{
			name: "duration",
			type: "number",
			description: "Seconds spent reasoning, shown in the header once finished.",
			default: 4,
			control: { kind: "number", min: 0, max: 60, step: 1 },
		},
		{
			name: "open",
			type: "boolean",
			description:
				"Controlled open state; bindable in Svelte. Omit to follow `thinking`.",
			control: { kind: "none" },
		},
		{
			name: "defaultOpen",
			type: "boolean",
			description: "Open on mount rather than waiting for `thinking`.",
			default: false,
			control: { kind: "boolean" },
		},
		{
			name: "onOpenChange",
			type: "(open: boolean) => void",
			description: "Fired when the reader toggles the panel.",
			control: { kind: "none" },
		},
		{
			name: "variant",
			type: VARIANTS.map((v) => `"${v}"`).join(" | "),
			description:
				"Reasoning: `default` has no chrome, just a header row over an indented body. `framed` puts it on a card surface.",
			default: "default",
			control: { kind: "select", options: VARIANTS },
		},
		{
			name: "thinkingLabel",
			type: "string",
			description:
				'ReasoningTitle: shown while thinking; its children show once done, e.g. "Thought for 4s".',
			default: "Thinking",
			control: { kind: "none" },
		},
		{
			name: "format",
			type: "(seconds: number) => string",
			description:
				"ReasoningDuration: how the seconds so far read. It only shows while thinking.",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion:
			"The panel opens and closes without the height animation; the shimmer stops.",
		behaviour: [
			"The title shimmers and the 3 x 3 pixel icon pulses while `thinking`; both settle when it flips false.",
			"The panel auto-opens when thinking starts and auto-closes when it ends, unless the reader has touched it, in which case their choice wins.",
			"Height animates with grid-template-rows, so no JS measures the content.",
			"Collapsed while thinking, the active step's label slides up under the title, fading in from an 8px drop and 3px blur over 220ms.",
			"A step that turns active grows its row open and fades in over --duration-overlay; its glyph pops from a dot to a check when done.",
			"Pending steps render nothing until they turn active or done.",
			"ReasoningRows fade up one by one 80ms apart; `kind` picks ticking steps (the active one spins), linked search sources or selectable files with +/- counts.",
		],
	},
	a11y: {
		keyboard: [
			{ keys: ["Enter", "Space"], action: "Toggles the panel and each step's details" },
		],
		notes: [
			"The trigger is a button with aria-expanded pointing at the panel region.",
			"Reasoning is supplementary, so the panel is not a live region; announcing it would talk over the answer.",
		],
	},
	impl: {
		react: {
			entry: "Reasoning",
		},
		svelte: {
			entry: "Reasoning",
		},
	},
	keywords: [
		"reasoning",
		"thinking",
		"ai",
		"chain of thought",
		"steps",
		"sources",
		"trace",
		"tools",
	],
});
