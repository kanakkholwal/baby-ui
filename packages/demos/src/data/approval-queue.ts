import type { ApprovalRequest, ToolKind } from "@baby-ui/svelte";
import { MIGRATION_REQUEST, REFUND_REQUEST } from "./approval-gate";

export type QueuedRequest = { id: string; kind: ToolKind; request: ApprovalRequest };

/** Four requests an agent raised while working through a billing cleanup. */
export const QUEUED_REQUESTS: QueuedRequest[] = [
	{
		id: "deploy",
		kind: "terminal",
		request: {
			tool: "shell.run",
			title: "Deploy the billing worker to staging",
			summary:
				"Runs the deploy script for billing-worker on staging. It restarts 2 pods; nothing in production changes.",
			risk: "low",
			args: {
				command: "pnpm deploy --filter billing-worker --env staging",
				cwd: "~/acme",
			},
		},
	},
	{ id: "refund", kind: "request", request: REFUND_REQUEST },
	{
		id: "email",
		kind: "request",
		request: {
			tool: "email.send_campaign",
			title: "Email 2,140 customers about the price change",
			summary:
				"Sends the approved June pricing notice to every customer on the Pro plan, from billing@acme.com.",
			risk: "medium",
			args: { template: "pricing-june", audience: "plan:pro", recipients: 2140 },
		},
	},
	{ id: "migration", kind: "function", request: MIGRATION_REQUEST },
];
