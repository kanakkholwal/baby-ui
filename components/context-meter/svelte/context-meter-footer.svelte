<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { contextMeterState } from "./context";

let {
	note,
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLDivElement> & {
	/** A line such as "Auto-compacts at 85%". */
	note?: string;
	children?: Snippet;
} = $props();
const ctx = contextMeterState("ContextMeterFooter");
</script>

<!-- The closing row: a note, then ContextMeterCompact. -->
<div data-slot="context-meter-footer" class={cn(ctx.styles.footer(), classProp)} {...rest}>
	{#if note}<p class={ctx.styles.note()}>{note}</p>{/if}
	{@render children?.()}
</div>
