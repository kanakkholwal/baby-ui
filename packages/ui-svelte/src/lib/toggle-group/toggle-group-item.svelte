<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { getToggleGroup } from "./context";
import { toggleGroupItem } from "./variants";

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
	class={cn(toggleGroupItem({ size: group.size }), classProp)}
>
	{@render children?.()}
</button>
