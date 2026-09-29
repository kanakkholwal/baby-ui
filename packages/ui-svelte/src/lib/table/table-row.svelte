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
}: { children?: Snippet } & HTMLAttributes<HTMLTableRowElement> = $props();

const style = getTableStyle();
const classes = $derived(table(style()));
</script>

<tr data-slot="table-row" class={cn(classes.row(), className)} {...rest}>
	{@render children?.()}
</tr>
