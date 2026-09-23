<script lang="ts">
import { cn } from "../lib/cn";
import { type TypingTextSize, typingText } from "./variants";

let {
	text,
	delay = 32,
	repeat = true,
	waitMs = 1000,
	smooth = false,
	fadeDurationMs = 300,
	grow = false,
	hideCursorOnComplete = false,
	onComplete,
	size = "md",
	class: classProp,
}: {
	text: string;
	delay?: number;
	repeat?: boolean;
	waitMs?: number;
	smooth?: boolean;
	/** How long each word's fade-in takes, in ms. Only applies when `smooth` is true. */
	fadeDurationMs?: number;
	grow?: boolean;
	hideCursorOnComplete?: boolean;
	onComplete?: () => void;
	size?: TypingTextSize;
	class?: string;
} = $props();

const words = $derived(text.split(/\s+/));
const total = $derived(smooth ? words.length : text.length);

let index = $state(0);
let direction = $state<1 | -1>(1);
let completed = false;
let blinkOn = $state(true);

$effect(() => {
	text; // re-run whenever the text prop changes, not just on mount
	index = 0;
	direction = 1;
	completed = false;
});

$effect(() => {
	const id = setInterval(() => {
		blinkOn = !blinkOn;
	}, 500);
	return () => clearInterval(id);
});

const atEnd = $derived(index >= total);
const atStart = $derived(index <= 0);
const paused = $derived((atEnd && direction === 1) || (atStart && direction === -1));

$effect(() => {
	if (paused) return;
	const step = Math.max(1, delay);
	const id = setInterval(() => {
		const next = index + direction;
		index = direction === 1 ? Math.min(next, total) : Math.max(next, 0);
	}, step);
	return () => clearInterval(id);
});

$effect(() => {
	if (atEnd && direction === 1) {
		if (!repeat) {
			if (!completed) {
				completed = true;
				onComplete?.();
			}
			return;
		}
		const id = setTimeout(() => {
			direction = -1;
		}, waitMs);
		return () => clearTimeout(id);
	}
	if (atStart && direction === -1 && repeat) {
		const id = setTimeout(() => {
			direction = 1;
		}, waitMs);
		return () => clearTimeout(id);
	}
});

const isComplete = $derived(index === total && !repeat);
const showCursor = $derived(!smooth && (!hideCursorOnComplete || !isComplete));
const classes = $derived(typingText({ size }));
</script>

<div data-slot="typing-text" class={cn(classes, classProp)} style="--tt-fade-duration: {fadeDurationMs}ms;">
	{#if !grow}
		<div class="invisible">{text}</div>
	{/if}
	<div class={!grow ? "absolute inset-0" : undefined}>
		{#if smooth}
			<span class="flex flex-wrap whitespace-pre">
				{#each words as word, i (i)}
					<span class={cn("transition-opacity duration-[var(--tt-fade-duration,300ms)] ease-[var(--ease-in-out)]", i < index ? "opacity-100" : "opacity-0")}>
						{word}{#if i < words.length - 1}<span>&nbsp;</span>{/if}
					</span>
				{/each}
			</span>
		{:else}
			{text.slice(0, index)}
		{/if}
		{#if showCursor}<span class={blinkOn || atEnd || atStart ? "" : "opacity-0"}>|</span>{/if}
	</div>
</div>
