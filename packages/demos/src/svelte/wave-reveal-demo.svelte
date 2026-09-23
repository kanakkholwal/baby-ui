<script lang="ts">
import {
	WaveReveal,
	type WaveRevealDirection,
	type WaveRevealMode,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
let direction = $derived((props.direction as WaveRevealDirection) ?? "down");
let mode = $derived((props.mode as WaveRevealMode) ?? "letter");
let blur = $derived(props.blur !== false);
let staggerMs = $derived(Number(props.staggerMs ?? 50));
</script>

{#key `${direction}${blur}${mode}${staggerMs}`}
	<WaveReveal
		text={(props.text as string) || "Reveal letter or word one by one"}
		{direction}
		{mode}
		{blur}
		{staggerMs}
		class="text-2xl font-medium text-foreground"
	/>
{/key}
