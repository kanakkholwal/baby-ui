<script lang="ts">
import { cn } from "../../lib/cn";
import { formatMemory, memorySegments } from "../model";
import { loadedModels } from "../variants";
import { getLoadedModels } from "./context";

/** A stacked bar of what each loaded model holds against `total` bytes; models need a `size`. */
let { total, class: classProp }: { total: number; class?: string } = $props();

const ctx = getLoadedModels();
const styles = loadedModels();
const segments = $derived(memorySegments(ctx.models, total));
const used = $derived(segments.reduce((sum, s) => sum + s.size, 0));
</script>

<div data-slot="loaded-models-memory" class={cn(styles.memory(), classProp)}>
	<div role="img" aria-label={`${formatMemory(used)} of ${formatMemory(total)} in use`} class={styles.memoryBar()}>
		{#each segments as segment, i (segment.id)}
			<span
				title={segment.name}
				class={styles.memorySegment()}
				style:width={`${segment.percent}%`}
				style:background={`var(--chart-${(i % 5) + 1})`}
			></span>
		{/each}
	</div>
	<p class={styles.memoryText()}>
		<span>{formatMemory(used)} in use</span>
		<span>{formatMemory(Math.max(0, total - used))} free</span>
	</p>
</div>
