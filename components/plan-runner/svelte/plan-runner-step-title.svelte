<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { planRunnerState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLParagraphElement> = $props();
const ctx = planRunnerState("PlanRunnerStepTitle");
</script>

<p class={cn(ctx.styles.stepTitle(), classProp)} {...rest}>{@render children?.()}</p>
