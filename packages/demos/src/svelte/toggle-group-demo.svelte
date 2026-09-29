<script lang="ts">
import { ToggleGroup, ToggleGroupItem } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof ToggleGroup>>(props));

let value = $state<string | string[]>("grid");

$effect(() => {
	value = p.type === "multiple" ? ["grid"] : "grid";
});
</script>

<ToggleGroup
	bind:value
	type={p.type ?? "single"}
	variant={p.variant ?? "default"}
	size={p.size ?? "md"}
	disabled={p.disabled ?? false}
	label="View"
>
	<ToggleGroupItem value="list">List</ToggleGroupItem>
	<ToggleGroupItem value="grid">Grid</ToggleGroupItem>
	<ToggleGroupItem value="board">Board</ToggleGroupItem>
</ToggleGroup>
