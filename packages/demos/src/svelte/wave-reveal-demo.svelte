<script lang="ts">
import { WaveReveal, type WaveRevealDirection } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
let direction = $derived((props.direction as WaveRevealDirection) ?? "down");
let blur = $derived(props.blur !== false);
</script>

{#key `${direction}${blur}`}
	<WaveReveal
		text="Reveal letter or word one by one"
		{direction}
		{blur}
		class="text-2xl font-medium text-foreground"
	/>
{/key}
