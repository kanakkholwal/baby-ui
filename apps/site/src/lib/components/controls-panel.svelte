<script lang="ts">
import SpecDials from "@baby-ui/demos/controls";
import type { ComponentSpec } from "@baby-ui/registry-schema";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@baby-ui/svelte";
import IconAdjustmentsHorizontal from "@tabler/icons-svelte/icons/adjustments-horizontal";

let {
	spec,
	values = $bindable(),
}: { spec: ComponentSpec; values: Record<string, unknown> } = $props();

let open = $state(true);
</script>

<!-- Sivir's inset frame, same treatment as Card's `framed` variant and CodeBlock: a rim in
     bg-background around a bg-card body, so it reads as its own surface, not a plain box. -->
<Collapsible bind:open class="mt-4 rounded-2xl border border-border bg-background p-1">
	<CollapsibleTrigger class="px-3 py-2">
		<IconAdjustmentsHorizontal size={16} stroke={1.6} class="text-muted-foreground" />
		Controls
	</CollapsibleTrigger>
	<CollapsibleContent class="px-0 pb-0">
		<div class="rounded-[11px] bg-card p-3">
			{#key spec.slug}
				<SpecDials {spec} bind:values />
			{/key}
		</div>
	</CollapsibleContent>
</Collapsible>
