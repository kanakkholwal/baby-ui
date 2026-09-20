<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { getAlertDialog } from "./context";

let {
	children,
	class: classProp,
	...rest
}: { children?: Snippet; class?: string } & HTMLButtonAttributes = $props();

const dialog = getAlertDialog();
let el = $state<HTMLButtonElement>();

$effect(() => {
	dialog.setCancel(el);
	return () => dialog.setCancel(undefined);
});
</script>

<button
	{...rest}
	bind:this={el}
	type="button"
	data-slot="alert-dialog-cancel"
	onclick={() => dialog.setOpen(false)}
	class={cn(
		"inline-flex h-9 items-center rounded-lg border border-border px-3 font-medium text-foreground text-sm transition-colors hover:bg-foreground/[0.06]",
		classProp,
	)}
>
	{@render children?.()}
</button>
