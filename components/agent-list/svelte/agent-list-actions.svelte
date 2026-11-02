<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { agentListState } from "./context";

let { class: classProp, children, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
const ctx = agentListState("AgentListActions");
</script>

<div class={cn(ctx.styles.actions(), classProp)} {...rest}>{@render children?.()}</div>
