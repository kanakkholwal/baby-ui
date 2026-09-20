<script lang="ts">
import { ColorPicker } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let value = $state("#7dd3fc");

$effect(() => {
	if (typeof props.value === "string") value = props.value;
});
</script>

<ColorPicker bind:value label={(props.label as string) || "Accent"} />
