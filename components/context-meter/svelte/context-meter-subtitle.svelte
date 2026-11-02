<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { contextMeterState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLParagraphElement> = $props();
const ctx = contextMeterState("ContextMeterSubtitle");
</script>

<!-- Usually the model, e.g. "Sonnet 5.5". -->
<p data-slot="context-meter-subtitle" class={cn(ctx.styles.subtitle(), classProp)} {...rest}>
	{@render children?.()}
</p>
