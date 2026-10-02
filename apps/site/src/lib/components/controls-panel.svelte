<script lang="ts">
import SpecDials from "@baby-ui/demos/controls";
import { IconAdjustmentsHorizontal } from "@baby-ui/icons";
import type { ComponentSpec } from "@baby-ui/registry-schema";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@baby-ui/svelte";
import { track } from "$lib/analytics";
import { defaultProps } from "$lib/registry";

let {
	spec,
	values = $bindable(),
	defaultOpen = false,
}: {
	spec: ComponentSpec;
	values: Record<string, unknown>;
	/** Closed by default so a first visit sees the component, not a wall of dials. */
	defaultOpen?: boolean;
} = $props();

// svelte-ignore state_referenced_locally
let open = $state(defaultOpen);

// Debounced so a dragged slider reports once, when the reader settles on a value.
$effect(() => {
	const base = defaultProps(spec);
	const changed = Object.keys(values).filter(
		(key) => JSON.stringify(values[key]) !== JSON.stringify(base[key]),
	);
	if (!changed.length) return;
	const timer = setTimeout(() => track("props_changed", { props: changed }), 1500);
	return () => clearTimeout(timer);
});
</script>

<!-- The inset frame, same treatment as Card's `framed` variant and CodeBlock: a rim in
     bg-background around a bg-card body, so it reads as its own surface, not a plain box. -->
<Collapsible bind:open class="mt-4 rounded-2xl border border-border bg-background p-1">
	<CollapsibleTrigger class="px-3 py-2">
		<IconAdjustmentsHorizontal size={16} class="text-muted-foreground" />
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
