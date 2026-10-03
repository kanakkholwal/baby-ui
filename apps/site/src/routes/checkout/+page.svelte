<script lang="ts">
import { createCheckout, redeemCode } from "#lib/account.js";
import Seo from "#lib/components/seo.svelte";
import { page } from "$app/state";

let { data } = $props();

type Discount = { code: string; label: string; percentOff?: number; amountOff?: number };

const planId = $derived(page.url.searchParams.get("plan") ?? "");
let seats = $state(Math.max(1, Number(page.url.searchParams.get("seats")) || 1));
// Seat count re-prices the line: team discounts depend on the whole order's size.
const item = $derived(data.sample.checkoutItem(planId, seats));

let code = $state("");
let codeStatus = $state<"idle" | "checking" | "applied" | "invalid">("idle");
let discount = $state<Discount | null>(null);
let status = $state<"idle" | "redirecting" | "error">("idle");

async function apply(value: string) {
	codeStatus = "checking";
	discount = await redeemCode(value);
	codeStatus = discount ? "applied" : "invalid";
}

async function checkout() {
	if (!item) return;
	status = "redirecting";
	try {
		const url = await createCheckout(`${item.id}:${seats}`, discount?.code ?? "");
		if (url) window.location.href = url;
		else status = "idle";
	} catch {
		status = "error";
	}
}
</script>

<Seo title="Checkout" description="Review your Baby UI Pro order." noindex />

{#if item}
	<data.Screen
		items={[item]}
		bind:code
		{codeStatus}
		{discount}
		{status}
		backHref="/pricing"
		onQuantityChange={(_id: string, quantity: number) => (seats = quantity)}
		onApplyCode={apply}
		onRemoveCode={() => {
			discount = null;
			code = "";
			codeStatus = "idle";
		}}
		onCheckout={checkout}
	/>
{:else}
	<main class="mx-auto flex max-w-md flex-col items-center gap-3 px-4 py-24 text-center">
		<h1 class="font-display font-semibold text-2xl tracking-tight">Pick a plan first</h1>
		<p class="text-muted-foreground text-sm">This checkout link has no plan we can price.</p>
		<a href="/pricing" class="text-sm underline underline-offset-2">See plans</a>
	</main>
{/if}
