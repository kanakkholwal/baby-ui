<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { recordingPill } from "../variants";

let { class: classProp, children }: { class?: string; children?: Snippet } = $props();
</script>

<span data-slot="recording-pill-label" class={cn(recordingPill().label(), classProp)}>
	{@render children?.()}
</span>
