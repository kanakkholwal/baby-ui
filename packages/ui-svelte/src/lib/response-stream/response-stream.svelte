<script lang="ts">
import { prefersReducedMotion } from "svelte/motion";
import { cn } from "../lib/cn";
import { type ResponseStreamSize, responseStream } from "./variants";

let {
	text,
	speed = 60,
	streaming = true,
	size = "md",
	class: classProp,
}: {
	text: string;
	speed?: number;
	streaming?: boolean;
	size?: ResponseStreamSize;
	class?: string;
} = $props();

const styles = $derived(responseStream({ size }));

let shown = $state(0);

$effect(() => {
	if (prefersReducedMotion.current) {
		shown = text.length;
		return;
	}
	shown = 0;
	const perTick = Math.max(1, Math.round(speed / 30));
	const id = setInterval(() => {
		shown = Math.min(text.length, shown + perTick);
		if (shown >= text.length) clearInterval(id);
	}, 1000 / 30);
	return () => clearInterval(id);
});

const visible = $derived(text.slice(0, shown));
const done = $derived(shown >= text.length);
</script>

<p
	aria-live="polite"
	aria-busy={!done || undefined}
	data-slot="response-stream"
	class={cn(styles.root(), classProp)}
>{visible}{#if streaming && !done}<span aria-hidden="true" class={styles.caret()}></span>{/if}</p>
