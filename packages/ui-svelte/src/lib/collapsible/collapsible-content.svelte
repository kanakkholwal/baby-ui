<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { getCollapsible } from "./context";

let {
	children,
	class: classProp,
	...rest
}: { children?: Snippet; class?: string } & HTMLAttributes<HTMLDivElement> = $props();

const collapsible = getCollapsible();
</script>

<!-- grid-template-rows animates to content height without measuring it. -->
<div
	{...rest}
	id={collapsible.contentId}
	data-slot="collapsible-content"
	data-state={collapsible.open ? "open" : "closed"}
	style:grid-template-rows={collapsible.open ? "1fr" : "0fr"}
	class="grid transition-[grid-template-rows] duration-200 ease-[var(--ease-out)] motion-reduce:transition-none"
>
	<div class="overflow-hidden">
		<div class={cn("px-1 pb-2 text-muted-foreground text-sm", classProp)}>
			{@render children?.()}
		</div>
	</div>
</div>
