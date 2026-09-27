<script lang="ts">
import { Field, FieldLabel, PhoneInput } from "@baby-ui/svelte";

let phone = $state("");
let country = $state("US");
</script>

<Field>
	<FieldLabel for="phone">Phone</FieldLabel>
	<PhoneInput id="phone" bind:value={phone} bind:country />
</Field>
