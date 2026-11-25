<script lang="ts">
import { cn } from "../../lib/cn";
import Slider from "../../slider/svelte/slider.svelte";
import { composerState } from "./context";

/** A notched slider for how hard the model thinks. */
let {
	value = $bindable(0),
	onValueChange,
	levels = 6,
	label = "Effort",
	format = (n: number) => String(n + 1),
	lowLabel = "Faster",
	highLabel = "Smarter",
	class: classProp,
}: {
	value?: number;
	onValueChange?: (value: number) => void;
	/** How many notches the track has. */
	levels?: number;
	label?: string;
	/** Names the chosen notch; defaults to its number. */
	format?: (value: number) => string;
	lowLabel?: string;
	highLabel?: string;
	class?: string;
} = $props();
const ctx = composerState("ComposerEffort");
const notches = $derived(Array.from({ length: levels }, (_, n) => n));
</script>

<div class={cn(ctx.styles.effort(), classProp)}>
	<div class={ctx.styles.effortHeader()}>
		<span>{label}</span>
		<span class={ctx.styles.effortValue()}>{format(value)}</span>
	</div>
	<div class={ctx.styles.effortEnds()}>
		<span>{lowLabel}</span>
		<span>{highLabel}</span>
	</div>
	<div class="relative">
		<Slider
			variant="track"
			size="sm"
			orientation="horizontal"
			{label}
			min={0}
			max={levels - 1}
			step={1}
			bind:value={
				() => value,
				(next) => {
					value = Array.isArray(next) ? (next[0] ?? 0) : next;
					onValueChange?.(value);
				}
			}
			class={ctx.styles.effortTrack()}
		/>
		<span aria-hidden="true" class={ctx.styles.effortNotches()}>
			{#each notches as n (n)}
				<span class={ctx.styles.effortNotch()}></span>
			{/each}
		</span>
	</div>
</div>
