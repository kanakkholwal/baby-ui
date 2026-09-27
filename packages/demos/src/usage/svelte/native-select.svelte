<script lang="ts">
import { NativeSelect, NativeSelectOption } from "@baby-ui/svelte";

let region = $state("fra");
</script>

<NativeSelect aria-label="Region" bind:value={region}>
	<NativeSelectOption value="fra">Frankfurt</NativeSelectOption>
	<NativeSelectOption value="iad">Virginia</NativeSelectOption>
</NativeSelect>
