import type { PlanStepStatus, PlanToolKind } from "@baby-ui/svelte";

export type DemoPlanStep = {
	id: string;
	tool: PlanToolKind;
	label: string;
	/** Lines the step prints, one every tick while it runs. */
	log: string[];
};

export type DemoPlanState = DemoPlanStep & {
	status: PlanStepStatus;
	seconds: number;
	shown: number;
};

/** A plan an agent made for a small billing bug. */
export const DEMO_PLAN: DemoPlanStep[] = [
	{
		id: "find",
		tool: "search",
		label: "Find where order tax is rounded",
		log: [
			'rg "Math.round" src/billing',
			"src/billing/totals.ts:41  Math.round(subtotal * rate)",
			"src/billing/invoice.ts:88  Math.round(line.tax)",
		],
	},
	{
		id: "read",
		tool: "read",
		label: "Read totals.ts and its tests",
		log: ["totals.ts  112 lines", "totals.test.ts  6 cases, none with mixed rates"],
	},
	{
		id: "edit",
		tool: "edit",
		label: "Round tax per line, not per order",
		log: ["totals.ts  +9 −3", "totals.test.ts  +24  (2 new cases)"],
	},
	{
		id: "test",
		tool: "test",
		label: "Run the checkout tests",
		log: [
			"vitest run checkout",
			" ✓ totals.test.ts (8)",
			" ✓ confirm.test.ts (4)",
			" Tests  12 passed",
		],
	},
	{
		id: "ship",
		tool: "ship",
		label: "Open a pull request",
		log: ["git push origin fix/tax-rounding", "PR #482  Round tax per line"],
	},
];

export const freshPlan = (): DemoPlanState[] =>
	DEMO_PLAN.map((step, i) => ({
		...step,
		status: i === 0 ? "running" : "pending",
		seconds: 0,
		shown: 0,
	}));

/** One second of the scripted run: print a line, or finish the step and start the next. */
export function tickPlan(plan: DemoPlanState[]): DemoPlanState[] {
	const at = plan.findIndex((s) => s.status === "running");
	if (at < 0) return plan;
	return plan.map((s, i) => {
		if (i === at) {
			const shown = Math.min(s.shown + 1, s.log.length);
			const finished = s.shown >= s.log.length;
			return {
				...s,
				seconds: s.seconds + 1,
				shown,
				status: finished ? "done" : "running",
			};
		}
		if (i === at + 1 && plan[at] && plan[at].shown >= plan[at].log.length) {
			return { ...s, status: "running" };
		}
		return s;
	});
}
