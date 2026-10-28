"use client";

import { ToolChips, type ToolDiff, type ToolStep } from "@baby-ui/react";

type Props = Record<string, unknown>;

const STEPS: ToolStep[] = [
	{
		label: "Thinking",
		chip: "Planning the schedule…",
		detail: [
			{ text: "Weekend demand carries the launch flow, so it goes first." },
			{ text: "Batch capacity leaves two evening deploy windows." },
		],
	},
	{
		label: "Write 204 lines",
		chip: "Schedule.tsx",
		mono: true,
		detailMono: true,
		detail: [
			{ text: "+ const windows = slots.filter((s) => s.ready)", tone: "add" },
			{ text: '+ return schedule(windows, { hero: "launch" })', tone: "add" },
		],
	},
	{
		label: "Rebuild and verify",
		chip: "npm run build",
		mono: true,
		detailMono: true,
		detail: [{ text: "✓ built in 1.2s" }, { text: "✓ 34 checks passed" }],
	},
];

const DIFFS: ToolDiff[] = [
	{
		file: "styles.css",
		add: 13,
		del: 0,
		lines: [
			{ text: ".card {", tone: "ctx" },
			{ text: "  gap: 14px;", tone: "del" },
			{ text: "  gap: 12px;", tone: "add" },
			{ text: "  container-type: inline-size;", tone: "add" },
			{ text: "}", tone: "ctx" },
		],
	},
	{
		file: "Schedule.tsx",
		add: 74,
		del: 41,
		lines: [
			{ text: "const slots = openSlots(week);", tone: "ctx" },
			{ text: "const windows = slots;", tone: "del" },
			{ text: "const windows = slots.filter(", tone: "add" },
			{ text: "  (s) => s.ready,", tone: "add" },
			{ text: ");", tone: "add" },
		],
	},
];

export function ToolChipsDemo({ props }: { props: Props }) {
	return (
		<ToolChips
			steps={STEPS}
			diffs={DIFFS}
			hiddenDiffCount={2}
			defaultOpen={props.defaultOpen !== false}
		/>
	);
}
