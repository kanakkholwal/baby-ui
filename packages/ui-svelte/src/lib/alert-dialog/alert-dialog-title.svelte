<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { getAlertDialog } from "./context";

let {
	children,
	class: classProp,
	...rest
}: { children?: Snippet; class?: string } & HTMLAttributes<HTMLDivElement> = $props();

const ctx = getAlertDialog();
</script>

<h2 {...rest} id={ctx.titleId} data-slot="alert-dialog-title" class={cn("font-medium text-foreground text-base", classProp)}>
	{@render children?.()}
</h2>
