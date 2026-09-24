<script lang="ts">
import { cn } from "../lib/cn";
import { type StaggeredLetterDirection, staggeredLetter } from "./variants";

let {
	text,
	applyMask = true,
	delayMs = 90,
	durationMs = 500,
	direction = "drop",
	class: classProp,
}: {
	text: string;
	applyMask?: boolean;
	delayMs?: number;
	durationMs?: number;
	direction?: StaggeredLetterDirection;
	class?: string;
} = $props();

const classes = $derived(staggeredLetter({ direction }));
const travel = $derived(direction === "up" ? "150px" : "-150px");
</script>

<div data-slot="staggered-letter" class={cn(classes.root(), classProp)}>
	{#if applyMask}
		<div class={classes.mask()}>{text}</div>
	{/if}
	<div class={classes.row()}>
		{#key text}
			{#each text.split("") as letter, index (index)}
				<div
					class="text-transition-unit"
					style="--tt-duration: {durationMs}ms; --tt-delay: {index * delayMs}ms; --tt-from-opacity: 0; --tt-from-y: {travel};"
				>
					{letter === " " ? "\u00a0" : letter}
				</div>
			{/each}
		{/key}
	</div>
</div>
