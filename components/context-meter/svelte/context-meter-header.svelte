<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { contextMeterState } from "./context";

let { class: classProp, children, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
const ctx = contextMeterState("ContextMeterHeader");
</script>

<!-- The top row: lays out ContextMeterIcon, Title, Subtitle and Percent. -->
<div data-slot="context-meter-header" class={cn(ctx.styles.header(), classProp)} {...rest}>
	{@render children?.()}
</div>
