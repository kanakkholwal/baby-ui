<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { speechPlayer } from "../variants";

let { class: classProp, children }: { class?: string; children?: Snippet } = $props();
</script>

<div data-slot="speech-player-controls" class={cn(speechPlayer().controls(), classProp)}>
	{@render children?.()}
</div>
