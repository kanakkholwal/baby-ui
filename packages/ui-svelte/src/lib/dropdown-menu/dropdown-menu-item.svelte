<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
import { UNFOLD_ITEM } from "../lib/anchor";
import { cn } from "../lib/cn";
import { getDropdownMenu } from "./context";

let {
	children,
	destructive = false,
	class: classProp,
	onclick,
	...rest
}: {
	children?: Snippet;
	destructive?: boolean;
	class?: string;
} & HTMLButtonAttributes = $props();

const menu = getDropdownMenu();
</script>

<button
	{...rest}
	type="button"
	role="menuitem"
	data-slot="dropdown-menu-item"
	onclick={(event) => {
		onclick?.(event);
		menu.close();
	}}
	class={cn(
		UNFOLD_ITEM,
		"flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-left text-sm outline-none",
		"hover:bg-foreground/[0.06] focus-visible:bg-foreground/[0.06]",
		"disabled:pointer-events-none disabled:opacity-50",
		destructive ? "text-[var(--destructive)]" : "text-foreground",
		classProp,
	)}
>
	{@render children?.()}
</button>
