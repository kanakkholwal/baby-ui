<script lang="ts">
import { Accordion as AccordionPrimitive } from "bits-ui";
import type { Snippet } from "svelte";
import { cn } from "../lib/cn";

let {
	children,
	class: classProp,
	...rest
}: { children?: Snippet; class?: string } = $props();
</script>

<AccordionPrimitive.Content
	{...rest}
	data-slot="accordion-content"
	class="grid grid-rows-[0fr] transition-[grid-template-rows] duration-[var(--duration-dropdown)] ease-[var(--ease-out)] data-[state=open]:grid-rows-[1fr] motion-reduce:transition-none"
>
	<div class="overflow-hidden">
		<div class={cn("px-4 pb-3 text-muted-foreground text-sm leading-relaxed", classProp)}>
			{@render children?.()}
		</div>
	</div>
</AccordionPrimitive.Content>
