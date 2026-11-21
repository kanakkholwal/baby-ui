<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { downloadCard } from "../variants";

let { class: classProp, children }: { class?: string; children?: Snippet } = $props();
</script>

<p data-slot="download-card-title" class={cn(downloadCard().title(), classProp)}>
	{@render children?.()}
</p>
