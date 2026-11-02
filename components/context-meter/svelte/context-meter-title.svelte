<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { contextMeterState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLHeadingElement> = $props();
const ctx = contextMeterState("ContextMeterTitle");
</script>

<h3 data-slot="context-meter-title" class={cn(ctx.styles.title(), classProp)} {...rest}>
	{#if children}{@render children()}{:else}Context window{/if}
</h3>
