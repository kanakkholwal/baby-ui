<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { agentListState } from "./context";

let { class: classProp, children, ...rest }: HTMLAttributes<HTMLSpanElement> = $props();
const ctx = agentListState("AgentListName");
</script>

<span class={cn(ctx.styles.name(), classProp)} {...rest}>{@render children?.()}</span>
