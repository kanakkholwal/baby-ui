<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { voicePicker } from "../variants";

let { class: classProp, children }: { class?: string; children?: Snippet } = $props();
</script>

<div data-slot="voice-picker-row" class={cn(voicePicker().row(), classProp)}>
	{@render children?.()}
</div>
