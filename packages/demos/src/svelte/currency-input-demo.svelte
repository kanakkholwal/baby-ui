<script lang="ts">
import {
	CurrencyInput,
	type CurrencyInputAffix,
	type CurrencyInputSize,
	Field,
	FieldDescription,
	FieldLabel,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let amount = $state<number | null>(250000);
</script>

<Field class="w-full max-w-xs">
	<FieldLabel for="demo-amount">Monthly budget</FieldLabel>
	<CurrencyInput
		id="demo-amount"
		bind:value={amount}
		currency={(props.currency as string) ?? "USD"}
		locale={(props.locale as string) ?? "en-US"}
		max={10_000_000}
		affix={(props.affix as CurrencyInputAffix) ?? "both"}
		size={(props.size as CurrencyInputSize) ?? "md"}
	/>
	<FieldDescription>
		Value in minor units: <span class="font-mono tabular-nums">{amount ?? "null"}</span>
	</FieldDescription>
</Field>
