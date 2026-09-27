<script lang="ts">
import { CurrencyInput, Field, FieldLabel } from "@baby-ui/svelte";

// Minor units: 1999 is $19.99.
let price = $state<number | null>(1999);
</script>

<Field>
	<FieldLabel for="price">Price</FieldLabel>
	<CurrencyInput id="price" bind:value={price} currency="USD" />
</Field>
