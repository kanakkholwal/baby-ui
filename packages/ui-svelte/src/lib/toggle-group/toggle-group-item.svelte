<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { getToggleGroup, TOGGLE_GROUP_ITEM } from "./context";

let {
	children,
	value,
	disabled = false,
	class: classProp,
	...rest
}: {
	children?: Snippet;
	value: string;
	disabled?: boolean;
	class?: string;
} & HTMLButtonAttributes = $props();

const group = getToggleGroup();
</script>

<button
	{...rest}
	type="button"
	data-slot="toggle-group-item"
	aria-pressed={group.isOn(value)}
	disabled={disabled || group.disabled}
	onclick={() => group.toggle(value)}
	class={cn(
		"inline-flex items-center rounded-lg font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring aria-pressed:bg-foreground/[0.08] aria-pressed:text-foreground disabled:pointer-events-none disabled:opacity-50",
		TOGGLE_GROUP_ITEM[group.size],
		classProp,
	)}
>
	{@render children?.()}
</button>
