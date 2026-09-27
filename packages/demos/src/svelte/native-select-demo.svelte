<script lang="ts">
import {
	NativeSelect,
	NativeSelectOptGroup,
	NativeSelectOption,
	type NativeSelectSize,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const size = $derived((props.size as NativeSelectSize) ?? "md");
let region = $state("fra");
</script>

<div class="flex w-full max-w-60 flex-col gap-1.5">
	<label for="region" class="font-medium text-sm">Region</label>
	<NativeSelect id="region" class="w-full" {size} bind:value={region} disabled={Boolean(props.disabled)}>
		<NativeSelectOptGroup label="Europe">
			<NativeSelectOption value="fra">Frankfurt</NativeSelectOption>
			<NativeSelectOption value="lhr">London</NativeSelectOption>
		</NativeSelectOptGroup>
		<NativeSelectOptGroup label="Americas">
			<NativeSelectOption value="iad">Virginia</NativeSelectOption>
			<NativeSelectOption value="sfo">San Francisco</NativeSelectOption>
		</NativeSelectOptGroup>
	</NativeSelect>
</div>
