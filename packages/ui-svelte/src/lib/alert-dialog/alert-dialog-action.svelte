<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { getAlertDialog } from "./context";

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

const dialog = getAlertDialog();
</script>

<button
	{...rest}
	type="button"
	data-slot="alert-dialog-action"
	onclick={(event) => {
		onclick?.(event);
		dialog.setOpen(false);
	}}
	class={cn(
		"inline-flex h-9 items-center rounded-lg px-3 font-medium text-sm transition-[transform,scale,translate] duration-[var(--duration-press)] ease-[var(--ease-out)] active:scale-[var(--press-scale)]",
		destructive ? "bg-[var(--destructive)] text-white" : "bg-primary text-primary-foreground",
		classProp,
	)}
>
	{@render children?.()}
</button>
