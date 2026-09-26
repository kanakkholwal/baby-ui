<script lang="ts">
import { cn } from "../lib/cn";
import {
	letterOrigins,
	repelAll,
	type TextRepelMode,
	type TextRepelSize,
	textRepel,
} from "./variants";

let {
	text,
	radius = 120,
	strength = 45,
	mode = "repel",
	size,
	class: className,
}: {
	text: string;
	/** Pointer influence radius, in px. */
	radius?: number;
	/** Largest displacement, in px, for a letter right under the pointer. */
	strength?: number;
	mode?: TextRepelMode;
	size?: TextRepelSize;
	class?: string;
} = $props();

const s = $derived(textRepel({ mode, size }));
const chars = $derived(Array.from(text));

let root = $state<HTMLSpanElement>();
const letters: HTMLSpanElement[] = [];
let origins: { x: number; y: number }[] = [];
let reduced = false;

$effect(() => {
	void chars;
	reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
	const node = root;
	if (!node) return;
	const measure = () => {
		origins = letterOrigins(letters.filter(Boolean));
	};
	measure();
	const observer = new ResizeObserver(measure);
	observer.observe(node);
	return () => observer.disconnect();
});

function onMove(event: PointerEvent) {
	if (!root || reduced) return;
	const box = root.getBoundingClientRect();
	const pointer = { x: event.clientX - box.left, y: event.clientY - box.top };
	repelAll(letters.filter(Boolean), origins, pointer, radius, strength, mode);
}

function onLeave() {
	repelAll(letters.filter(Boolean), origins, null, radius, strength, mode);
}
</script>

<span
	bind:this={root}
	data-slot="text-repel"
	role="presentation"
	class={cn(s.root(), className)}
	onpointermove={onMove}
	onpointerleave={onLeave}
>
	<span class={s.srOnly()}>{text}</span>
	{#each chars as c, i (i)}
		<span bind:this={letters[i]} aria-hidden="true" class={s.letter()}>{c}</span>
	{/each}
</span>
