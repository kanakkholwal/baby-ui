import { defineComponent, variantsOf } from "@baby-ui/registry-schema";
import { approvalGate as approvalGateVariants } from "./variants";

export const approvalGate = defineComponent({
	slug: "approval-gate",
	name: "Approval Gate",
	description:
		"Composable human-in-the-loop sign-off for an agent action: risk, summary, arguments, diff and a countdown, then a compact receipt.",
	category: "agents",
	status: "beta",
	variants: variantsOf(approvalGateVariants, ["variant"]),
	props: [
		{
			name: "request",
			type: '{ tool: string; title: string; summary: string; args: Record<string, JsonValue>; risk: "low" | "medium" | "high"; diff?: { filename: string; lines: DiffLine[] }; expiresAt?: string }',
			description:
				"The action awaiting a decision. `diff` takes the same lines as File Diff.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "status",
			type: '"pending" | "editing" | "approved" | "denied" | "expired"',
			description:
				"Controlled decision state. The gate reports intent through callbacks; the parent sets the status.",
			required: true,
			control: {
				kind: "select",
				options: ["pending", "editing", "approved", "denied", "expired"],
			},
		},
		{
			name: "now",
			type: "number",
			description:
				"Current time in ms, driven by the parent. The countdown to `expiresAt` is derived from it.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "variant",
			type: '"framed" | "card" | "plain"',
			description:
				"A card rim around the request, one bordered card, or a block with a risk rule.",
			default: "framed",
			control: { kind: "select", options: ["framed", "card", "plain"] },
		},
		{
			name: "busy",
			type: "boolean",
			description:
				"A decision is in flight: actions show a spinner and stop taking clicks.",
			default: false,
			control: { kind: "none" },
		},
		{
			name: "note",
			type: "string",
			description: "Shown on the receipt once decided, e.g. who approved and when.",
			control: { kind: "none" },
		},
		{
			name: "argsOpen",
			type: "boolean",
			description:
				"Whether the raw arguments are shown. Controlled with onArgsOpenChange; bindable in Svelte.",
			default: false,
			control: { kind: "none" },
		},
		{
			name: "onApprove",
			type: "() => void",
			description:
				"ApprovalGateActions: high risk requests call this only after the confirm step.",
			control: { kind: "none" },
		},
		{
			name: "onAlwaysAllow",
			type: "() => void",
			description:
				'ApprovalGateActions: shows "Always allow" for low and medium risk; approve and trust the tool.',
			control: { kind: "none" },
		},
		{
			name: "onDeny",
			type: "(reason?: string) => void",
			description:
				"ApprovalGateActions: fires with the optional reason typed in the deny step.",
			control: { kind: "none" },
		},
		{
			name: "onEdit",
			type: "(args: Record<string, JsonValue>) => void",
			description:
				"ApprovalGateEditor: fires with edited arguments once they parse as a JSON object.",
			control: { kind: "none" },
		},
		{
			name: "onEditingChange",
			type: "(editing: boolean) => void",
			description:
				'ApprovalGate: asks the parent to enter or leave the "editing" status.',
			control: { kind: "none" },
		},
		{
			name: "onExpire",
			type: "() => void",
			description:
				"ApprovalGate: fires once when the countdown reaches zero before a decision.",
			control: { kind: "none" },
		},
		{
			name: "labels",
			type: "Partial<ApprovalLabels>",
			description: "ApprovalGate: overrides for every visible string.",
			control: { kind: "none" },
		},
		{
			name: "headingLevel",
			type: "2 | 3 | 4 | 5 | 6",
			description:
				"ApprovalGateTitle: level of the request title heading, so it fits the page outline.",
			default: 3,
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "Sections swap instantly; nothing slides or fades.",
		behaviour: [
			"Each step (arguments, editor, confirm, deny reason, receipt) opens with grid-template-rows over 200ms and closes over 120ms.",
			"A decision collapses the card into a one-line receipt on the same timing, so the transcript stops growing.",
			"The countdown turns the warning colour under one minute; at zero, approval is disabled and onExpire fires once.",
		],
	},
	a11y: {
		keyboard: [
			{ keys: ["Tab"], action: "Reaches every action" },
			{
				keys: ["Escape"],
				action: "Leaves the editor or backs out of the confirm and deny steps",
			},
			{ keys: ["Enter"], action: "In the reason field, denies" },
		],
		notes: [
			"High risk requires a second, explicit confirmation before onApprove fires.",
			"Risk is written out in the badge, not shown by colour alone.",
			"The editor marks invalid JSON with aria-invalid and names the failing line.",
			"The resolved state is announced through a polite live region.",
		],
	},
	licenseOrigin: {
		source: "ui-components",
		url: "https://github.com/starc007/ui-components",
		license: "MIT",
		copyright: "Copyright (c) 2026 Saurabh Chauhan",
	},
	impl: {
		react: {
			entry: "ApprovalGate",
		},
		svelte: {
			entry: "ApprovalGate",
		},
	},
	keywords: [
		"approval",
		"human in the loop",
		"hitl",
		"confirmation",
		"agent",
		"tool call",
		"permission",
	],
});
