<script lang="ts">
import { Checkbox } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let checked = $state(false);

$effect(() => {
	checked = Boolean(props.checked);
});
</script>

<Checkbox
	bind:checked
	indeterminate={Boolean(props.indeterminate)}
	disabled={Boolean(props.disabled)}
	label={(props.label as string) || "Accept terms"}
/>
