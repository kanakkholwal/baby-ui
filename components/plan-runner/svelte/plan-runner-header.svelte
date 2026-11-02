<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { planRunnerState } from "./context";

let { class: classProp, children, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
const ctx = planRunnerState("PlanRunnerHeader");
</script>

<!-- The top row: lays out PlanRunnerTitle and PlanRunnerMeta. -->
<div data-slot="plan-runner-header" class={cn(ctx.styles.header(), classProp)} {...rest}>
	{@render children?.()}
</div>
