<script lang="ts">
import { cn } from "../lib/cn";

let {
	keys,
	size = "md",
	class: classProp,
}: { keys: string[]; size?: "sm" | "md" | "lg" | "xl"; class?: string } = $props();

// Written out so a screen reader says "Control K", not "ctrl plus k".
const SPOKEN: Record<string, string> = {
	"⌘": "Command",
	"⌃": "Control",
	"⌥": "Option",
	"⇧": "Shift",
	"↵": "Enter",
	"⎋": "Escape",
};

const SIZE = {
	sm: "h-4 min-w-4 px-1 text-[10px]",
	md: "h-5 min-w-5 px-1.5 text-[11px]",
	lg: "h-6 min-w-6 px-2 text-xs",
	xl: "h-7 min-w-7 px-2.5 text-sm",
};
const spoken = $derived(keys.map((k) => SPOKEN[k] ?? k).join(" then "));
</script>

<span class={cn("inline-flex items-center gap-1", classProp)}>
	<span class="sr-only">{spoken}</span>
	{#each keys as key (key)}
		<kbd
			aria-hidden="true"
			class={cn(
				"inline-flex items-center justify-center rounded border border-border bg-card font-mono text-muted-foreground",
				SIZE[size],
			)}
		>
			{key}
		</kbd>
	{/each}
</span>
