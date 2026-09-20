<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { getSheet } from "./context";

let {
	children,
	class: classProp,
	...rest
}: { children?: Snippet; class?: string } & HTMLButtonAttributes = $props();

const sheet = getSheet();
</script>

<button
	{...rest}
	type="button"
	data-slot="sheet-trigger"
	aria-haspopup="dialog"
	aria-expanded={sheet.open}
	onclick={() => sheet.setOpen(true)}
	class={cn("inline-flex", classProp)}
>
	{@render children?.()}
</button>
