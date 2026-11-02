<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { agentListState } from "./context";

let { class: classProp, children, ...rest }: HTMLAttributes<HTMLSpanElement> = $props();
const ctx = agentListState("AgentListHeading");
</script>

<!-- The agent's task and, below it, a line such as its branch and age. -->
<span class={cn(ctx.styles.heading(), classProp)} {...rest}>{@render children?.()}</span>
