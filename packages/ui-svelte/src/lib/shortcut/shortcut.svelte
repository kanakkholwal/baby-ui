<script lang="ts">
import { cn } from "../lib/cn";
import {
	matchesShortcut,
	parseShortcut,
	shortcutBlocked,
	shortcutOwner,
} from "../lib/shortcut";

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
	size?: "sm" | "md" | "lg" | "xl";
	variant?: "default" | "ghost" | "solid" | "outline";
	/** One cap reading "⌘K" instead of a cap per key. */
	joined?: boolean;
	/** Runs on the key combo. Without it, the enclosing button or link is clicked. */
	ontrigger?: (event: KeyboardEvent) => void;
	class?: string;
} = $props();

const VARIANT = {
	default: "border border-border bg-card text-muted-foreground",
	ghost: "text-muted-foreground",
	solid: "bg-foreground/[0.08] text-foreground",
	outline: "border border-border-strong text-foreground",
};

const SIZE = {
	sm: "h-4 min-w-4 px-1 text-[10px]",
	md: "h-5 min-w-5 px-1.5 text-[11px]",
	lg: "h-6 min-w-6 px-2 text-xs",
	xl: "h-7 min-w-7 px-2.5 text-sm",
};

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
		<kbd
			aria-hidden="true"
			class={cn(
				"inline-flex items-center justify-center rounded font-medium font-sans",
				VARIANT[variant],
				// Inside a primary button the cap reads in the button's own foreground.
				"[[data-variant=default]_&]:border-transparent [[data-variant=default]_&]:bg-primary-foreground/15 [[data-variant=default]_&]:text-primary-foreground",
				SIZE[size],
			)}
		>
			{cap}
		</kbd>
	{/each}
</span>
