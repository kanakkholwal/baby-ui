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

<h2 {...rest} id={ctx.titleId} data-slot="sheet-title" class={cn("font-semibold text-foreground text-sm", classProp)}>
	{@render children?.()}
</h2>
