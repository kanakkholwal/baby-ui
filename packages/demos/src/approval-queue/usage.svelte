<script lang="ts">
import {
	ApprovalGate,
	ApprovalGateActions,
	ApprovalGateBody,
	ApprovalGateReceipt,
	ApprovalGateSummary,
	ApprovalQueue,
	ApprovalQueueContent,
	ApprovalQueueCount,
	ApprovalQueueHeader,
	ApprovalQueueItem,
	ApprovalQueueKind,
	ApprovalQueueLabel,
	ApprovalQueueList,
	ApprovalQueueTitle,
	ApprovalQueueTrigger,
	type ApprovalRequest,
	type ApprovalStatus,
} from "@baby-ui/svelte";

type Item = {
	id: string;
	request: ApprovalRequest;
	status: ApprovalStatus;
	dismissed: boolean;
};

let { items }: { items: Item[] } = $props();
let open = $state<string | null>(null);
const waiting = $derived(items.filter((item) => item.status === "pending").length);
</script>

<ApprovalQueue value={open} onValueChange={(next) => (open = next)}>
	<ApprovalQueueHeader>
		<ApprovalQueueTitle>Waiting for approval</ApprovalQueueTitle>
		<ApprovalQueueCount value={waiting} />
	</ApprovalQueueHeader>
	<ApprovalQueueList>
		{#each items as item (item.id)}
			<ApprovalQueueItem value={item.id} dismissed={item.dismissed}>
				<ApprovalQueueTrigger>
					<ApprovalQueueKind kind="terminal" />
					<ApprovalQueueLabel>{item.request.title}</ApprovalQueueLabel>
				</ApprovalQueueTrigger>
				<ApprovalQueueContent>
					<ApprovalGate request={item.request} status={item.status} now={Date.now()} variant="plain">
						<ApprovalGateReceipt />
						<ApprovalGateBody>
							<ApprovalGateSummary />
							<ApprovalGateActions />
						</ApprovalGateBody>
					</ApprovalGate>
				</ApprovalQueueContent>
			</ApprovalQueueItem>
		{/each}
	</ApprovalQueueList>
</ApprovalQueue>
