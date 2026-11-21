<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { downloadCard } from "../variants";

let { class: classProp, children }: { class?: string; children?: Snippet } = $props();
</script>

<div data-slot="download-card-header" class={cn(downloadCard().header(), classProp)}>
	{@render children?.()}
</div>
