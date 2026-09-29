<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { getTableStyle } from "./context";
import { table } from "./variants";

let {
	children,
	class: className,
	...rest
}: { children?: Snippet } & HTMLAttributes<HTMLTableSectionElement> = $props();

const style = getTableStyle();
const classes = $derived(table(style()));
</script>

<thead data-slot="table-header" class={cn(classes.header(), className)} {...rest}>
	{@render children?.()}
</thead>
