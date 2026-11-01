<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { toolContext } from "./context";

let { class: classProp, children }: { class?: string; children: Snippet } = $props();
const ctx = toolContext("ToolActions");
</script>

<!-- The row under the output: ToolCopy and ToolRetry. -->
<div data-slot="tool-actions" class={cn(ctx.styles.actions(), classProp)}>{@render children()}</div>
