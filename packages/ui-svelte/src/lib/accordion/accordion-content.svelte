<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { getAccordionItem } from "./context";

let {
	children,
	class: classProp,
	...rest
}: { children?: Snippet; class?: string } & Omit<
	HTMLAttributes<HTMLElement>,
	"children"
> = $props();

const item = getAccordionItem();
</script>

<!-- grid-template-rows animates to the content's own height, so nothing is measured. -->
<section
	{...rest}
	id={item.contentId}
	aria-labelledby={item.triggerId}
	data-slot="accordion-content"
	data-state={item.open ? "open" : "closed"}
	inert={!item.open}
	class="grid transition-[grid-template-rows] duration-[var(--duration-dropdown)] ease-[var(--ease-out)] data-[state=closed]:grid-rows-[0fr] data-[state=open]:grid-rows-[1fr] motion-reduce:transition-none"
>
	<div class="overflow-hidden">
		<div class={cn("px-4 pb-3 text-muted-foreground text-sm leading-relaxed", classProp)}>
			{@render children?.()}
		</div>
	</div>
</section>
