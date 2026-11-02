<script lang="ts">
import type { HTMLOlAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { agentListState } from "./context";

let { class: classProp, children, ...rest }: HTMLOlAttributes = $props();
const ctx = agentListState("AgentListSteps");
</script>

<ol class={cn(ctx.styles.steps(), classProp)} {...rest}>{@render children?.()}</ol>
