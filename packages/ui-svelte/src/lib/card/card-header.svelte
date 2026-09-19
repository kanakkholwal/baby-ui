<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../lib/cn.js";

let {
	title,
	description,
	actions,
	class: classProp,
}: { title: string; description?: string; actions?: Snippet; class?: string } = $props();
</script>

<div class={cn("flex items-start justify-between gap-4", classProp)}>
	<div class="min-w-0">
		<h3 class="font-medium text-foreground text-sm">{title}</h3>
		{#if description}
			<p class="mt-1 text-muted-foreground text-xs leading-relaxed">{description}</p>
		{/if}
	</div>
	{#if actions}<div class="shrink-0">{@render actions()}</div>{/if}
</div>
