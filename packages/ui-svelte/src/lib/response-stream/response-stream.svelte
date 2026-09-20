<script lang="ts">
import { prefersReducedMotion } from "svelte/motion";
import { cn } from "../lib/cn";

let {
	text,
	speed = 60,
	streaming = true,
	class: classProp,
}: { text: string; speed?: number; streaming?: boolean; class?: string } = $props();

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
	class={cn("text-foreground text-sm leading-relaxed", classProp)}
>{visible}{#if streaming && !done}<span
			aria-hidden="true"
			class="stream-caret ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] bg-current"
		></span>{/if}</p>
