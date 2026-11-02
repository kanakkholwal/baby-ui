<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { planRunnerState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLHeadingElement> = $props();
const ctx = planRunnerState("PlanRunnerTitle");
</script>

<h3 data-slot="plan-runner-title" class={cn(ctx.styles.title(), classProp)} {...rest}>{@render children?.()}</h3>
