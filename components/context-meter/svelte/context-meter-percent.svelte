<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import RollingDigits from "../../rolling-digits/svelte/rolling-digits.svelte";
import { contextMeterState } from "./context";

let { class: classProp, ...rest }: HTMLAttributes<HTMLSpanElement> = $props();
const ctx = contextMeterState("ContextMeterPercent");
const percent = $derived(
	ctx.limit > 0 ? Math.min(100, Math.round((ctx.used / ctx.limit) * 100)) : 0,
);
</script>

<!-- How full the window is, as a rolling percentage. -->
<span data-slot="context-meter-percent" class={cn(ctx.styles.percent(), classProp)} {...rest}>
	<span class="sr-only">{percent}% used</span>
	<span aria-hidden="true"><RollingDigits value={percent} />%</span>
</span>
