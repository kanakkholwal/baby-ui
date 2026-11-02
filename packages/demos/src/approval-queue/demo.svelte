<script lang="ts">
import {
	ApprovalGate,
	ApprovalGateActions,
	ApprovalGateArgs,
	ApprovalGateBody,
	ApprovalGateDiff,
	ApprovalGateEditor,
	ApprovalGateReceipt,
	ApprovalGateSummary,
	ApprovalQueue,
	ApprovalQueueContent,
	ApprovalQueueCount,
	ApprovalQueueEmpty,
	ApprovalQueueHeader,
	ApprovalQueueIcon,
	ApprovalQueueItem,
	ApprovalQueueKind,
	ApprovalQueueLabel,
	ApprovalQueueList,
	ApprovalQueueTitle,
	ApprovalQueueTrigger,
	type ApprovalStatus,
	Badge,
	Button,
	RISK_BADGE,
} from "@baby-ui/svelte";
import { type ComponentProps, onDestroy } from "svelte";
import { QUEUED_REQUESTS } from "../data/approval-queue";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof ApprovalQueue>>(props));

type Entry = (typeof QUEUED_REQUESTS)[number] & {
	status: ApprovalStatus;
	busy: boolean;
	note?: string;
	dismissed: boolean;
};

const fresh = (): Entry[] =>
	QUEUED_REQUESTS.map((q) => ({
		...q,
		status: "pending",
		busy: false,
		dismissed: false,
	}));
const RISK_TEXT = { low: "Low", medium: "Medium", high: "High" } as const;

let entries = $state(fresh());
let open = $state<string | null>(QUEUED_REQUESTS[0]?.id ?? null);
let timers: ReturnType<typeof setTimeout>[] = [];
onDestroy(() => timers.forEach(clearTimeout));

const waiting = $derived(
	entries.filter((e) => !e.dismissed && e.status === "pending").length,
);
const later = (fn: () => void, ms: number) => {
	timers.push(setTimeout(fn, ms));
};
const patch = (id: string, next: Partial<Entry>) => {
	entries = entries.map((e) => (e.id === id ? { ...e, ...next } : e));
};

// Show the receipt for a beat, then fold the row and open the next request.
function settle(id: string, status: ApprovalStatus, note: string) {
	patch(id, { status, note, busy: false });
	later(() => {
		patch(id, { dismissed: true });
		open = entries.find((e) => !e.dismissed && e.status === "pending")?.id ?? null;
	}, 1200);
}
function approve(id: string, note = "by you, just now") {
	patch(id, { busy: true });
	later(() => settle(id, "approved", note), 700);
}
function reset() {
	timers.forEach(clearTimeout);
	entries = fresh();
	open = QUEUED_REQUESTS[0]?.id ?? null;
}
</script>

<div class="flex w-full max-w-xl flex-col items-center gap-3">
	<ApprovalQueue value={open} onValueChange={(next) => (open = next)} variant={p.variant} class="max-w-xl">
		<ApprovalQueueHeader>
			<ApprovalQueueIcon />
			<ApprovalQueueTitle>Waiting for approval</ApprovalQueueTitle>
			<ApprovalQueueCount value={waiting} />
		</ApprovalQueueHeader>
		<ApprovalQueueList>
			{#each entries as e (e.id)}
				<ApprovalQueueItem value={e.id} dismissed={e.dismissed}>
					<ApprovalQueueTrigger>
						<ApprovalQueueKind kind={e.kind} />
						<ApprovalQueueLabel>{e.request.title}</ApprovalQueueLabel>
						<Badge variant={RISK_BADGE[e.request.risk]} size="sm" dot>{RISK_TEXT[e.request.risk]}</Badge>
					</ApprovalQueueTrigger>
					<ApprovalQueueContent>
						<ApprovalGate
							request={e.request}
							status={e.status}
							busy={e.busy}
							note={e.note}
							now={0}
							variant="plain"
							onEditingChange={(editing) => patch(e.id, { status: editing ? "editing" : "pending" })}
						>
							<ApprovalGateReceipt />
							<ApprovalGateBody>
								<ApprovalGateSummary />
								<ApprovalGateDiff />
								<ApprovalGateArgs />
								<ApprovalGateEditor
									onEdit={(args) => patch(e.id, { request: { ...e.request, args }, status: "pending" })}
								/>
								<ApprovalGateActions
									onApprove={() => approve(e.id)}
									onAlwaysAllow={() => approve(e.id, `${e.request.tool} is always allowed now`)}
									onDeny={(reason) => settle(e.id, "denied", reason ? `"${reason}"` : "by you")}
								/>
							</ApprovalGateBody>
						</ApprovalGate>
					</ApprovalQueueContent>
				</ApprovalQueueItem>
			{/each}
			<ApprovalQueueEmpty open={entries.every((e) => e.dismissed)} />
		</ApprovalQueueList>
	</ApprovalQueue>
	<Button variant="ghost" size="sm" onclick={reset}>Reset queue</Button>
</div>
