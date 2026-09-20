<script lang="ts">
import { ToggleGroup, ToggleGroupItem } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let value = $state<string | string[]>("grid");

$effect(() => {
	value = props.type === "multiple" ? ["grid"] : "grid";
});
</script>

<ToggleGroup
	bind:value
	type={(props.type as "single" | "multiple") ?? "single"}
	size={(props.size as "sm" | "md" | "lg" | "xl") ?? "md"}
	disabled={Boolean(props.disabled)}
	label="View"
>
	<ToggleGroupItem value="list">List</ToggleGroupItem>
	<ToggleGroupItem value="grid">Grid</ToggleGroupItem>
	<ToggleGroupItem value="board">Board</ToggleGroupItem>
</ToggleGroup>
