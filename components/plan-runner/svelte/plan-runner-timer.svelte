<script lang="ts">
import { cn } from "../../lib/cn";
import { formatStepTime } from "../variants";
import { planRunnerState } from "./context";

let { seconds, class: classProp }: { seconds: number; class?: string } = $props();
const ctx = planRunnerState("PlanRunnerTimer");
</script>

<!-- Time spent on the step; pass the seconds from your own clock. -->
<span class={cn(ctx.styles.timer(), classProp)}><span class="sr-only">took </span>{formatStepTime(seconds)}</span>
