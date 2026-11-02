<script lang="ts">
import { tick } from "svelte";
import Button from "../../button/svelte/button.svelte";
import Section from "./approval-gate-section.svelte";
import { type ApprovalStep, approvalGateState } from "./context";

let {
	onApprove,
	onAlwaysAllow,
	onDeny,
}: {
	onApprove?: () => void;
	/** Approves and trusts this tool from now on; never offered for high risk. */
	onAlwaysAllow?: () => void;
	onDeny?: (reason?: string) => void;
} = $props();

const ctx = approvalGateState("ApprovalGateActions");
let reason = $state("");
let confirmEl = $state<HTMLDivElement | null>(null);
let reasonEl = $state<HTMLInputElement | null>(null);
const pending = $derived(ctx.status === "pending");

async function goTo(next: ApprovalStep) {
	ctx.setStep(next);
	await tick();
	if (next === "confirm") confirmEl?.querySelector("button")?.focus();
	if (next === "deny") reasonEl?.focus();
}

function approve() {
	if (ctx.busy || ctx.lapsed) return;
	if (ctx.request.risk === "high" && ctx.step !== "confirm") void goTo("confirm");
	else onApprove?.();
}

function deny() {
	if (!ctx.busy) onDeny?.(reason.trim() || undefined);
}
</script>

<!-- Approve, edit or deny; high risk asks once more, and deny takes an optional reason. -->
<Section open={pending && ctx.step === "idle"}>
	<div class={ctx.styles.actions()}>
		<Button size="sm" disabled={ctx.lapsed} loading={ctx.busy} onclick={approve}>
			{ctx.labels.approve}
		</Button>
		{#if onAlwaysAllow && ctx.request.risk !== "high"}
			<Button size="sm" variant="outline" disabled={ctx.lapsed || ctx.busy} onclick={onAlwaysAllow}>
				{ctx.labels.alwaysAllow}
			</Button>
		{/if}
		<Button
			size="sm"
			variant="outline"
			disabled={ctx.busy}
			onclick={() => ctx.onEditingChange?.(true)}
		>
			{ctx.labels.edit}
		</Button>
		<Button size="sm" variant="ghost" disabled={ctx.busy} onclick={() => goTo("deny")}>
			{ctx.labels.deny}
		</Button>
	</div>
</Section>

<Section open={pending && ctx.step === "confirm"}>
	<div bind:this={confirmEl} role="alert" class={ctx.styles.confirm()}>
		<p class={ctx.styles.prompt()}>{ctx.labels.confirmPrompt}</p>
		<div class={ctx.styles.actions()}>
			<Button
				size="sm"
				variant="destructive"
				disabled={ctx.lapsed}
				loading={ctx.busy}
				onclick={approve}
			>
				{ctx.labels.confirmApprove}
			</Button>
			<Button size="sm" variant="ghost" disabled={ctx.busy} onclick={() => goTo("idle")}>
				{ctx.labels.back}
			</Button>
		</div>
	</div>
</Section>

<Section open={pending && ctx.step === "deny"}>
	<div class={ctx.styles.stack()}>
		<label for="{ctx.id}-reason" class="sr-only">{ctx.labels.reason}</label>
		<input
			bind:this={reasonEl}
			id="{ctx.id}-reason"
			bind:value={reason}
			placeholder={ctx.labels.reason}
			class={ctx.styles.input()}
			onkeydown={(event) => {
				if (event.key === "Enter") deny();
			}}
		/>
		<div class={ctx.styles.actions()}>
			<Button size="sm" variant="destructive_soft" loading={ctx.busy} onclick={deny}>
				{ctx.labels.confirmDeny}
			</Button>
			<Button size="sm" variant="ghost" disabled={ctx.busy} onclick={() => goTo("idle")}>
				{ctx.labels.back}
			</Button>
		</div>
	</div>
</Section>
