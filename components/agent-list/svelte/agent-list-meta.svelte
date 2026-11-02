<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { agentListState } from "./context";

let { class: classProp, children, ...rest }: HTMLAttributes<HTMLSpanElement> = $props();
const ctx = agentListState("AgentListMeta");
</script>

<span class={cn(ctx.styles.meta(), classProp)} {...rest}>{@render children?.()}</span>
