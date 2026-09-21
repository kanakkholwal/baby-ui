<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { getDialog } from "./context";

let {
	children,
	class: classProp,
	...rest
}: { children?: Snippet; class?: string } & HTMLAttributes<HTMLDivElement> = $props();

const ctx = getDialog();
</script>

<h2 {...rest} id={ctx.titleId} data-slot="dialog-title" class={cn("flex items-center gap-2 font-semibold text-foreground text-lg [&>svg]:size-5 [&>svg]:text-muted-foreground", classProp)}>
	{@render children?.()}
</h2>
