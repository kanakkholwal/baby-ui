<script lang="ts">
import { Collapsible as CollapsiblePrimitive } from "bits-ui";
import { cn } from "../../lib/cn";
import { reasoningState } from "./context";

let { class: classProp, children, ...rest }: CollapsiblePrimitive.ContentProps = $props();
const ctx = reasoningState("ReasoningContent");
</script>

<!-- The panel: text, ReasoningSteps or ReasoningRows. forceMount keeps a closed frame for the grid-rows transition. -->
<CollapsiblePrimitive.Content forceMount data-slot="reasoning-content" class={ctx.styles.panel()} {...rest}>
	<div class={ctx.styles.clip()}>
		<div class={cn(ctx.styles.content(), classProp)}>{@render children?.()}</div>
	</div>
</CollapsiblePrimitive.Content>
