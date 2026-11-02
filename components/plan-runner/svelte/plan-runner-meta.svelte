<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { planRunnerState } from "./context";

let { class: classProp, children, ...rest }: HTMLAttributes<HTMLSpanElement> = $props();
const ctx = planRunnerState("PlanRunnerMeta");
</script>

<!-- A short line beside the title, e.g. "Step 3 of 5 · 1:24". -->
<span data-slot="plan-runner-meta" class={cn(ctx.styles.meta(), classProp)} {...rest}>{@render children?.()}</span>
