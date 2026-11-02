<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { planRunnerState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLParagraphElement> = $props();
const ctx = planRunnerState("PlanRunnerSummary");
</script>

<!-- e.g. "3 of 5 steps · 14 tool calls"; announced politely as it changes. -->
<p aria-live="polite" class={cn(ctx.styles.summary(), classProp)} {...rest}>{@render children?.()}</p>
