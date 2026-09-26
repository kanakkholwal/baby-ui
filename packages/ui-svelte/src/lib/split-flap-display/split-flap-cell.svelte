<script lang="ts">
import { untrack } from "svelte";
import { cn } from "../lib/cn";
import { flapSteps, prefersReducedMotion } from "./flap";
import type { splitFlap } from "./variants";

let {
	char,
	delayMs,
	stepMs,
	characters,
	styles,
}: {
	char: string;
	delayMs: number;
	stepMs: number;
	characters: string;
	styles: ReturnType<typeof splitFlap>;
} = $props();

let current = $state(" ");
let prev = $state(" ");
let step = $state(0);

$effect(() => {
	const target = char;
	const steps = flapSteps(
		untrack(() => current),
		target,
		characters,
	);
	if (steps.length === 0) return;
	if (prefersReducedMotion()) {
		current = target;
		prev = target;
		step = 0;
		return;
	}
	let i = 0;
	const tick = () => {
		const next = steps[i++] ?? target;
		prev = current;
		current = next;
		step += 1;
		if (i < steps.length) timer = setTimeout(tick, stepMs);
	};
	let timer = setTimeout(tick, delayMs);
	return () => clearTimeout(timer);
});
</script>

<span class={styles.cell()}>
	<span class={styles.top()}>
		<span class={cn(styles.glyph(), "top-0")}>{current}</span>
	</span>
	<span class={styles.bottom()}>
		<span class={cn(styles.glyph(), "bottom-0")}>{prev}</span>
	</span>
	{#if step > 0}
		{#key step}
			<span class={cn(styles.top(), styles.flap(), "origin-bottom split-flap-top")}>
				<span class={cn(styles.glyph(), "top-0")}>{prev}</span>
			</span>
			<span class={cn(styles.bottom(), styles.flap(), "origin-top split-flap-bottom")}>
				<span class={cn(styles.glyph(), "bottom-0")}>{current}</span>
			</span>
		{/key}
	{/if}
	<span class={styles.divider()}></span>
</span>
