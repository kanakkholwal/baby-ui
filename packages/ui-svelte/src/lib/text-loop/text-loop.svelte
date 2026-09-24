<script lang="ts">
import { cn } from "../lib/cn";
import { type TextLoopDirection, type TextLoopSize, textLoop } from "./variants";

let {
	items,
	index: indexProp,
	defaultIndex = 0,
	onIndexChange,
	intervalMs = 1000,
	durationMs = 300,
	direction = "up",
	size = "inherit",
	class: className,
}: {
	items: string[];
	/** Controlled: which item is showing. Omit to let the component loop on its own. */
	index?: number;
	defaultIndex?: number;
	onIndexChange?: (index: number) => void;
	/** Time each item stays before the next. Only runs while uncontrolled. */
	intervalMs?: number;
	/** Enter and exit length, in ms. */
	durationMs?: number;
	direction?: TextLoopDirection;
	size?: TextLoopSize;
	class?: string;
} = $props();

type Shown = { index: number; key: number };

// svelte-ignore state_referenced_locally -- one-time seed, like React's useState(initialValue)
let internalIndex = $state(defaultIndex);
const count = $derived(items.length);
const index = $derived(
	count > 0 ? (((indexProp ?? internalIndex) % count) + count) % count : 0,
);
// svelte-ignore state_referenced_locally -- seeded once; later changes flow through the effect
let shown = $state<Shown>({ index, key: 0 });
let leaving = $state<Shown[]>([]);

$effect.pre(() => {
	if (shown.index === index) return;
	leaving.push(shown);
	shown = { index, key: shown.key + 1 };
});

$effect(() => {
	if (indexProp !== undefined || count <= 1) return;
	const id = setInterval(() => {
		const next = (index + 1) % count;
		internalIndex = next;
		onIndexChange?.(next);
	}, intervalMs);
	return () => clearInterval(id);
});

const styles = $derived(textLoop({ direction, size }));
const longest = $derived(items.reduce((a, b) => (b.length > a.length ? b : a), ""));
</script>

{#if count > 0}
	<span
		data-slot="text-loop"
		class={cn(styles.root(), className)}
		style:--text-loop-duration="{durationMs}ms"
	>
		<span aria-hidden="true" class={styles.sizer()}>{longest}</span>
		<span class={styles.viewport()}>
			{#each leaving as item (item.key)}
				<span
					aria-hidden="true"
					class={cn(styles.item(), "text-loop-exit")}
					onanimationend={() => (leaving = leaving.filter((l) => l.key !== item.key))}
					>{items[item.index]}</span
				>
			{/each}
			{#key shown.key}
				<span class={cn(styles.item(), shown.key > 0 && "text-loop-enter")}>{items[index]}</span>
			{/key}
		</span>
	</span>
{/if}
