<script lang="ts">
import {
	type CardValidity,
	type CardValue,
	CreditCardInput,
	type CreditCardInputLayout,
	type InputGroupSize,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let card = $state<CardValue>({ number: "", expiry: "", cvc: "" });
let validity = $state<CardValidity | null>(null);
</script>

<div class="flex w-full max-w-md flex-col gap-4">
	<CreditCardInput
		bind:value={card}
		onValueChange={(_, v) => (validity = v)}
		layout={(props.layout as CreditCardInputLayout) ?? "stacked"}
		size={(props.size as InputGroupSize) ?? "md"}
	/>
	<p class="text-muted-foreground text-xs">
		Try 4242 4242 4242 4242 with any future expiry.
		{#if validity?.valid}<span class="text-foreground">Ready to pay.</span>{/if}
	</p>
</div>
