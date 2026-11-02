<script lang="ts">
import type { HTMLOlAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { planRunnerState } from "./context";

let { class: classProp, children, ...rest }: HTMLOlAttributes = $props();
const ctx = planRunnerState("PlanRunnerSteps");
</script>

<ol data-slot="plan-runner-steps" class={cn(ctx.styles.steps(), classProp)} {...rest}>{@render children?.()}</ol>
