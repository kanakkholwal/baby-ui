<script lang="ts">
import { cn } from "../lib/cn";
import { type TypewriterCursor, typewriter, typewriterSteps } from "./variants";

let {
	text,
	durationMs = 3000,
	loop = true,
	cursor = "bar",
	onComplete,
	as = "div",
	class: className,
}: {
	text: string;
	/** Scales every keystroke; 3000 is the reference pace. */
	durationMs?: number;
	/** Hold the finished line for a second, then type it again. */
	loop?: boolean;
	cursor?: TypewriterCursor;
	/** Fired each time the line finishes typing. */
	onComplete?: () => void;
	as?: string;
	class?: string;
} = $props();

const HOLD_MS = 1000;

let pass = $state(0);
let step = $state(0);
let reduced = $state(false);
const steps = $derived(typewriterSteps(text, pass));
const done = $derived(step >= steps.length);
const styles = $derived(typewriter({ cursor }));
const shown = $derived(reduced || done ? text : (steps[step]?.text ?? ""));

$effect(() => {
	const query = matchMedia("(prefers-reduced-motion: reduce)");
	reduced = query.matches;
	const update = () => (reduced = query.matches);
	query.addEventListener("change", update);
	return () => query.removeEventListener("change", update);
});

$effect.pre(() => {
	void text;
	pass = 0;
	step = 0;
});

$effect(() => {
	if (reduced) return;
	const scale = durationMs / 3000;
	if (done) {
		onComplete?.();
		if (!loop) return;
		const id = setTimeout(() => {
			pass += 1;
			step = 0;
		}, HOLD_MS * scale);
		return () => clearTimeout(id);
	}
	const id = setTimeout(() => (step += 1), (steps[step]?.wait ?? 0) * scale);
	return () => clearTimeout(id);
});
</script>

<svelte:element this={as} data-slot="typewriter" class={cn(styles.root(), className)}>
	<span class={styles.srOnly()}>{text}</span>
	<span aria-hidden="true" class={styles.text()}
		>{shown}{#if !(reduced || done)}<span class={styles.caret()}></span>{/if}</span
	>
</svelte:element>
