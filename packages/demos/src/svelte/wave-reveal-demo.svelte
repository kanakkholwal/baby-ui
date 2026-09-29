<script lang="ts">
import { WaveReveal } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof WaveReveal>>(props));
let direction = $derived(p.direction ?? "down");
let mode = $derived(p.mode ?? "letter");
let blur = $derived(props.blur !== false);
let staggerMs = $derived(Number(props.staggerMs ?? 50));
</script>

{#key `${direction}${blur}${mode}${staggerMs}`}
	<WaveReveal
		text={p.text || "Reveal letter or word one by one"}
		{direction}
		{mode}
		{blur}
		{staggerMs}
		class="text-2xl font-medium text-foreground"
	/>
{/key}
