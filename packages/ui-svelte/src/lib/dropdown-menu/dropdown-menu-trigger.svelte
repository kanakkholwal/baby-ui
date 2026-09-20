<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { getDropdownMenu } from "./context";

let {
	children,
	class: classProp,
	...rest
}: { children?: Snippet; class?: string } & HTMLButtonAttributes = $props();

const menu = getDropdownMenu();
let el = $state<HTMLButtonElement>();

$effect(() => {
	menu.setTrigger(el);
	return () => menu.setTrigger(undefined);
});
</script>

<button
	{...rest}
	bind:this={el}
	type="button"
	data-slot="dropdown-menu-trigger"
	data-state={menu.open ? "open" : "closed"}
	aria-haspopup="menu"
	aria-expanded={menu.open}
	aria-controls={menu.open ? menu.contentId : undefined}
	onclick={() => menu.setOpen(!menu.open)}
	class={cn(
		"inline-flex rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring",
		classProp,
	)}
>
	{@render children?.()}
</button>
