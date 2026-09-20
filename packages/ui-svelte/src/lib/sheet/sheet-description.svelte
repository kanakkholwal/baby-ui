<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { getSheet } from "./context";

let {
	children,
	class: classProp,
	...rest
}: { children?: Snippet; class?: string } & HTMLAttributes<HTMLDivElement> = $props();

const ctx = getSheet();
</script>

<p {...rest} id={ctx.descriptionId} data-slot="sheet-description" class={cn("text-muted-foreground text-sm", classProp)}>
	{@render children?.()}
</p>
