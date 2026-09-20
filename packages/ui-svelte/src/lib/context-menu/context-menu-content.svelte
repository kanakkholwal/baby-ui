<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { dismissable } from "../lib/anchor";
import { cn } from "../lib/cn";
import { getContextMenu } from "./context";

let {
	children,
	class: classProp,
	...rest
}: { children?: Snippet; class?: string } & HTMLAttributes<HTMLDivElement> = $props();

const menu = getContextMenu();
let el = $state<HTMLDivElement>();

// Positioned from a point rather than an element, so it clamps rather than flips.
$effect(() => {
	if (!menu.open || !el) return;
	const rect = el.getBoundingClientRect();
	const x = Math.min(menu.point.x, window.innerWidth - rect.width - 8);
	const y = Math.min(menu.point.y, window.innerHeight - rect.height - 8);
	el.style.transform = `translate(${Math.max(8, x)}px, ${Math.max(8, y)}px)`;
	return dismissable([el], menu.close);
});
</script>

{#if menu.open}
	<!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
	<div
		{...rest}
		bind:this={el}
		id={menu.contentId}
		role="menu"
		tabindex="-1"
		data-slot="context-menu-content"
		data-state="open"
		style:position="fixed"
		style:left="0"
		style:top="0"
		style:transform-origin="top left"
		class={cn("anchored z-50 min-w-44 rounded-xl border border-border bg-popover p-1 shadow-2xl", classProp)}
	>
		{@render children?.()}
	</div>
{/if}
