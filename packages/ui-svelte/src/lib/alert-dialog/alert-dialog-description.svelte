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

<p {...rest} id={ctx.descriptionId} data-slot="alert-dialog-description" class={cn("text-muted-foreground text-sm leading-relaxed", classProp)}>
	{@render children?.()}
</p>
