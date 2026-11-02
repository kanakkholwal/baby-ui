<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { planRunnerState } from "./context";

let { class: classProp, children, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
const ctx = planRunnerState("PlanRunnerSteer");
</script>

<!-- Holds the input that steers the next step, usually a Composer. -->
<div data-slot="plan-runner-steer" class={cn(ctx.styles.steer(), classProp)} {...rest}>{@render children?.()}</div>
