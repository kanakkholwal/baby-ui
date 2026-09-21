<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../lib/cn";
import { type ToggleSize, toggleButton } from "./variants";

let {
	children,
	pressed = $bindable(false),
	disabled = false,
	size = "md",
	label,
	class: classProp,
}: {
	children?: Snippet;
	pressed?: boolean;
	disabled?: boolean;
	size?: ToggleSize;
	label?: string;
	class?: string;
} = $props();
</script>

<button
	type="button"
	aria-pressed={pressed}
	aria-label={label}
	{disabled}
	onclick={() => (pressed = !pressed)}
	class={cn(toggleButton({ size }), classProp)}
>
	{@render children?.()}
</button>
