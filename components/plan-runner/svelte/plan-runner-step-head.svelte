<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { planRunnerState } from "./context";

let { class: classProp, children, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
const ctx = planRunnerState("PlanRunnerStepHead");
</script>

<!-- The step's row: put PlanRunnerTool, PlanRunnerStepTitle and PlanRunnerTimer in it. -->
<div class={cn(ctx.styles.stepHead(), classProp)} {...rest}>{@render children?.()}</div>
