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

<p {...rest} id={ctx.descriptionId} data-slot="dialog-description" class={cn("mt-1 text-muted-foreground text-sm", classProp)}>
	{@render children?.()}
</p>
