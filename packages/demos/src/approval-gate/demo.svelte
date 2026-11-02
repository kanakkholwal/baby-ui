<script lang="ts">
import {
	type ApprovalArgs,
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
	type ApprovalVariant,
} from "@baby-ui/svelte";
import { untrack } from "svelte";
import {
	MIGRATION_REQUEST,
	MIGRATION_TTL_MS,
	REFUND_REQUEST,
	REFUND_TTL_MS,
} from "../data/approval-gate";

let { props = {} }: { props?: Record<string, unknown> } = $props();

type Gate = {
	request: ApprovalRequest;
	status: ApprovalStatus;
	busy: boolean;
	note?: string;
};

const mounted = Date.now();
let now = $state(mounted);
let gates = $state<Gate[]>([
	{
		request: {
			...REFUND_REQUEST,
			expiresAt: new Date(mounted + REFUND_TTL_MS).toISOString(),
		},
		status: "pending",
		busy: false,
	},
	{
		request: {
			...MIGRATION_REQUEST,
			expiresAt: new Date(mounted + MIGRATION_TTL_MS).toISOString(),
		},
		status: "pending",
		busy: false,
	},
]);

// The demo owns the clock; the component only reads `now`.
$effect(() => {
	const timer = setInterval(() => (now = Date.now()), 1000);
	return () => clearInterval(timer);
});

// The status control previews a state directly, on every gate.
$effect(() => {
	const forced = props.status as ApprovalStatus | undefined;
	if (!forced) return;
	untrack(() => {
		for (const gate of gates) {
			gate.status = forced;
			gate.busy = false;
		}
	});
});

const variant = $derived((props.variant as ApprovalVariant) ?? "framed");

function approve(gate: Gate) {
	gate.busy = true;
	setTimeout(() => {
		gate.busy = false;
		gate.status = "approved";
		gate.note = "by you, just now";
	}, 900);
}

function deny(gate: Gate, reason?: string) {
	gate.status = "denied";
	gate.note = reason ? `"${reason}"` : "by you, just now";
}

function edit(gate: Gate, args: ApprovalArgs) {
	gate.request = { ...gate.request, args };
	gate.status = "pending";
}
</script>

<div class="flex w-full max-w-lg flex-col gap-3">
	{#each gates as gate, i (i)}
		<ApprovalGate
			request={gate.request}
			status={gate.status}
			busy={gate.busy}
			note={gate.note}
			{now}
			{variant}
			onEditingChange={(editing) => (gate.status = editing ? "editing" : "pending")}
			onExpire={() => {
				gate.status = "expired";
				gate.note = "no decision in time";
			}}
		>
			<ApprovalGateReceipt />
			<ApprovalGateBody>
				<ApprovalGateHeader />
				<ApprovalGateTitle headingLevel={2} />
				<ApprovalGateSummary />
				<ApprovalGateDiff />
				<ApprovalGateArgs />
				<ApprovalGateEditor onEdit={(args) => edit(gate, args)} />
				<ApprovalGateActions
					onApprove={() => approve(gate)}
					onDeny={(reason) => deny(gate, reason)}
				/>
			</ApprovalGateBody>
		</ApprovalGate>
	{/each}
</div>
