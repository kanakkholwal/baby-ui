<script lang="ts">
import { cn } from "../lib/cn";
import {
	type RevealTextSize,
	type RevealTextSplit,
	type RevealTextTrigger,
	revealText,
	revealUnits,
} from "./variants";

let {
	text,
	split = "word",
	trigger = "mount",
	once = true,
	revealed: revealedProp,
	onRevealedChange,
	staggerMs = 90,
	delayMs = 0,
	blur = 12,
	size = "inherit",
	as = "span",
	class: className,
}: {
	/** One string, or one per line. */
	text: string | string[];
	split?: RevealTextSplit;
	/** Reveal on mount, or when scrolled into view. */
	trigger?: RevealTextTrigger;
	/** With `trigger="view"`: reveal only the first time instead of every entry. */
	once?: boolean;
	/** Controlled: whether the text shows. Omit to follow `trigger`. */
	revealed?: boolean;
	onRevealedChange?: (revealed: boolean) => void;
	/** Gap between units, in ms. */
	staggerMs?: number;
	delayMs?: number;
	/** Starting blur in px; skipped on touch screens and reduced motion. */
	blur?: number;
	size?: RevealTextSize;
	as?: string;
	class?: string;
} = $props();

let node = $state<HTMLElement | null>(null);
let internal = $state(false);
const revealed = $derived(revealedProp ?? internal);
const lines = $derived((Array.isArray(text) ? text : [text]).filter(Boolean));
const units = $derived(revealUnits(lines, split, delayMs, staggerMs));
const styles = $derived(revealText({ split, trigger, size }));

function set(next: boolean) {
	internal = next;
	onRevealedChange?.(next);
}

$effect(() => {
	if (trigger === "mount") {
		const frame = requestAnimationFrame(() => set(true));
		return () => cancelAnimationFrame(frame);
	}
	const el = node;
	if (!el) return;
	const reveal = once;
	const observer = new IntersectionObserver(
		([entry]) => {
			if (entry?.isIntersecting) {
				set(true);
				if (reveal) observer.disconnect();
			} else if (!reveal) set(false);
		},
		{ rootMargin: "0px 0px -4% 0px" },
	);
	observer.observe(el);
	return () => observer.disconnect();
});
</script>

<svelte:element
	this={as}
	bind:this={node}
	data-slot="reveal-text"
	data-revealed={revealed ? "true" : "false"}
	class={cn(styles.root(), className)}
	style:--reveal-blur-amount="{blur}px"
>
	<span class={styles.srOnly()}>{lines.join(" ")}</span>
	<span aria-hidden="true">
		{#each units as line, l (l)}
			<span class={styles.line()}>
				{#each line as unit (unit.key)}
					<span class={styles.unit()} style:--reveal-delay="{unit.delay}ms">{unit.text}</span>
				{/each}
			</span>
		{/each}
	</span>
</svelte:element>
