<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../lib/cn";

let { children, class: classProp }: { children: Snippet; class?: string } = $props();
</script>

<div class={cn("mt-4 flex items-center gap-2 border-border/60 border-t pt-4", classProp)}>
	{@render children()}
</div>
