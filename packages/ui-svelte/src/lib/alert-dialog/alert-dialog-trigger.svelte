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
</script>

<button
	{...rest}
	type="button"
	data-slot="alert-dialog-trigger"
	aria-haspopup="dialog"
	aria-expanded={dialog.open}
	onclick={() => dialog.setOpen(true)}
	class={cn("inline-flex", classProp)}
>
	{@render children?.()}
</button>
