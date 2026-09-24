<script lang="ts">
import { cn } from "../lib/cn";
import {
	type WaveRevealDirection,
	type WaveRevealMode,
	waveAnimationClass,
	waveReveal,
} from "./variants";

let {
	text,
	direction = "down",
	mode = "letter",
	blur = true,
	staggerMs = 50,
	class: classProp,
}: {
	text: string;
	direction?: WaveRevealDirection;
	mode?: WaveRevealMode;
	blur?: boolean;
	staggerMs?: number;
	class?: string;
} = $props();

const classes = $derived(waveReveal({ direction }));
const words = $derived(text.trim().split(/\s+/));
const animClass = $derived(waveAnimationClass(direction, blur));

function delayFor(index: number) {
	return `${index * staggerMs}ms`;
}
</script>

<div data-slot="wave-reveal" class={cn(classes.root(), classProp)}>
	<span class="sr-only">{text}</span>
	<span aria-hidden="true" class="contents">
		{#each words as word, wordIndex (`${wordIndex}-${word}`)}
			{@const baseIndex = words.slice(0, wordIndex).reduce((n, w) => n + (mode === "word" ? 1 : w.length), 0)}
			{#if wordIndex > 0}{" "}{/if}<span class={classes.word()}>
				{#if mode === "word"}
					<span class={cn(classes.unit(), animClass)} style="animation-delay: {delayFor(baseIndex)}">
						{word}
					</span>
				{:else}
					{#each word.split("") as letter, letterIndex (letterIndex)}
						<span
							class={cn(classes.unit(), animClass)}
							style="animation-delay: {delayFor(baseIndex + letterIndex)}"
						>
							{letter}
						</span>
					{/each}
				{/if}
			</span>
		{/each}
	</span>
</div>
