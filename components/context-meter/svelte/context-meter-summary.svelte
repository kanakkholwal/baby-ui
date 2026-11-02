<script lang="ts">
import { cn } from "../../lib/cn";
import { formatTokens } from "../variants";
import { contextMeterState } from "./context";

let { unit = "tokens", class: classProp }: { unit?: string; class?: string } = $props();
const ctx = contextMeterState("ContextMeterSummary");
const s = $derived(ctx.styles);
</script>

<!-- "139k of 200k tokens" and how much is left. -->
<div data-slot="context-meter-summary" class={cn(s.summary(), classProp)}>
	<span><span class={s.used()}>{formatTokens(ctx.used)}</span> <span class={s.of()}>of {formatTokens(ctx.limit)} {unit}</span></span>
	<span class={s.left()}>{formatTokens(Math.max(0, ctx.limit - ctx.used))} left</span>
</div>
