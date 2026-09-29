<script lang="ts">
import { CurrencyInput, Field, FieldDescription, FieldLabel } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof CurrencyInput>>(props));

let amount = $state<number | null>(250000);
</script>

<Field class="w-full max-w-xs">
	<FieldLabel for="demo-amount">Monthly budget</FieldLabel>
	<CurrencyInput
		id="demo-amount"
		bind:value={amount}
		currency={p.currency ?? "USD"}
		locale={p.locale ?? "en-US"}
		max={10_000_000}
		affix={p.affix ?? "both"}
		size={p.size ?? "md"}
	/>
	<FieldDescription>
		Value in minor units: <span class="font-mono tabular-nums">{amount ?? "null"}</span>
	</FieldDescription>
</Field>
