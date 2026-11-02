<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { CONTEXT_METER_ICONS } from "../variants";
import { contextMeterState } from "./context";

let { class: classProp, children, ...rest }: HTMLAttributes<HTMLSpanElement> = $props();
const ctx = contextMeterState("ContextMeterIcon");
</script>

<!-- The header glyph; children replace the layers icon. -->
<span aria-hidden="true" data-slot="context-meter-icon" class={cn(ctx.styles.icon(), classProp)} {...rest}>
	{#if children}{@render children()}{:else}
		<svg viewBox="0 0 24 24" aria-hidden="true" class="fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.8]"><path d={CONTEXT_METER_ICONS.layers} /></svg>
	{/if}
</span>
