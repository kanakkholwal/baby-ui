<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { planRunnerState } from "./context";

let { class: classProp, children, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
const ctx = planRunnerState("PlanRunnerBody");
</script>

<!-- The inner surface: progress, steps and the steer input sit inside it. -->
<div data-slot="plan-runner-body" class={cn(ctx.styles.body(), classProp)} {...rest}>
	{@render children?.()}
</div>
