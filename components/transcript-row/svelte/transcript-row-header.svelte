<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { transcriptRow } from "../variants";

let { class: classProp, children }: { class?: string; children?: Snippet } = $props();
</script>

<div data-slot="transcript-row-header" class={cn(transcriptRow().header(), classProp)}>
	{@render children?.()}
</div>
