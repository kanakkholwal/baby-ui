<script lang="ts">
import { cn } from "../lib/cn";
import TextInertiaWord from "./text-inertia-word.svelte";
import { type TextInertiaSize, textInertia } from "./variants";

let {
	text,
	intensity = 1,
	size = "inherit",
	class: className,
	wordClass,
}: {
	text: string;
	/** Scales how far words fly from the pointer's speed. */
	intensity?: number;
	size?: TextInertiaSize;
	class?: string;
	wordClass?: string;
} = $props();

let velocity = { x: 0, y: 0 };
let last: { x: number; y: number } | null = null;
const words = $derived(text.trim().split(/\s+/).filter(Boolean));
const styles = $derived(textInertia({ size }));
</script>

<div
	data-slot="text-inertia"
	role="presentation"
	class={cn(styles.root(), className)}
	onpointermove={(event) => {
		if (last) velocity = { x: event.clientX - last.x, y: event.clientY - last.y };
		last = { x: event.clientX, y: event.clientY };
	}}
	onpointerleave={() => {
		last = null;
		velocity = { x: 0, y: 0 };
	}}
>
	<span class={styles.srOnly()}>{text}</span>
	{#each words as word, index (`${word}-${index}`)}
		<TextInertiaWord
			{word}
			{index}
			{intensity}
			velocity={() => velocity}
			class={cn(styles.word(), wordClass)}
		/>
	{/each}
</div>
