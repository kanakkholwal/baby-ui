<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { composerState } from "./context";

let {
	icon,
	menu = false,
	class: classProp,
	children,
	...rest
}: HTMLButtonAttributes & {
	icon?: Snippet;
	/** Adds a chevron, for a chip that opens a dropdown. */
	menu?: boolean;
	children?: Snippet;
} = $props();
const ctx = composerState("ComposerChip");
</script>

<!-- A small control in the footer or toolbar. -->
<button type="button" data-slot="composer-chip" class={cn(ctx.styles.chip(), classProp)} {...rest}>
	{@render icon?.()}
	{@render children?.()}
	{#if menu}
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
	{/if}
</button>
