<script lang="ts">
import { cn } from "../lib/cn";
import { flipStep, type TextFlipSize, textFlip } from "./variants";

let {
	label,
	words,
	index: indexProp,
	defaultIndex = 0,
	onIndexChange,
	intervalMs = 2000,
	size = "lg",
	class: className,
}: {
	/** Fixed leading label, e.g. "Coding is". */
	label: string;
	/** Words that cycle after the label, looping back to the first. */
	words: string[];
	/** Controlled: which word is showing. Omit to let the component flip on its own. */
	index?: number;
	defaultIndex?: number;
	onIndexChange?: (index: number) => void;
	/** Time each word holds before flipping to the next. Only runs while uncontrolled. */
	intervalMs?: number;
	size?: TextFlipSize;
	class?: string;
} = $props();

type View = { index: number; step: number; snap: boolean };

const count = $derived(words.length);
// svelte-ignore state_referenced_locally -- one-time seed, like React's useState(initialValue)
let internalIndex = $state(defaultIndex);
const index = $derived(
	count > 0 ? (((indexProp ?? internalIndex) % count) + count) % count : 0,
);
// svelte-ignore state_referenced_locally -- seeded once; later changes flow through the effect
let view = $state<View>({ index, step: index, snap: false });

$effect.pre(() => {
	if (view.index !== index) {
		view = { index, step: flipStep(view.index, index, count), snap: false };
	}
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
	if (!view.snap) return;
	let frame = requestAnimationFrame(() => {
		frame = requestAnimationFrame(() => {
			view = { ...view, snap: false };
		});
	});
	return () => cancelAnimationFrame(frame);
});

const styles = $derived(textFlip({ size }));
</script>

<div data-slot="text-flip" class={cn(styles.root(), className)}>
	<span class={styles.label()}>{label}</span>
	<span class={styles.window()} aria-hidden="true">
		<span
			class={styles.stack()}
			data-snap={view.snap ? "" : undefined}
			style:--flip-step={view.step}
			ontransitionend={() => {
				if (view.step === count) view = { ...view, step: 0, snap: true };
			}}
		>
			{#each [...words, words[0]] as text, i (i)}
				<span class={styles.word()}>{text}</span>
			{/each}
		</span>
	</span>
	<span class={styles.srOnly()}>{words[index]}</span>
</div>
