<script lang="ts">
import { Collapsible as CollapsiblePrimitive } from "bits-ui";
import { cn } from "../../lib/cn";
import { reasoningState } from "./context";

let { class: classProp, ...rest }: CollapsiblePrimitive.TriggerProps = $props();
const ctx = reasoningState("ReasoningTrigger");
</script>

<!-- The header row that toggles the panel. Holds the icon, title, duration, preview and chevron. -->
<CollapsiblePrimitive.Trigger data-slot="reasoning-trigger" class={cn(ctx.styles.trigger(), classProp)} {...rest} />
