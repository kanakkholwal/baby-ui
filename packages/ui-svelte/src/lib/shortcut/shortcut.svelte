<script lang="ts">
import { cn } from "../lib/cn";
import {
	matchesShortcut,
	parseShortcut,
	shortcutBlocked,
	shortcutOwner,
} from "../lib/shortcut-keys";
import { type ShortcutSize, type ShortcutVariant, shortcutCap } from "./variants";

let {
	shortcut,
	size = "md",
	variant = "default",
	joined = false,
	ontrigger,
	class: classProp,
}: {
	/** Tokens joined by `+`, e.g. `"cmd+k"` or `"shift+enter"`. */
	shortcut: string;
	size?: ShortcutSize;
	variant?: ShortcutVariant;
	/** One cap reading "⌘K" instead of a cap per key. */
	joined?: boolean;
	/** Runs on the key combo. Without it, the enclosing button or link is clicked. */
	ontrigger?: (event: KeyboardEvent) => void;
	class?: string;
} = $props();

let el = $state<HTMLElement>();
const parsed = $derived(parseShortcut(shortcut));
const caps = $derived.by(() => {
	const all = parsed?.caps ?? [shortcut];
	return joined ? [all.join("")] : all;
});

$effect(() => {
	const combo = parsed;
	if (!combo) return;
	const onKey = (event: KeyboardEvent) => {
		if (event.repeat || !matchesShortcut(event, combo) || shortcutBlocked(event, combo))
			return;
		const owner = ontrigger ? undefined : el && shortcutOwner(el);
		if (!ontrigger && !owner) return;
		event.preventDefault();
		if (ontrigger) ontrigger(event);
		else owner?.click();
	};
	window.addEventListener("keydown", onKey);
	return () => window.removeEventListener("keydown", onKey);
});
</script>

<span bind:this={el} data-slot="shortcut" class={cn("inline-flex items-center gap-1", classProp)}>
	<span class="sr-only">{parsed?.spoken ?? shortcut}</span>
	{#each caps as cap, i (i)}
		<kbd aria-hidden="true" class={shortcutCap({ variant, size })}>
			{cap}
		</kbd>
	{/each}
</span>
