<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../lib/cn";

let {
	children,
	for: htmlFor,
	class: classProp,
	required = false,
	disabled = false,
}: {
	children: Snippet;
	for?: string;
	class?: string;
	required?: boolean;
	disabled?: boolean;
} = $props();
</script>

<label
	for={htmlFor}
	class={cn(
		"inline-flex items-center gap-1 font-medium text-foreground text-sm",
		disabled && "pointer-events-none opacity-50",
		classProp,
	)}
>
	{@render children()}
	{#if required}<span aria-hidden="true" class="text-[var(--destructive)]">*</span>{/if}
</label>
