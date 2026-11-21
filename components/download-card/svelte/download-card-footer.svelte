<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { downloadCard } from "../variants";

let { class: classProp, children }: { class?: string; children?: Snippet } = $props();
</script>

<div data-slot="download-card-footer" class={cn(downloadCard().footer(), classProp)}>
	{@render children?.()}
</div>
