<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { rove, stagger, UNFOLD } from "../lib/anchor";
import { cn } from "../lib/cn";
import { getDropdownMenu } from "./context";

let {
	children,
	class: classProp,
	...rest
}: { children?: Snippet; class?: string } & HTMLAttributes<HTMLDivElement> = $props();

const menu = getDropdownMenu();
let el = $state<HTMLDivElement>();
// Kept mounted after the first open so the surface can animate out as well as in.
let mounted = $state(false);

$effect(() => {
	if (menu.open) mounted = true;
});
let index = $state(0);

$effect(() => {
	menu.setContent(el);
	return () => menu.setContent(undefined);
});

function rows() {
	return [
		...(el?.querySelectorAll<HTMLElement>("[role='menuitem']:not([disabled])") ?? []),
	];
}

// Focus forces layout, and the parent anchors after this child effect. One microtask
// later the placement is set, so the entry animation still knows which way to lean.
$effect(() => {
	if (!menu.open) return;
	index = 0;
	const all = rows();
	stagger(all);
	queueMicrotask(() => all[0]?.focus());
});

function onkeydown(event: KeyboardEvent) {
	const all = rows();
	const next = rove(all, index, event.key);
	if (next === null) return;
	event.preventDefault();
	index = next;
	all[next]?.focus();
}
</script>

{#if mounted}
	<!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
	<div
		{...rest}
		bind:this={el}
		id={menu.contentId}
		role="menu"
		tabindex="-1"
		data-slot="dropdown-menu-content"
		data-state={menu.open ? "open" : "closed"}
		inert={!menu.open}
		{onkeydown}
		class={cn(
			UNFOLD,
			"min-w-44 rounded-xl border border-border bg-popover p-1 shadow-2xl",
			classProp,
		)}
	>
		{@render children?.()}
	</div>
{/if}
