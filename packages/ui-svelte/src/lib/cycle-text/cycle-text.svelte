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

type Shown = { index: number; key: number };

const count = $derived(words.length);
// svelte-ignore state_referenced_locally -- intentional one-time seed, matching React's useState(initialValue)
let internalIndex = $state(defaultIndex);
const index = $derived(
	count > 0 ? (((indexProp ?? internalIndex) % count) + count) % count : 0,
);
// svelte-ignore state_referenced_locally -- seeded once; later changes flow through the effect
let shown = $state<Shown>({ index, key: 0 });
let leaving = $state<Shown[]>([]);
let wordEl = $state<HTMLSpanElement | null>(null);
let width = $state<number>();

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

$effect(() => {
	const node = wordEl;
	if (!node) return;
	const measure = () => (width = node.offsetWidth);
	measure();
	const observer = new ResizeObserver(measure);
	observer.observe(node);
	return () => observer.disconnect();
});

const styles = $derived(cycleText({ size }));
</script>

<svelte:element
	this={as}
	data-slot="cycle-text"
	class={cn(styles.root(), classProp)}
	style:width={width === undefined ? undefined : `${width}px`}
>
	{#each leaving as item (item.key)}
		<span
			aria-hidden="true"
			class={cn(styles.leaving(), "cycle-text-exit")}
			onanimationend={() => (leaving = leaving.filter((l) => l.key !== item.key))}
			>{words[item.index]}</span
		>
	{/each}
	{#key shown.key}
		<span
			bind:this={wordEl}
			class={cn(styles.word(), shown.key > 0 && "text-transition-unit")}
			style="--tt-duration: {durationMs}ms; --tt-from-opacity: 0; --tt-from-y: 10px;"
			>{words[index]}</span
		>
	{/key}
</svelte:element>
