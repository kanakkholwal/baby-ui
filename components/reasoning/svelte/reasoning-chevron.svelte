<script lang="ts">
import type { SVGAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { reasoningState } from "./context";

let { class: classProp, ...rest }: SVGAttributes<SVGSVGElement> = $props();
const ctx = reasoningState("ReasoningChevron");
</script>

<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class={cn(ctx.styles.chevron(), classProp)} {...rest}>
	<path d="m4 6 4 4 4-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
</svg>
