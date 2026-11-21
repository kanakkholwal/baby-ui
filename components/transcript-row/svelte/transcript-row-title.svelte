<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { transcriptRow } from "../variants";

let { class: classProp, children }: { class?: string; children?: Snippet } = $props();
</script>

<span data-slot="transcript-row-title" class={cn(transcriptRow().title(), classProp)}>
	{@render children?.()}
</span>
