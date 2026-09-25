<script lang="ts">
import { Collapsible as CollapsiblePrimitive } from "bits-ui";
import type { Snippet } from "svelte";
import { cn } from "../lib/cn";

let {
	children,
	class: classProp,
	...rest
}: { children?: Snippet; class?: string } = $props();
</script>

<!-- grid-template-rows animates to content height without measuring it; forceMount keeps
	the panel mounted while closed, or the transition has no prior frame to animate from. -->
<CollapsiblePrimitive.Content {...rest} forceMount>
	{#snippet child({ props, open })}
		<div
			{...props}
			inert={!open}
			data-slot="collapsible-content"
			class="grid grid-rows-[0fr] transition-[grid-template-rows] duration-[var(--duration-exit)] ease-[var(--ease-out)] data-[state=open]:grid-rows-[1fr] data-[state=open]:duration-[var(--duration-dropdown)] motion-reduce:transition-none"
		>
			<div class="overflow-hidden">
				<div class={cn("px-1 pb-2 text-muted-foreground text-sm", classProp)}>
					{@render children?.()}
				</div>
			</div>
		</div>
	{/snippet}
</CollapsiblePrimitive.Content>
