<script lang="ts">
import { cn } from "../lib/cn";
import { type TextFlipSize, textFlip } from "./variants";

let {
	label,
	words,
	intervalMs = 2000,
	size = "lg",
	class: classProp,
}: {
	label: string;
	words: string[];
	intervalMs?: number;
	size?: TextFlipSize;
	class?: string;
} = $props();

let step = $state(0);
let stackEl: HTMLDivElement | undefined;
const extended = $derived([...words, words[0]]);
const classes = $derived(textFlip({ size }));

$effect(() => {
	if (words.length <= 1) return;
	const id = setInterval(() => {
		step += 1;
	}, intervalMs);
	return () => clearInterval(id);
});

$effect(() => {
	const el = stackEl;
	if (!el || step !== words.length) return;
	function snapBack() {
		if (!el) return;
		el.style.transitionDuration = "0s";
		step = 0;
		requestAnimationFrame(() => {
			el.style.transitionDuration = "";
		});
	}
	el.addEventListener("transitionend", snapBack, { once: true });
	return () => el.removeEventListener("transitionend", snapBack);
});
</script>

<div data-slot="text-flip" class={cn(classes.root(), classProp)}>
	<span class={classes.label()}>{label}</span>
	<span class={classes.window()}>
		<div bind:this={stackEl} class="text-flip-stack" style="--flip-step: {step}">
			{#each extended as text, index (index)}
				<span class={classes.word()}>{text}</span>
			{/each}
		</div>
	</span>
</div>
