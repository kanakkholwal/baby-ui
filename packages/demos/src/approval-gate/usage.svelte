<script lang="ts">
import {
	ApprovalGate,
	ApprovalGateActions,
	ApprovalGateArgs,
	ApprovalGateBody,
	ApprovalGateDiff,
	ApprovalGateEditor,
	ApprovalGateHeader,
	ApprovalGateReceipt,
	ApprovalGateSummary,
	ApprovalGateTitle,
	type ApprovalRequest,
	type ApprovalStatus,
} from "@baby-ui/svelte";

const request: ApprovalRequest = {
	tool: "payments.issue_refund",
	title: "Refund a duplicate charge",
	summary: "Refund $49.00 for charge ch_3Pq8, billed twice on May 3.",
	risk: "medium",
	args: { charge: "ch_3Pq8LmA2", amount: 4900, reason: "duplicate" },
	expiresAt: new Date(Date.now() + 5 * 60_000).toISOString(),
};

let status = $state<ApprovalStatus>("pending");
let now = $state(Date.now());

$effect(() => {
	const timer = setInterval(() => (now = Date.now()), 1000);
	return () => clearInterval(timer);
});
</script>

<ApprovalGate
	{request}
	{status}
	{now}
	onEditingChange={(editing) => (status = editing ? "editing" : "pending")}
	onExpire={() => (status = "expired")}
>
	<ApprovalGateReceipt />
	<ApprovalGateBody>
		<ApprovalGateHeader />
		<ApprovalGateTitle />
		<ApprovalGateSummary />
		<ApprovalGateDiff />
		<ApprovalGateArgs />
		<ApprovalGateEditor />
		<ApprovalGateActions onApprove={() => (status = "approved")} onDeny={() => (status = "denied")} />
	</ApprovalGateBody>
</ApprovalGate>
