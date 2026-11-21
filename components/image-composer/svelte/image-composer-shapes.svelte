<script lang="ts">
import ToggleGroup from "../../toggle-group/svelte/toggle-group.svelte";
import ToggleGroupItem from "../../toggle-group/svelte/toggle-group-item.svelte";
import { imageComposer } from "../variants";
import { getImageComposer } from "./context";

let { class: classProp }: { class?: string } = $props();

const composer = getImageComposer();
const styles = imageComposer();
</script>

<ToggleGroup
	data-slot="image-composer-shapes"
	type="single"
	variant="default"
	size="sm"
	label="Shape"
	disabled={composer.loading}
	value={composer.shape}
	class={classProp}
	onValueChange={(next) => {
		// A single group lets the pressed item be cleared; a shape is always chosen.
		if (typeof next === "string" && next) composer.shape = next;
	}}
>
	{#each composer.shapes as item (item.value)}
		<ToggleGroupItem value={item.value} class="gap-1.5">
			<span aria-hidden="true" class={styles.outline()} style:aspect-ratio={item.ratio}></span>
			<span class={styles.label()}>{item.label}</span>
		</ToggleGroupItem>
	{/each}
</ToggleGroup>
