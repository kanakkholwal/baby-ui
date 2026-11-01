<script lang="ts">
import {
	AgentActivity,
	AgentActivityContent,
	AgentActivityResult,
	AgentActivitySearch,
	AgentActivityStep,
	AgentActivityText,
	AgentActivityTool,
	AgentActivityTrigger,
	Button,
	formatDuration,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof AgentActivity>>(props));

// The demo streams one run: each tick reveals one more event, then the run completes.
const EVENTS = 9;
let shown = $state(0);
let done = $state(false);
let timer = 0;
function play() {
	clearInterval(timer);
	shown = 0;
	done = false;
	timer = window.setInterval(() => {
		if (shown < EVENTS) shown += 1;
		else {
			done = true;
			clearInterval(timer);
		}
	}, 750);
}
$effect(() => {
	play();
	return () => clearInterval(timer);
});
// The default status plays the run; picking complete finishes it, working replays it.
let picked: string | undefined = "working";
$effect(() => {
	const next = p.status;
	if (next === picked) return;
	picked = next;
	if (next === "working") play();
	else if (next === "complete") {
		clearInterval(timer);
		shown = EVENTS;
		done = true;
	}
});
</script>

<div class="flex w-full max-w-md flex-col gap-4">
	<AgentActivity status={done ? "complete" : "working"} variant={p.variant}>
		<AgentActivityTrigger label="Looking into the checkout bug…" summary="Worked for {formatDuration(shown * 0.75 + 1)}, searched 3 sites, edited 2 files" />
		<AgentActivityContent>
			{#if shown > 0}<AgentActivityStep status={shown > 1 ? "done" : "active"}>Read the failing test</AgentActivityStep>{/if}
			{#if shown > 1}
				<AgentActivitySearch query="stripe payment intent requires_action 3ds" more={shown > 4 ? 6 : 0}>
					{#if shown > 2}<AgentActivityResult href="https://docs.stripe.com/payments/3d-secure" domain="docs.stripe.com">3D Secure authentication</AgentActivityResult>{/if}
					{#if shown > 3}<AgentActivityResult href="https://docs.stripe.com/payments/paymentintents/lifecycle" domain="docs.stripe.com">How PaymentIntents work</AgentActivityResult>{/if}
				</AgentActivitySearch>
			{/if}
			{#if shown > 4}<AgentActivityText>The handler treats requires_action as a failure, so 3DS cards never finish.</AgentActivityText>{/if}
			{#if shown > 5}<AgentActivityTool action="read" target="src/checkout/confirm.ts" />{/if}
			{#if shown > 6}<AgentActivityTool action="edit" target="src/checkout/confirm.ts" additions={14} deletions={3} />{/if}
			{#if shown > 7}<AgentActivityTool action="edit" target="src/checkout/confirm.test.ts" additions={22} />{/if}
			{#if shown > 8}<AgentActivityTool action="run" target="pnpm test checkout" />{/if}
		</AgentActivityContent>
	</AgentActivity>
	<Button size="sm" variant="secondary" class="self-start rounded-full" onclick={play}>Run again</Button>
</div>
