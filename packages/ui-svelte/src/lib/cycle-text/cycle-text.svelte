<script lang="ts">
import { cn } from "../lib/cn";
import { type CycleTextSize, cycleText } from "./variants";

let {
	words,
	index: indexProp,
	defaultIndex = 0,
	onIndexChange,
	intervalMs = 1300,
	durationMs = 260,
	size = "md",
	as = "span",
	class: classProp,
}: {
	words: string[];
	index?: number;
	defaultIndex?: number;
	onIndexChange?: (index: number) => void;
	intervalMs?: number;
	/** How long each word's enter animation takes, in ms. */
	durationMs?: number;
	size?: CycleTextSize;
	as?: string;
	class?: string;
} = $props();

// svelte-ignore state_referenced_locally -- intentional one-time seed, matching React's useState(initialValue)
let internalIndex = $state(defaultIndex);
const index = $derived(indexProp ?? internalIndex);

function setIndex(next: number) {
	if (indexProp === undefined) internalIndex = next;
	onIndexChange?.(next);
}

$effect(() => {
	if (indexProp !== undefined || words.length <= 1) return;
	const id = setInterval(() => {
		setIndex((index + 1) % words.length);
	}, intervalMs);
	return () => clearInterval(id);
});

const safeIndex = $derived(((index % words.length) + words.length) % words.length);
const word = $derived(words[safeIndex] ?? "");
</script>

<svelte:element this={as} data-slot="cycle-text" class={cn(cycleText({ size }), classProp)}>
	{#key safeIndex}
		<span
			class="text-transition-unit inline-block"
			style="--tt-duration: {durationMs}ms; --tt-from-opacity: 0; --tt-from-y: 10px;"
		>
			{word}
		</span>
	{/key}
</svelte:element>
