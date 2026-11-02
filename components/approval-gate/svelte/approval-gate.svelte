<script lang="ts">
import { type Snippet, untrack } from "svelte";
import { cn } from "../../lib/cn";
import {
	type ApprovalRequest,
	isResolved,
	remainingMs,
	URGENT_MS,
} from "../approval-core";
import {
	APPROVAL_LABELS,
	type ApprovalLabels,
	type ApprovalStatus,
	type ApprovalVariant,
	approvalGate,
} from "../variants";
import { type ApprovalStep, setApprovalGate } from "./context";

let {
	request,
	status,
	now,
	variant = "framed",
	busy = false,
	note,
	argsOpen = $bindable(false),
	onArgsOpenChange,
	onEditingChange,
	onExpire,
	labels,
	class: classProp,
	children,
}: {
	request: ApprovalRequest;
	/** Controlled decision state; the gate only reports intent through the callbacks. */
	status: ApprovalStatus;
	/** Current time in ms, driven by the parent, for the countdown to `expiresAt`. */
	now: number;
	variant?: ApprovalVariant;
	/** A decision is in flight: actions show a spinner and stop taking clicks. */
	busy?: boolean;
	/** Shown on the receipt once decided, e.g. who approved and when. */
	note?: string;
	/** Whether the raw arguments are shown; bindable. */
	argsOpen?: boolean;
	onArgsOpenChange?: (open: boolean) => void;
	/** Asks the parent to enter or leave the "editing" status. */
	onEditingChange?: (editing: boolean) => void;
	/** Fires once when the countdown reaches zero before a decision. */
	onExpire?: () => void;
	labels?: Partial<ApprovalLabels>;
	class?: string;
	children?: Snippet;
} = $props();

const id = $props.id();
const text = $derived({ ...APPROVAL_LABELS, ...labels });
const remaining = $derived(remainingMs(request.expiresAt, now));
const lapsed = $derived(remaining === 0);
const resolved = $derived(isResolved(status));
const styles = $derived(
	approvalGate({
		variant,
		risk: request.risk,
		status,
		urgent: remaining !== null && remaining < URGENT_MS,
	}),
);
// Sub-steps are UI only; the decision itself goes to the parent through the callbacks.
let step = $state<ApprovalStep>("idle");

$effect(() => {
	if (status !== "pending") untrack(() => (step = "idle"));
});

let expiredFired = false;
$effect(() => {
	if (!lapsed || resolved) {
		expiredFired = false;
		return;
	}
	if (expiredFired) return;
	expiredFired = true;
	untrack(() => onExpire?.());
});

function onkeydown(event: KeyboardEvent) {
	if (event.key !== "Escape") return;
	if (status === "editing") {
		event.preventDefault();
		onEditingChange?.(false);
	} else if (step !== "idle") {
		event.preventDefault();
		step = "idle";
	}
}

setApprovalGate({
	id,
	get request() {
		return request;
	},
	get status() {
		return status;
	},
	get busy() {
		return busy;
	},
	get note() {
		return note;
	},
	get remaining() {
		return remaining;
	},
	get lapsed() {
		return lapsed;
	},
	get resolved() {
		return resolved;
	},
	get step() {
		return step;
	},
	setStep: (next) => {
		step = next;
	},
	get argsOpen() {
		return argsOpen;
	},
	toggleArgs: () => {
		argsOpen = !argsOpen;
		onArgsOpenChange?.(argsOpen);
	},
	get onEditingChange() {
		return onEditingChange;
	},
	get labels() {
		return text;
	},
	get styles() {
		return styles;
	},
});
</script>

<!-- The root: the request, its decision state and the countdown. Compose the receipt and body inside. -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<section
	data-slot="approval-gate"
	data-status={status}
	aria-label={request.title}
	aria-busy={busy}
	class={cn(styles.root(), classProp)}
	{onkeydown}
>
	{@render children?.()}
	<p class="sr-only" aria-live="polite">{resolved ? `${request.title}: ${text[status]}` : ""}</p>
</section>
