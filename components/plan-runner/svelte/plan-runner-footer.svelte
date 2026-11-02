<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { planRunnerState } from "./context";

let { class: classProp, children, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
const ctx = planRunnerState("PlanRunnerFooter");
</script>

<!-- The closing row: PlanRunnerSummary, then PlanRunnerStop. -->
<div data-slot="plan-runner-footer" class={cn(ctx.styles.footer(), classProp)} {...rest}>{@render children?.()}</div>
