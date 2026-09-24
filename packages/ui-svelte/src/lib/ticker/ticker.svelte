<script lang="ts">
import { cn } from "../lib/cn";
import { type TickerSize, ticker } from "./variants";

let {
	value,
	durationMs = 500,
	size = "md",
	class: classProp,
}: {
	/** The value to display. Each digit rolls to its new row when this changes. */
	value: string;
	/** How long each digit's roll takes, in ms. */
	durationMs?: number;
	size?: TickerSize;
	class?: string;
} = $props();

const ROWS = Array.from({ length: 10 }, (_, i) => i);
const DIGIT_RE = /^[0-9]$/;
const parts = $derived([...value]);
let mounted = $state(false);

$effect(() => {
	const frame = requestAnimationFrame(() => (mounted = true));
	return () => cancelAnimationFrame(frame);
});
</script>

<span data-slot="ticker" class={cn(ticker({ size }), classProp)}>
	<span class="sr-only">{value}</span>
	<!-- Keyed from the right so digits keep their place when the value grows. -->
	{#each parts as part, index (`${parts.length - index}-${DIGIT_RE.test(part) ? "digit" : part}`)}
		{#if !DIGIT_RE.test(part)}
			<span aria-hidden="true">{part}</span>
		{:else}
			<span class="ticker-digit" aria-hidden="true">
				<span
					class="ticker-digit__track"
					style="--ticker-index: {mounted ? part : 0}; --ticker-duration: {durationMs}ms;"
				>
					{#each ROWS as row (row)}
						<span class="ticker-digit__row">{row}</span>
					{/each}
				</span>
			</span>
		{/if}
	{/each}
</span>
