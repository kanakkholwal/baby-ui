<script lang="ts">
import { Collapsible as CollapsiblePrimitive } from "bits-ui";
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { toolContext } from "./context";

let { class: classProp, children }: { class?: string; children: Snippet } = $props();
const ctx = toolContext("ToolContent");
</script>

<!-- forceMount keeps a closed frame for the grid-rows transition to animate from. -->
<CollapsiblePrimitive.Content forceMount data-slot="tool-content" class={ctx.styles.panel()}>
	<div class={ctx.styles.clip()}>
		<div class={cn(ctx.styles.body(), classProp)}>{@render children()}</div>
	</div>
</CollapsiblePrimitive.Content>
