<script lang="ts">
import {
	Progress,
	type ProgressSize,
	type ProgressTone,
	type ProgressVariant,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const value = $derived(Number(props.value ?? 68));
const indeterminate = $derived(Boolean(props.indeterminate));
</script>

<div class="flex w-72 flex-col items-center gap-2">
	<Progress
		{value}
		{indeterminate}
		size={(props.size as ProgressSize) ?? "md"}
		tone={(props.tone as ProgressTone) ?? "default"}
		variant={(props.variant as ProgressVariant) ?? "linear"}
		showValue={props.showValue === true}
		label={(props.label as string) || "design-system.zip"}
		helper={(props.helper as string) || "12.4 MB of 18.2 MB, 6s remaining"}
		indeterminateLabel="Preparing"
	/>
</div>
