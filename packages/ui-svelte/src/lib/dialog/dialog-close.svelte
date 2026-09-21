<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { getDialog } from "./context";

let {
	children,
	class: classProp,
	...rest
}: { children?: Snippet; class?: string } & HTMLButtonAttributes = $props();

const dialog = getDialog();
</script>

<button
	{...rest}
	type="button"
	data-slot="dialog-close"
	aria-label={children ? undefined : "Close"}
	onclick={() => dialog.setOpen(false)}
	class={cn(
		"absolute top-3 right-3 grid size-8 place-items-center rounded-md text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
		classProp,
	)}
>
	{#if children}
		{@render children()}
	{:else}
		<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-4">
			<path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
		</svg>
	{/if}
</button>
