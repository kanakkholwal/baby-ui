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
</script>

<span data-slot="ticker" class={cn(ticker({ size }), classProp)}>
	{#each parts as part, index (index + part)}
		{#if !DIGIT_RE.test(part)}
			<span>{part}</span>
		{:else}
			<span class="ticker-digit">
				<span
					class="ticker-digit__track"
					style="--ticker-index: {part}; --ticker-duration: {durationMs}ms;"
				>
					{#each ROWS as row (row)}
						<span class="ticker-digit__row">{row}</span>
					{/each}
				</span>
			</span>
		{/if}
	{/each}
</span>
