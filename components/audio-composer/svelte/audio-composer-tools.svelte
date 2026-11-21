<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { audioComposer } from "../variants";

/** The group on the right of the toolbar: put `ComposerSubmit` last. */
let { class: classProp, children }: { class?: string; children?: Snippet } = $props();
</script>

<div data-slot="audio-composer-tools" class={cn(audioComposer().tools(), classProp)}>
	{@render children?.()}
</div>
