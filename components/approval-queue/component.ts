import { defineComponent, variantsOf } from "@baby-ui/registry-schema";
import { approvalQueue as approvalQueueVariants } from "./variants";

const VARIANTS = ["framed", "plain"];

export const approvalQueue = defineComponent({
	slug: "approval-queue",
	name: "Approval Queue",
	description:
		"Requests an agent is waiting on, one open for review as an Approval Gate and the rest as one-line rows that fold away once decided.",
	category: "agents",
	status: "beta",
	added: "2026-11-01",
	variants: variantsOf(approvalQueueVariants, ["variant"]),
	props: [
		{
			name: "variant",
			type: VARIANTS.map((v) => `"${v}"`).join(" | "),
			description:
				"ApprovalQueue: `framed` holds the rows in a card rim under the header; `plain` drops the chrome.",
			default: "framed",
			control: { kind: "select", options: VARIANTS },
		},
		{
			name: "value / onValueChange",
			type: "string | null / (value: string | null) => void",
			description:
				"ApprovalQueue: the item under review. Controlled: move it to the next request after a decision.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "value / dismissed",
			type: "string / boolean",
			description:
				"ApprovalQueueItem: its id, and whether it has folded away. Keep decided items mounted until then.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "kind",
			type: '"function" | "terminal" | "request" | "search"',
			description: "ApprovalQueueKind: the tool's glyph, the same set as Tool.",
			default: "function",
			control: { kind: "none" },
		},
		{
			name: "value",
			type: "number",
			description: "ApprovalQueueCount: how many requests wait; it rolls as it changes.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "open",
			type: "boolean",
			description: "ApprovalQueueEmpty: unfolds the empty line once nothing waits.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "children",
			type: "ReactNode | Snippet",
			description:
				"ApprovalQueue: ApprovalQueueHeader (Icon, Title, Count), then ApprovalQueueList of ApprovalQueueItem (Trigger with Kind, Label, Meta; Content with an ApprovalGate) and ApprovalQueueEmpty.",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "Rows open, close and fold away without easing.",
		behaviour: [
			"The open row unfolds on grid rows; the one before it folds on the same timing.",
			"A dismissed item folds to nothing and fades, so the rows below slide up.",
			"The count rolls to its new value.",
		],
	},
	a11y: {
		keyboard: [
			{ keys: ["Tab"], action: "Moves through the rows and the open request's actions" },
			{ keys: ["Enter", "Space"], action: "Opens or closes a row" },
		],
		notes: [
			"Rows are accordion triggers with aria-expanded; the open panel is a region named by its row.",
			"Dismissed and closed items are inert, so they leave the tab order while they fold.",
			'The count reads as a number and a word, e.g. "3 waiting".',
		],
	},
	guidance: {
		when: ["An agent is blocked on several sign-offs at once."],
		whenNot: [
			{ text: "One request inline in a chat turn.", use: "approval-gate" },
			{ text: "A tool call that waits on a person inside a transcript.", use: "tool" },
		],
		responsive: ["The tool name hides on narrow screens; labels truncate before badges."],
		performance: ["Each item stays mounted until you drop it from the list."],
		ai: [
			"Open the oldest pending request; after a decision, dismiss it and open the next.",
			"Use `onAlwaysAllow` on the gate's actions to trust low-risk tools for the session.",
		],
	},
	impl: {
		react: { entry: "ApprovalQueue" },
		svelte: { entry: "ApprovalQueue" },
	},
	keywords: [
		"approval",
		"queue",
		"human in the loop",
		"hitl",
		"agent",
		"tool call",
		"inbox",
	],
});
