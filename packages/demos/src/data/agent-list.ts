import type { AgentStatus, AgentStepStatus } from "@baby-ui/svelte";

export type DemoAgent = {
	id: string;
	task: string;
	branch: string;
	age: string;
	status: AgentStatus;
	added: number;
	removed: number;
	steps: { label: string; status: AgentStepStatus }[];
	/** What the agent asked a person; `waiting` is true until it is answered. */
	question?: string;
	waiting?: boolean;
};

/** Background agents working through one repo. */
export const DEMO_AGENTS: DemoAgent[] = [
	{
		id: "flake",
		task: "Fix the flaky checkout test",
		branch: "fix/checkout-flake",
		age: "3m",
		status: "running",
		added: 18,
		removed: 4,
		steps: [
			{ label: "Read confirm.test.ts and the 3DS mock", status: "done" },
			{ label: "Awaited the payment intent before asserting", status: "done" },
			{ label: "Running vitest 20 times in a row", status: "running" },
		],
	},
	{
		id: "invoices",
		task: "Move invoices to the v2 billing API",
		branch: "feat/invoices-v2",
		age: "12m",
		status: "needs-input",
		added: 142,
		removed: 37,
		steps: [
			{ label: "Swapped 9 calls to the v2 client", status: "done" },
			{ label: "Updated the invoice serializer", status: "done" },
			{ label: "Waiting on you", status: "pending" },
		],
		waiting: true,
		question:
			"The v2 API drops legacy_total. Remove it from the CSV export too, or keep a shim?",
	},
	{
		id: "emails",
		task: "Add dark mode to the receipt emails",
		branch: "feat/email-dark",
		age: "28m",
		status: "done",
		added: 64,
		removed: 12,
		steps: [
			{ label: "Added prefers-color-scheme styles", status: "done" },
			{ label: "Checked 6 clients in the preview", status: "done" },
		],
	},
	{
		id: "deps",
		task: "Bump the minor dependencies",
		branch: "chore/deps",
		age: "queued",
		status: "queued",
		added: 0,
		removed: 0,
		steps: [{ label: "Starts when a slot frees up", status: "pending" }],
	},
];
