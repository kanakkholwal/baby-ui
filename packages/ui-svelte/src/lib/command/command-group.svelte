<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../lib/cn";

let {
	children,
	heading,
	class: classProp,
	...rest
}: {
	children?: Snippet;
	heading?: string;
	class?: string;
} & HTMLAttributes<HTMLDivElement> = $props();
</script>

<!-- A group with no surviving item hides itself, heading included. -->
<div
	{...rest}
	data-slot="command-group"
	class={cn("not-has-[[data-slot=command-item]]:hidden", classProp)}
>
	{#if heading}
		<p class="px-4 pt-2 pb-1 font-semibold text-[11px] text-muted-foreground uppercase tracking-wider">
			{heading}
		</p>
	{/if}
	<div class="px-1.5">
		{@render children?.()}
	</div>
</div>
