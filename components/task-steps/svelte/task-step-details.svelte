<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { taskStepsState } from "./context";

let { class: classProp, children, ...rest }: HTMLAttributes<HTMLUListElement> = $props();
const ctx = taskStepsState("TaskStepDetails");
</script>

<!-- The step's sub-items: TaskStepDetail rows. -->
<ul data-slot="task-step-details" class={cn(ctx.styles.details(), classProp)} {...rest}>{@render children?.()}</ul>
